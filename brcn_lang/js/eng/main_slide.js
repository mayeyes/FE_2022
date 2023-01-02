/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

Slide Script

ex)
null : 옆으로 흐르는 배너 형태
type_02 : 팝업존 형태
type_03 : 비쥬얼 형태
type_04 : 포토슬라이드 형태(배너+이미지View)

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	if($(".js_slide").size() != 0){
		setTimeout(function(){ slide_AC(); }, 100);
	}
});

function slide_AC(){
var slide = $(".js_slide");

for(var i=0; i<slide.size(); i++){
	if(slide.eq(i).hasClass("type_02")) slide_type_02(slide.eq(i));//팝업존
	else if(slide.eq(i).hasClass("type_03")) slide_type_03(slide.eq(i));//비주얼
	else if(slide.eq(i).hasClass("type_04")) slide_type_04(slide.eq(i));//포토슬라이드
	else slide_type_01(slide.eq(i));//배너
}
}

function slide_type_01(slide){
	//배너
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//심볼
	$("<ul class='simbols'></ul>").prependTo(slide.controls);
	for(var i=0; i<slide.li.size(); i++){
		$('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
	}
	slide.simbols = slide.controls.find(">ul>li");
	slide.simbols.eq(0).find(">a").addClass("on");

	
	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
		
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	//버튼 : 재생
	slide.btn_play.click(function(){
		slide.btn_play.hide();
		slide.btn_stop.css("display","inline-block");
		slide.autos = "Y";
		slide.times = setTimeout(function(){
			movement("right");
		},slide.times_speeds);
		return false;
	});

	//버튼 : 정지
	slide.btn_stop.click(function(){
		slide.btn_stop.hide();
		slide.btn_play.css("display","inline-block");
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});


	//버튼 : 심볼
	slide.simbols.find(">a").click(function(){
		if($(this).hasClass("on")) return false;
		var idx = slide.simbols.index($(this).parent());
		slide.btn_stop.click();
		//심볼 클릭시 이동 추가 작업

		slide.simbols.find(">a.on").removeClass("on");
		slide.simbols.eq(idx).find(">a").addClass("on");

		slide.li = slide.ul.find(">li");
		var w = slide.li.eq(1).outerWidth() * -1;
		var sim_w = w * idx;
		
		movement(idx);
		slide.ul.stop().animate({"left":sim_w+"px"});
		return false;
		
	});

	//자동재생
	slide.btn_play.click();

	//animate
	function movement(ty){

		var olds = 0;
		var news = 0;

		slide.li = slide.ul.find(">li");
		var w = slide.li.eq(0).innerWidth() * -1;


		if(ty == "right"){
			//다음
			olds = slide.nums;
			news = slide.nums + 1;
			
			if(news < slide.li.size()) {
				news = news;
			} else if (news > slide.li.size()) {
				news = 1;
			}
		}

		else if(ty == "left"){

			olds = slide.nums;
			news = slide.nums - 1;

			if(news < 1) news = slide.li.size();

			slide.li.last().prependTo(slide.ul);
			slide.ul.css("left",w+"px");

			w = 0;
			slide.nums = slide.li.last().attr("data-count");
		} else {

			//심볼클릭
			olds = slide.nums;
			news = ty+1;
			if(news >= slide.li.size()) news = 0;
			
			slide.nums = slide.li.eq(0).attr("data-count");
		}

		if(slide.li.eq(news-1).is(":animated")) return false;
		
		slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).appendTo(slide.ul);
				slide.ul.css("left","0");
			}

			if(slide.autos == "Y"){
				slide.times = setTimeout(function(){
					movement("right");
				},slide.times_speeds);
			}
		});

		slide.nums = news;

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

		//심볼
		slide.simbols.find(">a.on").removeClass("on");
		slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
		
	}

	//포커스 시 자동스크롤 멈춤	
	slide.li.find(">a").on("focus",function(){
		slide.btn_stop.trigger("click");
	});

}

