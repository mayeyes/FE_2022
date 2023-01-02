/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

Slide Script

ex)
null : 옆으로 흐르는 배너 형태
type_02 : 팝업존 형태
type_03 : 비쥬얼 형태
type_04 : 포토슬라이드 형태(배너+이미지View)

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    if($(".js_slide").size() != 0){
        setTimeout(function(){ slide_AC(); }, 100);
    }
});

function slide_AC(){
var slide = $(".js_slide");

for(var i=0; i<slide.size(); i++){
    if(slide.eq(i).hasClass("type_02")) slide_type_02(slide.eq(i));//팝업존
    else if(slide.eq(i).hasClass("type_03")) slide_type_03(slide.eq(i));//비주얼
    else if(slide.eq(i).hasClass("type_04")) slide_type_04(slide.eq(i));//포토슬라이드
    else slide_type_01(slide.eq(i));//배너
}
}

function slide_type_01(slide){
    //배너
    var slide = slide;
    slide.titles = slide.find(">.title");
    slide.controls = slide.find(">.control");
    slide.counts = slide.controls.find(">.count");
    slide.btn_left = slide.controls.find(">.btn_left");
    slide.btn_right = slide.controls.find(">.btn_right");
    slide.btn_play = slide.controls.find(">.btn_play");
    slide.btn_stop = slide.controls.find(">.btn_stop");
    slide.moves = slide.find(">.move");
    slide.ul = slide.moves.find(">ul");
    slide.li = slide.ul.find(">li");
    slide.a = slide.ul.find(">li>a");
    slide.speeds = 500;
    slide.autos = "Y";
    slide.times = "";
    slide.times_speeds = 5000;
    slide.nums = 1;

    //제어
    if(slide.li.size() < 2){
        slide.controls.remove();
        return false;
    }

    //넘버링
    for(var i=0; i<slide.li.size(); i++){
        slide.li.eq(i).attr("data-count",(i+1));
    }

    //총 카운트 적용
    slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

    //버튼 : 다음
    slide.btn_right.click(function(){
        slide.btn_stop.click();
        movement("right");
        return false;
    });

    //버튼 : 이전
    slide.btn_left.click(function(){
        slide.btn_stop.click();
        movement("left");
        return false;
    });

    //버튼 : 재생
    slide.btn_play.click(function(){
        slide.btn_play.hide();
        slide.btn_stop.css("display","inline-block");
        slide.autos = "Y";
        slide.times = setTimeout(function(){
            movement("right");
        },slide.times_speeds);
        return false;
    });

    //버튼 : 정지
    slide.btn_stop.click(function(){
        slide.btn_stop.hide();
        slide.btn_play.css("display","inline-block");
        slide.autos = "N";
        clearTimeout(slide.times);
        return false;
    });

    //자동재생
    //slide.btn_play.click();

    //animate
    function movement(ty){
        if(slide.ul.is(":animated")) return false;

        slide.li = slide.ul.find(">li");
        var w = slide.li.eq(0).innerWidth() * -1;

        if(ty == "left"){
            slide.li.last().prependTo(slide.ul);
            slide.ul.css("left",w+"px");

            w = 0;
            slide.nums = slide.li.last().attr("data-count");
        } else {
            slide.nums = slide.li.eq(0).attr("data-count");
        }

        slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
            if(ty == "right"){
                slide.li.eq(0).appendTo(slide.ul);
                slide.ul.css("left","0");

                if(slide.autos == "Y"){
                    slide.times = setTimeout(function(){
                        movement("right");
                    },slide.times_speeds);
                }
            }
        });

        //총 카운트 적용
        slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
    }
}

