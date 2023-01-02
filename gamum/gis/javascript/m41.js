
function loadingHide()
{
	$(".pop-loding").hide();
	$("#lodingBlockDv").hide();
}


function loadingShow(){		
		
	if($('#mainMapDiv_gc').offset())
	{
		$("#loading").css({"top":$('#btnTab1').offset().top+300,"left":$('#btnTab1').offset().left+330,"width":300,"height":150,"opacity":1});
		$("#lodingBlockDv").css({"top":$('#contentsarea').offset().top,
			 "left":0,
			 "width":2000,"height":1200});
		
		$(".pop-loding").show();
		$("#lodingBlockDv").show();
	}
}

function tab(num)
{
	if(num == "1")
	{
		$("#btnTab1").addClass("on");
		$("#btnTab2").removeClass("on");
		$("#btnTab3").removeClass("on");
		infoUrl = "m41_info01";
		mainMap.nosupplyLayer.setVisibility(false);
		mainMap.factoryLayer.setVisibility(false);
	}
	else if(num == "2")
	{
		$("#btnTab1").removeClass("on");
		$("#btnTab2").addClass("on");
		$("#btnTab3").removeClass("on");
		infoUrl = "m41_info02";
		mainMap.nosupplyLayer.setVisibility(true);
		mainMap.factoryLayer.setVisibility(false);
	}
	else if(num == "3")
	{
		$("#btnTab1").removeClass("on");
		$("#btnTab2").removeClass("on");
		$("#btnTab3").addClass("on");
		infoUrl = "m41_info03";
		mainMap.nosupplyLayer.setVisibility(false);
		mainMap.factoryLayer.setVisibility(true);
	}
	selTab = num;
	//DataPopupHide();
	
	if(queryType == "detail") 	 //읍면동선택
		showUMDInfo(hjdcd, $("#umdText").text());
	else if (queryType == "umd") //시군구선택
		showUMDInfo(hjdcd, $("#sggText").text());
	else if (queryType == "sgg") //시도선택
		showUMDInfo(hjdcd, $("#sidoText").text());
	else if (queryType == "sg")	//전국 
		showUMDInfo(hjdcd, "전국");
		
}

function executeMapImageExport() {
	var htmlStringValue = document.getElementById('htmlStringValue');
	
	// TODO mobile의 경우 하단 전망 및 개월전 부분이 하얗게 표시됨.
	
	htmlStringValue.value = generateHtmlPage();
	$('#widthValue').val(1000);
	$('#heightValue').val($("#facilities-mapbox").height());
	form.submit();
}
function generateHtmlPage() {
	var header = "<!DOCTYPE html>";
	header += '<html xml:lang="ko" lang="ko">';
	header += '<head>';
	header += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	header += '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
	header += '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />';
	header += '<meta name="description" content="" />';
	header += '<meta name="keywords" content="" />';
	header += '<meta name="subject" content="" />';
	header += '<style>';
	header += '.area-tabmenu {visibility:hidden}';
	header += '.facilities-mapbox {position:relative;width:100%;height:650px;padding: 0 15px;}';
	header += '#mainMapDiv{position:absolute;width:615px;right:15px;}';
	header += '.rightbox {right: 20px;top: 5px;width: 427px;}';
	header += ".rightbox .holder {float:left; width:87px; padding:0 0 0 24px; background:url('../images/icon/icon_dot_05.png') no-repeat 12px 14px; color:#fff; font-size:12px; line-height:37px}";
	header += '.rightbox {position:absolute; right:20px; top:20px; width:370px; height:35px; border-radius:18px; background:#353535}';
	header += '.rightbox > ul {float:left; width:283px; height:35px}';
	header += '.rightbox > ul > li {float:left; position:relative; height:35px; padding:0 15px; border-left:1px solid #4f4f4f}';
	header += ".rightbox > ul > li > a {display:block; position:relative; height:37px; z-index:50; padding:0 20px 0 0; background:url('../images/icon/icon_arr_07.png') no-repeat 100% 50%; font-size:12px; line-height:37px; color:#fff; text-decoration:none}";
	header += ".rightbox > ul > li .scrollbox {position:absolute; left:0; top:35px; z-index:40; width:100%; height:0; background:url('../images/analysisdata/bg_areatopmenu.png') repeat 0 0; border-radius:0 0 16px 16px}";
	header += '.rightbox > ul > li ul {width:90%; height:94%; margin:3% auto; overflow-x:hidden; overflow-y:auto}';
	header += '.rightbox > ul > li ul li {line-height:24px}';
	header += '.rightbox > ul > li ul li a {color:#fff}';	
	header += '.pop-datainfo .popcontents>button {float: right}';
	header += '.facilities-mapbox {position:relative; width:100%; height:650px; padding:0 15px}';
	header += '.facilities-mapbox .gis-maps {position:absolute;width:615px;right:15px; border:1px solid #b7b7b7; font-size:0}';
	header += '.facilities-mapbox .gis-maps > img {width:100%}';
	header += '.facilities-mapbox .gis-maps ul {position:absolute; top:200px; left:300px}';
	header += '.facilities-mapbox .gis-maps ul li {position:absolute; width:100%; margin:0 0 16px 0}';
	header += '.facilities-mapbox .gis-maps ul li span {display:block; width:30px; height:30px; font-size:0; text-indent:-99999px}';
	header += ".facilities-mapbox .gis-maps ul li.system-1 span {background:url('../images/analysisdata/icon_fountainhead_01.png') no-repeat 0 0}";
	header += ".facilities-mapbox .gis-maps ul li.system-2 span{background:url('../images/analysisdata/icon_fountainhead_02.png') no-repeat 0 0}";
	header += ".facilities-mapbox .gis-maps ul li.system-3 span {background:url('../images/analysisdata/icon_fountainhead_03.png') no-repeat 0 0}";
	header += ".facilities-mapbox .gis-maps ul li.system-4 span {background:url('../images/analysisdata/icon_fountainhead_04.png') no-repeat 0 0}";
	header += '</style>';
	for (i = 0; i < document.styleSheets.length; i++) {
		header += '<link href="' + document.styleSheets[i].href + '" rel="stylesheet" type="text/css" media="screen"/>';
	}
	header += '</head>';
	var body = "";
	body += '<div id="wrap">';
	body += '<div class="midarea" style="min-height: 762px;">';
	body += '<div class="contentsarea" id="contentsarea">';
	//body += '<div class="menu-situation" id="menu_contents" style="position: relative;">';
	body += document.getElementById('facilities-mapbox').outerHTML;
	//body += '</div>';
	body += '</div>';
	body += '</div>';
	body += '</div>';
	var strHtml = header + "<body>" + body + "</body></html>";
	strHtml = formatToSendingHTML(strHtml);
	return strHtml;
}

