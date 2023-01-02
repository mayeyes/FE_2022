$(document).ready(function() {
	select_ac (); //select_ac
	fixed_header (); //fixed_header
	cal_layer(); //cal_layer
	tab_link (); //tab_link
	live_keyword (); //live_keyword
	keyword_tab (); //keyword_tab
	keyword_mob(); //keyword_mob
	keyword_del (); //keyword_del
	media_ac (); //media_ac
	floatingTop (); //floatingTop
	
	$(window).resize(function(){
		media_ac (); //media_ac	
	});
	
	$(".type05").find("a").bind("mouseenter focusin",function(){
		$(this).parents().find(">.box").css({"border":"1px solid #8e8e8e"});	
	});
	$(".type05").find(".box").bind("mouseleave focusout",function(){
		$(this).parents().find(">.box").css({"border":"1px solid #dcdcdc"});	
	});
});


// select_ac
function select_ac (){
	var select_ty1 = $("select#category");
    select_ty1.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });	
	
	var select_ty2 = $("select#range");
    select_ty2.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });	
	
	var select_ty3 = $("#cal_layer .select > select");
    select_ty3.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });
};	


// fixed_header 
function fixed_header (){
	fixed_ac ();
	
	$(".detail_btn").click(function(){	
		if($("#detail_search").is(":animated")) return false;
		$(this).toggleClass("active");
		$("#detail_search").slideToggle(500,"easeOutCubic",function(){
			fixed_ac ();	
		}); 	
		return false;	
	}); 	
};

function fixed_ac (){
	var header = $("#header");
		header.hei = header.height();
	var fix_top = header.find(">.nav_box").offset().top;
	var header_top = $(".search_box").innerHeight();
	var aside_top = $("#aside").position().top;
	
	$("#wrap").css({"padding-bottom":header.hei+"px"});		
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		if (winTop >= fix_top) {
			header.addClass("fixed").css({"top":-fix_top+"px"}).find(">.nav_box").addClass("custom_cl");
			$("#container ,#footer").css({"top":header.hei+"px"});	
			$("#aside").stop().animate({"top":aside_top + winTop - header_top +"px"},500,"easeOutCubic"); 
		} else if (winTop < fix_top) {
			header.removeClass("fixed").css({"top":0+"px"}).find(">.nav_box").removeClass("custom_cl");
			$("#container ,#footer").css({"top":0+"px"});
			$("#aside").stop().animate({"top":aside_top +"px"},500,"easeOutCubic");
		}		
	});			
}


// cal_layer
function cal_layer (){
	$(".cal_btn").click(function(){
		$("#cal_layer").fadeIn(300,"easeOutCubic");
		cal_ac ();
		return false;	
	});
	$("#cal_layer").find(".close_btn, >.shadow_bg").click(function(){
		$("#cal_layer").fadeOut(300,"easeOutCubic",function(){
			$("#cal_layer > .wrap").removeAttr("style");	
		});
		return false;	
	});	
}

function cal_ac(){
	var win_hei = $(window).height();
	var cal = $("#cal_layer > .wrap");
	cal.css({"margin-top":(win_hei - cal.innerHeight())/2 +"px"});	
}
				
				
// tab_link 
function tab_link (){
	var tab = $(".tab_link");
		tab.ul = tab.find(">ul"); 
		tab.ul.li = tab.ul.find(">li"); 
		tab.ul.li.a = tab.ul.li.find(">a");  	
		tab.line = tab.find(">.bt_line");
	
	// default
	setTimeout(function(){tab_def(tab);},500,"easeOutCubic");
	
	// mouseover
	tab_on(tab);
	
	// mouseleave
	tab_off(tab); 	
};

function tab_def(tab){
	var tabSize = tab.ul.li.find(">.active").innerWidth();
	var tabPos = tab.ul.li.find(">.active").position().left;		
	tab.line.stop().animate({"width":tabSize+"px","left":tabPos+"px"},500,"easeOutCubic");
	//tab.line.css({"width":tabSize+"px","left":tabPos+"px"});		
};

function tab_on(tab){
	tab.ul.li.a.mouseenter(function(){
		var tabSize_on = $(this).innerWidth();
		var tabPos_on = $(this).position().left;
		//tab.ul.li.find(">.active").css({"color":"#444"});
		tab.line.stop().animate({"width":tabSize_on+"px","left":tabPos_on+"px"},500,"easeOutCubic");
	});
};

function tab_off(tab){
	tab.ul.li.a.mouseleave(function(){
		var tabSize_off = tab.ul.li.find(">.active").innerWidth();
		var tabPos_off = tab.ul.li.find(">.active").position().left;	
		//tab.ul.li.find(">.active").css({"color":"#fe504f"});
		tab.line.stop().animate({"width":tabSize_off+"px","left":tabPos_off+"px"},500,"easeOutCubic");
	});
};


