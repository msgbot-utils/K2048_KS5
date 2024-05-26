let testArr = 
[[1, 0, 0, 2], 
 [0, 5, 6, 0], 
 [0, 7, 8, 0], 
 [3, 0, 0, 4]];
size = 4;
function stringifyArr(arr, prefix = "", suffix = "") {
    console.log(prefix + arr.map(row => row.join(" ")).join("\n") + suffix);
}
stringifyArr(testArr, "original:\n");
let tempBoard = testArr;
/*   */
let lines = [];
                for (let x = 0; x < this.size; x++) {
                    let tempLine = [];
                    for (let y = 0; y < this.size; y++) {
                        tempLine.push(tempBoard[y][this.size - 1 - x]);
                    }
                    lines.push(tempLine);
                }
                tempBoard = lines;
/*   */
stringifyArr(tempBoard, "modified:\n");
/*   */
linesToBoard = lines => {
                let board = [];
                for (let x = 0; x < this.size; x++) {
                    let tempRow = [];
                    for (let y = 0; y < this.size; y++) {
                        tempRow.push(lines[this.size - 1 - y][x]);
                    }
                    board.push(tempRow);
                }
                return board;
            };
/*   */
stringifyArr(linesToBoard(tempBoard), "restored:\n");
/***** linesToBoard 테스트용 코드입니다. *****/