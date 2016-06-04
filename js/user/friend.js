/**
 * Created by chenyi on 2016/06/04.
 */
    $(document).ready(function(){
        friend.show();
    });
var friend={
    //显示添加好友的状态
    show:function(){

    },
    //添加好友
    add:function(url){
        ajax1(url,'',friend.add_reslut);
    },
    add_result:function(data){

    },
    //删除好友
    delete:function(url){
        ajax1(url,'',friend.delete_result);
    },
    delete_result:function(data){

    },
    //获取好友列表
    list:function(url){
        ajax(url,'',friend.list_result);
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
