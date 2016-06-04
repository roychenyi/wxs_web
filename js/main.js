// Custom scripts
$(document).ready(function () {

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').click( function() {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').click( function() {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Small todo handler
    $('.check-link').click( function(){
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Append config box / Only for demo purpose
//    $.get("skin-config.html", function (data) {
//        $('body').append(data);
//    });

    // minimalize menu
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    })

    // tooltips
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    })

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body")

    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    }
    fix_height();

    // Fixed Sidebar
    // unComment this only whe you have a fixed-sidebar
    //    $(window).bind("load", function() {
    //        if($("body").hasClass('fixed-sidebar')) {
    //            $('.sidebar-collapse').slimScroll({
    //                height: '100%',
    //                railOpacity: 0.9,
    //            });
    //        }
    //    })

    $(window).bind("load resize click scroll", function() {
        if(!$("body").hasClass('body-small')) {
            fix_height();
        }
    })

    /*    $('#top-search').click(function(){
     location.href="search.html";
     });

     $('#user').click(function(){
     location.href="login";
     });
     */
    $(document).scroll(function(){
        var  scrollTop =  $(document).scrollTop(),bodyHeight = $(window).height();
        if(scrollTop > bodyHeight){
            $('#gotop').css('display','block');
        }else{
            $('#gotop').css('display','none');
        }
        var top1=$('#leftMenu').offset().top;
        if(scrollTop>top1){
            var navbarH=$('#navbar').height();
            var width=$('#leftMenu').width();
            var footerH=$('footer').height();
            var height=$(document).height();
            $('#leftMenu>div').css({position: 'fixed',top:navbarH,bottom:footerH,width:width});
            if(footerH>(height-scrollTop)){
                $('#leftMenu>div').removeAttr('style');
            }
        }else{
            $('#leftMenu>div').removeAttr('style');
        }
  //      var top=$('#leftMenu').position().top;
  //      $('#gotop').append("left位置："+top+"height:"+$('#navbar').height());
    });


    $("[data-toggle=popover]").popover();
    //关闭点击触发导航栏下拉，实现鼠标移入触发
    $(document).off('click.bs.dropdown.data-api');
    dropdownOpen();
});

/**
 * 鼠标划过就展开子菜单，免得需要点击才能展开
 */
function dropdownOpen() {

    var $dropdownLi = $('li.dropdown');

    $dropdownLi.mouseover(function() {
        $(this).addClass('open');
    }).mouseout(function() {

        $(this).removeClass('open');
    });

    var $dropdownSpan=$('span.dropdown');
    $dropdownSpan.mouseover(function() {
        $(this).addClass('gray-bg open');
    }).mouseout(function() {
        $(this).removeClass('gray-bg open');
    });

}

function dropdown_open(_this){
    $(_this).addClass('gray-bg open');
}

function dropdown_close(_this){
    $(_this).removeClass('gray-bg open');
}

// For demo purpose - animation css script
function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

