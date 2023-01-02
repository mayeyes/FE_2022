
        function subpage_dept1_menu_handler(){
          if($("#subpage_top_menu").attr("data-status") == "small"){
              $(this).addClass("dept2_wrap_on");
              $(this).children("a").children(".title").addClass("dept2_on_title");
              $(this).children(".sub_menu").removeClass("invisible");
              $(this).children(".sub_menu").addClass("visible");
          }else{
              subpage_dept1_menu_handler_clear()
          }
      }
      function subpage_dept1_menu_leave_handler(){
          if($("#subpage_top_menu").attr("data-status") == "small"){
              $(this).removeClass("dept2_wrap_on");
              $(this).children("a").children(".title").removeClass("dept2_on_title");
              $(this).children(".sub_menu").addClass("invisible");
              $(this).children(".sub_menu").removeClass("visible");
          }else{
              subpage_dept1_menu_handler_clear()
          }
      }
      function subpage_dept1_menu_handler_clear(){
          $(".dept2_wrap_on").removeClass("dept2_on");
          $(".visible").removeClass("visible");
          $(".invisible").removeClass("invisible");
      }
      
      var jqGridResizeGap = 0;
      function jqGridResizeAll(){
          var grids = $("table[class^='ui-jqgrid']");
          $.each(grids, function(idx, item){
              if(item.id != ""){
                  $(item).jqGrid("setGridWidth", $(".content").width() - jqGridResizeGap);
              }
          });
      }
      function highchartResizeAll(){
          $(".highcharts-container").parent().each(function(){
          if($(this).highcharts()){
                  $(this).highcharts().reflow();
              }
          });
      }
      function setMenuTargetSmall(){
          $("#subpage_top_menu").find("a").each(function(){
              var href = $(this).attr("href");
              if(href != "javascript:void(0);"){
                  if(href.indexOf("&menuSize=small") == -1){
                      $(this).attr("href", href + "&menuSize=small");
                  }
              }
          });
      }
      function setMenuTargetLarge(){
          $("#subpage_top_menu").find("a").each(function(){
              var href = $(this).attr("href");
              $(this).attr("href", href.replace("&menuSize=small", ""));
          });
      }
      function initMenu(){
          var attr = $(".wrap").attr("class");
          if(attr.indexOf("collapse") >= 0){
              //축소된 상태
              $("#subpage_top_menu").attr("data-status", "small");
              $(".sub_menu").removeClass("visible");
              $(".sub_menu").addClass("invisible");
              $(".subpage_dept1_menu").on("mouseover", subpage_dept1_menu_handler);
              $(".subpage_dept1_menu").on("mouseleave", subpage_dept1_menu_leave_handler);
              $(".sub_menu").addClass("submenu_small");
              setMenuTargetSmall();
          }else{
              //확대된 상태
              $("#subpage_top_menu").attr("data-status", "large");
              $(".invisible").removeClass("invisible");
              $(".visible").removeClass("visible");
              $(".subpage_dept1_menu").off("mouseover");
              $(".sub_menu").removeClass("submenu_small");
              setMenuTargetLarge();
              subpage_dept1_menu_handler_clear();
          }
      }
      $(document).ready(function(){
          
          try{
              initMenu();
          }catch(e){
              console.log("메뉴가 없는 화면 입니다.");
          }
          
          $(".menu").click(function(){
              $(".wrap").toggleClass('collapse');
              var attr = $(".wrap").attr("class");
              if(attr.indexOf("collapse") >= 0){
                  //축소된 상태
                  $("#subpage_top_menu").attr("data-status", "small");
                  $(".sub_menu").removeClass("visible");
                  $(".sub_menu").addClass("invisible");
                  $(".subpage_dept1_menu").on("mouseover", subpage_dept1_menu_handler);
                  $(".subpage_dept1_menu").on("mouseleave", subpage_dept1_menu_leave_handler);
                  $(".sub_menu").addClass("submenu_small");
                  history.pushState(null, null, location.href.replace(location.href, location.href+"&menuSize=small"));
                  setMenuTargetSmall();
              }else{
                  //확대된 상태
                  $("#subpage_top_menu").attr("data-status", "large");
                  $(".invisible").removeClass("invisible");
                  $(".visible").removeClass("visible");
                  $(".subpage_dept1_menu").off("mouseover");
                  $(".sub_menu").removeClass("submenu_small");
                  history.pushState(null, null, location.href.replace("&menuSize=small", ""));
                  setMenuTargetLarge();
                  subpage_dept1_menu_handler_clear();
              }
              setTimeout(function(){
                  jqGridResizeAll();
                  highchartResizeAll();
              }, 300);
          });
          $(".wrap a").click(function() {
              var link = $(this);
              var closest_ul = link.closest("ul");
              var parallel_active_links = closest_ul.find(".active")
              var closest_li = link.closest("li");
              var link_status = closest_li.hasClass("active");
              var count = 0;
      
              closest_ul.find("ul").slideUp(function() {
                      if (++count == closest_ul.find("ul").length)
                              parallel_active_links.removeClass("active");
              });
      
              if (!link_status) {
                      closest_li.children("ul").slideDown();
                      closest_li.addClass("active");
              }
          })
      });