// live_keyword
var sett = "";
function live_keyword (){	
	var live_keyword = $(".live_keyword");
		live_keyword.roll = live_keyword.find(">.roll");
		live_keyword.lay = live_keyword.find(">dl");
		live_keyword.btn = live_keyword.find(">.layer_btn");
		
	// default	
	lay_ac (live_keyword);
	ac_set (live_keyword);
	
	// mouse event
	live_keyword.roll.find(">ul>li>a").bind("mouseenter focus",function(){
		clearInterval(sett);
		return false;	
	});	
	live_keyword.roll.find(">ul>li>a").bind("mouseleave focusout",function(){
		clearInterval(sett);
		ac_set (live_keyword);
		return false;	
	});
}

function lay_ac (live_keyword){
	live_keyword.roll.append(live_keyword.lay.find(">dd>ul").clone());
	live_keyword.roll.find(">ul>li>a>span").remove();
	live_keyword.btn.click(function(){
		$(this).toggleClass("on").next().fadeToggle(200);
		if($(this).hasClass("on")){
			$(this).text("닫기");	
		} else {
			$(this).text("열기");		
		}	
		return false;
	});
	live_keyword.mouseleave(function(){
		live_keyword.lay.fadeOut(200); 
		live_keyword.btn.removeClass("on").text("열기");
	});	
}

function move_ac (live_keyword){
	live_keyword.roll.find(">ul").stop().animate({"top": -live_keyword.roll.find(">ul>li").height() +"px"},800,"easeOutCubic",function(){
		live_keyword.roll.find(">ul>li").eq(0).appendTo($(this));
		$(this)	.css({"top":0});
	});
}

function ac_set (live_keyword){
	clearInterval(sett);
	sett = setInterval(function(){
		move_ac (live_keyword);
	},4000);
}
				
				
// keyword_tab 
function keyword_tab (){
	var keyword_tab = $("#keyword_popular");
		keyword_tab.dt = keyword_tab.find(">dt");
		keyword_tab.dt.a = keyword_tab.dt.find(">a"); 
		keyword_tab.dd = keyword_tab.find(">dd");
	
	// default	
	keyword_tab.dt.first().find(">a").addClass("active");	
	keyword_tab.dt.first().next().show(); 
	
	// click	
	keyword_tab.dt.a.click(function(){
		keyword_tab.dt.a.removeClass("active");
		keyword_tab.dd.not(":hidden").hide();
		$(this).addClass("active");
		$(this).parent().next().show();
		return false;	
	});	
};
		




// keyword_mob 
function keyword_mob (){
	var aside = $("#aside");
		aside.a = aside.find(">a");	
		aside.box = aside.find(">.tab_box");
		aside.box.del = aside.box.find(">.del_btn");
		
	aside.a.each(function(e) {
		$(this).addClass("btn"+(e+1));	
	});
			
	// click	
	aside.a.click(function(){
		if($(this).next().is(":visible")) return false;
		aside.a.removeClass("active");
		aside.box.not(":hidden").hide(); 
		$(this).addClass("active");
		$(this).next().fadeIn(200);
		return false;
	});	
	
	aside.box.del.click(function(){
		aside.a.removeClass("active");
		$(this).parent().fadeOut(200).prev().focus();
		return false;
	});	
};
		
		
// keyword_del 
function keyword_del (){
	var keyword_result = $(".keyword_result");
		keyword_result.span = keyword_result.find(">span");
		keyword_result.span.a = keyword_result.span.find(">a.close_btn"); 
	
	// click	
	keyword_result.span.a.click(function(){
		$(this).parent().hide();
		return false;	
	});	
};


//media_ac
function media_ac (){
	var img = $(".type04").find("img");; 
		
	img.each(function() {
		var t = $(this);
		if (t.width() >= t.height()){
			$(this).css({"height":100+"%","width":"auto"});
		} else  {
			$(this).css({"width":100+"%","height":"auto"});	
		}	
	});	
};

		
//floatingTop
function floatingTop (){
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		var headerTop = $("#header").height();
		
		if (winTop > headerTop) {
			$(".floating_top").fadeIn(300,"easeOutCubic");
		} else if (winTop <= headerTop) {
			$(".floating_top").fadeOut(300,"easeOutCubic");
		}
	});	
	$(".floating_top a").click(function(){
		$("body,html").stop().animate({"scrollTop":"0"},800,"easeOutCubic");
		return false;
	});
}