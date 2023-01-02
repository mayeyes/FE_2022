/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	[accor_AC] js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function () {
    accor_AC();   // pc
});


$(function(){
	var win_w = $(window).width()
		
	if(751 > win_w){
		select_AC()  //모바일
	}

 })


function accor_AC() {
    var obj = $("#sec_02>ul>li .midd>.tab_box>.tab_cont>ul");
    obj.tit = obj.find(".tit");
    obj.inner = obj.find(".inners");


    obj.tit.click(function () {
        var boxs = $(this).siblings(".inners");
        var idx = $(this).parent().index(); //인텍스 찾기

        if (boxs.is(":hidden")) {
            obj.inner.not(":hidden").siblings(".tit").removeClass("on");
            obj.inner.not(":hidden").slideUp(300);
            boxs.siblings(".tit").addClass("on");
            boxs.slideDown(300);
        } else {
            obj.tit.removeClass("on");
            boxs.slideUp(300);
        }

        $(this).closest(".midd").find(".map_box>ul>li").removeClass("on").eq(idx).addClass("on"); // 같은 인텍스 맵 노출
        return false;
    });
}


function select_AC() {
    var obj = $("#sec_02>ul>.sec_02_01 .midd>.tab_box>[data-skin='select'] select")
        obj.option = obj.find("> option")
        obj.option_reset = obj.find("> option:eq(0)")
        
        // 초기화
        obj.option_reset.attr('selected','selected')
        $(".map_box>ul>li").removeClass("on").eq(0).addClass("on");
        $(".inform_box").attr('data-open', "on")
        $(".inform_box>ul>li").removeClass("on").eq(0).addClass("on");


        obj.change(function() {
            obj.option_selected = obj.find(":selected")
            idx = obj.option_selected.index()

            $(this).closest(".midd").find(".map_box>ul>li").removeClass("on").eq(idx).addClass("on"); // 같은 인텍스 맵 노출
            $(this).closest(".midd").find(".inform_box>ul>li").removeClass("on").eq(idx).addClass("on"); //같은 인텍스 인포 노출

            return false;

        }); 
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	[inform_box] tab js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function () {
    tabs_js();
});


function tabs_js() {
    var obj_btn = $("#sec_02>ul>li .midd>.map_box>.map_cont>li[data-map]>button")
        inform = $("#sec_02>ul>li .midd>.inform_box");

    obj_btn.click(function () {
        var idx = $(this).parent().index();

        inform.attr('data-open', "on")
        $(this).closest(".midd").find(".inform_box>ul>li").removeClass("on").eq(idx).addClass("on");
        return false;
    });
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	tab js 모바일 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(function () {
    var tab_box = $("#sec_02>ul>.sec_02_01 .midd>.tab_box")
    select_tab_box = tab_box.find('.select_tab_box')
    tab_cont = tab_box.find('.tab_cont')
    title = $('#sec_02>ul>.sec_02_01 .midd>.tab_box .tab_cont ul>li>.tit>a')
    inform__box = $('#sec_02>ul>.sec_02_01 .midd>.inform_box')

    select_tab_box.click(function () {
        if (tab_box.hasClass('on')) {
            tab_box.removeClass('on')
        } else {
            tab_box.addClass('on')
        }
    })

    title.click(function () { // 타이틀 값 변경
        var val = $(this).text()

        select_tab_box.find('p').text(val);
        inform__box.attr('data-open', 'off')

    })
})



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	chart.js 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */


// const doughnutLabels = {
//     id: 'doughnutLabels',
//     afterDraw(chart, args, options) {

//         chart.data.datasets.forEach((dataset, i) => {
//             chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
//                   console.log(dataset.data[index])
//                 // const textWidth =  chart.measureText(dataset.data[index]);

//             });
//         });
//     }
// }




/* 유네스코 유형별 차트*/

/* Elements */
const dou_chatr_01 = document.getElementById('dou_chatr_01');
const myChart = new Chart(dou_chatr_01, {
    type: 'doughnut',
    data: {
        labels: ['Oral traditions and representations', 'Performing Arts', 'Social practices, rituals, festive events', 'Knowledge and practrices about nature and the universe', 'Traditional craft skils', 'Others'],
        datasets: [{
            data: [24, 24, 24, 24, 24, 24],
            backgroundColor: [
                'rgba(123, 141, 247, 1)',
                'rgba(181, 174, 249, 1)',
                'rgba(243, 173, 204, 1)',
                'rgba(244, 219, 136, 1)',
                'rgba(164, 231, 199, 1)',
                'rgba(235, 144, 84, 1)'
            ],
        }],
        hoverOffset: 4
    },
    plugins: [ChartDataLabels],
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#fff',
                font: {
                    size: 14,
                    weight: 500
                }
            },
            tooltip: {
                padding: 10,
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        const label = [
                            `${context.parsed}`,
                            `${context.label}`,
                        ];
                        return label;
                    },
                }
            }
        }
    },


});





