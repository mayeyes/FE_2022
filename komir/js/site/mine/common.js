
$(window).load(function() {
	// scrollTop 위치 고정
		
	$("#skiptoContent a").focus(
		function() {
			$(this).css("position", "relative");
			$(this).css("top", "0px");
			$(this).css("padding", "10px")
			$(this).css("height", "auto");
			$(this).css("color", "#fff");
		}
	);
	$("#skiptoContent a").blur(
		function() {
			$(this).css("position", "absolute");
			$(this).css("display", "block");
			$(this).css("top", "-1000px");
		}
	);
});

	// gnb 롤오버
jQuery(function($){
	var main_gnb = false;
	
	$('.gnbmenu li').mouseover(function(){
		$('.gnbmenu li').removeClass('on');
		$(this).addClass('on');
	});
	
	$('.gnbmenu>ul>li>h2>a').focus(function(){
		$('.gnbmenu li').removeClass('on');
		$(this).parent().parent().addClass('on');
	});
	
	$('.subbox > ul > li').mouseover(function(){
		$('.subbox > ul > li').removeClass('gnb_on');
		$(this).addClass('gnb_on');
	});
	
	$('.subbox > ul > li > a').focus(function(){
		$('.subbox > ul > li').removeClass('gnb_on');
		$(this).parent().addClass('gnb_on');
	});

	$('.lnbm li').mouseover(function(){
		$('.lnbm li').removeClass('on');
		$(this).addClass('on');
	});

	$('.lnbm li a').focus(function(){
		$('.lnbm li').removeClass('on');
		$(this).parent().addClass('on');
	});	
	
});

function menuload(cnt){
	var a = cnt.substr(0,2) * 1;
	var b = cnt.substr(2,2) * 1;
	var c = cnt.substr(4,2) * 1;
	$('.gnbm').removeClass('on');
	$('.lnbm li').removeClass('on');

	$('.gnbm:eq('+(a-1)+')').addClass('on');
	$('.lnbm li:eq('+(b-1)+')').addClass('on');

	var gnb_on = $('.gnb_menu_ul li.on'),  timecheck_gnb = false;
	$('.gnb_menu_ul').mouseleave(function(){

		if(timecheck_gnb == false){ 
			timecheck_gnb = true;
			setTimeout(function(){
				$('.gnbm').removeClass('on');
				gnb_on.addClass('on');
				timecheck_gnb = false;
			},1000);
		}
	});
	var sub_on = $('.lnbm li.on'), timecheck_sub = false;
	$('.lnbm').mouseleave(function(){
		if(timecheck_sub == false){ 
			timecheck_sub = true;
			setTimeout(function(){
			$('.lnbm li').removeClass('on');
				sub_on.addClass('on');
				timecheck_sub = false;
			},1000);
		}
	});	


	
	$('#gnb>li:eq('+(a-1)+')>a').addClass("active");

	$('.lnbm>li>ul').hide();
	$('.lnbm>li:eq('+(b-1)+')>ul').show();

	$('.lnbm>li:eq('+(b-1)+')>a').addClass("selected");
	$('.lnbm>li:eq('+(b-1)+')>ul>li:eq('+(c-1)+')>a').addClass("selected");

	navi_AC(cnt);
}

function navi_AC(cnt){
	if($(".pg_navi").length < 1) return false;
	var obj = $(".pg_navi");
		obj.li = obj.find(">ul>li");

	var _ob = $("#gnb");
	for(var i=1; i<obj.li.length; i++){
		var c = cnt.substr(((i-1)*2),2) * 1;
			c = c-1;
		_ob = _ob.find(">li").eq(c);
		obj.li.eq(i).find(">a").attr("href",_ob.find(">a").attr("href"));
		_ob = _ob.find(">ul");
	}
}


// 탭
jQuery(function($){
	$('.tablist h3').click(function(){
		$('.tablist').removeClass('on');
		$(this).parent().addClass('on');
	})	
});



