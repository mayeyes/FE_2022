/* ////////////////////////////////////////////////////////////////////////////////////////////

	CMS menu

//////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	cms_menu_ac();
});

function cms_menu_ac(){
	var me = $(".cms #remote .js_menu > ul");
		me.li = me.find(">li");
		me.li.a = me.li.find(">a");
		me.li.ul = me.li.find(">ul");
		me.li.ul.li = me.li.ul.find(">li");
		me.li.ul.li.a = me.li.ul.li.find(">a");
		
		me.codes = me.attr("class");

		if(!me.codes || me.codes.indexOf("code_") == -1) return false; //code가 없으면 정지

		var ch = me.codes.replace("code_",""); 
		if(ch != ""){
			var hit = me.find(" a."+me.codes); 
			hit
				.addClass("on")
				.parents("li").find(">a").addClass("on")
				.siblings("ul").slideDown(300);
		}

	function updown(obj,str){
		var ul = obj.siblings("ul");
		var _li = obj;
		if(ul.size() != 0){
			if(ul.is(":hidden")){
				str.removeClass("on");
				str.siblings("ul").slideUp(300);
				ul.slideDown(300);
				_li.addClass("on");
			} else {
				ul.slideUp(300,function(){
					str.removeClass("on");
				});
			}
			return false;
		} else {
			return true;
		}
	}

	me.li.a.click(function(){
		var ch = updown($(this),me.li.a);
		return ch;
	});

	me.li.ul.li.a.click(function(){
		var ch = updown($(this),me.li.ul.li.a);
		return ch;
	});
}





/* ////////////////////////////////////////////////////////////////////////////////////////////

	CMS Content : 메뉴관리

//////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".menu_add_group").size() != 0){
		cms_content_menu_ac();
		$(window).scroll(function(){
			cms_content_menu_ac();
		});
		$(window).resize(function(){
			cms_content_menu_ac();
		});
	}
});

function cms_content_menu_ac(){
	var obj = $(".menu_add_group");
		obj.t = obj.position().top;
		obj.scroll_top = $(window).scrollTop();
		obj.head = obj.find(" .menu_add_control");

		obj.addBox = $(".menu_add_box");
	
	if(obj.t <= obj.scroll_top){
		obj.head.css("top",(obj.scroll_top-obj.t)+"px");
		obj.addBox.css("top",(obj.scroll_top-obj.t)+"px");
	} else {
		if(obj.head.attr("style")){
			obj.head.removeAttr("style");
			obj.addBox.removeAttr("style");
		}
	}
}



/* ////////////////////////////////////////////////////////////////////////////////////////////

	CMS board : 등록

//////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".board_tie_box").size() != 0){
		board_tie_box_AC();
	}
});
function board_tie_box_AC(str){
	var obj = $(".board_tie_box");
		obj.lbox = obj.find(" .l_left");
		obj.rbox = obj.find(" .l_right");
		obj.rbtn = obj.find(" .l_center > .btn:eq(0)");
		obj.lbtn = obj.find(" .l_center > .btn:eq(1)");
		obj.li = obj.find(" ul > li");
		

	//초기화
	function def(){
		obj.lbox.find(" ul > li").unbind("click").bind("click",function(){
			obj.rbox.find(" ul > li").removeClass("on");
		});
		obj.rbox.find(" ul > li").unbind("click").bind("click",function(){
			obj.lbox.find(" ul > li").removeClass("on");
		});
		obj.lbox.find(" ul > li input:checkbox").prop("checked",true);
		obj.rbox.find(" ul > li input:checkbox").prop("checked",false);

		//활성화
		obj.li.unbind("click").bind("click",function(){
			if(!$(this).hasClass("on")){
				$(this).addClass("on");
			} else {
				$(this).removeClass("on");
			}
		});
	}
	def();
	
	

	//이동
	obj.rbtn.unbind("click").bind("click",function(){
		var on = obj.lbox.find(" ul > li.on");
		if(on.size() == 0) return false;

		on.removeClass("on").appendTo(obj.rbox.find(" ul"));
		obj.rbox.find(" ul > li input:checkbox").prop("checked",false);

		def();
		return false;
	});

	obj.lbtn.unbind("click").bind("click",function(){
		var on = obj.rbox.find(" ul > li.on");
		if(on.size() == 0) return false;

		on.removeClass("on").appendTo(obj.lbox.find(" ul"));
		obj.lbox.find(" ul > li input:checkbox").prop("checked",true);

		def();
		return false;
	});
}


/* ////////////////////////////////////////////////////////////////////////////////////////////

	CMS 메뉴관리 탭, 검색

////////////////////////////////////////////////////////////////////////////////////////////*/
$(document).ready(function(){
	//tab
	if($(".tab.menu_control").size() != 0){
		tab_menu_control_AC();
	}
	//search
	if($(".menu_add_control .search").size() != 0){
		menu_add_search_AC();
	}
});
function tab_menu_control_AC(str){
	var obj = $(".menu_add_list > #menu_tree");
	obj.btn = $(".tab.menu_control > ul > li > a");
	obj.li = obj.find(">li");
	
	obj.btn.click(function(){
		obj.li = obj.find(">li");
		
		if($(this).parent().hasClass("menu_add")) return false;
		
		var idx = obj.btn.parent().index($(this).parent());
		
		if(idx == 0){
			//전체
			obj.li.stop().slideDown(200,function(){
				obj.li.find(" li").show();
			});
		} else {
			//개별
			obj.li.stop().hide();
			obj.li.eq(0).stop().show();
			obj.li.eq(idx).stop().slideDown(200,function(){
				obj.li.eq(idx).stop().find(" li").show();
			});
		}
		
		obj.btn.parent().removeClass("on");
		$(this).parent().addClass("on");
	});
}

function menu_add_search_AC(){
	var se = $(".menu_add_control .search");
	se.text_in = se.find(" input[type=text]");
	se.select_in = se.find(" select");
	se.search = se.find(" .btn_search");
	
	
	function fn_search(){
		var gubun = se.select_in.val();
		var vals = se.text_in.val();
		var ch = "";
		
		se.lists =  $(".menu_add_list > #menu_tree li");
		
		if(gubun == 1) ch = se.lists.find(" .menu_object");
		else if(gubun == 2) ch = se.lists.find(" .menu_type");
		else if(gubun == 3) ch = se.lists.find(" .menu_order");
		else if(gubun == 4) ch = se.lists.find(" .menu_etc");
		else return false;
		
		se.lists.hide();
		$(".menu_add_list > #menu_tree>li:eq(0)").show();
		
		for(var i=0; i<ch.size(); i++){
			if(ch.eq(i).text().indexOf(vals) != -1){
				ch.eq(i).parents("li").show();
			}
		}
	}
	se.text_in.keydown(function(e){
		if(e.keyCode == 13){
			fn_search();
			return false;
		}
	});
	se.search.click(function(){
		fn_search();
		return false;
	});
}














