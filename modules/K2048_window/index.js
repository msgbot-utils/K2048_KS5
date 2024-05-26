/**
 * 2048 게임판을 생성합니다.
 * @param   {number   } len         판 크기가 몇 곱하기 몇인지를 나타냅니다.
 * @param   {function?} onEnded     게임이 종료되었을 때 호출될 함수입니다.
 * @param   {function?} beforePush  블록들을 이동하기 전에 호출되는 함수입니다.
 * @param   {function?} afterPush   블록들을 이동한 후에 호출되는 함수입니다.
 * @param   {number?  } targetRadix 블록을 2의 몇제곱으로 만드는 것이 목표인지를 나타냅니다.
 */
function K2048(len, onEnded, beforePush, afterPush, targetRadix) {
    this.debugEnabled = false;
    this.debugMethod = e => ""? console.log(e) : Log.d(e);
    this.board = new Array(len).fill().map(_ => new Array(len).fill(0));
    /*
     this.board[y][x]
     [[0, 0, 0, 1], | y--
      [0, 0, 0, 0], |
      [0, 0, 0, 0], |
      [0, 0, 0, 0]] v y++
       --------->
       x--    x++
     각 블록은 2의 (블록값 + 1)제곱
      - 0이면 텅 빈 블록이고, 
      //- 1 이상이면 2의 (블록 값) 제곱 //2048 게임에서는 2가 가장 작은 단위니까! //아니야 혹시나 1을 쓸지도 몰라
      - 1 이상이면 2의 (블록 값 - 1) 제곱 //1이면 2의 0제곱이라 1이고, 2면 2의 1제곱이라 2, 3이면 2의 제곱이라 4, 4면 2의 3제곱이라 8, ...
    */
    this.score = 0;
    this.ended = false;
    this.len = len;
    this.onEnded = onEnded;
    this.beforePush = beforePush;
    this.afterPush = afterPush;
    this.targetRadix = (isFinite(+targetRadix) && targetRadix > 2) ? +targetRadix : 11; //2048은 2의 11제곱이므로 기본값은 11
}

/**
 * 비어있는 칸들 중 한 칸에 숫자를 집어넣습니다.
 * @returns {boolean} 숫자를 넣었는지의 여부입니다. 빈 곳이 없어서 숫자를 넣지 못했을 경우에는 false가 반환됩니다.
 */
K2048.prototype.generateNewNumber = function () {
    let emptys = [];
    this.board.forEach((row, y) => row.forEach((block, x) => block || emptys.push([y, x])));
    if (emptys.length == 0) { // == 0은 !을 앞에 붙이는 것으로 대체 가능하지만, 가독성을 위해서 남겨둠
        // 빈 칸이 없고, 더이상 이동가능한 블록이 존재하지 않으면
        return false;
    }
    const empty = emptys[Math.floor(Math.random() * emptys.length)];
    this.board[empty[0]][empty[1]] = Math.floor(Math.random() * 100) < 30 ? 3 : 2;
    // 랜덤하게 2 또는 4가 나온다고 해서 50% 확률로 2가, 나머지 확률로 4가 나오도록 해놨습니다.
    // 30% 확률로 4가 나온다고 하셔서 30%로 바꿈
    return true;
};

K2048.prototype.checkGameOver = function () {
    let win = this.board.some(row => row.some(block => block >= (this.targetRadix + 1)));
    if (win || !this.canPush()) {
        this.ended = true;
        if (this.onEnded) {
            try {
                this.onEnded(win);
            } catch (e) {
                // 에러를 어떻게 handle할까... 는 나중에 생각하자!
                // ☆ 오류 handler를 따로 입력받기는 좀 그런데... 흠.
                // 그냥 handle하지 말자!
            }
        }
    }
}

/**
 * 블록들이 이동 가능한지 나타내는 함수입니다.
 * @returns {{horizontal: boolean, vertical: boolean}} 블록들이 가로/세로로 이동 가능한지의 여부입니다.
 */
