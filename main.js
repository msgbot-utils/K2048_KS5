const KS5 = require("./KS5/index")

let playing = {}
let waiting = {}
/**
 * @param {string} room
 * @param {string} msg
 * @param {string} sender
 * @param {boolean} isGC
 * @param {object} replier
 * @param {function} replier.reply
 * @param {object} iDB
 * @param {function(): number} iDB.getProfileHash
 * @param {string} pN
 */
function response(room, msg, sender, isGC, replier, iDB, pN) { //굳이 모듈 써야함?  나중에 미니게임 월드에 넣을거시빈  오목도 넣고 할려그
    let hash = iDB.getProfileHash()

    //테스트용 명령어
    if(msg == ";오목 솔로"){
        if(playing[hash]) return replier.reply("이미 오목을 시작했어요!")

        let game = new KS5({name: sender, hash: hash}, {name: sender, hash: hash})
        playing[hash] = {

        }
        
        replier.reply("솔로 오목을 시작할게요! (테스트용)")
    }
}