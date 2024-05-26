/**
 * @returns {object}
 */

function K2048(len){ // 이동 후에 랜덤 위치에 두는걸 해야죠 
    this.board = new Array(len).fill("").map(_=>new Array(len).fill(0))
    this.score = 0
    this.ended = false

    //function 부분

    this.newNumber = function(){
        let emptys = []

        let num = [2,2,4][Math.floor(Math.random()*3)]

        this.board.forEach((e,i)=>e.forEach((f,j)=>f||emptys.push([i,j])))

        if(!emptys.length) return this.ended = true
        
        const empty = emptys[Math.floor(Math.random()*emptys.length)]

        this.board[empty[0]][empty[1]] = 2
    }

    /**
     * w is up, s is down, a is left, d is right
     * @param {string} dir
     */
    this.push = function(dir){
        let rc = dir == "w" || dir == "s"
        
        if(dir == "s") this.board.reverse()
        this.board.forEach((e,i) => {
            if(dir == "d") e.reverse()
            e.forEach((f,j)=>{
                if(!f) return

                let newIndex

                if(rc) newIndex = i
                else newIndex = j
                
                while(newIndex && !(rc?this.board[newIndex-1][j]:e[newIndex-1])){newIndex--}

                if(rc?newIndex == i:newIndex == j) return

                if(rc) this.board[newIndex][j]=f
                else this.board[i][newIndex]=f
                this.board[i][j] = 0
            })
            if(dir == "d") e.reverse()
        })
        if(dir == "s") this.board.reverse()
    }

    this.merge = function(dir){
        let rc = dir == "w" || dir == "s"
        
        if(dir == "s") this.board.reverse()
        for(var i in this.board){
            if(dir == "d") this.board[i].reverse()
            for(var j in this.board[i]){
                let f = this.board[i][j]

                if(!(rc?i:j) || !f || (rc?this.board[i-1][j]:this.board[i][j-1]) != f) continue;

                if(rc) this.board[i-1][j] = f * 2
                else this.board[i][j-1] = f * 2

                this.board[i][j] = 0

                this.score += f * 2
            }
            if(dir == "d") this.board[i].reverse()
        }
        if(dir == "s") this.board.reverse() //ㅇ
    }

    this.nextGame = function(dir){
        const beforeBoard = JSON.parse(JSON.stringify(this.board))

        this.push(dir)
        this.merge(dir)

        if(beforeBoard == this.board) return false

        this.push(dir)
        this.newNumber()
    }

    //이 함수는 테스트 함수로, 이후 제거됩니다.
    this.toStr = function(){
        return this.board.map(e=>e.map(i=>String(i).padStart(4, "\xa0")+"\xa0".repeat(4-String(i).length)).join(" ")).join("\n\n")
    }

    this.newNumber()
    this.newNumber()
}

// [윈도] 잘 되어 가시나오
// [세미] 푸시까지 만들었으빈
// [윈도] 오오.. 
//네 2048 드러워서 못만들게써요   오목 ㄱㄱ K5S 임 
//  보이빈다  윈도 센세
// 오목 만듭시다 아조띠는
// 잠깐 혼자서 수정하고 있겠습니다 (별도의 창에서)   어라라 안그래도 되는데  복사해드릴게오
//                                                             ^~~ 어라 그럼 함수 분맇
// 윈도우 센세다  :> -> 👋   ./K2048_window 부분 만드러뒀는데 지지고 볶고 하셔도 대빈다 -> 감사합니다!

// 보드판 디자인은 그냥 array 넣어서 :>
// 저는 오목 만들거시빈 ./K5S ( KakaoTalk Five Stone )