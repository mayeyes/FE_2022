$(function(){
	footer_selectbox_AC();//selectbox
	/*topBtn_AC();*/
    tab_AC();
});



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Top Btn Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function topBtn_AC(){
	$('<div class="topbtn"><a href="#"><span>Top</span></a></div>').insertBefore($('#footer'));

	var btn = $(".topbtn");

	btn.on("click",function(){
		var speeds = $(window).scrollTop() / 2;
		$("html, body").animate({"scrollTop":0},speeds);
		return false;
	});
}


function footer_selectbox_AC(){
	function _set(str){
		var obj = str;
			obj.btn = obj.find(" .head>a");
			obj.box = obj.find(" .midd")

		obj.box.slideUp(0);

		obj.btn.on("click",function(){
			var sw = (obj.box.is(":hidden")) ? "on":"off";
			obj.attr("data-open",sw);
			if(sw==="on") obj.box.slideDown(200);
			else obj.box.slideUp(200);
			return false;
		});
	}
	for(var i=0; i<$('[data-item="select"]').length; i++){
		_set($('[data-item="select"]').eq(i));
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
