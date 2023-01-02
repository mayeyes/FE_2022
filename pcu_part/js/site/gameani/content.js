$(function(){
    //common
	if($("body#main").length === 0){
		// sub
	} else {
		// main
		photo_slide_AC();//포토갤러리
		type_visual_AC();//비주얼
	}
})
function type_visual_AC(){
	function _set(str){
		var c = "";
		if(str.find(" .midd>ul>li").length < 2){
			str.find(" .midd>ul>li").removeClass("on").eq(0).addClass("on");
			return false;
		}
		for(var i=0; i<str.find(" .midd>ul>li").length; i++){
			c += '<a href="#"><span>'+(i+1)+'</span></a>';
		}
		
		$('<a href="#" class="btn_left"><span>이전</span></a>\
			<a href="#" class="btn_right"><span>다음</span></a>\
			<div class="simbol">\
				'+c+'\
				<a href="#" class="btn_play"><span>재생</span></a>\
				<a href="#" class="btn_stop"><span>정지</span></a>\
			</div>').insertBefore(str.find(">.head"));

		var obj = str;
			obj.li = obj.find(" .midd>ul>li");
			obj.num = obj.find(" .simbol>a:not([class*='btn_'])");
			obj.btn_prev = obj.find(" a.btn_left");
			obj.btn_next = obj.find(" a.btn_right");
			obj.btn_stop = obj.find(" a.btn_stop");
			obj.btn_play = obj.find(" a.btn_play");
			obj.saveTime = "";
			obj.saveTimeSpeed = 6000;
			obj.autos = "Y";
			obj.cnt = -1;

		function _move(str){
			clearTimeout(obj.saveTime);
			var idx = (str === "next") ? obj.cnt+1:obj.cnt-1;
				idx = (idx < 0) ? obj.li.length-1:idx;
				idx = (idx > obj.li.length-1) ? 0:idx;

			obj.li.removeClass("on").eq(idx).addClass("on");
			obj.num.removeClass("on").eq(idx).addClass("on");
			obj.cnt = idx;

			if(obj.autos === "Y"){
				_play();
			}
		}
		_move("next");

		function _point(idx){
			clearTimeout(obj.saveTime);
			obj.li.removeClass("on").eq(idx).addClass("on");
			obj.num.removeClass("on").eq(idx).addClass("on");
			obj.cnt = idx;

			if(obj.autos === "Y"){
				_play();
			}
		}

		function _play(){
			obj.autos = "Y";
			obj.btn_play.hide();
			obj.btn_stop.show();
			obj.saveTime = setTimeout(function(){_move("next");},obj.saveTimeSpeed);
		}
		function _stop(){
			obj.autos = "N";
			obj.btn_play.show();
			obj.btn_stop.hide();
			clearTimeout(obj.saveTime);
		}

		obj.btn_prev.on("click",function(){_move("prev");return false;});
		obj.btn_next.on("click",function(){_move("next");return false;});

		obj.btn_play.on("click",function(){_play();return false;});
		obj.btn_stop.on("click",function(){_stop();return false;});

		obj.num.on("click",function(){
			var idx = obj.num.index($(this));
			_point(idx);
			return false;
		});
	}
	for(var i=0; i<$("#visual").length; i++){
		_set($("#visual").eq(i));
	}
}
function photo_slide_AC(){
	function _set(str){
		var clones = str.find(" .midd>ul>li:gt(0)").clone();
		str.find(" .midd>ul>li").removeClass("on").eq(0).addClass("on");
		clones.addClass("clone").prependTo(str.find(" .midd>ul"));
		var obj = str;
			obj.ul = obj.find(" .midd>ul");
			obj.li = obj.ul.find(">li");
			obj.btn_prev = obj.find(" .prev");
			obj.btn_next = obj.find(" .next");
			obj.cnt = clones.length;

		function _move(str){
			var l = obj.ul.find(">li:not(.on)").innerWidth();
			
			if(str === "next"){
				obj.li.eq(0).appendTo(obj.ul);
				obj.ul.css("left","calc(50% + "+l+"px)");
				
			} else {
				obj.li.last().prependTo(obj.ul);
				obj.ul.css("left","calc(50% - "+l+"px)");
			}
			obj.ul.animate({"left":"50%"},800,"linear");

			obj.li = obj.ul.find(">li");
			obj.li.removeClass("on").eq(obj.cnt).addClass("on");
		}

		obj.btn_prev.on("click",function(){_move("prev");return false;});
		obj.btn_next.on("click",function(){_move("next");return false;});

		obj.ul.on("scroll",function(){
			if(obj.attr("data-def") !== "off") obj.attr("data-def","off");
		});

		$(window).on("resize",function(){
			if(!obj.btn_prev.is(":hidden")){
				obj.attr("data-def","on");
			}
		});
	}
	
	for(var i=0; i<$('#photo_slide').length; i++){
		_set($('#photo_slide').eq(i));
	}
}