/**
 * Created by chenyi on 2016/04/02.
 */
$(document).ready(function () {


//设置性别的转换
    var sex_value= $('#sex').val();
    if(sex_value=="1"){
        $('#boy').attr("checked","checked");
    }else if(sex_value=="0"){
        $('#girl').attr("checked","checked");
    }

    $("input[name=sex_rodio]").click(function(){
        switch($("input[name=sex_rodio]:checked").attr("id")){
            case "boy":
                $('#sex').val('1');
                break;
            case "girl":
                $('#sex').val('0');
                break;
            default:
                break;
        }
    });

//设置生日的转换和获取


    var date=new Date();
    var year=date.getFullYear();
    for(var i=year;i>=1900;i--){
        $("#birthday_y").append("<option value="+i+" label="+i+">"+i+"</option>");
    }




    $('#birthday_y').change(function(){
        var birth_year=$('#birthday_y').val();
        if(birth_year!=""){
            var birth_month=$('#birthday_m').val();
            if(birth_month!=""){
                if(birth_month=="2"){
                    if((birth_year%4==0 && birth_year%100!=0) || (birth_year%400==0)){
                        $("#birthday_d").append("<option value=" + 29 + " label=" + 29 + ">" + 29 + "</option>");
                    }else{
                        $("#birthday_d option[value='29']").remove();
                    }
                }
            }else {
                for (var i = 1; i <= 12; i++) {
                    $("#birthday_m").append("<option value=" + i + " label=" + i + ">" + i + "</option>");
                }
            }
        }else{
            $("#birthday_m").html("<option value=''></option>");
            $("#birthday_d").html("<option value=''></option>");
        }
        checkBirthday();
    });
    $('#birthday_m').change(function(){
        var birth_year=$('#birthday_y').val();
        var birth_month=this.value;
        var birth_day=$('#birthday_d').val();
        if(birth_month!=""){
            switch (birth_month){
                case "1":case "3":case "5":case "7":case "8":case "10":case "12":
                if(birth_day=="") {
                    $("#birthday_d").empty();
                    $("#birthday_d").append("<option value='' ></option>");
                    for (var i = 1; i <= 31; i++) {
                        $("#birthday_d").append("<option value=" + i + " label=" + i + ">" + i + "</option>");
                    }
                }else {
                    switch ($("#birthday_d option:last").attr("value")){
                        case "28":$("#birthday_d").append("<option value=" + 29 + " >" + 29 + "</option>");
                        case "29":$("#birthday_d").append("<option value=" + 30 + " >" + 30 + "</option>");
                            $("#birthday_d").append("<option value=" + 31 + " >" + 31 + "</option>");break;
                        case "30":$("#birthday_d").append("<option value=" + 31 + " >" + 31 + "</option>");
                            break;
                        default :break;

                    }
                }
                break;
                case "4":case "6":case "9": case "11":
                if(birth_day=="") {
                    $("#birthday_d").empty();
                    $("#birthday_d").append("<option value='' ></option>");
                    for (var i = 1; i <= 30; i++) {
                        $("#birthday_d").append("<option value=" + i + " label=" + i + ">" + i + "</option>");
                    }
                }else{
                    switch ($("#birthday_d option:last").attr("value")){
                        case "28":$("#birthday_d").append("<option value=" + 29 + " >" + 29 + "</option>");
                        case "29":$("#birthday_d").append("<option value=" + 30 + " >" + 30 + "</option>");
                        case "31":$("#birthday_d option[value='31']").remove();
                            break;
                        default :break;

                    }
                }
                break;
                case "2":
                    if(birth_day==""){
                        if((birth_year%4==0 && birth_year%100!=0) || (birth_year%400==0)){
                            for(var i=1;i<=29;i++){
                                $("#birthday_d").append("<option value="+i+" label="+i+">"+i+"</option>");
                            }
                        }else{
                            for(var i=1;i<=28;i++){
                                $("#birthday_d").append("<option value="+i+" label="+i+">"+i+"</option>");
                            }
                        }}else{
                        $("#birthday_d option[value='31']").remove();
                        $("#birthday_d option[value='30']").remove();
                        if((birth_year%4==0 && birth_year%100!=0) || (birth_year%400==0)){

                        }else{
                            $("#birthday_d option[value='29']").remove();
                        }
                    }
                    break;
                default :break;
            }


        }
        checkBirthday();
    });

    $('#birthday_d').change(function() {
            checkBirthday();
        }
    );
    $('#birthday_d').focus(
        function(){
            if($('#birthday_m').val()==""){
                $("#birthday_d").empty();
                $("#birthday_d").append("<option value='' ></option>");
            }
        }
    );

    //根据后台提供的数据，填充用户的值
    var birth_value=$('#birth').val();
    if(birth_value!="") {
        var date1 = new Date(birth_value);
        var b_year=date1.getFullYear();
        var b_month=date1.getMonth()+1;
        var b_day=date1.getDate();
        $("#birthday_y").find("option[value='"+b_year+"']").attr("selected","selected");
        if($('#birthday_y').val()!="") {
            for (var i = 1; i <= 12; i++) {
                $("#birthday_m").append("<option value=" + i + " label=" + i + ">" + i + "</option>");
            }
        }
        $("#birthday_m").find("option[value='"+b_month+"']").attr("selected","selected");
        switch (b_month){
            case 1:case 3:case 5:case 7:case 8:case 10:case 12:
            for (var i = 1; i <= 31; i++) {
                $("#birthday_d").append("<option value=" + i + " label=" + i + ">" + i + "</option>");
            }
            break;
            case 4:case 6:case 9: case 11:

            $("#birthday_d").append("<option value='' ></option>");
            for (var i = 1; i <= 30; i++) {
                $("#birthday_d").append("<option value=" + i + " label=" + i + ">" + i + "</option>");
            }
            break;
            case 2:
                if((b_year%4==0 && b_year%100!=0) || (b_year%400==0)){
                    for(var i=1;i<=29;i++){
                        $("#birthday_d").append("<option value="+i+" label="+i+">"+i+"</option>");
                    }
                }else{
                    for(var i=1;i<=28;i++){
                        $("#birthday_d").append("<option value="+i+" label="+i+">"+i+"</option>");
                    }
                }
                break;
            default :break;
        }
        $("#birthday_d").find("option[value='"+b_day+"']").attr("selected","selected");
    }

//验证生日是否输入完整
    function checkBirthday(){
        var b_year= $('#birthday_y').val();
        var b_month=$('#birthday_m').val();
        var b_day=$('#birthday_d').val();
        if(b_year!=""&&b_month!=""&&b_day!=""){
            $('#birth').val(b_year+"-"+b_month+"-"+b_day);
            $('#birth_error_info').addClass("hidden");
        }else{
            $('#birth').val("");
            $('#birth_error_info').removeClass("hidden");
        }
    }

    //血型
    var blood_value=$('#blood').val();
    if(blood_value!=""){
        $("#blood_select").find("option[value='"+blood_value+"']").attr("selected","selected");
    }
    $("#blood_select").change(function(){
        $('#blood').val(this.value);
    });

    //签名单|个人介绍
    $('#sign').val("");
    $('#sign').change(function(){

        if(this.value.length>36){
            $('#sign_error_info').removeClass("hidden");
        }else{
            $('#sign_error_info').addClass("hidden");
        }
    });

    $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).prev().children(".panel-title").find("a").find("code").html("收起");

    });
    $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).prev().children(".panel-title").find("a").find("code").html("编辑");
        //	 $('#collapseexample').prev().children(".panel-title").find("a").append("<code class='pull-right'>编辑</code>");
        //   alert('嘿，当您展开时会提示本警告');
    });
    $("#defaultInfo").click(function(){
        this.$default_info_form=$('#default_info_form');
        form_submit(this.$default_info_form);
    });
