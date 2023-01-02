$(function(){
	//mainPop
	var mPopSwiper = new Swiper('.main_pop',{
		effect : 'fade',
		prevButton:'.main_pop .swiper-button-prev',
		nextButton:'.main_pop .swiper-button-next',
	});
	$(".main_pop .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			mPopSwiper.slideTo(index);
		});
	});
});

// 추가
var _main = {
	visual:function(str){
		var obj = str;

		$(window).on("scroll",function(){
			var t = $(this).scrollTop() - obj.offset().top;
			var h = obj.innerHeight();
			var perD = 0;
			var per = ~~(t/h*100);
				perD = per = (per<0)?0:(per>100)?100:per;
				per = ~~(per/10);
			//console.log(per);
			obj.attr({"data-per-d":perD,"data-per":per});
		});
		$(window).trigger("scroll");
	},
	package:function(str){
		var obj = str;
			obj.box = obj.find(" .move>ul");
			obj.li = obj.box.find(">li");
			obj.cont = obj.find(".controll");
			obj.btnPrev = obj.cont.find(" .btn-prev");
			obj.btnNext = obj.cont.find(" .btn-next");
			obj.scrollBox = obj.find(" .move>ul");
			obj.scrollBar = obj.find(" .move>[data-set='scroll']>span");
		
		var __controll = {
			scrolls:function(){
				obj.w = 0;
				for(var i=0; i<obj.scrollBox.find(">li").size(); i++){
					obj.w += obj.scrollBox.find(">li").eq(i).innerWidth();
				}
				if(obj.w <= obj.scrollBox.width()){
					obj.scrollBar.parent().remove();
					return false;
				}
				var p = obj.scrollBox.width()/obj.w*100;
				var l = obj.scrollBox.scrollLeft()/obj.w*100;
				obj.scrollBar.css({
					"width":p+"%",
					"left":l+"%"
				});
			},
			move:function(str){
				if(obj.box.is(":animated")) return false;
				obj.li = obj.box.find(">li");
				var l = obj.li.eq(0).innerWidth() * -1;
				if(str === "prev"){
					obj.box.css("left",l+"px");
					obj.li.last().prependTo(obj.box);
					l = 0;
				}

				obj.box.stop().animate({"left":l+"px"},300,"linear",function(){
					if(str === "next"){
						obj.box.css("left","0");
						obj.li.eq(0).appendTo(obj.box);
					}
				});
			}
		}

		// 제스처 추가
		var mouseCheck = false;
		var moveCheck = false;
		var _x = "";
		var totX = "";
		
		obj.box.on("mousedown",function(e){
			_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
			mouseCheck = true;
			moveCheck = false;
			return false;
		});
		obj.box.on("mousemove",function(e){
			totX = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
			totX = totX - _x;
			totX = totX * -1;
			if(mouseCheck){
				if(totX > 10 || totX < -10){
					moveCheck = true;
					e.preventDefault();
				}
			}
			e.stopPropagation();
			return false;
		});
		$(document).on("mouseup",function(e){
			if(moveCheck){
				mouseCheck = false;
				obj.box.stop().animate({"scrollLeft":obj.box.scrollLeft()+totX},300);
				e.preventDefault();
			}
			return false;
		});
		
		obj.btnPrev.on("click",function(){__controll.move("prev");return false;});
		obj.btnNext.on("click",function(){__controll.move("next");return false;});
		obj.box.on("scroll",function(){__controll.scrolls();return false;});
		$(window).on("resize",function(){__controll.scrolls();});
		obj.box.trigger("scroll");
	},
	eyes:function(str){
		$('<div data-set="scroll"><span></span></div>').appendTo(str.find(">.in>.midd>div>.midd"));
		var obj = str;
			obj.list = obj.find(">.in>.midd>div");
			obj.btn = obj.list.find(">.head>a");
			
		var __controll = {
			count:function(str){
				var idx = obj.list.index(str.parent().parent());

				if(obj.list.eq(idx).find(">.midd>ul").size()===0 || obj.list.eq(idx).find(">.midd>ul>li").size()===0){
					alert("지금은 모집기간이 아닙니다");
					return false;
				}
				obj.attr('data-page',idx+1);

				obj.list.find(">.midd").css("display","none");
				obj.list.eq(idx).find(">.midd").css("display","block");
			},
			scrollSet:function(str){
				var a = str.find(">ul");
				var b = str.find(">[data-set='scroll']>span");
				var c = str.find(">[data-set='scroll']");

				a.on("scroll",function(){
					var w = 0;
					for(var i=0; i<a.find(">li").size(); i++){
						w += a.find(">li").eq(i).width() + ~~(a.find(">li").eq(i).css("margin-left").replace("px",""));
					}
					var p = c.width()/w*100;

					if(w <= c.width()){
						b.parent().remove();
						return false;
					}
					var l = a.scrollLeft()/w*100;
					b.css({
						"width":p+"%",
						"left":l+"%"
					});
				});

				a.trigger("scroll");

				// 제스처 추가
				var mouseCheck = false;
				var moveCheck = false;
				var _x = "";
				var totX = "";
				
				a.on("mousedown",function(e){
					_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
					mouseCheck = true;
					moveCheck = false;
					return false;
				});
				a.on("mousemove",function(e){
					totX = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
					totX = totX - _x;
					totX = totX * -1;
					if(mouseCheck){
						if(totX > 10 || totX < -10){
							moveCheck = true;
							e.preventDefault();
						}
					}
					e.stopPropagation();
					return false;
				});
				$(document).on("mouseup",function(e){
					if(moveCheck){
						mouseCheck = false;
						a.stop().animate({"scrollLeft":a.scrollLeft()+totX},300);
						e.preventDefault();
					}
					return false;
				});
			}
		}
		for(var i=0; i<obj.list.size(); i++){
			__controll.scrollSet(obj.list.eq(i).find(">.midd"));
		}

		obj.btn.on("click",function(){__controll.count($(this));return false;});
		obj.list.eq(0).find(">.head>a").trigger("click");
	},
	eventEdu:function(str){
		if(str.find(' .move>ul>li').size() < 2){
			str.find(' .move>ul>li').eq(0).addClass("on");
			str.find(' .head>div>span').html('<strong>'+str.find(' .move>ul>li').size()+'</strong>/'+str.find(' .move>ul>li').size());
			str.find(' .head>div>a').remove();
			return false;
		}
		var obj = str;
			obj.cont = obj.find(">.head>div");
			obj.contText = obj.cont.find(">span");
			obj.btnPrev = obj.cont.find(" .btn-prev");
			obj.btnStop = obj.cont.find(" .btn-stop");
			obj.btnPlay = obj.cont.find(" .btn-play");
			obj.btnNext = obj.cont.find(" .btn-next");
			obj.box = obj.find(' .move');
			obj.li = obj.box.find('>ul>li');
			obj.cnt = 0;
			obj.auto = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 8000;
		var __controll = {
			def:function(idx){
				clearTimeout(obj.saveTime);
				obj.li.removeClass("on");
				obj.li.eq(idx).addClass("on");
				obj.contText.html('<strong>'+(idx+1)+'</strong>/'+obj.li.size());
				obj.cnt = idx;
				if(obj.auto === "Y"){
					__controll.play();
				} else {
					__controll.stop();
				}
			},
			count:function(){
				obj.contText.html('<strong>'+(obj.cnt+1)+'</strong>/'+obj.li.size());
				if(obj.auto === "Y"){
					__controll.playStart();
				}
			},
			move:function(str){
				clearTimeout(obj.saveTime);
				var idx = (str === "next") ? obj.cnt + 1:obj.cnt - 1;
					idx = (idx>obj.li.size()-1) ? 0:idx;
					idx = (idx<0) ? obj.li.size()-1:idx;
				obj.li.removeClass("on");
				obj.li.eq(idx).addClass("on");
				obj.cnt = idx;
				__controll.count();
			},
			playStart:function(){
				obj.saveTime = setTimeout(function(){
					__controll.move("next");
				},obj.saveTimeSpeed);
			},
			play:function(){
				obj.auto = "Y";
				obj.btnStop.show();
				obj.btnPlay.hide();
				__controll.playStart();
			},
			stop:function(){
				obj.auto = "N";
				obj.btnStop.hide();
				obj.btnPlay.show();
				clearTimeout(obj.saveTime);
			},
			targets:function(str){
				var idx = obj.li.index(str.parent());
				__controll.def(idx);
			},
			init:function(){
				__controll.def(obj.cnt);
			}
		}
		__controll.init();

		obj.btnPrev.on('click',function(){__controll.move('prev'); return false;});
		obj.btnNext.on('click',function(){__controll.move('next'); return false;});
		obj.btnStop.on('click',function(){__controll.stop(); return false;});
		obj.btnPlay.on('click',function(){__controll.play(); return false;});
		obj.li.find(">a").on('focus',function(){__controll.targets($(this)); return false;});
	},
	popupEdu:function(str){
		if(str.find(' .midd>ul>li').size() < 2){
			str.find(' .midd>ul>li').eq(0).addClass("on");
			str.find(' .head>div>span').html('<strong>'+str.find(' .midd>ul>li').size()+'</strong>/'+str.find(' .midd>ul>li').size());
			str.find(' .head>div>a').remove();
			return false;
		}
		$('<div class="foot"></div>').appendTo(str);
		for(var i=0; i<str.find(' .midd>ul>li').size(); i++){
			$('<span>'+(i+1)+'</span>').appendTo(str.find('>.foot'));
		}
		var obj = str;
			obj.cont = obj.find(">.head>div");
			obj.contText = obj.cont.find(">span");
			obj.btnPrev = obj.cont.find(" .btn-prev");
			obj.btnStop = obj.cont.find(" .btn-stop");
			obj.btnPlay = obj.cont.find(" .btn-play");
			obj.btnNext = obj.cont.find(" .btn-next");
			obj.box = obj.find(' .midd');
			obj.li = obj.box.find('>ul>li');
			obj.simbol = obj.find(' .foot>span');
			obj.cnt = 0;
			obj.auto = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 8000;
		var __controll = {
			def:function(idx){
				clearTimeout(obj.saveTime);
				obj.li.removeClass("on");
				obj.li.eq(idx).addClass("on");
				obj.contText.html('<strong>'+(idx+1)+'</strong>/'+obj.li.size());
				__controll.simbol(idx);
				obj.cnt = idx;
				if(obj.auto === "Y"){
					__controll.play();
				} else {
					__controll.stop();
				}
			},
			simbol:function(idx){
				obj.simbol.removeClass("on").eq(idx).addClass("on");
			},
			count:function(){
				obj.contText.html('<strong>'+(obj.cnt+1)+'</strong>/'+obj.li.size());
				__controll.simbol(obj.cnt);
				if(obj.auto === "Y"){
					__controll.playStart();
				}
			},
			move:function(str){
				clearTimeout(obj.saveTime);
				var idx = (str === "next") ? obj.cnt + 1:obj.cnt - 1;
					idx = (idx>obj.li.size()-1) ? 0:idx;
					idx = (idx<0) ? obj.li.size()-1:idx;
				obj.li.removeClass("on");
				obj.li.eq(idx).addClass("on");
				obj.cnt = idx;
				__controll.count();
			},
			playStart:function(){
				obj.saveTime = setTimeout(function(){
					__controll.move("next");
				},obj.saveTimeSpeed);
			},
			play:function(){
				obj.auto = "Y";
				obj.btnStop.show();
				obj.btnPlay.hide();
				__controll.playStart();
			},
			stop:function(){
				obj.auto = "N";
				obj.btnStop.hide();
				obj.btnPlay.show();
				clearTimeout(obj.saveTime);
			},
			targets:function(str){
				var idx = obj.li.index(str.parent());
				__controll.def(idx);
			},
			init:function(){
				__controll.def(obj.cnt);
			}
		}
		__controll.init();

		obj.btnPrev.on('click',function(){__controll.move('prev'); return false;});
		obj.btnNext.on('click',function(){__controll.move('next'); return false;});
		obj.btnStop.on('click',function(){__controll.stop(); return false;});
		obj.btnPlay.on('click',function(){__controll.play(); return false;});
		obj.li.find(">a").on('focus',function(){__controll.targets($(this)); return false;});
	},
	miniBoard:function(str){
		var obj = str;
			obj.li = obj.find(">ul>li");
			obj.btnTab = obj.li.find(">.head>a");
			obj.btnSetting = obj.find(" .setting");
			obj.pops = obj.find(' [data-pop="mysetting"]');
			obj.popsClose = obj.pops.find(' [data-close]');

		var s = "position:absolute; opacity:0; font-size:0;";
		$('<a href="#" class="start" style="'+s+'">팝업의 시작부분 입니다.</a>').prependTo(obj.pops);
		$('<a href="#" class="end" style="'+s+'">팝업의 마지막부분 입니다.</a>').appendTo(obj.pops);
		var __controll = {
			tab:function(str){
				var idx = obj.li.index(str.parent().parent());
				obj.li.removeClass("on").eq(idx).addClass("on");

				obj.li.find(">.midd").css("display","none");
				obj.li.eq(idx).find(">.midd").css("display","flex");
			},
			popup:function(str){
				var c = (str==="open")?'on':'off';
				obj.pops.attr('data-sw',c);

				if(c==="on"){
					obj.pops.find(">.start").focus();
				} else {
					obj.btnSetting.focus();
				}
			}
		}

		// obj.btnTab.on("click",function(){__controll.tab($(this));return false;});
		obj.li.eq(0).find(">.head>a").css("cursor","default").on("click",function(){return false;});
		// obj.btnSetting.on("click",function(){__controll.popup("open");return false;});
		// obj.popsClose.on("click",function(){__controll.popup("close");return false;});
		// obj.pops.find(">.end").on("keydown",function(event){
		// 	if(!shift && event.keyCode === 9){
		// 		obj.pops.find(">.start").focus(); return false;
		// 	}
		// });
		// obj.pops.find(">.start").on("keydown",function(event){
		// 	if(shift && event.keyCode === 9){
		// 		obj.pops.find(">.end").focus(); return false;
		// 	}
		// });
		obj.li.eq(0).find(">.head>a").trigger("click");
	},
	miniBoardScroll:function(str){
		$('<div data-set="scroll"><span></span></div>').appendTo(str.find(">.midd"));
		$('<div class="simbol"></div>').appendTo(str.find(">.midd"));
		for(var i=0; i<Math.ceil(str.find(">.midd>ul>li").size()/4); i++){
			$('<a href="#"><span></span></a>').appendTo(str.find(">.midd>.simbol"));
		}
		var obj = str;
			obj.scrollBox = obj.find(">.midd>ul");
			obj.scrollBar = obj.find(">.midd>[data-set='scroll']>span");
			obj.simbol = obj.find(">.midd>.simbol>a");
			
		var __controll = {
			scrolls:function(){
				obj.h = 0;
					for(var i=0; i<obj.scrollBox.find(">li").size(); i++){
						obj.h += obj.scrollBox.find(">li").eq(i).height() + ~~(obj.scrollBox.find(">li").eq(i).css("margin-top").replace("px",""));
					}
				var p = obj.scrollBox.height()/obj.h*100;
				
				if(obj.h <= obj.scrollBox.height()){
					obj.scrollBar.parent().remove();
					return false;
				}
				var t = obj.scrollBox.scrollTop()/obj.h*100;
				obj.scrollBar.css({
					"height":p+"%",
					"top":t+"%"
				});
			},
			simbol:function(_this){
				var idx = obj.simbol.index(_this);
				var t = (obj.scrollBox.height() + ~~(obj.scrollBox.find(">li").eq(1).css("margin-top").replace("px",""))) * idx;
				obj.simbol.removeClass("on").eq(idx).addClass("on");

				obj.scrollBox.stop().animate({"scrollTop":t},500);
			},
			init:function(){
				__controll.scrolls();
			}
		}
		__controll.init();

		obj.scrollBox.on("scroll",function(){if(!obj.scrollBar.is(":hidden")){__controll.scrolls();}return false;});
		obj.simbol.on("click",function(){__controll.simbol($(this));return false;});
		$(window).on("resize",function(){
			obj.simbol.eq(0).trigger("click");
		});

		obj.simbol.eq(0).trigger("click");
	},
	mainQuick:function(str){
		var obj = str.find(" .quick");
			obj.btnOpen = obj.find(">.head>a");
			obj.btnClose = obj.find(">.midd>.foot>a");
			obj.btnPoint = $('#main-quick [data-quick-target]');
		var __controll = {
			open:function(){
				obj.attr("data-sw","on");
			},
			close:function(){
				obj.attr("data-sw","off");
				obj.btnOpen.focus();
			},
			point:function(_this){
				var point = _this.attr("data-quick-target");
				var t = $('[data-quick-point="'+point+'"]').offset().top;

				obj.btnPoint.removeClass("on");
				_this.addClass("on");
				$('html,body').animate({"scrollTop":t+"px"},500);
			},
			pointCheck:function(t){
				var b = ($("#wrap").height() - $(window).height()) - t;
				var p = $('[data-quick-point]');
				var target;
				for(var i=0; i<p.size(); i++){
					var n = p.eq(i).offset().top;
					if(t>n){
						target = p.eq(i).attr('data-quick-point');
					}
				}
				target = (target === undefined) ? p.eq(0).attr('data-quick-point'):(b===0) ? p.last().attr('data-quick-point'):target;
				
				obj.btnPoint.removeClass("on");
				$('#main-quick [data-quick-target="'+target+'"]').addClass("on");
			}
		}

		obj.btnOpen.on("click",function(){__controll.open();return false;});
		obj.btnClose.on("click",function(){__controll.close();return false;});
		obj.btnPoint.on("click",function(){__controll.point($(this));return false;});

		$(window).on("scroll",function(){
			var t = $(this).scrollTop();
			var t2 = $("#container").offset().top;
			var c = (t<t2) ? t2-t:0;

			$("#main-quick").css("top",c+"px");
			__controll.pointCheck(t);
		});
		$(window).trigger("scroll");
	},
	notice:function(str){
		var obj = str;
			obj.li = obj.find(">ul>li");
			obj.btn = obj.li.find(">a:not(.more)");
		var __controll = {
			tab:function(_this){
				var idx = obj.li.index(_this.parent());

				obj.li.removeClass("on").eq(idx).addClass("on");
			}
		}

		obj.btn.on("click",function(){__controll.tab($(this));return false;});
	},
	init:function(){
		if($("#visual").size() !== 0) this.visual($("#visual"));
		if($("#pg").size() !== 0) this.package($("#pg"));
		if($("#eyes").size() !== 0) this.eyes($("#eyes"));
		if($("#event").size() !== 0) this.eventEdu($("#event"));
		if($(".item-box>.popup").size() !== 0) this.popupEdu($(".item-box>.popup"));
		if($(".mini-board>ul>li").size() !== 0){
			for(var i=0; i<$(".mini-board>ul>li").size(); i++){
				this.miniBoardScroll($(".mini-board>ul>li").eq(i));
			}
		}
		if($(".mini-board").size() !== 0) this.miniBoard($(".mini-board"));
		if($("#main-quick").size() !== 0) this.mainQuick($("#main-quick"));
		if($(".item-box>.notice").size() !== 0) this.notice($(".item-box>.notice"));
	}
}
$(function(){
	_main.init();
});