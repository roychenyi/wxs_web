/**
 * 处理用户登录、注册、验证码验证
 * Created by chenyi on 2016/03/08.
 */
//邮箱列表
var hash = {
    'qq.com': 'http://mail.qq.com',
    'gmail.com': 'http://mail.google.com',
    'sina.com': 'http://mail.sina.com.cn',
    '163.com': 'http://mail.163.com',
    '126.com': 'http://mail.126.com',
    'yeah.net': 'http://www.yeah.net/',
    'sohu.com': 'http://mail.sohu.com/',
    'tom.com': 'http://mail.tom.com/',
    'sogou.com': 'http://mail.sogou.com/',
    '139.com': 'http://mail.10086.cn/',
    'hotmail.com': 'http://www.hotmail.com',
    'live.com': 'http://login.live.com/',
    'live.cn': 'http://login.live.cn/',
    'live.com.cn': 'http://login.live.com.cn',
    '189.com': 'http://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
    'yahoo.cn': 'http://mail.cn.yahoo.com/',
    'eyou.com': 'http://www.eyou.com/',
    '21cn.com': 'http://mail.21cn.com/',
    '188.com': 'http://www.188.com/',
    'foxmail.com': 'http://www.foxmail.com',
    'outlook.com': 'http://www.outlook.com'
}

