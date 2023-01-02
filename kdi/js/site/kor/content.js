/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	메뉴 좁게 넓게

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	allmenu_btn_AC();
});

function allmenu_btn_AC(){
	var obj = $('#header');
	var btn = $('#header .allmenu_btn');

	obj.removeClass("hide");
	btn.click(function(){
		if(obj.hasClass("hide")){
            obj.removeClass("hide");
        }else if(!obj.hasClass("hide")){
            obj.addClass("hide");
        }
        return false;
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	주제별 통계 탭

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("[data-item ='3']").size() != 0){
		main_tabs_js();		
	}
});

function main_tabs_js(){
	var obj = $("[data-item ='3'] .in");
		obj.tab = obj.find(">.tab_btn ul li a");
		obj.cont = obj.find(" .tab_cont");
	obj.tab.click(function(){
		var idx = $(this).parent().index();
		obj.tab.removeClass("on"). find(">strong").contents().unwrap().wrap('<span></span>');
		$(this).addClass("on"). find(">span").contents().unwrap().wrap('<strong></strong>');
		obj.cont.removeClass("on");
		obj.cont.eq(idx).addClass("on");
		return false;	
	});	 
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	셀랙트 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("[data-skin='select']").size() != 0){
		selectbox_AC();		
	}
});

function selectbox_AC (){
	var obj = $("[data-skin='select']"); 

	obj.each(function() {
		var t = $(this);
			t.btn = t.find(">a"); 
			t.ul = t.find(">div"); 
			t.ul.li = t.ul.find("ul>li"); 
		
			
	    
		t.btn.on("click",function() {
			if(t.ul.is(":animated")) return false;
			
			$(this).toggleClass("on").siblings("div").slideToggle(300);
			return false;
		});
	    
	    t.ul.li.find(">a").on("click",function() {
	        $(this).parent().siblings().find(">a.on").removeClass("on");
	        $(this).addClass("on");
	        t.btn.html($(this).find(">span").clone());
	        t.find(">input").attr("value",t.btn.text());
	        t.find(">div").slideUp(300);
	    });
		
	    
	    
		t.ul.on("mouseleave",function() {
			$(this).parent().find(">a").removeAttr("class");
			$(this).parent().find(">div").slideUp(300);
			return false;
		});
		
		/*t.ul.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeAttr("class");
			$(this).parent().parent().slideUp(300);
			return false;
		});	*/	
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	[data-content='2'] tab js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("[data-content='2']").size() != 0){
		tabs_js();		
	}
});


function tabs_js(){
	var obj = $("[data-content='2'] .tab_btn");
		obj.tab = obj.find(">ul>li>a");
		obj.cont = obj.siblings(".tab_cont");
	obj.tab.click(function(){
		var idx = $(this).parent().index();
        $(this).parent().parent().find(">li>a.on").removeClass("on");
        $(this).addClass("on");
        $(this).parent().parent().parent().parent().find(".tab_cont").removeClass("on").eq(idx).addClass("on");
		return false;	
	});	 
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	[data-content='2'] js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("[data-content='2'] ").size() != 0){
		accor_AC(); //나라별,소득수준 아코디언
        tooltip_AC(); //툴팁
        cal_scroll_AC(); //캘린더 선택
        org_btn_AC(); // 원본데이터, 한국과의 비교 버튼 선택
	}
    if($(".board_search .cal").size() != 0){
        cal_scroll_AC2();
    }
});

function accor_AC(){
	var obj = $("[data-content='2'] .tab_cont>ul");
		obj.question = obj.find(".tit");
		obj.answer = obj.find(".inners");

	//초기값
	/*obj.find("li:eq(0) .tit").addClass("on");
	obj.find("li:eq(0) .inners").css("display","block");*/
		
	setTimeout(function(){
		if(obj.answer.find("input:checked")){
	        var che= obj.answer.find("input:checked");
	        che.parents(".inners").css("display","block");
	        che.parents(".inners").parent().find(".tit").addClass("on");
	        if(che.parents(".inners").find(">div").hasClass("mCustomScrollbar")){
                che.parents(".inners").find(">div.mCustomScrollbar .mCSB_container").css("top","-"+che.parent().position().top+"px");
            }
	    }
	},500);
	
	obj.question.click(function(){
		var boxs = $(this).siblings(".inners");

		if(boxs.is(":hidden")){
			obj.answer.not(":hidden").siblings(".tit").removeClass("on");
			obj.answer.not(":hidden").slideUp(300);
			boxs.siblings(".tit").addClass("on");
			boxs.slideDown(300);
		} else {
			obj.question.removeClass("on");
			boxs.slideUp(300);
		}
		return false;
	});
}