function slideUpRightbox(tabName, tabNum){
	if ($("."+tabName+" > ul > li:eq("+(tabNum-1)+")").hasClass("on")){
		$("."+tabName+" > ul > li:eq("+(tabNum-1)+") .scrollbox").stop().animate({height:"0"}, 500);
		$("."+tabName+" > ul > li:eq("+(tabNum-1)+")").removeClass("on");
	}
}

function onChangeSido(cd, nm, callback){
	slideUpRightbox('rightbox', 1);
	$('#sidoText').html(nm);
	$('#sggSelect').empty();
	$('#sggSelect').append('<li><a>선택</a></li>');
	$('#sggText').html("선택");
	$('#umdSelect').empty();
	$('#umdSelect').append('<li><a>선택</a></li>');
	$('#umdText').html("선택");
	if(cd != "")
	{
		OnselectSido(cd);
		//변수값 설정
		sd_cd = cd;
		sd_nm = nm;
		if(callback == null){
			sgg_cd = "";
			sgg_nm = "";
		}
		queryType = "sgg";
		mainMap.QueryFeatureExtent();
	}
	else
	{
		mainMap.fullExtent();
	}
	mainMap.featureLayer.clear();
	//DataPopupHide();
	if(callback == null){
	showUMDInfo(cd, nm);
	}
	if( typeof callback === "function" ) 
	{
		if(sgg_cd.length > 4)
			callback( a_sgcd, a_sgnm ); 
		else
			callback( a_sgcd + "0", a_sgnm ); 
	}

}
function onChangeSgg(cd, nm){
	slideUpRightbox('rightbox', 2);
	$('#sggText').html(nm);
	$('#umdSelect').empty();
	$('#umdSelect').append('<li><a>선택</a></li>');
	$('#umdText').html("선택");
	if(cd != "" && cd.length > 2)
	{
		OnselectSgg(cd);
		//변수값 설정
		sgg_cd = cd;
		sgg_nm = nm;
		queryType = "umd";
		mainMap.QueryFeatureExtent();
		if(selTab == 1) showUMDInfo(cd, nm);

		showUMDInfo(cd, nm);
	}
	else
	{
		sgg_cd = "";
		sgg_nm = "";
		queryType = "sgg";
		mainMap.QueryFeatureExtent();

		showUMDInfo(cd, $("#sidoText").text());
	}
	mainMap.featureLayer.clear();
	//DataPopupHide();

	
	
}
function onChangeUmd(cd, nm){
	slideUpRightbox('rightbox', 3);
	$('#umdText').html(nm);
	
	if(cd != "" && cd.length > 5){
		showUMDInfo(cd+'00', nm);
		mainMap.featureLayer.clear();
		mainMap.moveToUmd(cd);
	}
	else{
		queryType = "umd";
		mainMap.QueryFeatureExtent();
		showUMDInfo(cd, $("#sggText").text());
	}
}

function showNonWaterPointInfo(cd, decrst){
	if (decrst == "정상")
		decrst = "0";
	else if(decrst == "관심")
		decrst = "1";
	else if(decrst == "주의")
		decrst = "2";
	else if(decrst == "경계")
		decrst = "3";
	else if(decrst == "심각")
		decrst = "4";	
	
	$("#contents1").load(ctx + "/menu/m40/m41_non_info.do?code="+cd+"&decrst="+decrst, function(){
		DataPopupShow();
	});
}
function showIndInfoNm(industrialCode){
	
	$("#contents1").load(ctx + "/menu/m40/m41_fac_info.do?code="+ industrialCode, function(){
		DataPopupShow();
	});
}

