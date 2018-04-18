jQuery(document).ready(function() {
    $(".register_container input").blur(function(){
        var isInputTextNull = $(this).val();
        var currName=this.name;
        $(this).parent().find(".error").fadeOut();
        console.log("11111111");
        if(currName=="username"){
            if(isInputTextNull==''){
                $(this).parent().find('.errorback0').fadeIn();
            }
        }
        if(currName=="newPassword"){
            console.log("aaa");
            if(isInputTextNull==''){
                $(this).parent().find('.errorback1').fadeIn();
            }
            else if($(this).val().length<6||$(this).val().length>10){
                $(this).parent().find('.errorback1').fadeIn();
                $(this).parent().find('.errorText_password').fadeIn();
            }else{
                $(this).parent().find('.errorback1').fadeOut();
                $(this).parent().find('.errorText_password').fadeOut();
            }
        }
        if(currName=="rePassword"){
            if(isInputTextNull==''){
                $(this).parent().find('.errorback2').fadeIn();
            }
            if($(this).parent().find('#password').val()!=$(this).val()){
                console.log("aaaaa"+$(this).parent().find('#password').val());
                console.log("bbbbbb"+$(this).val());
                $(this).parent().find('.errorback2').fadeIn();
                $(this).parent().find('.errorText_repassword').fadeIn();
            }
            else{
                $(this).parent().find('.errorback2').fadeOut();
                $(this).parent().find('.errorText_repassword').fadeOut();
            }
        }

        // sessionStorage.setItem("userName",username);
    });


    // 登录确定按钮事件，提交表单
    // $('.page-container form').submit(function(){
    //     console.log("login");
    //     var  username="hlp";
    //     // var username = $(this).find('.username').val();
    //     // var password = $(this).find('.password').val();
    //     // var rePassword = $(this).find('.rePassword').val();
    //     // if(username == '') {
    //     //     $(this).find('.errorback0').fadeIn();
    //     //     $(this).find('.error').fadeIn('fast', function(){
    //     //         $(this).parent().find('.username').focus();
    //     //     });
    //     //     return false;
    //     // }
    //     // if(password == '') {
    //     //     $(this).parent().find('.errorback1').fadeIn();
    //     //     $(this).find('.error').fadeIn('fast', function(){
    //     //         $(this).parent().find('.password').focus();
    //     //     });
    //     //     return false;
    //     // }
    //     // if(rePassword == '') {
    //     //     console.log("rePassword");
    //     //     $(this).parent().find('.errorback2').fadeIn();
    //     //     $(this).find('.error').fadeIn('fast', function(){
    //     //         $(this).parent().find('.rePassword').focus();
    //     //     });
    //     //     return false;
    //     // }
    //     // else if(rePassword.length<6||rePassword.length>10){
    //     //     $(this).find('.errorback1').fadeIn();
    //     //     $(this).find('.errorText_password').fadeIn();
    //     //     console.log(rePassword.length);
    //     //     return false;
    //     // }
    //     //
    //     // if($(this).find('.password').val()!=$(this).find('.repassword').val()){
    //     //     $(this).find('.errorback2').fadeIn();
    //     //     $(this).find('.errorText_repassword').fadeIn();
    //     //     return false;
    //     // }
    //
    //
    //
    //     // sessionStorage.setItem("userName",username);
    //     // window.location.href= "test.html";
    //     alert("登录成功！");
    //     window.location.href = "https://www.baidu.com";
    //     window.location.href= "test.html";
    //     // return true;
    //     // self.location = "test.html";
    //     // console.log("sdafadfadsf"+sessionStorage.getItem("b"));
    // });



    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
        $(this).parent().find('.errorText').fadeOut('fast');
    });

    $('#Register_button').click(function () {
        console.log("regis");
        var username = $(this).parent().find('#username').val();
        var password = $(this).parent().find('#password').val();
        if(username == '') {
            $(this).parent().find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if(password == '') {
            $(this).parent().find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
        Re(username,password);
    });

    $('#button_login').click(function () {
        var username = $(this).parent().find('.username').val();
        var password = $(this).parent().find('.password').val();
        if(username == '') {
            $(this).parent().find('.error').fadeIn('fast', function(){
                        $(this).parent().find('.username').focus();
            });
            return false;
        }
         if(password == '') {
            $(this).parent().find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
         }
         Login();


        // window.sessionStorage.setItem("userName",username);
        // window.sessionStorage.setItem("passWord",password);
        // $(location).attr('href', 'gameLobby.html');
        // console.log(window.sessionStorage.getItem("passWord"));
        // alert("登录成功！");
        
    });

    // $('#button').onclick(function(){
    //     var username = $(this).parent().find('.username').val();
    //     var password = $(this).parent().find('.password').val();
    //     console.log(username+password);
    //     console.log($(this).innerText);
    //     if (username == "a" && password == "123") {
    //         alert("登录成功！");
    //         sessionStorage.setItem("userName",username);
    //         location.href = "test.html";
    //     } else {
    //         alert("登录失败！");
    //         // myform.onsubmit = new Function("return false");
    //     }
    //
    // });
    // function login() {
    //     var username = $(this).parent().find('.username').val();
    //     var password = $(this).parent().find('.password').val();
    //     console.log(username+password);
    //     console.log($(this).innerText);
    //     if (username == "a" && password == "123") {
    //         alert("登录成功！");
    //         sessionStorage.setItem("userName",username);
    //         location.href = "test.html";
    //     } else {
    //         alert("登录失败！");
    //         // myform.onsubmit = new Function("return false");
    //     }
    // }

});



