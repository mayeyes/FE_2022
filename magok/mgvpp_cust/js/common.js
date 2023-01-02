// function addComma(num, decimalPlace) {
//     if (typeof decimalPlace == "undefined" || decimalPlace == null) {
//         decimalPlace = 2;
//     }
//     num = num.toFixed(decimalPlace);
//     return num.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// }
function addComma(num){
    return num.toLocaleString("ko-KR");
}
$.ajaxSetup({
    contentType: "application/json",
    dataType: "json",
    timeout: 60000
});
let forceLoadingFlag = false;
$(document).ajaxError(function(event, jqxhr, settings, exception) {
    console.log(jqxhr.status);
    console.log(jqxhr.responseText.message);
}).ajaxStart(function(event) {
    var refererUrl = event.target.URL;
    var excludeUrl = [
        "/sample/sampleExcludeUrl", "/map/evcStatus", "이 곳에 자동 로딩박스 제외할 url(ajax를 날리는 곳의 url 즉 레퍼러) 추가"
    ];
    var ignoreFlag = false;
    for (var i = 0; i < excludeUrl.length; i++) {
        if (refererUrl.split(excludeUrl[i]).length > 1) {
            ignoreFlag = true;
            break;
        }
    }
    if (ignoreFlag == false) {
        showLoading();
    }
}).ajaxComplete(function(event, jqxhr, settings) {
    if (!forceLoadingFlag) {
        hideLoading();
    }
}).ajaxStop(function() {
    if (!forceLoadingFlag) {
        hideLoading();
    }
});

function showLoading() {
    if ($("#loadingModal").length == 0) {
        var modal = $("<div id='loadingModal'/>");
        modal.css("position", "fixed");
        modal.css("width", "100%");
        modal.css("height", "100%");
        modal.css("top", "0");
        modal.css("left", "0");
        modal.css("background", "rgba(0,0,0,0.3)");
        modal.css("zIndex", "999998");

        var loading = $("<img id='loadingImg' src='" + CTX + "/img/magok_loading.gif'/>");
        loading.css("position", "fixed");
        loading.css("width", "300px");
        loading.css("height", "500px");
        loading.css("top", "calc(50% - 250px)");
        loading.css("left", "calc(50% - 150px)");
        loading.css("zIndex", "999999");

        $("body").append(modal);
        $("body").append(loading);
    }
}

function hideLoading() {
    $("#loadingModal").remove();
    $("#loadingImg").remove();
}

$(document).ready(function() {
    // makeWeatherIcon();
    $("form").submit(function() {
        return false;
    });
    $(".datePickOne").bootstrapMaterialDatePicker({ format: 'YYYY-MM-DD', time: false });
    $(".datePickStart").bootstrapMaterialDatePicker({ format: 'YYYY-MM-DD', time: false });
    $(".datePickEnd").bootstrapMaterialDatePicker({ format: 'YYYY-MM-DD', time: false });
    $(".datePickStart").on("change", function(evt, date) {
        $(".datePickEnd").bootstrapMaterialDatePicker("setMinDate", date);
    });
    $(".datePickEnd").on("change", function(evt, date) {
        $(".datePickStart").bootstrapMaterialDatePicker("setMaxDate", date);
    });

    // let maxMenuDropDownSize = 0;
    // $(".depth2").each(function(d2Idx, d2Entry) {
    //     let currentHeight = 10;
    //     let depth2Count = $(d2Entry).children("li").length;
    //     let depth3Count = 0;
    //     $(d2Entry).children("li").children("ul").each(function(d3Idx, d3Entry) {
    //         depth3Count += $(d3Entry).children("li").length;
    //     });
    //
    //     currentHeight += depth2Count * 32;
    //     currentHeight += depth3Count * 24;
    //
    //     if (maxMenuDropDownSize < currentHeight) {
    //         maxMenuDropDownSize = currentHeight;
    //     }
    // });
    // maxMenuDropDownSize += 8;
    //
    // document.styleSheets[0].addRule('#header #lnb #nav:hover ~ #bg', 'height: ' + (maxMenuDropDownSize + 80) + 'px !important;');
    // document.styleSheets[0].addRule('#header #lnb #nav > ul:hover ul', 'height: ' + maxMenuDropDownSize + 'px !important;');

});


