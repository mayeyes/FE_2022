function autoOn(){
	var autoOnId = document.getElementById("autoCompleteToOn");
	var autoOffId = document.getElementById("autoComplete");
	var autoListOnId = document.getElementById("rcmdResult");

	if(autoOnId.style.display=='none'){
		autoOnId.style.display = 'block';

		autoListOnId.style.display = 'none';
		autoOffId.style.display = 'none';
	}else{
		autoOnId.style.display = 'none';

		autoListOnId.style.display = 'block';
		autoOffId.style.display = 'block';
	}
}
function autoOff(){
	var autoOffId = document.getElementById("autoComplete");
	var autoOnId = document.getElementById("autoCompleteToOn");
	var autoListOffId = document.getElementById("rcmdResult");

	if(autoOffId.style.display=='none'){
		autoOffId.style.display = 'block';
		autoListOffId.style.display = 'block';

		autoOnId.style.display = 'none';
	}else{
		autoOffId.style.display = 'none';
		autoListOffId.style.display = 'none';

		autoOnId.style.display = 'block';
	}
}

function detailOpen(){
	var detailId = document.getElementById("detailSearch");

	if(detailId.style.display == 'none'){
		detailId.style.display = 'block';
	}else{
		detailId.style.display = 'none';
	}
}

function Mmenu(){
	var Mmn = document.getElementById("M_menu");
	var Mmn = document.getElementById("M_menu");

	if(Mmn.style.display == 'none'){
		Mmn.style.display = 'block';
	}else{
		Mmn.style.display = 'none';
	}
}

/*분야별 토픽 onfocus*/
function topicFunction(change){
	var Stopic = document.getElementById("tc_title_on");
	var Stopic2 = document.getElementById("tc_title_on2");
	var Stopic3 = document.getElementById("tc_title_on3");
	var Stopic4 = document.getElementById("tc_title_on4");

	var topic_text= document.getElementById("tc_text_on");
	var topic_text2= document.getElementById("tc_text_on2");
	var topic_text3= document.getElementById("tc_text_on3");
	var topic_text4= document.getElementById("tc_text_on4");

	if(change == "one"){
		//alert("O");
		Stopic.style.backgroundColor="#fff";
		Stopic2.style.backgroundColor="#f5f8fa";
		Stopic3.style.backgroundColor="#f5f8fa";
		Stopic4.style.backgroundColor="#f5f8fa";
		topic_text.style.display="block";
		topic_text2.style.display="none";
		topic_text3.style.display="none";
		topic_text4.style.display="none";
	}else if(change == "two"){
		//alert("O");
		Stopic.style.backgroundColor="#f5f8fa";
		Stopic2.style.backgroundColor="#fff";
		Stopic3.style.backgroundColor="#f5f8fa";
		Stopic4.style.backgroundColor="#f5f8fa";
		topic_text.style.display="none";
		topic_text2.style.display="block";
		topic_text3.style.display="none";
		topic_text4.style.display="none";
	}else if(change == "three"){
		//alert("O");
		Stopic.style.backgroundColor="#f5f8fa";
		Stopic2.style.backgroundColor="#f5f8fa";
		Stopic3.style.backgroundColor="#fff";
		Stopic4.style.backgroundColor="#f5f8fa";
		topic_text.style.display="none";
		topic_text2.style.display="none";
		topic_text3.style.display="block";
		topic_text4.style.display="none";
	}else if(change == "fore"){
		//alert("O");
		Stopic.style.backgroundColor="#f5f8fa";
		Stopic2.style.backgroundColor="#f5f8fa";
		Stopic3.style.backgroundColor="#f5f8fa";
		Stopic4.style.backgroundColor="#fff";
		topic_text.style.display="none";
		topic_text2.style.display="none";
		topic_text3.style.display="none";
		topic_text4.style.display="block";
	}
}

/*인기검색어 onfocus*/
function popFunction(change){
	var Ptopic = document.getElementById("pc_title_on");
	var Ptopic2 = document.getElementById("pc_title_on2");
	var Ptopic3 = document.getElementById("pc_title_on3");
	var Ptopic4 = document.getElementById("pc_title_on4");

	var Ptopic_text= document.getElementById("pc_text_on");
	var Ptopic_text2= document.getElementById("pc_text_on2");
	var Ptopic_text3= document.getElementById("pc_text_on3");
	var Ptopic_text4= document.getElementById("pc_text_on4");

	if(change == "one"){
		//alert("O");
		Ptopic.style.backgroundColor="#fff";
		Ptopic2.style.backgroundColor="#f5f8fa";
		Ptopic3.style.backgroundColor="#f5f8fa";
		Ptopic4.style.backgroundColor="#f5f8fa";

		Ptopic_text.style.display="block";
		Ptopic_text2.style.display="none";
		Ptopic_text3.style.display="none";
		Ptopic_text4.style.display="none";
	}else if(change == "two"){
		//alert("O");
		Ptopic.style.backgroundColor="#f5f8fa";
		Ptopic2.style.backgroundColor="#fff";
		Ptopic3.style.backgroundColor="#f5f8fa";
		Ptopic4.style.backgroundColor="#f5f8fa";
		Ptopic_text.style.display="none";
		Ptopic_text2.style.display="block";
		Ptopic_text3.style.display="none";
		Ptopic_text4.style.display="none";
	}else if(change == "three"){
		//alert("O");
		Ptopic.style.backgroundColor="#f5f8fa";
		Ptopic2.style.backgroundColor="#f5f8fa";
		Ptopic3.style.backgroundColor="#fff";
		Ptopic4.style.backgroundColor="#f5f8fa";
		Ptopic_text.style.display="none";
		Ptopic_text2.style.display="none";
		Ptopic_text3.style.display="block";
		Ptopic_text4.style.display="none";
	}else if(change == "fore"){
		//alert("O");
		Ptopic.style.backgroundColor="#f5f8fa";
		Ptopic2.style.backgroundColor="#f5f8fa";
		Ptopic3.style.backgroundColor="#f5f8fa";
		Ptopic4.style.backgroundColor="#fff";
		Ptopic_text.style.display="none";
		Ptopic_text2.style.display="none";
		Ptopic_text3.style.display="none";
		Ptopic_text4.style.display="block";
	}
}

