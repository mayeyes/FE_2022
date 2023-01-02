var categoryLv2 =[];


$(document).ready(function(){
	$('#searchTableLv1').on({change : function(event) {
		var cnt = $("#searchTableLv2 option").size();
		for(var i=0;i<cnt;i++){
			if(i != 0){
				$("#searchTableLv2 option:last").remove();
			}
		}
		
		for(var i=0;i<categoryLv2.length;i++){
			if(categoryLv2[i].uppo == $('#searchTableLv1').val()){
				$("#searchTableLv2").append("<option value=\""+categoryLv2[i].bld_class_cd+"\">"+categoryLv2[i].bld_class_nm+"</option>");
			}
		}
	}
	});
});

function fnCategoryList() {
	$.ajax({
		url : "/sf/getCategory.json",
		method : "POST",
		data : "",
		//data : {"" : ""},
		dataType : "json",
		success: function(data){
			var category1 = data.category1;
			for(var i=0;i<category1.length;i++){
				if(category1[i].level == "1"){
					$("#searchTableLv1").append("<option value=\""+category1[i].bld_class_cd+"\">"+category1[i].bld_class_nm+"</option>");
					$("#categoryLv1").append("<option value=\""+category1[i].bld_class_cd+"\">"+category1[i].bld_class_nm+"</option>");
				}
				if(category1[i].level == "2"){
					categoryLv2.push(category1[i]);
				}
			}
		}
	});
}

function getToday() {
	let today = new Date();   

	let year = today.getFullYear(); // 년도
	let month = today.getMonth() + 1;  // 월
	let date = today.getDate();  // 날짜
	let day = today.getDay();  // 요일
	
	if(month.length > 2){
		month = "0"+month;
	}
	if(date.length > 2){
		date = "0"+date;
	}
	return year + '-' + month + '-' + date;
}


function fn_formatHH(cellvalue, options, rowObject) {
	return cellvalue.substr(0, 4) + "-" + cellvalue.substr(4, 2) + "-"
			+ cellvalue.substr(6, 2) + " :" + cellvalue.substr(8, 2);
}

function fn_page_move(url) {
	location.href=url;
}