function callWeatherApi() {
    let retObject = null;
    const skyIcon = {
        "SKY1PTY0": "01.svg" // 하늘: 맑음, 기상: 없음
            ,
        "SKY1PTY1": "05.svg" // 하늘: 맑음, 기상: 비
            ,
        "SKY1PTY2": "14.svg" // 하늘: 맑음, 기상: 비/눈
            ,
        "SKY1PTY3": "13.svg" // 하늘: 맑음, 기상: 눈
            ,
        "SKY1PTY4": "07.svg" // 하늘: 맑음, 기상: 소나기
            ,
        "SKY1PTY5": "06.svg" // 하늘: 맑음, 기상: 빗방울
            ,
        "SKY1PTY6": "14.svg" // 하늘: 맑음, 기상: 빗방울/눈날림
            ,
        "SKY1PTY7": "12.svg" // 하늘: 맑음, 기상: 눈날림
            ,
        "SKY3PTY0": "03.svg" // 하늘: 구름많음, 기상: 없음
            ,
        "SKY3PTY1": "05.svg" // 하늘: 구름많음, 기상: 비
            ,
        "SKY3PTY2": "14.svg" // 하늘: 구름많음, 기상: 비/눈
            ,
        "SKY3PTY3": "13.svg" // 하늘: 구름많음, 기상: 눈
            ,
        "SKY3PTY4": "07.svg" // 하늘: 구름많음, 기상: 소나기
            ,
        "SKY3PTY5": "06.svg" // 하늘: 구름많음, 기상: 빗방울
            ,
        "SKY3PTY6": "14.svg" // 하늘: 구름많음, 기상: 빗방울/눈날림
            ,
        "SKY3PTY7": "12.svg" // 하늘: 구름많음, 기상: 눈날림
            ,
        "SKY4PTY0": "04.svg" // 하늘: 흐림, 기상: 없음
            ,
        "SKY4PTY1": "05.svg" // 하늘: 흐림, 기상: 비
            ,
        "SKY4PTY2": "14.svg" // 하늘: 흐림, 기상: 비/눈
            ,
        "SKY4PTY3": "13.svg" // 하늘: 흐림, 기상: 눈
            ,
        "SKY4PTY4": "07.svg" // 하늘: 흐림, 기상: 소나기
            ,
        "SKY4PTY5": "06.svg" // 하늘: 흐림, 기상: 빗방울
            ,
        "SKY4PTY6": "14.svg" // 하늘: 흐림, 기상: 빗방울/눈날림
            ,
        "SKY4PTY7": "12.svg" // 하늘: 흐림, 기상: 눈날림
    }
    const skyIconText = {
        "SKY1PTY0": "맑음",
        "SKY1PTY1": "맑고 비",
        "SKY1PTY2": "맑고 비/눈",
        "SKY1PTY3": "맑고 눈",
        "SKY1PTY4": "맑고 소나기",
        "SKY1PTY5": "맑고 빗방울",
        "SKY1PTY6": "맑고 빗방울/눈날림",
        "SKY1PTY7": "맑고 눈날림",
        "SKY3PTY0": "구름많음",
        "SKY3PTY1": "구름많고 비",
        "SKY3PTY2": "구름많고 비/눈",
        "SKY3PTY3": "구름많고 눈",
        "SKY3PTY4": "구름많고 소나기",
        "SKY3PTY5": "구름많고 빗방울",
        "SKY3PTY6": "구름많고 빗방울/눈날림",
        "SKY3PTY7": "구름많고 눈날림",
        "SKY4PTY0": "흐림",
        "SKY4PTY1": "흐리고 비",
        "SKY4PTY2": "흐리고 비/눈",
        "SKY4PTY3": "흐리고 눈",
        "SKY4PTY4": "흐리고 소나기",
        "SKY4PTY5": "흐리고 빗방울",
        "SKY4PTY6": "흐리고 빗방울/눈날림",
        "SKY4PTY7": "흐리고 눈날림"
    }
    let searchDate = moment().format("YYYYMMDD");
    $.ajax({
        url: "https://mwadmin.energycity.kr/rest/weatherInfo?date=" + searchDate,
        async: false,
        method: "GET",
        success: function(result) {
            if (result.status == true) {
                function getTimeObject(resultList) {
                    let time = moment().format("HHmm");
                    let underTimes = [];
                    let overTimeTextList = [];
                    let overTimes = [];
                    let latestTime = "";
                    let beforeTime = "";
                    resultList.filter(function(entry) {
                        if (parseInt(entry.fcst_date + entry.fcst_time) <= parseInt(searchDate + time)) {
                            if (underTimes.indexOf(entry.fcst_time) < 0) {
                                underTimes.push(entry.fcst_time);
                            }
                        } else {
                            let entryObj = JSON.stringify({ date: entry.fcst_date, time: entry.fcst_time });
                            if (overTimeTextList.indexOf(entryObj) < 0 && overTimeTextList.length < 5) {
                                overTimeTextList.push(entryObj);
                            }
                        }
                    });
                    if (underTimes.length == 0) {
                        latestTime = resultList[0].fcst_time;
                    } else {
                        latestTime = underTimes.sort()[underTimes.length - 1];
                    }
                    overTimeTextList.forEach(function(entry) {
                        overTimes.push(JSON.parse(entry));
                    });
                    return {
                        nowDateTimeObj: {
                            date: searchDate,
                            time: latestTime
                        },
                        afterDateTimeObjList: overTimes
                    }
                }

                function getWeatherInfo(resultList, dateTimeObj) {
                    let weatherInfoObj = {};
                    resultList.filter(function(entry) {
                        if (entry.fcst_date == dateTimeObj.date && entry.fcst_time == dateTimeObj.time) {
                            weatherInfoObj = entry;
                        }
                    });
                    weatherInfoObj.DATE = moment(dateTimeObj.date, "YYYYMMDD").format("YYYY년 MM월 DD일");
                    weatherInfoObj.TIME = moment(dateTimeObj.time, "HHmm").format("HH시");
                    return weatherInfoObj;
                }

                let timeObject = getTimeObject(result.data);
                let nowWeather = getWeatherInfo(result.data, timeObject.nowDateTimeObj);


                let icon = skyIcon["SKY" + nowWeather.sky + "PTY" + nowWeather.pty];
                let iconText = skyIconText["SKY" + nowWeather.sky + "PTY" + nowWeather.pty];

                let nextWeatherList = [];
                timeObject.afterDateTimeObjList.forEach(function(entry) {
                    let nextWeather = getWeatherInfo(result.data, entry);
                    let nextIcon = skyIcon["SKY" + nextWeather.sky + "PTY" + nextWeather.pty];
                    let nextIconText = skyIconText["SKY" + nextWeather.sky + "PTY" + nextWeather.pty];
                    nextWeatherList.push({
                        data: nextWeather,
                        icon: nextIcon,
                        desc: nextIconText
                    });
                });

                retObject = {
                    now: {
                        data: nowWeather,
                        icon: icon,
                        desc: iconText
                    },
                    next: nextWeatherList
                };

            } else {
                console.error(result.message);
            }
        },
        error: function(xhr, stat, err) {
            console.log(xhr);
            console.log(stat);
            console.log(err);
        }
    });
    return retObject;
}

