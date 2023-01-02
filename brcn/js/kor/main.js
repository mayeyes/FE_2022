/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

Slide Script

ex)
null : 옆으로 흐르는 배너 형태
type_02 : 팝업존 형태
type_03 : 비쥬얼 형태
type_04 : 포토슬라이드 형태(배너+이미지View)

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_slide").size() != 0){
		setTimeout(function(){ slide_AC(); }, 100);
	}
});

function slide_AC(){
	var slide = $(".js_slide");

	for(var i=0; i<slide.size(); i++){
		if(slide.eq(i).hasClass("type_02")) slide_type_02(slide.eq(i));//팝업존
		else if(slide.eq(i).hasClass("type_03")) slide_type_03(slide.eq(i));//비주얼
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
	slide.counts.html("<em>"+slide.nums+"</em>"+"<span>/ "+slide.li.size()+"</span>");

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
	//slide.btn_play.click();

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
			slide.nums = slide.li.eq(1).attr("data-count");
		}

		slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).appendTo(slide.ul);
				slide.ul.css("left","0");

				if(slide.autos == "Y"){
					slide.times = setTimeout(function(){
						movement("right");
					},slide.times_speeds);
				}
			}
			window.mobile_banners = $('.js_slide > .move > .mo_type > li');
		});

		//총 카운트 적용
		slide.counts.html("<em>"+slide.nums+"</em>"+"<span>/ "+slide.li.size()+"</span>");
	}

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
	slide.times_speeds = 7000;
	slide.nums = 1;
    
    slide.li.hide().eq(0).show();

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
	slide.counts.html("<em>"+slide.nums+"</em>"+"<span>/ "+slide.li.size()+"</span>");

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
		slide.counts.html("<em>"+slide.nums+"</em>"+"<span>/ "+slide.li.size()+"</span>");
	}
}

function slide_type_03(slide){
	//비주얼
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(" .control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 300;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
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
	slide.counts.html("<em>"+slide.nums+"</em>"+"<span>/ "+slide.li.size()+"</span>");

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
			
			
			//alert(news);

			//if(news >= slide.li.size()) news = 0;
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

		slide.li.eq(olds-1).stop().css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
			slide.li.eq(olds-1).css({"left":"100%","display":"none"});
			if(slide.autos == "Y"){
				slide.times = setTimeout(function(){
					movement("right");
				},slide.times_speeds);
			}
		});

		slide.li.eq(news-1).css({"display":"block"}).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
		});

		slide.nums = news;

		//총 카운트 적용
		slide.counts.html("<em>"+slide.nums+"</em>"+"<span>/ "+slide.li.size()+"</span>");

		//심볼
		slide.simbols.find(">a.on").removeClass("on");
		slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
	}
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	top scroll btn

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
 $(window).load(function() {    
    $(".top_btn").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });
});





$(document).ready(function() {
	
	$(".sector_tab.type01 > a").click(function(){
		$(".sector_tab > a").removeClass("ov");
		$(this).addClass("ov");
		$(".list_type").hide();
		$(".icon_type").show();
	});
	
	$(".sector_tab.type02 > a").click(function(){
		$(".sector_tab > a").removeClass("ov");
		$(this).addClass("ov");
		$(".list_type").show();
		$(".icon_type").hide();
	});
});


$(window).load(function(){
	//visitor_service ();
	//main_visual2 ();
	slide_banner (); // slide_banner

	//예외
	//메인 url 오류에 인한 추가 :: 2017-06-23
	var tturl = $("a[href*='¬']");
	for(var i=0; i<tturl.size(); i++){
		var urldata = tturl.eq(i).attr("href");
		urldata = urldata.replace(/¬/g, '&not');
		tturl.eq(i).attr("href",urldata);
	}
});




 // 슬라이드 배너
function slide_banner (){	
	//	$(slide_banner_html).prependTo($(".slide_banner > .box"));
	
	
	$(".slide_banner .auto_btn .stop").click(function() { 
		$(this).hide();
		$(".slide_banner .auto_btn .play").show().focus();
		 $(".banner_list").cycle('pause'); 
	});
	$(".slide_banner .auto_btn .play").click(function() { 
		$(this).hide();
		$(".slide_banner .auto_btn .stop").show().focus();
		 $(".banner_list").cycle('resume'); 
	});
		
	$(".banner_list").cycle({
		fx:      'fade',
		timeout:  4000,
		//	pager:   '#bn_pointer',
		width: 0,
		next:   '.next1', 
		prev:   '.prev1' ,
		//pagerAnchorBuilder: pagerFactory
	});	
}


