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
			obj.on("focusout",function(){obj.saveTime = setTimeout(function(){controll().off();},100);});
			obj.on("focusin",function(){clearTimeout(obj.saveTime);});
		}
		var ob = (str !== undefined) ? str:$("#header #etc .select");
		
		for(var i=0; i<ob.length; i++){
			set(ob.eq(i));
		}
	},
	init:function(){
		this.select();
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
					obj.find(">ul>li>div").show();

					$("body").attr("data-gnb","on");
				},
				off:function(){
					obj.find(">ul>li").attr("data-open","off");
					obj.find(">ul>li>div").hide();
				},
				leave:function(){
					var _this = this;
					obj.saveTime = setTimeout(function(){
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
		$("#header").on("mouseleave focusout",function(){__controll().leave();});
		$("#header").on("mouseenter focusin",function(){__controll().enter();});
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
							<strong>MENU</strong>\
							<div class="head"></div>\
							<div class="midd"></div>\
						</div>\
					</div>\
					<a href="#" class="allmenu_btn_close"><span>닫기</span></a>').appendTo(tar);
					menu.appendTo(tar.find(">#sitemap > .layout > .midd"));
					tar.find(">#sitemap > .layout > .midd *").removeAttr("style");

					var mo = $("#header #etc .mo").clone();
					var mo_menu = $("#header #global>.layout>div:nth-child(1) .mo-menu .midd").clone(false);
					$("<div><ul /></div>").appendTo(tar.find(">#sitemap > .layout > .head"));
					mo.appendTo(tar.find(">#sitemap > .layout > .head>div>ul"));

					
					//기존 이벤트 추가
					//__global().select(tar.find(">#sitemap > .layout > .head .select"));
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

		obj.btn_open.on("click",function(){if(!$(".js_mobile_check").is(":hidden")){__controll().open();return false;}});//열기
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

// 공통기능 - top버튼
var __Top = {
	set:function(){
		$('<button id="top-btn">\
			<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">\
				<rect width="58" height="58" fill="#161510"/>\
				<path d="M29.0005 19.6143L16.8214 38.3857L41.1797 38.3856L29.0005 19.6143Z" fill="#0074B3"/>\
				<path d="M29.0006 31.7202L24.6761 38.3855L33.3252 38.3855L29.0006 31.7202Z" fill="#161510"/>\
			</svg>\
		</button>').insertBefore("#footer");
		var ___controll;
		var obj = $('#top-btn');
			obj.x = 30;
			obj.y = 30;

		

		___controll = {
			def:function(){
				obj.css({
					"border":"none","background":"none",
					"position":"fixed","right":"-100px","bottom":obj.y+"px","z-index":"800",
					"cursor":"pointer",
					"-webkit-box-shadow":"0px 30px 20px rgba(0, 0, 0, 0.1)",
					"box-shadow":"0px 30px 20px rgba(0, 0, 0, 0.1)",
					"-webkit-transition":"opacity 0.2s linear, right 0.2s linear",
					"transition":"opacity 0.2s linear, right 0.2s linear"
				}).find(" svg").css("display","block");
			},
			fixed:function(){
				var f = $("#footer").innerHeight();
				obj.css({"position":"absolute","bottom":(f+obj.y)});
			},
			move:function(){
				obj.css({"position":"fixed","bottom":obj.y+"px"});
			},
			click:function(){
				$("html, body").animate({"scrollTop":"0"},500);
			},
			hidden:function(){
				obj.css({"opacity":"0","right":"-100px"});
			},
			view:function(){
				obj.css({"opacity":"1","right":obj.y+"px"});
			},
			scroll:function(){
				var b = $("#wrap").innerHeight() - $(window).height() - $(window).scrollTop();
				var f = $("#footer").innerHeight();
				if($(window).scrollTop() > 50){
					this.view();
				} else {
					this.hidden();
				}
				if(f > b){
					if(obj.attr("data-position") !== "fixed"){
						obj.attr("data-position","fixed");
						this.fixed();
					}
				} else {
					if(obj.attr("data-position") !== "move"){
						obj.attr("data-position","move");
						this.move();
					}
				}
			},
			init:function(){
				var _this = this;
				_this.def();

				$(window).on("scroll",function(){_this.scroll();});
				obj.on("click",function(){_this.click();});

				$(window).trigger("scroll");
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
				<a href="#photo_board_prev" class="prev"><span id="photo_board_prev">preview</span></a>\
				<a href="#photo_board_next" class="next"><span id="photo_board_next">next</span></a>\
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
			obj.li = obj.find(" .move li");
			obj.cnt = 0;
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 8000;
		
		___controll = function(){
			return{
				set:function(){
					$('<div class="controll">\
						<a href="#visual_play" class="btn_play"><span id="visual_play">재생</span></a>\
						<a href="#visual_stop" class="btn_stop"><span id="visual_stop">정지</span></a>\
						<div class="cnt"></div>\
					</div>').appendTo(obj);
					for(var i=0; i<obj.li.length; i++){
						$('<a href="#vi_num_'+(i+1)+'"><span id="vi_num_'+(i+1)+'">'+(i+1)+'</span></a>').appendTo(obj.find(" .controll>.cnt"));
					}
					obj.btn_play = obj.find(" .btn_play");
					obj.btn_stop = obj.find(" .btn_stop");
					obj.btn_simbol = obj.find(" .controll>.cnt>a");
				},
				point:function(_this){
					clearTimeout(obj.saveTime);
					var idx = (typeof _this === "object") ? obj.btn.index(_this) : _this;
					obj.li.removeClass("on").eq(idx).addClass("on");
					obj.btn_simbol.removeClass("on").eq(idx).addClass("on");

					if(obj.li.eq(idx).attr("data-style") !== undefined) obj.li.eq(idx).attr("style",obj.li.eq(idx).attr("data-style")).removeAttr("data-style");

					obj.cnt = idx;
				},
				move:function(){
					clearTimeout(obj.saveTime);
					var _this = this;
					var idx = (obj.cnt+1 < obj.li.length) ? obj.cnt+1:0;
					obj.saveTime = setTimeout(function(){
						_this.point(idx);
						if(obj.autos === "Y"){_this.move();}
					},obj.saveTimeSpeed);
				},
				simbol:function(_this){
					var idx = obj.btn_simbol.index(_this);
					this.point(idx);
					if(obj.autos === "Y"){this.move();}
				},
				prev:function(){
					clearTimeout(obj.saveTime);
					var idx = (obj.cnt-1 < 0) ? obj.li.length-1:obj.cnt-1;
					this.point(idx);
					if(obj.autos === "Y"){this.move();}
				},
				next:function(){
					clearTimeout(obj.saveTime);
					var idx = (obj.cnt+1 < obj.li.length) ? obj.cnt+1:0;
					this.point(idx);
					if(obj.autos === "Y"){this.move();}
				},
				play:function(){
					obj.autos = "Y";
					obj.btn_play.hide();
					obj.btn_stop.show();
					var idx = (obj.cnt+1 < obj.li.length) ? obj.cnt+1:0;
					this.move();
				},
				stop:function(){
					obj.autos = "N";
					obj.btn_play.show();
					obj.btn_stop.hide();
					clearTimeout(obj.saveTime);
					obj.pg.stop().css("width","0");
				},
				init:function(){
					this.set();
					___controll().point(obj.cnt);
					if(obj.li.length > 1){
						obj.btn_play.on("click",function(){___controll().play();return false;});
						obj.btn_stop.on("click",function(){___controll().stop();return false;});
						obj.btn_simbol.on("click",function(){___controll().simbol($(this));return false;});
						obj.li.on("focusin",function(){___controll().stop();return false;});

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

// Content
// 프로그래스바
var __progress = {
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

// 연혁
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
		if($('[data-content="1-5"]').length !== 0){
			this.set($('[data-content="1-5"]'));
		}
	}
}

var _layout = {
	common:function(){
		__gnb.init(); //상단 메뉴
		// __gnb.pc(2); //상단 메뉴 오픈 유지 - 테스트용
		__scroll.init(); //스크롤 - header
		__global.init(); //상단 기타기능
	},
	sub:function(){
		__path.init();//로케이션, sns, 프린트
		__Top.init();//상단 바로가기
		__board.init();//게시판
		__tab.init();//Tab
		__kakaoMap.init();//Kakao map

		__progress.init();//프로그래스바
		__layerPop.init();//레이어팝업
		__sitemap.init();//사이트맵 바인드
		__history.init();//연혁
	},
	main:function(){
		__visual.main();//visual main
	}
}


$(function(){
	// common
	_layout.common();
	if($("body#main").length === 0){
		// content
		_layout.sub();
	} else {
		// main
		_layout.main();
	}
});