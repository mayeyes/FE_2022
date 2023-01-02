$(function(){
    //common
    if($("body#main").length === 1){
        //main
        visual_slide_AC();//비주얼
    } else {
        //sub
    }
});

function visual_slide_AC(){
	function _set(str){
		var clones = str.find(" .midd>ul>li").clone();
		str.find(" .midd>ul>li").removeClass("on").eq(0).addClass("on");
		clones.prependTo(str.find(" .midd>ul"));
		var obj = str;
			obj.ul = obj.find(" .midd>ul");
			obj.li = obj.ul.find(">li");
			obj.btn_prev = obj.find(" .prev");
			obj.btn_next = obj.find(" .next");
			obj.cnt = clones.length;

		function _def(){
			var l = ((obj.innerWidth() / 2) + (obj.ul.innerWidth() / 2) * -1) - (obj.li.innerWidth() / 2);
			obj.ul.css("left",l+"px");
		}
		_def();
		$(window).on("resize",function(){
			_def();
		});
		
		function _move(str){
			var l = obj.ul.find(">li:not(.on)").innerWidth();
			
			if(str === "next"){
				obj.li.eq(0).appendTo(obj.ul);
				l = parseInt(obj.ul.position().left) + l;
				ls = l - obj.ul.find(">li:not(.on)").innerWidth();
			} else {
				obj.li.last().prependTo(obj.ul);
				l = parseInt(obj.ul.position().left) - l;
				ls = l + obj.ul.find(">li:not(.on)").innerWidth();
			}
			obj.ul.css("left",l+"px");
			obj.ul.animate({"left":ls+"px"},800,"linear");

			obj.li = obj.ul.find(">li");
			obj.li.removeClass("on").eq(obj.cnt).addClass("on");
		}

		obj.btn_prev.on("click",function(){_move("prev");return false;});
		obj.btn_next.on("click",function(){_move("next");return false;});
	}
	
	for(var i=0; i<$('#visual').length; i++){
		_set($('#visual').eq(i));
	}
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	depart_link js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	depart_link();
});
function depart_link(){
	if($('.depart_link .tw').size() !=0){
        var idx = $('.depart_link .tw');
        idx.div = idx.find(".tb");
        idx.div.long = idx.find(".tb.long");
        idx.div.css("height",idx.div.long.innerHeight()+"px");
    }
    if($('.depart_link .tw2').size() !=0){
        var idx = $('.depart_link .tw2');
        idx.div = idx.find(".tb");
        idx.div.long = idx.find(".tb.long");
        idx.div.css("height",idx.div.long.innerHeight()+"px");
    }
}