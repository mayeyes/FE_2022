$(document).ready(function() {
	lang_ev(); // lang_site
	search_ev(); // total_search
	mobile_gnb(); // Mobile GNB Menu
	footer_ev(); // footer_m
	associated_ev (); // associated_ev	
	attractions_search (); // attractions_searc
	aside_ev (); // aside_ev
	random_8 (); // Random1-8
	width_height(); // width=height
	
	popupzone_cont(); // popupzone_cont
	cultureBoard(); //cultureBoard
	cultureBoardMob(); //cultureBoardMob
	story_trip(); // story_trip
	gallery_ev(); // gallery_ev
	tema_trip (); //tema_trip
	
	navi_sns_AC()  //navi_sns

	
	$(window).resize(function(){	
		if($("#rwd_header").is(":hidden")){
			$("#wrap>*").css("right","0px");	
			$(".shadow_bg").fadeOut(200);
		}
		story_trip ();
		tema_trip ();
	});
	
	$(".search_btn").click(function(){
		$(this).find(">a").css({"background":"#4e5865 url(../../images/tour/common/total_search_bg.png) no-repeat center 50%"});
		$(".search_input").stop().show();
		$(".search_input").find("#search_rwd").focus();	
	});
	
	$(".search_input .close_btn").click(function(){
		$(".search_btn").find(">a").css({"background":"#0ca5ce url(../../images/tour/common/total_search_bg.png) no-repeat center 50%"});
		$(".search_input").stop().hide();	
	});
});

// lang_site
function lang_ev (){
	var lang = $(".lang");
		lang.dt = lang.find(">dt>a");
		lang.dd = lang.find(">dd");
		lang.btn = lang.find(">dd>.close");
		
	lang.dt.bind("click touchstart",function(e){
		e.preventDefault();
		$(this).parent().next().stop().show();
	});	
	
	lang.btn.bind("click touchstart",function(e){
		e.preventDefault();
		$(this).parent().stop().hide();
	});
	
	lang.dd.mouseleave(function(e){
		e.preventDefault();
		$(this).stop().hide();
	});	
}

// total_search
function search_ev (){
	var total_search = $(".total_search");
		total_search.btn = total_search.find(">.btn");
		total_search.input = total_search.find(">.search_input");
		
	total_search.btn.bind("click touchstart",function(e){
		e.preventDefault();
		$(this).next().stop().show();	
		$(this).next().find("#total_search").focus();
		$(this).stop().hide();
	});
	
	total_search.input.bind("mouseleave",function(){
		$(this).prev().stop().show();	
		$(this).stop().hide();
	});	
}

// Mobile GNB Menu
$(function() {
	mobileMenu();
	function mobileMenu(){
		//하위뎁스 유무 체크
		var dep_1 = $("#rwd_header>.rwd_gnb .depth1>li");
		for(var i=0; i<dep_1.size(); i++){
			if(dep_1.eq(i).find(">ul").size() !=0){
				dep_1.eq(i).find(">h2").addClass("child");
			}
		}

		$(".depth1 h2").click(function(e){
			e.preventDefault();
			$(".depth1 h2").not(this).removeClass("on").next().slideUp();
			$(this).toggleClass("on").next().slideToggle();
			$(".depth2 h3").not(this).next().slideUp();
		});
		$(".depth2 h3").click(function(e){
			//e.preventDefault();
			if($(this).next().length != 0){
				e.preventDefault();
				$(".depth2 h3").not(this).removeClass("on").next().slideUp();
				$(this).toggleClass("on").next().slideToggle();	
			}
		});
	};
});