//모바일 상세검색
function mobile_detail(option){
	var kind_array = document.getElementById("kind_array");
	var kind_date = document.getElementById("kind_date");
	var kind_region = document.getElementById("kind_region");
	
	if(option == "array" && kind_array.style.display == "none"){
		kind_array.style.display="block";
	}else if(kind_array.style.display == "block"){
		kind_array.style.display="none";
	} 
		
	if(option == "date" && kind_date.style.display == "none"){
		kind_date.style.display="block";
	}else if(kind_date.style.display == "block"){
		kind_date.style.display="none";
	} 
		
	if(option == "region" && kind_region.style.display == "none"){
		kind_region.style.display="block";
	}else if(kind_region.style.display == "block"){
		kind_region.style.display="none";
	} 
}

//정렬, 기간, 영역, 옵션유지
function detail_option(option){
	var detail_box_sort = document.getElementById("detail_box_sort");
	var detail_box_period = document.getElementById("detail_box_period");
	var detail_box_region = document.getElementById("detail_box_region");
	
	if(option == "sort" && detail_box_sort.style.display == "none"){
		detail_box_sort.style.display="block";
	}else if(detail_box_sort.style.display == "block"){
		detail_box_sort.style.display="none";
	}

	if(option == "period" && detail_box_period.style.display == "none"){
		detail_box_period.style.display="block";
	}else if(detail_box_period.style.display == "block"){
		detail_box_period.style.display="none";
	}

	if(option == "region" && detail_box_region.style.display == "none"){
		detail_box_region.style.display="block";
	}else if(detail_box_region.style.display == "block"){
		detail_box_region.style.display="none";
	}
}

//옵션유지
function op_choice(choice){
	var option_off = document.getElementById("option_off");
	var option_on = document.getElementById("option_on");

	if(choice == "off"){
		option_off.setAttribute("style", "background-color: #fff;" + "border-color: #babec5;" + "color: #444;");
	}else{
		option_off.setAttribute("style", "background-color: #f9fafb;" + "border-color: #babec5;" + "color: #b4b6bc;");
	}

	if(choice == "on"){
		option_on.setAttribute("style", "background-color: #fff;" + "border-color: #babec5;" + "color: #444;");
	}else{
		option_on.setAttribute("style", "background-color: #f9fafb;" + "border-color: #babec5;" + "color: #b4b6bc;");
	}
}


//웹페이지 서브메뉴
function submenu(change){
	var submenuID_1 = document.getElementById("submenuID_1");
	var submenuID_2 = document.getElementById("submenuID_2");
	var submenuID_3 = document.getElementById("submenuID_3");
	var submenuID_4 = document.getElementById("submenuID_4");
	var submenuID_5 = document.getElementById("submenuID_5");
	var submenuID_6 = document.getElementById("submenuID_6");
	var submenuID_7 = document.getElementById("submenuID_7");
	
	if(change == "one"){
		submenuID_1.setAttribute('style','color:#ef212f; font-weight:bold;');
		submenuID_2.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_3.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_4.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_5.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_6.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_7.setAttribute('style','color:#333; font-weight:nomal;');
	}else if(change == "two"){
		submenuID_1.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_2.setAttribute('style','color:#ef212f; font-weight:bold;');
		submenuID_3.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_4.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_5.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_6.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_7.setAttribute('style','color:#333; font-weight:nomal;');
	}else if(change == "three"){
		submenuID_1.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_2.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_3.setAttribute('style','color:#ef212f; font-weight:bold;');
		submenuID_4.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_5.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_6.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_7.setAttribute('style','color:#333; font-weight:nomal;');
	}else if(change == "fore"){
		submenuID_1.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_2.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_3.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_4.setAttribute('style','color:#ef212f; font-weight:bold;');
		submenuID_5.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_6.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_7.setAttribute('style','color:#333; font-weight:nomal;');
	}else if(change == "five"){
		submenuID_1.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_2.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_3.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_4.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_5.setAttribute('style','color:#ef212f; font-weight:bold;');
		submenuID_6.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_7.setAttribute('style','color:#333; font-weight:nomal;');
	}else if(change == "six"){
		submenuID_1.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_2.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_3.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_4.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_5.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_6.setAttribute('style','color:#ef212f; font-weight:bold;');
		submenuID_7.setAttribute('style','color:#333; font-weight:nomal;');
	}else if(change == "seven"){
		submenuID_1.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_2.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_3.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_4.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_5.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_6.setAttribute('style','color:#333; font-weight:nomal;');
		submenuID_7.setAttribute('style','color:#ef212f; font-weight:bold;');
	}
}

//메뉴
$(document).ready(function() {	
	//gnb open
	$('.nav-wrap button').on('click',function(){		
		if($(this).attr('class') == 'open'){
			$('.nav-wrap').css({'height':'auto'});
			$(this).attr('class','close');
			$(this).css({'background-color':'#ddd'});
		} else{
			$('.nav-wrap').css({'height':'40px'});
			$(this).attr('class','open');
			$(this).css({'background-color':'#fff'});
		}
	});


	$(".startDate").datepicker({
		dateFormat: 'yy.mm.dd'
	});	

	$(".endtDate").datepicker({
		dateFormat: 'yy.mm.dd'	
	});	
});


