/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    Section Scroll

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    page_sc();
});

function page_sc(){
    var obj = $('[id*="page_"]');
    var btn = $('#control>ul>li>a');

    //클릭 시 이동
    btn.click(function(){
        var idx = $(this).parent().index();

        var sum = $("#header").innerHeight();
        for(var i=0; i<idx; i++){
            sum += obj.eq(i).innerHeight();
            console.log(sum);
        }
        
        $("#wrap").stop().animate({"scrollTop":sum +"px"});

        btn.parent().removeClass("on");
        $(this).parent().addClass("on");

        return false;
    });

    $(window).trigger("scroll");
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    섹션별 애니메이션

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    layout_scroll_AC();
});
function layout_scroll_AC(){
    function _set(){
        var t = 0;
        var arr = ['page_1','page_2','page_3','page_4'];
        
        for(var i=0; i<arr.length; i++){
            var ob = $("#"+arr[i]);
            var t2 = (t - ob.offset().top) + $(window).height();
            var step = Math.floor(t2 / ob.innerHeight() * 100);
        
            if(step < 10) step = 0;
            else step = Math.floor(step / 10);
            if(t2 > 0 && t2 < ob.innerHeight()){
                ob.attr("data-steps",step);
                $('#control>ul>li').eq(i).addClass("on");
            } else {
                $('#control>ul>li').eq(i).removeClass("on");

                if(t2 < 10) ob.removeAttr("data-steps");
                else ob.attr("data-steps","10");
            }
        }
    }
    _set();
    $("#wrap").on("scroll",function(){
        _set();
    });
}






/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   page1 input focus

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	input_focus_AC();
});
function input_focus_AC(){
    $('#page_1>.pages>.in .searchs .t_bx input').focus(function(){
        $('#page_1>.pages>.in .searchs .t_bx').addClass("on");
    });
    $('#page_1>.pages>.in .searchs .t_bx a').focus(function(){
        $('#page_1>.pages>.in .searchs .t_bx').addClass("on");
    });
    $('#page_1>.pages>.in .searchs .t_bx input').focusout(function(){
        $('#page_1>.pages>.in .searchs .t_bx').removeClass("on");
    });
    $('#page_1>.pages>.in .searchs .t_bx a').focusout(function(){
        $('#page_1>.pages>.in .searchs .t_bx').removeClass("on");
    });
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    Data Count

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    //if($("#page_3").attr("data-step") > 3)
    countdown();
});

function countdown(){
    var obj = $('[data-skin="count"]');

    function _set(str){
        var count= str.text();//value
        var speeds = 2000;//2초간 진행

        if(count == "" || count == undefined) count = 0;
        count = count.replace(",","");
    
        $({ val : 0 }).animate({ val : count }, {
            duration: speeds,
            step: function() {
                var num = commas(Math.floor(this.val));
                str.text(num);
            },
            complete: function() {
                var num = commas(Math.floor(this.val));
                str.text(num);
            }
        });
        function commas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
    }

    for(var i=0; i<obj.size(); i++){
        _set(obj.eq(i));
    }
}

