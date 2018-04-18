function  getInfo() {
    var windowHeight=window.screen.availHeight;
    $("body").css({"height":windowHeight});
}
getInfo();

$(".selectButton").live("click",function () {
    Nlogin=true;
    $(location).attr('href', 'login.html');
})

$(document).ready(update());

var num = 0;
var roomID = new Array();
var roomName = new Array();
var roomhostName=new Array();
var perNum = new Array();
var roomState = new Array();
var roomimage = new Array();
var roomStateimage = new Array();
function update(){
    var isNeedNew=1;
    for(var i = 0 ;i < num; i++){
        if(isNeedNew==1||!($(".roomList").length>0)){
            isNeedNew=0;
            console.log(!($(".roomList").length>0));
            var p="<div class=\"roomList\">\n" +
                "                <div class=\"smallroomList material-design\" data-color=\"#ffffff\">\n" +
                "                    <div class=\"avatar\">\n" +
                "                        <img src=" +roomimage[i]+ " >\n" +
                "                    </div>\n" +
                "                    <div class=\"roominfoList\">\n" +
                "                        <div class=\"roominfo\">\n" +
                "                            <div class=\"roomId\">\n" + roomID[i] +
                "                            \n" +
                "                            </div>\n" +
                "                            <div class=\"roomName\">\n" + roomName[i] +
                "                            \n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"roominfoDetail\">\n" +
                "                            <div class=\"roomhostName\">\n" +
                "                                <div>房主名：</div>\n" + roomhostName[i] +
                "                                \n" +
                "                            </div>\n" +
                "                            <div class=\"perNum\">房间当前人数："+perNum[i]+"</div>\n" +
                "                        </div>\n" +
                "                        <div>\n" +
                "                            <div class=\"blank\"></div>\n" +
                "                            <div class=\"roomstate\">"+roomState[i]+"</div>\n" +
                "                        </div>\n" +
                "                        <div>\n" +
                "\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <div class=\"join_botton\">\n" +
                "                        <img src="+roomStateimage[i]+">\n" +
                "                    </div>\n" +
                "\n" +
                "                </div>\n" +
                "                <div class=\"smallroomList smallroomList_white  material-design\"  data-color=\"#ffffff\">\n" +
                "                </div>\n" +
                "            </div>"
            if(!($(".roomList").length>0)){
                console.log("第一个");
                $("#roomBody").append(p);
            }
            else{
                // 当为偶数，需要把第二个smallroomList加入最后一个roomList中
                console.log("even");
                $(".roomList:last").after(p);
            }
        }
        // 当为奇数时，需要重新new roomList
        else if(isNeedNew==0){
            isNeedNew=1;
            console.log("odd");
            var p="<div class=\"avatar\">\n" +
                "                        <img src=" +roomimage[i]+ " >\n" +
                "                    </div>\n" +
                "                    <div class=\"roominfoList\">\n" +
                "                        <div class=\"roominfo\">\n" +
                "                            <div class=\"roomId\">\n" + roomID[i] +
                "                                \n" +
                "                            </div>\n" +
                "                            <div class=\"roomName\">\n" + roomName[i] +
                "                                \n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"roominfoDetail\">\n" +
                "                            <div class=\"roomhostName\">\n" +
                "                                <div>房主名：</div>\n" + roomhostName[i] +
                "                                \n" +
                "                            </div>\n" +
                "                            <div class=\"perNum\">房间当前人数："+perNum[i]+"人</div>\n" +
                "                        </div>\n" +
                "                        <div>\n" +
                "                            <div class=\"blank\"></div>\n" +
                "                            <div class=\"roomstate\">"+ roomState[i] + "</div>\n" +
                "                        </div>\n" +
                "                        <div>\n" +
                "\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <div class=\"join_botton\">\n" +
                "                        <img src="+roomStateimage[i]+">\n" +
                "                    </div>"
            $(".roomList:last .smallroomList:last").removeClass("smallroomList_white").append(p);

        }
    }
}


var uName = window.sessionStorage.getItem("userName");

var score = 0;
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



function gLSend() {
    console.log("Send::GL");
    var gl={
        Code : "R",
        uN : uName
    }
    ws_GL.send(JSON.stringify(gl));
}

function pLSend() {
    console.log("Send::PL");
    var gl={
        Code : "R",
        uN : uName
    }
    ws_PL.send(JSON.stringify(gl));
}

function PSend() {
    console.log("Send::P");
    var gl={
        Code : "RP",
        uN : uName
    }
    ws_PL.send(JSON.stringify(gl));
}

function CreateRoom() {
    console.log("CreateRoom");
    var room={
        Code : "C",
        uN : uName,
        sc : score,
        mGr : 12,
        mrn : rname
    }
    ws_GL.send(JSON.stringify(room));
}

function delByClass(elementClass)
{
    while ($("." + elementClass).length > 0)
    {
        $("." + elementClass).remove();
    }
}

$(".smallroomList").live("click", function () {
    console.log("JoinGame");
    rname = $(this).find('.roomName')[0].innerText;
    var json = {
        Code : "A",
        uN : uName,
        gN : rname
    }
    ws_GL.send(JSON.stringify(json));
});


