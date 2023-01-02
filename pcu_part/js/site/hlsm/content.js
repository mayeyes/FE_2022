$(function(){
    //common
	if($("body#main").length === 0){
		// sub
	} else {
		// main
		main_info_AC();//학과소개
	}
})
function main_info_AC(){
	function _set(str){
		var obj = str;
			obj.li = obj.find(">.layout>.midd>ul>li");
			obj.tab = obj.li.find(">strong>a");
			obj.btn_prev = obj.find(" .btn_prev");
			obj.btn_next = obj.find(" .btn_next");
			obj.cnt = 0;
		function _page(idx){
			obj.attr("data-page",idx+1);
			obj.cnt = idx;
		}
		_page(obj.cnt);
		obj.tab.on("click",function(){
			var idx = obj.li.index($(this).parent().parent());
			_page(idx);
			return false;
		});
		obj.btn_next.on("click",function(){
			var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt+1;
			_page(idx);
			return false;
		});
		obj.btn_prev.on("click",function(){
			var idx = (obj.cnt-1 < 0) ? obj.li.length-1:obj.cnt-1;
			_page(idx);
			return false;
		});
	}
	for(var i=0; i<$('#info').length; i++){
		_set($('#info').eq(i));
	}
}