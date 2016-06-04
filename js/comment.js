/**
 * Created by chenyi on 2016/04/29.
 */
var DComment = new Object();
$(document).ready(function () {

    DComment.addPagination(Number($('#commentPage').val()),Number($('#pageCount').val()));


    var editor = new wangEditor('textarea1');

    // 自定义菜单
    editor.config.menus = [
//        'source',
//        '|',     // '|' 是菜单组的分割线
        'bold',
        'underline',
        'italic',
        'strikethrough',
        'eraser',
        'forecolor',
        'bgcolor',
        'alignleft',
        'aligncenter',
        'alignright'
//        ,'img'
    ];


    editor.create();
    //添加新评论
    $('#comment_form').submit(function(){
        var url=$(this).attr("action"),
            _this=this,
            arr=$(this).serializeArray();
        var bool=get_comment_info(url,arr);
        if(bool==1){
            ajax1(url,arr,DComment.addComment_result);
        }
        editor.$txt.html("");
        return false;
    });

    function get_comment_info(url,arr){
        var content=editor.$txt.html();
        content=encodeURI(content,"UTF-8");
        var txt=editor.$txt.text();
        var txt1=editor.$txt.text();
        txt1 = txt1.replace(/\s/g,"");

        var diarySize=txt1.length;
        if(txt1.length==0||txt1==""){
            layer.msg("评论内容不能为空",{icon:2,time:1000});
            return 0;
        }
        if(diarySize>1000){
            layer.msg("内容不能超过一千字",{icon:2,time:1000});
            return 0;
        }
        //       var article_url1=$('#article_add_form').data("url");
        //      data_str+="&content="+content+"&txt="+txt+"&diarySize="+diarySize+"&role=1";
        arr.push({name:"content",value:content});
        arr.push({name:"diarySize",value:diarySize});
        //    arr.push({name:"role",value:"1"});
        return 1;
    }



});
//评论结果
DComment.addComment_result=function(data){
    data=FastJson.format(data);
    if(data["statusFlag"]==-2){
        layer.msg("请登陆后再试!",{icon:2,time:1000});
    }else if(data["statusFlag"]==-1){
        layer.msg("评论发布失败，请重新再试!",{icon:2,time:1000});
    }else if(data["statusFlag"]==1){
        $('#no-comemnt-info').addClass("hidden");
        $('#no-comemnt-info').remove();
        console.log(data);
        var rootUrl=getRootPath()+"/";
        var author_url=rootUrl+data.uUserDto.nickname;
        var user_url=rootUrl+data.dReply2Dtos[0].uUserByUserIdDto.nickname;
        var commenter_url=rootUrl+data.dReply2Dtos[0].uUserByCommentatorDto.nickname
        $('#d_comment>a>span').html("("+data["rows"]+")");
        $('#commentDiv').append("<div class='chat-message' id='commentDiv"+data["row"]+"' data-replyid='"+data["dreplyId"]+"'><a href='"+user_url+"'><img class='message-avatar' src='"+rootUrl+data["uUserDto"]["portrait"]+"' alt='"+data["uUserDto"]["nickname"]+"'> </a>"
            +" <span><b>"+data["row"]+"楼</b></span><span class='pull-right'><small>"+new Date(data["writeTime"]).format("yyyy-MM-dd hh:mm:ss")+"</small><a href='javascript:;' onclick='DComment.showCommentEditor("+data["row"]+")'>回复</a>"
            +" <span class='dropdown pull-right' onmouseover='dropdown_open(this)' onmouseout='dropdown_close(this)'><a class='dropdown-toggle' data-toggle='data-toggle'><i class='fa fa-sort-desc ' style='padding:0 5px; '></i></a>"
            +"   <ul class='dropdown-menu text-right'>"
            +"<li id='commentDelete"+data.row+"' data-url='"+commenter_url+"/article/"+data.dDiaryDto.diaryId+"/reply_delete'><a href='javascript:;' onclick='DComment.deleteComment("+data.row+","+data.dreplyId+")'>删除</a></li>"
            +"<li><a>举报</a></li>                </ul></span></span>"
            +"<div class='message'><a class='message-author' href='"+user_url+"'> "+data.uUserDto.nickname+":</a>"
            +"<span class='message-date'> "+new Date(data["writeTime"]).format("yyyy-MM-dd hh:mm:ss")+"  </span>"
            +"<span class='message-content'> "+data.dReply2Dtos[0].content+"</span>"
            +"<div class='form-group' >            <input type='text' class='form-control' placeholder='我也来评论一句' onclick='DComment.showCommentEditor("+data.row+")'> </div>"
            +"<div class='chat-message-form hidden'><form id='replyForm"+data.row+"' action='"+user_url+"/article/"+data.dDiaryDto.diaryId+"/reply2_add'>"
            +"<input type='hidden' name='DReply1Dto.dreplyId' value='"+data.dreplyId+"'>"
            +"<div id='dreply"+data.row+"' class='form-group' style='height:150px;max-height:200px;'></div>"
            +"<input class='btn btn-info' type='button' value='确认' onclick='DComment.addCommentReply("+data.row+")'></form>"
            +"</div></div></div>");
        if(data.dReply2Dtos[0].uUserByCommentatorDto.userId!=data.dReply2Dtos[0].uUserByUserIdDto.userId){
            $('#commentDelete'+data.row).addClass("hidden");
        }
        layer.msg("发布成功！",{icon:1,time:1000});

    }
}
var comment_dreply;
//显示评论回复编辑器
DComment.showCommentEditor=function(commentId){
    var commentDivId='#commentDiv'+commentId;
    $('div.chat-message-form').addClass("hidden");
    $('div.chat-message-form').prev().removeClass("hidden");
    $(commentDivId).find("div.message div.chat-message-form").removeClass("hidden");
    $(commentDivId).find("div.message div.chat-message-form").prev().addClass("hidden");
    if(comment_dreply!=null) {
        //    comment_dreply.destroy();
        //    comment_dreply.$txt.html("");
        $(commentDivId).find("div.message div.chat-message-form div.wangEditor-container").remove();
        if($("#dreply"+commentId).length<=0) {
            $(commentDivId).find("div.message div.chat-message-form").prepend("<div id='dreply" + commentId + "' class='form-group' style='height:150px;max-height:200px;'>");
        }
    }
    comment_dreply = new wangEditor('dreply' + commentId);
    // 自定义菜单
    comment_dreply.config.menus = [
//        'source',
//        '|',     // '|' 是菜单组的分割线
        'bold',
        'underline',
        'italic',
        'strikethrough',
        'eraser',
        'forecolor',
        'bgcolor',
        'alignleft',
        'aligncenter',
        'alignright'
//        ,'img'
    ];
    comment_dreply.create();
}
//添加评论回复
var formId;
DComment.addCommentReply=function(commentId){
    formId="replyForm"+commentId;
    var url=$("#"+formId).attr("action"),
        arr=$("#"+formId).serializeArray();;
    var content=comment_dreply.$txt.html();
    content=encodeURI(content,"UTF-8");
    var txt1=comment_dreply.$txt.text();
    txt1 = txt1.replace(/\s/g,"");

    var diarySize=txt1.length;
    if(txt1.length==0||txt1==""){
        layer.msg("评论内容不能为空",{icon:2,time:1000});
        return 0;
    }
    if(diarySize>1000){
        layer.msg("内容不能超过一千字",{icon:2,time:1000});
        return false;
    }

    arr.push({name:"content",value:content});
    ajax1(url,arr,DComment.addCommentReply_result());
}
//回复结果
DComment.addCommentReply_result=function(data){
    if(data["statusFlag"]==-2){
        layer.msg("请登陆后再试!",{icon:2,time:1000});
    }else if(data["statusFlag"]==-1){
        layer.msg("回复失败，请重新再试!",{icon:2,time:1000});
    }else if(data["statusFlag"]==1){
        console.log(data);
        var rootUrl=getRootPath()+"/";
        var user_url=rootUrl+data.uUserByUserIdDto.nickname;
        $("#"+formId).parent().before("<div class='chat-message'><a href='"+user_url+"'>"+
            "<img class='message-avatar' src='"+rootUrl+data["uUserByUserIdDto"]["portrait"]+"' alt='"+data["uUserByUserIdDto"]["nickname"]+"'></a>"
            +"<div class='message'><a class='message-author' href='"+user_url+"'> "+data["uUserByUserIdDto"]["nickname"]+"</a><span class='message-date'> "+new Date(data["replyTime"]).format("yyyy-MM-dd hh:mm:ss")+"  </span>"
            +"<span class='message-content'>"+data["content"]+"</span></div></div>");
        layer.msg("回复成功！",{icon:1,time:1000});
        comment_dreply.$txt.html("");
    }
}