function makeWeatherIcon() {
    let weatherData = callWeatherApi();
    let now = weatherData.now;

    let temperature = now.data.t3h;
    let humidity = now.data.reh;

    $(".weather").html("");

    $(".weather").append("<span>" + temperature + "°C</span>");
    $(".weather").append("<span>" + now.desc + "</span>");
    $(".weather").css("background-image", "url(" + CTX + "/weatherIcon/" + now.icon + ")");

    let popupDiv = $("<div/>");
    popupDiv.attr("id", "weather_popup");
    popupDiv.css("position", "fixed");
    popupDiv.css("display", "none");
    popupDiv.css("width", "400px");
    popupDiv.css("height", "100px");
    popupDiv.css("background", "rgba(255,255,255,0.95)");
    popupDiv.css("top", "0");
    popupDiv.css("right", "0");
    // popupDiv.css("top", "0");
    // popupDiv.css("left", "0");
    popupDiv.css("z-index", "99999999");
    popupDiv.css("border-radius", "10px");

    let nextWeatherTable = $("<table/>");
    nextWeatherTable.css("border-collapse", "collapse");
    nextWeatherTable.css("width", "100%");
    nextWeatherTable.css("height", "100%");
    let nextWeatherTr = $("<tr/>");
    nextWeatherTable.append(nextWeatherTr);

    for (let i = 0; i < weatherData.next.length; i++) {
        let nextWeather = weatherData.next[i];
        let nextTableTd = $("<td/>");
        nextTableTd.html(`
			<p style="text-align: center; font-size: 0.74em; font-weight:600; color:#5d5d5d; line-height:1.6;">${nextWeather.data.TIME}</p>
			<p><img style="width:50%; height:100%; display:block; margin:0 auto;" src="/weatherIcon/${nextWeather.icon}"
				title="${nextWeather.data.DATE} ${nextWeather.data.TIME}\n기상 : ${nextWeather.desc}\n기온 : ${nextWeather.data.t3h}℃\n습도 : ${nextWeather.data.reh}%\n강수확률 : ${nextWeather.data.pop}%"></p>
			<p style="text-align: center; font-size: 0.8em; font-weight:600; color:#131313; line-height:1.2;">${nextWeather.data.t3h}℃</p>
			<p style="text-align: center; font-size: 0.8em; font-weight:600; color:#49a4ec;; line-height:1.2;">${nextWeather.data.reh}%</p>
		`);
        nextWeatherTr.append(nextTableTd);
    }

    popupDiv.append(nextWeatherTable);

    $(".weather").append(popupDiv);

    $(".weather").on("mousemove", function(e) {
        // $("#weather_popup").css("top", ( e.pageY + 50 ) + "px");
        // $("#weather_popup").css("left", ( e.pageX - 200 ) + "px");
        $("#weather_popup").css("top", "60px");
        $("#weather_popup").css("right", "120px");
        $("#weather_popup").show();
    });
    $(".weather").on("mouseleave", function(e) {
        $("#weather_popup").hide();
    });

}

