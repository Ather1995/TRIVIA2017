$(document).ready(function(){

    $("#select1 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectA").remove();
        } else {
            var copyThisA = $(this).clone();
            if ($("#selectA").length > 0) {
                $("#selectA a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisA.attr("id", "selectA"));
            }
        }
    });

    $("#select2 dd").click(function () {
        if ($(this).hasClass("select-all")) {
            $(this).addClass("selected").siblings().removeClass("selected");
            delById("selectB");
        } else {
            if(!$(this).hasClass("selected")){
                $("#select2 .select-all").removeClass("selected");
                $(this).addClass("selected");
                var copyThisB = $(this).clone();
                $(".select-result dl").append(copyThisB.attr("id", "selectB"));
            }

            // if ($("#selectB").length > 0) {
            //     $("#selectB a").html($(this).text());
            //     console.log("length > 0");
            // } else {
            //     console.log("11111111length < 0");
            //     $(".select-result dl").append(copyThisB.attr("id", "selectB"));
            // }
        }
    });

    //创建新房间模态框选择
    $("#newRoomSelectFloor dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectA").remove();
        } else {
            var copyThisA = $(this).clone();
            if ($("#selectA").length > 0) {
                $("#selectA a").html($(this).text());
            } else {
                $(".select-result[name='new_room_select_result'] dl").append(copyThisA.attr("id", "selectA"));
            }
        }
    });

    $("#newRoomSelectQusType dd").click(function () {
        if ($(this).hasClass("select-all")) {
            $(this).addClass("selected").siblings().removeClass("selected");
            delById("selectB");
        } else {
            if(!$(this).hasClass("selected")){
                $("#select2 .select-all").removeClass("selected");
                $(this).addClass("selected");
                var copyThisB = $(this).clone();
                $(".select-result[name='new_room_select_result'] dl").append(copyThisB.attr("id", "selectB"));
            }
        }
    });

    $("#selectA").live("click", function () {
        $(this).remove();
        $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
    });

    $("#selectB").live("click", function () {
        $(this).remove();
        if($(this).hasClass("type1")){
            $(".type1").removeClass("selected");
        }else if($(this).hasClass("type2")){
            $(".type2").removeClass("selected");
        }else if($(this).hasClass("type3")){
            $(".type3").removeClass("selected");
        }else if($(this).hasClass("type4")){
            $(".type4").removeClass("selected");
        }else if($(this).hasClass("type5")){
            $(".type5").removeClass("selected");
        }else if($(this).hasClass("type6")){
            $(".type6").removeClass("selected");
        }
        if($("#selectB").length <= 0){
            $("#select2 .select-all").addClass("selected");
        }
        // $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
    });


    $(".select dd").live("click", function () {
        console.log($(".select-result dd").length);
        if ($(".select-result dd").length > 1) {
            $(".select-no").hide();
        } else {
            $(".select-no").show();
        }
    });

});

function delById(elementId)
{
    while ($("#" + elementId).length > 0)
    {
        $("#" + elementId).remove();
    }
}


function select() {
    var arrays=new Array();
    i=$(".select-result a").length-1;
    // console.log("sdfsdgf"+$(".select-result .selected").text());
    while (i >=0)
    {
        arrays.push($(".select-result .selected a")[i].innerText);
        console.log($(".select-result .selected a")[i].innerText);
        i--;
    }
}


