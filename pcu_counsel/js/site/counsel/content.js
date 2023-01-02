$(function(){
    //common
	if($("body#main").length === 0){
		// sub
	} else {
		// main
		type_visual_AC();
		type_notice_AC();
		type_photo_AC();
        tab_AC;
	}
});

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
		$('<div class="controll">\
				'+c+'\
				<a href="#" class="btn_prev"><span>이전</span></a>\
				<a href="#" class="btn_play"><span>재생</span></a>\
				<a href="#" class="btn_stop"><span>정지</span></a>\
				<a href="#" class="btn_next"><span>다음</span></a>\
			</div>').prependTo(str);

		var obj = str;
			obj.li = obj.find(" .midd>ul>li");
			obj.num = obj.find(" .controll>a:not([class*='btn_'])");
			obj.btn_prev = obj.find(" .controll>a.btn_prev");
			obj.btn_next = obj.find(" .controll>a.btn_next");
			obj.btn_stop = obj.find(" .controll>a.btn_stop");
			obj.btn_play = obj.find(" .controll>a.btn_play");
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
	}
	for(var i=0; i<$("#visual").length; i++){
		_set($("#visual").eq(i));
	}
}

function type_notice_AC(){
	function _set(str){
		var obj = str;
			obj.tabs = obj.find(">ul>li>.head>a");
			obj.btn_prev = obj.find(">ul>li>.btn_prev");
			obj.btn_next = obj.find(">ul>li>.btn_next");
			obj.tabCnt = 0;

		function _move(str){
			var ul = obj.find(">ul>li:eq("+obj.tabCnt+")>.midd>ul");
			var l = (ul.find(">li").innerWidth() + parseInt(ul.find(">li").css("margin-right"))) * -1;
			if(ul.is(":animated")) return false;
			if(str === "prev"){
				ul.find(">li").last().appendTo(ul);
				ul.css("left",l+"px");
				l = 0;
			}
			ul.animate({"left":l+"px"},500,function(){
				if(str === "next"){
					ul.find(">li").eq(0).prependTo(ul);
					ul.css("left","0");
				}
			});
		}
		obj.tabs.on("click",function(){
			var idx = obj.find(">ul>li").index($(this).parent().parent());
			obj.find(">ul>li").removeClass("on").eq(idx).addClass("on");
			obj.tabCnt = idx;
			return false;
		});

		obj.btn_prev.on("click",function(){_move("prev");return false;});
		obj.btn_next.on("click",function(){_move("next");return false;});
	}
	for(var i=0; i<$("#notice").length; i++){
		_set($("#notice").eq(i));
	}
}

function type_photo_AC(){
	function _set(str){
		var obj = str;
			obj.btn_prev = obj.find(">.btn_prev");
			obj.btn_next = obj.find(">.btn_next");

		function _move(str){
			var ul = obj.find(">.midd>ul");
			var l = (ul.find(">li").innerWidth() + parseInt(ul.find(">li").css("margin-right"))) * -1;
			if(ul.is(":animated")) return false;
			if(str === "prev"){
				ul.find(">li").last().appendTo(ul);
				ul.css("left",l+"px");
				l = 0;
			}
			ul.animate({"left":l+"px"},500,function(){
				if(str === "next"){
					ul.find(">li").eq(0).prependTo(ul);
					ul.css("left","0");
				}
			});
		}

		obj.btn_prev.on("click",function(){_move("prev");return false;});
		obj.btn_next.on("click",function(){_move("next");return false;});
	}
	for(var i=0; i<$("#photo").length; i++){
		_set($("#photo").eq(i));
	}
}

var tabs = function(){
	return{
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
				if(obj.cnt > -1) _on(obj.cnt);
		
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
		def:function(str){
			var obj = str;
				obj.btn = obj.find(">.in>ul>li a");
				obj.btn.unwrap().wrap('<span />');
			obj.attr("data-view","");
		},
		init:function(){
			this.set();
		}
	}
}

function tab_AC(){
	tabs().init();
}


function radio_check(fname,code) 
{ 
	var radio_obj = new Array(); 
	 
	var cnt = 0; 
	var rbtest_sum = 0;
	var obj  = $(".test_form table input"); 
	
	for (var i = 0; i < obj.length; i++) { 
	    if (obj[i].type == "radio") { 
	        if (radio_obj[cnt - 1] != obj[i].name) { 
	            radio_obj[cnt] = obj[i].name; 
	            cnt++; 
            } 
        } 
    } 
// radio_obj 
	for (var i = 0; i < radio_obj.length; i++) { 
    		var obj = document.getElementsByName(radio_obj[i]); 
    		for (var j = 0; j < obj.length; j++) { 
        		if (obj[j].checked == true) {
        			rbtest_sum = rbtest_sum + parseInt(obj[j].value); 
        			break;
        		} 
        		
	          if ((j+1 == obj.length) && (obj[j].checked == false)) { 
	            	idx = i+1;
	               window.alert(idx+"번째 문항이 선택되지 않았습니다. \n\n선택해 주십시오."); 
	               obj[0].focus();
		          return; 
	          }
          }
	} 
	window.open('result.php?gubun='+ code +'&sum='+rbtest_sum,'result','width=300,height=225,scrollbar=no,top=400,left=400');
} 