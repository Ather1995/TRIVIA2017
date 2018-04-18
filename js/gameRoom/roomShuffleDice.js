// 洗牌动画
function shuffle() {
    // $('#testimonials').alpha();
    var el = $('#baraja-el'),
        baraja = el.baraja();
    // simple fan
        $("#shuffle_div").show();
        $("#q1 .content").hide();
        $("#q1 .enter_btn").hide();
        baraja.fan({
            speed: 500,
            easing: 'ease-out',
            range: 90,
            direction: 'right',
            origin: {x: 25, y: 100},
            center: true
        });

        setTimeout(function () {
            var random = parseInt(Math.random() * 15 + 1);
            console.log(random);
            var index = $("ul#baraja-el li:eq(" + random + ")");
            index.trigger("click");
        }, 1250);
         setTimeout(function () {
            $("ul#baraja-el").hide();
            //  $("#shuffle_div").hide();
             $("#q1 .enter_btn").show();
             $("#q1 .content").show();
             addQues();
             // if(!Countdown){
             console.log("开始计时器！");
                 Countdown.reStartCount();
             // }
         }, 3000);
        // $("#q1 .enter_btn").show();
}

// var QuesArray=new Array("1、十八大修改党章遵循的原则____。","坚持以马克思列宁主义、毛泽东思想、邓小平理论、“三个代表”重要思想和科学发展观为指导","坚持发扬党内民主，集中全党智慧","保持党章总体稳定，只修改那些必须改的，在党内已经形成共识的内容","以上都是");
function addQues() {
    $(".content").remove();
    p="<div class=\"content\">\n" +
        "            <p class=\"subject_t\">"+QuesArray[0]+"</p>\n" +
        "            <p><span><input id=\"A\" name=\"rd1\" type=\"radio\" value=\"false\"></span><label for=\"rd1_1\">A."+QuesArray[1]+"</label></p>\n" +
        "            <p><span><input id=\"B\" name=\"rd1\" type=\"radio\" value=\"false\"></span><label for=\"rd1_2\">B."+QuesArray[2]+"</label></p>\n" +
        "            <p><span><input id=\"C\" name=\"rd1\" type=\"radio\" value=\"false\"></span><label for=\"rd1_3\">C."+QuesArray[3]+"</label></p>\n" +
        "            <p><span><input id=\"D\" name=\"rd1\" type=\"radio\" value=\"true\"></span><label for=\"rd1_4\">D."+QuesArray[4]+"</label></p>\n" +
        "        </div>";
    $("#q1").prepend(p);
}


$(".content input").live("click",function () {
    console.log($(this)[0].id);
    selectedAnswer=$(this)[0].id
})

$("#b1").click(function () {

    if(uname==nickNames[activePlayerId]){
        if(selectedAnswer=="e"){
            alert("您未选择任何选项！");
        }else{
            console.log(selectedAnswer);
            Ans(selectedAnswer);
        }
    }else {
        selectedAnswer=="e"
        alert("对不起，不是您的答题时间！");
    }
    console.log("确定");
})


// var dicingNum;
function dicing() {
    // 掷骰子动画
    var dice = $("#dice");
    // $("#dicing").click(function () {
        console.log("#dicing).click(function ()");
        // $("#result").html("请直接点击上面的色子！");
        $("#dicing_div").show();
        setTimeout(function () {
            console.log("")
            $(".wrap").append("<div id='dice_mask'></div>");//加遮罩
            dice.attr("class", "dice");//清除上次动画后的点数
            dice.css('cursor', 'default');
            dice.animate({left: '+2px'}, 100, function () {
                dice.addClass("dice_t");
            }).delay(200).animate({top: '-2px'}, 100, function () {
                dice.removeClass("dice_t").addClass("dice_s");
            }).delay(200).animate({opacity: 'show'}, 600, function () {
                dice.removeClass("dice_s").addClass("dice_e");
            }).delay(100).animate({left: '-2px', top: '2px'}, 100, function () {
                dice.removeClass("dice_e").addClass("dice_" + dicingNum);
                $("#result").html("掷得点数是<span>" + dicingNum + "</span>");
                dice.css('cursor', 'pointer');
                $("#dice_mask").remove();//移除遮罩
            });
        }, 500);
        setTimeout(function () {
            $("#dicing_div").hide();
            if(!isInJail[activePlayerId]){
                    isMove=true;
                    console.log("isMove=true;");
                    addMessage(false,nickNames[activePlayerId]+"掷得骰子为"+dicingNum+"！");
                // },1500)
            }
        }, 3000);
}