$(document).ready(function () {

    //验证用户名
    $('#username').blur(function(){
        if(this.value.length>0){
            usercheck(this);
        }else{
            $('#feedback-username').removeClass('glyphicon-ok').removeClass('glyphicon-remove');
            $('#feedback-username').parent().removeClass('has-error');
        }
    });
    $('#username').focus(function(){
        $('#feedback-username').removeClass('glyphicon-ok').removeClass('glyphicon-remove');
        $('#feedback-username').parent().removeClass('has-error');
        $('#error_text').html("");
    });
    //验证码验证，失去焦点时验证
    $('#verifyCode').blur(
        function(){
            if(this.value.length>0){
                checkVerifyCode(this);
            }else{
                $('#feedback-verifyCode').removeClass('glyphicon-ok').removeClass('glyphicon-remove');
                $('#feedback-verifyCode').parent().removeClass('has-error');
            }
        }
    );
//验证码验证，当输入验证码长度达到4位数时验证
    $('#verifyCode').change(function(){
        if(this.value.length==4&&this.value.length>0) {
            checkVerifyCode(this);
        }
    });
//验证码输入框，聚焦时确定
    $('#verifyCode').focus(function(){
        $('#feedback-verifyCode').removeClass('glyphicon-ok').removeClass('glyphicon-remove');
        $('#feedback-verifyCode').parent().remove('has-error');
        $('#error_text').html("");
    });
//登陆
    $('#login').click(function() {
        if($('#username').val()==null||$('#username').val()==""){
            $('#error_text').html("用户名不能为空");
            return ;
        }
        if($('#password').val()==null||$('#password').val()==""){
            $('#error_text').html("密码不能为空");
            return ;
        }
        if($('#error_text').html()!=""){
            return;
        }
        var url=$('#loginform').attr('action')
        var str_data = $("#loginform input").map(function () {
            return ($(this).attr("name") + '=' + $(this).val());
        }).get().join("&");
        var data=$('#loginform').serializeArray();
        ajax1(url,data,login_result);

    });
    //忘记密码时，验证按钮点击事件
    $('#check').click(function(){
        var url=$('#forgotform').attr("action");
        var str_data = $("#forgotform input").map(function () {
            return ($(this).attr("name") + '=' + $(this).val());
        }).get().join("&");
        ajax1(url,str_data,forgotPwdCheck_result);

    });
//忘记密码时,修改密码    
    $('#newpwd').click(function(){
        var pwd1=$('#password').val();
        var pwd2=$('#password1').val();
        if(pwd1!=pwd2){
            $('#error_text').html("<small>两次输入密码不相同，请重新输入</small>");
            return null
        }else{
            var url=$('#changeform').attr("action");
            var str_data = $("#changeform input").map(function () {
                return ($(this).attr("name") + '=' + $(this).val());
            }).get().join("&");
            ajax1(url,str_data,forgot_changePwd_result);
        }

    });
    //更换新的密码，修改密码    
    $('#changepwd').click(function(){
        var pwd=$('#oldPassword').val();
        var pwd1=$('#password').val();
        var pwd2=$('#password1').val();
        if(pwd==pwd1){
            $('#error_text').html("<small>新密码不能和旧密码相同</small>");
            return null;
        }
        if(pwd1!=pwd2){
            $('#error_text').html("<small>两次输入密码不相同，请重新输入</small>");
            return null;
        }else{
            var url=$('#changeform').attr("action");
            var str_data = $("#changeform input").map(function () {
                return ($(this).attr("name") + '=' + $(this).val());
            }).get().join("&");
            ajax1(url,str_data,changePwd_result);

        }

    });
    /***
     * 下面开始注册和验证
     */
        //聚焦时清楚提示样式
    $('#reg_username').focus(function(){
        $('#feedback-username').removeClass('glyphicon-ok').removeClass('glyphicon-remove');
        $('#feedback-username').parent().remove('has-error');
    });
    //失去焦点验证用户名
    $('#reg_username').blur(function(){
        if(this.value.length==0){
            return null;
        }
        if(usercheck(this)==0){
            return null;
        }
        var  url="user/checkusername?username=" + this.value + "&nocahe=" + new Date().getTime();
        ajax1(url,"",reg_usernameCheck_result);

    });

    $('#nickname').focus(function(){
        $('#feedback-nickname').removeClass('glyphicon-ok').removeClass('glyphicon-remove');
        $('#feedback-nickname').parent().removeClass('has-error');
        $('#error_text').html("");
    });
    $('#nickname').blur(function(){
        if(this.value.indexOf("文学社")>=0){
            $('#feedback-nickname').addClass('glyphicon-remove');
            $('#feedback-nickname').parent().addClass('has-error');
            $('#error_text').html("<small>该昵称中不能包含文学社三个字！</small>");
            return null;
        }
        if(this.value.length==0){
            return null;
        }
        var url="user/checknickname";
        var  data="nickname=" + this.value + "&nocahe=" + new Date().getTime();
        ajax1(url,data,nicknameCheck_result);
    });
    $('#register').click(function(){
        var pwd1=$('#password').val();
        var pwd2=$('#password1').val();
        if('#flag'.value=="0"){
            return ;
        }
        if($('#nickname').val().indexOf("文学社")>=0){
            $('#feedback-nickname').addClass('glyphicon-remove');
            $('#feedback-nickname').parent().addClass('has-error');
            $('#error_text').html("<small>该昵称中不能包含文学社三个字！</small>");
            return null;
        }
        if($('#nickname').val().length==0){
            return null;
        }
        if($("#agreement").attr("checked")==false){
            $('#error_text').html("<small>请择同意我们的用户协议，否则注册无法完成！谢谢合作！</small>");
            return;
        }
        if(pwd1!=pwd2){
            $('#error_text').html("<small>两次输入密码不相同，请重新输入</small>");
            return ;
        }else{
            var url=$('#reg_form').attr('action')
            var str_data = $("#reg_form input").map(function () {
                return ($(this).attr("name") + '=' + $(this).val());
            }).get().join("&");
            ajax1(url,str_data,register_result);
        }

    });
    $(".form-group").find("input").focus(function(){
        $('#error_text').html("");
    });
});

function usercheck(user){
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if(!reg.test(user.value)){

        $('#feedback-username').addClass('glyphicon-remove');
        $('#feedback-username').parent().addClass('has-error');
        return 0;
    }else{
        $('#feedback-username').parent().removeClass('has-error');
        $('#feedback-username').addClass('glyphicon-ok');
    }

}
/***
 * 验证码检查
 * @param {} E
 */
function checkVerifyCode(E){
    var url=getRootPath()+"/checkVerifyCode?VerifyCode=" + E.value + "&nocahe=" + new Date().getTime();
    ajax1(url,"",checkVerifyCode_result);
}
//验证码验证结果
function  checkVerifyCode_result(data){
    if (data == "1") {
        $('#feedback-verifyCode').parent().removeClass('has-error');
        $('#feedback-verifyCode').addClass('glyphicon-ok');
        $('#error_text').html("");
    } else {
        $('#error_text').html("<small>验证码错误！</small>");
        $('#feedback-verifyCode').parent().addClass('has-error');
        $('#feedback-verifyCode').addClass('glyphicon-remove');

    }
}