let beforeHtmlOverflow = "";
$(document).ready(function() {
    $(".sitemapOpen").on("click", function() {
        $("#siteMap").addClass("active");
        $(".sitemapList").addClass("stable");
        $(".sitemapClose").css("height", "90px");
        beforeHtmlOverflow = $("html").css("overflow");
        $("html").css("overflow", "hidden");
    });

    function closeSiteMap() {
        $("#siteMap").removeClass("active");
        $(".sitemapList").removeClass("stable");
        $("html").css("overflow", beforeHtmlOverflow);
    }
    $(".sitemapClose").on("click", function() {
        closeSiteMap();
    });
});

const oldLocaleString = Number.prototype.toLocaleString;
Number.prototype.toLocaleString = function(locale){
    return oldLocaleString.call(parseFloat(this.toFixed(2)), locale);
}

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

/**
 * 문자 Null 체크
 * 
 * @param str 문자열
 * @param format 문자열 null 일경우 반환 값
 */
function isNullCheck(str, format){
	return (str == null || str == '') ? format : str;
}

/**
 * 문자 Null 체크2
 * 
 * @param str 문자열
 * @param result 문자열 not null 일경우 반환 값
 * @param result2 문자열 null 일경우 반환 값
 */
function isNullCheckReturn(str, result, result2){
	return (str == null || str == '') ? result2 : result; 
}

//_ValueNotNull 클래스에 대해서 빈값 체크
function valueNotNullCheck(msg){
	var elements = $('._ValueNotNull');
	
	for ( var index = 0; index < elements.size(); index++) {
		var element = elements.get(index);
		
		// disabled 는 체크하지 않는다.
		if($(element).attr("disabled") == undefined){
			var str = element.value;
		    var re = /.+/;
		    if(!str.trim().match(re)) {
		        alert(element.title + msg);
		        element.focus();
		        return false;
		    }
		}
	}
	
	return true;
}