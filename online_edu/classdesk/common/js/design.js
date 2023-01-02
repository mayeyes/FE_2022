$(function(){
	$('.ad_login_input input').on('focus',function(){
		var text = $(this).siblings('p').text('');
	});
	
	$('.ad_login_input input').on('blur',function(){
		if($(this).val() == '' && $(this).attr('id') == 'login_id'){
			$(this).siblings('p').text('아이디');
		}else if($(this).val() == '' && $(this).attr('id') == 'login_pw'){
			$(this).siblings('p').text('비밀번호')	;
		}else if($(this).val() != null){
			$(this).siblings('p').text('')	;
		}
	});
});