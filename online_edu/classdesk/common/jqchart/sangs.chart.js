//일반 컬러
var chartSeriesColors = ["#4bb1cf", "#5eb95e", "#faa732", "#dd514c", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"];
//멀티바 컬러
var chartSeriesColors2 = ["#dd514c", "#faa732", "#4bb1cf", "#5eb95e", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"];


$.jqplot.sprintf.thousandsSeparator = ',';

function setNumberic(val) {
	val = Number(String(val).replace(/\..*|[^\d]/g, "")).toLocaleString().slice(0, -3);
	return val;
}



function chartImgDown(areaId) {
	var imgData = $('#'+areaId).jqplotToImageStr({});
	if (imgData){
		
		//$.post("/common/chartImgDown.jsp",{imgf:imgData});
		

		//alert(imgData);
		var option = {
			url : "/common/chartImgDown.jsp",
			type : "post",
			//enctype: 'multipart/form-data',
			data : {imgf:imgData}, 
			target : "_blank"
			//target : "charImgDownFrame"
				
		};
		$.ajax(option);
	
	} else {
		alert("해당브라우져에서는 이미지 다운로드가 되지 않습니다!")
	}
}


/******************************
 * 파이챠트
 ******************************/
$.setPieChartOption = function() {
	var options = {
		seriesColors: chartSeriesColors,                
		grid : {
        	drawBorder : true,
			drawGridLines : true,
			background : '#FFFFFF',
			borderColor: '#FFFFFF',
			gridLineColor : '#FFFFFF',
			gridLineWidth : 0,
			borderWidth: 0,
			shadow : false
		},

		seriesDefaults : {
			
			renderer: $.jqplot.PieRenderer,      
			rendererOptions : {   
				startAngle: 180,
				showDataLabels: true,
				sliceMargin : 4
			}
		},        
		legend: { 
			placement: 'outside', 
			show:true,
			location : 'e',
			 marginTop: '2px'
		}  
		
	};
	return options;
}


/**
 * barlineChart 옵션처리
 */
$.setBarLineChartOptions = function(title, xLabel, yLabel, y2Label) {
	var options = {
		//seriesColors: [ "#FFFF99", "#CCFF66", "#FFCC99", "#CCCC66", "#FF33CC", "#99CC99", "#3399FF", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"],  
		seriesColors: chartSeriesColors,                 
		title: title,
		animate : true,
		animateReplot : true,
		grid : {
			drawBorder : true,
			drawGridLines : true,
			//background : '#FFFFFF',
			shadow: true
		},
		
		cursor: {
            show: true,
            zoom: false,
            looseZoom: false,
            showTooltip: true
        },
        series:[
            {
                pointLabels: {
                    show: true
                },
                renderer: $.jqplot.BarRenderer,
                showHighlight: false,
                yaxis: 'y2axis',
                rendererOptions: {
                    // Speed up the animation a little bit.
                    // This is a number of milliseconds.  
                    // Default for bar series is 3000.  
                    animation: {
                        speed: 2500
                    },
                    barWidth: 20,
                    barPadding: -15,
                    barMargin: 0,
                    highlightMouseOver: false
                }
            }, 
            {
                rendererOptions: {
                    // speed up the animation a little bit.
                    // This is a number of milliseconds.
                    // Default for a line series is 2500.
                    animation: {
                        speed: 2000
                    }
                }
            }
        ],
        axesDefaults: {
            pad: 0
        },
        axes: {
            // These options will set up the x axis like a category axis.
            xaxis: {
            	label : xLabel,
                tickInterval: 1,
                drawMajorGridlines: false,
                drawMinorGridlines: true,
                drawMajorTickMarks: false,
                rendererOptions: {
	                tickInset: 0.5,
	                minorTicks: 1
                }
            },
            yaxis: {
            	label : yLabel,
                tickOptions: {
                    formatString: "%'d"
                },
                rendererOptions: {
                    forceTickAt0: true
                }
            },
            y2axis: {
            	label : y2Label,
                tickOptions: {
                    formatString: "%'d"
                },
                rendererOptions: {
                    // align the ticks on the y2 axis with the y axis.
                    alignTicks: true,
                    forceTickAt0: true
                }
            }
        },
        highlighter: {
            show: true, 
            showLabel: true, 
            tooltipAxes: 'y',
            sizeAdjust: 7.5 , tooltipLocation : 'ne'
        }
    };
	return options;
}


/**
 * bar 옵션처리
 */
$.setBarChartOptions = function() {
	
	var options = {
		seriesColors: chartSeriesColors,  
		animate: true,
		animateReplot: true,
		cursor: {
            show: true,
            zoom: false,
            looseZoom: false,
            showTooltip: true
        },
        
        grid : {
			drawBorder : false,
			drawGridLines : false,
			background : '#FFFFFF',
			shadow: false
		},
		 
        series:[
            {
                pointLabels: {
                    show: true
                },
                renderer: $.jqplot.BarRenderer,
                showHighlight: false,
                rendererOptions: {
                    animation: {
                        speed: 2500
                    },
                    barWidth: 30,
                    barPadding: -5,
                    barMargin: 4,
                    highlightMouseOver: true
                }
            }, 
            {
                rendererOptions: {
                    animation: {
                        speed: 3000
                    }
                }
            }
        ],
        axesDefaults: {
            pad: 0
        },
		
		axes : {
			
			xaxis: {
				tickInterval: 1,                 
				drawMajorGridlines: false,                 
				drawMinorGridlines: false,                 
				drawMajorTickMarks: false,                 
				rendererOptions: {                 
					tickInset: 0.5,                 
					minorTicks: 1 
				}
			},
			yaxis: {     
				label : '',
				tickOptions: {formatString: '%d'},
				rendererOptions: {
					tickInset: 0.5,
					forceTickAt0: false                
				} 
			} 
			
		},
		highlighter: {             
			show: true,       
			showLabel : true,
			tooltipAxes : 'y',
			sizeAdjust: 7.5,
			tooltipLocation : 'ne'
		} 
	};
	return options;
}

/**
 * multi bar 옵션처리
 * @param title	: 챠트제목
 * @param seriesLabelData	: bar명칭 
 * @param ticksData : x축 단위
 * @param xLabel : x축 라벨
 * @param yLabel : y축 라벨
 * @returns {___anonymous104_1808}
 */
$.setMutiBarChartOptions = function(title, seriesLabelData, ticksData, xLabel, yLabel) {
	
	
	var legend_show = false;
	//var legend_placement = 'outsideGrid';
	var legen_location = '';
	// 시리얼데이타가 없을 경우 처리
	if (seriesLabelData == ''){
		legend_show = false;
		legend_placement = '';
		legen_location = '';
	}
	
	var options = {
		//seriesColors: [ "#FFFF99", "#CCFF66", "#FFCC99", "#CCCC66", "#FF33CC", "#99CC99", "#3399FF", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"],  
		seriesColors: chartSeriesColors,                     
		title: title,
		//animate : true,
		//animateReplot : true,
		grid : {
			drawBorder : false,
			drawGridLines : false,
			//background : '#FFFFFF',
			shadow: false
		},
		
		cursor: {
            show: true,
            zoom: false,
            looseZoom: false,
            showTooltip: true
        },
		
		seriesDefaults : {  
			renderer: $.jqplot.BarRenderer,      
			rendererOptions : {                      
				fillToZero : false,
				showHighlight: false,
				//barWidth: 12,                    
				barMargin : 20
                  
			}
		},    
		
		
		series : seriesLabelData,
		
		legend: { 
			show : legend_show, 
			rendererOptions : {
				numberRows : 1
			},
			location: legen_location
		},
		
		axes : {
			// Use a category axis on the x axis and use our custom ticks.
			xaxis: {
				label : xLabel,
				renderer: $.jqplot.CategoryAxisRenderer,
				ticks: ticksData
			},
		
			// Pad the y axis just a little so bars can get close to, but             
			// not touch, the grid boundaries.  1.2 is the default padding.             
			yaxis: {        
				label : yLabel,
				pad: 1.00,                 
				tickOptions: {formatString: "%'i"+yaxisUnit},
				rendererOptions: {                     
					// align the ticks on the y2 axis with the y axis.                     
					alignTicks: true,                     
					forceTickAt0: true                
				} 
			} 
		},
		highlighter: {             
			show: true,              
			sizeAdjust: 7.5
		} 
	};
	return options;
}


/**
 * -----------------------
 * 라인챠트(멀티라인가능)
 * -----------------------
 */
$.setLineChartOption = function(tickData, yaxisUnit) {
	var options = {
        animate: !$.jqplot.use_excanvas,
        seriesColors: chartSeriesColors,
        grid : {
        	drawBorder : true,
			drawGridLines : true,
			background : '#FFFFFF',
			borderColor: '#FFFFFF',
			gridLineColor : '#ebebeb',
			gridLineWidth : 1,
			borderWidth: 0.5,
			shadow: false,               
		},
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: tickData,	//x축 tick 항목 
                
                showTickMarks: true, 
                drawMajorGridlines: true,
                drawMajorTickMarks: true,  
            }, 
            yaxis: {
            	
            	show: true,
            	showTicks: true,	// y축 단위 노출 여부
            	tickOptions: {formatString: "%'i"+yaxisUnit},
            	showTickMarks: true,
            	drawMajorGridlines: true,
            	drawMajorTickMarks: false,  
            }
        },
        highlighter: {             
        	show: true,               
        	showLabel: true,              
        	tooltipAxes: 'y',             
        	sizeAdjust: 7.5 , 
        	tooltipLocation : 'ne'        
        } 
    };
    
    return options;
}