//登陆结果
function login_result(data){
    var flag=data["statusFlag"];
    switch (flag){
        case "-4":$('#error_text').html("<small>您没有权限进行后台管理</small>");break;
        case "-3":
            $('#error_text').html("<small>登陆失败:账户未进行邮箱验证，请进入邮箱验证，请点击<button class='btn btn-default' onclick='sendRegisterMail();'>发送验证邮件</button></small>");break;
        case "-2":
            $('#error_text').html("<small>登陆失败:账户错误，请检查后登陆</small>");break;
        case "-1":
            $('#error_text').html("<small>登陆失败:密码错误，请检查后登陆</small>");break;
        case "0":
            $('#error_text').html("<small>登陆失败:验证码错误！</small>");break;
        case "1":
            window.location=data['url'];break;
        case "2":window.location=data['url'];break;
        default:;
    }
}
function forgotPwdCheck_result(data){
    if(data==null||data==""){
        $('#error_text').html("<small>该邮箱没有注册，请点击注册或者重新输入邮箱！</small>");
    }else{
        var _mail = $("#username").val().split('@')[1];    //获取邮箱域
        for (var j in hash){
            if(j == _mail){
                //$(".js_login_mail").show().attr("href", hash[_mail]);    //替换登陆链接
                layer.confirm("点击确认，可进入邮箱进行验证",{title:"提示"},function(){
                    window.location=hash[_mail];
                });
            }
        }


    }
}

//忘记密码后，修改密码结果
function forgot_changePwd_result(data){
    if(data["statusFlag"]==-1){

        $('#error_text').html("<small>修改密码失败！</small>");
    }else{
        window.location=data['url'];
    }
}
//修改密码结果
function changePwd_result(data){
    if(data["statusFlag"]==-1){

        $('#error_text').html("<small>输入旧密码错误，请重新输入！</small>");
    }else if(data["statusFlag"]==0){
        $('#error_text').html("<small>修改密码失败，请重新再试！</small>");
    }else{
        window.location=data["url"];
    }
}

//注册邮箱（用户登陆名）验证结果
function reg_usernameCheck_result(data){

    if (data == "1") {
        $('#feedback-username').addClass('glyphicon-ok');
        $('#feedback-username').parent().removeClass('has-error');
        return ;
    } else {
        $('#feedback-username').addClass('glyphicon-remove');
        $('#feedback-username').parent().addClass('has-error');
        $('#error_text').html("<small>该邮箱已经被注册，请确认这是您本人的邮箱吗？若忘记密码，可以去登陆页面点击找回密码</small>");

    }
}
//注册，昵称验证结果
function nicknameCheck_result(data){
    switch (data){
        case "-1": $('#feedback-nickname').addClass('glyphicon-remove');
            $('#feedback-nickname').parent().addClass('has-error');
            $('#error_text').html("<small>该昵称含非法字符，请您使用新的昵称！</small>");
            $('#flag').value="0";
            break;
        case "0":
            $('#feedback-nickname').addClass('glyphicon-remove');
            $('#feedback-nickname').parent().addClass('has-error');
            $('#error_text').html("<small>该昵称已经被使用，请使用其他昵称，谢谢！</small>");
            $('#flag').value="0";
            break;
        case "1":
            $('#feedback-nickname').addClass('glyphicon-ok');
            $('#feedback-nickname').parent().removeClass('has-error');
            $('#error_text').html("");
            $('#flag').value="1";
            break;
        default :;

    }
}

//注册结果
function register_result(data){
    if(data["statusFlag"]==-1){

        $('#error_text').html("<small>注册失败，请重新再试！</small>");
    }else if(data["statusFlag"]==1){
        var _mail = $("#reg_username").val().split('@')[1];    //获取邮箱域
        for (var j in hash){
            if(j == _mail){
                //$(".js_login_mail").show().attr("href", hash[_mail]);    //替换登陆链接
                layer.confirm("点击确认，可进入邮箱进行验证",{title:"提示"},function(){
                    window.location=hash[_mail];
                });
            }
        }
    }
}

function sendRegisterMail(){
    var username=$('#username').val(),
        url=getRootPath()+"//register/sendmail",
        data="name="+username;
    ajax(url,data,sendRegisterMail_result);

}

function sendRegisterMail_result(data){
    if(data.statusFlag=="1"){
        layer.msg("请进入的邮箱进行验证!",{icon:1,time:1000});
    }else{
        layer.alert('发送验证邮件失败，请联系管理员', {icon: 2});
    }
}