// 관련 사이트 셀렉트
$(function(){		
	$('.familySroll').css("display","none");
	$('#qr_layer').css("display","none");
	
	var sMenu = $("ul#lnb");
	var sItem = sMenu.find('>li');
	
	sMenu.find('ul').parent('li').addClass('on');	
});

function viewFamily(){
	$('.familySroll').toggle();
}
function viewFamilyEng(){
	$('.familySroll_eng').toggle();
}



// 상세검색
$(document).ready(function(){
	$('#btnSchImg').click(function() {
		$('.pop_sch_detail').toggle();
		return false;
	});
	$('#btnSchClose, #btnSchClose2').click(function(){			
		$('.pop_sch_detail').hide();
	});
});

// 게시물 홀짝수 백그라운드 지정
$(function(){
		$(".bdListRow:odd td").css("background-color","#f7f7f7");
	});
	
// 새창열림 안내팝업
/*
jQuery(function(){
	jQuery('a').click(function(){
		if(this.getAttribute("target") != null && this.getAttribute("target").indexOf("blank")>-1){
			alert(this.getAttribute("title"));
		}
	});
});
*/


$(function(){
	sum_gal_AC();
});

function sum_gal_AC(){
	function __set(str){
		var obj = str;
			obj.ul = obj.find(">ul");
			obj.li = obj.find(">ul>li");
			obj.tx = obj.find(">ul>li>p");
			obj.btn = obj.find(">ul>li>a");
			obj.btn_prev = obj.find(" .arw_left>a");
			obj.btn_next = obj.find(" .arw_right>a");
			obj.idx = 0;
		var p = Math.ceil(obj.li.length / 7);

		for(var i=0; i<obj.find(">ul>li").length; i++){	
			obj.find(">ul>li").eq(i).attr("data-cnt",(i+1));
		}
		$('<div class="pageing"><span></span></div>').insertAfter(obj);
		for(var i=0; i<p; i++){
			$('<a href="#" data-cnt="'+i+'">'+(i+1)+'</a>').appendTo(obj.siblings(".pageing").find(">span"));
		}

		function _view(){	
			obj.li.hide();
			for(var i=0; i<obj.find(">ul>li").length; i++){	
				if(i >= (obj.idx * 7) && i < ((obj.idx+1) * 7)){
					obj.li.eq(i).show();
				}
			}
			obj.siblings(".pageing").find(">span>a").removeClass("selected").eq(obj.idx).addClass("selected");
		}
		_view();

		obj.siblings(".pageing").find(">span>a").on("click",function(){
			var idx = $(this).attr("data-cnt");
			obj.idx = idx;
			_view();
			return false;
		});

		obj.btn.on("click",function(){
			var idx = $(this).parent().attr("data-cnt");
			obj.tx.removeClass("selected");
			$(this).siblings("p").addClass("selected");
			$('[data-viewbox]').attr("data-viewbox",idx);
		});

		obj.btn_prev.on("click",function(){
			var idx = ((obj.idx-1) < 0) ? 0:obj.idx-1;
			obj.idx = idx;
			_view();
		});

		obj.btn_next.on("click",function(){
			var idx = ((obj.idx+1) > p-1) ? p-1:obj.idx+1;
			obj.idx = idx;
			_view();
		});
	}
	for(var i=0; i<$(".sum_gal").length; i++){
		__set($(".sum_gal").eq(i));
	}
}

$(function(){
	sitemap_bind_AC();
});
function sitemap_bind_AC(){
	if($("#sitemap-bind").length !== 1) return false;
	var obj = $("#sitemap-bind");
	var g = $("#gnb").clone();
		g.removeAttr("id class style");
	
	for(var i=0; i<g.find(">li").length; i++){
		var t = "0"+(i+1)+" "+g.find(">li").eq(i).find(">a").text();
		g.find(">li").eq(i).find(">a").text(t);
	}

	g.appendTo(obj);
}