function tooltip_AC(){
    var obj = $("[data-content='2']>.h>.tt");
        obj.a = obj.find(">a");
    
    obj.a.click(function(){
        if(obj.hasClass("on")){
            obj.removeClass("on");
        }else if(!obj.hasClass("on")){
            obj.addClass("on");
        }
        return false;
    });
    
}

function org_btn_AC(){
    var obj = $("[data-content='2']>.b>.l_box>.btn_box>.org");
        obj.a = obj.find(">a");
    
    obj.a.eq(0).addClass("on");
    obj.a.click(function(){
        if(obj.a.hasClass("on")){
            obj.a.removeClass("on");
            $(this).addClass("on");
        }else if(!obj.a.hasClass("on")){
            $(this).addClass("on");
        }
        return false;
    });
    
}

function cal_scroll_AC(){
    var obj = $("[data-content='2']>.b>.l_box>.btn_box>div>.cal");
        obj.a = obj.find(">.in>a");
        obj.box = obj.find(">.wraps");
    
    obj.a.click(function(){
        obj.addClass("on");
        return false;
    });
    
    $(document).on("click",function(event){
        if($(event.target).parents(".wraps").length === 0){
            obj.removeClass("on");
        }
    });
    
	obj.each(function() {
		var t = $(this);
			t.btn = t.find(">.in>a"); 
			t.ul = t.find(">.wraps ul"); 
            t.sc = t.find(">.wraps .mCustomScrollbar");
			t.ul.li = t.ul.find(">li");
            t.in = t.btn.find(" input[type='text']"); 
        
        t.ul.li.find(">a").on("click",function() {
            var idx = t.sc.index($(this).parents(".mCustomScrollbar"));
            obj.find("ul li>a.on").removeClass("on");
            $(this).addClass("on");
            t.btn.eq(idx).find("input").val(t.ul.eq(idx).find(">li>a.on").text());
            
            if($.trim(t.in.eq(0).val()) !== "" && $.trim(t.in.eq(1).val()) !== ""){
                obj.removeClass("on");
            }
        });
	});
    
}

function cal_scroll_AC2(){
    var obj = $(".board_search .views .cal");
        obj.a = obj.find(">.in>a");
        obj.box = obj.find(">.wraps");
    
    obj.a.click(function(){
        obj.addClass("on");
        return false;
    });
    
    $(document).on("click",function(event){
        if($(event.target).parents(".wraps").length === 0){
            obj.removeClass("on");
        }
    });
    
	obj.each(function() {
		var t = $(this);
			t.btn = t.find(">.in>a"); 
			t.ul = t.find(">.wraps ul"); 
            t.sc = t.find(">.wraps .mCustomScrollbar");
			t.ul.li = t.ul.find(">li");
            t.in = t.btn.find(" input[type='text']"); 
        
        t.ul.li.find(">a").on("click",function() {
            var idx = t.sc.index($(this).parents(".mCustomScrollbar"));
            obj.find("ul li>a.on").removeClass("on");
            $(this).addClass("on");
            t.btn.eq(idx).find("input").val(t.ul.eq(idx).find(">li>a.on").text());
            
            if($.trim(t.in.eq(0).val()) !== "" && $.trim(t.in.eq(1).val()) !== ""){
                obj.removeClass("on");
            }
        });
	});
    
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	LEFT MENU Function
	작성자 : publishers
	
	ex)
	var Lmenu_code = "0101";//메뉴코드
	Lmenu_setting(Lmenu_code);//실행	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