K2048.prototype.canPush = function () {
    if (this.board.some(row => row.some(e => e == 0))) return {
        horizontal: true, 
        vertical  : true
    }; // 비어 있는 칸이 있다면 무조건 움직일 수 있음
    let canPushHorizontal = false, 
        canPushVertical   = false;
    for (let y = 0; y < this.len; y++) {
        for (let x = 0; x < this.len - 1; y++) {
            // 가로로 이동이 가능한지의 여부
            if (this.board[y][x] == this.board[y][x + 1]) {
                canPushHorizontal = true;
                break; // 가로로 병합 가능하다는 것이 확인되었으니 바로 for문 탈출
            }
        }
    }
    for (let y = 0; y < this.len - 1; y++) {
        for (let x = 0; x < this.len; y++) {
            // 세로로 이동이 가능한지의 여부
            if (this.board[y][x] == this.board[y + 1][x]) {
                canPushVertical = true;
                break; // 세로로 병합 가능하다는 것이 확인되었으니 바로 for문 탈출
            }
        }
    }
    return {
        horizontal: canPushHorizontal, 
        vertical  : canPushVertical
    };
}

/**
 * 블록들을 특정 방향으로 이동시킵니다.
 * @param   {string } direction 이동 방향입니다. "w"는 위, "s"는 아래, "a"는 왼쪽, "d"는 오른쪽입니다.
 * @returns {boolean} 이동의 성공 여부입니다. 이를테면 direction이 이상하게 주어졌거나 빈 칸이 없어 이동이 불가한 경우 false가 반환됩니다.
 */
