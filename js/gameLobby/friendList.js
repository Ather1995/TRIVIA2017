var playerNum=0;
var playerName = new Array();
var playerScore = new Array();
var playerState = new Array();
function updateFriendList() {
    for(i=0;i<playerNum;i++){
        var p="<div class=\"playerListDetail\">\n" +
            "                    <div class=\"playerListhead0\">"+playerName[i]+"</div>\n" +
            "                    <div class=\"playerListhead0\">"+playerScore[i]+"</div>\n" +
            "                    <div class=\"playerListhead0\">"+playerState[i]+"</div>\n" +
            "                </div>"
        $("#playerList").append(p);

    }
}

updateFriendList();


