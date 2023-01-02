
if(location.href.indexOf("sso-flag=Y") > -1){
	history.pushState(null, '', location.href);
}
window.onpopstate = function(){
	if(location.href.indexOf("sso-flag=Y") > -1){
		history.go(1);
	}else{
		history.go(-1);
	}
}

var CustomMap = function(){
	this.keys = [];
	this.values = [];
	this.get = function(key){
		var idx = -1
		for(var i=0 ; i<this.keys.length ; i++){
			if(key == this.keys[i]){
				idx = i;
				break;
			}
		}
		if(idx == -1) return undefined;
		else return this.values[idx];
	}
	this.set = function(key, value){
		this.keys.push(key);
		this.values.push(value);
	}
	this.has = function(key){
		var idx = -1
		for(var i=0 ; i<this.keys.length ; i++){
			if(key == this.keys[i]){
				idx = i;
				break;
			}
		}
		if(idx == -1) return false;
		else return true;
	}
}
$.ajaxSetup({
	contentType:"application/json"
	, dataType:"json"
	, timeout: 60000
});
$(document).ajaxError(function(event, jqxhr, settings, exception) {
	console.log(jqxhr.status);
	console.log(jqxhr.responseText.message);
}).ajaxStart(function(event){
	var refererUrl = event.target.URL;
	var excludeUrl = [
		"/sample/sampleExcludeUrl"
		, "이 곳에 자동 로딩박스 제외할 url(ajax를 날리는 곳의 url 즉 레퍼러) 추가"
	];
	var ignoreFlag = false;
	for(var i=0 ; i<excludeUrl.length ; i++){
		if(refererUrl.split(excludeUrl[i]).length > 1){
			ignoreFlag = true;
			break;
		}
	}
	if(ignoreFlag == false){
		showLoading();
	}
}).ajaxComplete(function (event, jqxhr, settings){
	hideLoading();
	jqGridResizeAll();
	highchartResizeAll();
}).ajaxStop(function (){
	hideLoading();
	jqGridResizeAll();
	highchartResizeAll();
});
$(window).on("resize", function(){
	jqGridResizeAll();
	highchartResizeAll();
});
function showLoading(){
	if($("#loadingModal").length == 0){
		var modal = $("<div id='loadingModal'/>");
		modal.css("position", "fixed");
		modal.css("width", "100%");
		modal.css("height", "100%");
		modal.css("top", "0");
		modal.css("left", "0");
		modal.css("background", "rgba(0,0,0,0.3)");
		modal.css("zIndex", "999998");
		
		var loading = $("<img id='loadingImg' src='/img/loading.gif'/>");
		loading.css("position", "fixed");
		loading.css("width", "268px");
		loading.css("height", "106px");
		loading.css("top", "calc(50% - 53px)");
		loading.css("left", "calc(50% - 134px)");
		loading.css("zIndex", "999999");
		
		$("body").append(modal);
		$("body").append(loading);
	}
}
function hideLoading(){
	$("#loadingModal").remove();
	$("#loadingImg").remove();
}

$(document).ready(function(){
	$("form").submit(function(){
		return false;
	});
	$(".datePickOne").bootstrapMaterialDatePicker({format: 'YYYY-MM-DD', time: false});
	$(".datePickStart").bootstrapMaterialDatePicker({format: 'YYYY-MM-DD', time: false});
	$(".datePickEnd").bootstrapMaterialDatePicker({format: 'YYYY-MM-DD', time: false});
	$(".datePickStart").on("change", function(evt, date){
		$(".datePickEnd").bootstrapMaterialDatePicker("setMinDate", date);
	});
	$(".datePickEnd").on("change", function(evt, date){
		$(".datePickStart").bootstrapMaterialDatePicker("setMaxDate", date);
	});
});


/****************************
* 	오늘 날짜 구하는 함수
* 	- return 형태 : 1999-01-01
*	- 작성자 : 김환
* 	- 작성일 : 2021.07.12.
******************************/
function getTodayDate(){
	var date = new Date();
	return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
}