function slide_type_02(slide){
	//팝업존
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 1000;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	//버튼 : 재생
	slide.btn_play.click(function(){
		slide.btn_play.hide();
		slide.btn_stop.css("display","inline-block");
		slide.autos = "Y";
		slide.times = setTimeout(function(){
			movement("right");
		},slide.times_speeds);
		return false;
	});

	//버튼 : 정지
	slide.btn_stop.click(function(){
		slide.btn_stop.hide();
		slide.btn_play.css("display","inline-block");
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});

	//자동재생
	slide.btn_play.click();

	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");
		if(slide.li.eq(0).is(":animated")) return false;

		var w = -100;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.li = slide.ul.find(">li");
			slide.li.eq(0).show().css("left",w+"%");
			slide.li.eq(1).css("left","0").stop().animate({"left":"100%"},slide.speeds,"easeOutCubic",function(){
				$(this).hide();
			});

			w = 0;

			slide.nums = slide.li.eq(0).attr("data-count");
		} else {
			slide.li.eq(1).show().stop().animate({"left":"0"},slide.speeds,"easeOutCubic",function(){
				slide.li.eq(0).hide().appendTo(slide.ul);
				if(slide.autos == "Y"){
					slide.times = setTimeout(function(){
						movement("right");
					},slide.times_speeds);
				}
			});
			slide.nums = slide.li.eq(1).attr("data-count");
		}
		slide.li.eq(0).stop().animate({"left":w+"%"},slide.speeds,"easeOutCubic",function(){
			if(ty == "right"){
				slide.li.eq(0).css("left","100%");
			}
		});

		//총 카운트 적용
		slide.counts.html("0"+slide.nums+"<span>/"+"0"+slide.li.size()+"</span>");
	}
}

function slide_type_03(slide){
	//비주얼
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 8000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//심볼
	$("<ul></ul>").prependTo(slide.controls);
	for(var i=0; i<slide.li.size(); i++){
		$('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
	}
	slide.simbols = slide.controls.find(">ul>li");
	slide.simbols.eq(0).find(">a").addClass("on");

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	//버튼 : 재생
	slide.btn_play.click(function(){
		slide.btn_play.hide();
		slide.btn_stop.css("display","inline-block");
		slide.autos = "Y";
		slide.times = setTimeout(function(){
			movement("right");
		},slide.times_speeds);
		return false;
	});

	//버튼 : 정지
	slide.btn_stop.click(function(){
		slide.btn_stop.hide();
		slide.btn_play.css("display","inline-block");
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});

	//버튼 : 심볼
	slide.simbols.find(">a").click(function(){
		if($(this).hasClass("on")) return false;
		var idx = slide.simbols.index($(this).parent());
		slide.btn_stop.click();
		movement(idx);
		return false;
	});

	//자동재생
	slide.btn_play.click();

	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");

		var olds = 0;
		var news = 0;

		if(ty == "right"){
			//다음
			olds = slide.nums;
			news = slide.nums + 1;
			
			if(news < slide.li.size()) {
				news = news;
			} else if (news > slide.li.size()) {
				news = 1;
			}
		} else if(ty == "left"){
			//이전
			olds = slide.nums;
			news = slide.nums - 1;

			if(news < 1) news = slide.li.size();
		} else {
			//심볼클릭
			olds = slide.nums;
			news = ty+1;
			if(news >= slide.li.size()) news = 0;
		}


		if(slide.li.eq(news-1).is(":animated")) return false;

		slide.li.eq(olds-1).stop().removeClass("on").css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
			slide.li.eq(olds-1).css({"left":"100%","display":"none"});
			if(slide.autos == "Y"){
				slide.times = setTimeout(function(){
					movement("right");
				},slide.times_speeds);
			}
		});

		slide.li.eq(news-1).css({"display":"block"}).stop().addClass("on").css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
		});

		slide.nums = news;

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

		//심볼
		slide.simbols.find(">a.on").removeClass("on");
		slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
	}
}

