/**
 * Created by chenyi on 2016/06/04.
 */
    $(document).ready(function(){
        friend.show();
    });
var friend={
    userId: $('#U_userId').val(),
    authorId:$('#author_Id').val(),
    //显示添加好友的状态
    show:function(){
        if(this.userI!=this.authorId){
            var url=getRootPath()+"/friend/status",
                data="UUserDto.userId="+this.userId+"&FriendDto.userId="+this.authorId;
            ajax(url,data,friend.show_result);

        }
    },
    show_result:function(data){
      $('#friend').removeClass('hidden');
        if(data.statusFlag==1){
            $('#follow').addClass('hidden');
        }else{
            $('#followed').addClass('hidden');
        }
    },
    //添加好友
    add:function(){
        if(this.userId==''||this.userId==null){
         return false;
        }
        var url=getRootPath()+"/friend/add",
            data="UUserDto.userId="+this.userId+"&FriendDto.userId="+this.authorId;
        ajax1(url,data,friend.add_reslut);
    },
    add_result:function(data){
        if(data.statusFlag==1) {
            $('#follow').addClass('hidden');
            $('#followed').removeClass('hidden');
        }
    },
    //删除好友| 取消关注
    delete:function(){
        if(this.userId==''||this.userId==null){
            return false;
        }
        var url=getRootPath()+"/friend/delete",
            data="UUserDto.userId="+this.userId+"&FriendDto.userId="+this.authorId;
        ajax1(url,data,friend.delete_result);
    },
    delete_result:function(data){
        if(data.statusFlag==1) {
            $('#followed').addClass('hidden');
            $('#follow').removeClass('hidden');
        }
    },
    //获取好友列表
    list:function(){
        var url=getRootPath()+"/friend/list1",
            data="UUserDto.userId="+this.authorId;
        ajax(url,data,friend.list_result);
    },
    list_result:function(data){

    },
    //获取好友分组
    group:function(url){
        ajax(url,'',friend.group_result);
    },
    group_result: function (data) {

    },
    changeGroup:function(url){
        ajax(url,'',friend.changeGroup_result);
    },
    changeGroup_result:function(data){

    }



};