/****************************
* 	요일 구하는 함수
*	- 입력값 헝테 : 1999-01-01 or Data()
* 	- return 형태 : 일
*	- 작성자 : 김환
* 	- 작성일 : 2021.07.12.
******************************/
function getDateDay(setDate){
	var week = ['일', '월', '화', '수', '목', '금', '토'];
	var dayOfWeek = week[new Date(setDate).getDay()];
	return dayOfWeek;
}


/****************************
 * 	입력값으로 부터 이전/이후 날짜 구하는 함수
 *	- 입력값 : number
 *			 1  : 이후 1일
 *			 -1 : 이전 1일
 * 	- return 형태 : 1999-01-01
 *	- 작성자 : 김환
 * 	- 작성일 : 2021.07.16.
 ******************************/
function getDayOfDate(dayNumber) {
	var now = new Date();	// 현재 날짜 및 시간
	var date = new Date(now.setDate(now.getDate() + (dayNumber)));	
	return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
}


/****************************
 * 	입력된 날짜 + 입력값으로 부터 이전/이후 날짜 구하는 함수
 *	- 입력값 : standardDate, number
 *		 	 standardDate : 기준이 되는 날짜 (ex)2020-01-01)
 *			 number		  :  1 = 이후 1일 
 *							-1 : 이전 1일
 * 	- return 형태 : 1999-01-01
 *	- 작성자 : 김환
 * 	- 작성일 : 2021.07.16.
 ******************************/
function getNumberDayAgoDate(standardDate, dayNumber) {
	var now = new Date(standardDate);
	var date = new Date(now.setDate(now.getDate() + (dayNumber)));	
	return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
}


/****************************
 * 	오늘로부터 입력된 값 이전 달을 구하는 함수
 *	- 입력값 : standardDate, number
 *			standardDate : 기준이 되는 날짜 (ex)2020-01-01)
 *			monthNumber	 : 구하려는 달 (ex) 1)
 *			ex) getNumberMonthAgoDate('2021-01-01',1);
 * 	- return 형태 : 1999-01-01
 *	- 작성자 : 김환
 * 	- 작성일 : 2021.07.16.
 ******************************/
function getNumberMonthAgoDate(standardDate, monthNumber) {

    var sYear = standardDate.substring(0,4);
    var sMonth = standardDate.substring(5,7);
    var sDate = standardDate.substring(8,10);
	var returnValue = "";

    d= new Date(Number(sYear), Number(sMonth)-1, Number(sDate));
	var monthOfYear = d.getMonth();

	d.setMonth(monthOfYear - monthNumber);
	return (d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0"+d.getDate()).slice(-2));
}


/****************************
 * 	입력 된 날짜의 - 달의 마지막일 구하는 함수
 *
 *	- 입력값 : 날짜(setDate) : ex) 2021-01-11 or 2021-01
 *		   : 마지막 일자는 크게 영향 없음
  *			ex) getDateLastDay('2021-01-01');
 * 	- return 형태 : 28 or 30 ... 31 
 *	- 작성자 : 김환
 * 	- 작성일 : 2021.11.15.
 ******************************/
function getDateLastDay(setDate) {
    var sYear 		= setDate.substring(0,4);
    var sMonth 		= setDate.substring(5,7);
	var returnValue = "";

	var date = new Date(sYear, sMonth, 0);
	return returnValue = date.getDate(); //마지막 날짜 산출
}


/****************************
* 	한자리숫자 두자리로 만들어주는 함수
* 	- return 형태 : 1999-01-01
*	- 작성자 : 최기호
* 	- 작성일 : 2021.07.15.
******************************/
function numberPad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}


/****************************
* 	3자리 마다 콤마(,) 반영
* 	- return 형태 : 123,456
*	- 작성자 : 김환
* 	- 작성일 : 2021.07.15.
******************************/
function fn_addComma(cost){
  	var reg = /(^[+-]?\d+)(\d{3})/;
	cost += '';
	while (reg.test(cost)) {
		cost = cost.replace(reg,'$1'+','+'$2');
	}     
	return cost;
}

