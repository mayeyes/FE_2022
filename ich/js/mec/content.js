


/* ////////////////////////////////////////////////////////////////////////////////////////////

	control fixed

//////////////////////////////////////////////////////////////////////////////////////////// */
/*$(document).ready(function(){
	if($("#txt >.inner >.controls").size() != 0){
		cms_control_fixed();
		$(window).scroll(function(){
			cms_control_fixed();
		});
		
	}
});
function cms_control_fixed(){
	var obj = $("#txt >.inner >.controls");
		obj.t = obj.parent().position().top;
		obj.scroll_top = $(window).scrollTop();

	if(obj.t <= obj.scroll_top){
		obj.addClass("fixed");
	} else {
		obj.removeClass("fixed");
	}
}*/



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	FAQ

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".faq_list").size() != 0){
		board_list_faq_AC();
	}
});
function board_list_faq_AC(){
	var obj = $(".faq_list");
		obj.question = obj.find(".question");
		obj.answer = obj.find(".answer");

	//초기값
	obj.find("li:eq(0) .question").addClass("on");
	obj.find("li:eq(0) .answer").css("display","block");

	obj.question.click(function(){
		var boxs = $(this).siblings(".answer");

		if(boxs.is(":hidden")){
			obj.answer.not(":hidden").siblings(".question").removeClass("on");
			obj.answer.not(":hidden").slideUp(300);
			boxs.siblings(".question").addClass("on");
			boxs.slideDown(300);
		} else {
			obj.question.removeClass("on");
			boxs.slideUp(300);
		}
		return false;
	});
}


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
	if($(".connect_list").size() != 0){
		connect_list_AC();
	}
});
function connect_list_AC(str){
	var obj = $(".connect_list");
		obj.lbox = obj.find(" .bx_left");
		obj.rbox = obj.find(" .bx_right");
		obj.rbtn = obj.find(" .cnt_btn > .btn_right");
		obj.lbtn = obj.find(" .cnt_btn > .btn_left");
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
			//return false;
		}
	});
	se.search.click(function(){
		fn_search();
		return false;
	});
}



/* ////////////////////////////////////////////////////////////////////////////////////////////

CMS Counter

////////////////////////////////////////////////////////////////////////////////////////////*/
$(document).ready(function(){
	if($("#main_box_02").size() != 0){
		for(var i=0; i<$(".price").size(); i++){
			new numberCounter($(".price").eq(i), $(".price").eq(i).siblings("input:hidden").val(),20,0);
		}
	}
});
function numberCounter(target_frame, target_number, rate, counts) {
	this.count = counts; this.diff = 0;
	this.target_count = parseInt(target_number);
	this.target_frame = target_frame[0];
	this.timer = null;
	this.rate = 5;
	if(rate) this.rate = rate;
	if(this.target_count < this.count){
		this.counterM();
	} else {
		this.counter();
	}
};
numberCounter.prototype.counter = function() {
	var self = this;
	this.diff = this.target_count - this.count;

	if(this.diff > 0) {
		self.count += Math.ceil(this.diff / this.rate);
	}

	this.target_frame.innerHTML = this.formatNumber(this.count);

	if(this.count < this.target_count) {
		this.timer = setTimeout(function() { self.counter(); }, 20);
	} else {
		clearTimeout(this.timer);
	}
};
numberCounter.prototype.counterM = function() {
	var self = this;
	this.diff = this.target_count - this.count;

	if(this.diff < 0) {
		self.count += parseInt(Math.floor(this.diff / this.rate));
	}

	this.target_frame.innerHTML = this.formatNumber(this.count);

	if(this.count > this.target_count) {
		this.timer = setTimeout(function() { self.counterM(); }, 20);
	} else {
		clearTimeout(this.timer);
	}
};
numberCounter.prototype.formatNumber = function(num) {
	num+= '';
	x = num.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_scrollTop Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	js_scrollTop ();
});
function js_scrollTop (){	
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		
		if (winTop > 200) {
			$(".top_btn").show().stop().animate({"left":20+"px","opacity":0.8},300,"easeOutCubic");
		} else  {
			$(".top_btn").stop().animate({"left":-60+"px","opacity":0},300,"easeOutCubic",function(){
				$(this).hide();	
			});
		}
	});	
	$(".top_btn a").click(function(){
		$("body,html").stop().animate({"scrollTop":"0"},600,"easeOutCubic");
		return false;
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	accordion Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
if($(".js_accordion").size() != 0){
	accordion_menu_AC();
}
});
function accordion_menu_AC(){
var obj = $(".js_accordion");
	obj.question = obj.find(".titles");
	obj.answer = obj.find(".txtbox");

//초기값
obj.find("li:eq(0) .titles").addClass("on");
obj.find("li:eq(0) .txtbox").css("display","block");

obj.question.click(function(){
	var boxs = $(this).siblings(".txtbox");

	if(boxs.is(":hidden")){
		obj.answer.not(":hidden").siblings(".titles").removeClass("on");
		obj.answer.not(":hidden").slideUp(300);
		boxs.siblings(".titles").addClass("on");
		boxs.slideDown(300);
	} else {
		obj.question.removeClass("on");
		boxs.slideUp(300);
	}
	return false;
});
}


