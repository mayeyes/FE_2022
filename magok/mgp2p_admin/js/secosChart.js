/**
 * Created by Administrator on 2017-04-20.
 */

(function($){
    'use strict';
    var _color = [
        ['#7CB5EC', '#e4931f', '#d4583b',  '#edd88d', '#5b656d', '#aaabbb', '#e5e62a', '#6f7ebc', '#63baa9', '#3b72b4', '#419a56', '#7cd4d3', '#add673', '#bc3737', '#323c77'],
        ['#e4931f', '#d4583b', '#7CB5EC',  '#edd88d', '#5b656d', '#aaabbb', '#e5e62a', '#6f7ebc', '#63baa9', '#3b72b4', '#419a56', '#7cd4d3', '#add673', '#bc3737', '#323c77'],
        //전력 1
        ['#7CB5EC', '#e4931f', '#d4583b', '#edd88d', '#5b656d', '#aaabbb', '#e5e62a', '#6f7ebc', '#63baa9', '#3b72b4', '#419a56', '#7cd4d3', '#add673', '#bc3737', '#323c77'],
        //수도 2
        ['#6667BC', '#6f7ebc', '#d4583b', '#edd88d', '#5b656d', '#aaabbb', '#e5e62a', '#e4931f', '#63baa9', '#3b72b4', '#419a56', '#7cd4d3', '#add673', '#bc3737', '#323c77'],
        //난방 3
        ['#E4931F', '#E9CD5E', '#d4583b', '#edd88d', '#5b656d', '#aaabbb', '#e5e62a', '#e4931f', '#63baa9', '#3b72b4', '#419a56', '#7cd4d3', '#add673', '#bc3737', '#323c77'],
        //가스 4
        ['#D4583B', '#ff877e', '#d4583b', '#edd88d', '#5b656d', '#aaabbb', '#e5e62a', '#e4931f', '#63baa9', '#3b72b4', '#419a56', '#7cd4d3', '#add673', '#bc3737', '#323c77'],
        ['#5b9dcf', '#e4931f', '#d4583b', '#edd88d', '#5b656d', '#aaabbb', '#e5e62a', '#6f7ebc', '#63baa9', '#3b72b4', '#419a56', '#7cd4d3', '#add673', '#bc3737', '#323c77'],

        ['#7dbed0','#5c94ab','#bccc74','#619360','#fec200','#f06b6c','#685046'],
        ['#bccc74','#619360','#fec200','#f06b6c','#685046','#7dbed0','#5c94ab'],
        ['#fec200','#f06b6c','#685046','#7dbed0','#5c94ab','#bccc74','#619360'],
        ['#685046','#7dbed0','#5c94ab','#bccc74','#619360','#fec200','#f06b6c']
    ];

    var _theme = {
        theme3 : {
            colors: _color[0],
            lang: {
                spacingLeft:5,
                spacingRight:5,
                spacingTop:10,
                spacingBottom:5,
                loading: 'Loading...',
                months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
                decimalPoint: '.',
                numericSymbols: null,// ['k', 'M', 'G', 'T', 'P', 'E'], // SI
                // prefixes used in axis labels
                resetZoom: 'Reset zoom',
                resetZoomTitle: 'Reset zoom level 1:1',
                thousandsSep: ',',
                noData:''
            },
            global: {
                useUTC: true,
                canvasToolsURL: 'canvas-tools.js',
                VMLRadialGradientURL: 'vml-radial-gradient.png'
            },
            chart: {
                // backgroundColor:'#00FFFF',
                borderColor: '#4572A7',
                borderRadius: 5,
                defaultSeriesType:'line',
                // margin: [0,0,0,0],
                resetZoomButton: {
                    position: {
                        align: 'right',
                        x: -10,
                        y: 10
                    },
                    theme: {
                        zIndex: 20
                    }
                },
                style: {
                    fontFamily: 'Noto Sans KR, Nanum Gothic ,돋움 ,Dotum,Helvetica,Verdana,Arial,sans-serif', // default font
                    fontSize: '12px'
                }
            },
            title: {
                useHTML :true,
                style: {
                    color: '#666',// #3E576F',
                    fontSize: '12px',
                    fontWeight: 'bold'
                },
                text: ''
            },
            subtitle: {
                style: {
                    color: '#999'
                },
                text: ''
            },
            xAxis: {
                gridLineDashStyle: 'Dot',
                gridLineColor: '#ccc',
                gridLineWidth:0,
                lineWidth:1,
                lineColor:'#bbb',
                tickmarkPlacement:'on',
                tickWidth:0,
                crosshair: true,
                startOnTick:true,
                //endOnTick:true,
                //showFirstLabel:false,
                //showLastLabel:false,
                labels: {
                    padding:1,
                    style: {
                        fontSize: '11px'
                    }
                }
            },
            yAxis:  [{
                allowDecimals: false,
                gridLineDashStyle: 'Dot',
                gridLineColor: '#ccc',
                gridLineWidth:1,
                lineColor:'#bbb',
                lineWidth:1,
                //startOnTick:false,
                //endOnTick:false,
                //showFirstLabel:false,
                //showLastLabel:false,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function() {
                        return Highcharts.numberFormat(this.value, 0, ".", ",");
                    },
                    style: {
                        'font-size': '9px'
                    }
                    //,step:2
                },
                type: "linear"
            }],
            legend: {
                floating: false,
                verticalAlign: 'bottom',
                labelFormatter: function () {
                    return this.name;
                },
                backgroundColor: '#FFFFFF',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false,
                navigation: {
                    activeColor: '#000' // docs
                },
                itemMarginTop:1,
                itemMarginBottom:1 ,
                itemStyle: {
                    cursor: 'pointer',
                    color: '#666', // docs
                    fontWeight:'normal',
                    fontSize: '10px'
                },
                itemHoverStyle: {
                    color: '#000'
                },
                itemHiddenStyle: {
                    color: '#CCC'
                },
                itemCheckboxStyle: {
                    position: 'absolute',
                    width: '13px', // for IE precision
                    height: '13px'
                },
                symbolWidth: 16,
                y: 5,
                title: { // docs
                    style: {
                        fontWeight: 'bold'
                    }
                },
                borderRadius : 3

            },
            labels: {
                style: {
                    position: 'absolute',
                    color: '#ff0000'
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                        stroke: '#CCCCCC'
                    }
                }
            },
            plotOptions: {
                area: {
                    lineWidth: 1,
                    fillOpacity: 0.2,
                    marker: {
                        radius: 3,
                        states: { // states for a single point
                            select: {
//									fillColor: '#FFFFFF',
                                lineWidth: 2
                            }
                        }
                    },
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                arearange: {
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                areaspline: {
                    lineWidth: 1,
                    fillOpacity: 0.2,
                    marker: {
                        radius: 3,
                        states: { // states for a single point
                            select: {
//									fillColor: '#FFFFFF',
                                lineWidth: 2
                            }
                        }
                    },
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                areasplinerange: {
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                bar: {
                    pointPadding: 0.0,
                    borderWidth: 0,
                    groupPadding:0.2,
                    //pointWidth: 20,
                    maxPointWidth:20,
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 0, ".", ",");
                        }
                    }
                },
                boxplot: {
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 4, ".", ",");
                        }
                    }
                },
                bubble: {
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                column: {
                    pointPadding: 0.0,
                    borderWidth: 0,
                    groupPadding:0.25,
                    // pointWidth: 100,
                    maxPointWidth:100,
                    dataLabels: {
                        color:'#666',
                        formatter:function() {
                            if(this.y <1 ){
                                return Highcharts.numberFormat(this.y, 4, ".", ",");
                            }else{
                                return Highcharts.numberFormat(this.y, 4, ".", ",");
                            }
                        }
                    }
                },
                columnrange: {
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                errorbar: {
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                funnel: {
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                gauge :{
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                line: { // base series options
                    lineWidth: 1,
                    marker: {
                        radius: 3,
                        states: { // states for a single point
                            select: {
//									fillColor: '#FFFFFF',
                                lineWidth: 2
                            }
                        }
                    },
                    dataLabels: {

                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                pie :{
                    showInLegend: true,
                    dataLabels: {
                        // connectorWidth:2,
                        allowPointSelect: true,cursor: 'pointer',
                        formatter:function() {
                            //$.writeLog( Math.round(this.percentage).toString().length )
                            // if( Math.round(this.percentage).toString().length >= 2)
                            return Highcharts.numberFormat(this.percentage, 1, ".", ",")+'%';
                        },
                        distance: -10
                    }, colors : ''
                },
                scatter :{
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                spline :{
                    lineWidth: 1,
                    marker: {
                        radius: 3,
                        states: { // states for a single point
                            select: {
//									fillColor: '#FFFFFF',
                                lineWidth: 2
                            }
                        }
                    },
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                },
                waterfall :{
                    dataLabels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.y, 2, ".", ",");
                        }
                    }
                }
            },
            tooltip: {
                dateTimeLabelFormats: {
                    millisecond: '%Y년 %m월 %d일 %H:%M:%S.%L',// '%A, %b %e,
                    // %H:%M:%S.%L',//jcreator
                    second: '%Y년 %m월 %d일 %H:%M:%S',// '%A, %b %e, %H:%M:%S'
                    minute: '%Y년 %m월 %d일 %H:%M',// '%A, %b %e, %H:%M'
                    hour: '%Y년 %m월 %d일 %H:%M',// '%A, %b %e, %H:%M'
                    day: '%Y년 %m월 %d일 (%A)',// '%A, %b %e, %Y'
                    week: '%Y년 %m월 %d일 (%A)',// 'Week from %A, %b %e, %Y'
                    month: '%Y년 %m월',// '%B %Y'
                    year: '%Y년'// '%Y'
                },
                valueDecimals: 2,
                xDateFormat: '%Y년 %m월 %d일 %H:%M:%S',
                headerFormat: '<span style="font-weight:bold;">{point.x}</span><br/>',
                pointFormat: '<span style="margin-top:30px;color:{series.color}">{series.name}</span>: {point.y}<br/>',
                style: {
                    color: '#666',
                    cursor: 'default',
                    fontSize: '11px',
                    padding: '6px',
                    whiteSpace: 'nowrap'
                },
                borderWidth: 2,
                borderColor: '#777777',
                backgroundColor: 'rgba(255,255,255,0.9)',//rgba(219,219,216,0.8)
                shadow: false,
                shared: true,
                split: false,
                useHTML: true,
                formatter:function(){
                    var result, svg;
                    var value ;
                    var subChartChk = false;
                    var total = 0;
                    var length = 0;

                    var createSymbol = function(shapeType, color) {
                        var symbol;
                        if(shapeType == 'rect' || shapeType == 'arc') {
                            symbol = '<rect x="0" y="7" width="16" height="12" zIndex="3" fill="'+ color+'"></rect>';
                        } else {
                            symbol = '<path fill="none" d="M 0 14 L 16 14" stroke="'+ color+'" stroke-width="2"></path>';
                            symbol += '<path fill="'+ color+'" d="M 8 10 C 13.328 10 13.328 18 8 18 C 2.6719999999999997 18 2.6719999999999997 10 8 10 Z"></path>'
                        }
                        return symbol;
                    };

                    var valueFormat = function(value, percentage) {
                        // if(percentage ) {
                        //     return Highcharts.numberFormat(percentage, 2, ".", ",") +'%';
                        // } else {
                        //     return Highcharts.numberFormat(value, 3, ".", ",");
                        // }

                        return Highcharts.numberFormat(value, 0, ".", ",");
                    };

                    result = '<div>';
                    result += '<div>'
                    result += '<table class="highcharts-tooltip-table">';

                    if(this.points) {
                        if($(this.points[0].series.chart.renderTo).data('sub-chart')) {
                            subChartChk = true;
                        }


                        result += '<thead><tr><td colspan="3"><strong>' + this.x +'</strong></td></tr></thead>';
                        result += '<tbody>'
                        $.each(this.points, function(i, d){
                            result += '<tr>';
                            result += '<td class="legend_color_guide"><svg width="16" height="20">' + createSymbol(this.point.shapeType, this.color) + '</svg></td>'
                            result += '<td class="key">' + this.series.name + '</td>'
                            result += '<td class="value">' + valueFormat(this.y, this.percentage) + '</td>'
                            result += '</tr>'

                            total += this.y;
                        });
                    } else {
                        result = '<table>';
                        result += '<thead><tr><td colspan="2"><strong>' + this.key +'</strong></td></tr></thead>';
                        result += '<tbody>'
                        result += '<tr>';
                        result += '<td class="legend_color_guide"><svg width="16" height="20">' + createSymbol(this.point.shapeType, this.color) + '</svg></td>'
                        result += '<td class="value">' + valueFormat(this.y, this.percentage) + '</td>'
                        result += '</tr>'
                    }
                    result += '</tbody>';
                    result += '</table>';
                    result += '</div>';

                    if(subChartChk) {
                        total = d3.sum(this.points, function(d) {return d.y;});
                        var offset = 25;
                        var t = 0;

                        svg = "<svg viewBox='0 0 42 42' class='donut' style='width: 100px; margin: 0 20px;'>";
                        svg += "	<circle class='donut-hole' cx='21' cy='21' r='15' style='fill: #fff;'></circle>";
                        svg += "	<circle class='donut-ring' cx='21' cy='21' r='15' style='fill: transparent; stroke-width: 3; stroke: #d2d3d4;'></circle>";


                        $.each(this.points, function(i, d){
                            var y = d.y;
                            var p = d.y/total*100;
                            var a = 100 - p;
                            var o = offset;
                            var c = d.color;


                            o = 100 - t + offset;
                            t += p;

                            svg += "	<circle class='donut-segment' cx='21' cy='21' r='15' style='fill: transparent; stroke-width: 3; stroke:" + c + ";";
                            svg += "stroke-dasharray: " + p + " " + a + "; stroke-dashoffset: " + o;
                            svg += " '>";
                            svg += "</circle>";
                            // svg += "<text x='0' y='15' filter='red'>test</text>"

                        });
                        svg += "</svg>";

                        result += '<div>';
                        result += svg
                        result += '</div>';
                    }
                    result += '</div>';


                    return result;
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false,
                buttons: {
                    contextButton : {
                        x: 5,
                        y: -5,
                        width: 11,
                        height: 10,
                        symbol:'menu',
                        symbolSize: 8,
                        symbolStrokeWidth:1,
                        symbolStroke:'#aaa',
                        simbolFill:'#aaa',
                        symbolX: 5.5,
                        symbolY: 5
                    }
                }
            }
        }
    };
    var _defaultOption = {
        target : 'chart1',
        themeId : 'theme3',
        theme : _theme['theme3'],
        selectChart : 'column',
        options3d : {enabled: false},
        categories : [],
        series : [],
        colorNum: 0
    };

    var _gridDefaultOption = {
        widthTarget : null,
        groupHeader : null,
        gridOption : {
            url: "",
            height: '100%',
            page: 1,
            rowNum: 10,
            rowTotal : null,
            records: 0,
            pager: "pager",
            pgbuttons: true,
            pginput: true,
            colModel: [],
            rowList: [10, 30, 50, 100],
            colNames: [],
            sortorder: "asc",
            sortname: "",
            datatype: "json",
            mtype: "POST",
            shrinkToFit: true,
            jsonReader: {repeatitems:false},
            // beforeSelectRow : function(d) {},
            // onSelectRow : function(d) {},
            onSortCol : function(d) {},
            // ondblClickRow : function(d) {},
            // onRightClickRow : function(d) { return false;},
            onPaging : function(d) {},
            onSelectAll : function(d) {},
            onInitGrid : function(d) {},
            loadComplete : function(d) {
                var colNames = $(this).getGridParam('colModel');
                if(d.records === 0){
                    var colNames = $(this).getGridParam('colModel');
                    var idx = 0;
                    var isHidden = "";
                    for(var i=0;i<colNames.length;i++){
                        isHidden = colNames[i].hidden;
                        if(isHidden == false){
                            idx++;
                        }
                    }
                    $(this).append("<tr class='ui-widget-content jqgrow ui-row-ltr' role='row'><td class='nodata_display' colspan='" + idx + "' style='text-align:center'>데이터가 없습니다.</td></tr>");
                }

                $('#grid_rn').text('No.');

                var tableH = $(this).parents('.ui-jqgrid').height();
                var boxH = $(this).parents('.box').height();

                if(boxH - tableH > 100)
                    $(this).parents('.ui-jqgrid').find('.ui-jqgrid-pager').css('top', boxH-tableH);
            }
            ,
            gridComplete : function(d) {},
            // loadError : function(xhr, status, error) {},
            // loadBeforeSend : function(d) {},
            // afterInsertRow : function(d) {},
            beforeRequest : function() {
                var gridParam = $(this).jqGrid('getGridParam');
                var param = $('#'+gridParam.searchForm).searchObject();
                var param2 = gridParam.postData2;


                param['page'] = gridParam.page;
                param['rows'] = gridParam.rowNum;
                param['sortorder'] = gridParam.sortorder;
                param['sortname'] = gridParam.sortname;

                if(param2)
                    Object.assign(param, param2);

                gridParam.postData = JSON.stringify(param);

                // $.writeLog('beforeRequest', [$(this).jqGrid('getGridParam'), param, $(gridParam.userData)]);
            },
            // beforeProcessing : function(d) {},
            // onHeaderClick : function(d) {},
            viewrecords: true,
            loadonce: false,
            navOptions: {reloadGridOptions: {fromServer: true}},
            search: false,
            forceFit : false,
            gridstate : "visible",
            loadui: "disable",
            autowidth: true,
            scrollOffset :18,
            cellLayout: 5,
            subGridWidth: 20,
            gridview: true,
            rownumbers : true,
            viewsortcols : [false,'vertical',true],
            autoencode : false,
            remapColumns : [],
            ajaxGridOptions :{contentType:'application/json'},
            searchForm: 'search_box',
            cmTemplate: {sortable: false}
        }
    };

    var _calDefaultOption = {
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listMonth'
        },
        // defaultDate: '2017-04-12',
        locale: 'ko',
        buttonIcons: false, // show the prev/next text
        weekNumbers: true,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true // allow "more" link when too many events
    };

    var _chartKey = {
        // 건물에너지
        LIGHT_AMOUNT : ['조명'],  SOCKET_AMOUNT: ['콘센트'], HEAT_COOL_AMOUNT: ['냉/난방'], CHG_AMOUNT: ['충전소'], ASSIT_AMOUNT: ['공조'], BET_AMOUNT: ['배터리'],
        ETC: ['기타'],
        PV_GEN_AMOUNT: ['태양광 발전'], WT_GEN_AMOUNT: ['풍력 발전'],
        CHARGE_VOL: ['충전'], DISCHARGE_VOL: ['방전'], LOAD: ['부하'],
        PWR_MAX: ['최대 발전용량', 'kW'], PWR_NOW: ['현재 발전용량', 'kW'],
        SOLAR_GEN: ['태양광 발전', 'kW'], WT_GEN: ['풍력 발전', 'kW'],
        BET_NAME: ['타입', ''], PCS_AMOUNT: ['용량', 'kW'], ESS_OPER_STATUS: ['현재상태', ''], PCS_OPER_NAME: ['운영모드', ''],
        SLOW_EV_CHARGER: ['완속충전기', '개'], FAST_EV_CHARGER: ['급속충전기', '개'],
        DER_SUPPLY_AMOUNT:['누적 공급전력', 'kW'], TOTAL_CONSUME_AMOUNT: ['누적 소비전력', 'kW'],
        CHARGE_REQ_AMOUNT: ['부하', 'kW'],
        HEAT_MONTH_USAGE: ['월 사용량', 'mCal'],
        MONTHLY_CONSUM: ['월 사용량'],
        MONTH_USAGE: ['월 사용량', '㎥'],
        GAS_MONTH_AVG_USAGE: ['월 평균 사용량', 'MJ'],
        WATER_MONTH_AVG_USAGE: ['월 평균 사용량', '㎥'],
        LAST_MONTH_USAGE: ['전년 동월 사용량', '㎥'],
        //통계정보 > 수도 > 수질통계(sc0601)
        PH: ['PH', 'Ph'], NTU: ['탁도'], RESIDUAL_CHLORINE: ['잔류염소'], BACTERIA_COUNT: ['세균수'],
        //통계정보 > 수도 > 사용통계(sc0602)
        AMMONIA: ['암모니아'],
        GEN_AMOUNT : ['발전량', 'kW'],
        OPERATOR_NAME: ['기관명', ''],
        USE_AMOUNT: ['사용량', '', {11: 'kWh', 12: 'MJ', 13: 'mCal', 15: '㎥'}],
        MY_CARBON : ['나의배출량'],
        OTHER_CARBON : ['이웃배출량'],
        PRESENT_CARBON : ['올해 탄소배출량'],
        LAST_CARBON : ['작년 탄소배출량'],
        THIS_METER : ['현재 사용량'],
        LAST_METER : ['평균 사용량']
    };

    $.writeLog = function(message, obj) {
        try {
            if (typeof obj === 'undefined') {
                console.log(message);
            } else {
                console.log(message, obj);
            }
        } catch (e) {
            console.log('## log error');
        }
    };

    $.secosChart = function(opt) {
        var _this = {};
        var _chart
            , _option = [];

        ;

        _this.init = function(option) {
            if(option)
                _this.setOption(option);
            // _this.setHighChartOption();
            _this.drawChart(_option);
            _this.resize();
        };

        _this.drawChart = function(option) {
            option['theme']['colors'] = _color[option['colorNum']];
            _chart = new Highcharts.Chart(Highcharts.merge(option['theme'], {
                    chart: { renderTo : option['target'], type: option['selectChart'], options3d: option['options3d']},
                    xAxis: { categories: option['categories'] },
                    series: option['series']
                }));

            // _chart.reflow();
        };

        _this.resize = function() {
            $(window).resize(function(){
                _chart.reflow();
            })
        };

        _this.redraw = function() {
            // _chart.xAxis[0].setCategories(_option['categories'], false);
            // _chart.series.setData(_option['series'], false);
             _chart.destroy();

            _this.drawChart(_option);
            _this.resize();
        };

        _this.makeData = function(data) {
            return data;
        };

        _this.chartDestory = function() {
            // _chart.destroy();
        };

        _this.setChart = function(_) { _chart = _; };
        _this.getChart = function(_) { return _chart ; };

        _this.setOption = function(_) {
            //_this.setTheme(_option['themeId']);
            _this.setTheme([]);
            _option = $.extend(true, _option, _defaultOption);;
            _option = $.extend(true, _option, _);

            if(_['categories'])
                _option['categories'] = _['categories'];

            if(_['series'])
                _option['series'] = _['series'];

            // _option['theme']['yAxis'] = $.extend(true, _option['theme']['yAxis'], _['theme']['yAxis']);
            // _option['theme']['xAxis'] = $.extend(true, _option['theme']['xAxis'], _['theme']['xAxis']);
        };
        _this.getOption = function() { return _option; };

        _this.setTheme = function(_) {
            _option['theme'] =_theme[_];
        };

        // _this.init(opt);

        return _this;
    };

    $.fn.eportalGrid = function(opt) {
        var _thiz = this;
        var _this = {};
        var _grid
            , _option;

        _this.drawGrid = function(option) {
            _this.setOption(option);
            _thiz.jqGrid(_option['gridOption']);
            _this.setGroupHeaders(_option['groupHeader']);
            _this.resize(_option['widthTarget']);
        };

        _this.resize = function(target) {
            var wid = 0;

            // if (target != null)
            //     wid = $(target).width();
            // else
            //     wid = _thiz.parents('.box').width();
            //
            // _thiz.setGridWidth(wid-15, true);

            $(window).resize(function() {
                var wid = 0;

                if (target != null)
                    wid = target.width();
                else
                    wid = $(_thiz['selector']).parents('.box').width()-10;

                $(_thiz['selector']).setGridWidth(wid, true);

                var groupHeaders = $(_thiz['selector']).jqGrid("getGridParam", "groupHeader");
                if (groupHeaders != null) {
                    $(_thiz['selector']).jqGrid("destroyGroupHeader").jqGrid("setGroupHeaders", groupHeaders);
                }


            });
        };

        _this.setGroupHeaders = function(group) {
            if(!group)
                return ;

            _thiz.jqGrid('setGroupHeaders',{
                useColSpanStyle:true,
                groupHeaders: group
            });
        };

        _this.setOption = function(_) {
            _option = $.extend(true, _option, _gridDefaultOption);
            _option = $.extend(true, _option, _);
        };
        _this.getOption = function() { return _option; };

        _this.drawGrid(opt);
    };

    $.fn.eportalCalendar = function(opt) {
        var _thiz = this;
        var _this = {};
        var _option;

        _this.drawCalendar = function(option) {
            _this.setOption(option)
            _thiz.fullCalendar(_option);
        };

        _this.setOption = function(_) {
            _option = $.extend(true, _option, _calDefaultOption);
            _option = $.extend(true, _option, _);
        };
        _this.getOption = function() { return _option; };

        _this.drawCalendar(opt);
    };

    $.eportalMap = function() {
        var _this = {},
            _map,
            _options,
            _tooltip
        ;

        _options = {
            target: 'gisInfo',
            projectionName: 'EPSG:5179',
            iconStyles: [
                {
                    image: new ol.style.Icon(({
                        anchor: [0.5, 1],
                        anchorXunits: 'fraction',
                        anchorYunits: 'fraction',
                        opacity: 1,
                        src: '/eportal/images/layout/marker_red.svg'
                    }))
                },
                {
                    image: new ol.style.Icon(({
                        anchor: [0.5, 1],
                        anchorXunits: 'fraction',
                        anchorYunits: 'fraction',
                        opacity: 1,
                        src: '/eportal/images/layout/marker_blue.svg'
                    }))
                },
                {
                    image: new ol.style.Icon(({
                        anchor: [0.5, 1],
                        anchorXunits: 'fraction',
                        anchorYunits: 'fraction',
                        opacity: 1,
                        src: '/eportal/images/layout/marker_grey.svg'
                    }))
                },
                {
                    image: new ol.style.Icon(({
                        anchor: [0.5, 1],
                        anchorXunits: 'fraction',
                        anchorYunits: 'fraction',
                        opacity: 1,
                        src: '/eportal/images/layout/marker_green.svg'
                    }))
                }
            ],
            iconStyles2: [
                {},
                {
                    image: new ol.style.Icon(({
                        anchor: [0.25, 0.6],
                        anchorXunits: 'fraction',
                        anchorYunits: 'fraction',
                        opacity: 1,
                        src: '/eportal/images/layout/marker2_1.svg'
                    }))
                },
                {
                    image: new ol.style.Icon(({
                        anchor: [0.25, 0.6],
                        anchorXunits: 'fraction',
                        anchorYunits: 'fraction',
                        opacity: 1,
                        src: '/eportal/images/layout/marker2_2.svg'
                    }))
                },
                {
                    image: new ol.style.Icon(({
                        anchor: [0.25, 0.6],
                        anchorXunits: 'fraction',
                        anchorYunits: 'fraction',
                        opacity: 1,
                        src: '/eportal/images/layout/marker2_3.svg'
                    }))
                },
                {
                    image: new ol.style.Icon(({
                        anchor: [0.25, 0.6],
                        anchorXunits: 'fraction',
                        anchorYunits: 'fraction',
                        opacity: 1,
                        src: '/eportal/images/layout/marker2_4.svg'
                    }))
                }
            ],
            polygonStyle: [
                [],
                [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(91, 157, 207, 0.8)',
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(91, 157, 207, 0.5)'
                        })
                    })
                ],
                [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(102, 103, 188, 0.8)',
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(102, 103, 188, 0.5)'
                        })
                    })
                ],
                [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(228, 147, 31, 0.8)',
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(228, 147, 31, 0.5)'
                        })
                    })
                ],
                [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(212, 88, 59, 0.8)',
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(212, 88, 59, 0.5)'
                        })
                    })
                ]
            ],
            tooltip: {
                target: $('#mapTooltip'),
                mouseover: true
            },
            layers: [],
            zoom: 16,
            center: [935299, 1669504],
            clickEvent: function() {

            }
        };

        proj4.defs(_options['projectionName'],"+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs");
        var _projection = new ol.proj.Projection({code: _options['projectionName'], units: 'm'});
        ol.proj.addProjection(_projection);

        _this.createMap = function() {
            var view = new ol.View({
                center: _options['center'],
                projection: _projection,
                maxZoom: 24,
                minZoom: 12,
                zoom: _options['zoom']
            });

            var markerLayer = new ol.layer.Vector({
                source: new ol.source.Vector({features: [], projection: _options['projectionName']})
            });
            var polygonLayer = new ol.layer.Vector({
                source: new ol.source.Vector({features: [], projection: _options['projectionName']})
            });


            var commonLayer = [baseLayers, polygonLayer, markerLayer];

            _map = new ol.Map({
                layers: $.merge(commonLayer, _options['layers']),
                target: _options['target'],
                view: view
            });

            _map.getView().on('change:resolution', function(evt) {
                var resolution = evt.target.get('resolution');
                var units = _map.getView().getProjection().getUnits();
                var dpi = 25.4 / 0.28;
                var mpu = ol.proj.METERS_PER_UNIT[units];
                var scale = resolution * mpu * 39.37 * dpi;
                if (scale >= 9500 && scale <= 950000)
                {
                    scale = Math.round(scale / 1000) + "K";
                }
                else if (scale >= 950000)
                {
                    scale = Math.round(scale / 1000000) + "M";
                }
                else
                {
                    scale = Math.round(scale);
                }
                var z = _map.getView().getZoom();

                $('#scale').text("S = 1 : " + scale + "(Level " + (z - 8) + ")");
            });

            _map.on('click', function(evt) {
                _this.clickCallback2(evt);
            });

            _tooltip = new ol.Overlay({
                element: _options['tooltip']['target'],
                positioning: 'bottom-center',
                stopEvent: false
            });

            _map.addOverlay(_tooltip);

            _map.on('pointermove', function(evt){
                if(evt.dragging && _options['tooltip']['mouseover']) {
                    _this.clickCallback2(evt);
                    _options['tooltip']['target'].hide();
                    return ;
                }

                var pixel = _map.getEventPixel(evt.originalEvent);
                var hit = _map.hasFeatureAtPixel(pixel);

                $('#'+_map.getTarget()).css('cursor', hit ? 'pointer' : '');
            });

        };

        _this.wheelDisabled = function() {
            _map.getInteractions().forEach(function(i){
                if(i instanceof ol.interaction.MouseWheelZoom) {
                    i.setActive(false);
                }
            });
        };

        _this.addMarker = function(layerId, mData){
            $.each(mData, function(i, d){
                var pos = ol.proj.fromLonLat(d['geo'], _options['projectionName']);
                var feature = new ol.Feature({

                    geometry: new ol.geom.Point(pos),
                    data: d
                });

                feature.setStyle([
                    new ol.style.Style(_options['iconStyles'][d['iconNum']])
                ]);
                feature.setId(d['id']);

                _map.getLayers().item(layerId).getSource().addFeature(feature);
            });
        };

        _this.addPolygon = function(layerId, pData){
            $.each(pData, function(i, d){
                var feature = new ol.Feature({
                    geometry: new ol.geom.Polygon([d['geo']]),
                    data: d
                });

                feature.getGeometry().transform('EPSG:4326',_options['projectionName']);
                feature.setStyle(_options['polygonStyle'][d['iconNum']]);
                feature.setId(d['id']);

                _map.getLayers().item(layerId).getSource().addFeature(feature);
            });
        };

        _this.clickCallback = function(evt) {
            var feature = _map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
                return feature;
            });

            if(feature) {
                var data = feature.values_.data;
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();

                if(!data.click) {
                    _options['tooltip']['target'].hide();
                    return;
                }

                _tooltip.setPosition(coord);

                var html = '';

                html += '<div class="tooltip-content">';
                html += '<p class="title">' + data.locName||'' + '</p>';
                html += '<ul class="content">'
                $.each(data.values, function(i, d) {
                    html += '<li>'
                    html += '<span>' + d.key + '</span>'
                    html += '<span>' + d.value + '</span><span> ' + d.unit+ '</span>'
                    html += '</li>'
                });
                html += '</ul>'
                html += '</div>';

                _options['tooltip']['target'].html(html);
                _options['tooltip']['target'].show();
            }
        };

        _this.clickCallback2 = function(evt) {
            var feature = _map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
                return feature;
            });

            if(feature) {
                var data = feature.values_.data;
                var geometry = feature.getGeometry();
                var coord = ol.extent.getCenter(geometry.getExtent());

                if(!data.click) {
                    _options['tooltip']['target'].hide();
                    return;
                }

                _tooltip.setPosition(coord);

                var html = '';

                html += '<div class="tooltip-content">';
                html += '<p class="title">' + data.locName||'' + '</p>';
                html += '<ul class="content">'
                $.each(data.values, function(i, d) {
                    html += '<li>'
                    html += '<span>' + d.key + '</span>'
                    html += '<span>' + d.value + '</span><span> ' + d.unit+ '</span>'
                    html += '</li>'
                });
                html += '</ul>'
                html += '</div>';

                _options['tooltip']['target'].html(html);
                _options['tooltip']['target'].show();
            } else {
                _options['tooltip']['target'].hide();
            }
        };

        _this.showTooltipById = function(layer, id) {
            var feature = _map.getLayers().item(layer).getSource().getFeatureById(id);

            if(feature) {
                var data = feature.values_.data;
                var geometry = feature.getGeometry();
                // var coord = geometry.getCoordinates();
                var coord = ol.extent.getCenter(geometry.getExtent());

                if(!data.click) {
                    _options['tooltip']['target'].hide();
                    return;
                }

                _tooltip.setPosition(coord);

                var html = '';

                html += '<div class="tooltip-content">';
                html += '<p class="title">' + data.locName||'' + '</p>';
                html += '<ul class="content">'
                $.each(data.values, function(i, d) {
                    html += '<li>'
                    html += '<span>' + d.key + '</span>'
                    html += '<span>' + d.value + '</span><span> ' + d.unit+ '</span>'
                    html += '</li>'
                });
                html += '</ul>'
                html += '</div>';

                _options['tooltip']['target'].html(html);
                _options['tooltip']['target'].show();

                _this.changeViewData(coord, 17);
            }
        };

        _this.changeViewData = function(coordi, zoom) {

            // var pos = ol.proj.fromLonLat(coordi, _options['projectionName']);
            _map.getView().setCenter(coordi);
            _map.getView().setZoom(zoom);
        };

        _this.deleteMarker = function(layerId, featureId) {
            if(featureId === 'all'){
                //_map.getLayers().item(layerId).getSource().clear();
                var features = _map.getLayers().item(layerId).getSource().getFeatures();

                $.each(features, function(i, d){
                    var id = d;
                    _map.getLayers().item(layerId).getSource().removeFeature(id);
                });

                return;
            }

            var id = _map.getLayers().item(layerId).getSource().getFeatureById(featureId);

            if(!id)
                return;

            _map.getLayers().item(layerId).getSource().removeFeature(id);
        };

        _this.addElecPolygon = function(layerId, pData) {
            var gradeColor = {
                '1+++': 'rgba(13, 152, 72, 0.8)',
                '1++' : 'rgba(75, 189, 72, 0.8)',
                '1+'  : 'rgba(183, 214, 50, 0.8)',
                '1'   : 'rgba(206, 221, 41, 0.8)',
                '2'   : 'rgba(247, 240, 10, 0.8)',
                '3'   : 'rgba(255, 206, 97, 0.8)',
                '4'   : 'rgba(254, 156, 55, 0.8)',
                '5'   : 'rgba(248, 101, 31, 0.8)',
                '6'   : 'rgba(239, 33, 33, 0.8)',
                '7'   : 'rgba(181, 33, 33, 0.8)',
            };

            var perColor = {
                '1'   : 'rgba(0, 255, 0, 0.8)',
                '2'   : 'rgba(0, 0, 255, 0.8)',
                '3'   : 'rgba(255, 255, 0, 0.8)',
                '4'   : 'rgba(255, 150, 0, 0.8)',
                '5'   : 'rgba(255, 0, 0, 0.8)'
            };



            $.each(pData, function(i, d){
                var feature = new ol.Feature({
                    geometry: new ol.geom.Polygon([d['geo']]),
                    data: d
                });

                feature.getGeometry().transform('EPSG:4326',_options['projectionName']);
                feature.setStyle(
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: perColor[d['perGrade']],
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: perColor[d['perGrade']]
                        })
                    })
                );
                feature.setId(d['id']);

                _map.getLayers().item(layerId).getSource().addFeature(feature);
            });

        };

        _this.setOption = function(_) {
            _options = $.extend(true, _options, _);
        };
        _this.getOption = function() { return _option; };

        _this.getMap = function() { return _map; };
        _this.getTooltip = function() { return _tooltip; };

        return _this;
    };

    $.eportalGridReload = function(tar, d, opt){

        var _option = {
            datatype: 'json'
        };

        _option = $.extend(true, _option, opt);

        $(tar).setGridParam(_option).trigger('reloadGrid');
    };

    $.ajaxSubmit = function(url, data, callback) {
        $.ajax({
            type: "post",
            url: url,
            data : data,
            dataType:"json",
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                callback(data);
            }
        });
    };

    $.fn.formReset = function() {
        var _this = this;
        var inputList = _this.find('input, select');

        $.each(inputList, function(i, d){
            var type = $(d).attr('type');
            var name = $(d).attr('name');
            var tagName = $(d)[0].tagName;
            if(tagName == 'INPUT') {
                if(type == 'text' || tagName == 'textarea') {
                    if(name == 'searchStartDate') {
                        var dd = $.dateFormat(new Date(), 'yyyy-MM-dd');
                        $(d).val(dd);
                    } else {
                        $(d).val('');
                    }
                } else if(type == 'checkbox') {
                    $(d).prop('checked', false);
                } else if(type == 'radio') {
                    $('input[name='+name+']').eq(0).prop('checked', true);
                }
            } else if(tagName == 'SELECT') {
                $(d).find('option:first').attr('selected', false);
                $(d).find('option:first').attr('selected', true);
            }
        });
    };

    $.fn.searchObject = function() {
        var _this = this;

    	console.log("=============");
    	console.log(this);
    	console.log(_this.serializeObject());
    	console.log("=============");

    	return _this.serializeObject();
    };

    $.gridDateFull = function(cellvalue, options, rowObject) {
        if(options.colModel.formatType)
            return $.dateFormat(new Date(cellvalue), options.colModel.formatType);
        else
            return $.dateFormat(new Date(cellvalue), 'yyyy-MM-dd HH:mm:ss');
    };

    $.gridDateTime = function(cellvalue, options, rowObject) {
        return $.dateFormat(new Date(cellvalue), 'HH 시');
    };

    $.gridDtToDate = function(cellvalue, options, rowObject) {
        var date = d3.time.format(options.colModel.foramtDtType).parse(cellvalue);

        return $.dateFormat(new Date(date), options.colModel.formatType);
    };

    $.chartData1 = function(data, cate, id) {
        var categories = [];
        var value = [];
        var result = {};

        $.each(data, function(i, d){
            if(cate === 'YYYYMM')
                categories.push(d.YEAR + "." + d.MONTH);
            else if(cate === 'MM')
                categories.push(d.MONTH);
            else if(cate === 'DD')
                categories.push(d.MONTH + "." + "");
            else if(cate === 'HH')
                categories.push(d.HOUR);

            value.push(d[id]);
        });

        result['categories'] = categories;
        result['value'] = value;

        return result;
    };

    $.chartData2 = function(data, format, id) {
        var categories = [];
        var value = [];
        var result = {};
        var idChk = false;

        if($.isArray(id)) {
            var keys = {};
            $.each(id, function(i, d) {
                keys[d] = [];
            });

            value.push(keys);
            idChk = true;
        }

        $.each(data, function(i, d){
            categories.push($.dateFormat(new Date(d['DT']||d['UPDATE_DT']), format));

            if(idChk) {
                $.each(id, function(j, t) {
                    keys[t].push(d[t]);
                });
            } else {
                value.push(d[id]);
            }
        });

        result['categories'] = categories;
        result['value'] = value;

        return result;
    };


    $.chartData3 = function(data, format, id) {
        var categories = [];
        var values = [];
        var result = {};
        var idChk = false;

        if($.isArray(id)) {
            $.each(id, function(i, d) {
                values.push({
                    name: _chartKey[d][0],
                    data: []
                })
            });
            idChk = true;
        }

        $.each(data, function(i, d){
            var date;

            if(d['STAT_DATE']) {
                if(d['STAT_DATE'].length == 10)
                    date = $.dateParse(d['STAT_DATE'], '%Y%m%d%H');
                if(d['STAT_DATE'].length == 6)
                    date = $.dateParse(d['STAT_DATE'], '%Y%m');
                if(d['STAT_DATE'].length == 8)
                    date = $.dateParse(d['STAT_DATE'], '%Y%m%d');
                if(d['STAT_DATE'].length == 2)
                    date = $.dateParse(d['STAT_DATE'], '%m');
            } else {
                date = new Date(d['DT']||d['UPDATE_DT']);
            }

            categories.push($.dateFormat(date, format));

            if(idChk) {
                $.each(id, function(j, t) {
                    values[j]['data'].push(d[t]);
                });
            } else {
                values.push(d[id]);
            }
        });

        result['categories'] = categories;
        result['values'] = values;

        return result;
    };

    $.chartData4 = function (data, id) {
        var result = [];

        $.each(data, function (i, d) {
            result.push({
                name: d[id[0]],
                y: d[id[1]]
            });
        });

        return result;
    };

    $.chartData5 = function(data, format, id) {
        var categories = [];
        var value = [];
        var result = {};

        $.each(data, function(i, d){
            var date;
            if(d['STAT_DATE']) {
                if(d['STAT_DATE'].length == 10)
                    date = $.dateParse(d['STAT_DATE'], '%Y%m%d%H');
                if(d['STAT_DATE'].length == 6)
                    date = $.dateParse(d['STAT_DATE'], '%Y%m');
                if(d['STAT_DATE'].length == 8)
                    date = $.dateParse(d['STAT_DATE'], '%Y%m%d');
            } else {
                date = new Date(d['DT']||d['UPDATE_DT']);
            }

            categories.push($.dateFormat(date, format));

            value.push(d[id]||0);
        });

        result['categories'] = categories;
        result['value'] = value;

        return result;
    };

    $.chartNullInsert = function(d, f, t, p){
        var categories = d['categories'];
        var value = d['value'] || d['values'];
        var cateLast = $.dateParse(categories[categories.length-1], p);
        var lastDt = 0;

        if(t == 'time') {
            lastDt = cateLast.getHours();
            var cnt = 23 - lastDt;



            while(cnt != 0) {
                categories.push($.dateDiff(cateLast, -1, t, f));

                if(d['value'])
                    value.push(0);
                else if (d['values']) {
                    $.each(value, function(i, z) {
                        z['data'].push(0);
                    });

                }
                cnt--;
            }

        } else if(t == 'day') {
            lastDt = cateLast.getDate();
            var monLast = new Date(cateLast.getYear(), cateLast.getMonth(), 0).getDate();
            var cnt = monLast - lastDt;



            while(cnt != 0) {
                categories.push($.dateDiff(cateLast, -1, t, f));

                if(d['value'])
                    value.push(0);
                else if (d['values']) {
                    $.each(value, function(i, z) {
                        z['data'].push(0);
                    });

                }
                cnt--;
            }

        } else if(t == 'month') {
            lastDt = cateLast.getMonth()+1;
            var cnt = 12 - lastDt;

            while(cnt != 0) {
                categories.push($.dateDiff(cateLast, -1, t, f));

                if(d['value'])
                    value.push(0);
                else if (d['values']) {
                    $.each(value, function(i, z) {
                        z['data'].push(0);
                    });

                }
                cnt--;
            }

        }
    };

    $.calendarData = function(data) {
        var result = [];

        $.each(data, function(i, d) {
            result.push({
                id: d['ID_PK'],
                title: d['DESC'],
                start: d['DT_START'],
                end: d['DT_END']
            });
        });

        return result;
    };

    $.markerData = function(data, opt) {
        var markerData = [];
        $.each(data, function(i, d) {

            var values =[];

            $.each(opt['keys'], function(j, t) {
                var v = d[t];

                if($.isNumeric(v))
                    v = d3.format(',.d')(v);

                values.push({
                    key: _chartKey[t][0],
                    value: v||0,
                    unit: _chartKey[t][1]
                })
            });

            var iconNum = opt['iconNum'];

            if(d.ICON_NUM)
                iconNum = d.ICON_NUM;

            markerData.push({
                id: d['BUILDING_ID'],
                geo: [d.GRID_X, d.GRID_Y],
                locName: d.LOC_NAME,
                iconNum : iconNum,
                click : opt['click'],
                values: values
            });
        });

        return markerData;
    };

    $.markerData2 = function(data, opt) {
        var markerData = [];
        $.each(data, function(i, d) {

            var values =[];

            $.each(opt['keys'], function(j, t) {
                var v = d[t];

                if($.isNumeric(v))
                    v = d3.format(',.d')(v);

                values.push({
                    key: _chartKey[t][0],
                    value: v||0,
                    unit: _chartKey[t][2][d.ENGY_KIND_CD]
                })
            });

            var iconNum = opt['iconNum'];

            if(d.ICON_NUM)
                iconNum = d.ICON_NUM;

            markerData.push({
                id: d['BUILDING_ID'],
                geo: [d.GRID_X, d.GRID_Y],
                locName: d.LOC_NAME,
                iconNum : iconNum,
                click : opt['click'],
                values: values
            });
        });

        return markerData;
    };

    $.polygonData = function(data, data2, opt) {
        var polygons = [];
        var tempObj = {};
        var buildingId = 0;

        var markerData ={};
        $.each(data2, function(i, d) {

            var values =[];

            $.each(opt['keys'], function(j, t) {
                var v = d[t];

                if($.isNumeric(v))
                    v = d3.format(',.d')(v);

                values.push({
                    key: _chartKey[t][0],
                    value: v||0,
                    unit: _chartKey[t][2][d.ENGY_KIND_CD]
                })
            });

            markerData[d['BUILDING_ID']] = {
                values: values,
                locName: d.LOC_NAME
            };
        });

        $.each(data, function(i, d) {
            if(d['BUILDING_ID'] != buildingId) {

                // console.log(buildingId, tempObj['FEATURE'])
                tempObj['id'] = buildingId;
                tempObj['locName'] = d.LOC_NAME;
                tempObj['iconNum'] = opt['iconNum']||0;
                tempObj['click'] = opt['click'];
                tempObj['values'] = markerData[buildingId] ? markerData[buildingId]['values'] : [];
                tempObj['locName'] = markerData[buildingId] ?  markerData[buildingId]['locName'] : '';

                polygons.push(tempObj);

                buildingId = d['BUILDING_ID'];

                tempObj = new Object({
                    key: '',
                    id : 0,
                    values : [],
                    locName: '',
                    iconNum : 0,
                    geo: []
                });
            }

            tempObj['geo'].push([d['GRID_X'], d['GRID_Y']]);
        });

        return polygons;
    };

    $.polygonData2 = function(data, data2, opt) {
        var polygons = [];
        var total = d3.sum(data2, function(v){return +v.USE_AMOUNT;});
        var calcRange = function(v, a) {
            var d = 15;
            var y = 365;
            var gv = (v*d*y)/a;
            var g = '';

            if(gv < 60)
                g = '1+++';
            else if(gv < 90)
                g = '1++';
            else if(gv < 120)
                g = '1+';
            else if(gv < 150)
                g = '1';
            else if(gv < 190)
                g = '2';
            else if(gv < 230)
                g = '3';
            else if(gv < 270)
                g = '4';
            else if(gv < 320)
                g = '5';
            else if(gv < 370)
                g = '6';
            else
                g = '7';

            return {gv: gv, g: g};
        };

        var calcRange2 = function(v, t) {
            var g = '';
            var gv = v/t*100;

            if(gv < 21)
                g = '1';
            else if(gv < 41)
                g = '2';
            else if(gv < 61)
                g = '3';
            else if(gv < 81)
                g = '4';
            else
                g = '5';

            return g;
        };

        $.each(data2, function(i, d) {

            var values =[];

            $.each(opt['keys'], function(j, t) {
                var v = d[t];

                if($.isNumeric(v))
                    v = d3.format(',.d')(v);


                values.push({
                    key: _chartKey[t][0],
                    value: v||0,
                    unit: _chartKey[t][2][d.ENGY_KIND_CD]
                })
            });

            // var grade = calcRange(d['USE_AMOUNT'], d['AREA'])['g'];
            //
            // if(d['AREA']) {
            //     values.push({
            //         key: '총 연면적',
            //         value : d['AREA'],
            //         unit: '㎡'
            //     });
            //     values.push({
            //         key: '에너지 등급',
            //         value : grade,
            //         unit: ''
            //     });
            // }

            var iconNum = opt['iconNum'];

            if(d.ICON_NUM)
                iconNum = d.ICON_NUM;

            var geoTemp = data.filter(function(t) { return t.BUILDING_ID === d['BUILDING_ID'];});
            var geo = [];

            $.each(geoTemp, function(j, t) {
               geo.push([t['GRID_X'], t['GRID_Y']]) ;
            });


            polygons.push({
                id: d['BUILDING_ID'],
                geo: geo,
                // grade : grade,
                perGrade : calcRange2(d['USE_AMOUNT'], total),
                locName: d.LOC_NAME,
                iconNum : iconNum,
                click : opt['click'],
                values: values
            });
        });

        return polygons;
    };

    $.dateFormat = function(date, format) {
        if (!this.valueOf()) return " ";

        var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var d = date, h;

        return format.replace(/(yyyy|yy|MM|dd|E|hh|kk|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekName[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "kk": return d.getHours().zf(2) == '00' ? '24' : d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };

    $.dateParse = function(date, format) {
        return new Date(d3.time.format(format).parse(date));
    };

    $.dateFormatStr = function(date, parse, format) {
        var date = $.dateParse(date, parse);
        return $.dateFormat(new Date(date), format);
    };

    $.dateDiff = function(date, num, cate, format) {
        var tmpDt = date == "" ? new Date() : date;
        var tmpVal;
        if(cate == "day") {
            tmpVal = tmpDt.setDate(tmpDt.getDate() - num);
            tmpVal = new Date(tmpVal);
        } else if(cate == "month") {
            tmpVal = tmpDt.setMonth(tmpDt.getMonth() - num);
            tmpVal = new Date(tmpVal);
        } else if(cate == "year") {
            tmpVal = tmpDt.setYear(tmpDt.getFullYear() - num);
            tmpVal = new Date(tmpVal);
        } else if(cate == "time") {
            tmpVal = tmpDt.setHours(tmpDt.getHours() - num);
            tmpVal = new Date(tmpVal);
        }

        return $.dateFormat(tmpVal, format);
    };

    $.lpad = function(str, length, padStr) {
        str = String(str);
        while(str.length < length) {
            str = padStr + str;
        }

        return str
    };

    $.rpad = function(str, length, padStr) {
        str = String(str);
        while(str.length < length) {
            str = str  + padStr;
        }

        return str
    };

    $.comma = function(str) {
        if(!str)
            return 0;

        return d3.format(',.1')(str);
        // return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };

    $.round = function(v, d) {
        if(v === 0)
            return 0;

      return Number(Math.round(v+'e'+d)+'e-'+d);
    };

    $.lastDay = function(y, m) {
        y = parseInt(y);
        m = parseInt(m);

        return $.dateFormat(new Date(y, m, 0), 'dd');
    }

})(jQuery);


String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}


if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

function isDate (x)
{
    return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate);
}

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};