/**
 * -----------------------
 * 바챠트 : 카테고리 사용용
 * ----------------------- 
 */
$.setBarChartOption01 = function(tickData, yaxisUnit) {
	var options = {
        // Only animate if we're not using excanvas (not in IE 7 or IE 8).. 
        animate: !$.jqplot.use_excanvas,
        seriesColors: chartSeriesColors,
        grid : {
        	drawBorder : true,
			drawGridLines : true,
			background : '#FFFFFF',
			borderColor: '#FFFFFF',
			gridLineColor : '#ebebeb',
			gridLineWidth : 1,
			borderWidth: 0.5,
			shadow: false,               
		},
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
            	varyBarColor : true,	// 바별 색상 다르게 처리
                barWidth: 35,
                barPadding: -1, 
                barMargin: 4,
                shadow: false,  
            },
            pointLabels: { 
            	show: true,  //막대챠트 값표시
            	}
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: tickData,	//x축 tick 항목 
                
                showTickMarks: true, 
                drawMajorGridlines: true,
                drawMajorTickMarks: true,  
            }, 
            yaxis: {
            	
            	show: true,
            	showTicks: false,	// y축 단위 노출 여부
            	tickOptions: {formatString: "%'i"+yaxisUnit},
            	showTickMarks: false,
            	drawMajorGridlines: true,
            	drawMajorTickMarks: false,  
            }
        },
        highlighter: { show: false, },
    };
    
    return options;
}

