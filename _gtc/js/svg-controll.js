var svg = {
    set:function(){
        var obj = $("#svg");
        var grap = $("#svg-report");
            grap.btn = grap.find(" input:radio");
            grap.btnView = grap.find(" [data-sw]");
            grap.box = grap.find(" .grap");
        var sw = $("#svg-controll");
            sw.btn = sw.find(" input:checkbox");
        var tanso = $("#svg-tanso");
            tanso.val_1 = tanso.find(">.midd>.in>div>span");
            tanso.val_2 = tanso.find(">.midd>.in>em");

        var controll = {
            change:function(str){
                var ob = obj.find(">."+$.trim(str.attr("class")));
                var gr = grap.find(" .grap-"+$.trim(str.attr("class")));
                var c = str.is(":checked");
                ob.attr("data-"+$.trim(str.attr("class")),(c)?"on":"off");
                if(gr.is(":checked")) gr.prop("checked",false);
                gr.prop("disabled",(c)?false:true);
                if(c){
                    gr.prop("checked",true).trigger("change");
                } else {
                    gr.prop("checked",false).trigger("change");
                    grap.find(" input:radio:not(':disabled')").last().prop("checked",true).trigger("change");
                }

                if($.trim(str.attr("class")) === "sun"){
                    obj.attr("data-sun",(c)?"on":"off");
                } else if($.trim(str.attr("class")) === "joryu"){
                    obj.attr("data-joryu",(c)?"on":"off");
                }
            },
            grapBind:function(str){
                var idx = grap.btn.index(str);
                var c = str.is(":checked");

                if(c){
                    // 그래프 바인드
                    if(idx===0){
                        // 태양광
                        grap.box.html("태양광<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 30%");
                        tanso.val_1.find(">i").html("30%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:10%");
                        tanso.val_2.find(">span").html("3000");
                    } else if(idx===1){
                        // 풍력
                        grap.box.html("풍력<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 50%");
                        tanso.val_1.find(">i").html("50%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:30%");
                        tanso.val_2.find(">span").html("1000");
                    } else if(idx===2){
                        // 바이오에너지
                        grap.box.html("바이오에너지<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 80%");
                        tanso.val_1.find(">i").html("80%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:5%");
                        tanso.val_2.find(">span").html("400");
                    } else if(idx===3){
                        // 수력
                        grap.box.html("수력<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 30%");
                        tanso.val_1.find(">i").html("30%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:10%");
                        tanso.val_2.find(">span").html("3000");
                    } else if(idx===4){
                        // 조력
                        grap.box.html("조력<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 50%");
                        tanso.val_1.find(">i").html("50%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:60%");
                        tanso.val_2.find(">span").html("300");
                    } else if(idx===5){
                        // 조류
                        grap.box.html("조류<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 50%");
                        tanso.val_1.find(">i").html("50%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:30%");
                        tanso.val_2.find(">span").html("500");
                    } else if(idx===6){
                        // 파력
                        grap.box.html("파력<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 30%");
                        tanso.val_1.find(">i").html("30%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:20%");
                        tanso.val_2.find(">span").html("1000");
                    } else if(idx===7){
                        // 수소연료전지
                        grap.box.html("수소연료전지<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 60%");
                        tanso.val_1.find(">i").html("60%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:16%");
                        tanso.val_2.find(">span").html("1200");
                    } else if(idx===8){
                        // 태양열
                        grap.box.html("태양열<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 30%");
                        tanso.val_1.find(">i").html("30%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:10%");
                        tanso.val_2.find(">span").html("3000");
                    } else if(idx===9){
                        // 지열/수열
                        grap.box.html("지열/수열<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 20%");
                        tanso.val_1.find(">i").html("20%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:20%");
                        tanso.val_2.find(">span").html("200");
                    } else if(idx===10){
                        // LULUCF
                        grap.box.html("LULUCF<br />막대그래프(665px * 144px)");
                        // 탄소 그래프 수치
                        tanso.val_1.attr("style","flex:0 0 50%");
                        tanso.val_1.find(">i").html("50%");
                        //탄소 중립 수치
                        tanso.val_2.attr("style","bottom:70%");
                        tanso.val_2.find(">span").html("700");
                    }
                } else {
                    // 선택값 없음(초기화 값)
                    // 태양광
                    grap.box.html("막대그래프(665px * 144px)");
                    // 탄소 그래프 수치
                    tanso.val_1.attr("style","flex:0 0 0%");
                    tanso.val_1.find(">i").html("0%");
                    //탄소 중립 수치
                    tanso.val_2.attr("style","bottom:0%");
                    tanso.val_2.find(">span").html("0");
                }
            },
            view:function(str){
                var c = str.attr("data-sw");
                grap.attr("data-view",c);
            },
            init:function(){
                var _this = this;

                sw.btn.on("change",function(){_this.change($(this))});
                grap.btn.on("change",function(){_this.grapBind($(this))});

                grap.btnView.on("click",function(){_this.view($(this))});
            }
        }
        controll.init();
        
    },
    init:function(){
        this.set();
    }
}
// svg-controll

svg.init();