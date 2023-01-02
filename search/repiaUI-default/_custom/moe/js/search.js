function op_choice(choice){
	var option_off = document.getElementById("option_off");
	var option_on = document.getElementById("option_on");

	if(choice == "off"){
		option_off.setAttribute("data-open","on");
        option_on.setAttribute("data-open","off");
	}else{
		option_off.setAttribute("data-open","off");
        option_on.setAttribute("data-open","on");
	}
}

function topicFunction(change){
	var Stopic = document.getElementById("tc_title_on");
	var Stopic2 = document.getElementById("tc_title_on2");
	var Stopic3 = document.getElementById("tc_title_on3");
	var Stopic4 = document.getElementById("tc_title_on4");

    if(Stopic) Stopic.setAttribute("data-open","off");
    if(Stopic2) Stopic2.setAttribute("data-open","off");
    if(Stopic3) Stopic3.setAttribute("data-open","off");
    if(Stopic4) Stopic4.setAttribute("data-open","off");
    
	if(change == "one"){
		Stopic.setAttribute("data-open","on");
	}else if(change == "two"){
		Stopic2.setAttribute("data-open","on");
	}else if(change == "three"){
		Stopic3.setAttribute("data-open","on");
	}else if(change == "fore"){
		Stopic4.setAttribute("data-open","on");
	}
    return false;
}

function popFunction(change){
	var Ptopic = document.getElementById("pc_title_on");
	var Ptopic2 = document.getElementById("pc_title_on2");
	var Ptopic3 = document.getElementById("pc_title_on3");
	var Ptopic4 = document.getElementById("pc_title_on4");

    if(Ptopic) Ptopic.setAttribute("data-open","off");
    if(Ptopic2) Ptopic2.setAttribute("data-open","off");
    if(Ptopic3) Ptopic3.setAttribute("data-open","off");
    if(Ptopic4) Ptopic4.setAttribute("data-open","off");

	if(change == "one"){
		Ptopic.setAttribute("data-open","on");
	}else if(change == "two"){
		Ptopic2.setAttribute("data-open","on");
	}else if(change == "three"){
		Ptopic3.setAttribute("data-open","on");
	}else if(change == "fore"){
		Ptopic4.setAttribute("data-open","on");
	}
    return false;
}

$(function(){
    $('.nav-wrap button').on('click',function(){		
        if(parseInt($('.nav-wrap').css('height')) == 40){
            $('.nav-wrap').css({'height':'30px'});
        }
    });
});

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

    $(".kind_open").attr("data-open","off");
    $(".kind_detail").not(":hidden").siblings(".kind_open").attr("data-open","on");
}