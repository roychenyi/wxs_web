/**
 * Created by chenyi on 2016/05/16.
 */
$(document).ready(function(){
    SysClub.getClubList();
    $('#wxs_name').blur(function(){SysClub.checkName(this)});
    $('#wxs_name').focus(function(){
        $('#feedback-name').removeClass('glyphicon-ok').removeClass('glyphicon-remove');
        $('#feedback-name').parent().removeClass('has-error');
        $('#error_text').html("");
    });
    $('#account').blur(function(){SysClub.checkAccount(this)});
    $('#account').focus(function(){
        $('#feedback-account').removeClass('glyphicon-ok').removeClass('glyphicon-remove');
        $('#feedback-account').parent().removeClass('has-error');
        $('#error_text').html("");
    });
    $('#createClubBtn').click(function(){
        SysClub.clubCreate();
    });
});
var SysClub={
    getUrl:function(){
        var url=window.location.href,
            data="page="+page,
            status=Number($('status').val());
        if(url.indexOf('?')>0){
            url=url.substring(0,url.indexOf('?'));
        }else if(url.indexOf('#')>0){
            url=url.substring(0,url.indexOf('#'));
        }
        return url;
    },
    //检查社团名称
    checkName:function(_this){
        var url=this.getUrl()+"/checkname",
            name=$(_this).val(),
            data="name="+$(_this).val()+"&nocahe=" + new Date().getTime();
        if(name.length<4||name.substring(name.length-3,name.length)!='文学社'){
            $('#feedback-name').addClass('glyphicon-remove');
            $('#feedback-name').parent().addClass('has-error');
            $('#error_text').html("<small>文学社名称必须以“文学社”结尾</small>");
            return false;
        }
        ajax1(url,data,SysClub.checkName_result);
    },
    checkName_result:function(data){
        if (data == "1") {
            $('#feedback-name').addClass('glyphicon-ok');
            $('#feedback-name').parent().removeClass('has-error');
            //    return ;
        } else {
            $('#feedback-name').addClass('glyphicon-remove');
            $('#feedback-name').parent().addClass('has-error');
            $('#error_text').html("<small>该名称已经被使用，请输入新的名称</small>");

        }
    },
    //检查社团账户
    checkAccount:function(_this){
        var url=this.getUrl()+"/checkaccount",
            data="name="+$(_this).val()+"&nocahe=" + new Date().getTime();
        ajax1(url,data,SysClub.checkAccount_reslut);
    },
    checkAccount_reslut:function(data){
        if (data == "1") {
            $('#feedback-account').addClass('glyphicon-ok');
            $('#feedback-account').parent().removeClass('has-error');
            //    return ;
        } else {
            $('#feedback-account').addClass('glyphicon-remove');
            $('#feedback-account').parent().addClass('has-error');
            $('#error_text').html("<small>该名称已经被使用，请输入新的名称</small>");

        }
    },
    //创建社团
    clubCreate:function(){
        var url=$('#clubCreateForm').attr('action'),
            data=$('#clubCreateForm').serialize(),
            pwd1=$('#password').val(),
            pwd2=$('#password1').val();
        if(pwd1==''||pwd2==''){
            $('#error_text').html("<small>密码不能为空</small>");
            return false;
        }else if(pwd1!=pwd2){
            $('#error_text').html("<small>两次密码不相同！</small>");
            return false;
        }else if(pwd1.length>48||pwd1.length<8){
            $('#error_text').html("<small>密码长度不能小于8且不能超过48</small>");
            return false;
        }
        if($('#error_text').val!=''){
            return false;
        }
        ajax1(url,data,SysClub.clubCreate_result);
    },
    clubCreate_result:function(data){
        var flag=Number(data.statusFlag);
        switch (flag){
            case -1:layer.msg("操作失败，请重新再试!",{icon:5,time:1000});break;
            case 1:$('#clubList ul').append("<li class='list-group-item'><span>data.name</span><span class='pull-right'>管理</span><span class='pull-right' name='school'><a>data.sysSchoolDto.name</a></span></li>");break;
        }
    },
    //获取社团列表
    getClubList:function(){
        var page=Number($('page').val()),
            pageCount=Number($('pageCount').val()),
            status=Number($('status').val()),
            url=this.getUrl();

        url+="/list";
        var data='page='+page;
        if(status==0||status==1){
            data='&status='+status;
        }
        ajax(url,data,SysClub.getClubList_result);
    },
    getClubList_result:function(data){
        SysClub.clubList(data);
        SysClub.addPagination(Number($('#page').val()),Number($('#pageCount').val()));
    },
    //添加list
    clubList:function(data){
        console.log(data);
        if(data!=null&&data.length>0) {
            var $clubList = $('#clubList'),
                html = "<ul class='list-group'>";
            $clubList.html("<input id='page' type='hidden' value='" + data[0].page + "'><input id='pageCount' type='hidden' value='" + data[0].page + "'>");
            for (var i = 0;i < data.length;i++){
                html+="<li class='list-group-item'><span>data.name</span><span class='pull-right'>管理</span><span class='pull-right' name='school'><a>data.sysSchoolDto.name</a></span></li>";
            }
            html+=" </ul>";
            $clubList.append(html);
        }

    },
    //添加分页
    addPagination:function(page,pageCount){
        if(pageCount>1){
            var html=createPagination(page,pageCount,'SysClub');
            $('#club_pagination').html(html);
            if(page===1){
                $('#page_prev').addClass("disabled");
            }else if(page===pageCount){
                $('#page_next').addClass("disabled");
            }
            $('#page'+page).addClass("active");
        }
    },
    goPage:function(page){
        var d_page=Number($('#page').val()),
            pageCount=Number($('#pageCount').val());
        page+=d_page;
        if(page<1||page>pageCount){
            layer.msg("已经到底了",{icon:5,time:1000});
        }else {
            this.goDirectPage(page);
        }
    },
    goDirectPage:function(page){
        var url=window.location.href,
            data="page="+page,
            status=Number($('status').val());
        if(url.indexOf('?')>0){
            url=url.substring(0,url.indexOf('?'));
        }else if(url.indexOf('#')>0){
            url=url.substring(0,url.indexOf('#'));
        }
        url+="/list";
        if(status==0||status==1){
            data='&status='+status;
        }
        ajax1(url,data,this.goPage_result);
    },
    goPage_result:function(data){
        SysClub.clubList(data);
        SysClub.addPagination(Number($('#page').val()),Number($('#pageCount').val()));
    }


};