var uN = document.getElementById("username");

var pW = document.getElementById("password");
uN.addEventListener("input", function () {
    // document.getElementById("show").innerHTML = uN.value;
    console.log('uN.value'+uN.value);
});
pW.addEventListener("input",function () {
    console.log('pW.value'+pW.value);
});
var ws = null;
var socketstate = false;
function offlineCheck() {
    console.log("check");
    Offline.check();
    if(!socketstate){
        if(Offline.state === 'up'&&ws.reconnectAttempts>ws.maxReconnectInterval){
            console.log("up");
            //ws.refresh();
        }
        else{
            console.log("ssss");
        }
        //    buildSocket();
    }else{

        console.log("send");
        ws.send("{}");
    }
}
var t1 = null;
if (!("WebSocket" in window)) {
    alert("您的浏览器不支持 WebSocket!");
}
else {
    // ws = new ReconnectingWebSocket("ws://111.231.85.149:8080/Trivia-Server/websocket/Login");
    ws = new ReconnectingWebSocket("ws://182.254.220.56:8080/MyTestServer/websocket/Login");
    ws.onopen = function () {
        console.log("WebOpen");
        socketstate = true;
        clearInterval(t1);//去掉定时器
        t1 = setInterval(offlineCheck, 3000);
    };

    ws.onmessage = function (evt) {
        console.log("Back");
        socketstate = true;
        var received_msg = evt.data;
        console.log(received_msg);
        var msg = JSON.parse(received_msg);
        if(msg.resMsg==="LoginSuccess"){
            window.sessionStorage.setItem("userName",uN.value);
            console.log(window.sessionStorage.getItem("userName"));
            $(location).attr('href', 'gameLobby.html');
            alert("登录成功！");
        }
        else if(msg.resMsg==="LoginError"){
            alert("用户名或密码错误");
        }else if(msg.resMsg==="UserNameExists"){
            alert("用户名已存在！");
        }else if(msg.resMsg==="RegSuccess"){
            alert("注册成功！");
            $(location).attr('href', 'login.html');
        }else if(msg.resMsg==="UnkonwnError"){
            alert("未知错误！");
        }else if(msg.resMsg==="DatabaseError") {
            alert("数据库错误");
        }else if(msg.resMsg==="Login"){
            alert("该账号已登录！不能重复登陆");
        }
    };

    ws.onclose = function () {
        socketstate = false;
        console.log("连接已关闭...");
    };

    ws.onerror = function (evt) {
        socketstate = false;
        console.log(evt);
    };
}

window.onbeforeunload = function () {
    /*
    退出窗口则退出游戏，需要一个监听
     */
    ws.close();
}

var sCode;

function Login() {
    sCode='L';
    Send();
    console.log("Login");
    console.log("uN.value"+uN.value+"  "+pW.value);
}

function Re(username,password) {
    sCode='R';
    Send2(username,password);
}

function Send() {
    var js={
        Code : sCode,
        uName : uN.value,
        pWord : pW.value
    };
    var json = JSON.stringify(js);
    console.log(json);
    ws.send(json);
}
function Send2(username,password) {
    var js={
        Code : sCode,
        uName : username,
        pWord : password
    };
    var json = JSON.stringify(js);
    console.log(json);
    ws.send(json);
}


