/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main photo index js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function(){
	if($('#main #photo').size() !=0){
        main_photo_index();
    }
    if($('#main #photo-list').size() !=0){
        main_photo_list_index();
    }
});

function main_photo_index(){
    var obj = $('#main #photo .midd ul li');
    var idx = obj.size();
    obj.parent().parent().parent().attr("data-list-index",idx);
}
function main_photo_list_index(){
    var obj = $('#main #photo-list .midd ul li');
    var idx = obj.size();
    obj.parent().parent().parent().attr("data-list-index",idx);
}
