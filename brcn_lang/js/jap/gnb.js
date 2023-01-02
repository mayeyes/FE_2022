$(document).ready(function(){
	$.each($("#tm .th1"),function(e){
		$(this).addClass("no"+(e+1));
	});
	
	var gnb_bg = $("#tm").find(">li");	
	gnb_bg.find(">a").bind("mouseenter focusin",function(){
		var cnt = gnb_bg.find(">a").index($(this)) + 1;
		$("#animate").attr("class","bg0" + cnt);
		$("#animate_line").attr("class","bg0" + cnt);
		$(this).next().attr("class","th1_title0" + cnt);
	});	
});

// ���ㅼ슫
function gnb(param,ban,obj,btn,wrap,elem,scale,dur,meth){
	var param = $(param);
	var ban = param.find(ban);
	var obj = param.find(obj);
	var btn = param.find(btn);
	var wrap = param.find(wrap); 
	var elem = elem-1; // jsp 硫붾돱 肄붾뱶媛� 1遺��� �쒖옉�섍린 �뚮Ц��
	var old_h = 104;
	var n = elem;

	///////////////////////////////////////////////

	//gnb 2~3뎁스메뉴 높이값 구하기
	var openHeight = [];
	// var min_h = 350;
	obj.show();
	for(var i=0; i<obj.length; i++){
		var v = 385 + $("#header").innerHeight();
		// if(v<min_h){
		// 	v = min_h;
		// }
		openHeight[i] = v;
	}
	obj.hide();

	///////////////////////////////////////////////

	ban.hide();
	obj.hide();

	function _open(){
		btn.not(elem).removeClass("current").eq(elem).addClass("current");
		ban.not(elem).hide().eq(elem).show();
		obj.show();

		wrap.stop(true,false).animate({"height":openHeight[elem]},dur,meth);
		$("#gnb").addClass("on");
		$("#header").addClass("on");

	}

	function _close(){
		btn.removeClass("current");
		obj.children().find("a").removeClass("on");
		obj.children().find("ul").removeClass("on");
		wrap.stop(true,false).animate({"height":old_h},dur,meth,function(){ obj.hide(); });
		$("#gnb").removeClass("on");
		$("#header").removeClass("on");
	}

	// �뚮툝由� �곗튂 �⑤뱾留�
	btn.bind("touchstart click",function(event){
		elem = $(this).parent().index();
		_open();
		//event.preventDefault();
		event.stopPropagation();
		//return false;
	});
	
	btn.bind("click",function(e){
		if (Modernizr.touch) {
			e.preventDefault();
			e.stopPropagation();
		}
	});

	btn.bind("mouseenter focusin",function(event){
		elem = $(this).parent().index();
		_open();
		event.stopPropagation();
	});

	param.bind("mouseleave",function(){
		_close();
	});

	obj.last().find(">li>a").last().bind("focusout",function(){
		_close();
	});
	
	obj.children().find("ul>li>a:last").bind("focusout",function(){
		$(this).parents("ul").removeClass("on");
	});	

	obj.children().bind("mouseenter",function(event){
		obj.children().find("a").removeClass("on");
		obj.children().find("ul").removeClass("on");
		$(this).children().addClass("on");
		event.stopPropagation();
	}).find("a").bind("focusin",function(event){
		obj.children().find("a").removeClass("on");
		$(this).next("ul").addClass("on");			
		$(this).parents("ul").prev().addClass("on");
		event.stopPropagation();
	});
	
	/*var wid = $("#header .al_box").width() - 210;
	obj.width(wid);
	
	$(window).resize(function(){
		var wid = $("#header .al_box").width() - 210;
		obj.width(wid);
	});*/

	$("#header #gnb #tm li.th1 ul.th2").on("mouseenter focusin",function(event){
        $("#header #gnb #tm>li>a").removeClass("current");
	var idx = $(this).parent().index();
			$("#header #gnb #tm>li").eq(idx).find(">a").addClass("current");
	});
}	