function slide_type_02(slide){
    //팝업존
    var slide = slide;
    slide.titles = slide.find(">.title");
    slide.controls = slide.find(">.control");
    slide.counts = slide.controls.find(">.count");
    slide.btn_left = slide.controls.find(">.btn_left");
    slide.btn_right = slide.controls.find(">.btn_right");
    slide.btn_play = slide.controls.find(">.btn_play");
    slide.btn_stop = slide.controls.find(">.btn_stop");
    slide.moves = slide.find(">.move");
    slide.ul = slide.moves.find(">ul");
    slide.li = slide.ul.find(">li");
    slide.a = slide.ul.find(">li>a");
    slide.speeds = 1000;
    slide.autos = "Y";
    slide.times = "";
    slide.times_speeds = 5000;
    slide.nums = 1;

    //제어
    if(slide.li.size() < 2){
        slide.controls.remove();
        return false;
    }

    //넘버링
    for(var i=0; i<slide.li.size(); i++){
        slide.li.eq(i).attr("data-count",(i+1));
    }

    //총 카운트 적용
    slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

    //버튼 : 다음
    slide.btn_right.click(function(){
        slide.btn_stop.click();
        movement("right");
        return false;
    });

    //버튼 : 이전
    slide.btn_left.click(function(){
        slide.btn_stop.click();
        movement("left");
        return false;
    });

    //버튼 : 재생
    slide.btn_play.click(function(){
        slide.btn_play.hide();
        slide.btn_stop.css("display","inline-block");
        slide.autos = "Y";
        slide.times = setTimeout(function(){
            movement("right");
        },slide.times_speeds);
        return false;
    });

    //버튼 : 정지
    slide.btn_stop.click(function(){
        slide.btn_stop.hide();
        slide.btn_play.css("display","inline-block");
        slide.autos = "N";
        clearTimeout(slide.times);
        return false;
    });

    //자동재생
    slide.btn_play.click();

    //animate
    function movement(ty){
        slide.li = slide.ul.find(">li");
        if(slide.li.eq(0).is(":animated")) return false;

        var w = -100;

        if(ty == "left"){
            slide.li.last().prependTo(slide.ul);
            slide.li = slide.ul.find(">li");
            slide.li.eq(0).show().css("left",w+"%");
            slide.li.eq(1).css("left","0").stop().animate({"left":"100%"},slide.speeds,function(){
                $(this).hide();
            });

            w = 0;

            slide.nums = slide.li.eq(0).attr("data-count");
        } else {
            slide.li.eq(1).show().stop().animate({"left":"0"},slide.speeds,function(){
                slide.li.eq(0).hide().appendTo(slide.ul);
                if(slide.autos == "Y"){
                    slide.times = setTimeout(function(){
                        movement("right");
                    },slide.times_speeds);
                }
            });
            slide.nums = slide.li.eq(1).attr("data-count");
        }
        slide.li.eq(0).stop().animate({"left":w+"%"},slide.speeds,function(){
            if(ty == "right"){
                slide.li.eq(0).css("left","100%");
            }
        });

        //총 카운트 적용
        slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
    }
}

function slide_type_03(slide){
    //비주얼
    var slide = slide;
    slide.titles = slide.find(">.title");
    slide.controls = slide.find(">.control");
    slide.counts = slide.controls.find(">.count");
    slide.btn_left = slide.controls.find(">.btn_left");
    slide.btn_right = slide.controls.find(">.btn_right");
    slide.btn_play = slide.controls.find(">.btn_play");
    slide.btn_stop = slide.controls.find(">.btn_stop");
    slide.moves = slide.find(">.move");
    slide.ul = slide.moves.find(">ul");
    slide.li = slide.ul.find(">li");
    slide.a = slide.ul.find(">li>a");
    slide.speeds = 500;
    slide.autos = "Y";
    slide.times = "";
    slide.times_speeds = 4000;
    slide.nums = 1;

    //제어
    if(slide.li.size() < 2){
        slide.controls.remove();
        return false;
    }

    //심볼
    $("<ul></ul>").prependTo(slide.controls);
    for(var i=0; i<slide.li.size(); i++){
        $('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
    }
    slide.simbols = slide.controls.find(">ul>li");
    slide.simbols.eq(0).find(">a").addClass("on");

    //넘버링
    for(var i=0; i<slide.li.size(); i++){
        slide.li.eq(i).attr("data-count",(i+1));
    }

    //총 카운트 적용
    slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

    //버튼 : 다음
    slide.btn_right.click(function(){
        slide.btn_stop.click();
        movement("right");
        return false;
    });

    //버튼 : 이전
    slide.btn_left.click(function(){
        slide.btn_stop.click();
        movement("left");
        return false;
    });

    //버튼 : 재생
    slide.btn_play.click(function(){
        slide.btn_play.hide();
        slide.btn_stop.css("display","inline-block");
        slide.autos = "Y";
        slide.times = setTimeout(function(){
            movement("right");
        },slide.times_speeds);
        return false;
    });

    //버튼 : 정지
    slide.btn_stop.click(function(){
        slide.btn_stop.hide();
        slide.btn_play.css("display","inline-block");
        slide.autos = "N";
        clearTimeout(slide.times);
        return false;
    });

    //버튼 : 심볼
    slide.simbols.find(">a").click(function(){
        if($(this).hasClass("on")) return false;
        var idx = slide.simbols.index($(this).parent());
        slide.btn_stop.click();
        movement(idx);
        return false;
    });

    //자동재생
    slide.btn_play.click();

    //animate
    function movement(ty){
        slide.li = slide.ul.find(">li");

        var olds = 0;
        var news = 0;

        if(ty == "right"){
            //다음
            olds = slide.nums;
            news = slide.nums + 1;
            
            
            //alert(news);

            //if(news >= slide.li.size()) news = 0;
            if(news < slide.li.size()) {
                news = news;
            } else if (news > slide.li.size()) {
                news = 1;
            }
        } else if(ty == "left"){
            //이전
            olds = slide.nums;
            news = slide.nums - 1;

            if(news < 1) news = slide.li.size();
        } else {
            //심볼클릭
            olds = slide.nums;
            news = ty+1;
            if(news >= slide.li.size()) news = 0;
        }


        if(slide.li.eq(news-1).is(":animated")) return false;

        slide.li.eq(olds-1).stop().css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
            slide.li.eq(olds-1).css({"left":"100%","display":"none"});
            if(slide.autos == "Y"){
                slide.times = setTimeout(function(){
                    movement("right");
                },slide.times_speeds);
            }
        });

        slide.li.eq(news-1).css({"display":"block"}).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
        });

        slide.nums = news;

        //총 카운트 적용
        slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

        //심볼
        slide.simbols.find(">a.on").removeClass("on");
        slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
    }
}

