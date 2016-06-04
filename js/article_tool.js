/**
 * Created by chenyi on 2016/04/25.
 */

$(document).ready(function () {

    $("#d_toTrash a").click(function(){    Ariticle_Tool.d_totrash(this) });
    $("#d_delete a").click(function(){    Ariticle_Tool.d_delete(this) });
    $('#d_private a').click(function(){Ariticle_Tool.d_toPrivate(this)});
    $('#d_toCommen a').click(function(){Ariticle_Tool.d_tocommen(this)});

    $('#d_upvote a').click(function(){ Ariticle_Tool.d_upvote(this);    });
    $('#d_favorite a').click(function () {   Ariticle_Tool.d_favorite(this);});


    Ariticle_Tool.addPagination(Number($('#page').val()),Number($('#pageCount').val()));
    Ariticle_Tool.updateCount(window.location.href+"/infoCount");
    Ariticle_Tool.getCatalog();
    Ariticle_Tool.roleSet();
});
var Ariticle_Tool={
    userId:Number($('#U_userId').val().trim()),
    authorId:Number($('#author_id').val().trim()),
    role:Number($('#role').val()),
    //权限配置
    roleSet:function(){
        if($('#role').val()!=''&&$('#role').val()!=null){
            var role=Number($('#role').val())
            switch (role){
                case -1:$("li[name='d_toTrash']").addClass("hidden");break;
                case 0:$("li[name='d_private']").addClass("hidden");break;
                case 1:$("li[name='d_toCommen']").addClass("hidden");break;break;
                case 2:$("li[name='d_toTrash']").addClass("hidden");break;
                case 3:$("span[name='dropdown']").addClass("hidden");break;
                default :;
            }
        }
    },
    //文章删除
    d_totrash:function(_this){
        var url=$(_this).data("url");
        layer.confirm('您确定将该文章移到回收站吗？',{title:"删除提示",btn: ['确定','取消'] //按钮
        },function(){
            ajax1(url,'',Ariticle_Tool.d_totrash_result);
        });
    },
    //文章删除结果
    d_totrash_result:function(data){
        if(data["statusFlag"]==-2){
            layer.msg("您没有权限删除!",{icon:5,time:1000});
        }else if(data["statusFlag"]==-1){
            layer.msg("删除失败，请重新再试，或给管理员提意见!",{icon:2,time:1000});
        }else if(data["statusFlag"]==1){

            window.location.href=data["url"];
        }
    },
    //文章删除
    d_delete:function(_this){
        var url=$(_this).data("url");
        layer.confirm('您确定彻底删除该文章吗？',{title:"删除提示",btn: ['确定','取消'] //按钮
        },function(){
            ajax1(url,'',Ariticle_Tool.d_delete_result);
        });
    },
    //删除结果
    d_delete_result:function(data){
        var flag=Number(data["statusFlag"]);
        switch (flag){
            case -2:layer.msg("您没有权限删除!",{icon:5,time:1000});break;
            case -1:layer.msg("转私密失败，请重新再试，或给管理员提意见!",{icon:2,time:1000});
            case 1:window.location.href=data["url"];break;
            default :break;
        }
    },
    //文章点赞
    d_upvote:function(_this){
        var url=$(_this).data("url");
        ajax1(url,'',Ariticle_Tool.d_upvote_result);
    },
    //文章点赞结果
    d_upvote_result:function(data){
        var flag=Number(data["statusFlag"]);
        switch(flag){
            case -2: layer.msg("您尚未登陆，请登陆后再试!",{icon:5,time:1000});break;
            case -1:layer.msg("点赞失败，请重新再试!",{icon:2,time:1000});break;
            case 0:$('#d_upvote>a>span').html("("+data["upvoteCount"]+")");
                $('#d_upvote>a>i').addClass("fa-thumbs-o-up");
                $('#d_upvote>a>i').removeClass("fa-thumbs-up text-warning");
                layer.msg("点赞-1!",{icon:5,time:1000});break;
            case 1: $('#d_upvote>a>span').html("("+data["upvoteCount"]+")");
                $('#d_upvote>a>i').removeClass("fa-thumbs-o-up");
                $('#d_upvote>a>i').addClass("fa-thumbs-up text-warning");
                layer.msg("点赞+1!",{icon:6,time:1000});break;
            default :;
        }

    },
    //文章收藏
    d_favorite:function(_this){
        var url=$(_this).data("url");
        ajax1(url,'',Ariticle_Tool.d_favorite_result);
    },
    //文章收藏结果
    d_favorite_result:function(data){
        var flag=Number(data["statusFlag"]);
        switch(flag){
            case -2:layer.msg("您尚未登陆，请登陆后再试!",{icon:5,time:1000});break;
            case -1:layer.msg("点赞失败，请重新再试!",{icon:2,time:1000});break;
            case 0:$('#d_favorite>a>span').html("("+data["favoriteCount"]+")");
                $('#d_favorite>a>i').addClass("fa-star-o");
                $('#d_favorite>a>i').removeClass("fa-star text-warning");
                layer.msg("点赞-1!",{icon:5,time:1000});break;
            case 1:$('#d_favorite>a>span').html("("+data["favoriteCount"]+")");
                $('#d_favorite>a>i').removeClass("fa-star-o ");
                $('#d_favorite>a>i').addClass("fa-star text-warning");
                layer.msg("点赞+1!",{icon:6,time:1000});break;
            default:break;

        }
    },
    //转私密文章
    d_toPrivate:function(_this){
        var url=$(_this).data("url");
        ajax1(url,'',Ariticle_Tool.d_toPrivate_result);
    },
    d_toPrivate_result:function(data){
        var flag=Number(data["statusFlag"]);
        switch (flag){
            case -2:layer.msg("您没有权限进行操作!",{icon:5,time:1000});break;
            case -1:layer.msg("转私密失败，请重新再试，或给管理员提意见!",{icon:2,time:1000});
            case 1:window.location.href=data["url"];break;
            default :break;
        }
    },
    d_tocommen:function(_this){
        var url=$(_this).data('url');
        ajax1(url,'',Ariticle_Tool.d_tocommen_result)
    },
    d_tocommen_result:function(data){
        var flag=Number(data["statusFlag"]);
        switch (flag){
            case -2:layer.msg("您没有权限进行操作!",{icon:5,time:1000});break;
            case -1:layer.msg("转私密失败，请重新再试，或给管理员提意见!",{icon:2,time:1000});
            case 1:window.location.href=data["url"];break;
            default :break;
        }
    },
    //更新文章计数
    updateCount:function(url){
        ajax(url,'',Ariticle_Tool.updateCount_result);
    },
    //更新文章计数结果
    updateCount_result:function(data){
        $('#d_upvote>a>span').html("("+data.upvoteCount+")");
        $('#d_comment>a>span').html("("+data.replyCount+")");
        $('#d_favorite>a>span').html("("+data.favoriteCount+")");
    },
    //获取文章分类列表
    getCatalog:function(){
        var role=Number($('#role').val()),
            $catalog=$('#catalog');
        if(role===1&&$catalog!=null){
            var url= $catalog.data('url');
            ajax(url,'',Ariticle_Tool.getCatalog_result);
        }
    },
    getCatalog_result:function(data){
        var $catalog=$('#catalog');
        var html="<input   type='hidden' id='catalogId' value=''>"
            +"<ul class='list-group'><li class='list-group-item'><h4 class='list-group-item-heading text-info'>文章分类</h4></li>"
            +"<li class='list-group-item'><span>全部文章</span><span class='pull-right'>("+data[0].articleCount+")</span></li>";
        for(var i=1;i<data.length;i++){
            html+="<li id='catalog"+data[i].catalogId+"' class='list-group-item'><a href='javascript:;' onclick='Ariticle_Tool.getDiarysByCatalog("+data[i].catalogId+")'><span>"+data[i].catalogName+"</span><span class='pull-right'>("+data[i].articleCount+")</span></a></li>";
        }
        html+="</ul>"
        $catalog.html(html);

    },
    getDiarysByCatalog:function(catalogId){
        $('#catalogId').val(catalogId);
        $("li[id='catalog*']").removeClass('text-warning');
        $('#catalog'+catalogId).addClass('text-warning');
        Ariticle_Tool.goDirectPage(1);
    },
    getDiarysByCatalog_result:function(data){

    },
    //文章列表更新
    list_info:function(data){
        data=FastJson.format(data);
        console.log(data);
        if(data.length>0&&data[0].rows>0) {
            var role=Ariticle_Tool.role;
            $('#diary_list').html("<input id='page' type='hidden' value='" + data[0].page + "'>"
                + "<input id='pageCount' type='hidden' value='" + data[0].pageCount + "'>"
                +"<input id='role' type='hidden' value='" + role+ "'>");
            var html = "<ul class='list-group'>";
            var rootUrl=getRootPath()+"/";
            var user_url=rootUrl+data[0].uUserDto.nickname;
            for(var i=0;i<data.length;i++){
                html+="<li class='list-group-item'><a href='"+user_url+"/article/details/"+data[i].diaryId+"'>"+data[i].title+"</a>"
                    +"<span id='toolMenu' name='dropdown' class='pull-right dropdown' onmouseover='dropdown_open(this)' onmouseout='dropdown_close(this)'>&nbsp;"
                    +"  <a class='dropdown-toggle active' href='"+user_url+"/article/article_edite/"+data[i].diaryId+"' data-toggle='data-toggle'>编辑<span class='caret'></span></a>"
                    +"<ul class='dropdown-menu'>"
                    +"<li id='d_modify' name='d_modify'><a href='"+user_url+"/article/article_edite/"+data[i].diaryId+"'>编辑</a></li>"
                    +"<li id='d_toCommen' name='d_toCommen'><a data-url='"+user_url+"/article/tocommen/"+data[i].diaryId+"' href='javascript:;' >公开发布文章</a></li>"
                    +"<li id='d_toTrash' name='d_toTrash'><a data-url='"+user_url+"/article/totrash/"+data[i].diaryId+"' href='javascript:;' >删除</a></li>"
                    +"<li id='d_delete' name='d_delete'><a data-url='"+user_url+"/article/todelete/"+data[i].diaryId+"' href='javascript:;'>彻底删除</a></li>"
                    +"<li id='d_private' name='d_private'><a data-url='"+user_url+"/article/toprivate/"+data[i].diaryId+"' href='javascript:;'>转为私密文章</a></li>"
                    +"</ul></span>"
                    +"<div class='pull-right'>"+new Date(data[i].writeTime).format("yyyy/MM/dd")+"&nbsp;("+data[i].replyCount+"/"+data[i].viewCount+")</div>"
                    +"</li>" ;
            }
            html+="</ul>";
            $('#diary_list').append(html);
            if(Ariticle_Tool.userId!=Ariticle_Tool.authorId){
                $('#toolMenu').addClass("hidden");
            }else {
                Ariticle_Tool.roleSet();
                $("#d_toTrash a").click(function(){    Ariticle_Tool.d_totrash(this) });
                $("#d_delete a").click(function(){    Ariticle_Tool.d_delete(this) });
                $('#d_private a').click(function(){Ariticle_Tool.d_toPrivate(this)});
                $('#d_toCommen a').click(function(){Ariticle_Tool.d_tocommen(this)});

            }
        }
        window.location.hash='#articleMenu';
    },
    //添加分页
    addPagination:function(page,pageCount){
        if(pageCount>1){
            var html=createPagination(page,pageCount,'Ariticle_Tool');
            $('#diary_pagination').html(html);
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
        var url=$('#diary_pagination').data('url'),
            role=$('#role').val(),
            catalogId=$('#catalogId').val(),
            data="page="+page;
        if(role!=null&&role!=''){
            data+="&role="+role;
        }
        if(catalogId!=null&&catalogId!=''){
            data+="&DCatalogDto.catalogId="+catalogId;
        }
        ajax1(url,data,this.goPage_result);
    },
    goPage_result:function(data){
        Ariticle_Tool.list_info(data);
        Ariticle_Tool.addPagination(Number($('#page').val()),Number($('#pageCount').val()));
    }

};