/*
function showInfoPanel(){
	$(".right-tabmenu").addClass("on");
	$(".right-tabmenu > ul > li:eq(0)").addClass("on");
	$(".right-tabmenu").animate({width:"427px"}, 500);
	$(".right-tabmenu > ul > li:eq(0) > div").animate({left:"71px"}, 500, function(){
		$("#mainMapDiv").animate({width:"564px"}, 0.5, function(){
			mainMap.refresh();
		});
		$(".right-tabmenu > ul > li:eq(0) > div .listgroup").animate({opacity:"1"}, 0.5);
		$(".right-tabmenu .holder").animate({left:"405px"}, 0.5);
	});
}
function hideInfoPanel(){
	$(".right-tabmenu").removeClass("on");
	$(".right-tabmenu").animate({width:"92px"}, 500);
	$(".right-tabmenu > ul > li").removeClass("on");
	$("#mainMapDiv").animate({width:"900px"}, 0.5, function(){
		mainMap.refresh();
		$(".right-tabmenu > ul > li > div").animate({left:"-450px"}, 700, function(){
			$(".right-tabmenu > ul > li > div .listgroup").animate({opacity:"0"}, 100);
		});
	});
	$(".right-tabmenu .holder").animate({left:"71px"}, 300);
	$(".right-tabmenu > ul > li:eq(0)").addClass("on");
}
*/