function mobile_gnb(a,b,c){
	$('#rwd_header .gnb_btn').click(function(){
		var wrapHeight = $(window).innerHeight();  
		$('.rwd_gnb').css('height',wrapHeight).show();
		$('#rwd_header>.rwd_gnb').animate({'right':0},300);
		$(".shadow_bg").fadeIn(200);
		return false;
	});
	
	$("#rwd_header .shadow_bg").click(function(){
		var gnb_w = $('#rwd_header>.rwd_gnb').innerWidth();
		$('#rwd_header>.rwd_gnb').animate({"right":-gnb_w},300,function(){
				$(".depth1").find(".on").removeClass("on");
				$(".depth2, .depth3").hide();
				$(".depth1>li").eq(a-1).find("h3").addClass("on").next().show().children("li").eq(b-1).find(".depth3").show().children("li").eq(c-1).addClass("on");
				$('.rwd_gnb').removeAttr("style");
			});
		$(".shadow_bg").delay(400).fadeOut(200);
		return false;
	});

	$("#rwd_header .rwd_gnb .mob_close").click(function(){
		var gnb_w = $('#rwd_header>.rwd_gnb').innerWidth();
		$('#rwd_header>.rwd_gnb').animate({"right":-gnb_w},300,function(){
				$(".depth1").find(".on").removeClass("on");
				$(".depth2, .depth3").hide();
				$(".depth1>li").eq(a-1).find("h3").addClass("on").next().show().children("li").eq(b-1).find(".depth3").show().children("li").eq(c-1).addClass("on");
				$('.rwd_gnb').removeAttr("style");
			});
		$(".shadow_bg").delay(400).fadeOut(200);
		return false;
	});	
}

// footer_m
function footer_ev (){
	$(".rwd_footer_btn").bind("click touchstart",function(e){
		e.preventDefault();
		$(".footer_m").stop().slideToggle(200);
		$(this).toggleClass("over");
	});
	
	$(window).resize(function(){	
		var win_width = $(window).width();
		if(win_width > 983){
			if($(".footer_m").is(":hidden")){
				$(".footer_m").stop().show();	
			}
		} else {
			$(".rwd_footer_btn").removeClass("over");
			$(".footer_m").stop().hide();
		}
	});
}


// lnb
$(document).ready(function(){
	if($("#remote .js_menu_select").size() != 0){
    	lnb_navi_AC();
	}
});
function lnb_navi_AC(){
	var lnb = $("#remote .js_menu");
		lnb.btn = lnb.find(">.js_menu_select>strong>a");
		lnb.interval = "";

	lnb.find(">.js_menu_select").mouseleave(function(){
		var obj = $(this).find(">ul");
		
		lnb.interval = setTimeout(function(){
			obj.parent().find(">strong >a").removeClass("on");
			obj.stop().slideUp(200);
		},200);
	});
	lnb.find(">.js_menu_select").mouseenter(function(){
		clearTimeout(lnb.interval);
	});
	lnb.btn.on("click",function(){
		var obj = $(this).parent().siblings("ul");

		if(obj.is(":animated")) return false;
		
		$(this).toggleClass("on");
		lnb.find(">.js_menu_select>ul").not(":hidden").stop().slideUp(200);
		if(obj.is(":hidden")){
			obj.stop().slideDown(200);
		} else {
			obj.stop().slideUp(200);
		}
		return false;
	});
}

$(function(){
	$('#remote #lnb>ul>li>ul>li:first-child>a').addClass("ov");
})

