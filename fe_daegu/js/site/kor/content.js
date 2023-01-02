// 상단메뉴
var __gnb = {
	
		pc:function(str){
			var obj = $("#header #gnb");
				obj.btn = obj.find(">ul>li>a");
				obj.saveTime = "";

			var __controll = function(){
				return{
					on:function(str){
						this.off();
						var idx = obj.find(">ul>li").index(str.parent());
						obj.find(">ul>li").eq(idx).attr("data-open","on");
						obj.find(">ul>li:eq("+idx+")>div").show();
						var h = obj.find(">ul>li:eq("+idx+")>div>ul").css("height","auto").innerHeight();
						obj.find(">ul>li>div").stop().animate({"height":h+"px"},300);

						$("body").attr("data-gnb","on");
					},
					off:function(){
						obj.find(">ul>li").attr("data-open","off");
						obj.find(">ul>li>div").hide();
					},
					leave:function(){
						var _this = this;
						obj.saveTime = setTimeout(function(){
							obj.find(">ul>li>div").stop().css("height","0");
							_this.off();
							$("body").attr("data-gnb","off");
						},100);
					},
					enter:function(){
						clearTimeout(obj.saveTime);
						$("body").attr("data-gnb","on");
					},
					test:function(idx){
						this.on(obj.find(">ul>li").eq(idx).find(">a"));
					},
					child:function(){
						for(var i=0; i<obj.find(" a").length; i++){
							if(obj.find(" a").eq(i).siblings("div").length !== 0){
								obj.find(" a").eq(i).addClass("child");
							}
						}
					},
					init:function(){
						obj.find(">ul>li>div").css({"overflow":"hidden","height":"0"});
						this.child();
					}
				}
			}
			__controll().init();
			
			// 테스트
			if(str !== undefined){
				__controll().test(str);
			}

			//1뎁스 hover
			obj.btn.on("mouseover focus",function(){__controll().on($(this));}); 

			//접근성 관련
			obj.on("mouseleave focusout",function(){__controll().leave();});
			obj.on("mouseenter focusin",function(){__controll().enter();});
		},
		mobile:function(){
			var tar = $("#sitemap-wrap");
			var menu = $("#header #gnb > ul").clone(false);
				menu.find(">li>div>strong").remove();
				menu.find(" *").removeAttr("style");
			var obj;
			
			var __controll = function(){
				return{
					set:function(){
						$('<div id="sitemap">\
							<div class="layout">\
								<strong>전체메뉴</strong>\
								<div class="head"></div>\
								<div class="midd"></div>\
							</div>\
						</div>\
						<a href="#gmenu_close" class="allmenu_btn_close"><span id="gmenu_close">닫기</span></a>').appendTo(tar);
						menu.appendTo(tar.find(">#sitemap > .layout > .midd"));
						tar.find(">#sitemap > .layout > .midd *").removeAttr("style");

						// var mo = $("#header #global>.layout>div:nth-child(1) .mo").clone();
						// var mo_menu = $("#header #global>.layout>div:nth-child(1) .mo-menu .midd").clone(false);
						// $("<div><ul /></div>").appendTo(tar.find(">#sitemap > .layout > .head"));
						// mo.appendTo(tar.find(">#sitemap > .layout > .head>div>ul"));

						// $('<li class="site"><a href="#etc_site"><span id="etc_site">내부 관련사이트</span></a></li>').appendTo(tar.find(">#sitemap > .layout > .midd>ul"));
						// mo_menu.appendTo(tar.find(">#sitemap > .layout > .midd>ul>li.site"));

						// if($(".login-msg").length !== 0) $(".login-msg").clone().insertAfter(tar.find(">#sitemap > .layout > .head"));
						// if($("#global .sns").length !== 0){
						// 	var sns_clone = $("#global .sns>ul").clone();
						// 		$("<div class=\"sns\" />").insertAfter(tar.find(">#sitemap > .layout > .midd>ul"));
						// 		sns_clone.appendTo(tar.find(">#sitemap > .layout > .midd .sns"));
						// }


						obj = $("#sitemap");
						obj.btn_open = $("a.allmenu_btn");
						obj.btn_close = tar.find(" a.allmenu_btn_close");
					},
					position:function(){
						if($("#path").length !== 0){
							//서브
							// #navi의 로케이션 정보를 기준으로 모바일 메뉴의 on 설정
							var gnb_li = obj.find(">.layout>.midd>ul>li").removeClass("on");
							var lis = "";
							var gnb_tx = "";
							var navi = $(".location > *");
							for(var i=1; i<navi.length; i++){
								var navi_tx = $.trim(navi.eq(i).text().replace(">",""));
								
								for(var t=0; t<gnb_li.length; t++){
									lis = gnb_li.eq(t).find(">a");
									gnb_tx = $.trim(lis.text());
									if(navi_tx === gnb_tx){
										lis.addClass("on");
										if(gnb_li.eq(t).find(">div").length > 0){
											gnb_li = gnb_li.eq(t).find(">div>ul>li");
										} else {
											i = 9999;
										}
										t = 9999;
									}
								}
							}
							if(obj.find(">.layout>.midd>ul>li a.on").length === 0) obj.find(">.layout>.midd>ul>li").eq(0).find(">a").addClass("on");
						} else {
							obj.find(">.layout>.midd>ul>li").eq(0).find(">a").addClass("on");
						}
						obj.find(">.layout>.midd a.on").siblings("div").stop().slideDown(200);
					},
					click:function(str){
						var _this = str;
						if(!$(".js_mobile_check").is(":hidden")){
							//mobile
							var bx = _this.siblings("div");
							if(bx.length !== 0){
								if(bx.is(":hidden")){
									_this.parent().siblings("li").find(" div").stop().slideUp(200);
									_this.parent().siblings("li").find(" a").removeClass("on");
			
									bx.stop().slideDown(200);
									_this.addClass("on");
									return false;
								} else {
									_this.parent().find(" div").stop().slideUp(200);
									_this.parent().find(" a").removeClass("on");
									return false;
								}
							}
						}
					},
					open:function(){
						$("body").attr('data-sitemap','on');
						obj.find(">.layout>.midd a.on").siblings("div").stop().slideDown(200);
					},
					close:function(){
						$("body").attr('data-sitemap','off');
						obj.btn_open.focus();
					},
					focusDef:function(e){
						if(!shift && e.keyCode === 9){
							e.preventDefault();
							obj.find(">.layout>.midd a").first().focus();
						}
					},
					init:function(){
						this.set();
						this.position();
					}
				}
			}
			__controll().init();

			obj.btn_open.on("click",function(){__controll().open();return false;});//열기
			obj.btn_close.on("click",function(){__controll().close();return false;});//닫기
			obj.find(">.layout>.midd a").on("click",function(){return __controll().click($(this));});//메뉴 클릭

			obj.btn_close.last().on("keydown",function(e){__controll().focusDef(e);});

		},
		init:function(){
			this.pc();
			this.mobile();
		}
	
	
}
// 스크롤액션
var __scroll = {
	header:function(){
		function act(str){
			var t = str.scrollTop();
			var p = ($('[data-layout="popup"]').length !== 0) ? $('[data-layout="popup"]').innerHeight():0;
			var minH = (!$("#global").is(":hidden")) ? $("#global").innerHeight():0;
				minH = minH + p;

			if(t>minH){
				if($("body").attr('data-scroll') !== "on") $("body").attr('data-scroll','on');
			} else {
				if($("body").attr('data-scroll') !== "off") $("body").attr('data-scroll','off');
			}
		}
		$(window).on("scroll",function(){act($(this));});
		act($("body"));
	},
	init:function(){
		this.header();
	}
}
// 로케이션, sns, 프린트
var __path = {
	sns:function(){
		var obj = $("#navi .sns");
			obj.btn_open = obj.find(">.open");
			obj.btn_close = obj.find(">.close");

		var __controll = function(){
			return{
				on:function(){
					obj.attr("data-open","on");
				},
				off:function(){
					obj.attr("data-open","off");
					obj.btn_open.focus();
				}
			}
		}

		obj.btn_open.click(function(){__controll().on();return false;});
		obj.btn_close.click(function(){__controll().off();return false;});

		//접근성관련
		obj.btn_close.on("keydown",function(event){if(event.keyCode == 9 && !shift){obj.find(">ul a").eq(0).focus();return false;}});
		obj.find(">ul a").eq(0).on("keydown",function(event){if(event.keyCode == 9 && shift){obj.btn_close.focus();return false;}});
	},
	print:function(){
		var obj = $("#navi .print");
		obj.click(function(){self.print();return false;});
	},
	init:function(){
		this.sns();
		this.print();
	}
}
// footer
var __footer = {
	select:function(str){
		var obj = str;
			obj.btn = obj.find(" .head button");

		var __controll = function(){
			return {
				click:function(){
					var c = (obj.attr("data-sw") !== "on")?"on":"off";
					obj.attr("data-sw",c);
				},
				focusDef:function(e){
					if(!shift && e.keyCode === 9){
						e.preventDefault();
						obj.find(" .head button").focus();
					}
				}
			}
		}

		obj.btn.on("click",function(){__controll().click();});
		obj.find(" .midd a").last().on("keydown",function(e){__controll().focusDef(e);});
	},
	init:function(){
		for(var i=0; i<$("#footer .select").size(); i++){
			this.select($("#footer .select").eq(i));
		}
	}
}

