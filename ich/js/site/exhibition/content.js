/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main section 높이 설정

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function () {
    sec_height();
});

function sec_height() {
    var obj = $('[id*="sec"]');
    obj.sizes = 0;
    for (var i = 0; i < obj.size(); i++) {
        obj.sizes = obj.eq(i).find(">.inner .text_box .layout >div").size();

        if (obj.sizes != 0) {
            if (obj.eq(i).find(">.inner").size() != 1) {
                obj.eq(i).find(".inner").css("height", ((obj.sizes / obj.eq(i).find(".inner").size()) * 100) + "vh");
            } else obj.eq(i).find(".inner").css("height", (obj.sizes * 100) + "vh");
        }
    }
}



/*
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 *
 * main 풀페이지 스크롤
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 */
$(function () {
    main_full_scroll();
});

function main_full_scroll() {
    var box = $('[data-view-scroll="box"]');
    var cnt = 0;

    var arr = [];

    $("body").attr("data-pagenumber", "0");
    $('<div class="controll"><div class="layout"><span></span></div></div>').appendTo($("#container"));



    for (var i = 0; i < $('[data-view-scroll="box"]').size(); i++) {
        if (i + 1 < 10) {
            arr.push("sec0" + (i + 1));
        } else {
            arr.push("sec" + (i + 1));
        }
    }



    // *** 휠 마우스 컨트롤 ::S ***////

    function scrollEvent(event, c, callback) {


        $('#header').addClass("on");

        if (event === "null") {
            var target = ($('[data-view-scroll="box"][data-hit="on"]').size() !== 0) ? $('[data-view-scroll="box"][data-hit="on"]') : $('[data-view-scroll="box"]').eq(0);
            var scrollTops = 0;
            var scrollBottom = 0;
        } else {
            var target = ($(event.target).attr('data-view-scroll') === 'box') ? $(event.target) : $(event.target).parents('[data-view-scroll="box"]');
            var scrollTops = target.scrollTop();
            var scrollBottom = target.find(">.ins").innerHeight() - $(document).height() - target.scrollTop();
        }

        box.removeAttr("data-hit");
        //box.removeClass("on");



        if (c === "down" && scrollBottom <= 0) {

            if (target.next().is('[data-view-scroll-position="y"]')) {
                target = target.next();
            } else {
                target = target.nextAll('[data-view-scroll-position="y"]').eq(0)
            }


            // console.log(target.index());
            target.check = target.attr('data-view-scroll-position');
            if (target.length !== 0) {
                if (target.check === 'y') {
                    box.css({
                        "z-index": "0"
                    });
                    // target.parents('[data-view-scroll="wrap"]').find('[data-view-scroll="box"]').removeClass("on");
                    if (!target.is(":animated")) {
                        target.stop().css({
                            "left": "0",
                            "top": "100%",
                            "z-index": "2000"
                        }).animate({
                            "top": "0"
                        }, 500, "linear");
                    }

                    /*
                     * } else if (target.check === 'x') { box.css({
                     * "z-index": "0" }); if
                     * (!target.is(":animated")){
                     * target.stop().css({ "left": "100%", "top":
                     * "0", "z-index": "2000" }).animate({ "left":
                     * "0" }, 500, "linear"); }
                     */
                }
            }
            target.attr("data-hit", "on");
            target.addClass("on");
            $("body").attr("data-pagenumber", target.index());

            $("#container .controll span").css("width", ((100 / $('[data-view-scroll="box"]').size() + 1) * target.index()) + "%");


            // console.log(target.index());


            if (target.index() == -1) {
                $("body").attr("data-pagenumber", "footer");
            }

        } else if (c === "up" && target.scrollTop() === 0) {

            if (box.index(target) !== 0) {
                /*
                 * target.check =
                 * target.attr('data-view-scroll-position');
                 */
                target_prev_check = target.prev().attr('data-view-scroll-position');

                if (target.length !== 0) {

                    if (target_prev_check === 'y') {
                        target = target;
                        target_prev = target.prevAll('[data-view-scroll-position="y"]').eq(0);

                        box.css({
                            "z-index": "0"
                        });

                        target_prev.stop().css({
                            "z-index": "0"
                        }).animate({
                            "top": "0",
                            "z-index": "2000"
                        }, 500, "linear");



                        //target.parents('[data-view-scroll="wrap"]').find('[data-view-scroll="box"]').removeClass("on");
                        if (!target.is(":animated")) {
                            target.stop().css({
                                "z-index": "2000"
                            }).animate({
                                "top": "100%",
                                "z-index": "0"
                            }, 500, "linear");
                        }

                        target.prev().attr("data-hit", "on");
                        target.prev().addClass("on");


                    } else {

                        $('[data-view-scroll-position="x"]').css('opacity', '0')

                        target_prev = target.prevAll('[data-view-scroll-position="y"]').eq(0);
                        target = target;
                        //target.parents('[data-view-scroll="wrap"]').find('[data-view-scroll="box"]').removeClass("on");


                        box.css({
                            "z-index": "0"
                        });

                        target_prev.stop().css({
                            "top": "-100%",
                            "z-index": "0"
                        }).animate({
                            "top": "0",
                            "z-index": "2000"
                        }, 500, "linear");

                        target.stop().animate({
                            "top": "100%",
                            "z-index": "0"
                        }, 500, "linear");

                        target_prev.attr("data-hit", "on");
                        target_prev.addClass("on");

                    }
                }
            }

            $("body").attr("data-pagenumber", target.index());

            $("#container .controll span").css("width", ((100 / $('[data-view-scroll="box"]').size() + 1) * target.index()) + "%");
        } else if (c === "up" && target.index() == -1) {

            $("body").attr("data-pagenumber", $('[data-view-scroll="box"]').size() - 1);

        } else if (c === "next") {

            target = target.next();

            target.check = target.attr('data-view-scroll-position');
            if (target.length !== 0) {
                if (target.check === 'y') {
                    box.css({
                        "z-index": "0"
                    });
                    if (!target.is(":animated")) {
                        target.stop().css({
                            "left": "0",
                            "top": "100%",
                            "z-index": "2000"
                        }).animate({
                            "top": "0"
                        }, 500, "linear");
                    }

                } else if (target.check === 'x') {
                    box.css({
                        "z-index": "0"
                    });
                    if (!target.is(":animated")) {
                        target.stop().css({
                            "left": "100%",
                            "top": "0",
                            "z-index": "2000",
                            "opacity": '1'
                        }).animate({
                            "left": "0"
                        }, 500, "linear");
                    }
                }
                target.attr("data-hit", "on");
                target.addClass("on");
            }


        } else if (c === "prev") {

            if (box.index(target) !== 0) {
                target.check = target.attr('data-view-scroll-position');
                if (target.length !== 0) {
                    if (target.check === 'y') {
                        box.css({
                            "z-index": "0"
                        });
                        //target.parents('[data-view-scroll="wrap"]').find('[data-view-scroll="box"]').removeClass("on");
                        if (!target.is(":animated")) {
                            target.stop().animate({
                                "top": "100%"
                            }, 400, "linear");
                        }
                    } else if (target.check === 'x') {
                        box.css({
                            "z-index": "0"
                        });
                        if (!target.is(":animated")) target.stop().animate({
                            "left": "100%",
                            "opacity": '1'
                        }, 500, "linear");
                    }
                }
            }
            target.prev().attr("data-hit", "on");
            target.prev().addClass("on");

        }
        callback();
    }

    // *** 휠 마우스 컨트롤 ::E ***////





    // *** 키보드 컨트롤 ::S ***////

    function keydownEvent(event, g, callback) {


        $('#header').addClass("on");

        var target = ($('[data-view-scroll="box"][data-hit="on"]').size() !== 0) ? $('[data-view-scroll="box"][data-hit="on"]') : $('[data-view-scroll="box"]').eq(0);
        var scrollTops = 0;
        var scrollBottom = 0;

        box.removeAttr("data-hit");
        //box.removeClass("on");
        if(target.find(".inner").size() != 1) target.find(".inner").attr("tabindex","0").focus();
        else if(target.find(".inner").size() == 1 && target.find("div").hasClass("img_step2")) target.find(".layout").attr("tabindex","0").focus();
        else if(target.find("div").hasClass("img_stepbox")) target.find(".layout").attr("tabindex","0").focus();
        else if(target.index() == -1) $(".user #footer").find(".layout").attr("tabindex","0").focus();
        else target.find(".layout").attr("tabindex","0").focus();
        if (g === "ArrowDown" && scrollBottom <= 0) {
            

             if(target.find(".img_stepbox").size() != 0){
                if(target.attr("data-per") ==  target.find(".in").size()){
                    if (target.next().is('[data-view-scroll-position="y"]')) {
                        target = target.next();
                    } else {
                        target = target.nextAll('[data-view-scroll-position="y"]').eq(0)
                    }

                    target.check = target.attr('data-view-scroll-position');
                    if (target.length !== 0) {
                        if (target.check === 'y') {
                            box.css({
                                "z-index": "0"
                            });

                            if (!target.is(":animated")) {
                                target.stop().css({
                                    "left": "0",
                                    "top": "100%",
                                    "z-index": "2000"
                                }).animate({
                                    "top": "0"
                                }, 500, "linear");
                            }

                        }
                    }
                    target.attr("data-hit", "on");
                    target.addClass("on");
                    $("body").attr("data-pagenumber", target.index());

                    $("#container .controll span").css("width", ((100 / $('[data-view-scroll="box"]').size() + 1) * target.index()) + "%");


                    if (target.index() == -1) {
                        $("body").attr("data-pagenumber", "footer");
                    }
                }
            }else if(target.find(">div").attr("id") == "sec01"){
                if (target.next().is('[data-view-scroll-position="y"]')) {
                    target = target.next();
                } else {
                    target = target.nextAll('[data-view-scroll-position="y"]').eq(0)
                }

                target.check = target.attr('data-view-scroll-position');
                if (target.length !== 0) {
                    if (target.check === 'y') {
                        box.css({
                            "z-index": "0"
                        });

                        if (!target.is(":animated")) {
                            target.stop().css({
                                "left": "0",
                                "top": "100%",
                                "z-index": "2000"
                            }).animate({
                                "top": "0"
                            }, 500, "linear");
                        }

                    }
                }
                target.attr("data-hit", "on");
                target.addClass("on");
                $("body").attr("data-pagenumber", target.index());

                $("#container .controll span").css("width", ((100 / $('[data-view-scroll="box"]').size() + 1) * target.index()) + "%");


                if (target.index() == -1) {
                    $("body").attr("data-pagenumber", "footer");
                }
            }else{
                 if(target.attr("data-per") ==  "10"){
                    if (target.next().is('[data-view-scroll-position="y"]')) {
                        target = target.next();
                    } else {
                        target = target.nextAll('[data-view-scroll-position="y"]').eq(0)
                    }

                    target.check = target.attr('data-view-scroll-position');
                    if (target.length !== 0) {
                        if (target.check === 'y') {
                            box.css({
                                "z-index": "0"
                            });

                            if (!target.is(":animated")) {
                                target.stop().css({
                                    "left": "0",
                                    "top": "100%",
                                    "z-index": "2000"
                                }).animate({
                                    "top": "0"
                                }, 500, "linear");
                            }

                        }
                    }
                    target.attr("data-hit", "on");
                    target.addClass("on");
                    $("body").attr("data-pagenumber", target.index());

                    $("#container .controll span").css("width", ((100 / $('[data-view-scroll="box"]').size() + 1) * target.index()) + "%");


                    if (target.index() == -1) {
                        $("body").attr("data-pagenumber", "footer");
                    }
                }
            }
        } else if (g === "ArrowUp" && target.scrollTop() === 0) {
            
            
            if (box.index(target) !== 0) {
                target_prev_check = target.prev().attr('data-view-scroll-position');
                if (target.length !== 0) {

                    if (target_prev_check === 'y') {
                        target = target;
                        target_prev = target.prevAll('[data-view-scroll-position="y"]').eq(0);

                        box.css({
                            "z-index": "0"
                        });

                        target_prev.stop().css({
                            "z-index": "0"
                        }).animate({
                            "top": "0",
                            "z-index": "2000"
                        }, 300, "linear");


                        //target.parents('[data-view-scroll="wrap"]').find('[data-view-scroll="box"]').removeClass("on");
                        if (!target.is(":animated")) {
                            target.stop().css({
                                "z-index": "2000"
                            }).animate({
                                "top": "100%",
                                "z-index": "0"
                            }, 300, "linear");

                        }

                        target.prev().attr("data-hit", "on");
                        target.prev().addClass("on");
                    } else {

                        $('[data-view-scroll-position="x"]').css('opacity', '0')

                        target_prev = target.prevAll('[data-view-scroll-position="y"]').eq(0);
                        target = target;
                        //target.parents('[data-view-scroll="wrap"]').find('[data-view-scroll="box"]').removeClass("on");

                        box.css({
                            "z-index": "0"
                        });

                        target_prev.stop().css({
                            "top": "-100%",
                            "z-index": "0"
                        }).animate({
                            "top": "0",
                            "z-index": "2000"
                        }, 300, "linear");

                        target.stop().animate({
                            "top": "100%",
                            "z-index": "0"
                        }, 300, "linear");

                        target_prev.attr("data-hit", "on");
                        target_prev.addClass("on");
                    }
                }
            }

            $("body").attr("data-pagenumber", target.index());

            $("#container .controll span").css("width", ((100 / $('[data-view-scroll="box"]').size() + 1) * target.index()) + "%");
        } else if (g === "ArrowUp" && target.index() == -1) {

            alert(target.index())
            $("body").attr("data-pagenumber", $('[data-view-scroll="box"]').size() - 1);


        } else if (g === "ArrowRight") {

            target = target.next();

            target.check = target.attr('data-view-scroll-position');
            if (target.length !== 0) {
                if (target.check === 'y') {
                    box.css({
                        "z-index": "0"
                    });
                    if (!target.is(":animated")) {
                        target.stop().css({
                            "left": "0",
                            "top": "100%",
                            "z-index": "2000"
                        }).animate({
                            "top": "0"
                        }, 300, "linear");
                    }

                } else if (target.check === 'x') {
                    box.css({
                        "z-index": "0"
                    });
                    if (!target.is(":animated")) {
                        target.stop().css({
                            "left": "100%",
                            "top": "0",
                            "z-index": "2000",
                            "opacity": '1'
                        }).animate({
                            "left": "0"
                        }, 400, "linear");
                    }
                }
                target.attr("data-hit", "on");
                target.addClass("on");
            }


        } else if (g === "ArrowLeft") {

            if (box.index(target) !== 0) {
                target.check = target.attr('data-view-scroll-position');
                if (target.length !== 0) {
                    if (target.check === 'y') {
                        box.css({
                            "z-index": "0"
                        });
                        //target.parents('[data-view-scroll="wrap"]').find('[data-view-scroll="box"]').removeClass("on");
                        if (!target.is(":animated")) {
                            target.stop().animate({
                                "top": "100%"
                            }, 400, "linear");
                        }
                    } else if (target.check === 'x') {
                        box.css({
                            "z-index": "0"
                        });
                        if (!target.is(":animated")) target.stop().animate({
                            "left": "100%",
                            "opacity": '1'
                        }, 400, "linear");
                    }
                }
            }
            target.prev().attr("data-hit", "on");
            target.prev().addClass("on");

        }
        callback();
    }

    // *** 키보드 컨트롤 ::E ***////






    /* 터치 스크롤 (모바일) down::S */

    function touchEvent(event, t, callback) {

        $('#header').addClass("on");

        var target = ($('[data-view-scroll="box"][data-hit="on"]').size() !== 0) ? $('[data-view-scroll="box"][data-hit="on"]') : $('[data-view-scroll="box"]').eq(0);
        var scrollTops = 0;
        var scrollBottom = 0;

        box.removeAttr("data-hit");
        //box.removeClass("on");


        if (t === "down" && scrollBottom <= 0) {
            if(target.find(".img_stepbox").size() != 0){
                if(target.attr("data-per") ==  target.find(".in").size()){

                    if (target.next().is('[data-view-scroll-position="y"]')) {
                        target = target.next();
                    } else {
                        target = target.nextAll('[data-view-scroll-position="y"]').eq(0)
                    }

                    target.check = target.attr('data-view-scroll-position');

                    if (target.length !== 0) {
                        if (target.check === 'y') {
                            box.css({
                                "z-index": "0"
                            });

                            if (!target.is(":animated")) {
                                target.stop().css({
                                    "left": "0",
                                    "top": "100%",
                                    "z-index": "2000"
                                }).animate({
                                    "top": "0"
                                }, 500, "linear");
                            }
                        }
                    }
                    target.attr("data-hit", "on");
                    target.addClass("on");
                    $("body").attr("data-pagenumber", target.index());

                    $("#container .controll span").css("width", ((100 / $('[data-view-scroll="box"]').size() + 1) * target.index()) + "%");


                    if (target.index() == -1) {
                        $("body").attr("data-pagenumber", "footer");
                    }
                }
            }else if(target.find(">div").attr("id") == "sec01"){
                if (target.next().is('[data-view-scroll-position="y"]')) {
                    target = target.next();
                } else {
                    target = target.nextAll('[data-view-scroll-position="y"]').eq(0)
                }

                target.check = target.attr('data-view-scroll-position');

                if (target.length !== 0) {
                    if (target.check === 'y') {
                        box.css({
                            "z-index": "0"
                        });

                        if (!target.is(":animated")) {
                            target.stop().css({
                                "left": "0",
                                "top": "100%",
                                "z-index": "2000"
                            }).animate({
                                "top": "0"
                            }, 500, "linear");
                        }
                    }
                }
                target.attr("data-hit", "on");
                target.addClass("on");
                $("body").attr("data-pagenumber", target.index());

                $("#container .controll span").css("width", ((100 / $('[data-view-scroll="box"]').size() + 1) * target.index()) + "%");


                if (target.index() == -1) {
                    $("body").attr("data-pagenumber", "footer");
                }
            }else{
                if(target.attr("data-per") ==  "10"){

                    if (target.next().is('[data-view-scroll-position="y"]')) {
                        target = target.next();
                    } else {
                        target = target.nextAll('[data-view-scroll-position="y"]').eq(0)
                    }

                    target.check = target.attr('data-view-scroll-position');

                    if (target.length !== 0) {
                        if (target.check === 'y') {
                            box.css({
                                "z-index": "0"
                            });

                            if (!target.is(":animated")) {
                                target.stop().css({
                                    "left": "0",
                                    "top": "100%",
                                    "z-index": "2000"
                                }).animate({
                                    "top": "0"
                                }, 500, "linear");
                            }
                        }
                    }
                    target.attr("data-hit", "on");
                    target.addClass("on");
                    $("body").attr("data-pagenumber", target.index());

                    $("#container .controll span").css("width", ((100 / $('[data-view-scroll="box"]').size() + 1) * target.index()) + "%");


                    if (target.index() == -1) {
                        $("body").attr("data-pagenumber", "footer");
                    }
                }
            }
        }
        callback();
    }

    /* 터치 스크롤 (모바일) down::E */




    /* 마우스 휠, 키보드 컨트롤 */

    var scrollCheck = true;
    $(window).on("mousewheel keydown", _.debounce(function (event) {
        if (scrollCheck) {
            scrollCheck = false;
            if (event.type == 'keydown') { // 키보드 컨트롤

                var g = event.key

                keydownEvent(event, g, function () {
                    scrollCheck = true;
                });

            } else if (event.type === 'mousewheel') { // 마우스 휠 컨트롤
                var c = (event.originalEvent.deltaY < 0) ? "up" : "down"
                scrollEvent(event, c, function () {
                    scrollCheck = true;
                });
            }
        }

    }, 300));




    /* 모바일 체스처 */

    var startX, startY, endX, endY;

    $(window).on('touchstart', function (event) {
        startX = event.originalEvent.changedTouches[0].screenX;
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $(window).on('touchend', function (event) {
        endX = event.originalEvent.changedTouches[0].screenX;
        endY = event.originalEvent.changedTouches[0].screenY;
        if (startY - endY > 50) { // / 아래에서 위로
            var t = "down";
            touchEvent(event, t, function () {
                scrollCheck = true;
                event.preventDefault();
            });
            event.stopPropagation();
            return false;

        } else if (endY - startY > 50) { // 위에서 아래로
            var t = "up";
            scrollEvent(event, t, function () {
                scrollCheck = true;
                event.preventDefault();
            });
            event.stopPropagation();
            return false;
        }
        if (startX - endX > 50) { // 오른쪽에서 왼쪽으로
            var t = "next";

            if (scrollCheck) {
                scrollCheck = false;
                scrollEvent('null', t, function () {
                    scrollCheck = true;
                    event.preventDefault();
                });
            }
            event.stopPropagation();
            return false;

        } else if (endX - startX > 50) { // 왼쪽에서 오른쪽으로
            var t = "prev";

            if (scrollCheck) {
                scrollCheck = false;
                scrollEvent('null', t, function () {
                    scrollCheck = true;
                    event.preventDefault();
                });
            }
            event.stopPropagation();
            return false;
        }

    });




    box.on("scroll touchstart", function () {
        var target = $(this);
        var scrollBottom = target.find(">.ins").innerHeight() - $(document).height() - target.scrollTop();
        var per = scrollBottom / (target.find(">.ins").innerHeight() - $(document).height()) * 100;
        per = 100 - per;
        var pers = ~~(per);

        per = ~~(per / 10);
        if (target.find(">.ins >div").hasClass("img_stepbox")) {
            per = (scrollBottom / (target.find(">.ins").innerHeight() - $(document).height()) * (target.find(">.ins >div .text_box .layout .in").size() * 10))
            /*
             */
            ;
            per = (target.find(">.ins >div .text_box .layout .in").size() * 10) - per;
            per = ~~(per / 10);
            pers = ~~(per);

            // console.log(per);

        }



        if (per < 0) {
            per = per * -1;
        }

        box.removeAttr("data-hit");
        //box.removeClass("on");
        target.attr({
            'data-per': per,
            'data-pers': pers
        });
        target.attr("data-hit", "on");
        target.addClass("on");


        for (var i = 0; i < arr.length; i++) {
            var ob = target.find(">.ins >div");
            var step = per;
            var scale = "";
            var origin_x = "";
            var origin_y = "";
            var n_width = document.getElementById("bg_img").naturalWidth;
            var n_height = document.getElementById("bg_img").naturalHeight;



            ob.find(".steps >span").removeClass("on");
            if (target.find(">.ins >div").hasClass("img_stepbox")) {
                per = (scrollBottom / (target.find(">.ins").innerHeight() - $(document).height()) * (target.find(">.ins >div .text_box .layout .in").size() * 10))
                /*
                 * /
                 * target.find(">.ins
                 * >div
                 * .text_box
                 * .layout
                 * .in").size()
                 */
                ;
                per = (target.find(">.ins >div .text_box .layout .in").size() * 10) - per;
                per = ~~(per / 10);
                // console.log(per);

            }
            ob.find(".steps >span").eq(step).addClass("on");

            scale = ob.find(".steps >span").eq(step).attr("data-transform-scale");
            origin_x = ob.find(".steps >span").eq(step).attr("data-transform-origin-x");
            origin_y = ob.find(".steps >span").eq(step).attr("data-transform-origin-y");
            if (scale != undefined && origin_x != undefined && origin_y != undefined) {

            } else if (ob.hasClass("img_step2")) {

            } else {
                scale = 1;
            }


            ob.find(".img_box").css({
                'transform': 'scale(' + scale + ')',
                '-webkit-transform': 'scale(' + scale + ')',
                "transform-origin": "" + ((origin_x / n_width) * 100) + "% " + ((origin_y / n_height) * 100) + "%",
                "-webkit-transform-origin": "" + ((origin_x / n_width) * 100) + "% " + ((origin_y / n_height) * 100) + "%"
            });

            if (ob.hasClass("img_step2")) {

                for (var j = 0; j < target.find(">.ins >div .text_box .layout .in").size(); j++) {
                    if (ob.find(".text_box .layout .in >div").hasClass("exh-text-center")) {
                        if (ob.find(".text_box .layout .in").eq(j).offset().top < $(window).height() * -0.2) {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "0"
                            });
                        } else {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "1"
                            });
                        }
                    } else if (ob.find(".text_box .layout .in >div").hasClass("exh-text-left-top") || ob.find(".text_box .layout .in >div").hasClass("exh-text-left-top")) {
                        if (ob.find(".text_box .layout .in").eq(j).offset().top < $(window).height() * 0.1) {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "0"
                            });
                        } else {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "1"
                            });
                        }
                    } else {
                        if (ob.find(".text_box .layout .in").eq(j).offset().top < $(window).height() * -0.5) {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "0"
                            });
                        } else {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "1"
                            });
                        }
                    }
                }


                var scales = ($('.img_step2 .fix_box .steps span').last().attr("data-transform-scale"));
                var xs = ($('.img_step2 .fix_box .steps span').last().attr("data-transform-origin-x"));
                var ys = ($('.img_step2 .fix_box .steps span').last().attr("data-transform-origin-y"));


                if ($('.img_step2 .text_box .in').eq(1).offset().top < ($(window).height() / 2)) {

                    for (var i = step; i < 12; i++) {
                        $('.img_step2 .fix_box .steps span').eq(i).attr("data-transform-scale", scales);
                        $('.img_step2 .fix_box .steps span').eq(i).attr("data-transform-origin-x", xs);
                        $('.img_step2 .fix_box .steps span').eq(i).attr("data-transform-origin-y", ys);
                        // console.log(i);
                    }
                }
            } else if (ob.hasClass("img_stepbox")) {
                ob = $(".img_stepbox");
                ob.parent().parent().addClass("on");
                for (var j = 0; j < ob.find(".text_box .layout .in").size(); j++) {



                    // console.log(ob.find(".text_box
                    // .layout
                    // .in").eq(j).find(">div").children().length);

                    if (ob.find(".text_box .layout .in >div").hasClass("exh-text-center")) {
                        if (ob.find(".text_box .layout .in").eq(j).offset().top < $(window).height() * -0.2) {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "0"
                            });
                        } else {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "1"
                            });
                        }
                    } else if (ob.find(".text_box .layout .in >div").hasClass("exh-text-left-top") || ob.find(".text_box .layout .in >div").hasClass("exh-text-left-top")) {
                        if (ob.find(".text_box .layout .in").eq(j).offset().top < $(window).height() * 0.1) {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "0"
                            });
                        } else {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "1"
                            });
                        }
                    } else {
                        if (ob.find(".text_box .layout .in").eq(j).offset().top < $(window).height() * -0.5) {
                            ob.find(".text_box .layout .in").eq(j).stop().css({
                                "opacity": "0"
                            });
                        } else {
                            ob.find(".text_box .layout .in").eq(j - 1).stop().css({
                                "opacity": "1"
                            });
                        }
                    }



                }
                
                if(target.attr("data-per") == ob.find(".text_box .layout .in").size()){
                    target.addClass("last");
                }else{
                    target.removeClass("last");
                }
            }
        }
    });

    $('[data-view-scroll="prev"]').on("click", function () {
        if (scrollCheck) {
            scrollCheck = false;
            scrollEvent('null', "prev", function () {
                scrollCheck = true;
            });
        }
    });

    $('[data-view-scroll="next"]').on("click", function () {
        if (scrollCheck) {
            scrollCheck = false;
            scrollEvent('null', "next", function () {
                scrollCheck = true;
            });
        }
    });



    /*
     * const passiveEvent = passiveEventSupported ? {capture: false,
     * passive: true} : false document.addEventListener("scroll", onScroll,
     * passiveEvent);
     */



}


