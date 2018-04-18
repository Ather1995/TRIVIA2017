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
var game = new Phaser.Game(config);
var sprites;
var blockPosx=new Array(520,400,225,50,50,50,50,225,400,400,225,225,400,575,575,575,575);
var blockPosy=new Array(575,575,575,575,400,225,50,50,50,225,225,400,400,0,100,200,300);
var moveSpeedx=3;
var moveSpeedy=5;
var isMove=false;
var isInJail=false;
var isOutJail=false;
var currBlockId =new Array();//当前的块id
var currBlockIdNew=new Array();
var desBlockId=new Array();//目的地块id
var isAddOctopus=false;

function preload() {
    //  Here we load the Starling Texture Atlas and XML file
    game.load.atlasXML('octopus0', '../img/phaser_area/starling atlas/octopus.png', '../img/phaser_area/starling atlas/octopus.xml');
    game.load.atlasXML('octopus1', '../img/phaser_area/starling atlas/octopus1.png', '../img/phaser_area/starling atlas/octopus.xml');
    game.load.atlasXML('octopus2', '../img/phaser_area/starling atlas/octopus2.png', '../img/phaser_area/starling atlas/octopus.xml');
    game.load.atlasXML('octopus3', '../img/phaser_area/starling atlas/octopus3.png', '../img/phaser_area/starling atlas/octopus.xml');

}

function create() {
}

function update() {
    console.log("111");
    if(isAddOctopus){
        initSprites(playerNum);
        isAddOctopus=false
        console.log(desBlockId[activePlayerId]);
    }
    if(isInJail){
        addMessage(false,nickNames[activePlayerId]+"进入监狱！");
        inJail(activePlayerId);
        activePlayerId=getPlayerId(nextActivePlayer,nickNames);

        if(nickNames[activePlayerId]==uname){
            addDicingbutton(activePlayerId);
            console.log("aaa");
        }else {
            removeDicingbutton();
        }
        isInJail=false;
    }
    if(isOutJail){
        addMessage(false,"恭喜"+nickNames[(activePlayerId==0?playerNum-1:activePlayerId-1)]+"走出监狱！");
        outJail((activePlayerId==0?playerNum-1:activePlayerId-1),currBlockIdNew[(activePlayerId==0?playerNum-1:activePlayerId-1)]);
        // if(getPlayerId(uname,nickNames)==activePlayerId){
        //     outJail((activePlayerId==0?playerNum-1:activePlayerId-1),currBlockId[activePlayerId]);
        // }else {
        //     outJail((activePlayerId==0?playerNum-1:activePlayerId-1),currBlockId[(activePlayerId==0?playerNum-1:activePlayerId-1)]);
        // }

        isOutJail=false;
    }
    if(isMove&&behavior=="Go"){
        desBlockId[activePlayerId]=activePlayerStep;
        var currMoveOctopus=getOctopus(activePlayerId);
        // currMoveOctopus.body.x-=0.5;
        if(currBlockId[activePlayerId]==0){
            // console.log("123");
            if (currMoveOctopus.body.x >= blockPosx[currBlockId[activePlayerId] + 1]){
                currMoveOctopus.body.x-=moveSpeedx;
                if(currMoveOctopus.body.x <= blockPosx[currBlockId[activePlayerId] + 1]){
                    currBlockId[activePlayerId]=1;
                }
            }
        }else {
            // if (currBlockId[activePlayerId] != (desBlockId[activePlayerId]==12?1:(desBlockId[activePlayerId]+1))) {
            if (currBlockId[activePlayerId] != (desBlockId[activePlayerId])) {
                console.log(activePlayerId+"######"+currBlockId[activePlayerId]+"#####"+desBlockId[activePlayerId]);
                if (blockPosx[currBlockId[activePlayerId]] == blockPosx[currBlockId[activePlayerId] == 12 ? 1 : currBlockId[activePlayerId] + 1]) {
                    if (currMoveOctopus.body.y <= blockPosy[currBlockId[activePlayerId] == 12 ? 1 : currBlockId[activePlayerId] + 1]) {
                        currMoveOctopus.body.y += moveSpeedy;
                        if (currMoveOctopus.body.y >= blockPosy[currBlockId[activePlayerId] == 12 ? 1 :currBlockId[activePlayerId] + 1]) {
                            currBlockId[activePlayerId] == 12 ?currBlockId[activePlayerId]=1: currBlockId[activePlayerId]++;
                            console.log("11");
                            console.log(currBlockId[activePlayerId]);
                        }
                    }
                    else if (currMoveOctopus.body.y >= blockPosy[currBlockId[activePlayerId] == 12 ? 1 :currBlockId[activePlayerId] + 1]) {
                        // console.log(currMoveOctopus.body.y);
                        currMoveOctopus.body.y -= moveSpeedy;
                        if (currMoveOctopus.body.y <= blockPosy[currBlockId[activePlayerId] == 12 ? 1 :currBlockId[activePlayerId] + 1]) {
                            currBlockId[activePlayerId] == 12 ? currBlockId[activePlayerId]=1 : currBlockId[activePlayerId]++;
                            console.log("11");
                            console.log(currBlockId[activePlayerId]);
                        }
                    }
                } else if (blockPosy[currBlockId[activePlayerId]] == blockPosy[currBlockId[activePlayerId] == 12 ? 1: currBlockId[activePlayerId] + 1]) {
                    if (currMoveOctopus.body.x <= blockPosx[currBlockId[activePlayerId] == 12 ? 1 :currBlockId[activePlayerId] + 1]) {
                        currMoveOctopus.body.x += moveSpeedx;
                        if (currMoveOctopus.body.x >= blockPosx[currBlockId[activePlayerId] == 12 ? 1 :currBlockId[activePlayerId] + 1]) {
                            currBlockId[activePlayerId] == 12 ? currBlockId[activePlayerId]=1 : currBlockId[activePlayerId]++;
                            console.log("11");
                            console.log(currBlockId[activePlayerId]);
                        }
                    } else if (currMoveOctopus.body.x >= blockPosx[currBlockId[activePlayerId] == 12 ? 1 :currBlockId[activePlayerId] + 1]) {
                        currMoveOctopus.body.x -= moveSpeedx;
                        if (currMoveOctopus.body.x <= blockPosx[currBlockId[activePlayerId] == 12 ? 1 :currBlockId[activePlayerId] + 1]) {
                            currBlockId[activePlayerId] == 12 ? currBlockId[activePlayerId]=1: currBlockId[activePlayerId]++;
                            console.log("11");
                            console.log(currBlockId[activePlayerId]);
                        }
                    }
                }
                else {
                    alert("位置出错了！");
                }
            }else {
                    addMessage(false,nickNames[activePlayerId]+"到达第"+currBlockId[activePlayerId]+"块");
                    console.log("到了");
                    isMove=false;
                    shuffle()
            }
        }
    }
}


