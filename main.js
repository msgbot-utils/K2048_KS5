const scriptName = "2048";

const K2048 = require("K2048");

const a = ";"; //접두사
let playing = {}

function send(room, replier, msg){
  replier.reply("2️⃣0️⃣4️⃣8️⃣\n\n"+playing[room]+"\n\n점수: "+playing[room].score+"\n\nw: 위로/s: 아래로\na:왼쪽으로/d:오른쪽으로"+(msg?"\n\n"+msg:""));
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(msg == a+"2048 시작"){
    if(playing[room]) return send(room, replier, "이미 플레이 중이에요!");
    playing[room] = new K2048(4);
    send(room, replier, "2048 게임을 시작합니다!");
  }
  
  if(["w", "a", "s", "d"].includes(msg)){
    if(playing[room]){
      playing[room].input(msg);
      if(playing[room].isEnd){
        send(room, replier, "게임 오버!");
        delete playing[room];
      }else{
        send(room, replier);
      }
    }
  }
}