//提交开始
    function submitStart() {
        layer.load();
    }
    //提交结束
    function submitEnd(){
        layer.closeAll('loading')
    }
    //提交失败
    function submitFail(msg){
        layer.alert(msg);
    }
    //表单提交
    function form_submit(e){
        var url = $(e).attr('action');
        var arr = $(e).serializeArray();

        var data_str = $.param(arr);
        check(url,data_str)
        var a= $.cookie("flag");
        if(a=="true"){
            layer.msg("更新成功！",{icon:1});
        }else{
            layer.msg("更新失败！",{icon:2});
        }
    }
    //修改空间标题
    $('#title_form').submit(function(){
        form_submit(this);
        return false;
    });
    //设置文章是否可投递
    var pull_status_value= $('#pull_status').val();
    if(pull_status_value=="1"){
        $('#pull_yes').attr("checked","checked");
    }else if(pull_status_value=="0"){
        $('#pull_no').attr("checked","checked");
    }

    $("input[name=pull_rodio]").click(function(){
        switch($("input[name=pull_rodio]:checked").attr("id")){
            case "pull_yes":
                $('#pull_status').val("1");
                break;
            case "pull_no":
                $('#pull_status').val("0");
                break;
            default:
                break;
        }
    });
    $("#pull_form").submit(function(){
        form_submit(this);
        return false;
    });

    var CATALOG_GROUP_ITEM="<a class='pull-right' title='delete' href='javascript:;'  >删除</a>&nbsp;&nbsp;<a class='pull-right' href='javascript:;'  title='edite' >编辑</a>";
    var CATALOG_FORM="<form role='form' id='catalog-change_form' class='form-horizontal' ><div class='form-group'><div class='col-sm-5'><input type='text' class='form-control'></div> <button name='sure' class='btn btn-info'>确定</button>&nbsp;&nbsp;<button name='reset' class='btn btn-info'>取消</button></div></form>";