/*
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 *
 * mobile check Function
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 */
$(document).ready(function () {
    mobile_check_AC();
    $(window).resize(function () {
        mobile_check_AC();
    });
});

function mobile_check_AC() {
    var ch = "";

    if ($(".js_mobile_check").is(":hidden") && $(".js_tablet_check").is(":hidden")) {
        ch = "pc";
    } else if ($(".js_mobile_check").is(":hidden") && !$(".js_tablet_check").is(":hidden")) {
        ch = "tab";
    } else {
        ch = "mobile";
    }

    if (!$("body").hasClass(ch)) {
        if (ch == "mobile") $("body").removeClass("pc tab");
        if (ch == "tab") $("body").removeClass("pc mobile");
        if (ch == "pc") $("body").removeClass("tab mobile");
        $("body").addClass(ch);
    }
}

/*
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 *
 * 셀랙트 js
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 */
$(document).ready(function () {
    if ($("[data-skin='select']").size() != 0) {
        selectbox_AC();
    }
});

function selectbox_AC() {
    var obj = $("[data-skin='select']");

    obj.each(function () {
        var t = $(this);
        t.btn = t.find(">a");
        t.ul = t.find(">ul");
        t.ul.li = t.ul.find(">li");



        t.btn.on("click", function () {
            if (t.ul.is(":animated")) return false;
            $(this).parent().siblings("div").find(">a.on").removeClass("on").siblings("ul").slideUp(300);
            $(this).toggleClass("on").siblings("ul").slideToggle(300);
            return false;
        });

        t.ul.li.find(">a").on("click", function () {
            $(this).parent().siblings().find(">a.on").removeClass("on");
            $(this).addClass("on");
            t.btn.html($(this).find(">span").clone());
            t.find(">input").attr("value", t.btn.text());
            t.find(">ul").slideUp(300);

            return false;
        });



        t.ul.on("mouseleave", function () {
            $(this).parent().find(">a").removeAttr("class");
            $(this).parent().find(">div").slideUp(300);
            return false;
        });

        /*
         * t.ul.li.last().find(">a").on("focusout",function() {
         * $(this).parent().parent().siblings("a").removeAttr("class");
         * $(this).parent().parent().slideUp(300); return false; });
         */
    });
}



