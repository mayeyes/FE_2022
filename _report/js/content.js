$(function(){
    header.tab.init();// Header tab
    dark.init();
})
var dark = {
    init:function(){
        if(window.location.search.indexOf("skin=dark") !== -1) $("body").attr("data-dark","on");
    }
}
var header = {
    tab:{
        start:function(str){
            var obj = str;
                obj.btn = obj.find(" a");
            var _this = this;
            obj.btn.on("click",function(){_this.set(obj,$(this));return false;});
            obj.btn.eq(1).trigger("click");
        },
        set:function(obj,str){
            var idx = obj.btn.index(str)+1;
            $("body").attr("data-page",idx);

            var fileList = (idx===1)?'project':(idx===2)?'dash':'list';
            $.ajax(`./${fileList}.html`)
                .done(function(data) {
                    $("#middle").html(data);
                    if(idx===1) project.init();
                    else if(idx===2) dash.init();
                    else if(idx===3) list.init();
                })
        },
        init:function(){
            if($("#header .tab").length !== 0){
                this.start($("#header .tab"));
            }
        }
    }
}

// 개인정보
var user = {
    add:function(){
        var _this = this;
        $.ajax(`./user-pop.html`)
            .done(function(data) {
                $("#user-pop").html(data);
                $("body").attr("data-user-pop","on");
                _this.file();
            })
    },
    save:function(){
        //등록
        this.close();
    },
    close:function(){
        $("body").removeAttr("data-user-pop");
    },
    file:function(){
        function readImage(input) {
            if(input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e){
                    $("#user-photo-file-bg").attr("style","background-image:url("+e.target.result+")");
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        document.getElementById("user-photo-file").addEventListener("change", function(e){readImage(e.target)});
    }
}

//프로젝트
var project = {
    add:function(){
        //Add Project
        $.ajax(`./project-pop.html`)
            .done(function(data) {
                $("#project-pop").html(data);
                $("body").attr("data-project-pop","on");
                $('#project-pop .air-datepicker').datepicker();
            })
    },
    save:function(){
        //저장
        $("body").removeAttr("data-project-pop");
    },
    close:function(){
        $("body").removeAttr("data-project-pop");
    },
    init:function(){
        // console.log("project");
        _scroll.init($("#middle"));//스크롤 적용
    }
}

//대시보드
var dash = {
    card:{
        add:function(){
            //Add another card
            $.ajax(`./dash-pop.html`)
                .done(function(data) {
                    $("#dash-pop").html(data);
                    $("body").attr("data-dash-pop","on");
                    $('#dash-pop .air-datepicker').datepicker();
                })
        },
        view:function(){
            //카드 클릭시
            $.ajax(`./dash-pop.html`)
                .done(function(data) {
                    $("#dash-pop").html(data);
                    $("body").attr("data-dash-pop","on");
                    $('#dash-pop .air-datepicker').datepicker();
                })
        },
        save:function(){
            //등록
            this.close();
        },
        close:function(){
            $("body").removeAttr("data-dash-pop");
        }
    },
    search:{
        open:function(){
            //검색 팝업 오픈
            dash.card.close();
            $.ajax(`./dash-search.html`)
                .done(function(data) {
                    $("#dash-search").html(data);
                    $("body").attr("data-dash-search","on");
                })
        },
        close:function(){
            $("body").attr("data-dash-pop","on");
            $("body").removeAttr("data-dash-search");
        }
    },
    init:function(){
        // console.log("dash");
        _scroll.init($("#middle"));//스크롤 적용
    }
}

//리스트
var list = {
    init:function(){
        // console.log("list");
        _scroll.init($("#middle"));//스크롤 적용
    }
}