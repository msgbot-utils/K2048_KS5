module.exports = (function(){
function K2048(len){
  if((typeof len) != "number") throw new TypeError(len + "is not a number, it is "+(typeof len)+".")
  this.len = len;
  this.board = new Array(len).fill().map(()=>new Array(len).fill(null));
  this.score = 0;
  this.isEnd = false; 

  this.add();
  this.add();
} 

K2048.prototype.add = function(){
  let empty = []
  this.board.forEach((e,i)=>
    e.forEach((f,j)=>
      f||empty.push([i,j])
    )
  );
  
  let current = empty[Math.floor(Math.random()*empty.length)]
  
  this.board[current[0]][current[1]] = [2, 2, 4][Math.floor(Math.random()*3)];
}; 

K2048.prototype.push = function(direction){
  switch(direction){
    case "w":{ //위쪽
      for(let i = 0; i < this.len; i++){
        let blank = -1
        for(let j = 0; j < this.len; j++){
          if(blank == -1 && !this.board[j][i]) blank = j;
          else if(blank != -1 && this.board[j][i]){
            this.board[blank][i] = this.board[j][i];
            this.board[j][i] = null;
            blank++;
          }
        }
      }
      break;
    }
    case "s":{ //아래쪽
      for(let i = 0; i < this.len; i++){
        let blank = -1
        for(let j = this.len-1; j > -1; j--){
          if(blank == -1 && !this.board[j][i]) blank = j;
          else if(blank != -1 && this.board[j][i]){
            this.board[blank][i] = this.board[j][i];
            this.board[j][i] = null;
            blank--;
          }
        }
      }
      break;
    }
    case "a":{ //왼쪽
      for(let i = 0; i < this.len; i++){
        let blank = -1
        for(let j = 0; j < this.len; j++){
          if(blank == -1 && !this.board[i][j]) blank = j;
          else if(blank != -1 && this.board[i][j]){
            this.board[i][blank] = this.board[i][j];
            this.board[i][j] = null;
            blank++;
          }
        }
      }
      break;
    }
    case "d":{ //오른쪽
      for(let i = 0; i < this.len; i++){
        let blank = -1
        for(let j = this.len-1; j > -1; j--){
          if(blank == -1 && !this.board[i][j]) blank = j;
          else if(blank != -1 && this.board[i][j]){
            this.board[i][blank] = this.board[i][j];
            this.board[i][j] = null;
            blank--;
          }
        }
      }
      break;
    }
  }
}; 

K2048.prototype.combine = function(direction){
  switch(direction){
    case "w":{ //위쪽
      for(let i = 0; i < this.len; i++){
        for(let j = 0; j < this.len-1; j++){
          if(!this.board[j][i]) continue;
          if(this.board[j][i] == this.board[j+1][i]){
            let nextNum = this.board[j][i]*2
            this.board[j][i] = nextNum;
            this.board[j+1][i] = null;
            this.score += nextNum;
            j++;
          }
        }
      }
      break;
    }
    case "s":{ //아래쪽
      for(let i = 0; i < this.len; i++){
        for(let j = this.len-1; j > 0; j--){
          if(!this.board[j][i]) continue;
          if(this.board[j][i] == this.board[j-1][i]){
            let nextNum = this.board[j][i]*2
            this.board[j][i] = nextNum;
            this.board[j-1][i] = null;
            this.score += nextNum;
            j--;
          }
        }
      }
      break;
    }
    case "a":{ //왼쪽
      for(let i = 0; i < this.len; i++){
        for(let j = 0; j < this.len-1; j++){
          if(!this.board[i][j]) continue;
          if(this.board[i][j] == this.board[i][j+1]){
            let nextNum = this.board[i][j]*2
            this.board[i][j] = nextNum;
            this.board[i][j+1] = null;
            this.score += nextNum;
            j++;
          }
        }
      }
      break;
    }
    case "d":{ //오른쪽
      for(let i = 0; i < this.len; i++){
        for(let j = this.len-1; j > 0; j--){
          if(!this.board[i][j]) continue;
          if(this.board[i][j] == this.board[i][j-1]){
            let nextNum = this.board[i][j]*2
            this.board[i][j] = nextNum;
            this.board[i][j-1] = null;
            this.score += nextNum;
            j--;
          }
        }
      }
      break;
    }
  }
}; 

K2048.prototype.checkEnd = function(){
  if(this.isEnd) return true;
  for(let i = 0; i < this.len; i++){
    for(let j = 0; j < this.len; j++){
      let current = this.board[i][j]
      if(
      !current||
      (i&&current == this.board[i-1][j])||
      (i < this.len-1&&current == this.board[i+1][j])||
      (j&&current == this.board[i][j-1])||
      (j < this.len-1&&current == this.board[i][j+1])) return false;
    }
  }
  
  this.isEnd = true;
  return true;
}; 

K2048.prototype.input = function(direction){
  if(this.isEnd) return false;
  let old = JSON.stringify(this.board);
  this.push(direction);
  this.combine(direction);
  this.push(direction);
  if(old == JSON.stringify(this.board)) return false;
  this.add();
  this.checkEnd();
  return true;
}; 

K2048.prototype.toString = function(){
  return this.board.map(e=>e.map(i=>String(i||"0").padStart(4, "\xa0")+"\xa0".repeat(4-String(i||"0").length)).join(" ")).join("\n\n");
}; 

return K2048;})();