/*
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 *
 * MainFullpage
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

$(function () {
    // MainFull();

});

function MainFull() {
    var obj = $('[data-view-scroll="wrap"]');
    // obj.move = obj.find(">.move");
    obj.box = obj.find('[data-view-scroll="box"]');
    obj.sc = "";
    obj.page = 0;

    $('<div class="controll"><div class="layout"><span></span></div></div>').appendTo(obj);


    function _page(idx) {
        // $("body").attr("data-pullpage",idx);
        // obj.find(">.controll>.layout>a").removeClass("on").eq(idx).addClass("on");
        obj.find(">.controll>.layout>span").css("width", ((100 / obj.box.size() + 1) * idx) + "%");
        obj.page = idx;
    }

    function _move(idx) {
        if (obj.move.is(":animated")) return false;
        var arrowCheak = "down";
        if (idx < obj.page) arrowCheak = "up";
        // console.log(ch);

        // check
        // var _box = obj.move.find(">[data-page='"+(obj.page+1)+"']");
        var _box = obj.find(">[data-page='" + (obj.page + 1) + "']");
        /*
         * var h = obj.move.innerHeight(); var s_h =
         * _box[0].scrollHeight; //console.log(h,s_h); if(h < s_h){
         * //스크롤있다 var s_t = _box.scrollTop(); var s_b = s_h - h - s_t;
         *
         * if((arrowCheak == "up" && s_t == 0) || (arrowCheak == "down" &&
         * s_b == 0)){ } else { return false; } }
         */

        if ($("body").attr("data-pullpage") == "max" && idx == obj.box.size() - 2) {
            idx = obj.box.size() - 1;
            $("body").removeAttr("data-pullpage");
        }
        if (idx > obj.box.size() - 1) {
            idx = obj.box.size() - 1;
            // footer 출현
            $("body").attr("data-pullpage", "max");
        } else {
            $("body").removeAttr("data-pullpage");
            if (idx < 0) idx = 0;
            $("body").attr("data-pagenumber", idx);
        }
        if (idx < 0) idx = 0;
        var t = -100 * idx;

        /*
         * obj.move.animate({"top":t+"%"},700);
         * obj.attr("data-scroll-count",(t / -100));
         */
        setTimeout(function () {
            obj.move.find(">div").removeAttr("data-steps");
            obj.move.find(">div").eq(t / -100).attr("data-steps", +"0");
        }, 700);

        // page
        _page(idx);


    }
    _move(0);
    $('[data-view-scroll="wrap"]').on('mousewheel DOMMouseScroll', function (e) {
        var x = e.originalEvent.wheelDelta || ((e.originalEvent.deltaY * -1) || (e.originalEvent.detail * -1));
        var idx = (x < 0) ? obj.page + 1 : obj.page - 1;
        console.log(idx);
        _move(idx);
    });
}


/*
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 *
 * 배경이미지
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

$(function () {
    if ($("body#main").size() != 0) {
        main_slide_bg();
        // main_slide_bg02()
    }
});

function main_slide_bg() {
    var obj = $('[data-slide="yes"] .text_box .js_slide .move ul li');
    obj.imgsrc = '';
    for (var i = 0; i < obj.size(); i++) {
        if (!obj.eq(i).find(">div").hasClass(".gallery")) {
            obj.imgsrc = obj.eq(i).find(">a >img").attr("src");
            obj.eq(i).find(">div").css("background-image", "url(" + obj.imgsrc + ")");
        } else {

        }

    }
}



window.scrollTo({
    top: 0,
    behavior: 'smooth'
})

/*
 * function main_slide_bg02(){ var obj = $('[data-fixed="yes"] .inner .fix_box
 * .img_box'); obj.imgsrc = ''; obj.imgsrc = obj.find(".bgimg").attr("src");
 *
 * obj.css("background-image","url(" + obj.imgsrc + ")"); }
 */