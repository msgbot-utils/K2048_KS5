let noneReplace = "▪️";
let stone = "⚪️⚫️";

let numbers = ["0⃣","1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟","11"]

/**
 * 새 오목 게임판을 생성합니다.
 */
function KS5(data1, data2) {
   this.board = new Array(11).fill("").map(_=>new Array(11).fill(null));
   this.player = [data1, data2]
   this.turn = 0
}
/**
 * @returns {string} 게임판을 string으로 변환한 결과를 반환합니다.
 */
KS5.prototype.toString = function(){
   return noneReplace+numbers.join("")+"\n"+this.board.map((e,i)=>numbers[i]+e.map(i=>i==null?noneReplace:stone[i]).join("")).join("\n")
}

/**
 * 게임판에 돌을 두는 함수입니다.
 * 해당 함수는 num, x, y 값이 유효한지 판별하지 않습니다. (이미 돌이 둬진 좌표인지만 판별합니다.)
 * @param {0|1} num 0은 백돌, 1은 흑돌입니다.
 * @param {number} x x좌표입니다.
 * @param {number} y y좌표입니다.
 * @returns {boolean} 이미 돌이 둬진 좌표일때는 false, 제대로 뒀을시 true를 반환합니다.
 */
KS5.prototype.put = function(num, x, y){
   if(this.board[y][x] != null) return false
   this.board[y][x] = num
   return true
}

/**
 * 승패를 판별하는 함수입니다.
 * 해당 함수는 num, x, y 값이 유효한지 판별하지 않습니다.
 * @param {0|1} num 0은 백돌, 1은 흑돌
 * @param {number} x 체크할 x좌표입니다.
 * @param {number} y 체크할 y좌표입니다.
 * @returns {boolean|undefined} 이겼을시 true, 아닐시 false를 반환합니다. 판이 꽉 차 무승부일 경우 undefined를 반환합니다.
 */
KS5.prototype.winCheck = function(num, x, y){
   const directions = [
      [1,0],
      [1,1],
      [1,-1],
      [0,1],
   ]

   function changeDir(dir){
      return dir
   }

   for(var i in directions){
      let nowXY = [x, y]
      let directionChange = false
      for(var i = 0; i < 5; i++){
         try{
            nowXY[0] += i[0]
            nowXY[1] += i[1]
            if(this.board[nowXY[1]][nowXY[0]] != num){
               if(directionChange) break
               dir[0] *= -1
               dir[1] *= -1
               directionChange = true
               nowXY = [x+i[0], y+i[1]]
               if(this.board[nowXY[1]][nowXY[0]] != num) break
            }
            if(i!=4) continue
            return true
         }catch(e){
            if(directionChange) break
            dir[0] *= -1
            dir[1] *= -1
            directionChange = true
            nowXY = [x+i[0], y+i[1]]
            if(this.board[nowXY[1]][nowXY[0]] != num) break
         }
      }
   }

   let blankCheck = false
   for(var i of this.board){
      if(i.includes(null)) {blankCheck = true; break}
   }

   if(blankCheck) return false
   return undefined
}

module.exports = KS5;