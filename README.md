# TRIVIA2017
一个答题闯关的游戏系统
其用户场景可以描述为：几个参赛的玩家通过轮流掷色子来决定每个人在游戏盘上的位置，即玩家位置，然后根据位置上的问题作答。如果问题回答正确就会获得1枚金币，否则就被关进禁闭室。被关禁闭的玩家，在下次掷色子，若掷出的点数是奇数，则可以走出禁闭室，继续在游戏棋盘上前进到新的位置，并有机会通过回答问题来赢取金币；若掷出的点数是偶数，则仍需待在禁闭室里，不能前进和回答问题。一旦产生了第一个获得6枚金币的玩家，游戏结束。
## 功能演示
![overall](https://github.com/Ather1995/TRIVIA2017/blob/master/display/trivia.gif?raw=true)

## 技术要点
### 利用phaserjs游戏引擎框架
```
var config = {
    width: 700,
    height: 700,
    renderer: Phaser.AUTO,
    transparent:true,
    parent:'phaser_board',
    state: {
        preload: preload,
        create: create,
        update:update
    }
}
```
### websocket通信
```
/*
WebSocket
 */
console.log("tett");
var t_GL = null;
var t_PL = null;
var ws_GL = null;
var ws_PL = null;
var socketstate_GL = false;
var socketstate_PL = false;
var getInfor = false;
var Nlogin = false;
function OfflineCheck_GL() {
    console.log("check");
    Offline.check();
    if(!socketstate_GL){
        if(Offline.state === 'up'&&ws_GL.reconnectAttempts>ws_GL.maxReconnectInterval){
            console.log("up");
            //ws_GL.refresh();
        }
        else{
            console.log("down");
        }
    }else{
        console.log("send");
        gLSend();
    }
}
function OfflineCheck_PL() {
    console.log("T:check");
    Offline.check();
    if(!socketstate_PL){
        if(Offline.state === 'up'&&ws_PL.reconnectAttempts>ws_PL.maxReconnectInterval){
            console.log("up");
            //ws_GL.refresh();
        }
        else{
            console.log("T:down");
        }
    }else{
        console.log("T:send");
        pLSend();
        if(!getInfor) {
            PSend();
            getInfor=true;
        }
    }
}

if (!("WebSocket" in window)) {
    alert("您的浏览器不支持 WebSocket!");
}
else {
    /*
    GameList
     */
    // ws_GL = new ReconnectingWebSocket("ws://111.231.85.149:8080/Trivia-Server/websocket/GameList");
    ws_GL = new ReconnectingWebSocket("ws://182.254.220.56:8080/MyTestServer/websocket/GameList");
    ws_GL.onopen = function () {
        console.log("WebOpen");
        socketstate_GL = true;
        clearInterval(t_GL);//去掉定时器
        t_GL = setInterval(OfflineCheck_GL, 1000);
    };

    /*
    {"property":{},"resCode":"12","list":
    [{"State":"WAITING","Grid":"12","PlrCo":"1","host":"test","name":"Test4","ID":"4"},
    */
    ws_GL.onmessage = function (evt) {
        console.log("Back");
        socketstate_GL = true;
        var msg = evt.data;
        console.log(msg);
        var jsMsg = JSON.parse(msg);
        /*
        {"property":{},"resCode":"11","list":
        [{"State":"WAITING","Grid":"12","PlrCo":"1","host":"test0","name":"t0","ID":"1"},
         */
        if(jsMsg.resMsg==="RoomList") {
            num = jsMsg.resCode;
            //console.log(jsMsg);
            var jsList = jsMsg.list;
            num = jsMsg.resCode;
            for (var i = 0; i < jsMsg.resCode; i++) {
                roomID[i]=jsList[i].ID;
                if(jsList[i].State=="WAITING"){
                    roomState[i]="等待中";
                    roomStateimage[i]="\"../img/gameLobby/join_button_white.png\"";
                }
                else if(jsList[i].State=="PLAYING"){
                    roomState[i]="游戏中";
                    roomStateimage[i]="\"../img/gameLobby/join_button_black.png\"";
                }else if(jsList[i].State=="FULL"){
                    roomState[i]="房间已满";
                    roomStateimage[i]="\"../img/gameLobby/join_button_black.png\"";
                }
                roomhostName[i]=jsList[i].host;
                roomName[i]=jsList[i].name;
                perNum[i]=jsList[i].PlrCo+"/4";
                var tem = jsList[i].Avatar;
                roomimage[i] = ("\"../img/gameRoom/te"+ tem +".jpg\"");
                console.log(roomimage[i]);
            }
            //console.log(roomID);
            delByClass("roomList");
            update();
        }
        else if(jsMsg.resMsg==="CreateRoomSuccess"){
            alert("CreateRoomSuccess");
            window.sessionStorage.setItem("roomName",rname);
            console.log(window.sessionStorage.getItem("roomName"));
            isGame = true;
            $(location).attr('href', 'gameRoom.html');
        }
        else if(jsMsg.resMsg==="CreateRoomError"){
            alert("CreateRoomError");
        }
        else if(jsMsg.resMsg==="JoinSuccess"){
            alert("加入成功");
            window.sessionStorage.setItem("roomName",rname);
            isGame = true;
            $(location).attr('href', 'gameRoom.html');
        }
        else if(jsMsg.resMsg==="游戏已经开始或房间已满"){
            alert("JoinError");
        }
        else if(jsMsg.resMsg==="JoinAgain"){
            isGame = true;
            alert("您不可重复加入房间");
        }
    };

    ws_GL.onclose = function () {
        socketstate_GL = false;
        console.log("连接已关闭...");
    };

    ws_GL.onerror = function (evt) {
        socketstate_GL = false;
        console.log(evt);
    };

    /*
    PlayerList
     */

    ws_PL = new ReconnectingWebSocket("ws://182.254.220.56:8080/MyTestServer/websocket/PlayerList");
    ws_PL.onopen = function () {
        console.log("T:WebOpen");
        socketstate_PL = true;
        clearInterval(t_PL);//去掉定时器
        t_PL = setInterval(OfflineCheck_PL, 1000);
    };

    ws_PL.onmessage = function (evt) {
        console.log("T:Back");
        socketstate_PL = true;
        var msg = evt.data;
        console.log(msg);
        var jsMsg = JSON.parse(msg);

        if(jsMsg.resMsg==="PlayerList") {
            var jsList = jsMsg.list;
            playerNum = jsMsg.resCode;
            console.log(jsList);
            for (var i = 0; i < jsMsg.resCode; i++) {
                playerName[i] = jsList[i].uN;
                playerScore[i] = jsList[i].sc;
                if(jsList[i].State=="WAITING" || jsList[i].State=="READY"){
                    playerState[i]="等待游戏开始";
                }
                else if(jsList[i].State=="PLAYING"){
                    playerState[i]="游戏中";
                }else if(jsList[i].State=="IDLE"){
                    playerState[i]="空闲中";
                }
            }
            delByClass("playerListDetail");
            updateFriendList();
        }
        else if(jsMsg.resMsg==="RP") {
            // 个人信息加载

            document.getElementById("myName").innerHTML = jsMsg.property.uN;
            document.getElementById("myScore").innerHTML = jsMsg.property.sc;
            console.log(document.getElementById("ma").src);
            var srcc = ("../img/gameRoom/te"+ jsMsg.property.avatar +".jpg");
            document.getElementById("ma").src = srcc;
            console.log("ply")
            var jslist = jsMsg.property;
            console.log("jslist");
        }
        else if(jsMsg.resMsg=="NLogin" && !Nlogin){
            alert("请您登录");
            Nlogin=true;
            $(location).attr('href', 'login.html');
            // $(location).attr('href', 'gameLobby.html');
        }
    };

    ws_PL.onclose = function () {
        socketstate_PL = false;
        console.log("T:连接已关闭...");
    };

    ws_PL.onerror = function (evt) {
        socketstate_PL = false;
        console.log("T"+evt);
    };
}


window.onbeforeunload = function () {
    var json;
    if(!isGame) {
        json = {
            Code : "Remove",
            uN : uName
        };
    }
    else{
        json = {
            Code : "InGame",
            uN : uName
        };
    }
    ws_PL.send(JSON.stringify(json));
    ws_GL.close();
    ws_PL.close();
}
```
### h5,js,css,jquery等技术
### 利用Gulp对项目进行打包压缩，降低体积，减少页面请求次数