/**
 * -----------------------
 * 바챠트  : 기간 사용용
 * -----------------------
 */
$.setBarChartOption02 = function(tickData, yaxisUnit) {
	var options = {
        // Only animate if we're not using excanvas (not in IE 7 or IE 8).. 
        animate: !$.jqplot.use_excanvas, 
        grid : {
        	drawBorder : true,
			drawGridLines : true,
			background : '#FFFFFF',
			borderColor: '#FFFFFF',
			gridLineColor : '#ebebeb',
			gridLineWidth : 1,
			borderWidth: 0.5,
			shadow: false,           
		},
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
            	varyBarColor : false,	// 바별 색상 다르게 처리
            	color : '#0085cc',
                barWidth: 30,
                barPadding: -1, 
                barMargin: 5,
                shadow: false,  
            },
            pointLabels: { 
            	show: true,  //막대챠트 값표시
            	}
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: tickData,	//x축 tick 항목 
                
                showTickMarks: true, 
                drawMajorGridlines: true,
                drawMajorTickMarks: true,  
            }, 
            yaxis: {
            	
            	show: true,
            	showTicks: false,	// y축 단위 노출 여부
            	tickOptions: {formatString: "%'i"+yaxisUnit},
            	showTickMarks: false,
            	drawMajorGridlines: true,
            	drawMajorTickMarks: false,  
            }
        },
        highlighter: { show: false, },
    };
    
    return options;
}


/**
 * -----------------------
 * 멀티바챠트 : 카테고리 사용용
 * -----------------------
 */
$.setMultiBarChartOption01 = function(tickData, yaxisUnit, seriesLabelData) {
	var options = {
        // Only animate if we're not using excanvas (not in IE 7 or IE 8).. 
        animate: !$.jqplot.use_excanvas,
        seriesColors: ["#dd514c", "#faa732", "#4bb1cf", "#5eb95e", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"],
        grid : {
        	drawBorder : true, 
			drawGridLines : true,
			background : '#FFFFFF',
			borderColor: '#FFFFFF',
			gridLineColor : '#ebebeb',
			gridLineWidth : 1,
			borderWidth: 0.5,
			shadow: false
		},
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
                barWidth: 60,
                barPadding: 5, 
                barMargin: 10,
                shadow: false,
                barAlpha : 0.5,
                
            },
            pointLabels: { 
            	show: true,  //막대챠트 값표시
            }
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: tickData,	//x축 tick 항목 
                
                showTickMarks: true, 
                drawMajorGridlines: true,
                drawMajorTickMarks: true,  
            }, 
            yaxis: {
            	
            	show: true,
            	showTicks: false,	// y축 단위 노출 여부
            	tickOptions: {formatString: "%'i"+yaxisUnit},
            	showTickMarks: false,
            	drawMajorGridlines: true,
            	drawMajorTickMarks: false,  
            }
        },

        series : seriesLabelData,
		
		legend: { 
			show : false
		},
    };
    
    return options;
}
