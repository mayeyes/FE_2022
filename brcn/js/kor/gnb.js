//function gnb(c,e,a,d,f,b,n,g,h){function k(){d.not(b).removeClass("current").eq(b).addClass("current");e.not(b).hide().eq(b).show();a.not(b).hide().eq(b).show();f.stop(!0,!1).animate({height:m[b]},g,h)}function l(){d.removeClass("current");a.children().find("a").removeClass("on");a.children().find("ul").removeClass("on");f.stop(!0,!1).animate({height:79},g,h,function(){a.hide()})}c=$(c);e=c.find(e);a=c.find(a);d=c.find(d);f=c.find(f);--b;var m=[569,300,442,300,660,518];e.hide();a.hide();d.bind("touchstart click",
//function(a){b=$(this).parent().index();k();a.stopPropagation()});d.bind("click",function(a){Modernizr.touch&&(a.preventDefault(),a.stopPropagation())});d.bind("mouseenter focusin",function(a){b=$(this).parent().index();k();a.stopPropagation()});c.bind("mouseleave",function(){l()});a.last().find(">li>a").last().bind("focusout",function(){l()});a.children().find("ul>li>a:last").bind("focusout",function(){$(this).parents("ul").removeClass("on")});a.children().bind("mouseenter",function(b){a.children().find("a").removeClass("on");
//a.children().find("ul").removeClass("on");$(this).children().addClass("on");b.stopPropagation()}).find("a").bind("focusin",function(b){a.children().find("a").removeClass("on");$(this).next("ul").addClass("on");$(this).parents("ul").prev().addClass("on");b.stopPropagation()})};



function gnb(c, e, a, d, f, b, n, g, h) {
    function k() {
        d.not(b).removeClass("current").eq(b).addClass("current");
        e.not(b).hide().eq(b).show();
        a.not(b).hide().eq(b).show();
        f.stop(!0, !1).animate({
            height: m[b]
        }, g, h)
    }

    function l() {
        d.removeClass("current");
        a.children().find("a").removeClass("on");
        a.children().find("ul").removeClass("on");
        f.stop(!0, !1).animate({
            height: 100
        }, g, h, function() {
            a.hide()
        })
    }
    c = $(c);
    e = c.find(e);
    a = c.find(a);
    d = c.find(d);
    f = c.find(f);
    //--b;
    var m = [620, 620, 500, 400, 790, 538];
    e.hide();
    a.hide();
    d.bind("touchstart click",
        function(a) {
            b = $(this).parent().index();
            k();
            a.stopPropagation()
        });
    d.bind("click", function(a) {
        Modernizr.touch && (a.preventDefault(), a.stopPropagation())
    });
    d.bind("mouseenter focusin", function(a) {
        b = $(this).parent().index();
        k();
        a.stopPropagation()
    });
    c.bind("mouseleave", function() {
        l()
    });
    a.last().find(">li>a").last().bind("focusout", function() {
        l()
    });
    a.children().find("ul>li>a:last").bind("focusout", function() {
        $(this).parents("ul").removeClass("on")
    });
    a.children().bind("mouseenter", function(b) {
        a.children().find("a").removeClass("on");
        a.children().find("ul").removeClass("on");
        $(this).children().addClass("on");
        b.stopPropagation()
    }).find("a").bind("focusin", function(b) {
        a.children().find("a").removeClass("on");
        $(this).next("ul").addClass("on");
        $(this).parents("ul").prev().addClass("on");
        b.stopPropagation()
    })
};