//目录管理
    //目录删除
    $("#catalog div ul.list-group li div").find("a[title='delete']").click(function(){

        deleteClick(this);
        resetClick()
    });
//目录编辑
    $("#catalog div ul.list-group li div").find("a[title='edite']").click(function(){
        resetClick();
        editeClick(this);
    });
    //取消按钮
    $("#catalog div ul.list-group li form").find("input[name='reset']").click(function(){
        var catalogName= $(e).parent().parent().next().find("span").html();
        $(e).parent().parent().find("input[type='text']").val(catalogName);
        resetClick();
    });
    //确认按钮
    $("#catalog div ul.list-group li form").find("input[name='sure']").click(function(){

        sureClick(this);
        return false;
    });
    //检查目录重名
    function checkName(){
        var e= $("#catalog div ul.list-group li form").find("input[name='catalogName']");
        var url=$(e).data("url");
        var data_str="catalogName="+$(e).val();
        return check(url,data_str);

    }

    //删除按钮
    function deleteClick(e){
        layer.confirm("确定要删除吗？(如果你确定删除,该目录下的文章将转存到个人日记中。)",{title:"提示"},function(index){
            var url=$(e).data("url");
            check(url,"")
            var a= $.cookie("flag");
            if(a=="true"){
                layer.msg('更新成功！', {icon: 1});
                $(e).parent().parent().remove();


            }else{
                layer.msg("信息更新失败！",{icon: 2});

            }

            layer.close(index);
        });

    }
    //编辑按钮
    function editeClick(e){
        $(e).parent().prev().removeClass("hidden");
        $(e).parent().addClass("hidden");

    }


    //取消事件
    function resetClick(){
        //   var catalogName =$('#catalog div ul li div span').html();
        //   $('#catalog div ul li form.form-horizontal').find("input[type='text']").val(catalogName);
        $('#catalog div ul li form.form-horizontal').addClass("hidden");
        $('#catalog div ul li div').removeClass("hidden");
    }


    //确认事件
    function sureClick(e){
        //  alert($(e).prev().find("input[type='text']"));
        var catalog_name= $(e).prev().find("input[type='text']").val();
        var catalog_name_url=$(e).prev().find("input[type='text']").data("url");
        if($(e).parent().parent().next().find("span").length>0){
            if(catalog_name==""){
                layer.alert("请输入文章分类名称",{title:"提示",icon:0},function(index){
                    $(e).prev().find("input[type='text']").focus();
                    layer.close(index);
                });

                $("#catalog_new form").removeClass("hidden");
                return ;
            }else{
                ctalog_name_url+="&catalogName="+catalog_name;


                check(catalog_name_url,"");
                var b= $.cookie("flag");
                if(b=="true"){
                    layer.alert("您输入的分类名称与其他的重复，请检查后重新输入!",{icon:5});
                }
                var form_e=$(e).parent().parent();

                var url = $(form_e).attr('action');
                var arr = $(form_e).serializeArray();

                var data_str = $.param(arr);
                check(url,data_str)
                var a= $.cookie("flag");
                if(a=="true"){
                    layer.msg('更新成功！', {icon: 1});
                    $(e).parent().parent().next().find("span").html(catalog_name);
                    resetClick();
                    return false;
                }else{
                    layer.msg("信息更新失败！",{icon: 2});
                    return false;
                }
                /* $.ajax({
                 url:url,
                 type:"POST",
                 data:data_str,
                 dataType:"json",
                 beforeSend: function () {
                 submitStart();
                 },

                 success: function (data) {
                 if(data["statusFlag"]==-1){
                 layer.msg("信息更新失败！",{icon: 2});
                 return false;
                 }else if(data["statusFlag"]==1){
                 layer.msg('更新成功！', {icon: 1});
                 $(e).parent().parent().next().find("span").html(data["catalogName"]);
                 resetClick();

                 }

                 },

                 error: function (XMLHttpRequest, textStatus, errorThrown) {
                 submitFail(textStatus || errorThrown);
                 return false;
                 },

                 complete: function () {
                 submitEnd();
                 }

                 });*/

            }
        }
        return false;
    }

