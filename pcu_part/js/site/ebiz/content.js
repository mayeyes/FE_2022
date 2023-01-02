$(function(){
    //common
	if($("body#main").length === 0){
		// sub
	} else {
		// main
		photo_slide_AC();//포토갤러리
	}
})
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