function initSprites(num) {
    sprites=game.add.group();
    console.log(num);
    for(var i=0;i<num;i++){
        // var octopus=sprites.create(blockPosx[2],blockPosy[2],'octopus'+i.toString());
        var octopus=sprites.create(blockPosx[0]+i*40,blockPosy[0],'octopus'+i.toString());
        octopus.name="octopus"+i.toString();
        octopus.scale.setTo(0.5, 0.5);
        octopus.animations.add('swim');
        octopus.animations.play('swim', 30, true);
        octopus.id=i;
        currBlockId[i]=0;
        desBlockId[i]=0;
        // game.add.tween(octopus).to({y:octopus.body.y+30}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
    }
}

// function addSprites(playerNum) {
//     if(octopusNum<playerNum){
//         console.log("add"+octopusNum);
//         var octopus=sprites.create(blockPosx[0]+(playerNum-1)*40,blockPosy[0],'octopus'+(playerNum-1).toString());
//         octopus.scale.setTo(0.5, 0.5);
//         octopus.name="octopus"+i.toString();
//         octopus.animations.add('swim');
//         octopus.animations.play('swim', 30, true);
//         octopus.id=playerNum-1;
//         octopusNum++;
//     }
//
// }

function getOctopus(id) {
    return sprites.iterate("id", id, Phaser.Group.RETURN_CHILD);
}


function inJail(id) {
    isInJail[id]=true;
    var inJailOctopus=getOctopus(id);
    inJailOctopus.body.x=blockPosx[id+13];
    inJailOctopus.body.y=blockPosy[id+13];
    console.log(id+"****"+activePlayerId);
}
function outJail(id,blockId) {
    isInJail[id]=false;
    var inJailOctopus=getOctopus(id);
    inJailOctopus.body.x=blockPosx[blockId];
    inJailOctopus.body.y=blockPosy[blockId];
    console.log(id+"****"+activePlayerId);
}
