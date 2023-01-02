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
		slide.nums = slide.li.eq(0).attr("data-count");
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
	});

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
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
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
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