// Tab
var __tab = {
	set:function(){
		function _set(str){
			var obj = str;
				obj.cnt = obj.attr("data-view") - 1;
				obj.btn = obj.find(">.in>ul>li a");
			function _on(idx){
				var hit = obj.find(">.in>ul>li").eq(idx).find(" a");
				obj.btn.unwrap().wrap('<span />');
				hit.unwrap().wrap('<strong />');
	
				obj.attr("data-view",idx+1);
			}
			_on(obj.cnt);
	
			obj.btn.on("click",function(){
				var idx = obj.find(">.in>ul>li").index($(this).parent().parent());
				_on(idx);
				return false;
			});
		}
		for(var i=0; i<$('[data-tab][data-view]').length; i++){
			_set($('[data-tab][data-view]').eq(i));
		}
	},
	init:function(){
		this.set();
	}
}

// kakao map
var __kakaoMap = {
	set:function(){
		function _set(str){
			$('<div class="in" />').appendTo(str.empty());
			var obj = str;
				obj.lat = obj.attr("data-lat");
				obj.lng = obj.attr("data-lng");

			var kakao_key = (window.location.host.indexOf("localhost") !== -1 || window.location.host.indexOf("192.168.") !== -1 || window.location.host.indexOf("mayeye.net") !== -1) ? 
				"6ffcad5f0b6bc4e20594ef457fd62e1a"//로컬 개인 키
				:
				"a0dad216cee0604ed26e332e3b1289d8"//운영사이트 키
			;
			// document.write('<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey='+kakao_key+'"></script>');
			var daumUrl = '//dapi.kakao.com/v2/maps/sdk.js?appkey='+kakao_key+'&libraries=services&autoload=false'; 
			$.getScript(daumUrl, function(){
				kakao.maps.load(function() {
					obj.LatLng = new kakao.maps.LatLng(obj.lat, obj.lng);
					var mapContainer = obj.find(">.in")[0], // 지도를 표시할 div 
						mapOption = { 
							center: obj.LatLng, // 지도의 중심좌표
							level: 3 // 지도의 확대 레벨
						};
		
					var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
		
					var imageSrc = '../../../images/site/kor/layout/mapPoint.svg', // 마커이미지의 주소입니다    
						imageSize = new kakao.maps.Size(35, 53), // 마커이미지의 크기입니다
						imageOption = {offset: new kakao.maps.Point(17, 60)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
		
					// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
					var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
						markerPosition = obj.LatLng; // 마커가 표시될 위치입니다
		
					// 마커를 생성합니다
					var marker = new kakao.maps.Marker({
						position: markerPosition, 
						image: markerImage // 마커이미지 설정 
					});
		
					// 마커가 지도 위에 표시되도록 설정합니다
					marker.setMap(map);
		
					$(window).on("resize",function(){
						map.setCenter(obj.LatLng);
					});
				});
			});
		}
		for(var i=0; i<$('[data-map="kakao"]').length; i++){
			_set($('[data-map="kakao"]').eq(i));
		}
	},
	init:function(){
		this.set();
	}
}

// main
var __visual = {
	main:function(){
		if($("#visual").length === 0) return false;
		var ___controll;
		var obj = $("#visual");
			obj.move = obj.find(" .move>ul");
			obj.li = obj.find(" .move li");
			obj.defLi = obj.li;
			obj.tot = Math.ceil(obj.defLi.length/2);
			obj.cnt = 0;
		
		___controll = function(){
			return{
				set:function(){
					$('<div class="controll">\
						<a href="#" class="btn-prev"><span></span></a>\
						<a href="#" class="btn-next"><span></span></a>\
						<a href="#" class="btn-open"><span></span></a>\
						<a href="#" class="btn-close"><span></span></a>\
					</div>').appendTo(obj.find(">.midd"));
					
					obj.btn_prev = obj.find(" .btn-prev");
					obj.btn_next = obj.find(" .btn-next");
					obj.btn_open = obj.find(" .btn-open");
					obj.btn_close = obj.find(" .btn-close");
					obj.btn = obj.find(" .controll>a:not([class*='btn-'])");
				},
				defCount:function(){
					obj.defLi.attr("data-count-def","off");
					obj.defLi.eq(obj.cnt*2).attr("data-count-def","on");
					obj.defLi.eq((obj.cnt*2)+1).attr("data-count-def","on");
				},
				prev:function(){
					var l = obj.li.innerWidth()*-1;
					obj.li = obj.find(" .move li");

					obj.li.last().prependTo(obj.move);
					obj.move.css("left",l+"px");
					l = 0;
					obj.move.animate({"left":l+"px"},300,"linear");
					
					obj.cnt = (obj.cnt-1 < 0)? obj.tot-1:obj.cnt-1;
					this.defCount();
				},
				next:function(){
					var l = obj.li.innerWidth()*-1;
					obj.li = obj.find(" .move li");

					obj.move.animate({"left":l+"px"},300,"linear",function(){
						obj.li.eq(0).appendTo(obj.move);
						obj.move.css("left","0");
					});

					obj.cnt = (obj.cnt+1 > obj.tot-1)? 0:obj.cnt+1;
					this.defCount();
				},
				open:function(){
					obj.attr("data-sw","on");
				},
				close:function(){
					obj.attr("data-sw","off");
				},
				init:function(){
					this.set();
					if(obj.li.length !== 0){
						obj.btn_open.on("click",function(){___controll().open();return false;});
						obj.btn_close.on("click",function(){___controll().close();return false;});
						if(obj.li.length > 1){
							obj.btn_prev.on("click",function(){___controll().prev();return false;});
							obj.btn_next.on("click",function(){___controll().next();return false;});
						} else {
							obj.find(" .controll .btn-prev").remove();
							obj.find(" .controll .btn-next").remove();
						}
					} else {
						obj.find(" .controll").remove();
					}
					this.open();
					this.defCount();
				}
			}
		}
		___controll().init();
	},
	init:function(){
		this.main();//메인
	}
}
// 사이트맵 바인드
var __sitemap = {
	set:function(){
		var obj = $("#sitemap_content");

		$("#gnb>ul").clone(false).appendTo(obj);
		obj.find(" *").removeAttr("style");
		obj.find(">ul>li>div>strong").remove();
	},
	init:function(){
		if($("#sitemap_content").length > 0){
			this.set();
		}
	}
}


// 공통기능 - top버튼
var __Top = {
	set:function(){
		var ___controll;
		var obj = $('#quick');
			obj.btnTop = obj.find(">ul>li:eq(0)>a");
			obj.x = 30;
			obj.y = 30;

		___controll = {
			scroll:function(){
				var b = $("#wrap").innerHeight() - $(window).height() - $(window).scrollTop();
				var f = $("#footer").innerHeight();
				
				if(f > b){
					obj.css("bottom",f-b+10);
				} else {
					obj.removeAttr("style");
				}
			},
			topClick:function(){
				obj.attr("data-quick","off");
				setTimeout(function(){
					obj.attr("data-quick","on");
				},1);

				$("html,body").animate({"scrollTop":"0"},500);
			},
			init:function(){
				var _this = this;
				$(window).on("scroll",function(){_this.scroll();});
				setTimeout(function(){$(window).trigger("scroll");},300);
				obj.btnTop.on("click",function(){_this.topClick();return false;});
			}
		}
		___controll.init();
	},
	init:function(){
		this.set();
	}
}


// board
var __board = {
	photo_slide:function(){
		function _set(str){
			var obj = str;
				obj.item = obj.find(">ul>li").clone();
				obj.cnt = 0;
	
			$('<div class="head"></div>\
				<a href="#photo_boards_prev" class="prev"><span id="photo_boards_prev">이전</span></a>\
				<a href="#photo_boards_next" class="next"><span id="photo_boards_next">다음</span></a>\
			<div class="midd"><ul></ul></div>').appendTo(obj.empty());
	
			for(var i=0; i<obj.item.length; i++){
				obj.item.eq(i).appendTo(obj.find(">.midd>ul"));
			}
			obj.find(">.midd>ul>li>img").wrap('<a href="#"></a>');
	
			obj.li = obj.find(">.midd>ul>li");
			obj.box = obj.find(">.midd>ul");
			obj.btn = obj.find(">.midd>ul>li>a");
			obj.btn_prev = obj.find(" .prev");
			obj.btn_next = obj.find(" .next");
	
			function _point(idx){
				var ch = obj.li.eq(idx).position().left + obj.li.eq(idx).width() + obj.box.position().left;
				var ch2 = obj.li.eq(idx).position().left + obj.box.position().left;
				obj.item.eq(idx).find(" img").clone(false).appendTo(obj.find(">.head").empty());
				obj.li.removeClass("on").eq(idx).addClass("on");
	
				if(ch > obj.find(">.midd").width()){
					var l = (obj.li.eq(idx).position().left + obj.box.position().left) * -1;
					obj.box.animate({"left":l+"px"},300);
				}
				if(ch2 < 0){
					var l = (obj.box.position().left + obj.li.eq(idx).width() + parseInt(obj.li.eq(idx).css("margin-right")));
					obj.box.animate({"left":l+"px"},300);
				}
				obj.cnt = idx;
			}
			_point(obj.cnt);
	
			obj.btn_next.on("click",function(){
				if(obj.cnt + 1 > obj.li.length-1) return false;
				var idx = obj.cnt + 1;
				_point(idx);
				return false;
			});
	
			obj.btn_prev.on("click",function(){
				if(obj.cnt - 1 < 0) return false;
				var idx = obj.cnt - 1;
				_point(idx);
				return false;
			});
	
			obj.btn.on("click focus",function(){
				var idx = obj.li.index($(this).parent());
				_point(idx);
				return false;
			});
		}
		for(var i=0; i<$('[data-slide="photo"]').length; i++){
			_set($('[data-slide="photo"]').eq(i));
		}
	},
	init:function(){
		this.photo_slide();// 게시판 상세 이미지 슬라이드
	}
}

//공지사항
var __notice = {
	set:function(str){
		var obj = str;
			obj.btn = obj.find(">ul>li>a:not(.more)");
		var ___controll = function(){
			return {
				click:function(_this){
					var _old = obj.find(">ul>li>a.on");
					var t_old = _old.text();
					var t = _this.text();

					_old.removeClass("on").empty();
					$('<span>'+t_old+'</span>').appendTo(_old);

					_this.addClass("on");
					_this.empty();
					$('<strong>'+t+'</strong>').appendTo(_this);
				},
				init:function(){
					obj.btn.on("click",function(){___controll().click($(this));return false;});
				}
			}
		}
		___controll().init();
	},
	init:function(){
		for(var i=0; i<$(".notice").length; i++){
			this.set($(".notice").eq(i));
		}
	}
}

// 팝업존
var __popupzone = {
	set:function(str){
		$('<div class="controll">\
			<span><em>1</em>/2</span>\
			<a href="#" class="btn-prev"><span>이전</span></a>\
			<a href="#" class="btn-next"><span>다음</span></a>\
			<a href="#" class="btn-stop"><span>정지</span></a>\
			<a href="#" class="btn-play"><span>재생</span></a>\
		</div>').prependTo(str.find(">.midd"));

		var obj = str;
			obj.box = obj.find(">.midd");
			obj.li = obj.find(" .move>ul>li");
			obj.cnt = 0;
			obj.count = obj.find(" .controll>span");
			obj.btn_prev = obj.find(" .btn-prev");
			obj.btn_next = obj.find(" .btn-next");
			obj.btn_play = obj.find(" .btn-play");
			obj.btn_stop = obj.find(" .btn-stop");
			obj.saveTime = "";
			obj.saveTimeSpeed = 6000;
			obj.auto = "Y";

		var ___controll = function(){
			return {
				count:function(){
					var t = (obj.li.length !== 0) ? '<em>'+(obj.cnt+1)+'</em>/'+obj.li.length:'<em>0</em>/0';
					obj.count.empty().html(t);
				},
				move:function(idx){
					clearTimeout(obj.saveTime);
					obj.li.removeClass("on").eq(idx).addClass("on");
					obj.li.find(">a").attr("tabindex","-1");
					obj.li.eq(idx).find(">a").removeAttr("tabindex");
					obj.cnt = idx;
					this.count();
					this.background(obj.li.eq(idx).find(">a"));
					if(obj.auto === "Y"){
						this.autoPlay();
					}
				},
				background:function(str){
					str.attr("style",str.attr('data-style'));
				},
				next:function(){
					var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt+1;
					this.move(idx);
				},
				prev:function(){
					var idx = (obj.cnt-1 < 0) ? obj.li.length-1:obj.cnt-1;
					this.move(idx);
				},
				autoPlay:function(){
					obj.saveTime = setTimeout(function(){___controll().next();},obj.saveTimeSpeed);
				},
				play:function(){
					obj.auto = "Y";
					obj.btn_play.hide();
					obj.btn_stop.show();
					this.autoPlay();
				},
				stop:function(){
					obj.auto = "N";
					obj.btn_play.show();
					obj.btn_stop.hide();
					clearTimeout(obj.saveTime);
				},
				nonData:function(){
					obj.btn_prev.hide();
					obj.btn_next.hide();
					obj.btn_play.hide();
					obj.btn_stop.hide();
				},
				init:function(){
					obj.btn_prev.on("click",function(){___controll().prev();return false;});
					obj.btn_next.on("click",function(){___controll().next();return false;});
					obj.btn_play.on("click",function(){___controll().play();return false;});
					obj.btn_stop.on("click",function(){___controll().stop();return false;});

					this.background(obj.li.eq(0).find(">a"));
					___controll().count();
					if(obj.li.length > 1){
						if(obj.auto === "Y"){
							___controll().play();
						}
					} else {
						___controll().nonData();
					}
				}
			}
		}
		___controll().init();
	},
	init:function(){
		for(var i=0; i<$(".item-3").length; i++){
			this.set($(".item-3").eq(i));
		}
	}
}

// 숫자로 보는 대구대학교
var __countbox = {
	scrollCheck:function(){
		var t = $(window).scrollTop() + $(window).innerHeight();
		var t2 = $(".line-3>.layout>.midd>ul").offset().top;
		var t3 = t2 + $(".line-3>.layout>.midd>ul").innerHeight();
		if(t > t2){
			//in
			if($(".line-3").attr("data-scroll") !== "on"){
				$(".line-3").attr("data-scroll","on");
				__countdown.init();//숫자 카운트
			}
		} else {
			//out
			$(".line-3").attr("data-scroll","off");
		}
	},
	init:function(){
		var _this = this;
		
		$(window).on("scroll",function(){_this.scrollCheck();});
		_this.scrollCheck();
	}
}

//숫자 카운트 효과
var __countdown = {
	set:function(str){
		var max= str.attr("data-max");//value
		var min= str.attr("data-min");//value
		var jum = "";
		var speeds = (max-min)*10;//숫자에 따른 속도 진행
		//var speeds = 2000;//2초간 진행

		if(max == "" || max == undefined) max = 0;

		if(max.indexOf(".") != -1){
			max = max+"";
			jum = max.split(".");
			jum = "."+jum[1];
		}
		
		max = max.replace(",","");
	
		$({ val : min }).animate({ val : max }, {
			duration: speeds,
			step: function() {
				var num = commas(Math.floor(this.val));
				str.text(num+jum);
			},
			complete: function() {
				var num = commas(Math.floor(this.val));
				str.text(num+jum);
			}
		});
		function commas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
	},
	init:function(){
		for(var i=0; i<$('[data-skin="count"]').size(); i++){
			this.set($('[data-skin="count"]').eq(i));
		}
	}
}


var __youtube = {
	scrollCheck:function(){
		var obj = $(".line-2 .youtube");
		var t = $(window).scrollTop() + $(window).innerHeight();
		var t2 = obj.offset().top;
		if(t > t2){
			//in
			if(obj.attr("data-scroll") !== "on"){
				obj.attr("data-scroll","on");
				$('<iframe src="'+obj.attr("data-src")+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>').appendTo(obj);
			}
		} else {
			//out
			obj.attr("data-scroll","off");
		}
	},
	init:function(){
		var _this = this;
		
		$(window).on("scroll",function(){_this.scrollCheck();});
		_this.scrollCheck();
	}
}

var _layout = {
	content:function(){
		__sitemap.init();//사이트맵 바인드
		__board.init();//게시판 관련
		__countdown.init();//숫자 카운트
	},
	sub:function(){
		__gnb.init(); //상단 메뉴
		// __gnb.pc(5); //상단 메뉴 오픈 유지 - 테스트용
		__scroll.init(); //스크롤 - header
		__path.init();//로케이션, sns, 프린트
		__footer.init();//하단

		__tab.init();//Tab
		__kakaoMap.init();//Kakao map
		__Top.init();//상단 바로가기
	},
	main:function(){
		__gnb.init(); //상단 메뉴
		__scroll.init(); //스크롤 - header
		__footer.init();//하단
		__Top.init();//상단 바로가기
		__visual.init();//비주얼
		__notice.init();//공지사항
		__popupzone.init();//팝업존
		__countbox.init();//숫자로 보는 대구대학교
		__youtube.init();//유튜브 바인드
	}
}


$(function(){
	if($("body#main").length === 0){
		// sub
		_layout.sub();

		// content
		_layout.content();
	} else {
		// main
		_layout.main();
	}
});