// Minimalize menu when screen is less than 768px
$(function() {
    $(window).bind("load resize", function() {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    })
})

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else if ($('body').hasClass('fixed-sidebar')){
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 300);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable(
        {
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        })
        .disableSelection();
};

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
//简单ajax函数
function ajax(url,data_str,success_func){

    $.ajax({
        url:url,
        type:"POST",
        data:data_str,
        dataType:"json",
        //    async: false,

        success: function (data) {
            success_func(data);
        }

    });

}
//ajax带成功处理函数
function ajax1(url,data_str,success_function){
    var a=false;
    $.ajax({
        url:url,
        type:"POST",
        data:data_str,
        dataType:"json",
        //contentType: "application/json; charset=utf-8",//(可以)
        //  contentType: "text/xml",//(可以)
        contentType:"application/x-www-form-urlencoded",//(可以)
        async: false,
        beforeSend: function () {
            submitStart();
        },

        success: function(data){
            success_function(data)
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
//js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht);
}
//json解析，有时候因为 fastjson生成的json数据带有$引用会出现查找不到的情况
var FastJson={isArray:function(a){return"object"==typeof a&&"[object array]"==Object.prototype.toString.call(a).toLowerCase()},isObject:function(a){return"object"==typeof a&&"[object object]"==Object.prototype.toString.call(a).toLowerCase()},format:function(a){if(null==a)return null;"string"==typeof a&&(a=eval("("+a+")"));return this._format(a,a,null,null,null)},_randomId:function(){return"randomId_"+parseInt(1E9*Math.random())},_getJsonValue:function(a,c){var d=this._randomId(),b;b=""+("function "+d+"(root){")+("return root."+c+";");b+="}";b+="";var e=document.createElement("script");e.id=d;e.text=b;document.body.appendChild(e);d=window[d](a);e.parentNode.removeChild(e);return d},_format:function(a,c,d,b,e){d||(d="");if(this.isObject(c)){if(c.$ref){var g=c.$ref;0==g.indexOf("$.")&&(b[e]=this._getJsonValue(a,g.substring(2)));return}for(var f in c)b=d,""!=b&&(b+="."),g=c[f],b+=f,this._format(a,g,b,c,f)}else if(this.isArray(c))for(f in c)b=d,g=c[f],b=b+"["+f+"]",this._format(a,g,b,c,f);return a}};
//时间格式化
Date.prototype.format=function(format){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(format)){format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))}for(var k in o){if(new RegExp("("+k+")").test(format)){format=format.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+o[k]).substr((""+o[k]).length))}}return format};

//创建分页器
function createPagination(page,pageCount,obj){
    if(pageCount>1) {
        var html = "<ul class='pagination' >"
            + "<li id='page_prev'><a href='javascript:;' title='上一页' onclick='"+obj+".goPage(-1)'>&laquo;</a></li>";
        if (pageCount <= 7) {
            for (var i = 1; i <= pageCount; i++) {
                html += "<li id='page" + i + "'><a href='javascript:;' title='第" + i + "页' onclick='"+obj+".goDirectPage(" + i + ")'>" + i + "</a></li>";
            }
        } else {
            if (page < 5) {
                for (var i = 1; i <= 6; i++) {
                    html += "<li id='page" + i + "'><a href='javascript:;' title='第" + i + "页' onclick='"+obj+".goDirectPage(" + i + ")'>" + i + "</a></li>";
                }
                html += "<li class='disabled'><a >…</a></li>"
                    + "<li id='page" + pageCount + "'><a href='javascript:;' title='第" + pageCount + "页' onclick='"+obj+".goDirectPage(" + pageCount + ")'>" + pageCount + "</a></li>";
            } else if (page >= 5) {

                html += "<li id='page1'><a href='javascript:;' title='第1页' onclick='"+obj+".goDirectPage(1)'>1</a></li>"
                    + "<li class='disabled'><a >…</a></li>";
                if (page >= pageCount - 5) {
                    for (var i = pageCount - 5; i <= pageCount; i++) {
                        html += "<li id='page" + i + "'><a href='javascript:;' title='第" + i + "页' onclick='"+obj+".goDirectPage(" + i + ")'>" + i + "</a></li>";
                    }
                } else if (page < pageCount - 5) {
                    for (var i = page - 2; i <= page + 2; i++) {
                        html += "<li id='page" + i + "'><a href='javascript:;' title='第" + i + "页' onclick='"+obj+".goDirectPage(" + i + ")'>" + i + "</a></li>";
                    }
                    html += "<li class='disabled'><a >…</a></li>"
                        + "<li id='page" + pageCount + "'><a href='javascript:;' title='第" + pageCount + "页' onclick='"+obj+".goDirectPage(" + pageCount + ")'>" + pageCount + "</a></li>";

                }
            }
        }
        html += "<li id='page_next'><a href='javascript:;' title='下一页' onclick='"+obj+".goPage(1)'>&raquo;</a></li>"
            + "</ul>";
        return html;
    }else{
        return "";
    }

}


