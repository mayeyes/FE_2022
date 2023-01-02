$(function(){
	var number = 1;
	$('.zoom>a').click(function(){
		var index = $(this).index();
		switch (index){
			case 0:
				if (number >= 1.5){
					alert("Max Size");
				}else{
					number += 0.1;
					$('body').css({'zoom':number});			
					$('body').css('-webkit-transform','scale('+ number +')');
					$('body').css('-webkit-transform-origin','0 0');
					$('body').css('-moz-transform','scale('+ number +')');
					$('body').css('-moz-transform-origin','0 0');
					$('body').css('-o-transform','scale('+ number +')');
					$('body').css('-o-transform-origin','0 0');
				}
				break;
			case 1:
				$('body').css({'zoom':'1'});			
				$('body').css('-webkit-transform','scale(1)');
				$('body').css('-webkit-transform-origin','0 0');
				$('body').css('-moz-transform','scale(1)');
				$('body').css('-moz-transform-origin','0 0');
				$('body').css('-o-transform','scale(1)');
				$('body').css('-o-transform-origin','0 0');
				number = 1;
				break;
			case 2:
				if (number <= 0.7){
					alert("Min Size");
				}else{
					number -= 0.1;
					$('body').css({'zoom':number});			
					$('body').css('-webkit-transform','scale('+ number +')');
					$('body').css('-webkit-transform-origin','0 0');
					$('body').css('-moz-transform','scale('+ number +')');
					$('body').css('-moz-transform-origin','0 0');
					$('body').css('-o-transform','scale('+ number +')');
					$('body').css('-o-transform-origin','0 0');
				}
				break;
		};
	});
});