function slide_type_04(slide){
    //포토슬라이드
    var slide = slide;
    slide.titles = slide.find(">.title");
    slide.controls = slide.find(">.control");
    slide.counts = slide.controls.find(">.count");
    slide.btn_left = slide.controls.find(">.btn_left");
    slide.btn_right = slide.controls.find(">.btn_right");
    slide.btn_play = slide.controls.find(">.btn_play");
    slide.btn_stop = slide.controls.find(">.btn_stop");
    slide.moves = slide.find(">.move");
    slide.ul = slide.moves.find(">ul");
    slide.li = slide.ul.find(">li");
    slide.a = slide.ul.find(">li>a");
    slide.speeds = 500;
    slide.autos = "Y";
    slide.times = "";
    slide.times_speeds = 5000;
    slide.nums = 1;

    //view
    //slide_view
    var setNum = $(".js_slide").index(slide);
    slide.attr("id","slide_view_"+setNum);
    $('<div class="slide_view_'+setNum+'"><span></span><img src="" alt="" /></div>').insertBefore(slide);
    views(0,$(".slide_view_"+setNum));

    //제어
    if(slide.li.size() < 2){
        slide.remove();
        return false;
    }

    //넘버링
    for(var i=0; i<slide.li.size(); i++){
        slide.li.eq(i).attr("data-count",(i+1));
    }

    //총 카운트 적용
    slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

    //버튼 : 다음
    slide.btn_right.click(function(){
        slide.btn_stop.click();
        movement("right");
        return false;
    });

    //버튼 : 이전
    slide.btn_left.click(function(){
        slide.btn_stop.click();
        movement("left");
        return false;
    });

    slide.li.find(">a").click(function(){
        var idx = slide.li.index($(this).parent());
        var cl = $(this).parents(".js_slide").attr("id");

        views(idx,$("."+cl));
        return false;
    });

    //view
    function views(idx,obj){
        var idx = idx;
        var titles = slide.li.eq(idx).find(">a").attr("title");
        var imgs = slide.li.eq(idx).find(">a img")[0].src;
        var alts = slide.li.eq(idx).find(">a img").attr("alt");

        slide.li.find(">a.on").removeClass("on");
        slide.li.eq(idx).find(">a").addClass("on");
        obj.find(" img").attr("src",imgs);
        obj.find(" img").attr("alt",alts);
        if(titles){
            obj.find(" span").html("<strong>"+titles+"</strong>"+alts);
        } else {
            obj.find(" span").html(alts);
        }
        
        if(alts == ""){
            obj.addClass("notitle");
        } else {
            obj.removeClass("notitle");
        }
    }

    //animate
    function movement(ty){
        if(slide.ul.is(":animated")) return false;

        slide.li = slide.ul.find(">li");
        var w = slide.li.eq(0).innerWidth() * -1;

        if(ty == "left"){
            slide.li.last().prependTo(slide.ul);
            slide.ul.css("left",w+"px");

            w = 0;
            slide.nums = slide.li.last().attr("data-count");
        } else {
            slide.nums = slide.li.eq(0).attr("data-count");
        }

        slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
            if(ty == "right"){
                slide.li.eq(0).appendTo(slide.ul);
                slide.ul.css("left","0");
            }
        });

        //총 카운트 적용
        slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
    }
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	COOKIE Function

	ex)
	$.cookie('key', 'ok', {expires:7,domain:'.myhost.com', path:'/', secure:0});
	$.cookie('key', 'ok', '');
	alert($.cookie('key'));

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