K2048.prototype.push = function (direction) {
    /*
       _ _ _ _      _ _ 2 _      _ _ 2 _    F _ _ 4 _ ^
     ^ _ _ 2 _ w  ^ _ _ _ _    ^ _ _ 2 _    i _ _ _ _ |
     ^ _ _ _ _ -> ^ _ _ 2 _ ->   _ _ _ _ -> n _ _ _ _ |
     ^ _ _ 2 _      _ _ _ _      _ _ _ _    . _ _ _ _ |
     

       - - - >
       _ _ _ _    _ _ _ _    _ _ _ _    _ _ _ _
       2 _ 2 _ d  _ 2 _ 2    _ _ 2 2    _ _ _ 4
       _ _ _ _ -> _ _ _ _ -> _ _ _ _ -> _ _ _ _
       _ _ 2 _    _ _ _ 2    _ _ _ 2    _ _ _ 2
       > > >        > >          >      F i n .

       - - - >
       _ _ _ _    _ _ _ _    _ _ _ _    _ _ _ _
       2 4 4 8 d  _ 2 8 8    _ _ 2 F    _ _ 2 F 아 잠만 merge는 한 번만 가능한데... 각 칸에 merge 여부를 나타내는 flag를 넣자!
       _ _ _ _ -> _ _ _ _ -> _ _ _ _ -> _ _ _ _
       _ _ 2 _    _ _ _ 2    _ _ _ 2    _ _ _ 2
       > > >        > >          >      F i n .
     
     보드 크기가 n * n이라 하면, 
     각 블록을 한 칸 이동시키는 것을 n - 1번 (?) 반복 (진행방향의 끝에 있는 블록부터 이동)
     다만 마지막 부분 (막혀 있으니까)과, 
     이동한 횟수를 i라 할 때 진행 방향의 첫 부분에서부터 i개의 줄은 이동하지 않음.
     (이미 이전에 이동을 진행한 줄이라서 비어 있으니까, 굳이 이동시킬 필요가 없음!)
    */
    let tempBoard = this.board.map(row => row.map(block => [block, false])),
        //각 블록의 0번째는 블록의 지수, 1번째는 블록의 머지 여부
        canPush   = this.canPush(), 
        linesToBoard;
    switch (direction) {
        case "W": // 대소문자 구분 X
        case "w":
            /*
             0     +
             * * * * ^ < +
             * * * * | < 
             * * * * | <
             * * * * | < 0
            */
            /*for (let y = 0; y < this.len; y++) {
                let tempLine = [];
                for (let x = 0; x < this.len; x++) {
                    tempLine.push(tempBoard[this.len - 1 - y][x]);
                }
                lines.push(tempLine);
            } */
            if (!canPush.vertical) return false; //세로로 움직일 수 있는 블록이 없으므로 false 반환
            tempBoard = tempBoard.reverse();
            linesToBoard = (len, lines) => {
                return lines.reverse();
            };
            break;
        case "S":
        case "s":
            /*
             0     +
             * * * * | < 0
             * * * * | < 
             * * * * | <
             * * * * v < +
            */
            /* for (let y = 0; y < this.len; y++) {
                let tempLine = [];
                for (let x = 0; x < this.len; x++) {
                    tempLine.push(tempBoard[y][x]);
                }
                lines.push(tempLine);
            } */
            if (!canPush.vertical) return false; //세로로 움직일 수 있는 블록이 없으므로 false 반환
            linesToBoard = (len, lines) => {
                return lines;
            };
            break;
        case "A":
        case "a":
            /*
             +     0
             < - - -
             v v v v
             * * * * 0
             * * * * 
             * * * *
             * * * * +
            */
            if (!canPush.horizontal) return false; //가로로 움직일 수 있는 블록이 없으므로 false 반환
            blockA: {
                let lines = [];
                for (let x = 0; x < this.len; x++) {
                    let tempLine = [];
                    for (let y = 0; y < this.len; y++) {
                        tempLine.push(tempBoard[y][this.len - 1 - x]);
                    }
                    lines.push(tempLine);
                }
                tempBoard = lines;
            }
            linesToBoard = (len, lines) => {
                let board = [];
                for (let x = 0; x < len; x++) {
                    let tempRow = [];
                    for (let y = 0; y < len; y++) {
                        tempRow.push(lines[len - 1 - y][x]);
                    }
                    board.push(tempRow);
                }
                return board;
            };
            break;
        case "D":
        case "d":
            /*
             0     +
             - - - >
             v v v v
             * * * * 0
             * * * * 
             * * * *
             * * * * +
            */
            if (!canPush.horizontal) return false; //가로로 움직일 수 있는 블록이 없으므로 false 반환
            blockB: {
                let lines = [];
                for (let x = 0; x < this.len; x++) {
                    let tempLine = [];
                    for (let y = 0; y < this.len; y++) {
                        tempLine.push(tempBoard[y][x]);
                    }
                    lines.push(tempLine);
                }
                tempBoard = lines;
            }
            linesToBoard = (len, lines) => {
                let board = [];
                for (let x = 0; x < len; x++) {
                    let tempRow = [];
                    for (let y = 0; y < len; y++) {
                        tempRow.push(lines[y][x]);
                    }
                    board.push(tempRow);
                }
                return board;
            };
            break;
        default:
            return false; //wasd 중 하나가 아니면 방향이 잘못된 것이므로 false 반환!
    }
    /*
     0     +
     ------>
     * * * * 0
     * * * * 
     * * * *
     * * * * +
     

     -~: merge되지 않은 블록
     !~: merge된 블록
     0     +
     ------>
     -2  * -2 -4 0     _ -2 -2 -4     _  _ !4 -4     _  _ !4 -4
      *  *  *  *       _  *  *  *     _  _  *  *     _  _  _  *
      * -4 -4  *   ->  _  * -4 -4 ->  _  _  * !8 ->  _  _  _ !8
      *  *  *  * +     _  *  *  *     _  _  *  *     _  _  _  *
      >  >  >             >  >              >        F  i  n  .
    */
    //... 가 아니라
    /*
       0     +
     | * * * * 0
     | * * * * 
     | * * * *
     v * * * * +
     

     -~: merge되지 않은 블록
     !~: merge된 블록
       0     +
       ------>
     | -* -* -* -2 0   v    -_ -_ -_ -_        -_ -_ -_ -_      -_ -_ -_ -_
     | -* -4 -* -*    v     -* -* -* -2  v     -_ -_ -_ -_      -_ -_ -_ -_
     | -* -4 -* -2   v   -> -* -4 -* -2 v   -> -* -* -* !4 v -> -_ -_ -_ !4
     v -* -* -* -4 +        -* -4 -* -4        -* !8 -* -4      -* !8 -* -4
    */
    if (this.debugEnabled) {
        stringifyArr = (arr, prefix, suffix) => {
            prefix = prefix || "";
            suffix = suffix || "";
            console.log(prefix + arr.map(row => row.map(block => (block[1]? "!" : "-") + block[0]).join(" ")).join("\n") + suffix);
        };
        stringifyArr(tempBoard, "original:\n");
    }
    if (this.beforePush) {
        try {
            this.beforePush();
        } catch (e) {}
    }
    for (let i = 0; i < this.len - 1; i++) {
        for (let x = 0; x < this.len; x++) {
            for (let y = this.len - 2; y >= 0; y--) {
                let currentBlock = tempBoard[y][x],
                    nextBlock = tempBoard[y + 1][x],
                    isNextBlockEmpty = nextBlock[0] == 0,
                    // == 0은 !을 앞에 붙이는 것으로 대체 가능하지만, 가독성 때문에 추가함
                    canBeMerged = !(currentBlock[1] || currentBlock[1]) && currentBlock[0] == nextBlock[0];
                if (isNextBlockEmpty) {
                    tempBoard[y + 1][x][0] = tempBoard[y][x][0];
                    tempBoard[y + 1][x][1] = tempBoard[y][x][1];
                    //tempBoard[y][x + 1] = tempBoard[y][x];을 하면 얕은 복사가 되기 때문에 저런 방식을 사용함
                    tempBoard[y][x] = [0, false];
                } else if (canBeMerged) {
                    this.score += Math.pow(2, tempBoard[y + 1][x][0]++);
                    tempBoard[y + 1][x][1] = true;
                    tempBoard[y][x] = [0, false];
                }
            }
        }
    }
    if (this.debugEnabled) stringifyArr(tempBoard, "pushed:\n");
    tempBoard = tempBoard.map(row => row.map(block => block[0]));
    if (this.debugEnabled) {
        console.log(JSON.stringify(tempBoard));
        console.log(linesToBoard);
    }
    this.board = linesToBoard(this.len, tempBoard);
    this.generateNewNumber();
    if (this.afterPush) {
        try {
            this.afterPush();
        } catch (e) {}
    }
    this.checkGameOver();
    return true;
};

