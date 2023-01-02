$(document).ready(function(){
	setInterval(function() {
		fbAsyncInit();
	}, 1000*60*180);
	
});


window.fbAsyncInit = function() {
	/*try{
		$.getJSON('https://graph.facebook.com/v3.2/146753658719968/feed?fields=attachments,message,picture,link,name,caption,description,source,updated_time&limit=5&access_token=EAAKDK8pr8LoBADamq1ZCJ4lA4w7z0veORP9FCBzumZCW1ZAOKeFgAaZBI1CXzkT7TYJPcZB8OibxeZADQssZCZBNl5ODP7CA20KpqoPipr5vUyPrJKcuWbS5OtVBmFIZB0rJ4SwiRIWqiPfEOcZAMecs5Ice7dSCJ6TNKthWlxtzsjaWGLspo5cotm', function(result) {
			
			if(result.data != null){
				if(result.data.length > 0){
					$.each(result.data, function(i, entry) {
						
							var bdata 		= entry['attachments'];
							
							if(bdata != undefined ){
								var message = entry['message'];
								var link 	= entry['link'];
								var upTime 	= entry['updated_time'];
								var name 	= entry['name'];
								var bdata2 	= bdata.data[0]['media'];
								var src		= '';
								var today 	= new Date();
								var mm 		= today.getMonth()+1; //January is 0!
								var yyyy 	= today.getFullYear();
								var year	= String(yyyy);

								if(message == undefined){
									message = "교육부";
								}
								
								if(name == undefined && message != undefined){
									name = message.substring(0,20) + "...";
								}else if(name == undefined && message == undefined){
									name = "교육부";
								}
								
								if(bdata2 != undefined){
									src		= bdata2.image['src'];
								}else{
									var bdata3 = bdata.data[0].subattachments.data[0]['media'];
									src = bdata3.image['src'];
								}
								
								fn_insertFacebook(name, message, src, link, upTime, i);
								
							}
							
							
							
							
					});        
				}
			}
 
		});   
	}catch(e){ 
		 
	}*/
};
 
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function fn_insertFacebook(name, message, src, link, upTime, num){
	$.ajax({
		type: 'Post',
		url: "/main/insertFacebook.do",
		async: false,
		dataType: "json",
		data:  {
			name 	: name, 
			message : message,
			src		: src,
			link	: link,
			upTime	: upTime,
			num		: num
		},
		success: function (data){
			console.log("완료");
		}
 	});
	
}