// popzone
function popzone(param,btn,obj,auto,f,s,p,h){
	var param = $(param);
	var btn = param.find(btn);
	var obj = param.find(obj);

	var stop = btn.find("a[rel=stop]");
	var play = btn.find("a[rel=play]");

	var returnNodes; // 버튼 이벤트를 위해 반복 명령 받아두기
	var elem = 0;
	var fade = false;
	var speed = s;
	var data = "";

	// setup
	obj.hide().eq(0).show();

	//페이징
	if(p.use==true){
		var target = param.find(p.path);
		target.html("");

		if(p.type == null){
			$.each(obj,function(e){
				target.append('<a href="#">'+(e+1)+'</a>');
			});
			var pbtn = target.find("a");

			pbtn.not(elem).removeClass("ov").eq(elem).addClass("ov");
			pbtn.bind("click",function(event){
				clearInterval(returnNodes);
				var t = $(this);
				elem = t.index();
				pbtn.not(elem).removeClass("ov").eq(elem).addClass("ov");
				obj.not(elem).stop(false,true).fadeOut(f/2).eq(elem).stop(false,true).fadeIn(f/2);
				stop.hide();
				play.show();
				event.preventDefault();
			});
		}

		if(p.type == 1){
			target.html("<span>"+(elem+1)+"</span>/"+obj.size());
		}
	}

	function init(n){
		if(data == "prev"){
			if(elem != 0) elem--; else elem = obj.length-1;	 
		}else{
			if(elem<obj.length-1) elem++; else elem = 0;
		}		

		if(p.use==true){
			if(p.type == null) pbtn.not(elem).removeClass("ov").eq(elem).addClass("ov");
			if(p.type == 1) target.children().text(elem+1);
		}

		obj.not(elem).stop(true,true).fadeOut(n).eq(elem).stop(true,true).fadeIn(n);
	}

	function rotate(){ returnNodes = setInterval(function(){ init(f); },speed); } // 초단위 반복

	if(h==true) play.hide();
	if(obj.size() <= 1 ) return false; // 팝업 갯수가 하나면 실행하지않습니다.
	if(auto != false) rotate();
	
	// 포커스 들어오면 멈춤
	obj.children().bind("focusin",function(){
		clearInterval(returnNodes);
	});

	// 멈춤
	btn.find("a[rel=stop]").bind("click",function(event){
		clearInterval(returnNodes);
		if(h==true){
			stop.hide();
			play.show().focus();
		}
		event.preventDefault();
	});
	
	// 시작
	btn.find("a[rel=play]").bind("click",function(event){
		clearInterval(returnNodes);
		if(h==true){
			play.hide();
			stop.show().focus();
		}
		rotate();
		event.preventDefault();
	});
	
	// 이전
	btn.find("a[rel=prev]").bind("click",function(event){
		clearInterval(returnNodes);
		data = "prev";
		init(f/2);
		if(h==true){
			stop.hide();
			play.show();
		}
		event.preventDefault();
	});
	
	// 다음
	btn.find("a[rel=next]").bind("click",function(event){
		clearInterval(returnNodes);
		data = "next";
		init(f/2);
		if(h==true){
			stop.hide();
			play.show();
		}
		event.preventDefault();
	});
}


