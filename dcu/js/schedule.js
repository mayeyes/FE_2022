/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Print Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$("a.print_btn").click(function() { //이벤트 발생시킬 버튼 아이디
		printElem({ 
			printMode: 'popup',
			pageTitle:'프린트 미리보기', //팝업 타이틀
			leaveOpen:false, //인쇄하고도 창을 띄우기(true)/안띄우기(false). Default는 false
			printBodyOptions : {
				classNameToAdd : 'user',
				styleToAdd: 'width:1023px; overflow-x:hidden;'
			}
		});
		return false;
	});
});

function printElem(options){	
	$('#container').printElement(options); //팝업으로 띄울 영역 Div 아이디
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_scrollTop Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".susi_table").size() != 0){
		js_schedule ();
	}
});
function js_schedule (){
	/*
	// today
	var date = new Date();
	var today = date.getDate();
	$(".link_search >.today").click(function(){
		param.removeClass("today");
		param.num.each(function() {
			if($(this).text() == today){
				$(this).parent().addClass("today");
				$("body,html").stop().animate({"scrollTop":$(this).parent().offset().top+"px"},500);
			}
		});
		return false;	
	});
	*/
		
	// mobile list
	var param = $(".susi_table td");
		param.num = param.find(">span");
		param.btn = param.find(">.btn");
		
	$('<div id="mobile_list"></div>').insertBefore(".cate_tip");	
	param.btn.click(function(){
		if($(".js_mobile_check").is(":hidden")){
			return true;
		} else {
			param.num.removeAttr("class");
			$(this).siblings("span").addClass("on");
			$("#mobile_list").find(">.result_list").remove();
			$(this).siblings(".result_list").clone(false).show().appendTo($("#mobile_list"));
			var pos = $("#mobile_list").offset().top;
			if($("#mobile_list").find(".result_list").size() > 0){
				setTimeout(function(){$("body,html").stop().animate({"scrollTop":pos+"px"},500);}, 500);			
			}
			return false;	
		}
	});	
}