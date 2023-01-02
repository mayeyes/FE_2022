/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    Main Slide

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    __main_Slide.init();  //그래프 슬라이드
    swipe_AC();  //터치 스와이프
});

var __main_Slide = {
    set:function(slide){
        var c = slide.find(' >ul').clone();
        var s = slide.find(' >ul>li').length;

        $('<div class="in">\
                <div class="midd"></div>\
                <a href="#" class="btn_prev"><span>이전</span></a>\
                <a href="#" class="btn_next"><span>다음</span></a>\
                <div class="simbol"></div>\
            </div>').appendTo(slide.empty());
        c.appendTo(slide.find(' >.in>.midd'));

        var obj = slide;
            obj.btn_prev = obj.find(" .btn_prev");
            obj.btn_next = obj.find(" .btn_next");
            obj.box = obj.find(" .midd>ul");
            obj.li = obj.box.find(">li");
            obj.cnt = 0;
        var re_box,re_sbox,re_cnt;


        var ___controll = {
            resize:function(){
                var _this = this;
                re_box = obj.find(' >.in>.midd>ul').width() - 20;
                re_sbox = obj.find(' >.in>.midd>ul>li').width();
                re_cnt = (re_box < re_sbox) ? s:Math.ceil(s/2);

                if(obj.find(' .simbol>a').length !== re_cnt){
                    obj.find(' .simbol').empty()
                    for(var i=0; i<re_cnt; i++){
                        $('<a href="#"><span>'+(i+1)+'</span></a>').appendTo(obj.find(' .simbol'));
                    }

                    this.simbol();
                }

                if(parseInt(obj.attr("data-page")) > re_cnt-1){
                    obj.cnt = 0;
                    this.pos();
                }
            },
            simbol:function(){
                var _this = this;
                var simbol = obj.find(' .simbol>a');

                simbol.eq(0).addClass("on"); //default
                simbol.on("click",function(){
                    var idx = simbol.index($(this));
                    obj.cnt = idx;
                    _this.pos();

                    simbol.removeClass("on").eq(idx).addClass("on");//심볼 오버
                    return false;
                });
            },
            pos:function(){
                obj.attr("data-page",obj.cnt+1);
            },
            move:function(str){
                if(str === "next"){
                    obj.cnt++;
                    if(obj.cnt > re_cnt-1) obj.cnt = 0;
                } else {
                    obj.cnt--;
                    if(obj.cnt < 0) obj.cnt = re_cnt-1;
                }
                this.pos();
            },
            init:function(){
                this.resize();
                this.pos();                
            }
        }

        ___controll.init();

        obj.btn_prev.on("click",function(){___controll.move("prev");return false;});
        obj.btn_next.on("click",function(){___controll.move("next");return false;});
        $(window).on("resize",function(){___controll.resize();});
    },
    tab:function(idx){

        var ___controll = {
            on:function(idx){
                $('#main_slide>[data-js="tab"]>li').removeClass("on").eq(idx).addClass("on");
                this.page();
            },
            page:function(idx){
                var idx = (idx !== undefined) ? idx : $('#main_slide>[data-js="tab"]>li.on').index();
                $('#main_slide>[data-tab]').hide();
                $('#main_slide>[data-tab="'+(idx+1)+'"]').show();
            },
            def:function(){
                this.page(0);
            },
            init:function(){
                this.def();
            }
        }
        ___controll.init();
        

        $('#main_slide>[data-js="tab"]>li>a').click(function(){
            var idx = $('#main_slide>[data-js="tab"]>li').index($(this).parent());
            ___controll.on(idx);
            return false;
        });
    },
    height:function(){
        var h = $('[data-js="slide"]>.in>.midd>ul>li>div').innerHeight();
        $('[data-js="slide"]').css("height",h);
    },
    init:function(){
        var _this = this;
        var slide = $('[data-js="slide"]');

        for(var i=0; i<slide.size(); i++){
            _this.set(slide.eq(i));
        }

        _this.tab(); 
        
        setTimeout(function(){
            _this.height();
        },300);
        $(window).on("resize",function(){
            setTimeout(function(){
                _this.height();
            },300);
        });
    }
}

function swipe_AC(){
    var drag_x = 0;
    var drag_x_end = 0;
    var drag_obj = "";
    var ch = 0;
    var mouseCheckVal1 = false;
    var mouseCheckVal2 = false;
    
        $(".swipes").on("mousedown touchstart",function(e){
            drag_obj = $(e.target).parents(".swipes");
            ch = drag_obj.size();
            drag_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
            mouseCheckVal1 = true;
        });

        $(".swipes").on("mouseup touchend",function(e){
            if(ch == 0) return false;
            
            if(mouseCheckVal1 && mouseCheckVal2){
                if(drag_x_end - drag_x > 100) {
                    drag_obj.find(".btn_prev").trigger("click");
                    //심볼 위치
                    var page = Number($('[data-js="slide"]').attr("data-page"));
                    $('[data-js="slide"] .simbol>a').removeClass("on").eq(page-1).addClass("on");

                }else if(drag_x_end - drag_x < -100) {
                    drag_obj.find(".btn_next").trigger("click");

                    //심볼 위치
                    var page = Number($('[data-js="slide"]').attr("data-page"));
                    $('[data-js="slide"] .simbol>a').removeClass("on").eq(page-1).addClass("on");
                }
                mouseCheckVal1 = false;
                mouseCheckVal2 = false;
            }
        });

        $(".swipes").on("mousemove touchmove",function(e){
            if(mouseCheckVal1){
                mouseCheckVal2 = true;
                drag_x_end = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
            } else {
                mouseCheckVal2 = false;
            }
        });
        $(".swipes").on("mousemove",function(e){
            e.preventDefault();
        });     
}