(function($){
  $.cookie = function(key, value, options) {
   if(arguments.length > 1) {
    var o = $.extend({}, $.cookie.defaults, options);
    
    if (value === null || value === undefined) {
     value = '';
     o.expires = -1;
    }
    if (o.expires.constructor != Date) {
     var today = new Date();
     today.setDate(today.getDate() + o.expires);
     o.expires = today;
    }
    // Create the cookie string
    document.cookie = 
     key + '=' + value + '; expires=' + o.expires.toUTCString() +
       (o.path? '; path=' + (o.path) : '') +
       (o.domain? '; domain=' + (o.domain) : '') +
       (o.secure? '; secure' : '');
   } else {
    if(result = new RegExp(key+"=(.*?)(?:;|$)").exec(document.cookie))
     return decodeURIComponent(result[1]);  
    return false;
   }
  }; //' $.cookie = function(key, value, options) 
  $.cookie.defaults = {
   expires: 365,
   path: '/'
  } // '$.cookie.defaults
 })(jQuery);



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	URL get Param Function
	
	ex)
	$.params['name'];

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
(function($) {
    $.params = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; i++)
        {
            var p=a[i].split('='); 
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); //공백으로 변환 후 디코딩
        }
        return b;
    })(window.location.search.substr(1).split('&')) //파라미터 정보만 분리
})(jQuery);



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	layout left,right Height auto Function
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	if($("body#sub").size() != 0){
		 container_AC();
	}
});

function container_AC(){
	var c = $("#container");
	var r = $("#remote");
	
	if(c.find(">.layout").size() != 0){
		c.find(">.layout").css("min-height","10px");
	} else {
		c.css("min-height","10px");
	}

	function fn_set(){
		if($("body").hasClass("pc")){
			if(c.height() < r.height()){
				if(c.find(">.layout").size() != 0){
					c.find(">.layout").css("min-height",r.height());
				} else {
					c.css("min-height",r.height());
				}
			}
		} else {
			c.css("min-height","10px");
		}
	}
	
	setInterval(function(){fn_set();},500);
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	input[type=file] preview Image Function

	ex)
	<input type="file" class="preview" />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_file_preview").size() != 0){
		file_preview_AC();
	}
});

function file_preview_AC(){
	var box = $(".js_file_preview");
	var obj = box.find("input[type=file]");
	var ch = "";

	for(var i=0; i<$(".file_img_preview").size(); i++){
		ch = $(".file_img_preview").eq(i);
		if(ch.html() != ""){
			ch.siblings(".file_img_preview_del").show();
			ch.siblings(".file_name_preview").show().css("left","0px");
		}
	}

	$(".file_img_preview").click(function(){
		$(this).siblings("input:file").click();
	});

	$(".file_img_preview_del").click(function(){
		$(this).siblings("input:file").clone(true).insertAfter($(this).siblings("input:file"));
		$(this).siblings("input:file").eq(0).remove();

		$(this).siblings(".file_img_preview").removeClass("on").removeClass("file").empty();
        $(this).siblings(".file_name_preview").css("left","-300px").text("");
        $(this).siblings("textarea").val("");
        $(this).hide();
		return false;
	});

	obj.change(function(){
		var _this = $(this)[0];
		previewImage(_this);
	});
}