/* Photo */
const dou_chatr_02 = document.getElementById('dou_chatr_02');
const myChart_02 = new Chart(dou_chatr_02, {
    type: 'doughnut',
    data: {
        labels: ['Oral traditions and representations', 'Performing Arts', 'Social practices, rituals, festive events', 'Knowledge and practrices about nature and the universe', 'Traditional craft skils', 'Others'],
        datasets: [{
            data: [24, 24, 24, 2, 0, 1],
            backgroundColor: [
                'rgba(123, 141, 247, 1)',
                'rgba(181, 174, 249, 1)',
                'rgba(243, 173, 204, 1)',
                'rgba(244, 219, 136, 1)',
                'rgba(164, 231, 199, 1)',
                'rgba(235, 144, 84, 1)'
            ],
        }],
        hoverOffset: 4
    },
    plugins: [ChartDataLabels],
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#fff',
                font: {
                    size: 14,
                    weight: 500,
                },
                display: 'auto', 

            },
            tooltip: {
                padding: 10,
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        const label = [
                            `${context.parsed}`,
                            `${context.label}`,
                        ];
                        return label;
                    },
                }
            }
        }
    },

});


/* Video */
const dou_chatr_03 = document.getElementById('dou_chatr_03');
const myChart_03 = new Chart(dou_chatr_03, {
    type: 'doughnut',
    data: {
        labels: ['Oral traditions and representations', 'Performing Arts', 'Social practices, rituals, festive events', 'Knowledge and practrices about nature and the universe', 'Traditional craft skils', 'Others'],
        datasets: [{
            data: [24, 24, 24, 24, 24, 24],
            backgroundColor: [
                'rgba(123, 141, 247, 1)',
                'rgba(181, 174, 249, 1)',
                'rgba(243, 173, 204, 1)',
                'rgba(244, 219, 136, 1)',
                'rgba(164, 231, 199, 1)',
                'rgba(235, 144, 84, 1)'
            ],
        }],
        hoverOffset: 4
    },
    plugins: [ChartDataLabels],
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#fff',
                font: {
                    size: 14,
                    weight: 500
                }
            },
            tooltip: {
                padding: 10,
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        const label = [
                            `${context.parsed}`,
                            `${context.label}`,
                        ];
                        return label;
                    },
                }
            }
        }
    },

});



/* Audio */
const dou_chatr_04 = document.getElementById('dou_chatr_04');
const myChart_04 = new Chart(dou_chatr_04, {
    type: 'doughnut',
    data: {
        labels: ['Oral traditions and representations', 'Performing Arts', 'Social practices, rituals, festive events', 'Knowledge and practrices about nature and the universe', 'Traditional craft skils', 'Others'],
        datasets: [{
            data: [24, 24, 24, 24, 1, 0],
            backgroundColor: [
                'rgba(123, 141, 247, 1)',
                'rgba(181, 174, 249, 1)',
                'rgba(243, 173, 204, 1)',
                'rgba(244, 219, 136, 1)',
                'rgba(164, 231, 199, 1)',
                'rgba(235, 144, 84, 1)'
            ],
        }],
        hoverOffset: 4
    },
    plugins: [ChartDataLabels],
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#fff',
                font: {
                    size: 14,
                    weight: 500
                }
            },
            tooltip: {
                padding: 10,
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        const label = [
                            `${context.parsed}`,
                            `${context.label}`,
                        ];
                        return label;
                    },
                }
            }
        }
    },

});



/* 협력기관 차트*/