function OnselectSido(sd_cd){
	$.ajax({
		type : 'GET',
		url : ctx + '/menu/m50/selectList.do',
		data : {'action':'getSgg','sd_cd':sd_cd},
		dataType : 'json',
		success : function (jsonObj) {
			$('#sggSelect').empty();
			$('#sggSelect').append("<li><a href=\"javascript:onChangeSgg('"+sd_cd+"','전체')\">전체</a></li>");
			$('#sggText').html("전체");
			$.each(jsonObj, function(index , record) {
				$('#sggSelect').append("<li><a href=\"javascript:onChangeSgg('"+record.sggCd+"','"+record.sggNm+"')\">"+record.sggNm+"</a></li>");
			});
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function OnselectSgg(sgg_cd){
	sggcd=sgg_cd.substr(0,4);

	if(sgg_cd.substr(0,2)<=30||sgg_cd.substr(0,2)>=50){
		sggcd=sgg_cd.substr(0,2)+"00";
	}
	$.ajax({
		type : 'GET',
		url : ctx + '/menu/m50/selectList.do',
		data : {'action':'getUmd','sgg_cd':sgg_cd},
		dataType : 'json',
		success : function (jsonObj) {
			$('#umdSelect').empty();
			$('#umdSelect').append("<li><a href=\"javascript:onChangeUmd('"+sgg_cd+"','전체')\">전체</a></li>");
			$('#umdText').html("전체");
			$.each(jsonObj, function(index , record) {
				
				$('#umdSelect').append("<li><a href=\"javascript:onChangeUmd('"+record.emdCd+"','"+record.emdNm+"')\">"+record.emdNm+"</a></li>");
			});
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

var selTab = 1;
var infoUrl = "m41_info01";
var hjdcd = "";


function showUMDInfo(value, nm){
	hjdcd = value;
	var encnm = encodeURIComponent(nm);
	loadingShow();
	
	$("#contents1").load(ctx + "/menu/m40/" + infoUrl + ".do?hjdcd="+value+"&nm="+encnm, function(){
		DataPopupShow();
		$("#name1").text(nm);
		$("#name2").text(nm);
		$("#name3").text(nm);
		$("#name4").text(nm);
		
		if (infoUrl == "m41_info01"){
			$("#btnDetail1").attr("onClick","javascript:showDetail1('"+hjdcd+"')");
			$("#btnDetail2").attr("onClick","javascript:showDetail2('"+hjdcd+"')");
			$("#btnAddSupport").attr("onClick","javascript:showSupportInputBox('"+hjdcd+"')");
		}
		else if (infoUrl == "m41_info02"){
			$("#btnDetail3").attr("onClick","javascript:showDetail3('"+hjdcd+"')");
			$("#btnDetail4").attr("onClick","javascript:showDetail4('"+hjdcd+"')");
		}
		else if (infoUrl == "m41_info03"){
			$("#btnDetail5").attr("onClick","javascript:showDetail5('"+hjdcd+"')");
			$("#btnDetail6").attr("onClick","javascript:showDetail6('"+hjdcd+"')");
		}
				
		loadingHide();
	});
		
	/*
	$("#contents2").load(ctx + "/menu/m40/m41_info02.do?hjdcd="+value+"00&wr_date=2016-11-17");
	$("#contents3").load(ctx + "/menu/m40/m41_info03.do?hjdcd="+value+"00&wr_date=2016-11-17");
	*/

}
function DataPopupShow()
{
	//$(".pop-datainfo").css({"top":$("#mainMapDiv").offset().top+5,"left":$("#mainMapDiv").offset().left+5});
	//$(".pop-datainfo").show();
	//$("#contents1").show();
	//$(".btn_toggleon").show();
	//$(".btn_toggleoff").hide();
	$(".pop-datainfo div .listgroup").animate({opacity:"1"}, 0.5);

}
function DataPopupHide()
{
	//$(".pop-datainfo").hide();
	//$("#contents1").hide();
	//$(".btn_toggleon").hide();
	//$(".btn_toggleoff").show();
	$(".pop-manageinfo").hide();
}
function ManagePopupHide()
{
	$(".pop-manageinfo").hide();
}

//취정배수장 운영정보(값, 광역구분, 취a정b구분
function showUMDInfoShow(value, admdv, type){
	
	
	var paramData  = {"code":value, "type": type,"sgg_cd":sggcd};
	
	$.ajax({
		type : 'POST',
		url : ctx + '/menu/m40/selectYearDate.do',
		data : paramData,
		dataType : 'json',
		success : function (list1) {
			var innerHtml = "";
			$("#year").html(innerHtml);
			var ck =list1.list1;
			if(ck=="undefined" || ck == null || ck =='' || ck=='null'){
					alert("운영정보가 없습니다.");
					$(".pop-manageinfo").hide();	
			}else{
			if (list1.list1.length > 0){
				var year=new Date().getFullYear();
				$.each(list1.list1 , function(idx,item){
					if(item.year<=year){
						innerHtml += "<option value="+item.year+" selected>"+item.year+"</option>";
					}
				});
				$("#year").append(innerHtml);
				
				$("#btnSearch").attr("onclick", "javascript:showUMDInfoDetail('"+ value+"','"+ admdv + "','"+type+"')");
				showUMDInfoDetail(value, admdv, type);
			}else{
				alert("운영정보가 없습니다.");
				$(".pop-manageinfo").hide();
			}
			}
			
		}
	});
}

function showUMDInfoDetail(value, admdv, type){
	//var paramData  = {"code":value, "obsymd" : $("#event_from").val() , "obsymd2" : $("#event_to").val(), "type" : type };
	var paramData =""
	if(selTab=="3"){
		paramData  = {"code":value, "type": type, "year" : $("#year").val(),"sgg_cd":sggcd,"dv":"공업"};
	}else{
		 paramData  = {"code":value, "type": type, "year" : $("#year").val(),"sgg_cd":sggcd};
		
	}
	
	console.log(paramData);
	var chartCategory = [];
	var chartData1 = [];
	var chartData2 = [];
	var setStep=0;
	
	
	$("#showBaseSpec").css({"top":$("#showBaseSpec").offset(),"left":$("#showBaseSpec").offset()});
	
	if($("#showBaseSpec").offset().left == 0)
		$("#showBaseSpec").css({"top":$("#mainMapDiv").offset().top+50,"left":$("#mainMapDiv").offset().left+260});
	
	
	$("#showBaseSpec").show();
	
	
	$.ajax({
		type : 'POST',
		url : ctx + '/menu/m40/selectSumAvgData1.do',
		data : paramData,
		dataType : 'json',
		success : function (list) {
			var tmpList = list.list1;
			var nameStr;
			
			if(type =='a')
				nameStr = "취수량(" +( $("#year").val()) + "년)";
			else
				nameStr = "공급량(" +( $("#year").val()) + "년)";
			
			if(tmpList == "null")
			{
				alert("운영정보가 없습니다.");
				$(".pop-manageinfo").hide();
			}
			else
			{
				var tmpList2 = list.list2;
				
				chartData1 = $.map(tmpList, function(n,i){ return [ n.sumdata ]; });
				//chartData1=comma(chartData1);
				
				chartCategory =  $.map(tmpList, function(n,i){ return [ n.dt + "월" ]; });
				var itemHTMLAddr = '';
				
	
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				itemHTMLAddr += '<col style="width:50px"/>';
				$("#damifcg").html(itemHTMLAddr);
				
				itemHTMLAddr +='<tr>';
				if (tmpList2.length > 1){
				itemHTMLAddr +='<th scope="row">일<br /></th>';
				}else{
				itemHTMLAddr +='<th scope="row">년<br /></th>';
				}
				itemHTMLAddr +='<th scope="row">1월</th>';
				itemHTMLAddr +='<th scope="row">2월</th>';
				itemHTMLAddr +='<th scope="row">3월</th>';
				itemHTMLAddr +='<th scope="row">4월</th>';
				itemHTMLAddr +='<th scope="row">5월</th>';
				itemHTMLAddr +='<th scope="row">6월</th>';
				itemHTMLAddr +='<th scope="row">7월</th>';
				itemHTMLAddr +='<th scope="row">8월</th>';
				itemHTMLAddr +='<th scope="row">9월</th>';
				itemHTMLAddr +='<th scope="row">10월</th>';
				itemHTMLAddr +='<th scope="row">11월</th>';
				itemHTMLAddr +='<th scope="row">12월</th>';
				itemHTMLAddr +='</tr>';
				$("#damiftt").html(itemHTMLAddr);
				itemHTMLAddr = '';
				var ableCnt = 0;
				if (tmpList2.length > 0){
					$.each(tmpList2 , function(idx,item){
						ableCnt++;
						if (item.month1 == "0" && item.month2 == "0" &&item.month8 == "0" && item.month7 == "0" &&
						item.month3 == "0" &&item.month9 == "0" &&item.month4 == "0" &&item.month10 == "0" &&
						item.month5 == "0" &&item.month11 == "0" &&	item.month6 == "0" &&item.month12 == "0" )
						{
							//값이 0일때 아무것도 실행하지않음
						}
						else{
							itemHTMLAddr += '<tr><td>' + item.day +'</th>';
							itemHTMLAddr += '<td>' + item.month1 +'</td>';
							itemHTMLAddr += '<td>' + item.month2 +'</td>';
							itemHTMLAddr += '<td>' + item.month3 +'</td>';
							itemHTMLAddr += '<td>' + item.month4 +'</td>';
							itemHTMLAddr += '<td>' + item.month5 +'</td>';
							itemHTMLAddr += '<td>' + item.month6 +'</td>';
							itemHTMLAddr += '<td>' + item.month7 +'</td>';
							itemHTMLAddr += '<td>' + item.month8 +'</td>';
							itemHTMLAddr += '<td>' + item.month9 +'</td>';
							itemHTMLAddr += '<td>' + item.month10 +'</td>';
							itemHTMLAddr += '<td>' + item.month11 +'</td>';
							itemHTMLAddr += '<td>' + item.month12 +'</td>';
						}
					});
					$("#tmpBoard").css("overflow","");
				}
				if (ableCnt == 0){
					itemHTMLAddr += '<tr><th scope="col" colspan="13">검색 결과가 없습니다.</td></tr>';
				}	
	
				$("#damiftb").html(itemHTMLAddr);
				
				 Highcharts.setOptions({
					    lang: {
					      thousandsSep: ','
					    }
					  });
				
				var chart = $('#chartContainer').highcharts({
			        title: {
			            text: '',
			            x: -20 //center
			        },
			        subtitle: {
			            text: '',
			            x: -20
			        },
			        xAxis: {
			            categories: chartCategory,
			            crosshair: true
			        },
			        yAxis: [{ // Primary yAxis
			            labels: {
			            	formatter: function () {
			                    return (this.value / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ '(천㎥/월)';
			                },
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            },
			            title: {
			                text: '',
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            }
			        }, { // Secondary yAxis
			            title: {
			                text: '',
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			            labels: {
			                format: '{value:,.0f}(㎥/일)',
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			            opposite: true
			        }],
			        tooltip: {
			            valueSuffix: ''
			        },
			        legend: {
			            enabled: true
			        },
			        series: [{
			        	name: nameStr , 	 //keyNm,
			        	data: chartData1, //chartData1
			        	type: 'column'
			        }],
			        credits: { enabled: false }, //사이트링크제거
				    navigation: {
			            buttonOptions: {
			                verticalAlign: 'bottom',
			                y: -5
			            }
			        }
			    });
	
			}
		}
	});
}

function showSupplyNum(val){
	$("#supply1").css("display", "none");
	$("#supply2").css("display", "none");
	$("#supply3").css("display", "none");
	$("#supply"+val).css("display", "block");
}
function showMapSupInfo(type, cd)
{
	mainMap.featureLayer.queryFeature(type, cd);
}

$(function(){
	var dateFormat = "mm/dd/yy", 
	from = $( "#event_from" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1
	})
	.on("change", function(){
		to.datepicker( "option", "minDate", getDate( this ) );
	}),
	to = $( "#event_to" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1
	})
	.on( "change", function() {
		from.datepicker( "option", "maxDate", getDate( this ) );
	});
	function getDate( element ) {
		var date;
		try {
			date = $.datepicker.parseDate( dateFormat, element.value );
		} catch( error ) {
			date = null;
		}
		return date;
	}
	//slideToggle('leftbox')
});

//생활용수 급수지역 수원현황 상세
function showDetail1(hjdcd){
	loadingShow();
	var paramData  = {"hjdcd":hjdcd };

	$.ajax({
		type : 'POST',
		url : ctx + '/menu/m40/selectInfoWaterSourceDetail.do',
		data : paramData,
		dataType : 'json',
		success : function (list) {
			var tmpList = list.list1;
			var tmpList2 = list.list2;
			var itemHTMLAddr = '';
			if (tmpList.length > 0){
				$.each(tmpList , function(idx,item){
					itemHTMLAddr += '<tr><th scope="col">' + (idx + 1) +'</th>';
					itemHTMLAddr += '<td>' + item.damdvnm +'</td>';
					itemHTMLAddr += '<td>' + item.sitenm +'</td>';
					itemHTMLAddr += '<td>' + item.value1 +'</td>';
					itemHTMLAddr += '<td>' + item.value2 +'</td>';
					itemHTMLAddr += '<td>' + item.value3 +'</td></tr>';
				});
			}
			else{
				itemHTMLAddr += '<td colspan="6">검색결과가 없습니다.</td>';
			}
			$("#tbodySource1").html(itemHTMLAddr);
			
			itemHTMLAddr = '';
			if (tmpList2.length > 0){
				$.each(tmpList2 , function(idx,item){
					itemHTMLAddr += '<tr><th scope="col">' + (idx+1) +'</th>';
					itemHTMLAddr += '<td>' + item.waternm +'</td>';
					itemHTMLAddr += '<td>' + item.riverGradeNm +'</td>';
					itemHTMLAddr += '<td>' + item.msNm +'</td>';
					itemHTMLAddr += '<td>' + item.bsNm +'</td>';
				});
			}
			else{
				itemHTMLAddr += '<td colspan="6">검색결과가 없습니다.</td>';
			}
			$("#tbodySource2").html(itemHTMLAddr);
			
			loadingHide();			
		}
	
	});
	$("#supportDetail").hide();
	$("#waterSourceDetail").css({"top":$("#mainMapDiv").offset().top+5,"left":$("#mainMapDiv").offset().left+150});
	$("#waterSourceDetail").show();
	
}

/* 생활용수 급수지역 > 비상급수현황 > 상세 보기*/
function showDetail2(hjdcd){
	loadingShow();
	var paramData  = {"hjdcd":hjdcd };

	$.ajax({
		type : 'POST',
		url : ctx + '/menu/m40/selectInfoSupportDetail.do',
		data : paramData,
		dataType : 'json',
		success : function (list) {
			var tmpList = list.list1;
			var itemHTMLAddr = '';
			if (tmpList.length > 0){
				$.each(tmpList , function(idx,item){
					itemHTMLAddr += '<tr><th scope="col">' + (idx + 1 ) +'</th>';
					itemHTMLAddr += '<td>' + item.addr +'</td>';
					itemHTMLAddr += '<td>' + item.ltype +'</td>';
					itemHTMLAddr += '<td>' + item.lmtpopcnt +'</td>';
					//itemHTMLAddr += '<td>' + item.cycl +'</td>';
//					itemHTMLAddr += '<td>' + item.trsqty +'</td>';
				});
			}
			else{
				itemHTMLAddr += '<td colspan="4">검색결과가 없습니다.</td>';
			}
			$("#tbodySupport").html(itemHTMLAddr);
			
			loadingHide();
			
		}
	});
	$("#waterSourceDetail").hide();
	$("#supportDetail").css({"top":$("#mainMapDiv").offset().top+5,"left":$("#mainMapDiv").offset().left+150});
	$("#supportDetail").show();
}
function initSupportInputBox(){
	$('input:radio[name="sup_type"][value="supArea"]').prop('checked',true);
	$("#select3_sdumd").empty();
	$("#select3_sdumd").getUmd({
		"url": ctx + '/menu/m40/selectdrSupportUMD.do' ,
		"sgg_cd" : $("#select2_sdsg option:eq(0)").val() ,
		"value" : "",
		"dv" : "selectdrSupportUMD",
		"isFirst" : false
	});
	$("#inp_suplpu").val($("#select3_sdumd option:selected").attr("suplppcnt"));
	$("#inp_suplrt").val($("#select3_sdumd option:selected").attr("suplrt"));
	
	$("#select4_sdpnucd").change(function() {
		$("#inp_suplpu").val($("#select4_sdpnucd option:selected").attr("suplppcnt"));
	});
	$("#dynNm").text("급수율");
	$("#td_pnucd").hide();
	$("#td_suplrt").show();
	$("#sptdt").datepicker();
	//$(".scrollbox").css({"height":230});
	fn_getSupportList('support');
}
function showSupportInputBox(hjdcd){
	
	initSupportInputBox();
	
	$("input[name=sup_type]").change(function() {
		var radioValue = $(this).val();
		if (radioValue == "supArea") {
			$("#select3_sdumd").empty();
			$("#select3_sdumd").getUmd({
				"url": ctx + '/menu/m40/selectdrSupportUMD.do' ,
				"sgg_cd" : $("#select2_sdsg option:eq(0)").val() ,
				"value" : "",
				"dv" : "selectdrSupportUMD",
				"isFirst" : false
			});
			
			$("#dynNm").text("급수율");
			$("#th_sisulnm").hide();
			$("#th_suplrt").show();
			$("#td_suplrt").show();
			$("#td_pnucd").hide();
			$("#inp_suplpu").val($("#select3_sdumd option:selected").attr("suplppcnt"));
			$("#inp_suplrt").val($("#select3_sdumd option:selected").attr("suplrt"));
			fn_getSupportList('support');
			//$(".scrollbox").css({"height":370});
		} else if (radioValue == "noSupArea") {
			$("#select3_sdumd").empty();
			$("#select3_sdumd").getUmd({
				"url": ctx + '/menu/m40/selectdrNoSupportUMD.do' ,
				"sgg_cd" : $("#select2_sdsg option:eq(0)").val() ,
				"value" : "",
				"dv" : "selectdrNoSupportUMD",
				"isFirst" : false
			});
			
			$("#select4_sdpnucd").empty();
			$("#select4_sdpnucd").getPNU({
				"url": ctx + '/menu/m40/selectdrNoSupportPNU.do' ,
				"hjdcd" : $("#select3_sdumd option:selected").val() ,
				"value" : "",
				"isFirst" : false
			});
			
			$("#dynNm").text("시설명");
			$("#th_sisulnm").show();
			$("#th_suplrt").hide()
			$("#td_suplrt").hide();
			$("#td_pnucd").show();
			$("#inp_suplpu").val($("#select4_sdpnucd option:selected").attr("suplppcnt"));
			fn_getSupportList('NoSupport');
			//$(".scrollbox").css({"height":400});
		} 
	});
	
	$("#select3_sdumd").change(function() {
		$("#inp_suplpu").val($("#select3_sdumd option:selected").attr("suplppcnt"));
		$("#inp_suplrt").val($("#select3_sdumd option:selected").attr("suplrt"));
		if($("input[name=sup_type]:checked").val() == "noSupArea"){
			$("#select4_sdpnucd").empty();
			$("#select4_sdpnucd").getPNU({
				"url": ctx + '/menu/m40/selectdrNoSupportPNU.do' ,
				"hjdcd" : $("#select3_sdumd option:selected").val() ,
				"value" : "",
				"isFirst" : false
			});
		}
		
	});
	$("#supportInputBox").css({"top":$("#mainMapDiv").offset().top+5,"left":$("#mainMapDiv").offset().left+280});
	$("#supportInputBox").show();
}

function fn_insertSup(userId){
	if($("#sptdt").val()==""){
		alert("지원날짜를 입력해 주세요.");
		return;
	}
	
	var paramData = {};
	var url = "insertdrSupport.do";
	if($("input[name=sup_type]:checked").val() == "noSupArea"){
		paramData.pnucd = $("#select4_sdpnucd option:selected").val();
		url = "insertdrNoSupport.do";
	}
	paramData.sptdt = $("#sptdt").val() ;
	paramData.hjdcd = $("#select3_sdumd option:selected").val();	
	paramData.wwg = $("#inp_wwg").val();
	paramData.l1_2 = $("#inp_l1_2").val();
	paramData.l2 = $("#inp_l2").val();
	paramData.remark = $("#inp_remark").val();
	paramData.regId = userId;
	
	$.ajax({
        url:url,
        type:'POST',
        data: paramData,
        success:function(data){
            alert("입력이 완료되었습니다.");
            $("#sptdt").val("");
            $("#inp_wwg").val("");
            $("#inp_l1_2").val("");
            $("#inp_l2").val("");
            $("#inp_remark").val("");
            if($("input[name=sup_type]:checked").val() == "noSupArea"){
            	fn_getSupportList('NoSupport');
        	}else {
        		fn_getSupportList('support');
        	}
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("오류발생 \n" + textStatus + " : " + errorThrown);
        }
    });
}
function fn_getSupportList(type){
	var paramData = {};
	
	if(level == "02"){
		//alert("시도관리자");
		paramData.hjdcd = a_sdcd;
	}
	else{
		//alert("시군구관리자");
		paramData.hjdcd = a_sgcd;
	}
	
	//paramData.hjdcd = $("#select2_sdsg option:selected").val();
	$("#tbodySupportData").empty();
	var url= "";
	if( type == "support"){
		url = '/menu/m40/selectInfoSupportDetailToday.do';
	}else {
		url = '/menu/m40/selectInfoNoSupportDetailToday.do';
	}
	$.ajax({
		url: url,
		cache:false,
		dataType :"json",
		data : paramData,
		type:"post",
		cache:false,
		success : function(data,s,j ){
			var list = data.list;
			var itemHTMLAddr = '';
			if(list.length ==0){
				var tr = $("<tr/>").append($("<td colspan='8' />").text("금일 등록된 내용이 없습니다.").css("text-align","center"));
				$("#tbodySupportData").append(tr);
			}else{
				$.each(list , function(idx,item){
					if(list.length-1 == idx){
						itemHTMLAddr += '<tr style="border-bottom: 1px solid #b7b7b7">'; 
					}else {
						itemHTMLAddr += '<tr>';	
					}
					
					itemHTMLAddr += '<th scope="col">' + item.umdnm +'</th>';
					if( type == "NoSupport"){
						itemHTMLAddr += '<td>' + item.fntnm +'</td>';
					}
					itemHTMLAddr += '<td>' + item.sptdt +'</td>';
					itemHTMLAddr += '<td>' + item.suplppcnt +'</td>';
					if( type == "support"){
						itemHTMLAddr += '<td>' + item.suplrt +'</td>';
					}
					itemHTMLAddr += '<td>' + item.wwg +'</td>';
					itemHTMLAddr += '<td>' + item.l12 +'</td>';
					itemHTMLAddr += '<td>' + item.l2 +'</td>';
					itemHTMLAddr += '<td>' + item.remark +'</td>';
					itemHTMLAddr += '</tr>';
				});
				$("#tbodySupportData").html(itemHTMLAddr);
				
			}
		}
	});
}

function showDetail3(hjdcd){
	loadingShow();
	var paramData  = {"hjdcd":hjdcd };

	$.ajax({
		type : 'POST',
		url : ctx + '/menu/m40/selectInfoNosupBasicUMDDetail.do',
		data : paramData,
		dataType : 'json',
		success : function (list) {
			var tmpList = list.list1;
			var itemHTMLAddr = '';
			if (tmpList.length > 0){
				$.each(tmpList , function(idx,item){
					itemHTMLAddr += '<tr><th scope="col">' + (idx+1) +'</th>';
					if (item.fntdv == "마을상수도")
						itemHTMLAddr += '<td>마을</td>';
					else
						itemHTMLAddr += '<td>소규모</td>';
						
					itemHTMLAddr += '<td>' + item.rinm +'</td>'; 
					itemHTMLAddr += '<td>' + item.townnm +'</td>'; 
					itemHTMLAddr += '<td>' + item.fntnm +'</td>';
					itemHTMLAddr += '<td>' + item.suplhomecnt +'</td>';
					itemHTMLAddr += '<td>' + item.suplppcnt +'</td>';
					itemHTMLAddr += '<td>' + item.fntqty +'</td>';
					itemHTMLAddr += '<td>' + item.useqty +'</td></tr>';
				});
			}
			else{
				itemHTMLAddr += '<td colspan="9">검색결과가 없습니다.</td>';
			}
			$("#tbodyNonSupportInfoDetail").html(itemHTMLAddr);
			
			loadingHide();
			
		}
	});

	$("#supportInfoDetail").css({"top":$("#mainMapDiv").offset().top+5,"left":$("#mainMapDiv").offset().left+150});
	$("#supportInfoDetail").show();
}

function showDetail4(hjdcd){
	loadingShow();
	var paramData  = {"hjdcd":hjdcd };

	$.ajax({
		type : 'POST',
		url : ctx + '/menu/m40/selectInfoNonSupplyDetail.do',
		data : paramData,
		dataType : 'json',
		success : function (list) {
			var tmpList = list.list1;
			var itemHTMLAddr = '';
			if (tmpList.length > 0){
				$.each(tmpList , function(idx,item){
					itemHTMLAddr += '<tr><th scope="col">' + (idx + 1 ) +'</th>';
					itemHTMLAddr += '<td>' + item.addr +'</td>';
					itemHTMLAddr += '<td>' + item.ltype +'</td>';
					itemHTMLAddr += '<td>' + item.lmtpopcnt +'</td>';
					itemHTMLAddr += '<td>' + item.cycl +'</td>';
					itemHTMLAddr += '<td>' + item.trsqty +'</td>';
				});
			}
			else{
				itemHTMLAddr += '<td colspan="6">검색결과가 없습니다.</td>';
			}
			$("#tbodyNonSupportDetail").html(itemHTMLAddr);

			loadingHide();
			
		}
	});

	$("#supportNonSupportDetail").css({"top":$("#mainMapDiv").offset().top+5,"left":$("#mainMapDiv").offset().left+150});
	$("#supportNonSupportDetail").show();
}

function showDetail5(hjdcd){
	loadingShow();
	var paramData  = {"hjdcd":hjdcd };

	$.ajax({
		type : 'POST',
		url : ctx + '/menu/m40/selectInfoFacBasicUMDDetail.do',
		data : paramData,
		dataType : 'json',
		success : function (list) {
			var tmpList = list.list1;
			var itemHTMLAddr = '';
			if (tmpList.length > 0){
				$.each(tmpList , function(idx,item){
					itemHTMLAddr += '<tr><th scope="col">' + (idx + 1) +'</th>';
					itemHTMLAddr += '<td>' + item.inddv  +'</td>';
					itemHTMLAddr += '<td>' + item.indnm +'</td>';
					if(item.corpcnt==null){
						itemHTMLAddr += '<td> - </td>';
					}else{
						itemHTMLAddr += '<td>' + item.corpcnt +'</td>';
					}
					if(item.davguseqty==null){
						itemHTMLAddr += '<td> - </td>';
					}else{
						itemHTMLAddr += '<td>' + item.davguseqty +'</td>';
					}
					if(item.sitenm==null){
						itemHTMLAddr += '<td> - </td>';
					}else{
						itemHTMLAddr += '<td>' + item.sitenm +'</td></tr>';
					}
				});
			}
			else{
				itemHTMLAddr += '<td colspan="6">검색결과가 없습니다.</td>';
			}
			$("#tbodyIndDetail").html(itemHTMLAddr);

			loadingHide();
			
		}
	});

	$("#supportIndDetail").css({"top":$("#mainMapDiv").offset().top+5,"left":$("#mainMapDiv").offset().left+150});
	$("#supportIndDetail").show();
}


function showDetail6(hjdcd){
	loadingShow();
	var paramData  = {"hjdcd":hjdcd };
	$.ajax({
		type : 'POST',
		url : ctx + '/menu/m40/selectInfoFacWaterSourceDetail.do',
		data : paramData,
		dataType : 'json',
		success : function (list) {
			var tmpList = list.list1;
			var tmpList2 = list.list2;
			var itemHTMLAddr = '';
			if (tmpList.length > 0){
				$.each(tmpList , function(idx,item){
					itemHTMLAddr += '<tr><th scope="col">' + (idx + 1) +'</th>';
					itemHTMLAddr += '<td>' + item.damdvnm +'</td>';
					itemHTMLAddr += '<td>' + item.sitenm +'</th>';
					itemHTMLAddr += '<td>' + item.value1 +'</td>';
					itemHTMLAddr += '<td>' + item.value2 +'</td>';
					itemHTMLAddr += '<td>' + item.value3 +'</td></tr>';
				});
			}
			else{
				itemHTMLAddr += '<td colspan="6">검색결과가 없습니다.</td>';
			}
			$("#tbodyIndSource1").html(itemHTMLAddr);
			
			itemHTMLAddr = '';
			if (tmpList2.length > 0){
				$.each(tmpList2 , function(idx,item){
					itemHTMLAddr += '<tr><th scope="col">' + (idx+1) +'</th>';
					itemHTMLAddr += '<td>' + item.waternm +'</td>';
					itemHTMLAddr += '<td>' + item.riverGradeNm +'</td>';
					itemHTMLAddr += '<td>' + item.msNm +'</td>';
					itemHTMLAddr += '<td>' + item.bsNm +'</td>';
				});
			}
			else{
				itemHTMLAddr += '<td colspan="5">검색결과가 없습니다.</td>';
			}
			$("#tbodyIndSource2").html(itemHTMLAddr);

			loadingHide();
			
		}
	});

	$("#waterIndSourceDetail").css({"top":$("#mainMapDiv").offset().top+5,"left":$("#mainMapDiv").offset().left+150});
	$("#waterIndSourceDetail").show();
}

function sleep(num){
	 var now = new Date();
	   var stop = now.getTime() + num;
	   while(true){
		 now = new Date();
		 if(now.getTime() > stop)return;
	   }
}

function OpenDroughtInfo(hjdcd, hjdnm)
{
	window.open('/menu/m50/m54.do?hjdcd='+hjdcd+'&hjdnm='+escape(encodeURIComponent($("#name1").text())));
}
function OpenDroughtVilage(hjdcd)
{
	window.open('/menu/m50/m51.do?hjdcd='+hjdcd);
}
function comma(num){
    var len, point, str; 
       
    num = num + ""; 
    point = num.length % 3 ;
    len = num.length; 
   
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
     
    return str;
 
}