function previewImage(targetObj) {
	var preview = $(targetObj).siblings(".file_img_preview")[0]; //div id   
	var ua = window.navigator.userAgent;

	if (ua.indexOf("MSIE") > -1) {//ie일때

	    targetObj.select();

	    try {
	        var src = document.selection.createRange().text; // get file full path 
	        var img = preview; //이미지가 뿌려질 곳 

	        var imageType = src.split(".");
	        imageType = imageType[imageType.length-1];
	        var file_name = src.split("\\");
	        	file_name = file_name[file_name.length-1];

	        if(imageType != "gif" && imageType != "png" && imageType != "jpg" && imageType != "jpeg" && imageType != "bmp"){
	        	$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("file");

	        	if(imageType == "zip") src = contextPath+"/images/core/icon_preview_zip.gif";
	        	else if(imageType == "ai") src = contextPath+"/images/core/icon_preview_ai.gif";
	        	else if(imageType == "xls" || imageType == "xlsx") src = contextPath+"/images/core/icon_preview_xls.gif";
	        	else if(imageType == "ppt" || imageType == "pptx") src = contextPath+"/images/core/icon_preview_ppt.gif";
	        	else if(imageType == "doc") src = contextPath+"/images/core/icon_preview_doc.gif";
	        	else if(imageType == "pdf") src = contextPath+"/images/core/icon_preview_pdf.gif";
	        	else if(imageType == "hwp") src = contextPath+"/images/core/icon_preview_hwp.gif";
	        	else if(imageType == "psd") src = contextPath+"/images/core/icon_preview_psd.gif";
	        	else if(
	        		imageType == "wmv" || imageType == "wma" || 
	        		imageType == "mp4" || imageType == "mp3" || 
	        		imageType == "mkv" || imageType == "avi" || 
	        		imageType == "mpeg" || imageType == "mpe" || 
	        		imageType == "asf" || imageType == "asx" || 
	        		imageType == "flv" || imageType == "rm" || 
	        		imageType == "mov" || imageType == "dat" || 
	        		imageType == "ogg" || imageType == "mmf" || 
	        		imageType == "ra" || imageType == "tta"
	        	) src = contextPath+"/images/core/icon_preview_music.gif";
	        	else src = contextPath+"/images/core/icon_preview_file.gif";
        	} else {
        		$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("on");
        	}

        	$(targetObj).siblings(".file_img_preview_del").show();
		    $(targetObj).siblings(".file_name_preview").css("left","0px").text(file_name);

			$('<img src="'+src+'" />').appendTo($(img).empty());
	    } catch (e) {
	    	
	    }
	} else { //ie가 아닐때
	    var files = targetObj.files;
	    for ( var i = 0; i < files.length; i++) {

	        var file = files[i];


	        var prevImg = $(preview).find(">img")[0]; //이전에 미리보기가 있다면 삭제
	        if (prevImg) {
	            preview.removeChild(prevImg);
	        }

	        var img = document.createElement("img"); //크롬은 div에 이미지가 뿌려지지 않는다. 그래서 자식Element를 만든다.
	        img.id = "prev_" + i;
	        img.classList.add("obj");
	        img.file = file;
	        
	        preview.appendChild(img);


	        var bytes = file.size/1024;
	        if(bytes >= 1000){
	        	bytes = bytes / 1024;
	        	bytes = bytes.toFixed(1)+"MB";
	    	} else {
	    		bytes = bytes.toFixed(1)+"KB";
	    	}


	        var imageType = /image.*/; //이미지 파일일경우만.. 뿌려준다.
	        if (!file.type.match(imageType)){
	        	//이미지가 아닐때

	        	$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("file");
        		$(targetObj).siblings(".file_img_preview_del").show();
        		$(targetObj).siblings(".file_name_preview").css("left","0px").text(file.name+"("+bytes+")");

	        	if(file.type.indexOf("zip") != -1) $(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_zip.gif";
	        	else if(file.type.indexOf("postscript") != -1) $(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_ai.gif";
	        	else if(file.type.indexOf("spreadsheetml.sheet") != -1) $(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_xls.gif";
	        	else if(file.type.indexOf("presentationml.presentation") != -1) $(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_ppt.gif";
	        	else if(file.type.indexOf("doc") != -1) $(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_doc.gif";
	        	else if(file.type.indexOf("pdf") != -1) $(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_pdf.gif";
	        	else if(file.type.indexOf("hwp") != -1) $(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_hwp.gif";
	        	else if(
	        		file.type.indexOf("wmv") != -1 || file.type.indexOf("wma") != -1 || 
	        		file.type.indexOf("mp4") != -1 || file.type.indexOf("mp3") != -1 || 
	        		file.type.indexOf("mkv") != -1 || file.type.indexOf("avi") != -1 || 
	        		file.type.indexOf("mpeg") != -1 || file.type.indexOf("mpe") != -1 || 
	        		file.type.indexOf("asf") != -1 || file.type.indexOf("asx") != -1 || 
	        		file.type.indexOf("flv") != -1 || file.type.indexOf("rm") != -1 || 
	        		file.type.indexOf("mov") != -1 || file.type.indexOf("dat") != -1 || 
	        		file.type.indexOf("ogg") != -1 || file.type.indexOf("mmf") != -1 || 
	        		file.type.indexOf("ra") != -1 || file.type.indexOf("tta") != -1
	        	) $(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_music.gif";
	        	else $(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_file.gif";
	        	
	            continue;
	        } else {
	        	//psd 예외처리
	        	$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("file");
        		$(targetObj).siblings(".file_img_preview_del").show();
        		$(targetObj).siblings(".file_name_preview").css("left","0px").text(file.name+"("+bytes+")");

	        	if(file.type.indexOf("photoshop") != -1){
	        		$(preview).find(">img")[0].src = contextPath+"/images/core/icon_preview_psd.gif";

	        		continue;
	        	}
	        }


	    	$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("on");
	    	$(targetObj).siblings(".file_img_preview_del").show();
	        $(targetObj).siblings(".file_name_preview").css("left","0px").text(file.name+"("+bytes+")");

	        if (window.FileReader) { // FireFox, Chrome, Opera 확인.
	            var reader = new FileReader();
	            reader.onloadend = (function(aImg) {
	                return function(e) {
	                    aImg.src = e.target.result;
	                };
	            })(img);
	            reader.readAsDataURL(file);
	        } else { 
	        }
	    }
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	이미지 맵(반응형)

	ex)
	$('img[usemap]').rwdImageMaps();

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($('img[usemap]').size() != 0) $('img[usemap]').rwdImageMaps();
});



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	모바일 체크
	
	ex) if(isMobile()) //모바일
	    else //pc
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function isMobile() {
var filter = "win16|win32|win64|mac|macintel";
	if( navigator.platform  ){
	  if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
	    return true;
	  }else{
	    return false;
	  }
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	radio Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_radio").size() != 0){
		js_radio_AC();
	}
});
function js_radio_AC(){
	var obj = $(".js_radio");
		obj.btn = obj.find(">input:radio");

	function fn_def(){
		var def = obj.find(">input:radio:checked").parent();
		var disab = obj.find(">input:radio:disabled").parent();

		def.addClass("on");
		disab.addClass("disabled");
	}

	fn_def();
	
	obj.btn.bind("change",function(){
		var allBtn = $(".js_radio input:radio[name='"+$(this).attr("name")+"']").not(":disabled");
		if($(this).prop("checked")){
			allBtn.prop("checked",false);
			allBtn.parent().removeClass("on");
			$(this).prop("checked",true);
			$(this).parent().addClass("on");
		}
		return false;
	});
}



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

			//dep_slide default
			gnb_obj.li.ul.li.a.removeClass("clo");
			gnb_obj.li.ul.li.find("ul").show();
		},200);
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
		$(this).parent().parent().parent().siblings("a").addClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		$(this).parent().parent().addClass("on");
	});	
	
	gnb_obj.li.ul.li.last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
	
	function gnb_def(){
		//$("#bg").fadeOut(200);
		$("#header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+1+"px"},200);
		gnb_obj.blind.stop().animate({"height":0+"px"},200);
		
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
		//$("#bg").fadeIn(200);
		$("#header").addClass("on");
		gnb_obj.li.find(">a.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");	
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">ul").addClass("on");
		gnb_obj.maxH = 0;

		//높이 측정
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		gnb_obj.li.ul.innerHeight(gnb_obj.maxH).show().stop().animate({"opacity":1},300);
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH + gnb_obj.li.a.innerHeight())+ 149+ "px"},300);
		gnb_obj.blind.stop().animate({"height":gnb_obj.maxH+ 149+"px"},300);

		//3뎁스 여부 찾기
		for(var i=0; i<gnb_obj.li.ul.li.size(); i++){
			if(gnb_obj.li.ul.li.eq(i).find(">ul").size() != 0){
				gnb_obj.li.ul.li.eq(i).find(">a").addClass("child");
			}
		}
	}

	//2뎁스 열고 닫기
	dep_slide();
	function dep_slide(){
		gnb_obj.li.ul.li.a.click(function(){
			if(!$(this).hasClass("clo")){
				$(this).addClass("clo");
				$(this).siblings("ul").stop().slideUp();
			} else{
				$(this).removeClass("clo");
				$(this).siblings("ul").stop().slideDown();
			}
			if($(this).siblings("ul").length !=0){
				return false;
			}
		});
	}
	
	//slide_map
