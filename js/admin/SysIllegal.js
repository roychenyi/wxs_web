/**
 * Created by chenyi on 2016/05/17.
 */

var table;
var editFlag = false;

$(document).ready(function () {

    var tp1="{{#each func}}<button type='button' class='btn btn-{{this.type}} btn-sm' onclick='{{this.fn}}'>{{this.name}}</button>{{/each}}";

    //   $('#start_date').datetimepicker();

    //   var tpl = $("#tpl").html();
    //预编译模板
    var template = Handlebars.compile(tp1);

    table = $('#example').DataTable({
        ajax: {
            url: "illegal/list",
            type: "post"
            //     dataSrc:"data"
            //   data: "data"
            /* dataSrc:function(result){
             //	alert(result);
             console.log(result);
             }*/
        },
        serverSide: false,
        //  'data':data,
        /*         columns: [
         {data:'illegalId'},
         {data: 'word'},
         {data: 'newword'},
         {data: 'createTime'},
         {data: 'updateTime'},
         {data: 'nullify'},
         {data: null}
         ],  */
        columns: [
            {'data':'illegalId'},
            {'data': 'word'},
            {'data': 'newword'},
            {'data': 'createTime'},
            {'data': 'updateTime'},
            {'data': 'nullify'},
            {'data': null}
        ],

        columnDefs: [
            {
                targets:3,
                render: function(data, type, row, meta) {
                    return new Date(data).format("yyyy-MM-dd hh:mm:ss");
                }
            },
            {
                targets:4,
                render:function(a,b,c,d){

                    if(a!=null&&a!='') {

                        return new Date(a).format("yyyy-MM-dd hh:mm:ss");
                    }else{
                        return null;
                    }
                }
            },
            {
                targets: 6,
                render: function (a, b, c, d) {
                    //  console.log(a);
                    //  console.log(c);
                    var context =
                    {
                        func: [
                            {"name": "修改", "fn": "SysIllegal.edit(\'" + c.illegalId + "\',\'" + c.word + "\',\'" + c.newword + "\',\'" + c.nullify + "\')", "type": "primary"},
                            {"name": "作废", "fn": "SysIllegal.nullify(\'" + c.illegalId + "\')", "type": "danger"}
                        ]
                    };
                    var html = template(context);
                    return html;
                }
            }

        ],
        "language": {
            "lengthMenu": "_MENU_ 条记录每页",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "paginate": {
                "previous": "上一页",
                "next": "下一页"
            }
        },
        "dom": "<'row'<'col-xs-3'l><'#mytool.col-xs-3'><'col-xs-6'f>r>" +
            "t" +
            "<'row'<'col-xs-6'i><'col-xs-6'p>>",

        initComplete: function () {
            //    $("#mytool").append('<button id="datainit" type="button" class="btn btn-primary btn-sm">增加基础数据</button>&nbsp');
            $("#mytool").append('<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">添加</button>');
            //    $("#datainit").on("click", initData);
        }

    });

    $("#save").click(SysIllegal.add);
    $('#example').css("width","100%" );
    $('#example_wrapper').css("width","95%" );

    //  $("#initData").click(initSingleData);
});




var SysIllegal={
    //  table: null,
    //  editFlag:false,
    clear:function(){
        $("#name").val("").attr("disabled",false);
        $("#position").val("");
        $("#salary").val("");
        $("#start_date").val("");
        $("#office").val("");
        $("#extn").val("");
        editFlag = false;
    },
    add:function(){
        var data=$('#illegalForm').serialize();
        SysIllegal.ajax(data);
    },
    edit:function(id,word,newword,nullify){
        editFlag = true;
        $("#myModalLabel").text("修改");
        $("#illegalId").val(id);//.attr("disabled",true);
        $("#word").val(word);
        $("#newword").val(newword);
        $("#nullify").val(nullify);
        $("#myModal").modal("show");
    },
    ajax:function(obj){
        var url ="illegal/add" ;
        if(editFlag){
            url = "illegal/update";
        }
        $.ajax({
            url:url ,
            data:obj,
            success: function (data) {
                table.ajax.reload();
                $("#myModal").modal("hide");
                $("#myModalLabel").text("新增");
                SysIllegal.clear();
                console.log("结果" + data);
                $("td[html='"+data.illegalId+"']").focus();
            }
        });
    }


}
/**
 * 清除
 */
/*
 function clear() {
 $("#name").val("").attr("disabled",false);
 $("#position").val("");
 $("#salary").val("");
 $("#start_date").val("");
 $("#office").val("");
 $("#extn").val("");
 editFlag = false;
 }

 */
/**
 * 添加数据
 **//*

 function add() {
 */
/*  var addJson = {
 "name": $("#name").val(),
 "position": $("#position").val(),
 "salary": $("#salary").val(),
 "start_date": $("#start_date").val(),
 "office": $("#office").val(),
 "extn": $("#extn").val()
 };
 *//*

 var data=$('#illegalForm').serialize();
 ajax(data);
 }

 */
/**
 *编辑方法
 **//*

 function edit(id,word,newword,nullify) {
 console.log(name);
 editFlag = true;
 $("#myModalLabel").text("修改");
 $("#illegalId").val(id);//.attr("disabled",true);
 $("#word").val(word);
 $("#newword").val(newword);
 $("#nullify").val(nullify);
 $("#myModal").modal("show");
 }

 function ajax(obj) {
 var url ="illegal/add" ;
 if(editFlag){
 url = "illegal/update";
 }
 $.ajax({
 url:url ,
 data:obj,
 success: function (data) {
 table.ajax.reload();
 $("#myModal").modal("hide");
 $("#myModalLabel").text("新增");
 clear();
 console.log("结果" + data);
 }
 });
 }


 */
/**
 * 删除数据
 * @param name
 *//*
