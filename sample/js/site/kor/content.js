// 상단 기타 기능
var __global = {
	select:function(str){
		function set(str){
			var obj = str;
				obj.btn = obj.find(" .head a");
				obj.box = obj.find(" .midd");
				obj.saveTime = "";
				
			var controll = function(){
				return{
					click:function(){
						if(obj.attr("data-open") !== "on") this.on();
						else this.off();
					},
					on:function(){
						obj.attr("data-open","on");
						obj.box.slideDown(200);
						obj.btn.attr("title","내용 확장");
					},
					off:function(){
						obj.attr("data-open","off");
						obj.box.slideUp(200);
						obj.btn.attr("title","내용 축소");
					}
				}
			}

			//클릭
			obj.btn.on("click",function(){controll().click();return false;});

			//접근성관련
			obj.on("focusout",function(){obj.saveTime = setTimeout(function(){controll().off();},100);return false;});
			obj.on("focusin",function(){clearTimeout(obj.saveTime);return false;});
		}
		var ob = (str !== undefined) ? str:$("#global .select");
		
		for(var i=0; i<ob.length; i++){
			set(ob.eq(i));
		}
	},
	search:function(){
		var obj = $('#etc [data-search="s"]');
		obj.btn_open = $("#search-btn");
		obj.btn_close = $("#search-btn_close");
		
		var __controll = function(){
			return{
				on:function(){
					$("body").attr("data-search","on");
				},
				off:function(){
					$("body").attr("data-search","off");
				}
			}
		}
		obj.btn_open.on("click",function(){__controll().on();return false;});
		obj.btn_close.on("click",function(){__controll().off();return false;});
	},
	init:function(){
		this.select();
		this.search();
	}
}
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
			var tar = $("#etc>ul>li.all");
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
						<a href="#" class="allmenu_btn_close"><span>닫기</span></a>').appendTo(tar);
						menu.appendTo(tar.find(">#sitemap > .layout > .midd"));
						tar.find(">#sitemap > .layout > .midd *").removeAttr("style");

						var mo = $("#header #global>.layout>div:nth-child(1) .mo").clone();
						var mo_menu = $("#header #global>.layout>div:nth-child(1) .mo-menu .midd").clone(false);
						$("<div><ul /></div>").appendTo(tar.find(">#sitemap > .layout > .head"));
						mo.appendTo(tar.find(">#sitemap > .layout > .head>div>ul"));

						$('<li class="site"><a href="#"><span>관련사이트</span></a></li>').appendTo(tar.find(">#sitemap > .layout > .midd>ul"));
						mo_menu.appendTo(tar.find(">#sitemap > .layout > .midd>ul>li.site"));


						//기존 이벤트 추가
						__global.select(tar.find(">#sitemap > .layout > .head .select"));
						// tar.find(">#sitemap > .layout > .midd>div>ul>li").last().find(">a").on("click",function(){this.click($(this));return false;});//메뉴 클릭

						obj = $("#sitemap");
						obj.btn_open = $("#etc>ul>li.all a.allmenu_btn");
						obj.btn_close = $("#etc>ul>li.all a.allmenu_btn_close");
					},
					position:function(){
						if($("#path").length !== 0){
							//서브
							// #navi의 로케이션 정보를 기준으로 모바일 메뉴의 on 설정
							var gnb_li = obj.find(">.layout>.midd>ul>li");
							var lis = "";
							var gnb_tx = "";
							var navi = $("#navi > .location > *");
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
							if(gnb_li.find(" a.on").length === 0) obj.find(">.layout>.midd>ul>li").eq(0).find(">a").addClass("on");
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
									return true;
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
	site:function(){
		var obj = $("#footer .site");
			obj.ul = obj.find(" .move>ul");
			obj.li = obj.ul.find(">li");
			obj.btn_prev = obj.find(" .btn_prev");
			obj.btn_next = obj.find(" .btn_next");

		var __controll = function(){
			return{
				move:function(str){
					if(obj.ul.is(":animated")) return false;
					obj.li = obj.ul.find(">li");
					var l = obj.li.eq(0).innerWidth() * -1;
					if(str === "prev"){
						obj.li.last().prependTo(obj.ul);
						obj.ul.css("left",l+"px");
						l = 0;
					}
					obj.ul.animate({"left":l+"px"},300,"linear",function(){
						if(str === "next"){
							obj.li.eq(0).appendTo(obj.ul);
							obj.ul.css("left","0");
						}
					});
				},
				resize:function(){
					var w = 0;
					var ch = "";
					for(var i=0; i<obj.li.length; i++){
						w += obj.li.eq(i).innerWidth();
					}
					ch = (w > (obj.find(" .move").innerWidth() - 10)) ? "on":"off";
					obj.attr("data-controll",ch);
				},
				init:function(){
					__controll().resize();
				}
			}
		}
		__controll().init();
			
		$(window).on("resize",function(){__controll().resize();});
		obj.btn_prev.on("click",function(){__controll().move("prev");return false;});
		obj.btn_next.on("click",function(){__controll().move("next");return false;});
	},
	init:function(){
		this.site();
	}
}
// quick
var __quick = {
	bottom:function(){
		var __controll;
		var obj = $("#link-service");
			obj.box = obj.find(">.in>.layout");
			obj.btn_up = obj.find(" .btn_up");
			obj.btn_down = obj.find(" .btn_down");

		__controll = {
			scroll:function(){
				return{
					on:function(){
						var b = $(document).height() - $(window).height() - $(window).scrollTop();
							b = b - $("#footer").innerHeight();
						var ch = (b <= 0) ? "off":"on";

						if(obj.attr("data-scroll") !== ch) obj.attr("data-scroll",ch);
					},
					off:function(){
						obj.attr("data-scroll","off");
					}
				}
			},
			up:function(){
				obj.attr("data-open","on");
				obj.btn_down.focus();
			},
			down:function(){
				obj.attr("data-open","off");
				obj.btn_up.focus();
			},
			init:function(){
				this.scroll();
			}
		}
		__controll.init();//초기실행

		$(window).on("scroll",function(){__controll.scroll().off();});//scroll
		obj.btn_up.on("click",function(){__controll.up();return false;});//up
		obj.btn_down.on("click",function(){__controll.down();return false;});//down
	},
	init:function(){
		this.bottom();// 하단 퀵
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
				<a href="#" class="prev"><span>이전</span></a>\
				<a href="#" class="next"><span>다음</span></a>\
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
				"0d11de55c94ea05ed6d1f9f077bf4072"//운영사이트 키
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
			obj.li = obj.find(" .move li");
			obj.cnt = 0;
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 8000;
		
		___controll = function(){
			return{
				set:function(){
					$('<div class="controll">\
						<a href="javascript:;" class="btn_play"><span>재생</span></a>\
						<a href="javascript:;" class="btn_stop"><span>정지</span></a>\
					</div>').prependTo(obj);
					for(var i=0; i<obj.li.length; i++){
						$('<a href="javascript:;">'+(i+1)+'</a>').appendTo(obj.find(" .controll"));
					}
					obj.btn_play = obj.find(" .btn_play");
					obj.btn_stop = obj.find(" .btn_stop");
					obj.btn = obj.find(" .controll>a:not([class*='btn_'])");
				},
				point:function(_this){
					clearTimeout(obj.saveTime);
					var idx = (typeof _this === "object") ? obj.btn.index(_this) : _this;
					obj.li.removeClass("on").eq(idx).addClass("on");

					if(obj.li.eq(idx).attr("data-style") !== undefined) obj.li.eq(idx).attr("style",obj.li.eq(idx).attr("data-style")).removeAttr("data-style");

					if(obj.li.length > 1){
						obj.btn.removeClass("on").eq(idx).addClass("on");
					}
					obj.cnt = idx;
				},
				next:function(){
					var _this = this;
					var idx = (obj.cnt+1 < obj.li.length) ? obj.cnt+1:0;
					obj.saveTime = setTimeout(function(){
						_this.point(idx);
						if(obj.autos === "Y"){_this.next();}
					},obj.saveTimeSpeed);
				},
				play:function(){
					obj.autos = "Y";
					obj.btn_play.hide();
					obj.btn_stop.show();
					this.next();
				},
				stop:function(){
					obj.autos = "N";
					obj.btn_play.show();
					obj.btn_stop.hide();
					clearTimeout(obj.saveTime);
				},
				init:function(){
					this.set();
					___controll().point(obj.cnt);
					if(obj.li.length > 1){
						obj.btn.on("click",function(){___controll().point(this);return false;});
						obj.btn_play.on("click",function(){___controll().play();return false;});
						obj.btn_stop.on("click",function(){___controll().stop();return false;});
						obj.on("focusin",function(){___controll().stop();return false;});

						if(obj.autos === "Y"){
							obj.btn_play.trigger("click");
						}
					} else {
						obj.find(" .controll").remove();
					}
				}
			}
		}
		___controll().init();
	}
}
// 상단 팝업
var __popup = {
	set:function(){
		$('<a href="javascript:;" class="btn_prev"><span>이전</span></a><a href="javascript:;" class="btn_next"><span>다음</span></a>').prependTo($('[data-layout="popup"] .in'));
		var ___controll;
		var obj = $('[data-layout="popup"]');
			obj.li = obj.find(" .move li");
			obj.btn_prev = obj.find(" .btn_prev");
			obj.btn_next = obj.find(" .btn_next");
			obj.btn_close = obj.find(" .close");
			obj.check = obj.find(" .etc input[type='checkbox']");
			obj.cnt = 0;

		___controll = function(){
			return{
				point:function(idx){
					obj.li.removeClass("on").eq(idx).addClass("on");
					obj.cnt = idx;
				},
				next:function(str){
					var idx = (str === "next") ? obj.cnt+1 : obj.cnt-1;
						idx = (idx>obj.li.length-1) ? 0:idx;
						idx = (idx<0) ? obj.li.length-1:idx;
					this.point(idx);
				},
				close:function(){
					var ch = obj.check.prop("checked");
					if(ch){
						$.cookie('komir_popup', 'ok', {expires:1});
					}
					$('body').removeAttr("data-popup");
					$('#global').focus();
				},
				init:function(){
					this.point(obj.cnt);
					if($.cookie('komir_popup') === "ok"){
						this.close();
					} else {
						$('body').attr("data-popup","on");
					}
					if(obj.li.length < 1){
						this.close();
					}
				}
			}
		}
		___controll().init();
		obj.btn_prev.on("click",function(){___controll().next("prev");return false;});
		obj.btn_next.on("click",function(){___controll().next("next");return false;});
		obj.btn_close.on("click",function(){___controll().close();return false;});
		if(obj.li.length < 2){
			obj.btn_prev.hide();
			obj.btn_next.hide();
			return false;
		} 
	},
	init:function(){
		this.set();
	}
}
// 공지사항
var __notice = {
	set:function(){
		var ___controll;
		var obj = $("#notice");
			obj.li = obj.find(">div>ul>li");
			obj.tab = obj.li.find(">a:not(.more)");
			obj.cnt = 0;

		___controll = function(){
			return{
				revers:function(str,idx){							
					$('<'+str+'>'+obj.li.eq(idx).find(">a:not(.more)").text()+'</'+str+'>').appendTo(obj.li.eq(idx).find(">a:not(.more)").empty());
				},
				click:function(ob){
					var _this = ob;
					var idx = obj.li.index(_this.parent());

					this.clear();
					this.revers("strong",idx);
					obj.li.removeClass("on").eq(idx).addClass("on");
				},
				clear:function(){
					for(var i=0; i<obj.li.length; i++){
						this.revers("span",i);
					}
				},
				def:function(){
					this.clear();
					this.click(obj.li.eq(0).find(">a:not(.more)"));
				},
				init:function(){
					this.def();
				}
			}
		}
		___controll().init();

		obj.tab.on("click",function(){___controll().click($(this));return false;});
	},
	init:function(){
		this.set();
	}
}
// 알림판
var __popupzone = {
	set:function(){
		$('<div class="controll">\
			<strong>1<span>/15</span></strong>\
			<a href="#" class="btn_prev"><span>이전</span></a>\
			<a href="#" class="btn_play"><span>재생</span></a>\
			<a href="#" class="btn_stop"><span>정지</span></a>\
			<a href="#" class="btn_next"><span>다음</span></a>\
		</div>').insertBefore($("#popupzone .move"));
		var ___controll;
		var obj = $("#popupzone");
			obj.count = obj.find(".controll>strong");
			obj.btn_prev = obj.find(" .btn_prev");
			obj.btn_next = obj.find(" .btn_next");
			obj.btn_play = obj.find(" .btn_play");
			obj.btn_stop = obj.find(" .btn_stop");
			obj.li = obj.find(" .move>ul>li");
			obj.cnt = 0;
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 6000;

		___controll = function(){
			return{
				count:function(){
					obj.count.html((obj.cnt+1)+"<span>/"+obj.li.length+"</span>");
				},
				point:function(idx){
					obj.li.removeClass("on").eq(idx).addClass("on");
					obj.li.stop().fadeOut(500).eq(idx).stop().fadeIn(500);
					obj.cnt = idx;
					this.count();

					if(obj.li.eq(idx).find(" [data-style]").length !== 0){
						obj.li.eq(idx).find(" [data-style]").attr("style",obj.li.eq(idx).find(" [data-style]").attr('data-style')).removeAttr('data-style');
					}
				},
				next:function(str){
					clearTimeout(obj.saveTime);
					var idx = (str === "next") ? obj.cnt+1 : obj.cnt-1;
						idx = (idx>obj.li.length-1) ? 0:idx;
						idx = (idx<0) ? obj.li.length-1:idx;
					this.point(idx);

					if(obj.autos === "Y"){
						this.play();
					}
				},
				play:function(){
					var _this = this;
					obj.autos = "Y";
					obj.btn_play.hide();
					obj.btn_stop.show();
					obj.saveTime = setTimeout(function(){
						_this.next();
					},obj.saveTimeSpeed);
				},
				stop:function(){
					obj.autos = "N";
					obj.btn_play.show();
					obj.btn_stop.hide();
					clearTimeout(obj.saveTime);
				},
				def:function(){
					this.point(0);
				},
				init:function(){
					this.def();
					if(obj.autos === "Y"){
						this.play();
					}
				}
			}
		}
		___controll().init();
		if(obj.li.length < 2){
			obj.find(".controll").remove();
		} else {
			obj.btn_prev.on("click",function(){___controll().next("prev");return false;});
			obj.btn_next.on("click",function(){___controll().next("next");return false;});
			obj.btn_play.on("click",function(){___controll().play();return false;});
			obj.btn_stop.on("click",function(){___controll().stop();return false;});
			obj.li.on("focusin",function(){___controll().stop();return false;});
		}
	},
	init:function(){
		this.set();
	}
}
// KOMIR STORY
var __komirStory = {
	set:function(){
		var ___controll;
		var obj = $("#komir-story");
			obj.li = obj.find(">div>ul>li");
			obj.tab = obj.li.find(">a:not(.more)");
			obj.cnt = 0;

		// obj.li.eq(0).find(">div>ul").niceScroll({cursorcolor:"#000",cursoropacitymax:0.5,touchbehavior:true,overflowy:false});
		
		___controll = function(){
			return{
				revers:function(str,idx){							
					$('<'+str+'><span>'+obj.li.eq(idx).find(">a:not(.more)").text()+'</span></'+str+'>').appendTo(obj.li.eq(idx).find(">a:not(.more)").empty());
				},
				click:function(ob){
					var _this = ob;
					var idx = obj.li.index(_this.parent());

					this.clear();
					this.revers("strong",idx);
					obj.li.removeClass("on").eq(idx).addClass("on");
					// data-style
					if(obj.li.eq(idx).find(" [data-style]").length !== 0){
						for(var i=0; i<obj.li.eq(idx).find(" [data-style]").length; i++){
							obj.li.eq(idx).find(" [data-style]").eq(i).attr("style",obj.li.eq(idx).find(" [data-style]").eq(i).attr('data-style'));
						}
						obj.li.eq(idx).find(" [data-style]").removeAttr('data-style')
					}
				},
				clear:function(){
					for(var i=0; i<obj.li.length; i++){
						this.revers("span",i);
					}
				},
				def:function(){
					this.clear();
					this.click(obj.li.eq(0).find(">a:not(.more)"));
				},
				init:function(){
					this.def();
				}
			}
		}
		___controll().init();

		obj.tab.on("click",function(){___controll().click($(this));return false;});
	},
	init:function(){
		this.set();
	}
}

// 팝업존 - 카드뉴스
var __popupzoneCard = {
	set:function(str){
		$('<div class="controll">\
			<strong>1<span>/15</span></strong>\
			<a href="#" class="btn_prev"><span>이전</span></a>\
			<a href="#" class="btn_play"><span>재생</span></a>\
			<a href="#" class="btn_stop"><span>정지</span></a>\
			<a href="#" class="btn_next"><span>다음</span></a>\
		</div>').insertBefore(str.find(" .move"));
		var ___controll;
		var obj = str;
			obj.count = obj.find(".controll>strong");
			obj.btn_prev = obj.find(" .btn_prev");
			obj.btn_next = obj.find(" .btn_next");
			obj.btn_play = obj.find(" .btn_play");
			obj.btn_stop = obj.find(" .btn_stop");
			obj.li = obj.find(" .move>ul>li");
			obj.cnt = 0;
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 6000;

		___controll = function(){
			return{
				count:function(){
					obj.count.html((obj.cnt+1)+"<span>/"+obj.li.length+"</span>");
				},
				point:function(idx){
					obj.li.removeClass("on").eq(idx).addClass("on");
					obj.li.stop().fadeOut(500).eq(idx).stop().fadeIn(500);
					obj.cnt = idx;
					this.count();

					if(obj.li.eq(idx).find(" [data-style]").length !== 0){
						obj.li.eq(idx).find(" [data-style]").attr("style",obj.li.eq(idx).find(" [data-style]").attr('data-style')).removeAttr('data-style');
					}
				},
				next:function(str){
					clearTimeout(obj.saveTime);
					var idx = (str === "next") ? obj.cnt+1 : obj.cnt-1;
						idx = (idx>obj.li.length-1) ? 0:idx;
						idx = (idx<0) ? obj.li.length-1:idx;
					this.point(idx);

					if(obj.autos === "Y"){
						this.play();
					}
				},
				play:function(){
					var _this = this;
					obj.autos = "Y";
					obj.btn_play.hide();
					obj.btn_stop.show();
					obj.saveTime = setTimeout(function(){
						_this.next();
					},obj.saveTimeSpeed);
				},
				stop:function(){
					obj.autos = "N";
					obj.btn_play.show();
					obj.btn_stop.hide();
					clearTimeout(obj.saveTime);
				},
				def:function(){
					this.point(0);
				},
				init:function(){
					this.def();
					if(obj.autos === "Y"){
						this.play();
					}
				}
			}
		}
		___controll().init();
		if(obj.li.length < 2){
			obj.find(".controll").remove();
		} else {
			obj.btn_prev.on("click",function(){___controll().next("prev");return false;});
			obj.btn_next.on("click",function(){___controll().next("next");return false;});
			obj.btn_play.on("click",function(){___controll().play();return false;});
			obj.btn_stop.on("click",function(){___controll().stop();return false;});
			obj.li.on("focusin",function(){___controll().stop();return false;});
		}
	},
	init:function(){
		if($("#popupzone-card").length !== 0){
			this.set($("#popupzone-card"));
		}
	}
}

// 프로그래스바
var  __progress = {
	set:function(str){
		var obj = str;
		var val = $.trim(obj.text());

		$('<div><em>'+val+'</em><span><em>'+val+'</em></span></div>').appendTo(obj.empty());
		
		obj.find(">div>span").stop().animate({"z-index":val},
			{
				duration: (parseInt(val) * 20),
				easing:"linear",
				step: function(now) {
					var idx = 1;
					if(Math.round(now) > 10) idx = 2;
					if(Math.round(now) > 20) idx = 3;
					if(Math.round(now) > 30) idx = 4;
					if(Math.round(now) > 40) idx = 5;
					if(Math.round(now) > 50) idx = 6;
					if(Math.round(now) > 60) idx = 7;
					if(Math.round(now) > 70) idx = 8;
					if(Math.round(now) > 80) idx = 9;
					if(Math.round(now) > 90) idx = 10;
					obj.find(">div>span").width(Math.round(now)+"%");
					obj.find(">div>span").attr("data-count",idx);
				}
			}
		);
	},
	init:function(){
		for(var i=0; i<$('[data-progress]').length; i++){
			this.set($('[data-progress]').eq(i));
		}
	}
}

// 레이어팝업
var __layerPop = {
	set:function(str){
		var obj = str;
			obj.btn_close = obj.find(" .close");

		obj.btn_close.on("click",function(){obj.fadeOut(300);return false;});
	},
	open:function(str){
		$('[data-pop-name="'+str+'"]').fadeIn(300);
	},
	init:function(){
		for(var i=0; i<$('[data-pop-name]').length; i++){
			this.set($('[data-pop-name]').eq(i));
		}
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

// ALIO 공시 - onclick 사용
var popItemView = function(apbaId, reportFormRootNo, apbaName, reportGubun){
	if(reportGubun == "JUNG"){	// 정기보고서 일경우

		if(reportFormRootNo == "63601") {
			
			var result = fromApbaId(apbaId);
			if(result == "true") {
				alert("주요 12개 대상기관이 아닙니다.");
				return;
			} else {
				window.open("http://www.alio.go.kr/popReportTerm.do?apbaId=" + apbaId + "&reportFormRootNo=" + reportFormRootNo, "_blank", "frame=no, scrollbars=yes, resizable=yes, width=1240");
			}
		} else {
			window.open("http://www.alio.go.kr/popReportTerm.do?apbaId=" + apbaId + "&reportFormRootNo=" + reportFormRootNo, "_blank", "frame=no, scrollbars=yes, resizable=yes, width=1240");
		}
				
	} else {	//수시 보고서
		if(reportFormRootNo == "21026,21025,21028,63795,63796"){
			window.open("http://www.alio.go.kr/popSusi.do?apbaId=" + apbaId + "&reportFormRootNo=" + reportFormRootNo, "_blank", "frame=no, scrollbars=yes, resizable=yes, top=0, width=1210, height=950");
		}else{
			window.open("http://www.alio.go.kr/popSusi.do?apbaId=" + apbaId + "&reportFormRootNo=" + reportFormRootNo, "_blank", "frame=no, scrollbars=yes, resizable=yes, top=0, width=800, height=950");
		}
	}
}

var __history = {
	set:function(str){
		var obj = str;
			obj.pc = obj.find('[data-type="pc"]');
		
		var a = obj.pc.clone();
		var b = obj.pc.clone();

		a.attr("data-type","mobile").find(' [data-group="2"]').remove();
		b.attr("data-type","mobile").find(' [data-group="1"]').remove();

		for(var i=0; i<a.find('>.midd>ul>li').length; i++){
			if(a.find('>.midd>ul>li').eq(i).find(">ul>li").length === 0) a.find('>.midd>ul>li').eq(i).attr("data-null","null");
			if(b.find('>.midd>ul>li').eq(i).find(">ul>li").length === 0) b.find('>.midd>ul>li').eq(i).attr("data-null","null");
		}
		a.find('>.midd>ul>li[data-null]').remove();
		b.find('>.midd>ul>li[data-null]').remove();

		b.insertAfter(obj.pc);
		a.insertAfter(obj.pc);
		
	},
	init:function(){
		if($('[data-content="6-6"]').length !== 0){
			this.set($('[data-content="6-6"]'));
		}
	}
}

var _layout = {
	content:function(){
		__popupzoneCard.init();//카드 뉴스
		__progress.init();//프로그래스바
		__layerPop.init();//레이어팝업
		__sitemap.init();//사이트맵 바인드
		__history.init();//연혁
	},
	sub:function(){
		__gnb.init(); //상단 메뉴
		//__gnb.pc(2); //상단 메뉴 오픈 유지 - 테스트용
		__scroll.init(); //스크롤 - header
		__global.init(); //상단 기타기능
		__path.init();//로케이션, sns, 프린트
		__footer.init();//하단
		__quick.init();//퀵

		__board.init();//게시판
		__tab.init();//Tab
		__kakaoMap.init();//Kakao map
	},
	main:function(){
		__gnb.init(); //상단 메뉴
		__scroll.init(); //스크롤 - header
		__global.init(); //상단 기타기능
		__footer.init();//하단
		__quick.init();//퀵

		__popup.init();//상단 팝업
		__visual.main();//visual main
		__notice.init();//공지사항
		__popupzone.init();//알림판
		__komirStory.init();//KOMIR STORY
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