//添加分类
    $('#catalog_add').click(function(){
        $("#catalog_new").removeClass("hidden");
        $("#catalog_new form").removeClass("hidden");
    });
    //添加取消
    $("#catalog_new form").find("input[name='reset']").click(function(){
        $("#catalog_new form").find("input[type='text']").val("");
        $("#catalog_new").addClass("hidden");
    });
    //添加确认
    $("#catalog_new form").submit(function(){
        var catalog_name=$(this).find("input[type='text']").val();
        //当分类名为空，是退出
        if(catalog_name==""){
            layer.alert("请输入文章分类名称",{title:"提示",icon:0},function(index){
                $("#catalog_new form").find("input[type='text']").focus();
                $("#catalog_new form").removeClass("hidden");
                layer.close(index);
            });
            return false;
        }
        var catalog_name_url=$(this).find("input[type='text']").data("url");
        ctalog_name_url+="&catalogName="+catalog_name;
        check(catalog_name_url,"");
        var b= $.cookie("flag");
        if(b=="true"){
            layer.alert("您输入的分类名称与其他的重复，请检查后重新输入!",{icon:5});
            return false;
        }
        var url = $(this).attr('action');
        var arr = $(this).serializeArray();
        var data_str = $.param(arr);
        /*check(url,data_str)
         var a= $.cookie("flag");
         if(a=="true"){
         layer.msg('添加成功！', {icon: 1});
         catalog_name=data["catalogName"];
         var catalog_id=data["catalogId"];
         url+="?catalogId="+catalog_id;
         var item_html = "<li class='list-group-item' id='" + catalog_id + "'><form  class='form-horizontal hidden' action='"+url+"' ><div class='form-group'><div class='col-sm-5'><input type='text' class='form-control' value='" + catalog_name + "'></div> <input type='button' name='sure' class='btn btn-info' value='确定' /> &nbsp;&nbsp;<input type='button' name='reset' class='btn btn-info' value='取消'/></div></form>"
         + "<div><span>" + catalog_name + "</span>" + "<a class='pull-right' title='delete' href='javascript:;' data-url'"+url+"&status=delete'  >删除</a>&nbsp;&nbsp;<a class='pull-right' href='javascript:;'  title='edite' >编辑</a>" + "</div></li>";
         $("#catalog_new").before(item_html);
         //目录删除
         $("#catalog div ul.list-group li div").find("a[title='delete']").click(function(){

         deleteClick(this);
         resetClick()
         return false;
         });
         //目录编辑
         $("#catalog div ul.list-group li div").find("a[title='edite']").click(function(){
         resetClick();
         editeClick(this);
         return false;
         });
         //取消按钮
         $("#catalog div ul.list-group li form").find("input[name='reset']").click(function(){
         resetClick();
         return false;
         });
         //确认按钮
         $("#catalog div ul.list-group li form").find("input[name='sure']").click(function(){
         sureClick(this);
         return false;
         });
         $("#catalog_new form").find("input[type='text']").val("");
         $("#catalog_new").addClass("hidden");
         return false;
         }else{
         layer.msg("信息添加失败！",{icon: 2});
         return false;
         }*/
        $.ajax({
            url:url,
            type:"POST",
            data:data_str,
            dataType:"json",
            beforeSend: function () {
                submitStart();
            },

            success: function (data) {
                if(data["statusFlag"]==-1){
                    layer.msg("信息添加失败！",{icon: 2});
                    return false;
                }else if(data["statusFlag"]==1){
                    layer.msg('添加成功！', {icon: 1});
                    catalog_name=data["catalogName"];
                    var catalog_id=data["catalogId"];
                    url+="?catalogId="+catalog_id;
                    var item_html = "<li class='list-group-item' id='" + catalog_id + "'><form  class='form-horizontal hidden' action='"+url+"' ><div class='form-group'><div class='col-sm-5'><input type='text' class='form-control' value='" + catalog_name + "'></div> <input type='button' name='sure' class='btn btn-info' value='确定' /> &nbsp;&nbsp;<input type='button' name='reset' class='btn btn-info' value='取消'/></div></form>"
                        + "<div><span>" + catalog_name + "</span>" + "<a class='pull-right' title='delete' href='javascript:;' data-url'"+url+"&status=delete'  >删除</a>&nbsp;&nbsp;<a class='pull-right' href='javascript:;'  title='edite' >编辑</a>" + "</div></li>";
                    $("#catalog_new").before(item_html);
                    //目录删除
                    //目录删除
                    $("#catalog div ul.list-group li div").find("a[title='delete']").click(function(){

                        deleteClick(this);
                        resetClick()
                    });
                    //目录编辑
                    $("#catalog div ul.list-group li div").find("a[title='edite']").click(function(){
                        resetClick();
                        editeClick(this);
                    });
                    //取消按钮
                    $("#catalog div ul.list-group li form").find("input[name='reset']").click(function(){
                        var catalogName= $(e).parent().parent().next().find("span").html();
                        $(e).parent().parent().find("input[type='text']").val(catalogName);
                        resetClick();
                    });
                    //确认按钮
                    $("#catalog div ul.list-group li form").find("input[name='sure']").click(function(){
                       /* if(checkName()=="flase"){
                            layer.alert("您输入的分类名称与其他的重复，请检查后重新输入！",{icon:5});
                            return false;
                        }*/
                        sureClick(this);
                        return false;
                    });
                    $("#catalog_new form").find("input[type='text']").val("");
                    $("#catalog_new").addClass("hidden");
                }
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                submitFail(textStatus || errorThrown);
                return false;
            },

            complete: function () {
                submitEnd();
            }

        });
        return false;
    });

    function check(url,data_str){
        var a=false;
        $.ajax({
            url:url,
            type:"POST",
            data:data_str,
            dataType:"json",
            async: false,
            beforeSend: function () {
                submitStart();
            },

            success: function (data) {
                if(data["statusFlag"]==-1){
                    $.cookie("flag","false");  a=false;
                }else if(data["statusFlag"]==1){
                    $.cookie("flag","true");
                    a=true;
                }
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                submitFail(textStatus || errorThrown);
                a=false;
            },

            complete: function () {
                submitEnd();
            }

        });
        return a;
    }

});
