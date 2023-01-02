/* 왼쪽 메뉴 */

$(document).ready(function(){
    if($('#snb_wrap #remote').length !=0 ){
        lnb_navi_AC();
    }
});


function lnb_navi_AC(){
    
        var menu = $("#lnb>ul");
            menu.li = menu.find(">li");

        if($('#map').length !== 0){
            menu.li.find(" div").slideUp(0);
            $('#map').find(' div').show();
        }else{
            menu.li.find(" div").slideUp(0);
        }
        
        menu.li.find(" a").each(function(){
            var i = $(this);
            
            if(i.siblings("div").length != 0){
                i.addClass("child");	
            }
        });

       
        menu.li.find(" a").on("click",function(){

            if(!($(this).parents().hasClass('.active'))){
                $(this).parents().siblings().removeClass('active')
                $(this).parents().addClass('active')
            }else{
                $(this).parents().addClass('active')
            }





            if($(this).siblings("div").length !== 0){
                if($(this).attr("data-open") !== "on" && $(this).attr("data-open") !== "hit"){
                    $(this).attr("data-open","on");
                    $(this).parent().find(">div").stop().slideDown(200);
                } else {
                    $(this).attr("data-open","off");
                    $(this).parent().find(">div").stop().slideUp(200);
                }
                return false;
            }
        });
}


/* 모든 메뉴 접기 */
function all_close_btn() {
    
    var menu_li_a = $('#lnb ul li a');

        menu_li_a.attr("data-open","off");
        menu_li_a.parent().find(">div").stop().slideUp(200);
       
}



/* 로그인 */

$(function(){
    var login_btn = $('.logins > a');


    login_btn.on("click",function(){

        if($(this).siblings("ul").length !== 0){
            if($(this).attr("data-open") !== "on" && $(this).attr("data-open") !== "hit"){
                $(this).attr("data-open","on");
                $(this).siblings("ul").stop().slideDown(200);
            } else {
                $(this).attr("data-open","off");
                $(this).siblings("ul").stop().slideUp(200);
            }
            return false;
        }

    }); 
    
})


/*모드 전환 */

$(function(){

    var body = $('body')
    var mode_btn_input = $('#mode_btn > .checkbox')

    mode_btn_input.on('click',function(){
        if(mode_btn_input.is(":checked")){
            body.attr('data-mode','bright')
        }else{
            body.attr('data-mode','dark')
        }
    })


});



/*레이아웃 변경 */

$(function(){
    var layout_btn = $('#video_wrap .midd .layout_btns > button');
    var video_layout = $('#video_wrap .midd >.video_layout');

    layout_btn.on('click',function(){
       if(!$(this).hasClass('on')){
            $(this).addClass('on');
            $(this).siblings('.on').removeClass('on');

            if($(this).is('[data-layout=1]')){
                video_layout.attr('data-layout','1')
            }else{
                video_layout.attr('data-layout','2')
            }
       };
       
    })
})  


/*input[type='data'] 현재 날짜 이후 선택 안됨 */


$(function(){
    var now_utc = Date.now()
    var timeOff = new Date().getTimezoneOffset()*60000;
    var today = new Date(now_utc-timeOff).toISOString().split("T")[0];
    
    $("#Date").attr("max", today)
    $("#Date_02").attr("max", today)

})






