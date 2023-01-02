/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Top Menu Function
	
	ex)
	var Tmenu_code = "0101";//메뉴코드
	Tmenu_setting(Tmenu_code);//실행	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function Tmenu_setting(str){
	var params = str;
	var code = new Array();
		
	code[0] = parseInt(params.substr(0,2)) -1; //eq(n) n번지수 찾기
	code[1] = parseInt(params.substr(2,2)) -1; //eq(n) n번지수 찾기
	code[2] = parseInt(params.substr(4,2)) -1; //eq(n) n번지수 찾기	
	
	//PC	  
	var gnb_obj = $("#nav > #gnb > ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li"); 
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
		gnb_obj.h = $("#header #nav"); 
		gnb_obj.blind = $("#nav > #blind"); 
	
		//default
	setTimeout(function(){
		gnb_def();
	},100);
	
	gnb_obj.mouseenter(function(){
		clearTimeout(gnb_obj.intervals);
	});	
	
	gnb_obj.mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
		
	gnb_obj.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent());
		gnb_open(idx);
	});
	
	gnb_obj.li.ul.mouseenter(function(){
		var idx = $(this).parent().index();
		
		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).siblings("a").addClass("on");
		gnb_obj.li.ul.not($(this)).removeClass("on");
		$(this).addClass("on");
	});
	
	gnb_obj.li.ul.li.a.on("mouseover focus",function(){
		var idx = $(this).parent().parent().parent().index();

		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).parent().parent().siblings("a").addClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		$(this).parent().parent().addClass("on");
	});	
	
	gnb_obj.li.ul.li.last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
	
	function gnb_def(){
		$("#header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},300);
		gnb_obj.blind.stop().animate({"height":0+"px"},300);
		
		
		if(code[0] > -1){
			var obj = gnb_obj.li.eq(code[0]);
			obj.find(">a").addClass("on");
			
			if(code[1] > -1){
				obj = obj.find(">ul>li").eq(code[1]);
				obj.find(">a").addClass("on");
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.find(">a").addClass("on");

				}
			}
			
		}
	}
	
	function gnb_open(idx){
		$("#header").addClass("on");	
		gnb_obj.li.find(">a.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");	
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">ul").addClass("on");
		gnb_obj.maxH = 0;
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		gnb_obj.li.ul.innerHeight(gnb_obj.maxH -2).show().stop().animate({"opacity":1},300);
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH + gnb_obj.li.a.innerHeight())+"px"},300);
		gnb_obj.blind.stop().animate({"height":gnb_obj.maxH+"px"},300);
	}
	
	
	//slide_map
	$('<div id="slide_map" tabindex="0"><div class="inner"><div class="binds"></div></div></div>').prependTo($("#wrap"));
	gnb_obj.clone(false).appendTo($("#slide_map >.inner > .binds"));
	
	//Mobile Menu	
	var mob_gnb_obj = $("#slide_map"); 
		mob_gnb_obj.box = mob_gnb_obj.find(">.inner"); 
		mob_gnb_obj.box.gnb = mob_gnb_obj.box.find(">.binds"); 
		mob_gnb_obj.box.gnb.ul = mob_gnb_obj.box.gnb.find(">ul");
		mob_gnb_obj.box.gnb.ul.li = mob_gnb_obj.box.gnb.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.a = mob_gnb_obj.box.gnb.ul.li.find(">a");
		mob_gnb_obj.box.gnb.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.find(">ul");
		mob_gnb_obj.box.gnb.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">a");
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.a.each(function(){
		var i = $(this);
		
		if(i.siblings("ul").size() != 0){
			i.addClass("arrow");	
		}	
	});
	
	
	mob_def();
	// $(window).resize(function(){
	// 	mob_def();	
	// });	
	function mob_def(){
		mob_gnb_obj.box.find("a").removeClass("on");

		if(code[0] > -1){
			var obj = mob_gnb_obj.box.gnb.ul.li.eq(code[0]);
			obj.find(">a").addClass("on");
			obj.find(">a").siblings("ul").show();
			if(code[1] > -1){
				obj = obj.find(">ul>li").eq(code[1]);
				obj.find(">a").addClass("on");
				obj.find(">a").siblings("ul").show();
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.find(">a").addClass("on");
					obj.find(">a").siblings("ul").show();

				}
			}
			
		}
	}
	
	mob_gnb_obj.box.gnb.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
			$(this).toggleClass("on").siblings("ul").slideToggle();
			return false;	
		} else {
			return true;	
		}
	});
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			return false;	
		} else {
			return true;	
		}
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$('<div class="side_link"></div>').prependTo($("#slide_map >.inner > .binds"));
	$("#header .toputil_control > div.q_link").clone(false).prependTo($("#slide_map >.inner > .binds >.side_link"));
	
		
	$(".allmenu_btn_open").click(function() {	
		
		if(!$("#slide_map").is(":hidden") && $("body").hasClass("mobile")){
				$("body").addClass("fixed");
				$(this).toggleClass("on");
				if($(this).hasClass("on")){
					$(this).html("<span>전체메뉴닫기</span>");
				} else {
					$(this).html("<span>전체메뉴열기</span>");	
					$("body").removeClass("fixed");		
				}
				return false;
			} else {
				$(this).removeClass("on");
				return true;
			}
	});
	
	$(window).resize(function() {
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").css({"margin-right":0});
		}
	});
});	


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
		    Lmenu.li.ul = Lmenu.li.find(">ul");
			Lmenu.li.ul.li = Lmenu.li.ul.find(">li");
			Lmenu.li.ul.li.a = Lmenu.li.ul.li.find(">a");
			Lmenu.li.ul.li.ul = Lmenu.li.ul.li.find(">ul");//3차
			Lmenu.li.ul.li.ul.li = Lmenu.li.ul.li.ul.find(">li");
			Lmenu.li.ul.li.ul.li.a = Lmenu.li.ul.li.ul.li.find(">a");

			Lmenu.li.ul.each(function(){
				if($(this).size() != 0){
					$(this).siblings("a").find(" span").append("<em class='ico'></em>");
				}
			});
	
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

					if(Lmenu.li.eq(i).find(">ul").size() != 0){
						var obj2 = Lmenu.li.eq(i).find(">ul>li");			
						for(var r=0; r<obj2.size(); r++){
							if(obj2.eq(r).hasClass("sub"+code.substr("0","2")+"_"+str[0]+"_"+str[1])){				
								deps_ch2 = r+1;

								if(obj2.eq(r).find(">ul").size() != 0){
									var obj3 = obj2.eq(r).find(">ul>li");
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
		if(Lmenu.find(" li").eq(i).find(">ul").size() != 0){
			Lmenu.find(" li").eq(i).find(">a").addClass("child");
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
	Lmenu.li.find(" ul").not(":hidden").hide();
	Lmenu_def(Lmenu);
	
	//click시
	Lmenu.li.a.click(function(){		
		Lmenu.idx_01 = Lmenu.li.index($(this).parent());
		
		if(!$(this).hasClass("ov")){		
			Lmenu_open(Lmenu);
		}
		
		if($(this).parent().find(">ul").size() != 0) return false;
		else return true;
		
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
	Lmenu.li.ul.li.find(" ul").not(":hidden").hide();
	Lmenu.li.find(">ul").not(":hidden").slideUp(300);	
	Lmenu.find(" a.ov").removeClass("ov");
	
	//1deps
	var deps_01 = Lmenu.li.eq(Lmenu.idx_01);	
	deps_01.find(">a").addClass("ov");
	
	if(deps_01.find(">ul").size() != 0){
		deps_01.find(">ul").slideDown(300);
	}
}
function Lmenu_def(Lmenu){
	Lmenu.li.ul.li.find(" ul").not(":hidden").hide();
	Lmenu.li.find(">ul").not(":hidden").slideUp(300);
	Lmenu.find(" a.ov").removeClass("ov");
	
	//1deps
	var deps_01 = Lmenu.li.eq(Lmenu.code1);	
	deps_01.find(">a").addClass("ov");
	
	//2deps
	if(Lmenu.code2 != -1 && Lmenu.code2 != null){
		var deps_02 = deps_01.find(">ul>li").eq(Lmenu.code2);		
		deps_02.find(">a").addClass("ov");
		deps_01.find(">ul").slideDown(300,function(){
			if(Lmenu.code3 != -1 && Lmenu.code3 != null){
				var deps_03 = deps_02.find(">ul>li").eq(Lmenu.code3);		
				deps_03.find(">a").addClass("ov");
				deps_02.find(">ul").slideDown(300);
			}
		});
	}
	Lmenu.idx_01 = Lmenu.code1;
	Lmenu.idx_02 = Lmenu.code2;
	Lmenu.idx_03 = Lmenu.code3;
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	메인 체험장 프로그램 안내 탭

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#sec4 .w").size() != 0){
		main_tabs_js();		
	}
});

function main_tabs_js(){
	var obj = $("#sec4 .w");
		obj.tab = obj.find(">.tab_btn ul li a");
		obj.cont = obj.find(" .tab_cont");
    $("#sec4").attr("data-bg","1");
	obj.tab.click(function(){
		var idx = $(this).parent().index();
		obj.tab.removeClass("on"). find(">strong").contents().unwrap().wrap('<span></span>');
		$(this).addClass("on"). find(">span").contents().unwrap().wrap('<strong></strong>');
		obj.cont.removeClass("on");
		obj.cont.eq(idx).addClass("on");
        $("#sec4").attr("data-bg",idx+1);
		return false;	
	});	 
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	메인 체험장 체험갤러리 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#sec5 .news").size() != 0){
            dataSlide_AC();	
        /*var timer = null;
        $(window).on('resize', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                dataSlide_AC();	
            }, 300);
        });*/

       /* window.onresize = function(){
      document.location.reload();
    };*/
        
	}
});

    function dataSlide_AC(){
        
        
        function _setting(str){
            var scrWidth = 1000; //변경점
            var gap = 0;//여백

            var obj = str;
                obj.li = str.find(" .move > ul > li");
                obj.btn_left = str.find(" .btn_left");
                obj.btn_right = str.find(" .btn_right");
                obj.x = 0;
                obj.maxCnt = 0;
                obj.speeds = 300;
                obj.ty = "";
                obj.resizeTime = "";
            var w = obj.li.eq(i).innerWidth();
            var mr = gap;
                w = w + mr;
            
            
            function _type(callback){
                obj.ty = "center";
                if(callback != undefined) callback();
            }
            _type();

            function _position(ty,arrow){
                var count = 1;
                var speed = 0;
                
                function _etc(str){
                    setTimeout(function(){
                        var _this = $(str);
                        var check_l = _this.position().left;
                        var move_left = (obj.find(" .move > ul > li[data-cnt='"+obj.maxCnt+"']").position().left + (w*count));
                        
                        if(check_l <= (w*-1)+5){
                            _this.css({"left":move_left+"px"});    
                        }
                        count++;
                    },10);
                }

                obj.li.css({"position":"absolute","top":"0"});
                if(arrow == "left" && obj.ty != "center"){
                    var lastBox = obj.find(" .move > ul > li[data-cnt='0']");
                    lastBox.css({"left":(w*-1)+"px"});
                }

                for(var i=0; i<obj.li.size(); i++){
                    var l = (w * (obj.li.eq(i).attr("data-cnt")*1));
                    if(ty == "center") l = l + ((w - mr) / 2);
                    if(obj.attr("data-load") != undefined){
                        if(arrow == "right"){
                            l = obj.li.eq(i).position().left - w;
                        } else {
                            l = obj.li.eq(i).position().left + w;
                        }
                        speed = obj.speeds;
                    }
                    var saveCnt = i;
                    obj.li.eq(i).animate({
                        "left":l+"px"
                    },speed,function(){
                        _etc(this);

                        if(saveCnt==obj.li.size()-1){
                            if(obj.ty == "center"){
                                var indexs = obj.li.index(obj.find(" .move > ul > li[data-cnt='0']"));
                                indexs--;
                                if(indexs < 0) indexs = obj.li.size() - 1;
                                
                                var movePoint = ((obj.innerWidth() / 2) - ((w - mr) / 2) - w) * -1;
                                obj.li.eq(indexs).css({"left":movePoint+"px"});
                                
                            }
                        }
                    });
                }

                obj.attr("data-load","y");
            }

            function _count(num,arrow){
                var arrow = arrow || "";
                var cnt = 0;
                var cnts = 0;
                for(var i=num; i<(num + obj.li.size()); i++){
                    if(i < obj.li.size()){
                        obj.li.eq(i).attr("data-cnt",cnt);
                        obj.maxCnt = cnt;
                    } else {
                        obj.li.eq(cnts).attr("data-cnt",(cnt - obj.li.size()));
                        cnts++;
                    }
                    
                    cnt++;
                }
                _position(obj.ty,arrow);
            }
            _count(obj.x);

            $(window).resize(function(){
                clearTimeout(obj.resizeTime);
                obj.resizeTime = setTimeout(function(){
                	if(!obj.is(":hidden")){
	                    _type(function(){
	                        obj.removeAttr("data-load");
	                        obj.li.removeAttr("style");
	                        _position(obj.ty);
	                    });
                	}
                },500);
            });

            obj.btn_right.click(function(){
                obj.x++;
                if(obj.x > obj.li.size()-1) obj.x = 0;
                _count(obj.x,"right");
                return false;
            });

            obj.btn_left.click(function(){
                obj.x--;
                if(obj.x < 0) obj.x = obj.li.size()-1;
                _count(obj.x,"left");
                return false;
            });
            
            var mouseCheck = false;
            var mouseX = 0;
            var mouseX2 = 0;
            obj.on("mousedown touchstart",function(event){
                mouseX = event.pageX;
            });

            obj.on("mousemove touchmove",function(event){
                mouseCheck = true;
            });
            obj.on("mouseup touchend",function(){
                if(mouseCheck){
                    mouseCheck = false;
                    mouseX2 = event.pageX;
                    var mouseTotal = mouseX2 - mouseX;
                    if(mouseTotal > 50 || mouseTotal < -50){        
                        if(mouseTotal > 0){
                            //console.log("right");        
                            obj.btn_left.click();
                        } else {
                            //console.log("left");
                            obj.btn_right.click();
                        }
                    }
                }
            });

        }
        if($("[data-slide]").size() != 0){
            for(var i=0; i<$("[data-slide]").size(); i++){
                _setting($("[data-slide]").eq(i));
            }
            
        }
    }





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	레이아웃 배너모음 JS

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function tickerRotation() {
	// options
	var scrollType = 'vertical'; // 'horizontal', 'vertical', 'none';

	// private
	var currentNumber = 0;
	var objWrap = null;
	var objContentBox = null;
	var objWrapLIs = null;
	var cellWidth = 0;
	var cellHeight = 0;
	this.GoodsSetTime = null;

	// scroll animation variables.
	var scroll = {time:1, start:0, change:0, duration:25, timer:null};
	var originaltime = scroll.time;

	this.setScrollType = function (type) {
		switch (type) {
			case 'vertical':
			case 'horizontal':
			case 'none':
				scrollType = type;
				break;
			default:
				alert('!');
				break;
		}
	}
	// constructor
	this.initialize = function () {
		objWrap = document.getElementById(this.wrapId);
		objContentBox = document.getElementById(this.listId);
		objWrapLIs = objWrap.getElementsByTagName('li');
		cellWidth = objWrapLIs[0].offsetWidth;
		cellHeight= objWrapLIs[0].offsetHeight;

		objWrap.style.overflow = 'hidden'; //

		switch (scrollType) {
			case 'vertical':
				this.objWrapSize = cellHeight * this.listNum;
				this.objSize = objWrapLIs.length * cellHeight;
				break;
			case 'none':
				this.objWrapSize = cellWidth * this.listNum;
				this.objSize = objWrapLIs.length * cellWidth;
				break;
			default:
				this.objWrapSize = cellWidth * this.listNum;
				this.objSize = objWrapLIs.length * cellWidth;
				break;
		}
		if (this.objWrapSize < this.objSize) {

			if (objWrapLIs.length > 0) {
				switch (scrollType) {
					case 'vertical':
						objContentBox.style.height = objWrapLIs.length * cellHeight + 'px';
						objWrap.style.height = this.listNum * cellHeight + 'px';
						break;
					case 'none':
						objContentBox.style.width = objWrapLIs.length * cellWidth + 'px';
						objWrap.style.width = this.listNum * cellWidth + 'px';
						break;
					default:
						objContentBox.style.width = objWrapLIs.length * cellWidth + 'px';
						objWrap.style.width = this.listNum * cellWidth + 'px';
						break;
				}
			}
			/*
			if (this.btnPrev)
				document.getElementById(this.btnPrev).href = this.objName + ".prev();";
			if (this.btnNext)
				document.getElementById(this.btnNext).href = this.objName + ".next();";
			if (this.btnStop)
				document.getElementById(this.btnStop).href = this.objName + ".stop();";
			*/

			if (this.autoScroll == 'none') {
			} else {
				if (this.scrollDirection == 'direction') {
					this.GoodsSetTime = setInterval(this.objName + ".next()", this.scrollGap);
				} else {
					this.GoodsSetTime = setInterval(this.objName + ".prev()", this.scrollGap);
				}
			}
		}
	}

	this.next = function () {
		if (currentNumber == 0) {
			var objLastNode = objContentBox.removeChild(objContentBox.getElementsByTagName('li').item(objWrapLIs.length - 1));
			objContentBox.insertBefore(objLastNode, objContentBox.getElementsByTagName('li').item(0));
			switch (scrollType) {
				case 'vertical':
					objWrap.scrollTop += cellHeight;
					break;
				case 'none':
					objWrap.scrollLeft += cellWidth;
					break;
				default:
					objWrap.scrollLeft += cellWidth;
					break;
			}
			currentNumber++;
		}

		//objWrap.scrollLeft -= cellWidth;
		var position = getActionPoint('indirect');
		startScroll(position.start, position.end);

		currentNumber = currentNumber - 1;

		if (currentNumber > 0)
			currentNumber = 0;
		if (this.autoScroll == 'none') {
			// do nothing.
		} else {
			this.scrollDirection = 'direction';
			clearInterval(this.GoodsSetTime);
			this.GoodsSetTime = setInterval(this.objName + ".next()", this.scrollGap);
		}
	}

	this.prev = function () {
		if (currentNumber == objWrapLIs.length - 1) {
			var objLastNode = objContentBox.removeChild(objContentBox.getElementsByTagName('li').item(0));
			objContentBox.appendChild(objLastNode);
			switch (scrollType) {
				case 'vertical':
					objWrap.scrollTop -= cellHeight;
					break;
				case 'none':
					objWrap.scrollLeft -= cellWidth;
					break;
				default:
					objWrap.scrollLeft -= cellWidth;


					break;
			}
			currentNumber--;
		}

		//objWrap.scrollLeft += cellWidth;
		var position = getActionPoint('direct');
		startScroll(position.start, position.end);

		currentNumber = currentNumber + 1;

		if (currentNumber < objWrapLIs.length - 1)
			currentNumber = objWrapLIs.length - 1;
	
		if (this.autoScroll == 'none') {
			// do nothing.
		} else {
			this.scrollDirection = 'indirection';
			clearInterval(this.GoodsSetTime);
			this.GoodsSetTime = setInterval(this.objName + ".prev()", this.scrollGap);
		}
	}

	this.stop = function () {
		clearInterval(this.GoodsSetTime);
	}

	var startScroll = function (start, end) {
		if (scroll.timer != null) {
			clearInterval(scroll.timer);
			scroll.timer = null;
		}

		scroll.start = start;
		scroll.change = end - start;

		switch (scrollType) {
			case 'vertical':
				scroll.timer = setInterval(scrollVertical, 15);
				break;
			case 'none':
				objWrap.scrollLeft = end;
				break;
			default:
				scroll.timer = setInterval(scrollHorizontal, 15);
				break;
		}
	}

	var scrollVertical = function () {
		if (scroll.time > scroll.duration) {
			clearInterval(scroll.timer);
			scroll.time = originaltime;
			scroll.timer = null;
		} else {
			objWrap.scrollTop = sineInOut(scroll.time, scroll.start, scroll.change, scroll.duration);
			scroll.time++;
		}
	}

	var scrollHorizontal = function () {
		if (scroll.time > scroll.duration) {
			clearInterval(scroll.timer);
			scroll.time = originaltime;
			scroll.timer = null;
		} else {
			objWrap.scrollLeft = sineInOut(scroll.time, scroll.start, scroll.change, scroll.duration);
			scroll.time++;
		}
	}

	var getActionPoint = function (dir) {
		if (dir == 'direct') {
			var position = findElementPos(objWrap.getElementsByTagName('li').item(currentNumber + 1)); // target image.
			var offsetPos = findElementPos(objWrap.getElementsByTagName('li').item(currentNumber)); // first image.
		} else {
			var position = findElementPos(objWrap.getElementsByTagName('li').item(currentNumber - 1)); // target image.
			var offsetPos = findElementPos(objWrap.getElementsByTagName('li').item(currentNumber)); // first image.
		}

		switch (scrollType) {
			case 'vertical':
				var start = objWrap.scrollTop;
				var end = position[1] - offsetPos[1];
				break;
			case 'none':
				// do nothing.
				break;
			default:
				var start =  objWrap.scrollLeft;
				var end = position[0] - offsetPos[0];
				break;
		}

		var position = {start:0, end:0};
		position.start = start;
		position.end = end;

		return position;
	}

	var sineInOut = function (t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	}

	var findElementPos = function (elemFind) {
		var elemX = 0;
		var elemY = 0;
		do {
			elemX += elemFind.offsetLeft;
			elemY += elemFind.offsetTop;
		} while (elemFind = elemFind.offsetParent)

		return Array(elemX, elemY);
	}
}


function bottom_banner_roll_AC(){
	var obj = $(".bottom_banner_roll");
	obj.btn_left = obj.find(" .b_banner_control .btn_left");
	obj.btn_right = obj.find(" .b_banner_control .btn_right");
	obj.btn_play = obj.find(" .b_banner_control .btn_play");
	obj.btn_stop = obj.find(" .b_banner_control .btn_stop");
	obj.ul = obj.find(" #link_site_group>ul");
	obj.li = obj.ul.find(">li");
	obj.saveTime = "";
	obj.saveSpeed = 2000;
	obj.saveCheck = "Y";
	
	function fn_move(arrows){
		if(obj.ul.is(":animated")) return false;
		fn_stop();
		obj.li = obj.ul.find(">li");
		var l = obj.li.eq(0).innerWidth() * -1;
		if(arrows == "left"){
			obj.li.last().prependTo(obj.ul);
			obj.ul.css("left",l+"px");
			l = 0;
		}
		
		obj.ul.animate({"left":l+"px"},300,function(){
			if(arrows == "right"){
				obj.li.eq(0).appendTo(obj.ul);
				obj.ul.css("left","0");
				
				if(obj.saveCheck == "Y"){
					obj.btn_play.click();
				}
			}
		});
	}
	function fn_play(){
		obj.saveTime = setTimeout(function(){
			fn_move("right");
		},obj.saveSpeed);
	}
	function fn_stop(){
		clearTimeout(obj.saveTime);
	}
	
	obj.btn_right.click(function(){
		fn_move("right");
		return false;
	});
	
	obj.btn_left.click(function(){
		fn_move("left");
		return false;
	});
	
	obj.btn_play.click(function(){
		obj.btn_stop.show();
		obj.btn_play.hide();
		fn_play();
		return false;
	});
	
	obj.btn_stop.click(function(){
		obj.btn_stop.hide();
		obj.btn_play.show();
		fn_stop();
		return false;
	});
	
	//자동실행
	if(obj.saveCheck == "Y"){
		obj.btn_play.click();
	}
	
	//접근성
	obj.li.find(" a").on("focus",function(){
		obj.btn_stop.hide();
		obj.btn_play.show();
		fn_stop();
	});
	
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_scrollTop Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	js_scrollTop ();
});
function js_scrollTop (){	
	$(".top_btn a").click(function(){
		$("body,html").stop().animate({"scrollTop":"0"},600,"easeOutCubic");
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	체험장 프로그램 안내 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	prg_AC();
});
function prg_AC (){	
	$('<div class="control"><a href="#" class="prev"><span>이전</span><a href="#" class="next"><span>다음</span></div>').prependTo($("#sec4 .w .tab_cont .all"));
    
    var obj = $("#sec4 .w .tab_cont .all >.control");
    var btns = $("#sec4 .w .tab_btn >ul >li");
    var prev = obj.find(".prev");
    var next = obj.find(".next");
    prev.click(function(){
        var idx = $("#sec4 .w .tab_btn >ul >li>a.on").parent().index();
        if(idx-1 < 0){
            btns.last().find("a").trigger("click");
        }else btns.eq(idx-1).find("a").trigger("click");
       return false; 
    });
    
    next.click(function(){
        var idx = $("#sec4 .w .tab_btn >ul >li>a.on").parent().index();
        if(idx+1 >= btns.size()){
            btns.eq(0).find("a").trigger("click");
        }else btns.eq(idx+1).find("a").trigger("click");        
        return false; 
    });
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	시설안내 포토존 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#con_card .photos").size() != 0){
		card_photos_AC();
	}
});