/**
 * 2048 게임판을 문자열화합니다.
 * @param   {boolean?} zeroAsBlank 0을 빈칸으로 표시할지의 여부입니다. 기본값은 참입니다.
 * @param   {boolean?} noPow 게임판의 숫자들을 2의 거듭제곱 꼴로 표시하지 않을지의 여부입니다. 기본값은 거짓입니다.
 * @param   {boolean?} gridEnabled 격자를 표시할지의 여부입니다. 기본값은 참입니다.
 * @returns {string  } 문자열화된 게임판입니다.
 */
K2048.prototype.toString = function (zeroAsBlank, noPow, gridEnabled) {
    zeroAsBlank = zeroAsBlank !== false;
    noPow = !!noPow;
    gridEnabled = gridEnabled !== false;
    let padLength = ((noPow ? this.targetRadix : Math.pow(2, this.targetRadix)) + "").length;
    // console.log(JSON.stringify({ zeroAsBlank, noPow, gridEnabled, padLength }, null, 2));
    return "Score: " + this.score + "\n" + this.board.map(row => row.map(block =>
        (
            (
                block > 0
                    //그냥 block만 써도 되긴 한데 (음수가 나올 수 없으니까), 코드 가독성 때문에 > 0까지 붙였슴다
                    ? (noPow
                        ? block
                        : Math.pow(2, block - 1)
                    )
                    : (zeroAsBlank ? "" : "0")
            ) + "" //0, 1, 2, 4, 8...
        ).padStart(padLength)
    ).join(gridEnabled ? " | " : " ")).join(gridEnabled ? ("\n" + "-".repeat(3 * (this.len - 1) + this.len * padLength) + "\n") : "\n");
};