/**
 * 处理上传的js文件
 * Created by chenyi on 2016/03/28.
 */
function uploadImage() {
    $.ajaxFileUpload( {
        url : 'photo',// 需要链接到服务器地址
        fileElementId : 'fileToUpload',// 文件选择框的id属性
        dataType : 'json',// 服务器返回的格式，可以是json
        data : {"operation":1},
        success : function(data) {
            if (data['result'] == 1) {
                $("#facediv").css({"display":"block"});
                $("#face").attr("src",data['path']);

                $('<div><img src="' + data['path'] + '" style="position: relative;" /><div>')
                    .css({
                        float: 'left',
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100px',
                        height: '100px'
                    }).insertAfter($('#face'));

                $('<button id="btnSubmit">提交</button>')
                    .click(function (){
                        cutImage(data['path']);
                    }).insertAfter($('#facediv'));

                $('#face').imgAreaSelect({
                    maxWidth: 100, maxHeight: 100,
                    minWidth: 63, minHeight:63,
                    x1:0,y1:0,x2:100,y2:100,
                    aspectRatio: '1:1',
                    onSelectChange: function (img, selection) {
                        var scaleX = 100 / (selection.width || 1);
                        var scaleY = 100 / (selection.height || 1);

                        $('#face + div > img').css({
                            width: Math.round(scaleX * 400) + 'px',
                            height: Math.round(scaleY * 300) + 'px',
                            marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
                            marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
                        });
                    },
                    onSelectEnd: function (img, selection) {
                        $('input[name="x1"]').val(selection.x1);
                        $('input[name="y1"]').val(selection.y1);
                        $('input[name="x2"]').val(selection.x2);
                        $('input[name="y2"]').val(selection.y2);
                    }
                });
            }
        },
        error : function(data) {
        }
    });
}

function cutImage(path) {
    $.ajax( {
        type : "POST",
        url:"photo",
        dateType:"json",
        data:{"operation":2,"x1":$('input[name="x1"]').val(),
            "x2":$('input[name="x2"]').val(),
            "y1":$('input[name="y1"]').val(),
            "y2":$('input[name="y2"]').val(),
            "path":path},
        success : function(data) {
            top.location.href="photo_view.vm?path="+data["path"];
        },
        error:function(data) {

        }
    });
}