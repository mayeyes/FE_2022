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
						obj.find(">ul>li:eq("+idx+")>div").css("display","block");
						var h = obj.find(">ul>li:eq("+idx+")>div>ul").css("height","auto").innerHeight();
							h = (h<300) ? 300:h;
						obj.find(">ul>li:eq("+idx+")>div").css("display","flex");
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
			$('<div id="sitemap-wrap" />').insertAfter($("#header"));
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

						var mo = $("#header .item-1>ul").eq(0).clone();
							mo.find(" .pc").remove();
						mo.appendTo(tar.find(">#sitemap > .layout > .midd"));

						var mo2 = $("#header .item-1>ul").eq(1).clone();
							mo2.find(" .pc").remove();
						mo2.appendTo(tar.find(">#sitemap > .layout > .head"));

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

			obj.btn_open.on("click",function(){
				if(!$(".js_mobile_check").is(":hidden")){
					__controll().open();
					return false;
				}
			});//열기
			obj.btn_close.on("click",function(){__controll().close();return false;});//닫기
			obj.find(">.layout>.midd a").on("click",function(){return __controll().click($(this));});//메뉴 클릭

			obj.btn_close.last().on("keydown",function(e){__controll().focusDef(e);});

		},
		init:function(){
			this.pc();
			this.mobile();

			// __gnb.pc(2); //상단 메뉴 오픈 유지 - 테스트용
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

// quick
var __quick = {
	set:function(str){
		var obj = str;
			obj.btn = obj.find(">button");
			obj.box = obj.find(">.midd>ul");
		var __controll = {
			on:function(_this){
				if(obj.box.is(":hidden")) obj.box.slideDown(200);
				else obj.box.slideUp(200);
			}
		}
		obj.btn.on("click",function(){__controll.on(this);return false;});
	},
	init:function(){
		if($("#quick").size() !== 0) this.set($("#quick"));
	}
}

// main scroll 이벤트
var __scrollAC = {
    set:function(str){
        var io = new IntersectionObserver(function(entries){
            var c;
            
            entries.forEach(function(entry,index){
                if (entry.isIntersecting){
                    entry.target.classList.add('viewport');
                    c = entry.target.getAttribute('data-body');
                    document.body.setAttribute('data-scroll-line',c);
                    
                    // $('html,body').stop().animate({"scrollTop":entry.target.offsetTop},500,'linear');
                } else {
					// entry.target.classList.remove('viewport');
				}
            })
        })
        for(var i=0; i<str.size(); i++){
            io.observe(str[i]);
        }
    },
    init:function(){
        if($('[data-animation="scroll"]').size()!==0) this.set($('[data-animation="scroll"]'));
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

// scrollset
/*
	__scrollBind.set(obj.find(">.midd")); //스크롤액션
	<div class="scroll"><span /></div>
*/
var __scrollBind = {
	scrollSet:function(obj){
		var t = obj.scrollLeft();
		var w = obj.find(">ul").innerWidth();
		var pd = ~~(obj.css("padding-left").replace("px",""));
		var all = 0;
		for(var i=0; i<obj.find(">ul>li").size(); i++){
			all += obj.find(">ul>li").eq(i).innerWidth();
		}
		var per = w/all*100;
		var l = t/(all-w)*(100-per);
		obj.scrollBox.css({"left":obj.position().left+"px","top":(obj.position().top+obj.innerHeight()+20)+"px","width":obj.innerWidth()+"px"})
		obj.scrollBoxBar.css({"width":per+"%","left":l+"%"});

		if(per >= 99) obj.scrollBox.hide();
		else obj.scrollBox.show();
	},
	mouse:function(obj){
		// 제스쳐 추가
		var mouseCheck = false;
		var moveCheck = false;
		var _x = "";
		var _l = 0;
		
		obj.on("mousedown",function(e){
			_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
			_l = obj.scrollLeft();
			mouseCheck = true;
			moveCheck = false;

			obj.on("mousemove",function(e){
				var x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
					x = x - _x;
				if(mouseCheck){
					if(x > 10 || x < -10){
						moveCheck = true;
						obj.scrollLeft(_l+(x*-1));
						e.preventDefault();
					}
				}
				e.stopPropagation();
				return false;
			});
			return false;
		});
		
		$(document).on("mouseup",function(e){
			obj.off("mousemove");
			if(moveCheck){
				mouseCheck = false;
				e.preventDefault();
				obj.find(" a").on("click",function(){return false;});
				setTimeout(function(){obj.find(" a").off("click")},100);
			}
			return false;
		});
	},
	set:function(target){
		var _this = this;
		var obj = target;
		var sc = $('<div class="scroll"><span /></div>').insertAfter(obj);
		obj.attr('data-scroll','hidden');
		obj.scrollBox = sc;
		obj.scrollBoxBar = obj.scrollBox.find(">span");
		obj.on("scroll",function(){_this.scrollSet(obj);});
		$(window).on("resize",function(){_this.scrollSet(obj);});
		_this.scrollSet(obj);
		_this.mouse(obj);
	}
}

// 유튜브 api playlist
var mainYouTubeList = [];
var YouTubeKey = "AIzaSyDpnmmzShk7qisyEiFXTbWq7Id6G3I2jzM";
var playlistId = "PLFrZ6hAVRRZ25IHfZagiCowPvRJH5nz00";
var __getYouTube = {
	urls:function(str){
		return '<a href="https://www.youtube.com/watch?v='+str.code+'&list='+playlistId+'&index='+str.position+'" target="_blank" title="새창 열림" data-style="background-image:url('+str.poster+');"><span>'+str.title+'</span></a>';
	},
	init:function(){ 
		if($("#item-3").size() === 0 || $("#item-3").is(":hidden")) return false;
		var _this = this;
		var key = YouTubeKey;
		$.ajax({ 
			type : "GET", 
			dataType : "JSON", 
			url : "https://www.googleapis.com/youtube/v3/playlistItems?playlistId="+playlistId+"&key="+key+"&part=snippet&maxResults=50",
			contentType : "application/json", 
			success : function(jsonData) { 
				// console.log(jsonData.items);
				for (var i = 0; i < jsonData.items.length; i++) {
					var items = jsonData.items[i];
					var arr = {
						"code":items.snippet.resourceId.videoId,
						"title":items.snippet.title,
						"poster":items.snippet.thumbnails.high.url,
						"position":items.snippet.position
					};
					mainYouTubeList.push(arr);
				} 

				//랜덤리스트 번호
				// var randomCntArr = [];
				// for(var i=0; i<100; i++){
				// 	var randomCnt = Math.random(); //실수 0.000 식으로 나옴
				// 		randomCnt = Math.floor( randomCnt * (mainYouTubeList.length-1) + 1 );

				// 	if(randomCntArr.indexOf(randomCnt) === -1){
				// 		randomCntArr.push(randomCnt);

				// 		if(randomCntArr.length >= 5) i=999999;
				// 	}
				// }
				var randomCntArr = [0,1,2,3,4];
				$('<div data-animation="scroll">'+_this.urls(mainYouTubeList[randomCntArr[0]])+'</div>\
				<ul>\
					<li data-animation="scroll">'+_this.urls(mainYouTubeList[randomCntArr[1]])+'</li>\
					<li data-animation="scroll">'+_this.urls(mainYouTubeList[randomCntArr[2]])+'</li>\
					<li data-animation="scroll">'+_this.urls(mainYouTubeList[randomCntArr[3]])+'</li>\
					<li data-animation="scroll">'+_this.urls(mainYouTubeList[randomCntArr[4]])+'</li>\
				</ul>').appendTo($("#item-3>.layout>.midd").empty());

				__scrollAC.init(); //메인 스크롤이벤트
			}, 
			complete : function(data) { }, 
			error : function(xhr, status, error) {console.log("유튜브 요청 에러: "+error);}
		}); 
	}
}

var mainYouTubeList_info = [];
var playlistId_info = "PLFrZ6hAVRRZ3Icw9v5n2Ffv7pVSfKuV2y";
var __info = {
	resize:function(obj){
		for(var i=0; i<obj.li.size(); i++){
			var w = obj.box.innerWidth();
			var l = ~~(obj.find(">.midd").css("padding-left").replace("px",""));
			var r = l+w;
			var x1 = obj.li.eq(i).offset().left;
			var x2 = x1+obj.li.eq(i).width();
			// console.log(l,obj.li.eq(0).offset().left,r)
			
			if(x1 >= l && x1 <= r){
				if(x2 >= l && x2 <= r){
					obj.li.eq(i).removeClass("out");
				} else {
					obj.li.eq(i).addClass("out");
				}
			} else {
				obj.li.eq(i).addClass("out");
			}
		}
	},
	scrollSet:function(obj){
		var t = obj.find(">.midd").scrollLeft();
		var w = obj.box.innerWidth();
		var pd = ~~(obj.find(">.midd").css("padding-left").replace("px",""));
		var all = 0;
		for(var i=0; i<obj.box.find(">li").size(); i++){
			all += obj.box.find(">li").eq(i).innerWidth();
		}
		var per = w/all*100;
		var po = (all + pd) - $(window).width();
		var l = t/po*(100-per);

		obj.scrollBoxBar.css({"width":per+"%","left":l+"%"});
	},
	urls:function(str){
		return '<a href="https://www.youtube.com/watch?v='+str.code+'&list='+playlistId_info+'&index='+str.position+'" target="_blank" title="새창 열림"><span data-style="background-image:url('+str.poster+');"></span><strong>'+str.title+'</strong></a>';
	},
	set:function(str){
		var obj = str;
		var _this = this;
		var key = YouTubeKey;
		$.ajax({ 
			type : "GET", 
			dataType : "JSON", 
			url : "https://www.googleapis.com/youtube/v3/playlistItems?playlistId="+playlistId_info+"&key="+key+"&part=snippet&maxResults=50",
			contentType : "application/json", 
			success : function(jsonData) { 
				// console.log(jsonData);
				for (var i = 0; i < jsonData.items.length; i++) {
					var items = jsonData.items[i];
					var tt = items.snippet.title.split('|');
					var arr = {
						"code":items.snippet.resourceId.videoId,
						"title":tt[0],
						"poster":items.snippet.thumbnails.high.url,
						"position":items.snippet.position
					};
					mainYouTubeList_info.push(arr);
				} 

				//랜덤리스트 번호
				var randomCntArr = [];
				for(var i=0; i<100; i++){
					var randomCnt = Math.random(); //실수 0.000 식으로 나옴
						randomCnt = Math.floor( randomCnt * (mainYouTubeList_info.length-1) + 1 );

					if(randomCntArr.indexOf(randomCnt) === -1){
						randomCntArr.push(randomCnt);

						if(randomCntArr.length >= 10) i=999999;
					}
				}
				
				$('<ul />').appendTo(obj.find(">.midd").empty());
				for(var i=0; i<randomCntArr.length; i++){
					$('<li data-animation="scroll">'+_this.urls(mainYouTubeList_info[randomCntArr[i]])+'</li>').appendTo(obj.find(">.midd>ul"));
				}
				
				__scrollAC.init(); //메인 스크롤이벤트

				// out check
				obj.box = obj.find(">.midd>ul");
				obj.li = obj.box.find(">li");

				_this.resize(obj);
				obj.find(">.midd").on("scroll",function(){_this.resize(obj);});
				$(window).on("resize",function(){_this.resize(obj);});

				__scrollBind.set(obj.find(">.midd")); //스크롤액션
			}, 
			complete : function(data) { }, 
			error : function(xhr, status, error) {console.log("유튜브 요청 에러: "+error);}
		}); 
	},
	init:function(){
		if($("#item-5").size() !== 0) this.set($("#item-5"));
	}
}

var __mainVisual = {
	controllSet:function(str){
		$('<div class="controll" data-animation="scroll"></div>').prependTo(str.find(">.move"));
		for(var i=0; i<str.find(">.move>ul>li").size(); i++){
			$('<a href="#"><span>'+(i+1)+'</span></a>').appendTo(str.find(">.move>.controll"));
		}
		$('<a href="#" class="btn-stop"><span>정지</span></a><a href="#" class="btn-play"><span>재생</span></a>').appendTo(str.find(">.move>.controll"));
	},
	point:function(obj,_this){
		clearTimeout(obj.saveTime);
		var idx = obj.simbol.index(_this);
		obj.li.removeClass("on").eq(idx).addClass("on");
		obj.simbol.removeClass("on").eq(idx).addClass("on");

		//용량제한 처리
		if(obj.li.eq(idx).attr("data-style")){
			obj.li.eq(idx).attr("style",obj.li.eq(idx).attr("data-style")).removeAttr("data-style");
		}
		this.check(obj);
		obj.cnt = idx;
	},
	check:function(obj){
		if(obj.autos==="Y"){
			this.play(obj);
		}
	},
	move:function(obj){
		var _this = this;
		obj.saveTime = setTimeout(function(){
			var idx = (obj.cnt+1 > obj.simbol.size()-1) ? 0:obj.cnt+1;
			var next = obj.simbol.eq(idx);
			_this.point(obj,next);
		},obj.saveTimeSpeed);
	},
	stop:function(){
		obj.autos = "N";
		obj.btnStop.hide();
		obj.btnPlay.show();
		clearTimeout(obj.saveTime);
	},
	play:function(obj){
		obj.autos = "Y";
		obj.btnStop.show();
		obj.btnPlay.hide();
		this.move(obj);
	},
	set:function(str){
		this.controllSet(str);
		var _this = this;
		var obj = str;
			obj.li = obj.find(">.move>ul>li");
			obj.simbol = obj.find(" .controll>a:not([class*='btn-'])");
			obj.btnStop = obj.find(" .controll>.btn-stop");
			obj.btnPlay = obj.find(" .controll>.btn-play");
			obj.cnt = 0;
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 8000;

		_this.point(obj,obj.simbol.eq(0));
		obj.simbol.on("click",function(){_this.point(obj,$(this));return false;});
		obj.btnPlay.on("click",function(){_this.play(obj);return false;});

		this.check(obj);
	},
	init:function(){
		if($("#visual").size() !== 0) this.set($("#visual"));
	}
}

var __ar = {
	point:function(obj){
		obj.c = (obj.box.width() / obj.li.width() < 4) ? 9:8;
		obj.s = obj.c*obj.cnt;
		obj.e = obj.s+obj.c;
		obj.cnt_s = (obj.cnt+1 < 10) ? "0"+(obj.cnt+1):(obj.cnt+1);
		obj.cnt_e = (Math.ceil(obj.li.size() / obj.c) < 10) ? "0"+Math.ceil(obj.li.size() / obj.c):Math.ceil(obj.li.size() / obj.c);

		obj.li.removeClass("on").find(">a").attr("tabindex","-1");
		for(var i=obj.s; i<obj.e; i++){
			obj.li.eq(i).addClass("on").find(">a").removeAttr("tabindex");
		}
		obj.count.html('<strong>'+obj.cnt_s+'</strong> / '+obj.cnt_e);
	},
	move:function(obj,str){
		if(str==="next"){
			var idx = (obj.cnt+1 > obj.cnt_e-1) ? 0:obj.cnt+1;
		} else {
			var idx = (obj.cnt-1 < 0) ? obj.cnt_e-1:obj.cnt-1;
		}
		obj.cnt = idx;
		this.point(obj);
	},
	open:function(obj){
		$("body").attr("data-ar","on");
	},
	close:function(obj){
		$("body").attr("data-ar","off");
		obj.btn.focus();
	},
	set:function(str){
		var _this = this;
		var obj = str;
			obj.btn = $("#header .ar:not(.close)");
			obj.btnClose = $("#header .ar.close");
			obj.box = obj.find(" .notice-card");
			obj.li = obj.box.find(">li");
			obj.count = obj.find(".controll>div>span");
			obj.btnPrev = obj.find(".controll .btn-prev");
			obj.btnNext = obj.find(".controll .btn-next");
			obj.cnt = 0;

		

		_this.point(obj);
		$(window).on("resize",function(){obj.cnt = 0; _this.point(obj);});
		obj.btn.on("click",function(){_this.open(obj);return false;});
		obj.btnClose.on("click",function(){_this.close(obj);return false;});
		obj.btnPrev.on("click",function(){_this.move(obj,"prev");});
		obj.btnNext.on("click",function(){_this.move(obj,"next");});

		// 접근성
		obj.btnClose.on("keydown",function(event){
			if(!shift && event.keyCode === 9){
				obj.box.find(">li.on").eq(0).find(">a").focus();
				return false;
			}
		});
		obj.box.find(">li.on").eq(0).find(">a").on("keydown",function(event){
			if(shift && event.keyCode === 9){
				obj.btnClose.focus();
				return false;
			}
		});

		//시작시 오픈
		_this.open(obj);
	},
	init:function(){
		if($("#ar-box").size !== 0) this.set($("#ar-box"));
	}
}

var __notice = {
	point:function(obj,_this){
		obj.li.find(" .viewport").removeClass("viewport");
		var idx = obj.li.index(_this.parent());
		for(var i=0; i<obj.li.size(); i++){
			var t = obj.li.eq(i).find(">a").text();
			var tag = (i===idx)?"<strong>"+t+"</strong>":"<span>"+t+"</span>";
			
			$(tag).appendTo(obj.li.eq(i).find(">a").empty());
		}
		obj.li.removeClass("on").eq(idx).addClass("on");
	},
	set:function(str){
		var _this = this;
		var obj = str;
			obj.li = obj.find(" .midd>ul>li");
			obj.tab = obj.li.find(">a");
			obj.box = obj.li.find(">div");

		_this.point(obj,obj.li.eq(0).find(">a"));
		obj.tab.on("click",function(){_this.point(obj,$(this));return false;});
	},
	init:function(){
		if($("#item-1").size() !== 0) this.set($("#item-1"));
	}
}

var __arim = {
	count:function(obj){
		obj.count.html("<em>"+(obj.cnt+1)+"</em>/"+obj.li.size());
	},
	point:function(obj,str){
		clearTimeout(obj.saveTime);
		var idx = (str==="next")? (obj.cnt+1 > obj.li.size()-1)?0:obj.cnt+1:(obj.cnt-1 < 0)?obj.li.size()-1:obj.cnt-1;
		obj.li.removeClass("on").eq(idx).addClass("on");
		obj.cnt = idx;
		this.count(obj);
		if(obj.autos === "Y"){
			this.move(obj);
		}
	},
	def:function(obj){
		obj.li.removeClass("on").eq(0).addClass("on");
		this.count(obj);
		if(obj.autos === "Y"){
			this.play(obj);
		}
	},
	move:function(obj){
		var _this = this;
		obj.saveTime = setTimeout(function(){
			_this.point(obj,"next");
		},obj.saveTimeSpeed);
	},
	play:function(obj){
		obj.autos = "Y";
		obj.btnPlay.hide();
		obj.btnStop.show();
		this.move(obj);
	},
	stop:function(obj){
		obj.autos = "N";
		obj.btnPlay.show();
		obj.btnStop.hide();
		clearTimeout(obj.saveTime);
	},
	set:function(str){
		var _this = this;
		var obj = str;
			obj.li = obj.find(">.midd>ul>li");
			obj.count = obj.find(">.head>div>span");
			obj.btnPrev = obj.find(">.head>div>.btn-prev");
			obj.btnNext = obj.find(">.head>div>.btn-next");
			obj.btnStop = obj.find(">.head>div>.btn-stop");
			obj.btnPlay = obj.find(">.head>div>.btn-play");
			obj.cnt = 0;
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 6000;

		this.def(obj);
		obj.btnPrev.on("click",function(){_this.point(obj,"prev");return false;});
		obj.btnNext.on("click",function(){_this.point(obj,"next");return false;});
		obj.btnPlay.on("click",function(){_this.play(obj);return false;});
		obj.btnStop.on("click",function(){_this.stop(obj);return false;});
	},
	init:function(){
		if($("#item-2 .item-2-4").size() !== 0) this.set($("#item-2 .item-2-4"));
	}
}

var __knu = {
	init:function(){
		__scrollBind.set($('#visual>.data .midd')); //스크롤액션
	}
}

var __layoutPop = {
	close:function(obj){
		if($("body").attr('data-popup') === "on"){
			//close
			$("body").attr('data-popup','off');
			$("#header .popup-close>span").text("팝업열기");
		} else {
			$("body").attr('data-popup','on');
			$("#header .popup-close>span").text("팝업닫기");
		}
	},
	check:function(obj){
		if(obj.ch.prop('checked')){
			$.cookie('4u-top-banner', 'ok', {expires:1});
		} else {
			$.cookie('4u-top-banner', 'null');
		}
	},
	move:function(obj,str){
		obj.li = obj.ul.find(">li");
		var l = obj.li.innerWidth() * -1;

		if(str==="prev"){
			obj.li.last().prependTo(obj.ul);
			obj.ul.css("left",l+"px");
			l = 0;
		}
		obj.ul.animate({"left":l+"px"},300,'linear',function(){
			if(str==="next"){
				obj.li.eq(0).appendTo(obj.ul);
				obj.ul.css("left","0");
			}
		});
	},
	set:function(str){
		var _this = this;
		var obj = str;
			obj.ch = obj.find(" .controll input:checkbox");
			obj.btnClose = $(".popup-close");
			obj.btnPrev = obj.find(" .btn-prev");
			obj.btnNext = obj.find(" .btn-next");
			obj.ul = obj.find(" .move>ul");
			obj.li = obj.ul.find(">li");

		$(window).scrollTop(0);
		obj.btnClose.on("click",function(){_this.close(obj);return false;});
		obj.ch.on("change",function(){_this.check(obj);});
		obj.btnPrev.on("click",function(){_this.move(obj,"prev");});
		obj.btnNext.on("click",function(){_this.move(obj,"next");});

		if($.cookie('4u-top-banner') === "ok"){
			obj.ch.prop('checked','checked');
			$("body").attr('data-popup','off');
			$("#header .popup-close>span").text("팝업열기");
		} else {
			$("body").attr('data-popup','on');
			$("#header .popup-close>span").text("팝업닫기");
		}
	},
	init:function(){
		if($('#layout-popup').size() !== 0) this.set($('#layout-popup'));
	}
}

var __layer = {
	open:function(name){
		var _this = this;
		$('[data-popup="layer"]').hide();
		var obj = $('[data-popup="layer"][data-name="'+name+'"]');
		if(obj.size() === 0) return false;

		$("body").attr("data-layer",name);
		obj.css("display","flex");

		$(document).on("keydown",function(event){
			if(event.keyCode===27){
				_this.close();
			}
		});
	},
	close:function(){
		$("body").removeAttr("data-layer");
		$('[data-popup="layer"]').hide();
		$(document).off("keydown");
	}
}

var _layout = {
	content:function(){
		__sitemap.init();//사이트맵 바인드
		__board.init();
	},
	sub:function(){
		__gnb.init(); //상단 메뉴
		__quick.init(); //quick
		__layoutPop.init(); //상단 팝업
		__path.init();//로케이션, sns, 프린트
		__tab.init(); //tab
	},
	main:function(){
		__gnb.init(); //상단 메뉴
		__quick.init(); //quick
		__layoutPop.init(); //상단 팝업
		__mainVisual.init(); //visual
		__knu.init();//즐겨찾는 정보
		__getYouTube.init(); //YouTube 채널리스트
		__info.init(); //학과소개
		__ar.init(); //알림창
		__notice.init(); //Notice
		__arim.init(); //알림판

		__scrollAC.init(); //메인 스크롤이벤트

		//용량제한 처리
		$(window).on("scroll",function(){
			var o = $("[data-style]");
			if(o.size() !== 0){
				for(var i=0; i<o.size(); i++){
					if(o.eq(i).parents(".viewport").size() !== 0){
						o.eq(i).attr('style',o.eq(i).attr('data-style')).removeAttr('data-style');
					}
				}
			}
		});
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