function card_photos_AC(){
	var obj = $("#con_card .photos");
		obj.lists = obj.find(" .midd>ul>li");
		obj.btn = obj.lists.find(">a");

	$('<div class="count"><span>1</span>/'+obj.lists.size()+'</div>').prependTo(obj.find(" .midd"));

	obj.counts = obj.find(" .midd .count>span");
	obj.heads = obj.find(" .head");
	obj.btn_left = obj.heads.find(">.btn_left");
	obj.btn_right = obj.heads.find(">.btn_right");

	function fn_view(num){
		var w = (obj.lists.innerWidth() * -1) * num;
		obj.counts.text(num+1);
		var imgs = obj.lists.eq(num).find(">a>img")[0].src;
		var alts = obj.lists.eq(num).find(">a>img").attr("alt");
        var h1s = obj.lists.eq(num).find(">a>h1").text();
        var ps = obj.lists.eq(num).find(">a>p").text();
        console.log(h1s,ps);
		obj.heads.find(" img").attr("src", imgs);
		obj.heads.find(" img").attr("alt", alts);
        obj.heads.find(" h1").text(h1s);
		obj.heads.find(" p").text(ps);
		obj.lists.removeClass("on").eq(num).addClass("on");

		obj.find(" .midd>ul").stop().animate({"left":w+"px"});
	}
	fn_view(0);

	obj.btn.click(function(){
		var idx = obj.btn.parent().index($(this).parent());
		fn_view(idx);
		return false;
	});

	obj.btn_left.click(function(){
		var idx = obj.lists.index(obj.find(" .midd>ul>li.on")) - 1;
		if(idx >= 0) fn_view(idx);
		return false;
	});
	obj.btn_right.click(function(){
		var idx = obj.lists.index(obj.find(" .midd>ul>li.on")) + 1;
		if(idx <= obj.lists.size()-1) fn_view(idx);
		return false;
	});

}