/*	$('<div id="slide_map" tabindex="0"><div class="inner"><div class="binds"></div><a href="#" class="btn_close">닫기</a></div></div>').prependTo($("#wrap"));
	gnb_obj.clone(false).appendTo($("#slide_map >.inner > .binds"));
	$("#header>.head_top .mob_login").clone(false).prependTo($("#slide_map >.inner > .binds"));
	$("<div class='titles'>전체메뉴</div>").prependTo($("#slide_map >.inner > .binds"));
	$("<a href='http://tube.mayeye.net/login.jsp?param=logout' class='logout_btn'>로그아웃</a>").appendTo($("#slide_map >.inner > .binds"));*/
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*$(document).ready(function(){
	$(".allmenu_btn").click(function() {
		if($("#slide_map").is(":hidden")){		
			$("body").addClass("fixed");
			$("#slide_map").fadeIn(300).focus();
		}
		
		return false;
	});

	$(document).click(function(e) { 
	    if($(e.target).parents("#slide_map").size() != 0) {
	         //메뉴 안
	    } else {
	        //밖
	        if(!$(".js_mobile_check").is(":hidden")){
				$("#slide_map .inner").stop().animate({"margin-left":-$("#slide_map .inner").innerWidth()},300,function(){
					$("#slide_map").fadeOut(300);
					$("body").removeClass("fixed");			
				});	
			}
	    } 
	});

	$("#slide_map>.inner>.btn_close").click(function(){
		$("#slide_map").fadeOut(300);
		$("body").removeClass("fixed");
	});
});*/



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Scroll Top Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){  
    setTimeout(function(){
        if($("#btn_top").size() != 0){
            floatingTop();
        }
    },100);
});
 function floatingTop(){
    $("#btn_top").click(function() {
        $('#wrap').animate({
            scrollTop : 0
        }, 400);
        return false;
    });

    $("#btn_top").hide();
    $("#wrap").scroll(function(){
    	var had = $("#header").innerHeight();
    	var t = $(this).scrollTop();

    	if(had<t){
    		$("#btn_top").fadeIn(200);

    		var allH = $("#footer").innerHeight() + $("#main_wrap").innerHeight() + $("#header").innerHeight();
    		var ftScrol = allH - $(window).height() - t;

    		if(ftScrol < $("#footer").innerHeight()){
				$("#btn_top").addClass("fix");
			} else {
				$("#btn_top").removeClass("fix");
			}
    	} else{
    		$("#btn_top").fadeOut(200);
    	}
    });
 }




 /* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Header Fix

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    if($("body#main").size() != 0){
		headerScroll_M();
	} else{
		headerScroll_S();
	}
});

function headerScroll_M(){
    $("#wrap").scroll(function(){
        var minH = $("#page_2").offset().top;
        var t = $(this).scrollTop();

        if(t>minH){
            $("body").attr('data-scroll','on'); //고정
        } else if(t>$("#header").innerHeight()){
            $("body").attr('data-scroll','yet'); //고정 직전
        } else {
            $("body").attr('data-scroll','off');
        }
    });
}

function headerScroll_S(){
    $("#wrap").scroll(function(){
        var t = $(this).scrollTop();

        if(t>$("#header").innerHeight()){
            $("body").attr('data-scroll','on'); //고정
        } else {
            $("body").attr('data-scroll','off');
        }
    });
}



 /* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Detail Search popup

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    search_Pop();
});

function search_Pop(){
	var btn = $("#header .head_top .searchbx>.s_detail");
	var obj = $("#header .head_top .s_pop");

	obj.hide();
	btn.click(function(){
		obj.fadeIn(200);
		$("#header").addClass("shadow");
	});

	obj.find(".close").click(function(){
		obj.fadeOut(200);
		$("#header").removeClass("shadow");
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   top search 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	topSearch_AC();
});
function topSearch_AC(){
	if($('#top-search').size() == 0) return false;
	var obj = $('#top-search');
		obj.btn_on = $("#header .head_top .toputil ul li:nth-child(3) a");
		obj.btn_off = obj.find(">a.close");

	function _on(){
		if($("body").attr("data-search-open") != "on") $("body").attr("data-search-open","on");
		else $("body").attr("data-search-open","off");
	}
	obj.btn_on.on("click",function(){
		_on();
		return false;
	});
	obj.btn_off.on("click",function(){
		_on();
		return false;
	});
    
    
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   select

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	select_AC();
});
function select_AC(){
	var obj = $('[data-js="select"]');
		obj.btn = obj.find(">a");

	obj.btn.on("click",function(){
        $('[data-js="select"]').attr("data-open","off");
		if($(this).parents('[data-js="select"]').attr("data-open") != "on"){
            
			$(this).parents('[data-js="select"]').attr("data-open","on");
			$(this).find("span").text('확장됨');
		}else{
			$(this).parents('[data-js="select"]').attr("data-open","off");
			$(this).find("span").text('축소됨');
			
		}
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	첨부파일 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){

	var fileTarget = $('[data-skin="file"] .upload-hidden');

	fileTarget.each(function(index) { 
	if($(this).siblings('.upload-name').val()!='null' && $(this).siblings('.upload-name').val()!=''){
		$(this).siblings('.upload-name').next().css("display","inline-block");
		}
	});

	fileTarget.on('change', function(){
		if(window.FileReader){
			// 파일명 추출
			var filename = $(this)[0].files[0].name;
		}else {
			// Old IE 파일명 추출
			var filename = $(this).val().split('/').pop().split('\\').pop();
		};

		$(this).siblings('.upload-name').val(filename);

		if($(this).siblings('.upload-name').val()!='null' && $(this).siblings('.upload-name').val()!=''){
		$(this).siblings('.upload-name').next().css("display","inline-block");
		}
	});

});


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	DATEPICKER(달력플러그인) Function

	ex)
	<input type="text" class="datepicker" />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

function dataTime(){
	$( ".js_cal" ).datepicker({  
		// 달력 아이콘  
		showOn: "both",  
		buttonImage: contextPath+"/images/core/icon_cal.gif",  
		buttonImageOnly: true,
		buttonText:"달력선택",
		// 달력 하단의 종료와 오늘 버튼 Show  
		showButtonPanel: false,  
		// date 포멧  
		dateFormat : "yy-mm-dd",  
		// 달력 에니메이션 ( show(default),slideDown,fadeIn,blind,bounce,clip,drop,fold,slide,"")  
		showAnim : "",  
		// 다른 달의 일 보이기, 클릭 가능  
		showOtherMonths: false,  
		selectOtherMonths: true,  
		// 년도, 달 변경  
		changeMonth: true,  
		changeYear: true, 
		showMonthAfterYear: true,        /* 년과 달의 위치 바꾸기 */ 
        /* 한글화 */ 
        monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
        monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
        dayNames : ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
		// 여러달 보이기  
		numberOfMonths: 1,  
		showButtonPanel: false,
		showWeek: false,  
		firstDay: 0,
		autoSize:true
	});
	$('#ui-datepicker-div').hide();
}

