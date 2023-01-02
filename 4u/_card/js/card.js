/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_card Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$(".mob_quest_question a").click(function(){
		$(this).parent().parent().parent().stop().animate({"opacity":0},300,function(){
			$(this).hide();	
		});
		return false;	
	});
	
	if($("#card_counter").size() > 0){
		js_card ();
		$(window).resize(function(){
			setTimeout(function(){ js_card ();},1000);
		});	
	}
});
function js_card (){
	var card_obj = $("#card_counter");
		card_obj.bar = card_obj.find(">.graph_bar");
		card_obj.size = card_obj.bar.attr("id").substring(4, 6);
		card_obj.wid = card_obj.width()/48*card_obj.size;
	
	card_obj.bar.stop().animate({"width":card_obj.wid +"px"},card_obj.wid);
}


