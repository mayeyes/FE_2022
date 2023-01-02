var shift = false;
$(document).ready(function(){
    $(document).keydown(function(event){
        if(event.keyCode == 16 && shift != true) shift = true;
    });
    $(document).keyup(function(event){
        if(event.keyCode == 16) shift = false;
    });
});

var _layout = {
    remote:function(str){
        var obj = str.find(">.midd>ul");
            obj.a = obj.find(" a");

        for(var i=0; i<obj.a.length; i++){
            if(obj.a.eq(i).siblings("div").length !== 0){
                obj.a.eq(i).addClass("child");
            }
        }
        obj.btn = obj.find(" a.child");

        var __controll = {
            click:function(str){
                if(str.hasClass("on")){
                    str.removeClass("on");
                    str.siblings("div").slideUp(200);
                } else {
                    str.addClass("on");
                    str.siblings("div").slideDown(200);
                }
            },
            def:function(){
                obj.find(" a.child.on").siblings("div").slideDown(200);
            }
        }
        __controll.def();

        obj.btn.on("click",function(){__controll.click($(this));return false;});
    },
    init:function(){
        if($("#remote").length !== 0) this.remote($("#remote"));//레이아웃 모바일 검색
    }
}

// sub
var _selectbox = {
    set:function(str){
        var obj = str;
            obj.btn = obj.find(">.head a");

        obj.btn.on("click",function(){
            var c = (obj.attr('data-sw')!=="on")?"on":"off";
            obj.attr('data-sw',c);
            return false;
        })
    },
    clear:function(){
        $(window).on("click",function(e){
            if($(e.target).parents(".selectbox").length === 0){
                $('.selectbox').attr('data-sw','off');
            }
        });
    },
    init:function(){
        for(var i=0; i<$('.selectbox').length; i++){
            this.set($('.selectbox').eq(i));
        }
        this.clear();
    }
}
var _tab = {
    set:function(str){
        var obj = str;
            obj.btn = obj.find('>.midd>ul>li>a');
        var c = obj.attr('data-tab-view');

        var __controll = {
            ov:function(idx){
                for(var i=0; i<obj.find('>.midd>ul>li').length; i++){
                    var o = obj.find('>.midd>ul>li').eq(i).find(">a");
                    var te = o.text();

                    if(idx===(i+1)){
                        te = '<strong>'+te+'</strong>';
                    } else {
                        te = '<span>'+te+'</span>';
                    }
                    o.empty().html(te);
                }
            }
        }

        if(c!==""){
            obj.btn.on("click",function(){
                var idx = obj.find('>.midd>ul>li').index($(this).parent())+1;
                $('[data-tab-name="'+c+'"]').hide();
                $('[data-tab-name="'+c+'"][data-cnt="'+idx+'"]').show();
                __controll.ov(idx);
                return false;
            });
        }
    },
    init:function(str){
        for(var i=0; i<$('[data-tab]').length; i++){
            this.set($('[data-tab]').eq(i));
        }
    }
}
var _file = {
    set:function(str){
        var obj = str;
            obj.btn = obj.find(' input[type="file"]');

        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file)
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        };
        
        obj.btn.on("change",function(){
            var f = (this.files)?this.files[0]:this.files;
                f = f.name;
            $(this).siblings("input[type='text']").val(f);
        });
    },
    init:function(){
        for(var i=0; i<$('[data-form="file"]').length; i++){
            this.set($('[data-form="file"]').eq(i));
        }
    }
}
var fileList = {
    add:function(str){
        var obj = $('[data-form="file-list"][data-name="'+str+'"]');
            obj.li = obj.find(">li");
        var box = obj.li.eq(0).clone();

        box.find('>div:not([data-form="box"])').remove();
        box.find(' input').val('');

        box.appendTo(obj);
    },
    del:function(str){
        var obj = $('[data-form="file-list"][data-name="'+str+'"]');
            obj.li = obj.find(">li");

        if(obj.li.length > 1) obj.find(">li:last").remove();
    }
}
var _popup = {
    open:function(str){
        var obj = $('[data-popup="'+str+'"]');
        obj.css("display","flex");
    },
    close:function(str){
        var obj = $('[data-popup="'+str+'"]');
        obj.css("display","none");
    }
}
var _qa = {
    set:function(str){
        var obj = str;
            obj.btn = obj.find(">ul>li>.head>a");
            obj.box = obj.find(">ul>li>.midd");
        var __controll = {
            def:function(idx){
                obj.box.stop().slideUp(0);
                obj.find(">ul>li:eq("+idx+")").addClass("on");
                obj.find(">ul>li:eq("+idx+")>.midd").stop().slideDown(200);
            },
            click:function(_this){
                var o = _this.parent().parent();
                var c = o.find(">.midd");
                if(c.is(":hidden")){
                    c.stop().slideDown(200);
                    o.addClass("on");
                } else {
                    c.stop().slideUp(200);
                    o.removeClass("on");
                }
            },
            init:function(){
                this.def(0);
            }
        }
        __controll.init();
        
        obj.btn.on("click",function(){__controll.click($(this));return false;});
    },
    init:function(){
        if($('[data-board="qa"]').length !== 0){
            this.set($('[data-board="qa"]'));
        }
    }
}

// main
var _line2_1 = {
    set:function(str){
        var obj = str;
            obj.tab = obj.find(">.head>.etc>a.tab-btn");
            obj.viewBox = obj.find(">.midd>.box");

        var __controll = {
            def:function(){
                var idx = (obj.find(">.head>.etc>a.tab-btn.on").length !== 0) ? obj.tab.index(obj.find(">.head>.etc>a.tab-btn.on")):0;
                this.view(idx);
            },
            view:function(idx){
                obj.tab.removeClass("on").eq(idx).addClass("on");
                obj.viewBox.hide().eq(idx).show();
            },
            click:function(_this){
                var idx = obj.tab.index(_this);
                this.view(idx);
            },
            init:function(){
                this.def();
            }
        }
        __controll.init();

        obj.tab.on("click",function(){__controll.click($(this));return false;});
    },
    init:function(){
        if($("#main-content>.line-2>.item-1").length !== 0){
            this.set($("#main-content>.line-2>.item-1"));
        }
    }
}


$(function(){
    _layout.init();
    _selectbox.init();
    if($("body#main").length !== 0){
        //main
        _line2_1.init();
    } else {
        //sub
        _tab.init();
        _file.init();
        _qa.init();
    }
});