// popupzone
function popupzone(param,btn,obj,auto,f,s,p,h){
	var param = $(param);
	var btn = param.find(btn);
	var obj = param.find(obj);

	var stop = btn.find("a[rel=stop]");
	var play = btn.find("a[rel=play]");

	var returnNodes; // 버튼 이벤트를 위해 반복 명령 받아두기
	var elem = 0;
	var fade = f;
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
			if(obj.size() == 0) {
				target.html("<span>0</span>/0");
			} else {
				target.html("<span>"+(elem+1)+"</span>/"+obj.size());
			}
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
			play.show();
		}
		event.preventDefault();
	});
	
	// 시작
	btn.find("a[rel=play]").bind("click",function(event){
		clearInterval(returnNodes);
		if(h==true){
			play.hide();
			stop.show();
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


// popupzone_cont
function popupzone_cont (){
	var cnt = $(".open_infor .obj").find(">li").size();
	$(".cnt").find(">span").html(cnt);
	
	if(cnt == 0) {
		$(".popupzone .close_infor").show();
		$(".popupzone .open_infor").stop().css({"bottom":-290});	
	}
	
	$(".popupzone .open_btn").click(function(){
		$(".popupzone .open_infor").stop().animate({"bottom":0},200,"easeOutCubic",function(){
			$(".popupzone .close_infor").hide();		
		});	
	});
	
	$(".popupzone .close_btn").click(function(){
		$(".popupzone .close_infor").show();
		$(".popupzone .open_infor").stop().animate({"bottom":-290},200,"easeOutCubic");	
	});
}
	

// gallery_ev
function gallery_ev (){
	var gallery_ev = $(".gallery ul li a");
					
	gallery_ev.bind("mouseenter focusin",function(){
		$(this).find(">span").stop().animate({"padding-bottom":"15"},200,"easeOutCubic");	
	});
	
	gallery_ev.bind("mouseleave focusout",function(){
		$(this).find(">span").stop().animate({"padding-bottom":"5"},200,"easeOutCubic");	
	});
}


//associated_ev
function associated_ev (){
	var relate_cont = $(".associated_content > li > a");
							
	relate_cont.bind("mouseenter focusin",function(){
		$(this).find(">p").stop().animate({"padding-bottom":"15"},200,"easeOutCubic");	
	});
	
	relate_cont.bind("mouseleave focusout",function(){
		$(this).find(">p").stop().animate({"padding-bottom":"8"},200,"easeOutCubic");	
	});
}


//attractions_search
function attractions_search (){
	$(".total_infor > .close_btn").click(function(e){
		e.preventDefault();	
		$(".area_infor").slideToggle(300,"easeOutCubic",function(){
			if($(".area_infor").is(":visible")){
				$(".total_infor > .close_btn").html("닫기");	
			} else {
				$(".total_infor > .close_btn").html("열기");	
			}
		});
	});
	
	var attractions_list = $(".attractions_result >li > a");						
	attractions_list.bind("mouseenter focusin",function(){
		$(this).find(">.category").stop().animate({"bottom":42+"px"},200,"easeOutCubic");
		$(this).find(">.counter").stop().animate({"padding-bottom":10+"px"},200,"easeOutCubic");
		$(this).find(">.more").stop().delay(100).animate({"opacity":"100","top":50+"%"},300,"easeOutCubic");
	});
	
	attractions_list.bind("mouseleave focusout",function(){
		$(this).find(">.category").stop().animate({"bottom":32+"px"},200,"easeOutCubic");
		$(this).find(">.counter").stop().animate({"padding-bottom":0+"px"},200,"easeOutCubic");
		$(this).find(">.more").stop().animate({"opacity":"0","top":55+"%"},300,"easeOutCubic");
	});
}


//story_trip
function story_trip (){
	var winWid = $(document).width();
	var storyWid = $(".story_wrap .wrap").width();
	
	if(winWid > 1100){
		$(".story_wrap .wrap ul li").width(storyWid/5);	
	} else if (winWid <= 1100 && winWid > 890){	
		$(".story_wrap .wrap ul li").width(storyWid/4);	
	} else if (winWid <= 890 && winWid > 560){	
		$(".story_wrap .wrap ul li").width(storyWid/3);	
	} else {
		$(".story_wrap .wrap ul li").width(storyWid/2);		
	}
}


//tema_trip
function tema_trip (){
	var winWid = $(document).width();
	var storyWid = $(".tema_travel .wrap").width();
	
	if($("#gnb").is(":visible")){
		$(".tema_travel .wrap ul li").width(storyWid);	
	} else if ($("#gnb").is(":hidden")){	
		$(".tema_travel .wrap ul li").width(storyWid/2);
		if (winWid < 500) {
			$(".tema_travel .wrap ul li").width(storyWid);		
		}	
	}
}


//aside_ev
function aside_ev (){
	$(".aside .open_btn").click(function(e){
		e.preventDefault();
		$(this).hide();
		$(".aside .close_btn").show();	
		$(this).parent().animate({"right":0+"px"},300,"easeOutCubic");
	});
	
	$(".aside .close_btn").click(function(e){
		e.preventDefault();	
		$(this).parent().animate({"right":-166+"px"},300,"easeOutCubic",function(){
			$(".aside .open_btn").css({"left":0,"display":"block"}).animate({"left":-26+"px"},400,"easeOutCubic");
			$(this).find(">.close_btn").hide();	
		});
	});
	
	$(window).resize(function(){
		var win_wid = $(window).width();
		if(win_wid < 1098){
			$(".aside").find(">.open_btn").show();
			$(".aside").find(">.close_btn").hide();
			$(".aside").css({"right":-166+"px"});
		} else {
			$(".aside").find(">.open_btn").hide();
			$(".aside").find(">.close_btn").hide();
			$(".aside").css({"right":0+"px"});	
		}
	});
}


//랜덤
function random_8 (){
	// 초기화
	$('.giant').removeClass('ov');
	$('a[class^=list]').removeClass('ov');
	var arr=["01","02","03","04","05","06","07","08"];
	var num = Math.floor( Math.random()* arr.length ); // 배열의 수많큼 랜덤수 생성.
	selector(arr[num]);

	$('a[class^=list]').click(function(){
		var num = $(this).attr('class').substring(4,6);
		selector(num);
	});
}

function selector(num){
	$('.giant').removeClass('ov');
	$('a[class^=list]').removeClass('ov');
	$('.g'+num).parent('.giant').addClass('ov');
	$('.list' + num).addClass('ov');
}


// width 와 height 동일하게 구성하기
function width_height (){
	var h = $(".recommend_small >li >a").width();
	var h2 = $(".giant").width();
	$(".recommend_small >li >a").height(h);
	$(".recommend_small p").height(h);
	$(".giant").height(h2);
	
	$(window).resize(function(){
		var h = $(".recommend_small >li >a").width();
		var h2 = $(".giant").width();
		$(".recommend_small >li >a").height(h); 
		$(".recommend_small p").height(h); 
		$(".giant").height(h2);
	});
}


//cultureBoard
var re_set = "";
var auto_view = "Y";

function cultureBoard(){
	$(".web_type .control_btn > a:eq(0)").click(function(){
		clearInterval(re_set);
		prev_btn();
		return false; 
	}); 
	
	$(".web_type .control_btn > a:eq(1)").click(function(){
		clearInterval(re_set); 
		next_btn();
		return false; 
	});
	
	if(auto_view == "Y"){
		auto_cont();
	}
	
	$(".web_type .board_list ul li a").bind("mouseenter focusin",function(){
		stop_cont();
		return false; 
	});
	
	$(".web_type .board_list ul li a").bind("mouseout focusout",function(){
		auto_cont();
		return false; 
	}); 
}

function prev_btn(){
	try {
		var el_clone = $(".web_type > .board_list > ul > li:last").clone();
		$(el_clone).prependTo($(".web_type > .board_list > ul"));
		$(".web_type .board_list > ul > li:last").remove();
		var bn_pos = $(".web_type > .board_list > ul > li:eq(1)").position().top*-1;
		$(".web_type > .board_list > ul").css({"top":bn_pos+"px"});
		$(".web_type > .board_list > ul").stop().animate({"top":0+"px"},400,function(){
			if(auto_view == "Y"){
			  auto_cont();  
			}
		});
	} catch (e){}
}

function next_btn(){
	try {
	   var bn_pos = $(".web_type > .board_list > ul > li:eq(1)").position().top*-1;
		$(".web_type > .board_list > ul").stop().animate({"top":bn_pos+"px"},400,function(){
			var el_clone = $(".web_type > .board_list > ul > li:eq(0)").clone();
			$(el_clone).appendTo($(".web_type > .board_list > ul"));
			$(".web_type > .board_list > ul > li:eq(0)").remove();
			$(".web_type > .board_list > ul").css({"top":"0"});
			if(auto_view == "Y"){
			  auto_cont();  
			}
		});
	} catch(e){}
}

function auto_cont(){
	clearInterval(re_set);
	re_set = setInterval(function(){
		next_btn();
	},5000);
}

function stop_cont(){
	clearInterval(re_set);
}


// cultureBoardMob
var re_set_Mob = "";
var auto_view_Mob = "Y";

function cultureBoardMob(){
	$(".mob_type .control_btn > a:eq(0)").click(function(){
		clearInterval(re_set_Mob);
		prev_btn_Mob();
		return false; 
	}); 
	
	$(".mob_type .control_btn > a:eq(1)").click(function(){
		clearInterval(re_set_Mob); 
		next_btn_Mob();
		return false; 
	});
	
	if(auto_view_Mob == "Y"){
		auto_cont_Mob();
	}
	
	$(".mob_type .board_list ul li a").bind("mouseenter focusin",function(){
		stop_cont_Mob();
		return false; 
	});
	
	$(".mob_type .board_list ul li a").bind("mouseout focusout",function(){
		auto_cont_Mob();
		return false; 
	}); 
}

function prev_btn_Mob(){
	try{
		var el_clone = $(".mob_type > .board_list > ul > li:last").clone();
		$(el_clone).prependTo($(".mob_type > .board_list > ul"));
		$(".mob_type .board_list > ul > li:last").remove();
		var bn_pos = $(".mob_type > .board_list > ul > li:eq(1)").position().top*-1;
		$(".mob_type > .board_list > ul").css({"top":bn_pos+"px"});
		$(".mob_type > .board_list > ul").stop().animate({"top":0+"px"},400,function(){
			if(auto_view_Mob == "Y"){
			  auto_cont_Mob();  
			}
		});
	} catch(e) {}
}

function next_btn_Mob(){
	try{
	   var bn_pos = $(".mob_type > .board_list > ul > li:eq(1)").position().top*-1;
		$(".mob_type > .board_list > ul").stop().animate({"top":bn_pos+"px"},400,function(){
			var el_clone = $(".mob_type > .board_list > ul > li:eq(0)").clone();
			$(el_clone).appendTo($(".mob_type > .board_list > ul"));
			$(".mob_type > .board_list > ul > li:eq(0)").remove();
			$(".mob_type > .board_list > ul").css({"top":"0"});
			if(auto_view_Mob == "Y"){
			  auto_cont_Mob();  
			}
		});
	} catch(e) {}
}

function auto_cont_Mob(){
	clearInterval(re_set_Mob);
	re_set_Mob = setInterval(function(){
		next_btn_Mob();
	},5000);
}

function stop_cont_Mob(){
	clearInterval(re_set_Mob);
}


//페이스북 페이지 타임라인 불러오기
function timeline(param){
	var param = $(param);
	var index = 0;
	var pname = "manseboryeongsi"; // 페이지 이름
//	var token = "818665711542944|ZqwQ88keq_ur2wRYZtJO7ezME4Q"; // 앱 토큰(app token)
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
//					var _link = item[e].link;
					var _link = 'https://www.facebook.com/' + _profile_id;
					var url = "https://www.facebook.com/manseboryeongsi?hc_location=timeline";					
					
//					if(_picture != undefined) _link = item[e].link;
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


		


//2016-11-14 추가
$(document).ready(function(){
	if($("#js_tour_map").size() != 0){
		js_tour_map_AC();
	}
});
function js_tour_map_AC(){
	m = $("#js_tour_map");
	m.box = m.find(" .maps");
	m.boxEvent = m.box.find(">.img_blind");
	m.moveEvent = false;
	m.event_x = 0;
	m.event_y = 0;
	m.val_x = 0;
	m.val_y = 0;
	
	m.btn_zoom = $(".js_tour_map_close");


	m.boxEvent.bind("mousedown , touchstart",function(e){
		m.moveEvent = true;

		m.event_x = e.pageX || e.originalEvent.touches[0].pageX;
		m.event_y = e.pageY || e.originalEvent.touches[0].pageY;
		m.val_x = parseInt(m.box.position().left);
		m.val_y = parseInt(m.box.position().top);
	});
	m.boxEvent.bind("mouseup , touchend , mouseleave",function(){
		m.moveEvent = false;
	});
	m.boxEvent.bind("mousemove , touchmove",function(e){
		if(m.moveEvent){
			e.preventDefault();
			var maxW = (parseInt(m.box.innerWidth()) - parseInt(m.innerWidth())) * -1;
			var maxH = (parseInt(m.box.innerHeight()) - parseInt(m.innerHeight())) * -1;
			var x = e.pageX || e.originalEvent.touches[0].pageX;
			var y = e.pageY || e.originalEvent.touches[0].pageY;
			x = m.val_x + (x - m.event_x);
			y = m.val_y + (y - m.event_y);

			if(x > 0) x = 0;
			else if(x < maxW) x = maxW;

			if(y > 0) y = 0;
			else if(y < maxH) y = maxH;

			m.box.css({"left":x+"px","top":y+"px"});

			mini_set();
		}
	});


	//미니맵 구성
	var mini = m.find(" .mini");
	mini.hit = mini.find(">.hit");

	if($("#js_tour_map .mini .map_img").size() == 0){
		$("#js_tour_map .maps .map_img").clone(false).appendTo($("#js_tour_map .mini"));
		$("#js_tour_map .mini > .map_img").attr("alt","대천해수욕장 시설안내도 미니맵");
	}

	function mini_set(){
		mini.w = (parseInt(m.innerWidth()) / parseInt(m.box.innerWidth())) * 100;
		mini.h = (parseInt(m.innerHeight()) / parseInt(m.box.innerHeight())) * 100;
		mini.l = ((parseInt(m.box.position().left) / parseInt(m.box.innerWidth())) * 100) * -1;
		mini.t = ((parseInt(m.box.position().top) / parseInt(m.box.innerHeight())) * 100) * -1;
		
		mini.hit.css({"width":mini.w+"%","height":mini.h+"%","left":mini.l+"%","top":mini.t+"%"});
	}

	mini_set();

	$(window).resize(function(){
		mini_set();		
	});





	//메뉴 관련
	var mu = $("#js_tour_map .menus");
	mu.a = mu.find(" a");

	function mu_off(){
		mu.animate({"width":"50px"},300);
		mu.find(">ul>li>ul>li").hide(0);
		for(var i=0; i<mu.find(">ul>li").size(); i++){
			mu.find(">ul>li").eq(i).find("ul>li:eq(0)").show();
		}
	}
	mu.a.click(function(){
		if(mu.width() < 100){
			mu.animate({"width":"305px"},300);
			mu.find(">ul>li>ul>li").show(0);
		} else {
			if(!$(this).hasClass("icon_00")){
				var icon = m.find(" .maker > ."+$(this).attr("class"));
				m.find(" .maker > [class*=icon_]").hide();
				icon.show();
			} else {
				m.find(" .maker > [class*=icon_]").show();
			}
			mu_off();
		}
		return false;
	});

	mu_off();

	$(window).scroll(function(){
		if(mu.width() > 100 && !mu.is(":animated")){
			mu_off();
		}
	});

	m.boxEvent.click(function(){
		if(mu.width() > 100 && !mu.is(":animated")){
			mu_off();
		}
	});
	
	
	
	//확대 부분
	m.btn_zoom.click(function(){ 
		if(!m.btn_zoom.hasClass("closes")){
			
			m.btn_zoom.addClass("closes").empty().text("-");
			blind_on(function(){
				m.addClass("zoom");
			});
			
			$("#blind").bind("click",function(){
				m.btn_zoom.removeClass("closes").empty().text("+");
				m.removeClass("zoom");
				blind_off();
			});
		} else {
			m.btn_zoom.removeClass("closes").empty().text("+");
			m.removeClass("zoom");
			blind_off();
		}
		return false;
	});

}


$(document).ready(function(){
	if($(".opentour_drop").size() != 0){
		opentour_drop_AC();
	}
});

function opentour_drop_AC(){
	var obj = $(".opentour_drop");
		obj.li = obj.find(">.lists");
		obj.btn = obj.li.find(">.tis > a");

	obj.btn.click(function(){
		var setImg = $(this).find(">img");
		var setImg_src = $(this).find(">img").attr("src");
		var setImg_alt = $(this).find(">img").attr("alt");
		if(!$(this).parent().parent().hasClass("on")){
			$(this).parent().parent().addClass("on");
			
			setImg_src = setImg_src.replace("_on","_off");
			setImg_alt = setImg_alt.replace("열기","닫기");
			setImg.attr("src",setImg_src);
			setImg.attr("alt",setImg_alt);
		} else {
			$(this).parent().parent().removeClass("on");

			setImg_src = setImg_src.replace("_off","_on");
			setImg_alt = setImg_alt.replace("닫기","열기");
			setImg.attr("src",setImg_src);
			setImg.attr("alt",setImg_alt);
		}
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

BLIND Function

ex)
blind_on()
blind_off()

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function blind_on(str){
var callback = arguments[arguments.length-1];
var binds = $("body");
if(typeof callback === 'function') {}
else {
	if(str) binds = arguments[0];
}
if(arguments.length > 1) binds = arguments[0];

$("#blind").remove();
$('<div id="blind" />').prependTo(binds);

var bl = $("#blind");

var h = 0;

if($(document).height() > $("#wrap").height()) h = $(document).height();
else h = $("#wrap").height();

bl.css({
	"position":"absolute",
	"left":"0",
	"top":"0",
	"z-index":"1000",
	"width":"100%",
	"height":h+"px",
	"background":"#000",
	"opacity":"0"
});

bl.animate(
	{"opacity":"0.7"},300,function(){
		if(typeof callback === 'function') {
			callback();
		}
	}
);

bl.click(function(){
	return false;
});
}

function blind_off(){
var callback = arguments[arguments.length-1];
var bl = $("#blind");

if(typeof callback === 'function') {
	callback();
}

bl.animate(
	{"opacity":"0"},300,function(){
		$("#blind").remove();
	}
);
}



$(document).ready(function(){
	if($(".photo_box").size() != 0){
		photo_box2_AC();
	}
});

function photo_box2_AC(){
	var ph = $(".photo_box.set01");
	ph.bbox = ph.find(">#gallery_view");
	ph.sbox = ph.find(">#gallery_thum");
	ph.moves = ph.sbox.find(">.holder>.list");
	ph.li = ph.moves.find(">li");
	ph.a = ph.li.find(">a");
	ph.btn_left = ph.find(" .prev");
	ph.btn_right = ph.find(" .next");
	ph.cnt = 0;
	
	
	function fn_action(idx){
		ph.li = ph.moves.find(">li");
		var vals = ph.li.eq(idx).find(">a").attr("href");
		var vals_alt = ph.li.eq(idx).find(">a>img").attr("alt");
		
		if(vals.indexOf(".mp4") != -1){
			//동영상일경우
//			var vals_mp4 = vals;
//			var vals_wmv = vals.replace(".mp4",".wmv");
//			var obj = '';
//			obj += '<div class="open_tour_movie">';
//			obj += '<object class="media_box" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" type="application/x-ms-wmv">';
//			obj += '<param name="Url" value="'+vals_wmv+'">';			
//			obj += '<param name="quality" value="high">';
//			obj += '<param name="wmode" value="transparent">';
//			obj += '<param name="AutoStart" value="false">';
//			obj += '<param name="preload" value="none">';	 
//			obj += '<video controls="" preload="auto" class="media_box">';
//			obj += '<source src="'+vals_mp4+'" type="video/mp4">';										 							 
//			obj += '</video>';												 							 
//			obj += '</object>';
//			obj += '</div>';
		} else {
			//이미지일경우
			var obj = '<img src="'+vals+'" alt="'+vals_alt+'" />';
		}
		
		ph.li.removeClass("active").eq(idx).addClass("active");
		$(obj).appendTo(ph.bbox.empty());
	}
	fn_action(0);
	
	function fn_moving(str){
		if(ph.moves.is(":animated")) return false;
		ph.li = ph.moves.find(">li");
		
		/*
		
		var l = ph.li.eq(0).innerWidth() * -1;
		if(str == "left"){
			ph.li.last().prependTo(ph.moves);
			ph.moves.css("left",l+"px");
			l = 0;
		}
		ph.moves.stop().animate({"left":l+"px"},300,function(){
			if(str == "right"){
				ph.li.eq(0).appendTo(ph.moves);
				ph.moves.css("left","0");
			}
		});
		*/
		
		var l = ph.li.eq(ph.cnt).innerWidth();
		var all_w = l * ph.li.size();
		var hit_w = ph.sbox.find(">.holder").width();
		var max_w = (all_w - hit_w) * -1;
		
		ph.sbox.find(">.holder").css("min-height","75px");
		
		if(str == "right"){
			if(max_w >= ph.moves.position().left) return false; 
			ph.moves.css({"position":"absolute","top":"0","height":"75px"}).stop().animate({"left":"-="+l},300,function(){});
		} else {
			if(ph.moves.position().left >= 0) return false;
			ph.moves.css({"position":"absolute","top":"0","height":"75px"}).stop().animate({"left":"+="+l},300,function(){});
		}
		
	}
	
	
	ph.a.click(function(){
		ph.li = ph.moves.find(">li");
		var idx = ph.li.index($(this).parent());
		
		fn_action(idx);
		return false;
	});
	
	ph.btn_right.click(function(){
		fn_moving("right");
		return false;
	});
	
	ph.btn_left.click(function(){
		fn_moving("left");
		return false;
	});
}




//2016-11-18 추가
$(document).ready(function(){
	var tab_chang = $(".depth_tab");

	for(var i=0; i<tab_chang.size(); i++){
		if(tab_chang.eq(i).find(">li").size() == 4){
			tab_chang.eq(i).removeClass("depth_tab").addClass("depth_tab4");
		}
	}
});


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	navi sns Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

function navi_sns_AC(){
	var obj = $("#navi .sns");
		obj.btn_open = obj.find(">.open");
		obj.btn_close = obj.find(">.close");

	obj.btn_open.click(function(){obj.attr("data-open","on");return false;});
	obj.btn_close.click(function(){obj.attr("data-open","off");return false;});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	프린트 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$(".print a").click(function() {
		printElem({
			printMode: 'popup',
			pageTitle:'프린트 미리보기', //팝업 타이틀
			printDelay : 1000,
			leaveOpen:false, //인쇄하고도 창을 띄우기(true)/안띄우기(false). Default는 false
			printBodyOptions : {
				classNameToAdd : 'user',
				styleToAdd: 'width:1023px; overflow-x:hidden;'
			}

		});
		return false;
	});
});

function printElem(options){
	$('#txt').printElement(options); //팝업으로 띄울 영역 Div 아이디
}