//评论删除
DComment.deleteComment=function(commentId,replyId){
    var url=$("#commentDelete"+commentId).data("url");
    var commemtPage=$('#comment_page').val();
    var data="commentPage="+commemtPage+"&dreplyId="+replyId
    ajax1(url,data,DComment.deleteComment_result);
}
DComment.deleteComment_result=function(data){
    console.log(data);
    var flag= Number(data[0].statusFlag);
    switch  (flag){
        case -3:layer.msg("您没有权限删除!",{icon:2,time:1000});break;
        case -2:layer.msg("您还没有登陆，请登陆后再试",{icon:2,time:1000});break;
        case -1:layer.msg("操作失败，请重试",{icon:2,tome:1000});break;
        case 1:;
        default :DComment.addCommentInfo(data);
            layer.msg("发布成功！",{icon:1,time:1000});
    }


}
//删除回复
DComment.deleteCommentReply=function(){}

//页面跳转
DComment.goPage=function(page){
    var commentPage= Number($('#commentPage').val());
    var pageCount=Number($('#pageCount').val());
    page+=commentPage;
    if(page<1||page>pageCount){
        layer.msg("已经到底了",{icon:5,time:1000});
    }else{
        DComment.goDirectPage(page);
    }
}
//页面定位
DComment.goDirectPage=function(page){
    var url=$('#comment_pagination').data("url");
    var data="page="+page;
    ajax1(url,data,DComment.goPage_result);
}
//页面跳转结果
DComment.goPage_result=function(data){
    DComment.addCommentInfo(data);
    DComment.addPagination(Number($('#commentPage').val()),Number($('#pageCount').val()));
}
//添加分页
DComment.addPagination=function(page,pageCount){
  //  var page= Number($('#commentPage').val());
 //   var pageCount=Number($('#page').val());
    if(pageCount>1) {
         var html=createPagination(page,pageCount);
        $('#comment_pagination').html(html);
        if(page==1){
            $('#page_prev').addClass("disabled")
        }else if(page==pageCount){
            $('#page_next').addClass("disabled");
        }
        $('#page'+page).addClass("active");
        }
}
//添加评论内容，根据后台返回的json值进行解析
DComment.addCommentInfo=function(data){
    data=FastJson.format(data);
    if(data.length>0&&data[0].rows>0){
        $('#d_comment>a>span').html("("+data[0]["rows"]+")");
        $('#commentDiv').html("<input type='hidden' id='commentPage' name='commentPage' value='"+data[0].page+"'>");
        $('#commentDiv').append("<input type='hidden' name='pageCount' id='pageCount' value='"+data[0].pageCount+"'>");
        var rootUrl=getRootPath()+"/";
        for(var i=0;i<data.length;i++){
            var author_url=rootUrl+data[i].uUserDto.nickname;
            var user_url=rootUrl+data[i].dReply2Dtos[0].uUserByUserIdDto.nickname;
            var commenter_url=rootUrl+data[i].dReply2Dtos[0].uUserByCommentatorDto.nickname;
            var html="<div class='chat-message' id='commentDiv"+data[i]["row"]+"' data-replyid='"+data[i]["dreplyId"]+"'><a href='"+user_url+"'><img class='message-avatar' src='"+rootUrl+data[i]["uUserDto"]["portrait"]+"' alt='"+data[i]["uUserDto"]["nickname"]+"'> </a>"
                +" <span><b>"+data[i]["row"]+"楼</b></span><span class='pull-right'><small>"+new Date(data[i]["writeTime"]).format("yyyy-MM-dd hh:mm:ss")+"</small><a href='javascript:;' onclick='DComment.showCommentEditor("+data[i]["row"]+")'>回复</a>"
                +" <span class='dropdown pull-right' onmouseover='dropdown_open(this)' onmouseout='dropdown_close(this)'><a class='dropdown-toggle' data-toggle='data-toggle'><i class='fa fa-sort-desc ' style='padding:0 5px; '></i></a>"
                +"   <ul class='dropdown-menu text-right'>"
                +"<li id='commentDelete"+data[i].row+"' data-url='"+commenter_url+"/article/"+data[i].dDiaryDto.diaryId+"/reply_delete'><a href='javascript:;' onclick='DComment.deleteComment("+data[i].row+","+data[i].dreplyId+")'>删除</a></li>"
                +"<li><a>举报</a></li>                </ul></span></span>"
                +"<div class='message'><a class='message-author' href='"+user_url+"'> "+data[i].uUserDto.nickname+":</a>"
                +"<span class='message-date'> "+new Date(data[i]["writeTime"]).format("yyyy-MM-dd hh:mm:ss")+"  </span>"
                +"<span class='message-content'> "+data[i].dReply2Dtos[0].content+"</span>";
            //获取子评论（回复），从第二个开始
            var reply=data[i].dReply2Dtos;
            for(var j=1;j<reply.length;j++){
                user_url=rootUrl+reply[j].uUserByUserIdDto.nickname;
                html+="<div class='chat-message'><a href='"+user_url+"'>"+
                    "<img class='message-avatar' src='"+rootUrl+reply[j]["uUserByUserIdDto"]["portrait"]+"' alt='"+reply[j]["uUserByUserIdDto"]["nickname"]+"'></a>"
                    +"<div class='message'><a class='message-author' href='"+user_url+"'> "+reply[j]["uUserByUserIdDto"]["nickname"]+"</a><span class='message-date'> "+new Date(reply[j]["replyTime"]).format("yyyy-MM-dd hh:mm:ss")+"  </span>"
                    +"<span class='message-content'>"+reply[j]["content"]+"</span></div></div>";
            }
            html+="<div class='form-group' >            <input type='text' class='form-control' placeholder='我也来评论一句' onclick='DComment.showCommentEditor("+data[i].row+")'> </div>"
                +"<div class='chat-message-form hidden'><form id='replyForm"+data[i].row+"' action='"+user_url+"/article/"+data[i].dDiaryDto.diaryId+"/reply2_add'>"
                +"<input type='hidden' name='DReply1Dto.dreplyId' value='"+data[i].dreplyId+"'>"
                +"<div id='dreply"+data[i].row+"' class='form-group' style='height:150px;max-height:200px;'></div>"
                +"<input class='btn btn-info' type='button' value='确认' onclick='DComment.addCommentReply("+data[i].row+")'></form>"
                +"</div></div></div>";
            $('#commentDiv').append(html);
            if(data[i].dReply2Dtos[0].uUserByCommentatorDto.userId!=data[i].dReply2Dtos[0].uUserByUserIdDto.userId){
                $('#commentDelete'+data[i].row).addClass("hidden");
            }

        }

    }else{
        $('#commentDiv').html("<a id='no-comemnt-info' href='#textarea1'>还没有人评论，快来抢第一个沙发吧</a>");
        $('#d_comment>a>span').html("(0)");
    }
    window.location.hash('#commentDiv');
}