//페이스북 페이지 타임라인 불러오기
function timeline(param){
	var param = $(param);
	var index = 0;
	var pname = "manseboryeongsi"; // 페이지 이름
	var token = "EAAHqS3cEGE0BAO0m67uTeZAtloqPvQG8ZAy4l3ClkDaZCZAJE6bZBkTFr8sGKdJtyOMDqGZCwVf3uZAzrQHfHZCSfEZC54NpRaoMZBlOZAfnZAWRvnIZCZCbfb3ZBt03Tqazlu7BoEQOnbpeuzk7k0dGAiWZARAhcOjJbDI5l2j9bZAxhbvR6Iu6to4TNZCUj6"; // 앱 토큰(app token)

	var n = 2; // 출력 갯수
	//	var str = "https://graph.facebook.com/"+pname+"/posts?access_token="+token+"&limit="+n+"&callback=?&fields=picture,id,name,message,story,created_time,link"; // graph API
	var str = "https://graph.facebook.com/"+pname+"/posts?access_token="+token+"&limit="+n+"&callback=?&fields=picture,id,message,story,created_time"; // graph API
	
	$(".facebook").scroll(function(){				
		if($(this).scrollTop() >= chak_h()) load_stream();
	});

	function chak_h(){
		var z = 0;

		$.each(param.find("li"),function(e){
			z += $(this).outerHeight()-10;
		});

		return z-$(".facebook").height();
	}

	function load_stream(){
		//console.log(str);
		$.getJSON(str,function(data){
			var item = data.data;

			$.each(item,function(e){
			
				// 담벼락
				if(item[e] && !item[e].data){
					
					//var _profile_id = item[e].from.id;
					//var _name = item[e].from.name;
					var _profile_id = item[e].id;
					var _name = item[e].name;
					var _message = item[e].message;
					var _picture = item[e].picture;
					var _created_time = item[e].created_time.split("-");
					var _year = _created_time[0];
					var _month = _created_time[1];
					var _day = _created_time[2].substr(0,2);
					var _link = 'https://www.facebook.com/' + _profile_id;
					var url = "https://www.facebook.com/manseboryeongsi?hc_location=timeline";	
					
					if(_picture != undefined) _link = 'https://www.facebook.com/' + _profile_id;

					var innerContent = "";
					if(_message != undefined) innerContent = _message; else innerContent = '<img src="'+_picture+'" alt="메인이미지">';
					if(_message != undefined && _picture != undefined) innerContent = '<img src="'+_picture+'" alt="메인이미지">'+_message;

					//var profile_img = '<span class="sum"><img src="https://graph.facebook.com/'+_profile_id+'/picture" alt="대표이미지"></span>';
					var profile_img = '<span class="sum"><img src="https://graph.facebook.com/1728697627365560/picture" alt="대표이미지"></span>';			
					//var description = '<p class="id">'+_name+'</p> <p class="timer">'+_year+'년 '+_month+'월 '+_day+'일</p><p class="text">'+innerContent+'</p>';
					var description = '<p class="id">보령시청</p> <p class="timer">'+_year+'년 '+_month+'월 '+_day+'일</p><p class="text">'+innerContent+'</p>';
					
					if(_message != undefined || _picture != undefined){
						if(_link != undefined){
							param.append('<li><a target="_blank" href="'+_link+'">'+profile_img+description+'</a></li>');
						}else{
							param.append('<li><a target="_blank" href="'+url+'">'+profile_img+description+'</a></li>');	
						}
					}

					// 코멘터
					if(item[e].comments){
						for(var i=item[e].comments.data.length-1; i>-1; i--){
							var comments_id = item[e].comments.data[i].from.id;
							var comments_name = item[e].comments.data[i].from.name;
							var comments_message = item[e].comments.data[i].message;
							var comments_picture = item[e].comments.data[i].picture;
							var comments_created_time = item[e].comments.data[i].created_time.split("-");
							var comments_year = comments_created_time[0];
							var comments_month = comments_created_time[1];
							var comments_day = comments_created_time[2].substr(0,2);

							var innerContent = "";
							if(comments_message != undefined) innerContent = comments_message; else innerContent = '<img src="'+comments_picture+'" alt="메인이미지">';
							if(comments_message != undefined && comments_picture != undefined) innerContent = '<img src="'+comments_picture+'" alt="메인이미지">'+comments_message;

							var profile_img = '<span class="sum"><img src="https://graph.facebook.com/'+comments_id+'/picture" alt="대표이미지"></span>';
							var description = '<p class="id">'+comments_name+'</p> <p class="timer">'+comments_year+'년 '+comments_month+'월 '+comments_day+'일</p><p class="text">'+innerContent+'</p>'

							if(comments_message != undefined || comments_picture != undefined){
								if(_link != undefined){
									param.append('<li><a target="_blank" href="'+_link+'">'+profile_img+description+'</a></li>');
								}else{
									param.append('<li><a target="_blank" href="'+url+'">'+profile_img+description+'</a></li>');	
								}
							}
						}
					}
				}else{
					load_stream();
				}

				if(data.paging) str = data.paging.next + "&callback=?";
			});
		});
	}
	load_stream();
}


//shadow layer popup
$(function(){
	$('.bigData').click(function(){
		var $href = $(this).attr('href');
		layer_popup($href);
	});
	function layer_popup(el){
	
		var $el = $(el);		//레이어의 id를 $el 변수에 저장
		var isDim = $el.prev().hasClass('popBg');	//dimmed 레이어를 감지하기 위한 boolean 변수
	
		isDim ? $('.bigDataPopup').fadeIn() : $el.fadeIn();
	
		var $elWidth = ~~($el.outerWidth()),
			$elHeight = ~~($el.outerHeight()),
			docWidth = $(document).width(),
			docHeight = $(document).height();
	
		// 화면의 중앙에 레이어를 띄운다.
		if ($elHeight < docHeight || $elWidth < docWidth) {
			$el.css({
				marginTop: -$elHeight /2,
				marginLeft: -$elWidth/2
			})
		} else {
			$el.css({top: 0, left: 0});
		}
	
		$el.find('a.btn-layerClose').click(function(){
			isDim ? $('.bigDataPopup').fadeOut(100) : $el.fadeOut(100); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
			return false;
		});
	
		$('.layer .popBg').click(function(){
			$('.bigDataPopup').fadeOut();
			return false;
		});
	}
});