function slide_type_04(slide){
	//포토슬라이드
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//view
	//slide_view
	var setNum = $(".js_slide").index(slide);
	slide.attr("id","slide_view_"+setNum);
	$('<div class="slide_view_'+setNum+'"><span></span><img src="" alt="" /></div>').insertBefore(slide);
	views(0,$(".slide_view_"+setNum));

	//제어
	if(slide.li.size() < 2){
		slide.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	slide.li.find(">a").click(function(){
		var idx = slide.li.index($(this).parent());
		var cl = $(this).parents(".js_slide").attr("id");

		views(idx,$("."+cl));
		return false;
	});

	//view
	function views(idx,obj){
		var idx = idx;
		var titles = slide.li.eq(idx).find(">a").attr("title");
		var imgs = slide.li.eq(idx).find(">a img")[0].src;
		var alts = slide.li.eq(idx).find(">a img").attr("alt");

		slide.li.find(">a.on").removeClass("on");
		slide.li.eq(idx).find(">a").addClass("on");
		obj.find(" img").attr("src",imgs);
		obj.find(" img").attr("alt",alts);
		if(titles){
			obj.find(" span").html("<strong>"+titles+"</strong>"+alts);
		} else {
			obj.find(" span").html(alts);
		}
		
		if(alts == ""){
			obj.addClass("notitle");
		} else {
			obj.removeClass("notitle");
		}
	}

	//animate
	function movement(ty){
		if(slide.ul.is(":animated")) return false;

		slide.li = slide.ul.find(">li");
		var w = slide.li.eq(0).innerWidth() * -1;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.ul.css("left",w+"px");

			w = 0;
			slide.nums = slide.li.last().attr("data-count");
		} else {
			slide.nums = slide.li.eq(0).attr("data-count");
		}

		slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).appendTo(slide.ul);
				slide.ul.css("left","0");
			}
		});

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}
}


$(function(){
    __main_Slide.init(); 
    // swipe_AC();  //터치 스와이프
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
			// obj.btn_play = $(".Dishes_slice .btn_play");
			// obj.btn_stop = $(".Dishes_slice .btn_stop");
            obj.box = obj.find(" .midd>ul");
            obj.li = obj.box.find(">li");
            obj.cnt = 0;

			obj.auto = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 8000;
        var re_box,re_sbox,re_cnt;

        var ___controll = {
            resize:function(){
                var _this = this;
                re_box = obj.find(' >.in>.midd>ul').width() - 20;
                re_sbox = obj.find(' >.in>.midd>ul>li').width();
                re_cnt = (re_box < re_sbox) ? s:Math.ceil(s/3);

                // if(obj.find(' .simbol>a').length !== re_cnt){
                //     obj.find(' .simbol').empty()
                //     for(var i=0; i<re_cnt; i++){
                //         $('<a href="#"><span>'+(i+1)+'</span></a>').appendTo(obj.find(' .simbol'));
                //     }

                //     this.simbol();
                // }

                if(parseInt(obj.attr("data-page")) > re_cnt-1){
                    obj.cnt = 0;
                    this.pos();
                }
            },
            // simbol:function(){
            //     var _this = this;
            //     var simbol = obj.find(' .simbol>a');

            //     simbol.eq(0).addClass("on"); //default
            //     simbol.on("click",function(){
            //         var idx = simbol.index($(this));
            //         obj.cnt = idx;
            //         _this.pos();

            //         simbol.removeClass("on").eq(idx).addClass("on");//심볼 오버
            //         return false;
            //     });
            // },
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

				// if(obj.auto === "Y"){
				// 	this.play();
				// }
            },
			// play:function(){
			// 	var _this = this;
			// 	obj.saveTime = setTimeout(function(){_this.move("next");},obj.saveTimeSpeed);
			// },
			// stop:function(){
			// 	clearTimeout(obj.saveTime);
			// },
            init:function(){
                this.resize();
                this.pos();                
            }
	
        }

        ___controll.init();

        obj.btn_prev.on("click",function(){___controll.move("prev");return false;});
        obj.btn_next.on("click",function(){___controll.move("next");return false;});
		// obj.btn_play.on("click",function(){
		// 	obj.auto = "Y";
		// 	obj.btn_play.hide();
		// 	obj.btn_stop.show();
		// 	___controll.play();
		// 	return false;
		// });
		// obj.btn_stop.on("click",function(){
		// 	obj.auto = "n";
		// 	obj.btn_play.show();
		// 	obj.btn_stop.hide();
		// 	___controll.stop();
		// 	return false;
		// });
        // $(window).on("resize",function(){___controll.resize();});
		// if(obj.auto === "Y"){
		// 	obj.btn_play.trigger("click");
		// }
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



/* 터치 스크린  */

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