$(document).ready(function(){
	if($(".js_cal").size() !=0){
		setTimeout(function(){
		dataTime();
		},100);
	}
});

/**
 * 
 * datetime
 * @returns
 */

function fromdatepicker(){
	if($(".from-date-picker").size() == 0){
		return false;
	}
	$('.from-date-picker').datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm',
        showOn: "both",
		buttonImage: contextPath+"/images/core/icon_cal.gif",  
		buttonImageOnly: true,
		buttonText:"달력선택",
        timeInput: true,
        stepHour: 1,
        stepMinute: 1,
		stepSecond: 1,
		currentText: '현재',
		closeText: '닫기',
		timeText:'시간',
		hourText:'시',
		minuteText:'분',
		millisecText:'밀리초',
		microsecText:'마이크로초',
		timezoneText:'타임존'
    });
	$('#ui-datepicker-div').hide();
}

function fromDateTimePicker () {
	if($(".from-datetime-picker").size() == 0){
		return false;
	}
	$('.from-datetime-picker').datetimepicker({
		dateFormat: 'yy-mm-dd',
		timeFormat: 'HH:mm:ss',
		showOn: "both",
		buttonImage: contextPath+"/images/core/icon_cal.gif",  
		buttonImageOnly: true,
		buttonText:"달력선택",
		timeInput: true,
		stepHour: 1,
		stepMinute: 1,
		stepSecond: 1,
		currentText: '현재',
		closeText: '닫기',
		timeText:'시간',
		hourText:'시',
		minuteText:'분',
		secondText: '초',
		millisecText:'밀리초',
		microsecText:'마이크로초',
		timezoneText:'타임존'
	});
	$('#ui-datepicker-div').hide();
}

$(document).ready(function(){
	setTimeout(function(){
		fromdatepicker();
		fromDateTimePicker();
	},100);
});
