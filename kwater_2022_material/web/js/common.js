$(function(){
	var search = $('body #header .search_box a.search_btn_open')
		search_form = $('body #header .search_form')
		blind = $('body .blind')	

		search.click(function(){
			if(!(search_form.is(':hidden'))){
				blind.attr('data-blind',"")
				search_form.hide();
				search.removeClass('on')
			}else{
				blind.attr('data-blind',"Y")
				search_form.show();
				search.addClass('on')
			}
		})
})



// 외부영역 클릭 시 메뉴 닫기
$(function(){
	var menuicon = $('input[id="menuicon"]')
		menuicon_btn = $('label[for="menuicon"]')
		blind = $('body .blind');
		
		menuicon_btn.click(function(){

			if(!(menuicon.is(":checked"))){
				blind.attr('data-blind',"Y")
			}else{
				blind.attr('data-blind',"")
			}

		})
			
		blind.click(function(){
			$(this).attr('data-blind',"")
			menuicon.prop("checked", false);
			$('body #header .search_form').hide();
			$('body #header .search_box a.search_btn_open').removeClass('on')

		});	
})


function fixed_list_numbox(){
	var list_numbox = $('.list_numbox')
		
		list_numbox.addClass('fix')

}

$(window).scroll(function(){

	var hei = $(document).scrollTop()
	
	if(hei > 100){
		fixed_list_numbox()
	}else{
		return false
	}
})