// CHART 1 ========================
// setup 
const data = {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [{
            label: 'Elements',
            data: ['65', '60', '60', '60', '60', '60',],
            borderColor: 'rgba(76, 110, 245, 1)',
            backgroundColor: 'rgba(76, 110, 245, 1)',
        },
        {
            label: 'Stakeholders',
            data: ['50', '255', '160', '160', '255', '200'],
            borderColor: 'rgba(250, 82, 82, 1)',
            backgroundColor: 'rgba(250, 82, 82, 1)',
        },
        {
            label: 'Photo',
            data: ['300', '200', '60', '60', '75', '50'],
            borderColor: 'rgba(18, 184, 134, 1)',
            backgroundColor: 'rgba(18, 184, 134, 1)',
        },
        {
            label: 'Video',
            data: ['155', '200', '120', '120', '200', '60'],
            borderColor: 'rgba(230, 73, 128, 1)',
            backgroundColor: 'rgba(230, 73, 128, 1)',
        },
        {
            label: 'Audio',
            data: ['162', '140', '255', '255', '40', '70'],
            borderColor: 'rgba(250, 176, 5, 1)',
            backgroundColor: 'rgba(250, 176, 5, 1)',
        },
        {
            label: 'Publication',
            data: ['75', '100', '75', '75', '120', '20'],
            borderColor: 'rgba(82, 100, 132, 1)',
            backgroundColor: 'rgba(82, 100, 132, 1)',
        }
    ],
      borderWidth: 1
    
  };

  // config 
  const config = {
    type: 'bar',
    data,
    options: {
      maintainAspectRatio: false,
      layout:{
        padding:{
            bottom:10,
            top: 10
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            display:false
          },
          grid:{
            drawTicks:false
          }
        },
        xAxes: {
            display: false,
            grid: {
                drawOnChartArea: false,
            },
        }
      },
      
      plugins:{
        legend:{
            display:false
        }
      }
    }
  };

  // render init block
  const myChart_bar = new Chart(
    document.getElementById('bar_chatr_01'),
    config
  );

  

  // CHART 2  Y축 고정 ========================
// setup 
const data2 = {
    datasets: myChart_bar.data.datasets
}; 

  // config 
  const config2 = {
    type: 'bar',
    data: data2,
    options: {
      maintainAspectRatio: false,
      layout:{
        padding:{
            bottom:10
        }
      },
      scales: {
        x:{
           ticks:{
            display:false
           },
           grid:{
            drawTicks:false,
            drawBorder:false
            }   
        },
        y: {
           grid:{
             drawTicks:false,
            },
           beginAtZero: true,
           afterFit:(ctx) => {
            ctx.width = 40;
            
           }
        },
      },
      xAxes: {
        display: false,
        grid: {
            drawOnChartArea: false,
        },
      },
      plugins:{
        legend:{
            display:false
        }
      }
    }
  };

  // render init block
  const myChart_bar2 = new Chart(
    document.getElementById('bar_chatr_02'),
    config2
  );

  
  //  scroll 범위설정
  const box = document.querySelector('.box');
  const barLength =  myChart_bar.data.labels.length;
   

   if(barLength > 6) {
    const chartWidth  = 850 + (barLength - 6) * 100
    box.style.width = `${chartWidth}px`;
   }




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	jQCloud.js (키워드)

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */


var word_list = [

    {
        text: "South Asia",
        weight: 20
    },
    {
        text: "india",
        weight: 4
    },
    {
        text: "vietnam",
        weight: 8
    },
    {
        text: "Nepal",
        weight: 8
    },
    {
        text: "Kyrgyzstan",
        weight: 3
    },
    {
        text: "Central Asia",
        weight: 4
    },
    {
        text: "Crafts",
        weight: 1
    },
    {
        text: "Singapore",
        weight: 2
    },
    {
        text: "Sapien",
        weight: 4
    },
    {
        text: "shared heritage",
        weight: 2
    },
    {
        text: "Festivals",
        weight: 10
    },
    {
        text: "Southeast Asia",
        weight: 10
    },
    {
        text: "East Asia",
        weight: 2
    },
    {
        text: "senectus",
        weight: 2
    },
    {
        text: "Rituals",
        weight: 2
    },
    {
        text: "Republic of Korea",
        weight: 3
    },
];

$(function () {
    $("#keyword_box").jQCloud(word_list, {
        autoResize: true
    });
});