function Lmenu_setting(code){
	var str = new Array();
	str[0] = code.substr("2","2");
	str[1] = code.substr("4","2");
    var Lmenu = $("#remote > .js_menu > ul");    
		    Lmenu.autoMenu = "";	
		    Lmenu.autoMenuSpeed = 1000;
		    Lmenu.clickCheck = "Y";
		    Lmenu.li = Lmenu.find(">li");
		    Lmenu.li.cnt = Lmenu.li.size();
		    Lmenu.li.a = Lmenu.li.find(">a");
		    Lmenu.li.a.minheight = 0;
		    Lmenu.li.ul = Lmenu.li.find(">div>ul");
			Lmenu.li.ul.li = Lmenu.li.ul.find(">li");
			Lmenu.li.ul.li.a = Lmenu.li.ul.li.find(">a");
			Lmenu.li.ul.li.ul = Lmenu.li.ul.li.find(">ul");//3차
			Lmenu.li.ul.li.ul.li = Lmenu.li.ul.li.ul.find(">li");
			Lmenu.li.ul.li.ul.li.a = Lmenu.li.ul.li.ul.li.find(">a");

			/*Lmenu.li.ul.each(function(){
				if($(this).size() != 0){
					$(this).siblings("a").find(" span").append("<em class='ico'></em>");
				}
			});*/
	
	var deps_ch1 = null;
	var deps_ch2 = null;
	var deps_ch3 = null;
	if(Lmenu.li.eq(0).attr("class")){
		if(Lmenu.li.eq(0).attr("class").indexOf("sitemap") != -1){
			for(var i=0; i<Lmenu.li.size(); i++){
				if(Lmenu.li.eq(i).hasClass("sitemap_"+str[0])){			
					deps_ch1 = i+1;			
				}
			}
		} else {
			for(var i=0; i<Lmenu.li.size(); i++){//.hasClass("sub"+str[0]+"_00")
				if(Lmenu.li.eq(i).hasClass("sub"+code.substr("0","2")+"_"+str[0])){			
					deps_ch1 = i+1;			

					if(Lmenu.li.eq(i).find(">div>ul").size() != 0){
						var obj2 = Lmenu.li.eq(i).find(">div>ul>li");			
						for(var r=0; r<obj2.size(); r++){
							if(obj2.eq(r).hasClass("sub"+code.substr("0","2")+"_"+str[0]+"_"+str[1])){				
								deps_ch2 = r+1;

								if(obj2.eq(r).find(">div>ul").size() != 0){
									var obj3 = obj2.eq(r).find(">div>ul>li");
									for(var t=0; t<obj3.size(); t++){
										if(obj3.eq(t).hasClass("sub"+code.substr("0","2")+"_"+str[0]+"_"+str[1]+"_"+str[2])){
											deps_ch3 = t+1;
										}
									}
								} else {
									deps_ch3 = null;
								}
							}
						}
					} else {
						deps_ch3 = null;
					}
				}
			}
		}

		str[0] = deps_ch1;
		str[1] = deps_ch2;
		str[2] = deps_ch3;
	}

	for(var i=0; i<Lmenu.find(" li").size(); i++){
		if(Lmenu.find(" li").eq(i).find(">div>ul").size() != 0){
			Lmenu.find(" li").eq(i).find(">a").addClass("child");
			Lmenu.addClass("child");
		}
	}

	Lmenu.find(" li").removeAttr("class");
	
	if(str[0] || str[0] == "0") Lmenu.code1 = str[0]-1;
	else Lmenu.code1 = null;
    if(str[1] || str[1] == "0") Lmenu.code2 = str[1]-1;
	else Lmenu.code2 = null;
	if(str[2] || str[2] == "0") Lmenu.code3 = str[2]-1;
	else Lmenu.code3 = null;
	
//console.log(Lmenu.code1+"//"+Lmenu.code2+"//"+Lmenu.code3);
	
	//초기화
	Lmenu.li.find("div").not(":hidden").hide();
	Lmenu_def(Lmenu);
	
	//click시
	Lmenu.li.a.click(function(){		
		Lmenu.idx_01 = Lmenu.li.index($(this).parent());
		
		if(!$(this).hasClass("ov")){		
			Lmenu_open(Lmenu);
		}
		
		/*if($(this).parent().find(">ul").size() != 0) return false;
		else return true;*/
		
	});
	
	//영역이탈시 초기화
	Lmenu.mouseleave(function(){
		if(Lmenu.idx_01 == Lmenu.code1) return false;
		Lmenu.setTime = setTimeout(function(){
			Lmenu_def(Lmenu);
		},1000);
	});
	
	//영역 복귀
	Lmenu.mouseenter(function(){
		clearTimeout(Lmenu.setTime);
	});
	
}
function Lmenu_open(Lmenu){
	Lmenu.li.ul.li.find(" div").not(":hidden").hide();
	Lmenu.li.find(">div").not(":hidden").slideUp(0);	
	Lmenu.find(" a.ov").removeClass("ov");
	
	//1deps
	var deps_01 = Lmenu.li.eq(Lmenu.idx_01);	
	deps_01.find(">a").addClass("ov");
    deps_01.find(">div>ul>li:eq(0)>a").addClass("ov");
	
	if(deps_01.find(">div").size() != 0){
		deps_01.find(">div").slideDown(0);
	}
}
function Lmenu_def(Lmenu){
	Lmenu.li.ul.li.find(" div").not(":hidden").hide();
	Lmenu.li.find(">div").not(":hidden").slideUp(0);
	Lmenu.find(" a.ov").removeClass("ov");
	
	//1deps
	var deps_01 = Lmenu.li.eq(Lmenu.code1);	
	deps_01.find(">a").addClass("ov");
	
	//2deps
	if(Lmenu.code2 != -1 && Lmenu.code2 != null){
		var deps_02 = deps_01.find(">div>ul>li").eq(Lmenu.code2);		
		deps_02.find(">a").addClass("ov");
		deps_01.find("div").slideDown(0,function(){
			if(Lmenu.code3 != -1 && Lmenu.code3 != null){
				var deps_03 = deps_02.find(">div>ul>li").eq(Lmenu.code3);		
				deps_03.find(">a").addClass("ov");
				deps_02.find(">div").slideDown(0);
			}
		});
	}
	Lmenu.idx_01 = Lmenu.code1;
	Lmenu.idx_02 = Lmenu.code2;
	Lmenu.idx_03 = Lmenu.code3;
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	lnb 슬라이드

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#remote #lnb >ul>li>a.ov+div>ul").size() != 0){
		setTimeout(function(){
			lnb_ul_check_AC();		
		},10);
	}
});

	
	
	function lnb_ul_check_AC(){
        if($('#remote #lnb >ul>li>a.ov+div>ul').width()> $("#remote #lnb >ul").width()){
            $('<div class="control">\
                <a href="#" class="btn_left"><span>이전</span></a>\
                <a href="#" class="btn_right"><span>다음</span></a>\
            </div>').appendTo($('#remote #lnb >ul>li>a.ov+div'));
        }
        
		var obj = $('#remote #lnb >ul>li>a.ov');
	        obj.box = obj.siblings("div");
	        obj.ul = obj.box.find(">ul");
			obj.btn_prev = obj.box.find(">.control>.btn_left");
	        obj.btn_next = obj.box.find(">.control>.btn_right");
	        obj.val_w = 0;
	
		
		function _move(str){
			if(str == "next"){
                obj.box.removeClass("first");
                if(((obj.val_w + (1496 * -1)) * 2) < (obj.box.innerWidth()*-1)){
                    obj.val_w = (obj.ul.innerWidth()*-1) + obj.box.innerWidth() - 100;
                    obj.box.addClass("last");
                } else {
                    obj.val_w = obj.val_w + (1496 * -1);    
                }
	        } else {
                obj.box.removeClass("last");
                if((obj.val_w - (1496 * -1)) > 0){
                    obj.val_w = 0;
                    obj.box.addClass("first");
                } else {
	                obj.val_w = obj.val_w - (1496 * -1);
                }
	        }
            
			obj.ul.animate({"left":obj.val_w+"px"},300,function(){
	        });
	    }
        
		obj.btn_prev.on("click",function(){
			_move("prev");
			return false;
	    });
	    obj.btn_next.on("click",function(){
			_move("next");
			return false;
		});
        
        //초기 위치 선택
        function _leftCheck(){
            //재귀함수
            var a = 1496;
            var b = Number(bx.position().left) + Number(bx.innerWidth());
            if(a<b){
                _move("next");
                setTimeout(function(){
                    _leftCheck();
                },300);
            } else {
                return false;
            }
        }
        var bx = obj.ul.find(">li>a.ov").parent();
            bx.x = Number(bx.position().left) + Number(bx.innerWidth());
        if(1496 < bx.x){
            _leftCheck();
        }
        
		if (arguments != null && arguments[0] == "next") _move("next");
		else if (arguments != null && arguments[0] == "prev") obj.ul.css("left","0px");
	}

