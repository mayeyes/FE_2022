function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    
	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}

function describeArc(x, y, radius, startAngle, endAngle){
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);
    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    
    //var arcSweep = 1;
    start.x = start.x - 0.0001;//100%일때 오류 수정
	var d = ["M", x, y, "L", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y, "z"].join(" ");
	return d;       
}

function commas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}


var _graph = {
    json:function(str){
        var j = $.trim(str.find(">[name='data']").val());
        var j2 = $.trim(str.find(">[name='data2']").val());
        var t = $.trim(str.find(">[name='target']").val());
        var _this = this;
        
        $.ajax({url:j}).done(function(data){
            _this.set(data,t,str);
        });
    },
    set:function(str,targets,_obj,str2){
        if($("#"+targets).length === 0) return false;
        
        //set
        var obj = $("#"+targets).empty();
        str.id = targets;
        str.type = $.trim(_obj.find(">[name='type']").val());
        str.fig = $.trim(_obj.find(">[name='fig']").val()) || "";
        str.ratio = $.trim(_obj.find(">[name='ratio']").val()) || "10:4";
        str.maxpoint = $.trim(_obj.find(">[name='maxpoint']").val()) || "0";
        
        // console.log(str);
        

        
        if(str.data.length > 0){
            this.webTable(obj,str);//접근성 테이블 생성
            if(str.type=="1") this.float(obj,str);
            else if(str.type=="2") this.floatClass(obj,str);
            else if(str.type=="3") this.line(obj,str);
            else if(str.type=="4") this.lineColor(obj,str);
            else if(str.type=="5") this.radius(obj,str);
            else if(str.type=="6") this.radiusColor(obj,str);
            else if(str.type=="7") this.dot(obj,str);
            else if(str.type=="8") this.circle(obj,str);
            else if(str.type=="9") this.circle_screw(obj,str);
            else if(str.type=="10") this.polygon(obj,str);
            else if(str.type=="11") this.block(obj,str);
            else if(str.type=="12") this.floatLine(obj,str);
            else if(str.type=="13") this.circle_ban(obj,str);
            else if(str.type=="14") this.radiusColor_mini(obj,str);
            
            obj.find(" svg").attr("tabindex","-1").css({"position":"relative","z-index":"100"});
        }
    },
    //접근성 테이블추가
    webTable:function(obj,str){
        var __html;
        var cnt = 0;
        __html = function(){
            cnt++;
            $('<div id="'+str.id+'_table_'+cnt+'"><table border="1"><caption></caption><thead></thead><tbody></tbody></table></div>').appendTo($("#"+str.id));
            var table = obj.find(" #"+str.id+'_table_'+cnt);
            var caption = '그래프 : 구분별(';
            var thead = '<tr>';
                thead += '<th scope="col">구분</th>';
            for(var i=0; i<str.item.length; i++){
                thead += '<th scope="col">'+str.item[i]+'</th>';
                if(i!==0) caption += ' ,';
                caption += str.item[i];
            }
            thead += '</tr>';
            caption += ') 내용을 확인 하실수 있습니다.';
            table.find(" caption").text(caption);
            $(thead).appendTo(table.find(" thead"));

            var datas = (cnt === 1) ? str.data:str.data2;
            var tbody = '';
            for(var i=0; i<datas.length; i++){
                tbody += '<tr>';
                tbody += '<th scope="row">'+datas[i].title+'</th>';
                for(var t=0; t<datas[i].data.length; t++){
                    tbody += '<td>'+datas[i].data[t]+'</td>';
                }
                tbody += '</tr>';
            }
            $(tbody).appendTo(table.find(" tbody"));
            table.css({"opacity":"0","overflow":"hidden","position":"absolute","z-index":"-1","width":"1px","height":"1px"});
        }
        __html();
        

        if(str.data2 !== undefined){
            __html();
        }
    },
    //막대
    float:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        var a = ra[0];//비율 가로
        var b = ra[1];//비율 세로
        h = (b*w)/a;

        //set
        var maxH = maxH_clone = 0;
        var verticalH = 100;
        var verticalW = 40;
        h = h-verticalH;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+(h+verticalH)+'" viewbox="0 0 '+w+' '+(h+verticalH)+'">';
        if(str.fig === "%"){
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone += Number(str.data[t].data[i]);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        } else {
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone = Math.max(Number(str.data[t].data[i]),maxH_clone);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        }
        
        if(maxH == 0) maxH = 2000;
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;
        var maxH_save = maxH;

        //bg
        var tVal = 5;
        var y1 = (h * (2 / (tVal*2)));
        for(var t=0; t<tVal; t++){
            var lineVal = (maxH-((maxH/tVal)*(t+1)));
                lineVal = parseInt(lineVal);
            if(t==0){
                lineVal = maxH;
                lineVal = parseInt(lineVal);
                svgs += '<g fill="#6A707E">';
                svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+(verticalH/2)+'" stroke-width="0.5" stroke="#ddd" />';
                svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+(verticalH/2)+'">';
                if(str.fig === "%") svgs += '100%';
                else svgs += maxH;
                svgs += '</text>';
                svgs += '</g>';
            }
            lineVal = (maxH-((maxH/tVal)*(t+1)));
            lineVal = parseInt(lineVal);
            svgs += '<g fill="#6A707E">';
            svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.5" stroke="#ddd" id="bg_line_'+(t+1)+'" />';
            svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+((y1*(t+1))+(verticalH/2))+'">';
            if(str.fig === "%"){
                var dan = ((((t+1) * Math.floor(100/(tVal))) - 100) * -1);
                    dan = (t===tVal-1) ? 0:dan;
                svgs += dan+'%';
            }
            else svgs += Math.ceil(maxH - (maxH * (0.2 * (t+1))));
            svgs += '</text>';
            svgs += '</g>';
        }

        //단위
        svgs += '<text font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">[단위:'+str.dan+']</text>';

        //색구분
        if(str.tip === "Y"){
            for(var t=0; t<str.item.length; t++){
                svgs += '<rect id="colorText_'+(t+1)+'_box" rx="2" ry="2" fill="'+str.color[t]+'"></rect>';
                svgs += '<text id="colorText_'+(t+1)+'" font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">'+str.item[t]+'</text>';
            }
        }


        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var fills =  str.color[0];

            //막대
            for(var i=0; i<str.data[t].data.length; i++){
                svgs += '<rect id="'+arcIds+'_'+(i+1)+'" class="'+cls+'_'+(i+1)+' bong line" rx="2" ry="2" fill="'+str.color[i]+'"></rect>';
            }
            
            
            //하단 텍스트
            svgs += '<text font-size="14" x="0" y="'+(h+(verticalH/2)+30)+'" fill="#444" class="text_bottom '+arcIds+'_1 '+cls+'_1">'+str.data[t].title+'</text>';
        }

        //가이드선
        svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((h+verticalH)/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((h+verticalH)/2)+'" stroke-width="0.5" stroke="#ff0000" id="guide_x" />';
        svgs += '<line x1="'+((w+40)/2)+'" y1="'+(verticalH/2)+'" x2="'+((w+40)/2)+'" y2="'+(h+(verticalH/2))+'" stroke-width="0.5" stroke="#ff0000" id="guide_y" />';

        

        //tooltip
        var hs = (str.data[0].data.length > 1) ? (55+(22*str.data[0].data.length)):72;
        var offsetVal = 40/hs*100;
        svgs += '<linearGradient id="'+str.id+'_MyGradient" gradientTransform="rotate(90)"><stop offset="'+offsetVal+'%" stop-color="#EFF4FF" /><stop offset="'+offsetVal+'%" stop-color="#fff" /><stop offset="100%" stop-color="#fff" /></linearGradient>';

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var arcIdsTip = 'tipbox_'+(t+1);

            svgs += '<rect x="0" y="0" class="'+arcIdsTip+' '+arcIds+' line" id="'+arcIds+'_box" fill="url(#'+str.id+'_MyGradient)" rx="6" ry="6" width="149px" height="'+hs+'px" stroke-width="1" stroke="#F0F0F0" fill="#ddd"></rect>';
            svgs += '<text x="'+(15)+'" y="20" class="'+arcIdsTip+'_1 '+arcIds+' line text1" id="'+arcIds+'_box_1" font-size="14" fill="#222">'+str.day+'</text>';
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                per = per.toFixed(1);
                per = per.replace(".0","");
                
                svgs += '<text x="'+(15)+'" y="55" class="'+arcIdsTip+'_4_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_2" font-size="14" fill="#666">'+str.item[i]+'</text>';
                svgs += '<text x="'+(15 + 119)+'" y="55" class="'+arcIdsTip+'_5_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_3" text-anchor="end" font-size="14" fill="'+str.color[i]+'">'
                if(str.fig === "%") svgs += per+'%';
                else svgs += commas(Number(str.data[t].data[i]));
                svgs += '</text>';
            }
        }

        svgs += '</svg>';
        obj.append(svgs);


        //view
        obj.find(" [id*='guide_']").hide();
        obj.find(">svg").on("mousemove",function(e){
            // var p = e.offsetY / $(this).height() * 100;
            //     p = (((400+verticalH) / 100) * p) - (((hs / 100) * p) * 1.5) - ($(this).find(" [class*='tipbox_']").height() / 2);

            var pers_x = e.offsetX/Number(obj.find(">svg").attr("width"))*100;
            var pers_y = e.offsetY/Number(obj.find(">svg").attr("height"))*100;
            var h = (b*w)/a;
                e.offsetX = w*(pers_x*0.01);
                e.offsetY = h*(pers_y*0.01);
                
            var p = e.offsetY - (hs/2);
            p = (p<0) ? 0:p;
            
            $(this).find(" [class*='tipbox_']").attr("y",p);
            $(this).find(" [class*='tipbox_'].text1").attr("y",p+25);
            for(var i=0; i<str.item.length; i++){
                $(this).find(" [class*='tipbox_'].text2_"+(i+1)).attr("y",p+63+(22*i));
            }

            var guide_x = ((w-(verticalW/2))>e.offsetX) ? e.offsetX:(w-(verticalW/2));
                guide_x = (((verticalW/2)+40)>guide_x) ? ((verticalW/2)+40):guide_x;
            var guide_y = ((h-(verticalH/2))>e.offsetY) ? e.offsetY:h-(verticalH/2);
                guide_y = ((verticalH/2)>guide_y) ? (verticalH/2):guide_y;
            obj.find(" [id*='guide_']").show();
            obj.find(" #guide_y").attr({
                "x1":guide_x+1,
                "x2":guide_x+1
            });
            obj.find(" #guide_x").attr({
                "y1":guide_y+1,
                "y2":guide_y+1
            });
        });
        obj.find(">svg").on("mouseleave",function(e){
            obj.find(" [id*='guide_']").hide();
        });
        obj.find(" .line").on("mouseenter",function(){
            var str = $(this).attr("id").split("_");
                str = str[0]+"_"+str[1]+"_"+str[2];
            obj.find(" [class*='tipbox_']").hide();
            obj.find(" ."+str).show();
            // obj.find(" #"+str+".bong.line").css("fill-opacity","1");
        });
        obj.find(" .line").on("mouseout",function(){
            // obj.find(" .bong.line").css("fill-opacity","0.4");
            obj.find(" [class*='tipbox_']").hide();
        });
        
        //색구분
        if(str.tip === "Y"){
            var colorText_x = (w-(verticalW/2));
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();
                var tColorBox = obj.find(" #colorText_"+(t+1)+"_box")[0].getBBox();

                colorText_x -= tColor.width;
                obj.find(" #colorText_"+(t+1)).attr({
                    "x":colorText_x,
                    "y":20
                });
                colorText_x -= tColor.height+5;
                obj.find(" #colorText_"+(t+1)+"_box").attr({
                    "x":colorText_x,
                    "y":20-(tColor.height*0.8),
                    "width":tColor.height,
                    "height":tColor.height
                });
                colorText_x -= 10;
            }
        }

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                if(isNaN(per)) per = 0;
                if(per > 100) per = 100;
                if(per < 0) per = 0;

                var rw = (((w-30)/str.data.length) / 2);
                    rw = (rw > 100) ? 100:rw;
                var rh = (h * (per*0.01));
                
                var rx = (((w-30 - 80)/str.data.length) * t)+(rw/2)+(verticalW/2)+50;
                var ry = (h * ((100 - per)*0.01))+(verticalH/2);

                rw = rw / str.data[t].data.length;
                rx = rx + (rw * i);

                obj.find(" #"+arcIds+"_"+(i+1)).attr("x",rx);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("y",ry);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("width",rw);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("height",rh);

                //animate
                obj.find( ".text_top."+arcIds+"_"+(i+1)).css("opacity",0);
                obj.find( "#"+arcIds+"_"+(i+1))
                    .css({
                        "y":(h+(verticalH/2)),
                        "height":0
                    })
                    .animate({
                        "y":ry,
                        "height":rh
                    },300+(per*10),
                    function(){
                        obj.find(" .text_top."+$(this).attr("id")).css("opacity",1);
                    });
            }

            var rw_t = (((w-30)/str.data.length) / 2);
                rw_t = (rw_t > 100) ? 100:rw_t;
            var rx_t = (((w-30 - 80)/str.data.length) * t)+(rw_t/2)+(verticalW/2)+50;

            var r = obj.find(" #"+arcIds+"_1")[0].getBBox();
            var tx = obj.find(" .text_bottom."+arcIds+"_1")[0].getBBox();
            var tx_x = (rx_t+(rw_t/2))-(tx.width/2);
            obj.find(" .text_bottom."+arcIds+"_1").attr("x",tx_x);

            //tipbox
            var tipbox = 'tipbox_'+(t+1);
            var tb0 = obj.find(" ."+tipbox)[0].getBBox();
            var tb_x = (rx + (r.width) + 10);
            if((tb_x + tb0.width) > w){
                // tb_x = (rx - tb0.width - 10);
                tb_x = tb_x - tb0.width - (((w-30)/str.data.length) / 2) - 20;
            }
            var tb_y = r.y-5;

            obj.find(" ."+tipbox).attr("x",tb_x).attr("y",tb_y).hide();
            obj.find(" ."+tipbox+'_1').attr("x",(tb_x+15)).attr("y",(tb_y+20)).hide();

            for(var i=0; i<str.data[t].data.length; i++){
                tb_y += 55;
                obj.find(" ."+tipbox+'_4_'+(i+1)).attr("x",(tb_x+15)).attr("y",tb_y).hide();
                obj.find(" ."+tipbox+'_5_'+(i+1)).attr("x",(tb_x+15+119)).attr("y",tb_y).hide();
            }
            
        }

        //아래 텍스트 변형
        var maxWidth = 0;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1)+'_1';
            var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

            maxWidth += textW;
        }
        if(maxWidth > w){
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1)+'_1';
                var textObj = obj.find(" .text_bottom."+arcIds);
                var boxObj = obj.find(" #"+arcIds);
                textObj.attr({"font-size":"10"});

                var text_w = (((w-30)/str.data.length) / 2);
                    text_w = (text_w > 100) ? 100:text_w;
                var text_x = (((w-30 - 80)/str.data.length) * t)+(text_w)+(verticalW/2)+50 - textObj[0].getBBox().width;
                var text_y = h + verticalH - (textObj[0].getBBox().height * 2) - 20;
                textObj.attr({
                    "x":text_x,
                    "y":text_y
                });
                textObj.attr({
                    "transform":"translate(0,"+(textObj[0].getBBox().height)+") rotate(-45, "+(text_x + textObj[0].getBBox().width)+","+(text_y - textObj[0].getBBox().height)+")"
                });
            }
        }

        
        this.resize(obj,str,b,a);
    },
    //막대-계층형
    floatClass:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        var a = ra[0];//비율 가로
        var b = ra[1];//비율 세로
        h = (b*w)/a;

        //set
        var maxH = maxH_clone = 0;
        var verticalH = 100;
        var verticalW = 40;
        h = h-verticalH;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+(h+verticalH)+'" viewbox="0 0 '+w+' '+(h+verticalH)+'">';
        if(str.fig === "%"){
            for(var t=0; t<str.data.length; t++){
                maxH_clone = 0;
                for(var i=0; i<str.data[0].data.length; i++){
                    maxH_clone += Number(str.data[t].data[i]);
                }
                maxH += maxH_clone;
            }
        } else {
            for(var t=0; t<str.data.length; t++){
                maxH_clone = 0;
                for(var i=0; i<str.data[0].data.length; i++){
                    maxH_clone += Number(str.data[t].data[i]);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        }
        
        if(maxH == 0) maxH = 2000;
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;
        var maxH_save = maxH;

        //bg
        var tVal = 5;
        var y1 = (h * (2 / (tVal*2)));
        for(var t=0; t<tVal; t++){
            var lineVal = (maxH-((maxH/tVal)*(t+1)));
                lineVal = parseInt(lineVal);
            if(t==0){
                lineVal = maxH;
                lineVal = parseInt(lineVal);
                svgs += '<g fill="#6A707E">';
                svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+(verticalH/2)+'" stroke-width="0.5" stroke="#ddd" />';
                svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+(verticalH/2)+'">';
                if(str.fig === "%") svgs += '100%';
                else svgs += maxH;
                svgs += '</text>';
                svgs += '</g>';
            }
            lineVal = (maxH-((maxH/tVal)*(t+1)));
            lineVal = parseInt(lineVal);
            svgs += '<g fill="#6A707E">';
            svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.5" stroke="#ddd" id="bg_line_'+(t+1)+'" />';
            svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+((y1*(t+1))+(verticalH/2))+'">';
            if(str.fig === "%"){
                var dan = ((((t+1) * Math.floor(100/(tVal))) - 100) * -1);
                    dan = (t===tVal-1) ? 0:dan;
                svgs += dan+'%';
            }
            else svgs += Math.ceil(maxH - (maxH * (0.2 * (t+1))));
            svgs += '</text>';
            svgs += '</g>';
        }

        //단위
        svgs += '<text font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">[단위:'+str.dan+']</text>';

        //색구분
        if(str.tip === "Y"){
            for(var t=0; t<str.item.length; t++){
                svgs += '<rect id="colorText_'+(t+1)+'_box" rx="2" ry="2" fill="'+str.color[t]+'"></rect>';
                svgs += '<text id="colorText_'+(t+1)+'" font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">'+str.item[t]+'</text>';
            }
        }
        


        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var fills =  str.color[0];

            //막대
            for(var i=0; i<str.data[t].data.length; i++){
                svgs += '<rect id="'+arcIds+'_'+(i+1)+'" class="'+cls+'_'+(i+1)+' bong line" rx="0" ry="0" fill="'+str.color[i]+'"></rect>';
            }
            
            
            //하단 텍스트
            svgs += '<text font-size="14" x="0" y="'+(h+(verticalH/2)+30)+'" fill="#444" class="text_bottom '+arcIds+'_1 '+cls+'_1">'+str.data[t].title+'</text>';
        }

        //가이드선
        svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((h+verticalH)/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((h+verticalH)/2)+'" stroke-width="0.5" stroke="#ff0000" id="guide_x" />';
        svgs += '<line x1="'+((w+40)/2)+'" y1="'+(verticalH/2)+'" x2="'+((w+40)/2)+'" y2="'+(h+(verticalH/2))+'" stroke-width="0.5" stroke="#ff0000" id="guide_y" />';

        

        //tooltip
        var hs = (str.data[0].data.length > 1) ? (55+(22*str.data[0].data.length)):72;
        var offsetVal = 40/hs*100;
        svgs += '<linearGradient id="'+str.id+'_MyGradient" gradientTransform="rotate(90)"><stop offset="'+offsetVal+'%" stop-color="#EFF4FF" /><stop offset="'+offsetVal+'%" stop-color="#fff" /><stop offset="100%" stop-color="#fff" /></linearGradient>';

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var arcIdsTip = 'tipbox_'+(t+1);

            svgs += '<rect x="0" y="0" class="'+arcIdsTip+' '+arcIds+' line" id="'+arcIds+'_box" fill="url(#'+str.id+'_MyGradient)" rx="6" ry="6" width="149px" height="'+hs+'px" stroke-width="1" stroke="#F0F0F0" fill="#ddd"></rect>';
            svgs += '<text x="'+(15)+'" y="20" class="'+arcIdsTip+'_1 '+arcIds+' line text1" id="'+arcIds+'_box_1" font-size="14" fill="#222">'+str.day+'</text>';
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                per = per.toFixed(1);
                per = per.replace(".0","");
                
                svgs += '<text x="'+(15)+'" y="55" class="'+arcIdsTip+'_4_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_2" font-size="14" fill="#666">'+str.item[i]+'</text>';
                svgs += '<text x="'+(15 + 119)+'" y="55" class="'+arcIdsTip+'_5_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_3" text-anchor="end" font-size="14" fill="'+str.color[i]+'">'
                if(str.fig === "%") svgs += per+'%';
                else svgs += commas(Number(str.data[t].data[i]));
                svgs += '</text>';
            }
        }

        svgs += '</svg>';
        obj.append(svgs);


        //view
        obj.find(" [id*='guide_']").hide();
        obj.find(">svg").on("mousemove",function(e){
            // var p = e.offsetY / $(this).height() * 100;
            //     p = (((400+verticalH) / 100) * p) - (((hs / 100) * p) * 1.5) - ($(this).find(" [class*='tipbox_']").height() / 2);
            var pers_x = e.offsetX/Number(obj.find(">svg").attr("width"))*100;
            var pers_y = e.offsetY/Number(obj.find(">svg").attr("height"))*100;
            var h = (b*w)/a;
                e.offsetX = w*(pers_x*0.01);
                e.offsetY = h*(pers_y*0.01);

            var p = e.offsetY - (hs/2);
            p = (p<0) ? 0:p;
            
            $(this).find(" [class*='tipbox_']").attr("y",p);
            $(this).find(" [class*='tipbox_'].text1").attr("y",p+25);
            for(var i=0; i<str.item.length; i++){
                $(this).find(" [class*='tipbox_'].text2_"+(i+1)).attr("y",p+63+(22*i));
            }
            var guide_x = ((w-(verticalW/2))>e.offsetX) ? e.offsetX:(w-(verticalW/2));
                guide_x = (((verticalW/2)+40)>guide_x) ? ((verticalW/2)+40):guide_x;
            var guide_y = ((h-(verticalH/2))>e.offsetY) ? e.offsetY:h-(verticalH/2);
                guide_y = ((verticalH/2)>guide_y) ? (verticalH/2):guide_y;
            obj.find(" [id*='guide_']").show();
            obj.find(" #guide_y").attr({
                "x1":guide_x+1,
                "x2":guide_x+1
            });
            obj.find(" #guide_x").attr({
                "y1":guide_y+1,
                "y2":guide_y+1
            });
        });
        obj.find(">svg").on("mouseleave",function(e){
            obj.find(" [id*='guide_']").hide();
        });
        obj.find(" .line").on("mouseenter",function(){
            var str = $(this).attr("id").split("_");
                str = str[0]+"_"+str[1]+"_"+str[2];
            obj.find(" [class*='tipbox_']").hide();
            obj.find(" ."+str).show();
            // obj.find(" #"+str+".bong.line").css("fill-opacity","1");
        });
        obj.find(" .line").on("mouseout",function(){
            // obj.find(" .bong.line").css("fill-opacity","0.4");
            obj.find(" [class*='tipbox_']").hide();
        });

        //색구분
        if(str.tip === "Y"){
            var colorText_x = (w-(verticalW/2));
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();
                var tColorBox = obj.find(" #colorText_"+(t+1)+"_box")[0].getBBox();

                colorText_x -= tColor.width;
                obj.find(" #colorText_"+(t+1)).attr({
                    "x":colorText_x,
                    "y":20
                });
                colorText_x -= tColor.height+5;
                obj.find(" #colorText_"+(t+1)+"_box").attr({
                    "x":colorText_x,
                    "y":20-(tColor.height*0.8),
                    "width":tColor.height,
                    "height":tColor.height
                });
                colorText_x -= 10;
            }
        }
        
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var ry_clone = 0;
            var delay = 0;
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                if(isNaN(per)) per = 0;
                if(per > 100) per = 100;
                if(per < 0) per = 0;

                var rw = (((w-30)/str.data.length) / 2);
                    rw = (rw > 100) ? 100:rw;
                var rh = (h * (per*0.01));
                
                var rx = (((w-30 - 80)/str.data.length) * t)+(rw/2)+(verticalW/2)+50;
                var ry = (h * ((100 - per)*0.01))+(verticalH/2);
                    ry = ry - ry_clone;

                obj.find(" #"+arcIds+"_"+(i+1)).attr("x",rx);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("y",ry);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("width",rw);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("height",rh);

                //animate
                obj.find( ".text_top."+arcIds+"_"+(i+1)).css("opacity",0);
                obj.find( "#"+arcIds+"_"+(i+1))
                    .css({
                        "y":ry+rh,
                        "height":0
                    })
                    .delay(delay)
                    .animate({
                        "y":ry,
                        "height":rh
                    },(rh*5),
                    "linear",
                    function(){
                        obj.find(" .text_top."+$(this).attr("id")).css("opacity",1);
                    });
                ry_clone += rh;
                delay += (rh)*5;
            }

            var rw_t = (((w-30)/str.data.length) / 2);
                rw_t = (rw_t > 100) ? 100:rw_t;
            var rx_t = (((w-30 - 80)/str.data.length) * t)+(rw_t/2)+(verticalW/2)+50;

            var r = obj.find(" #"+arcIds+"_1")[0].getBBox();
            var tx = obj.find(" .text_bottom."+arcIds+"_1")[0].getBBox();
            var tx_x = (rx_t+(rw_t/2))-(tx.width/2);
            obj.find(" .text_bottom."+arcIds+"_1").attr("x",tx_x);

            //tipbox
            var tipbox = 'tipbox_'+(t+1);
            var tb0 = obj.find(" ."+tipbox)[0].getBBox();
            var tb_x = (rx + (r.width) + 10);
            if((tb_x + tb0.width) > w){
                // tb_x = (rx - tb0.width - 10);
                tb_x = tb_x - tb0.width - (((w-30)/str.data.length) / 2) - 20;
            }
            var tb_y = r.y-5;

            obj.find(" ."+tipbox).attr("x",tb_x).attr("y",tb_y).hide();
            obj.find(" ."+tipbox+'_1').attr("x",(tb_x+15)).attr("y",(tb_y+20)).hide();

            for(var i=0; i<str.data[t].data.length; i++){
                tb_y += 55;
                obj.find(" ."+tipbox+'_4_'+(i+1)).attr("x",(tb_x+15)).attr("y",tb_y).hide();
                obj.find(" ."+tipbox+'_5_'+(i+1)).attr("x",(tb_x+15+119)).attr("y",tb_y).hide();
            }
            
        }

        //아래 텍스트 변형
        var maxWidth = 0;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1)+'_1';
            var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

            maxWidth += textW;
        }
        if(maxWidth > w){
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1)+'_1';
                var textObj = obj.find(" .text_bottom."+arcIds);
                var boxObj = obj.find(" #"+arcIds);
                textObj.attr({"font-size":"10"});

                var text_w = (((w-30)/str.data.length) / 2);
                    text_w = (text_w > 100) ? 100:text_w;
                var text_x = (((w-30 - 80)/str.data.length) * t)+(text_w)+(verticalW/2)+50 - textObj[0].getBBox().width;
                var text_y = h + verticalH - (textObj[0].getBBox().height * 2) - 20;
                textObj.attr({
                    "x":text_x,
                    "y":text_y
                });
                textObj.attr({
                    "transform":"translate(0,"+(textObj[0].getBBox().height)+") rotate(-45, "+(text_x + textObj[0].getBBox().width)+","+(text_y - textObj[0].getBBox().height)+")"
                });
            }
        }

        
        this.resize(obj,str,b,a);
    },
    //직선
    line:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        var a = ra[0];//비율 가로
        var b = ra[1];//비율 세로
        h = (b*w)/a;

        //set
        var maxH = maxH_clone = 0;
        var verticalH = 100;
        var verticalW = 40;
        h = h-verticalH;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+(h+verticalH)+'" viewbox="0 0 '+w+' '+(h+verticalH)+'">';
        if(str.fig === "%"){
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone += Number(str.data[t].data[i]);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        } else {
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone = Math.max(Number(str.data[t].data[i]),maxH_clone);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        }
        
        if(maxH == 0) maxH = 2000;
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;
        var maxH_save = maxH;

        //bg
        var tVal = 5;
        var y1 = (h * (2 / (tVal*2)));
        for(var t=0; t<tVal; t++){
            var lineVal = (maxH-((maxH/tVal)*(t+1)));
                lineVal = parseInt(lineVal);
            if(t==0){
                lineVal = maxH;
                lineVal = parseInt(lineVal);
                svgs += '<g fill="#6A707E">';
                svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+(verticalH/2)+'" stroke-width="0.5" stroke="#ddd" />';
                svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+(verticalH/2)+'">';
                if(str.fig === "%") svgs += '100%';
                else svgs += maxH;
                svgs += '</text>';
                svgs += '</g>';
            }
            lineVal = (maxH-((maxH/tVal)*(t+1)));
            lineVal = parseInt(lineVal);
            svgs += '<g fill="#6A707E">';
            svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.5" stroke="#ddd" id="bg_line_'+(t+1)+'" />';
            svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+((y1*(t+1))+(verticalH/2))+'">';
            if(str.fig === "%"){
                var dan = ((((t+1) * Math.floor(100/(tVal))) - 100) * -1);
                    dan = (t===tVal-1) ? 0:dan;
                svgs += dan+'%';
            }
            else svgs += Math.ceil(maxH - (maxH * (0.2 * (t+1))));
            svgs += '</text>';
            svgs += '</g>';
        }

        //단위
        svgs += '<text font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">[단위:'+str.dan+']</text>';

        //색구분
        if(str.tip === "Y"){
            for(var t=0; t<str.item.length; t++){
                svgs += '<rect id="colorText_'+(t+1)+'_box" rx="2" ry="2" fill="'+str.color[t]+'"></rect>';
                svgs += '<text id="colorText_'+(t+1)+'" font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">'+str.item[t]+'</text>';
            }
        }
        

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var fills =  str.color[0];

            //막대
            for(var i=0; i<str.data[t].data.length; i++){
                svgs += '<rect id="'+arcIds+'_'+(i+1)+'" class="'+cls+'_'+(i+1)+' bong line" stroke="#fff" stroke-width="2" rx="2" ry="2" fill="'+str.color[i]+'"></rect>';
            }
            
            
            //하단 텍스트
            svgs += '<text font-size="14" x="0" y="'+(h+(verticalH/2)+30)+'" fill="#444" class="text_bottom '+arcIds+'_1 '+cls+'_1">'+str.data[t].title+'</text>';
        }

        // line
        for(var t=0; t<str.data[0].data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            svgs += '<polyline points="" stroke-width="1" fill="none" stroke="'+str.color[t]+'" class="draw_line '+arcIds+'" />';
        }

        //가이드선
        svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((h+verticalH)/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((h+verticalH)/2)+'" stroke-width="0.5" stroke="#ff0000" id="guide_x" />';
        svgs += '<line x1="'+((w+40)/2)+'" y1="'+(verticalH/2)+'" x2="'+((w+40)/2)+'" y2="'+(h+(verticalH/2))+'" stroke-width="0.5" stroke="#ff0000" id="guide_y" />';

        

        //tooltip
        var hs = (str.data[0].data.length > 1) ? (55+(22*str.data[0].data.length)):72;
        var offsetVal = 40/hs*100;
        svgs += '<linearGradient id="'+str.id+'_MyGradient" gradientTransform="rotate(90)"><stop offset="'+offsetVal+'%" stop-color="#EFF4FF" /><stop offset="'+offsetVal+'%" stop-color="#fff" /><stop offset="100%" stop-color="#fff" /></linearGradient>';

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var arcIdsTip = 'tipbox_'+(t+1);

            svgs += '<rect x="0" y="0" class="'+arcIdsTip+' '+arcIds+' line" id="'+arcIds+'_box" fill="url(#'+str.id+'_MyGradient)" rx="6" ry="6" width="149px" height="'+hs+'px" stroke-width="1" stroke="#F0F0F0" fill="#ddd"></rect>';
            svgs += '<text x="'+(15)+'" y="20" class="'+arcIdsTip+'_1 '+arcIds+' line text1" id="'+arcIds+'_box_1" font-size="14" fill="#222">'+str.day+'</text>';
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                per = per.toFixed(1);
                per = per.replace(".0","");
                
                svgs += '<text x="'+(15)+'" y="55" class="'+arcIdsTip+'_4_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_2" font-size="14" fill="#666">'+str.item[i]+'</text>';
                svgs += '<text x="'+(15 + 119)+'" y="55" class="'+arcIdsTip+'_5_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_3" text-anchor="end" font-size="14" fill="'+str.color[i]+'">'
                if(str.fig === "%") svgs += per+'%';
                else svgs += commas(Number(str.data[t].data[i]));
                svgs += '</text>';
            }
        }

        svgs += '</svg>';
        obj.append(svgs);


        //view
        obj.find(" [id*='guide_']").hide();
        obj.find(">svg").on("mousemove",function(e){
            // var p = e.offsetY / $(this).height() * 100;
            //     p = (((400+verticalH) / 100) * p) - (((hs / 100) * p) * 1.5) - ($(this).find(" [class*='tipbox_']").height() / 2);
            var pers_x = e.offsetX/Number(obj.find(">svg").attr("width"))*100;
            var pers_y = e.offsetY/Number(obj.find(">svg").attr("height"))*100;
            var h = (b*w)/a;
                e.offsetX = w*(pers_x*0.01);
                e.offsetY = h*(pers_y*0.01);

            var p = e.offsetY - (hs);
                p = (p<0) ? 0:p;
            
            $(this).find(" [class*='tipbox_']").attr("y",p);
            $(this).find(" [class*='tipbox_'].text1").attr("y",p+25);
            for(var i=0; i<str.item.length; i++){
                $(this).find(" [class*='tipbox_'].text2_"+(i+1)).attr("y",p+63+(22*i));
            }
            var guide_x = ((w-(verticalW/2))>e.offsetX) ? e.offsetX:(w-(verticalW/2));
                guide_x = (((verticalW/2)+40)>guide_x) ? ((verticalW/2)+40):guide_x;
            var guide_y = ((h-(verticalH/2))>e.offsetY) ? e.offsetY:h-(verticalH/2);
                guide_y = ((verticalH/2)>guide_y) ? (verticalH/2):guide_y;
            obj.find(" [id*='guide_']").show();
            obj.find(" #guide_y").attr({
                "x1":guide_x+1,
                "x2":guide_x+1
            });
            obj.find(" #guide_x").attr({
                "y1":guide_y+1,
                "y2":guide_y+1
            });
        });
        obj.find(">svg").on("mouseleave",function(e){
            obj.find(" [id*='guide_']").hide();
        });
        obj.find(" .line").on("mouseenter",function(){
            var str = $(this).attr("id").split("_");
                str = str[0]+"_"+str[1]+"_"+str[2];
            obj.find(" [class*='tipbox_']").hide();
            obj.find(" ."+str).show();
            // obj.find(" #"+str+".bong.line").css("fill-opacity","1");
        });
        obj.find(" .line").on("mouseout",function(){
            // obj.find(" .bong.line").css("fill-opacity","0.4");
            obj.find(" [class*='tipbox_']").hide();
        });

        //색구분
        if(str.tip === "Y"){
            var colorText_x = (w-(verticalW/2));
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();
                var tColorBox = obj.find(" #colorText_"+(t+1)+"_box")[0].getBBox();

                colorText_x -= tColor.width;
                obj.find(" #colorText_"+(t+1)).attr({
                    "x":colorText_x,
                    "y":20
                });
                colorText_x -= tColor.height+5;
                obj.find(" #colorText_"+(t+1)+"_box").attr({
                    "x":colorText_x,
                    "y":20-(tColor.height*0.8),
                    "width":tColor.height,
                    "height":tColor.height
                });
                colorText_x -= 10;
            }
        }
        
        var q = 6;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var points = "";
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                if(isNaN(per)) per = 0;
                if(per > 100) per = 100;
                if(per < 0) per = 0;

                var rw = (((w-30)/str.data.length) / 2);
                    rw = (rw > 100) ? 100:rw;
                var rh = (h * (per*0.01));
                
                var rx = (((w-30 - 80)/str.data.length) * t)+(rw/2)+(verticalW/2)+50;
                var ry = (h * ((100 - per)*0.01))+(verticalH/2);

                    rx = rx+(rw/2)-(q/2);
                    ry = ry-(q/2);

                obj.find(" #"+arcIds+"_"+(i+1)).attr("x",rx);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("y",ry);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("width",q);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("height",q);
            }

            var rw_t = (((w-30)/str.data.length) / 2);
                rw_t = (rw_t > 100) ? 100:rw_t;
            var rx_t = (((w-30 - 80)/str.data.length) * t)+(rw_t/2)+(verticalW/2)+50;

            var r = obj.find(" #"+arcIds+"_1")[0].getBBox();
            var tx = obj.find(" .text_bottom."+arcIds+"_1")[0].getBBox();
            var tx_x = (rx_t+(rw_t/2))-(tx.width/2);
            obj.find(" .text_bottom."+arcIds+"_1").attr("x",tx_x);

            //tipbox
            var tipbox = 'tipbox_'+(t+1);
            var tb0 = obj.find(" ."+tipbox)[0].getBBox();
            var tb_x = (rx+(rw/2)+q);
            if((tb_x + tb0.width) > w){
                // tb_x = (rx - tb0.width - 10);
                tb_x = (rx+(rw/2)-q-tb0.width);
            }
            var tb_y = r.y-5;

            obj.find(" ."+tipbox).attr("x",tb_x).attr("y",tb_y).hide();
            obj.find(" ."+tipbox+'_1').attr("x",(tb_x+15)).attr("y",(tb_y+20)).hide();

            for(var i=0; i<str.data[t].data.length; i++){
                tb_y += 55;
                obj.find(" ."+tipbox+'_4_'+(i+1)).attr("x",(tb_x+15)).attr("y",tb_y).hide();
                obj.find(" ."+tipbox+'_5_'+(i+1)).attr("x",(tb_x+15+119)).attr("y",tb_y).hide();
            }            
        }

        //draw_line
        for(var t=0; t<str.data[0].data.length; t++){
            //draw_line
            var arcIds = str.id+'_'+(t+1);
            var points = "";
            for(var i=0; i<str.data.length; i++){
                var arcIds_clone = str.id+'_'+(i+1)+'_'+(t+1);
                var bx = obj.find( "#"+arcIds_clone)[0].getBBox();
                
                if(i===0){
                    points += ((verticalW/2) + 40)+","+(bx.y+(q/2))+" ";
                }
                points += (bx.x+(q/2))+","+(bx.y+(q/2))+" ";
                if(i===str.data.length-1){
                    points += (w-(verticalW/2))+","+(bx.y+(q/2))+" ";
                }
            }

            obj.find(" .draw_line."+arcIds).attr("points",points);
            obj.find(" .draw_line."+arcIds).css({"opacity":1,"stroke-dasharray":"2000px","stroke-dashoffset":"2000px"});
            obj.find(" .draw_line."+arcIds)
                .delay(t*300)
                .animate({
                    "opacity":1,
                    "stroke-dashoffset":0+"px"
                },(obj.width()*4)
            );
        }
        

        //아래 텍스트 변형
        var maxWidth = 0;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1)+'_1';
            var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

            maxWidth += textW;
        }
        if(maxWidth > w){
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1)+'_1';
                var textObj = obj.find(" .text_bottom."+arcIds);
                var boxObj = obj.find(" #"+arcIds);
                textObj.attr({"font-size":"10"});

                var text_w = (((w-30)/str.data.length) / 2);
                    text_w = (text_w > 100) ? 100:text_w;
                var text_x = (((w-30 - 80)/str.data.length) * t)+(text_w)+(verticalW/2)+50 - textObj[0].getBBox().width;
                var text_y = h + verticalH - (textObj[0].getBBox().height * 2) - 20;
                textObj.attr({
                    "x":text_x,
                    "y":text_y
                });
                textObj.attr({
                    "transform":"translate(0,"+(textObj[0].getBBox().height)+") rotate(-45, "+(text_x + textObj[0].getBBox().width)+","+(text_y - textObj[0].getBBox().height)+")"
                });
            }
        }

        
        this.resize(obj,str,b,a);
    },
    //직선-색채움
    lineColor:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        var a = ra[0];//비율 가로
        var b = ra[1];//비율 세로
        h = (b*w)/a;

        //set
        var maxH = maxH_clone = 0;
        var verticalH = 100;
        var verticalW = 40;
        h = h-verticalH;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+(h+verticalH)+'" viewbox="0 0 '+w+' '+(h+verticalH)+'">';
        if(str.fig === "%"){
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone += Number(str.data[t].data[i]);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        } else {
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone = Math.max(Number(str.data[t].data[i]),maxH_clone);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        }
        
        if(maxH == 0) maxH = 2000;
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;
        var maxH_save = maxH;

        //bg
        var tVal = 5;
        var y1 = (h * (2 / (tVal*2)));
        for(var t=0; t<tVal; t++){
            var lineVal = (maxH-((maxH/tVal)*(t+1)));
                lineVal = parseInt(lineVal);
            if(t==0){
                lineVal = maxH;
                lineVal = parseInt(lineVal);
                svgs += '<g fill="#6A707E">';
                svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+(verticalH/2)+'" stroke-width="0.5" stroke="#ddd" />';
                svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+(verticalH/2)+'">';
                if(str.fig === "%") svgs += '100%';
                else svgs += maxH;
                svgs += '</text>';
                svgs += '</g>';
            }
            lineVal = (maxH-((maxH/tVal)*(t+1)));
            lineVal = parseInt(lineVal);
            svgs += '<g fill="#6A707E">';
            svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.5" stroke="#ddd" id="bg_line_'+(t+1)+'" />';
            svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+((y1*(t+1))+(verticalH/2))+'">';
            if(str.fig === "%"){
                var dan = ((((t+1) * Math.floor(100/(tVal))) - 100) * -1);
                    dan = (t===tVal-1) ? 0:dan;
                svgs += dan+'%';
            }
            else svgs += Math.ceil(maxH - (maxH * (0.2 * (t+1))));
            svgs += '</text>';
            svgs += '</g>';
        }

        //단위
        svgs += '<text font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">[단위:'+str.dan+']</text>';

        //색구분
        if(str.tip === "Y"){
            for(var t=0; t<str.item.length; t++){
                svgs += '<rect id="colorText_'+(t+1)+'_box" rx="2" ry="2" fill="'+str.color[t]+'" opacity="0.3"></rect>';
                svgs += '<text id="colorText_'+(t+1)+'" font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">'+str.item[t]+'</text>';
            }
        }
        

        // line
        for(var t=0; t<str.data[0].data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            svgs += '<polygon points="" stroke-width="1" fill="'+str.color[t]+'" opacity="0.3" class="draw_line '+arcIds+'" />';
        }

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var fills =  str.color[0];

            //막대
            for(var i=0; i<str.data[t].data.length; i++){
                svgs += '<rect id="'+arcIds+'_'+(i+1)+'" class="'+cls+'_'+(i+1)+' bong line" stroke="#fff" stroke-width="2" rx="2" ry="2" fill="'+str.color[i]+'"></rect>';
            }
            
            
            //하단 텍스트
            svgs += '<text font-size="14" x="0" y="'+(h+(verticalH/2)+30)+'" fill="#444" class="text_bottom '+arcIds+'_1 '+cls+'_1">'+str.data[t].title+'</text>';
        }

        //가이드선
        svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((h+verticalH)/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((h+verticalH)/2)+'" stroke-width="0.5" stroke="#ff0000" id="guide_x" />';
        svgs += '<line x1="'+((w+40)/2)+'" y1="'+(verticalH/2)+'" x2="'+((w+40)/2)+'" y2="'+(h+(verticalH/2))+'" stroke-width="0.5" stroke="#ff0000" id="guide_y" />';

        

        //tooltip
        var hs = (str.data[0].data.length > 1) ? (55+(22*str.data[0].data.length)):72;
        var offsetVal = 40/hs*100;
        svgs += '<linearGradient id="'+str.id+'_MyGradient" gradientTransform="rotate(90)"><stop offset="'+offsetVal+'%" stop-color="#EFF4FF" /><stop offset="'+offsetVal+'%" stop-color="#fff" /><stop offset="100%" stop-color="#fff" /></linearGradient>';

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var arcIdsTip = 'tipbox_'+(t+1);

            svgs += '<rect x="0" y="0" class="'+arcIdsTip+' '+arcIds+' line" id="'+arcIds+'_box" fill="url(#'+str.id+'_MyGradient)" rx="6" ry="6" width="149px" height="'+hs+'px" stroke-width="1" stroke="#F0F0F0" fill="#ddd"></rect>';
            svgs += '<text x="'+(15)+'" y="20" class="'+arcIdsTip+'_1 '+arcIds+' line text1" id="'+arcIds+'_box_1" font-size="14" fill="#222">'+str.day+'</text>';
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                per = per.toFixed(1);
                per = per.replace(".0","");
                
                svgs += '<text x="'+(15)+'" y="55" class="'+arcIdsTip+'_4_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_2" font-size="14" fill="#666">'+str.item[i]+'</text>';
                svgs += '<text x="'+(15 + 119)+'" y="55" class="'+arcIdsTip+'_5_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_3" text-anchor="end" font-size="14" fill="'+str.color[i]+'">'
                if(str.fig === "%") svgs += per+'%';
                else svgs += commas(Number(str.data[t].data[i]));
                svgs += '</text>';
            }
        }

        svgs += '</svg>';
        obj.append(svgs);


        //view
        obj.find(" [id*='guide_']").hide();
        obj.find(">svg").on("mousemove",function(e){
            // var p = e.offsetY / $(this).height() * 100;
            //     p = (((400+verticalH) / 100) * p) - (((hs / 100) * p) * 1.5) - ($(this).find(" [class*='tipbox_']").height() / 2);
            var pers_x = e.offsetX/Number(obj.find(">svg").attr("width"))*100;
            var pers_y = e.offsetY/Number(obj.find(">svg").attr("height"))*100;
            var h = (b*w)/a;
                e.offsetX = w*(pers_x*0.01);
                e.offsetY = h*(pers_y*0.01);

            var p = e.offsetY - (hs);
                p = (p<0) ? 0:p;
            
            $(this).find(" [class*='tipbox_']").attr("y",p);
            $(this).find(" [class*='tipbox_'].text1").attr("y",p+25);
            for(var i=0; i<str.item.length; i++){
                $(this).find(" [class*='tipbox_'].text2_"+(i+1)).attr("y",p+63+(22*i));
            }
            var guide_x = ((w-(verticalW/2))>e.offsetX) ? e.offsetX:(w-(verticalW/2));
                guide_x = (((verticalW/2)+40)>guide_x) ? ((verticalW/2)+40):guide_x;
            var guide_y = ((h-(verticalH/2))>e.offsetY) ? e.offsetY:h-(verticalH/2);
                guide_y = ((verticalH/2)>guide_y) ? (verticalH/2):guide_y;
            obj.find(" [id*='guide_']").show();
            obj.find(" #guide_y").attr({
                "x1":guide_x+1,
                "x2":guide_x+1
            });
            obj.find(" #guide_x").attr({
                "y1":guide_y+1,
                "y2":guide_y+1
            });
        });
        obj.find(">svg").on("mouseleave",function(e){
            obj.find(" [id*='guide_']").hide();
        });
        obj.find(" .line").on("mouseenter",function(){
            var str = $(this).attr("id").split("_");
                str = str[0]+"_"+str[1]+"_"+str[2];
            obj.find(" [class*='tipbox_']").hide();
            obj.find(" ."+str).show();
            // obj.find(" #"+str+".bong.line").css("fill-opacity","1");
        });
        obj.find(" .line").on("mouseout",function(){
            // obj.find(" .bong.line").css("fill-opacity","0.4");
            obj.find(" [class*='tipbox_']").hide();
        });

        //색구분
        if(str.tip === "Y"){
            var colorText_x = (w-(verticalW/2));
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();
                var tColorBox = obj.find(" #colorText_"+(t+1)+"_box")[0].getBBox();

                colorText_x -= tColor.width;
                obj.find(" #colorText_"+(t+1)).attr({
                    "x":colorText_x,
                    "y":20
                });
                colorText_x -= tColor.height+5;
                obj.find(" #colorText_"+(t+1)+"_box").attr({
                    "x":colorText_x,
                    "y":20-(tColor.height*0.8),
                    "width":tColor.height,
                    "height":tColor.height
                });
                colorText_x -= 10;
            }
        }
        
        var q = 6;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var points = "";
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                if(isNaN(per)) per = 0;
                if(per > 100) per = 100;
                if(per < 0) per = 0;

                var rw = (((w-30)/str.data.length) / 2);
                    rw = (rw > 100) ? 100:rw;
                var rh = (h * (per*0.01));
                
                var rx = (((w-30 - 80)/str.data.length) * t)+(rw/2)+(verticalW/2)+50;
                var ry = (h * ((100 - per)*0.01))+(verticalH/2);

                    rx = rx+(rw/2)-(q/2);
                    ry = ry-(q/2);

                obj.find(" #"+arcIds+"_"+(i+1)).attr("x",rx);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("y",ry);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("width",q);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("height",q);
            }

            var rw_t = (((w-30)/str.data.length) / 2);
                rw_t = (rw_t > 100) ? 100:rw_t;
            var rx_t = (((w-30 - 80)/str.data.length) * t)+(rw_t/2)+(verticalW/2)+50;

            var r = obj.find(" #"+arcIds+"_1")[0].getBBox();
            var tx = obj.find(" .text_bottom."+arcIds+"_1")[0].getBBox();
            var tx_x = (rx_t+(rw_t/2))-(tx.width/2);
            obj.find(" .text_bottom."+arcIds+"_1").attr("x",tx_x);

            //tipbox
            var tipbox = 'tipbox_'+(t+1);
            var tb0 = obj.find(" ."+tipbox)[0].getBBox();
            var tb_x = (rx+(rw/2)+q);
            if((tb_x + tb0.width) > w){
                // tb_x = (rx - tb0.width - 10);
                tb_x = (rx+(rw/2)-q-tb0.width);
            }
            var tb_y = r.y-5;

            obj.find(" ."+tipbox).attr("x",tb_x).attr("y",tb_y).hide();
            obj.find(" ."+tipbox+'_1').attr("x",(tb_x+15)).attr("y",(tb_y+20)).hide();

            for(var i=0; i<str.data[t].data.length; i++){
                tb_y += 55;
                obj.find(" ."+tipbox+'_4_'+(i+1)).attr("x",(tb_x+15)).attr("y",tb_y).hide();
                obj.find(" ."+tipbox+'_5_'+(i+1)).attr("x",(tb_x+15+119)).attr("y",tb_y).hide();
            }            
        }

        //draw_line
        for(var t=0; t<str.data[0].data.length; t++){
            //draw_line
            var arcIds = str.id+'_'+(t+1);
            var points = "";
            for(var i=0; i<str.data.length; i++){
                var arcIds_clone = str.id+'_'+(i+1)+'_'+(t+1);
                var bx = obj.find( "#"+arcIds_clone)[0].getBBox();
                
                if(i===0){
                    points += ((verticalW/2) + 40)+","+(h+(verticalH/2))+" ";
                    points += ((verticalW/2) + 40)+","+(bx.y+(q/2))+" ";
                }
                points += (bx.x+(q/2))+","+(bx.y+(q/2))+" ";
                if(i===str.data.length-1){
                    points += (w-(verticalW/2))+","+(bx.y+(q/2))+" ";
                    points += (w-(verticalW/2))+","+(h+(verticalH/2))+" ";
                    points += ((verticalW/2) + 40)+","+(h+(verticalH/2))+" ";
                }
            }

            obj.find(" .draw_line."+arcIds).attr("points",points);
            // obj.find(" .draw_line."+arcIds).css({"opacity":1,"stroke-dasharray":"2000px","stroke-dashoffset":"2000px"});
            // obj.find(" .draw_line."+arcIds)
            //     .delay(t*300)
            //     .animate({
            //         "opacity":1,
            //         "stroke-dashoffset":0+"px"
            //     },(obj.width()*4)
            // );
        }
        

        //아래 텍스트 변형
        var maxWidth = 0;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1)+'_1';
            var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

            maxWidth += textW;
        }
        if(maxWidth > w){
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1)+'_1';
                var textObj = obj.find(" .text_bottom."+arcIds);
                var boxObj = obj.find(" #"+arcIds);
                textObj.attr({"font-size":"10"});

                var text_w = (((w-30)/str.data.length) / 2);
                    text_w = (text_w > 100) ? 100:text_w;
                var text_x = (((w-30 - 80)/str.data.length) * t)+(text_w)+(verticalW/2)+50 - textObj[0].getBBox().width;
                var text_y = h + verticalH - (textObj[0].getBBox().height * 2) - 20;
                textObj.attr({
                    "x":text_x,
                    "y":text_y
                });
                textObj.attr({
                    "transform":"translate(0,"+(textObj[0].getBBox().height)+") rotate(-45, "+(text_x + textObj[0].getBBox().width)+","+(text_y - textObj[0].getBBox().height)+")"
                });
            }
        }

        
        this.resize(obj,str,b,a);
    },
    //곡선
    radius:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        var a = ra[0];//비율 가로
        var b = ra[1];//비율 세로
        h = (b*w)/a;

        //set
        var maxH = maxH_clone = 0;
        var verticalH = 100;
        var verticalW = 40;
        h = h-verticalH;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+(h+verticalH)+'" viewbox="0 0 '+w+' '+(h+verticalH)+'">';
        if(str.fig === "%"){
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone += Number(str.data[t].data[i]);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        } else {
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone = Math.max(Number(str.data[t].data[i]),maxH_clone);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        }
        
        if(maxH == 0) maxH = 2000;
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;
        var maxH_save = maxH;

        //bg
        var tVal = 5;
        var y1 = (h * (2 / (tVal*2)));
        for(var t=0; t<tVal; t++){
            var lineVal = (maxH-((maxH/tVal)*(t+1)));
                lineVal = parseInt(lineVal);
            if(t==0){
                lineVal = maxH;
                lineVal = parseInt(lineVal);
                svgs += '<g fill="#6A707E">';
                svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+(verticalH/2)+'" stroke-width="0.5" stroke="#ddd" />';
                svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+(verticalH/2)+'">';
                if(str.fig === "%") svgs += '100%';
                else svgs += maxH;
                svgs += '</text>';
                svgs += '</g>';
            }
            lineVal = (maxH-((maxH/tVal)*(t+1)));
            lineVal = parseInt(lineVal);
            svgs += '<g fill="#6A707E">';
            svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.5" stroke="#ddd" id="bg_line_'+(t+1)+'" />';
            svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+((y1*(t+1))+(verticalH/2))+'">';
            if(str.fig === "%"){
                var dan = ((((t+1) * Math.floor(100/(tVal))) - 100) * -1);
                    dan = (t===tVal-1) ? 0:dan;
                svgs += dan+'%';
            }
            else svgs += Math.ceil(maxH - (maxH * (0.2 * (t+1))));
            svgs += '</text>';
            svgs += '</g>';
        }

        //단위
        svgs += '<text font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">[단위:'+str.dan+']</text>';

        //색구분
        if(str.tip === "Y"){
            for(var t=0; t<str.item.length; t++){
                svgs += '<rect id="colorText_'+(t+1)+'_box" rx="2" ry="2" fill="'+str.color[t]+'"></rect>';
                svgs += '<text id="colorText_'+(t+1)+'" font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">'+str.item[t]+'</text>';
            }
        }
        

        // line
        for(var t=0; t<str.data[0].data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            svgs += '<path d="" stroke-width="1" fill="none" stroke="'+str.color[t]+'" class="draw_line '+arcIds+'" />';
        }

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var fills =  str.color[0];

            //막대
            for(var i=0; i<str.data[t].data.length; i++){
                svgs += '<rect id="'+arcIds+'_'+(i+1)+'" class="'+cls+'_'+(i+1)+' bong line" stroke="#fff" stroke-width="2" rx="2" ry="2" fill="'+str.color[i]+'"></rect>';
            }
            
            
            //하단 텍스트
            svgs += '<text font-size="14" x="0" y="'+(h+(verticalH/2)+30)+'" fill="#444" class="text_bottom '+arcIds+'_1 '+cls+'_1">'+str.data[t].title+'</text>';
        }
        
        //가이드선
        svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((h+verticalH)/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((h+verticalH)/2)+'" stroke-width="0.5" stroke="#ff0000" id="guide_x" />';
        svgs += '<line x1="'+((w+40)/2)+'" y1="'+(verticalH/2)+'" x2="'+((w+40)/2)+'" y2="'+(h+(verticalH/2))+'" stroke-width="0.5" stroke="#ff0000" id="guide_y" />';


        //tooltip
        var hs = (str.data[0].data.length > 1) ? (55+(22*str.data[0].data.length)):72;
        var offsetVal = 40/hs*100;
        svgs += '<linearGradient id="'+str.id+'_MyGradient" gradientTransform="rotate(90)"><stop offset="'+offsetVal+'%" stop-color="#EFF4FF" /><stop offset="'+offsetVal+'%" stop-color="#fff" /><stop offset="100%" stop-color="#fff" /></linearGradient>';

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var arcIdsTip = 'tipbox_'+(t+1);

            svgs += '<rect x="0" y="0" class="'+arcIdsTip+' '+arcIds+' line" id="'+arcIds+'_box" fill="url(#'+str.id+'_MyGradient)" rx="6" ry="6" width="149px" height="'+hs+'px" stroke-width="1" stroke="#F0F0F0" fill="#ddd"></rect>';
            svgs += '<text x="'+(15)+'" y="20" class="'+arcIdsTip+'_1 '+arcIds+' line text1" id="'+arcIds+'_box_1" font-size="14" fill="#222">'+str.day+'</text>';
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                per = per.toFixed(1);
                per = per.replace(".0","");
                
                svgs += '<text x="'+(15)+'" y="55" class="'+arcIdsTip+'_4_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_2" font-size="14" fill="#666">'+str.item[i]+'</text>';
                svgs += '<text x="'+(15 + 119)+'" y="55" class="'+arcIdsTip+'_5_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_3" text-anchor="end" font-size="14" fill="'+str.color[i]+'">'
                if(str.fig === "%") svgs += per+'%';
                else svgs += commas(Number(str.data[t].data[i]));
                svgs += '</text>';
            }
        }

        svgs += '</svg>';
        obj.append(svgs);


        //view
        obj.find(" [id*='guide_']").hide();
        obj.find(">svg").on("mousemove",function(e){
            // var p = e.offsetY / $(this).height() * 100;
            //     p = (((400+verticalH) / 100) * p) - (((hs / 100) * p) * 1.5) - ($(this).find(" [class*='tipbox_']").height() / 2);
            var pers_x = e.offsetX/Number(obj.find(">svg").attr("width"))*100;
            var pers_y = e.offsetY/Number(obj.find(">svg").attr("height"))*100;
            var h = (b*w)/a;
                e.offsetX = w*(pers_x*0.01);
                e.offsetY = h*(pers_y*0.01);

            var p = e.offsetY - (hs);
                p = (p<0) ? 0:p;
            
            $(this).find(" [class*='tipbox_']").attr("y",p);
            $(this).find(" [class*='tipbox_'].text1").attr("y",p+25);
            for(var i=0; i<str.item.length; i++){
                $(this).find(" [class*='tipbox_'].text2_"+(i+1)).attr("y",p+63+(22*i));
            }
            var guide_x = ((w-(verticalW/2))>e.offsetX) ? e.offsetX:(w-(verticalW/2));
                guide_x = (((verticalW/2)+40)>guide_x) ? ((verticalW/2)+40):guide_x;
            var guide_y = ((h-(verticalH/2))>e.offsetY) ? e.offsetY:h-(verticalH/2);
                guide_y = ((verticalH/2)>guide_y) ? (verticalH/2):guide_y;
            obj.find(" [id*='guide_']").show();
            obj.find(" #guide_y").attr({
                "x1":guide_x+1,
                "x2":guide_x+1
            });
            obj.find(" #guide_x").attr({
                "y1":guide_y+1,
                "y2":guide_y+1
            });
        });
        obj.find(">svg").on("mouseleave",function(e){
            obj.find(" [id*='guide_']").hide();
        });
        obj.find(" .line").on("mouseenter",function(){
            var str = $(this).attr("id").split("_");
                str = str[0]+"_"+str[1]+"_"+str[2];
            obj.find(" [class*='tipbox_']").hide();
            obj.find(" ."+str).show();
            // obj.find(" #"+str+".bong.line").css("fill-opacity","1");
        });
        obj.find(" .line").on("mouseout",function(){
            // obj.find(" .bong.line").css("fill-opacity","0.4");
            obj.find(" [class*='tipbox_']").hide();
        });

        //색구분
        if(str.tip === "Y"){
            var colorText_x = (w-(verticalW/2));
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();
                var tColorBox = obj.find(" #colorText_"+(t+1)+"_box")[0].getBBox();

                colorText_x -= tColor.width;
                obj.find(" #colorText_"+(t+1)).attr({
                    "x":colorText_x,
                    "y":20
                });
                colorText_x -= tColor.height+5;
                obj.find(" #colorText_"+(t+1)+"_box").attr({
                    "x":colorText_x,
                    "y":20-(tColor.height*0.8),
                    "width":tColor.height,
                    "height":tColor.height
                });
                colorText_x -= 10;
            }
        }
        
        var q = 6;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var points = "";
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                if(isNaN(per)) per = 0;
                if(per > 100) per = 100;
                if(per < 0) per = 0;

                var rw = (((w-30)/str.data.length) / 2);
                    rw = (rw > 100) ? 100:rw;
                var rh = (h * (per*0.01));
                
                var rx = (((w-30 - 80)/str.data.length) * t)+(rw/2)+(verticalW/2)+50;
                var ry = (h * ((100 - per)*0.01))+(verticalH/2);

                    rx = rx+(rw/2)-(q/2);
                    ry = ry-(q/2);

                obj.find(" #"+arcIds+"_"+(i+1)).attr("x",rx);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("y",ry);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("width",q);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("height",q);
            }

            var rw_t = (((w-30)/str.data.length) / 2);
                rw_t = (rw_t > 100) ? 100:rw_t;
            var rx_t = (((w-30 - 80)/str.data.length) * t)+(rw_t/2)+(verticalW/2)+50;

            var r = obj.find(" #"+arcIds+"_1")[0].getBBox();
            var tx = obj.find(" .text_bottom."+arcIds+"_1")[0].getBBox();
            var tx_x = (rx_t+(rw_t/2))-(tx.width/2);
            obj.find(" .text_bottom."+arcIds+"_1").attr("x",tx_x);

            //tipbox
            var tipbox = 'tipbox_'+(t+1);
            var tb0 = obj.find(" ."+tipbox)[0].getBBox();
            var tb_x = (rx+(rw/2)+q);
            if((tb_x + tb0.width) > w){
                // tb_x = (rx - tb0.width - 10);
                // tb_x = (rx+(rw/2)-q-tb0.width);
                tb_x = rx - tb0.width - q;
            }
            var tb_y = r.y-5;

            obj.find(" ."+tipbox).attr("x",tb_x).attr("y",tb_y).hide();
            obj.find(" ."+tipbox+'_1').attr("x",(tb_x+15)).attr("y",(tb_y+20)).hide();

            for(var i=0; i<str.data[t].data.length; i++){
                tb_y += 55;
                obj.find(" ."+tipbox+'_4_'+(i+1)).attr("x",(tb_x+15)).attr("y",tb_y).hide();
                obj.find(" ."+tipbox+'_5_'+(i+1)).attr("x",(tb_x+15+119)).attr("y",tb_y).hide();
            }            
        }

        /*
            M현재좌표.x,현재죄표.y
            C(이전좌표x+((현재좌표x - 이전좌표x)/2)),이전좌표y  
                (이전좌표x+((현재좌표x - 이전좌표x)/2)),현재좌표y
                현재좌표x,y
            마지막
            L좌표x,y
        */
        //draw_line
        for(var t=0; t<str.data[0].data.length; t++){
            //draw_line
            var arcIds = str.id+'_'+(t+1);
            var points = "";
            for(var i=0; i<str.data.length; i++){
                var arcIds_clone = str.id+'_'+(i+1)+'_'+(t+1);
                var bx = obj.find( "#"+arcIds_clone)[0].getBBox();
                var char = "C";
                var px = (bx.x+(q/2));
                var py = (bx.y+(q/2));
                if(i!==0){
                    var arcIds_clone_prev = str.id+'_'+(i)+'_'+(t+1);
                    var bx_prev = obj.find( "#"+arcIds_clone_prev)[0].getBBox();
                    var px_prev = (bx_prev.x+(q/2));
                    var py_prev = (bx_prev.y+(q/2));
                } else {
                    var px_prev = ((verticalW/2) + 40);
                    var py_prev = py;
                    points = "M"+px_prev+","+py_prev;
                }
                points += " "+char;
                points += (px_prev+((px-px_prev)/2))+","+py_prev+" ";
                points += (px_prev+((px-px_prev)/2))+","+py+" ";
                points += px+","+py;
            }
            points += " L"+(w-(verticalW/2))+","+py;

            obj.find(" .draw_line."+arcIds).attr("d",points);
            obj.find(" .draw_line."+arcIds).css({"opacity":1,"stroke-dasharray":"2000px","stroke-dashoffset":"2000px"});
            obj.find(" .draw_line."+arcIds)
                .delay(t*300)
                .animate({
                    "opacity":1,
                    "stroke-dashoffset":0+"px"
                },(obj.width()*8),"linear"
            );
        }
        

        //아래 텍스트 변형
        var maxWidth = 0;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1)+'_1';
            var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

            maxWidth += textW;
        }
        if(maxWidth > w){
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1)+'_1';
                var textObj = obj.find(" .text_bottom."+arcIds);
                var boxObj = obj.find(" #"+arcIds);
                textObj.attr({"font-size":"10"});

                var text_w = (((w-30)/str.data.length) / 2);
                    text_w = (text_w > 100) ? 100:text_w;
                var text_x = (((w-30 - 80)/str.data.length) * t)+(text_w)+(verticalW/2)+50 - textObj[0].getBBox().width;
                var text_y = h + verticalH - (textObj[0].getBBox().height * 2) - 20;
                textObj.attr({
                    "x":text_x,
                    "y":text_y
                });
                textObj.attr({
                    "transform":"translate(0,"+(textObj[0].getBBox().height)+") rotate(-45, "+(text_x + textObj[0].getBBox().width)+","+(text_y - textObj[0].getBBox().height)+")"
                });
            }
        }

        
        this.resize(obj,str,b,a);
    },
    //곡선-색채움
    radiusColor:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        var a = ra[0];//비율 가로
        var b = ra[1];//비율 세로
        h = (b*w)/a;

        //set
        var maxH = maxH_clone = 0;
        var verticalH = 100;
        var verticalW = 40;
        h = h-verticalH;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+(h+verticalH)+'" viewbox="0 0 '+w+' '+(h+verticalH)+'">';
        if(str.fig === "%"){
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone += Number(str.data[t].data[i]);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        } else {
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone = Math.max(Number(str.data[t].data[i]),maxH_clone);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        }
        
        if(maxH == 0) maxH = 2000;
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;
        var maxH_save = maxH;

        //bg
        var tVal = 5;
        var y1 = (h * (2 / (tVal*2)));
        for(var t=0; t<tVal; t++){
            var lineVal = (maxH-((maxH/tVal)*(t+1)));
                lineVal = parseInt(lineVal);
            if(t==0){
                lineVal = maxH;
                lineVal = parseInt(lineVal);
                svgs += '<g fill="#6A707E">';
                svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+(verticalH/2)+'" stroke-width="0.5" stroke="#ddd" />';
                svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+(verticalH/2)+'">';
                if(str.fig === "%") svgs += '100%';
                else svgs += maxH;
                svgs += '</text>';
                svgs += '</g>';
            }
            lineVal = (maxH-((maxH/tVal)*(t+1)));
            lineVal = parseInt(lineVal);
            svgs += '<g fill="#6A707E">';
            svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.5" stroke="#ddd" id="bg_line_'+(t+1)+'" />';
            svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+((y1*(t+1))+(verticalH/2))+'">';
            if(str.fig === "%"){
                var dan = ((((t+1) * Math.floor(100/(tVal))) - 100) * -1);
                    dan = (t===tVal-1) ? 0:dan;
                svgs += dan+'%';
            }
            else svgs += Math.ceil(maxH - (maxH * (0.2 * (t+1))));
            svgs += '</text>';
            svgs += '</g>';
        }

        //단위
        svgs += '<text font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">[단위:'+str.dan+']</text>';

        //색구분
        if(str.tip === "Y"){
            for(var t=0; t<str.item.length; t++){
                svgs += '<rect id="colorText_'+(t+1)+'_box" rx="2" ry="2" fill="'+str.color[t]+'" opacity="0.3"></rect>';
                svgs += '<text id="colorText_'+(t+1)+'" font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">'+str.item[t]+'</text>';
            }
        }
        

        // line
        for(var t=0; t<str.data[0].data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            svgs += '<path d="" stroke-width="1" fill="'+str.color[t]+'" opacity="0.3" class="draw_line '+arcIds+'" />';
        }

        //가이드선
        svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((h+verticalH)/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((h+verticalH)/2)+'" stroke-width="0.5" stroke="#ff0000" id="guide_x" />';
        svgs += '<line x1="'+((w+40)/2)+'" y1="'+(verticalH/2)+'" x2="'+((w+40)/2)+'" y2="'+(h+(verticalH/2))+'" stroke-width="0.5" stroke="#ff0000" id="guide_y" />';
        

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var fills =  str.color[0];

            //막대
            for(var i=0; i<str.data[t].data.length; i++){
                svgs += '<rect id="'+arcIds+'_'+(i+1)+'" class="'+cls+'_'+(i+1)+' bong line" stroke="#fff" stroke-width="2" rx="2" ry="2" fill="'+str.color[i]+'"></rect>';
            }
            
            
            //하단 텍스트
            svgs += '<text font-size="14" x="0" y="'+(h+(verticalH/2)+30)+'" fill="#444" class="text_bottom '+arcIds+'_1 '+cls+'_1">'+str.data[t].title+'</text>';
        }

        

        //tooltip
        var hs = (str.data[0].data.length > 1) ? (55+(22*str.data[0].data.length)):72;
        var offsetVal = 40/hs*100;
        svgs += '<linearGradient id="'+str.id+'_MyGradient" gradientTransform="rotate(90)"><stop offset="'+offsetVal+'%" stop-color="#EFF4FF" /><stop offset="'+offsetVal+'%" stop-color="#fff" /><stop offset="100%" stop-color="#fff" /></linearGradient>';

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var arcIdsTip = 'tipbox_'+(t+1);

            svgs += '<rect x="0" y="0" class="'+arcIdsTip+' '+arcIds+' line" id="'+arcIds+'_box" fill="url(#'+str.id+'_MyGradient)" rx="6" ry="6" width="149px" height="'+hs+'px" stroke-width="1" stroke="#F0F0F0" fill="#ddd"></rect>';
            svgs += '<text x="'+(15)+'" y="25" class="'+arcIdsTip+'_1 '+arcIds+' line text1" id="'+arcIds+'_box_1" font-size="14" fill="#222">'+str.day+'</text>';
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Math.floor(Number(str.data[t].data[i]) / maxH * 100);
                
                svgs += '<text x="'+(15)+'" y="'+(63+(22*i))+'" class="'+arcIdsTip+'_4_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_2" font-size="14" fill="#666">'+str.item[i]+'</text>';
                svgs += '<text x="'+(15 + 119)+'" y="'+(63+(22*i))+'" class="'+arcIdsTip+'_5_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_3" text-anchor="end" font-size="14" fill="'+str.color[i]+'">'
                if(str.fig === "%") svgs += per+'%';
                else svgs += commas(Number(str.data[t].data[i]));
                svgs += '</text>';
            }
        }

        svgs += '</svg>';
        obj.append(svgs);


        //view
        obj.find(" [id*='guide_']").hide();
        obj.find(">svg").on("mousemove",function(e){
            // var p = e.offsetY / $(this).height() * 100;
            //     p = (((400+verticalH) / 100) * p) - (((hs / 100) * p) * 1.5) - ($(this).find(" [class*='tipbox_']").height() / 2);
            var pers_x = e.offsetX/Number(obj.find(">svg").attr("width"))*100;
            var pers_y = e.offsetY/Number(obj.find(">svg").attr("height"))*100;
            var h = (b*w)/a;
                e.offsetX = w*(pers_x*0.01);
                e.offsetY = h*(pers_y*0.01);

            var p = e.offsetY - (hs);
                p = (p<0) ? 0:p;
            
            obj.find(" [class*='tipbox_']").attr("y",p);
            obj.find(" [class*='tipbox_'].text1").attr("y",p+25);
            for(var i=0; i<str.item.length; i++){
                obj.find(" [class*='tipbox_'].text2_"+(i+1)).attr("y",p+63+(22*i));
            }
            // obj.find(" [class*='tipbox_']").show();

            var guide_x = ((w-(verticalW/2))>e.offsetX) ? e.offsetX:(w-(verticalW/2));
                guide_x = (((verticalW/2)+40)>guide_x) ? ((verticalW/2)+40):guide_x;
            var guide_y = ((h-(verticalH/2))>e.offsetY) ? e.offsetY:h-(verticalH/2);
                guide_y = ((verticalH/2)>guide_y) ? (verticalH/2):guide_y;
            obj.find(" [id*='guide_']").show();
            obj.find(" #guide_y").attr({
                "x1":guide_x+1,
                "x2":guide_x+1
            });
            obj.find(" #guide_x").attr({
                "y1":guide_y+1,
                "y2":guide_y+1
            });
        });
        obj.find(">svg").on("mouseleave",function(e){
            obj.find(" [id*='guide_']").hide();
        });
        
        obj.find(" .line").on("mouseenter",function(){
            var str = $(this).attr("id").split("_");
                str = str[0]+"_"+str[1]+"_"+str[2];
            obj.find(" [class*='tipbox_']").hide();
            obj.find(" ."+str).show();
            // obj.find(" #"+str+".bong.line").css("fill-opacity","1");
        });
        obj.find(" .line").on("mouseout",function(){
            // obj.find(" .bong.line").css("fill-opacity","0.4");
            obj.find(" [class*='tipbox_']").hide();
        });

        //색구분
        if(str.tip === "Y"){
            var colorText_x = (w-(verticalW/2));
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();
                var tColorBox = obj.find(" #colorText_"+(t+1)+"_box")[0].getBBox();

                colorText_x -= tColor.width;
                obj.find(" #colorText_"+(t+1)).attr({
                    "x":colorText_x,
                    "y":20
                });
                colorText_x -= tColor.height+5;
                obj.find(" #colorText_"+(t+1)+"_box").attr({
                    "x":colorText_x,
                    "y":20-(tColor.height*0.8),
                    "width":tColor.height,
                    "height":tColor.height
                });
                colorText_x -= 10;
            }
        }
        
        var q = 6;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var points = "";
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                if(isNaN(per)) per = 0;
                if(per > 100) per = 100;
                if(per < 0) per = 0;

                var rw = (((w-30)/str.data.length) / 2);
                    rw = (rw > 100) ? 100:rw;
                var rh = (h * (per*0.01));
                
                var rx = (((w-30 - 80)/str.data.length) * t)+(rw/2)+(verticalW/2)+50;
                var ry = (h * ((100 - per)*0.01))+(verticalH/2);

                    rx = rx+(rw/2)-(q/2);
                    ry = ry-(q/2);

                obj.find(" #"+arcIds+"_"+(i+1)).attr("x",rx);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("y",ry);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("width",q);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("height",q);
            }

            var rw_t = (((w-30)/str.data.length) / 2);
                rw_t = (rw_t > 100) ? 100:rw_t;
            var rx_t = (((w-30 - 80)/str.data.length) * t)+(rw_t/2)+(verticalW/2)+50;

            var r = obj.find(" #"+arcIds+"_1")[0].getBBox();
            var tx = obj.find(" .text_bottom."+arcIds+"_1")[0].getBBox();
            var tx_x = (rx_t+(rw_t/2))-(tx.width/2);
            obj.find(" .text_bottom."+arcIds+"_1").attr("x",tx_x);

            //tipbox
            obj.find(" [class*='tipbox_']").show();
            var tipbox = 'tipbox_'+(t+1);
            var tb0 = obj.find(" ."+tipbox)[0].getBBox();
            var tb_x = (rx+(rw/2)+q);
            if((tb_x + tb0.width) > w){
                // tb_x = (rx - tb0.width - 10);
                // tb_x = (rx+(rw/2)-q-tb0.width);
                tb_x = rx - tb0.width - q;
            }
            var tb_y = r.y-5;

            obj.find(" [class*='tipbox_']").hide();
            obj.find(" ."+tipbox).attr("x",tb_x);
            obj.find(" ."+tipbox+'_1').attr("x",(tb_x+15));

            for(var i=0; i<str.data[t].data.length; i++){
                tb_y += 55;
                obj.find(" ."+tipbox+'_4_'+(i+1)).attr("x",(tb_x+15));
                obj.find(" ."+tipbox+'_5_'+(i+1)).attr("x",(tb_x+15+119));
            }            
        }

        /*
            M현재좌표.x,현재죄표.y
            C(이전좌표x+((현재좌표x - 이전좌표x)/2)),이전좌표y  
                (이전좌표x+((현재좌표x - 이전좌표x)/2)),현재좌표y
                현재좌표x,y
            마지막
            L좌표x,y
        */
        //draw_line
        for(var t=0; t<str.data[0].data.length; t++){
            //draw_line
            var arcIds = str.id+'_'+(t+1);
            var points = "";
            for(var i=0; i<str.data.length; i++){
                var arcIds_clone = str.id+'_'+(i+1)+'_'+(t+1);
                var bx = obj.find( "#"+arcIds_clone)[0].getBBox();
                var char = "C";
                var px = (bx.x+(q/2));
                var py = (bx.y+(q/2));
                if(i!==0){
                    var arcIds_clone_prev = str.id+'_'+(i)+'_'+(t+1);
                    var bx_prev = obj.find( "#"+arcIds_clone_prev)[0].getBBox();
                    var px_prev = (bx_prev.x+(q/2));
                    var py_prev = (bx_prev.y+(q/2));
                } else {
                    var px_prev = ((verticalW/2) + 40);
                    var py_prev = py;
                    points += "M"+px_prev+",270 ";
                    points += "L"+px_prev+","+py_prev+" ";
                }
                points += " "+char;
                points += (px_prev+((px-px_prev)/2))+","+py_prev+" ";
                points += (px_prev+((px-px_prev)/2))+","+py+" ";
                points += px+","+py;
            }
            points += " L"+(w-(verticalW/2))+","+py+" ";
            points += " L"+(w-(verticalW/2))+","+(h+(verticalH/2))+" ";
            points += " L"+((verticalW/2) + 40)+","+(h+(verticalH/2))+" ";

            obj.find(" .draw_line."+arcIds).attr("d",points);
            // obj.find(" .draw_line."+arcIds).css({"opacity":1,"stroke-dasharray":"2000px","stroke-dashoffset":"2000px"});
            // obj.find(" .draw_line."+arcIds)
            //     .delay(t*300)
            //     .animate({
            //         "opacity":1,
            //         "stroke-dashoffset":0+"px"
            //     },(obj.width()*8),"linear"
            // );
        }
        

        //아래 텍스트 변형
        var maxWidth = 0;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1)+'_1';
            var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

            maxWidth += textW;
        }
        if(maxWidth > w){
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1)+'_1';
                var textObj = obj.find(" .text_bottom."+arcIds);
                var boxObj = obj.find(" #"+arcIds);
                textObj.attr({"font-size":"10"});

                var text_w = (((w-30)/str.data.length) / 2);
                    text_w = (text_w > 100) ? 100:text_w;
                var text_x = (((w-30 - 80)/str.data.length) * t)+(text_w)+(verticalW/2)+50 - textObj[0].getBBox().width;
                var text_y = h + verticalH - (textObj[0].getBBox().height * 2) - 20;
                textObj.attr({
                    "x":text_x,
                    "y":text_y
                });
                textObj.attr({
                    "transform":"translate(0,"+(textObj[0].getBBox().height)+") rotate(-45, "+(text_x + textObj[0].getBBox().width)+","+(text_y - textObj[0].getBBox().height)+")"
                });
            }
        }

        
        this.resize(obj,str,b,a);
    },
    //도트
    dot:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        var a = ra[0];//비율 가로
        var b = ra[1];//비율 세로
        h = (b*w)/a;

        //set
        var maxH = maxH_clone = 0;
        var verticalH = 100;
        var verticalW = 40;
        h = h-verticalH;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+(h+verticalH)+'" viewbox="0 0 '+w+' '+(h+verticalH)+'">';
        if(str.fig === "%"){
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone += Number(str.data[t].data[i]);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        } else {
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone = Math.max(Number(str.data[t].data[i]),maxH_clone);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        }
        
        if(maxH == 0) maxH = 2000;
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;
        var maxH_save = maxH;

        //bg
        var tVal = 5;
        var y1 = (h * (2 / (tVal*2)));
        for(var t=0; t<tVal; t++){
            var lineVal = (maxH-((maxH/tVal)*(t+1)));
                lineVal = parseInt(lineVal);
            if(t==0){
                lineVal = maxH;
                lineVal = parseInt(lineVal);
                svgs += '<g fill="#6A707E">';
                svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+(verticalH/2)+'" stroke-width="0.5" stroke="#ddd" />';
                svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+(verticalH/2)+'">';
                if(str.fig === "%") svgs += '100%';
                else svgs += maxH;
                svgs += '</text>';
                svgs += '</g>';
            }
            lineVal = (maxH-((maxH/tVal)*(t+1)));
            lineVal = parseInt(lineVal);
            svgs += '<g fill="#6A707E">';
            svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.5" stroke="#ddd" id="bg_line_'+(t+1)+'" />';
            svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+((y1*(t+1))+(verticalH/2))+'">';
            if(str.fig === "%"){
                var dan = ((((t+1) * Math.floor(100/(tVal))) - 100) * -1);
                    dan = (t===tVal-1) ? 0:dan;
                svgs += dan+'%';
            }
            else svgs += Math.ceil(maxH - (maxH * (0.2 * (t+1))));
            svgs += '</text>';
            svgs += '</g>';
        }

        //단위
        svgs += '<text font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">[단위:'+str.dan+']</text>';

        //색구분
        if(str.tip === "Y"){
            for(var t=0; t<str.item.length; t++){
                svgs += '<rect id="colorText_'+(t+1)+'_box" rx="2" ry="2" fill="'+str.color[t]+'"></rect>';
                svgs += '<text id="colorText_'+(t+1)+'" font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">'+str.item[t]+'</text>';
            }
        }
        

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var fills =  str.color[0];

            //막대
            for(var i=0; i<str.data[t].data.length; i++){
                svgs += '<rect id="'+arcIds+'_'+(i+1)+'" class="'+cls+'_'+(i+1)+' bong line" rx="4" ry="4" fill="'+str.color[i]+'"></rect>';
            }
            
            
            //하단 텍스트
            svgs += '<text font-size="14" x="0" y="'+(h+(verticalH/2)+30)+'" fill="#444" class="text_bottom '+arcIds+'_1 '+cls+'_1">'+str.data[t].title+'</text>';
        }

        //가이드선
        svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((h+verticalH)/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((h+verticalH)/2)+'" stroke-width="0.5" stroke="#ff0000" id="guide_x" />';
        svgs += '<line x1="'+((w+40)/2)+'" y1="'+(verticalH/2)+'" x2="'+((w+40)/2)+'" y2="'+(h+(verticalH/2))+'" stroke-width="0.5" stroke="#ff0000" id="guide_y" />';

        

        //tooltip
        var hs = (str.data[0].data.length > 1) ? (55+(22*str.data[0].data.length)):72;
        var offsetVal = 40/hs*100;
        svgs += '<linearGradient id="'+str.id+'_MyGradient" gradientTransform="rotate(90)"><stop offset="'+offsetVal+'%" stop-color="#EFF4FF" /><stop offset="'+offsetVal+'%" stop-color="#fff" /><stop offset="100%" stop-color="#fff" /></linearGradient>';

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var arcIdsTip = 'tipbox_'+(t+1);

            svgs += '<rect x="0" y="0" class="'+arcIdsTip+' '+arcIds+' line" id="'+arcIds+'_box" fill="url(#'+str.id+'_MyGradient)" rx="6" ry="6" width="149px" height="'+hs+'px" stroke-width="1" stroke="#F0F0F0" fill="#ddd"></rect>';
            svgs += '<text x="'+(15)+'" y="20" class="'+arcIdsTip+'_1 '+arcIds+' line text1" id="'+arcIds+'_box_1" font-size="14" fill="#222">'+str.day+'</text>';
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                per = per.toFixed(1);
                per = per.replace(".0","");
                
                svgs += '<text x="'+(15)+'" y="55" class="'+arcIdsTip+'_4_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_2" font-size="14" fill="#666">'+str.item[i]+'</text>';
                svgs += '<text x="'+(15 + 119)+'" y="55" class="'+arcIdsTip+'_5_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_3" text-anchor="end" font-size="14" fill="'+str.color[i]+'">'
                if(str.fig === "%") svgs += per+'%';
                else svgs += commas(Number(str.data[t].data[i]));
                svgs += '</text>';
            }
        }

        svgs += '</svg>';
        obj.append(svgs);


        //view
        obj.find(" [id*='guide_']").hide();
        obj.find(">svg").on("mousemove",function(e){
            // var p = e.offsetY / $(this).height() * 100;
            //     p = (((400+verticalH) / 100) * p) - (((hs / 100) * p) * 1.5) - ($(this).find(" [class*='tipbox_']").height() / 2);
            var pers_x = e.offsetX/Number(obj.find(">svg").attr("width"))*100;
            var pers_y = e.offsetY/Number(obj.find(">svg").attr("height"))*100;
            var h = (b*w)/a;
                e.offsetX = w*(pers_x*0.01);
                e.offsetY = h*(pers_y*0.01);

            var p = e.offsetY - (hs);
                p = (p<0) ? 0:p;
            
            $(this).find(" [class*='tipbox_']").attr("y",p);
            $(this).find(" [class*='tipbox_'].text1").attr("y",p+25);
            for(var i=0; i<str.item.length; i++){
                $(this).find(" [class*='tipbox_'].text2_"+(i+1)).attr("y",p+63+(22*i));
            }
            var guide_x = ((w-(verticalW/2))>e.offsetX) ? e.offsetX:(w-(verticalW/2));
                guide_x = (((verticalW/2)+40)>guide_x) ? ((verticalW/2)+40):guide_x;
            var guide_y = ((h-(verticalH/2))>e.offsetY) ? e.offsetY:h-(verticalH/2);
                guide_y = ((verticalH/2)>guide_y) ? (verticalH/2):guide_y;
            obj.find(" [id*='guide_']").show();
            obj.find(" #guide_y").attr({
                "x1":guide_x+1,
                "x2":guide_x+1
            });
            obj.find(" #guide_x").attr({
                "y1":guide_y+1,
                "y2":guide_y+1
            });
        });
        obj.find(">svg").on("mouseleave",function(e){
            obj.find(" [id*='guide_']").hide();
        });
        obj.find(" .line").on("mouseenter",function(){
            var str = $(this).attr("id").split("_");
                str = str[0]+"_"+str[1]+"_"+str[2];
            obj.find(" [class*='tipbox_']").hide();
            obj.find(" ."+str).show();
            // obj.find(" #"+str+".bong.line").css("fill-opacity","1");
        });
        obj.find(" .line").on("mouseout",function(){
            // obj.find(" .bong.line").css("fill-opacity","0.4");
            obj.find(" [class*='tipbox_']").hide();
        });
        
        //색구분
        if(str.tip === "Y"){
            var colorText_x = (w-(verticalW/2));
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();
                var tColorBox = obj.find(" #colorText_"+(t+1)+"_box")[0].getBBox();

                colorText_x -= tColor.width;
                obj.find(" #colorText_"+(t+1)).attr({
                    "x":colorText_x,
                    "y":20
                });
                colorText_x -= tColor.height+5;
                obj.find(" #colorText_"+(t+1)+"_box").attr({
                    "x":colorText_x,
                    "y":20-(tColor.height*0.8),
                    "width":tColor.height,
                    "height":tColor.height
                });
                colorText_x -= 10;
            }
        }

        var q = 6;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                if(isNaN(per)) per = 0;
                if(per > 100) per = 100;
                if(per < 0) per = 0;

                var rw = (((w-30)/str.data.length) / 2);
                    rw = (rw > 100) ? 100:rw;
                var rh = (h * (per*0.01));
                
                var rx = (((w-30 - 80)/str.data.length) * t)+(rw/2)+(verticalW/2)+50;
                var ry = (h * ((100 - per)*0.01))+(verticalH/2);

                obj.find(" #"+arcIds+"_"+(i+1)).attr("x",rx+(rw/2)-(q/2));
                obj.find(" #"+arcIds+"_"+(i+1)).attr("y",ry-(q/2));
                obj.find(" #"+arcIds+"_"+(i+1)).attr("width",q);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("height",q);

                //animate
                obj.find( ".text_top."+arcIds+"_"+(i+1)).css("opacity",0);
                obj.find( "#"+arcIds+"_"+(i+1))
                    .css({
                        "y":(h+(verticalH/2))
                    })
                    .animate({
                        "y":ry-(q/2)
                    },300+(per*10),
                    function(){
                        obj.find(" .text_top."+$(this).attr("id")).css("opacity",1);
                    });
            }

            var rw_t = (((w-30)/str.data.length) / 2);
                rw_t = (rw_t > 100) ? 100:rw_t;
            var rx_t = (((w-30 - 80)/str.data.length) * t)+(rw_t/2)+(verticalW/2)+50;

            var r = obj.find(" #"+arcIds+"_1")[0].getBBox();
            var tx = obj.find(" .text_bottom."+arcIds+"_1")[0].getBBox();
            var tx_x = (rx_t+(rw_t/2))-(tx.width/2);
            obj.find(" .text_bottom."+arcIds+"_1").attr("x",tx_x);

            //tipbox
            var tipbox = 'tipbox_'+(t+1);
            var tb0 = obj.find(" ."+tipbox)[0].getBBox();
            var tb_x = (rx+(rw/2)+q);
            if((tb_x + tb0.width) > w){
                // tb_x = (rx - tb0.width - 10);
                tb_x = (rx+(rw/2)-q-tb0.width);
            }
            var tb_y = r.y-5;

            obj.find(" ."+tipbox).attr("x",tb_x).attr("y",tb_y).hide();
            obj.find(" ."+tipbox+'_1').attr("x",(tb_x+15)).attr("y",(tb_y+20)).hide();

            for(var i=0; i<str.data[t].data.length; i++){
                tb_y += 55;
                obj.find(" ."+tipbox+'_4_'+(i+1)).attr("x",(tb_x+15)).attr("y",tb_y).hide();
                obj.find(" ."+tipbox+'_5_'+(i+1)).attr("x",(tb_x+15+119)).attr("y",tb_y).hide();
            }
        }

        //아래 텍스트 변형
        var maxWidth = 0;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1)+'_1';
            var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

            maxWidth += textW;
        }
        if(maxWidth > w){
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1)+'_1';
                var textObj = obj.find(" .text_bottom."+arcIds);
                var boxObj = obj.find(" #"+arcIds);
                textObj.attr({"font-size":"10"});

                var text_w = (((w-30)/str.data.length) / 2);
                    text_w = (text_w > 100) ? 100:text_w;
                var text_x = (((w-30 - 80)/str.data.length) * t)+(text_w)+(verticalW/2)+50 - textObj[0].getBBox().width;
                var text_y = h + verticalH - (textObj[0].getBBox().height * 2) - 20;
                textObj.attr({
                    "x":text_x,
                    "y":text_y
                });
                textObj.attr({
                    "transform":"translate(0,"+(textObj[0].getBBox().height)+") rotate(-45, "+(text_x + textObj[0].getBBox().width)+","+(text_y - textObj[0].getBBox().height)+")"
                });
            }
        }

        
        this.resize(obj,str,b,a);
    },
    //원형
    circle:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        
        var a = w;//비율 가로
        var b = w;//비율 세로
        h = (b*w)/a;

        //set
        h = Math.min(w,h);
        var allCnt = 0;
        var lineW = w/4;//라인크기

        var maxH = 0;
        var maxH_clone = 0;
        for(var i=0; i<str.data[0].data.length; i++){
            for(var t=0; t<str.data.length; t++){
                maxH_clone += Number(str.data[t].data[i]);
            }
            maxH = Math.max(maxH,maxH_clone);
        }
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+h+'" viewbox="0 0 '+w+' '+w+'">';
        svgs += '<mask id="myMask_'+ids+'"><circle cx="'+(w/2)+'" cy="'+(w/2)+'" r="'+((w-lineW)/2)+'" fill="transparent" stroke-width="'+lineW+'" stroke="#fff" /></mask>';
        svgs += '<g mask="url(#myMask_'+ids+')">';
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            for(var i=0; i<str.data[t].data.length; i++){
                var arcIds2 = str.id+'_'+(t+1)+"_"+(i+1);
                var cls2 =  "num_"+(t+1)+"_"+(i+1);
                var fills2 = (str.data[t].data.length!==1)?str.color[i]:str.color[t];
                // svgs += '<path id="'+arcIds2+'" class="'+cls2+' line_s" fill="'+fills2+'" stroke="#fff"></path>';
            }
            svgs += '<path id="'+arcIds+'" class="'+cls+' line" fill="'+str.color[t]+'"></path>';
        }

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1)+'_text';
            var cls =  "num_"+(t+1);
            var fills =  str.color[t];
            //명조대비 색깔지정
            var c = str.color[t]||"#000";
            var color_r = parseInt(c.substring(1,3),16);
            var color_g = parseInt(c.substring(3,5),16);
            var color_b = parseInt(c.substring(5,7),16);
            var text_color = ((color_r * 299 + color_g * 587 + color_b * 114) / 1000 > 125) ? "#000":"#fff";
            var fills_text =  "#fff";
            var tx = w * (((100/str.data.length)*t)*0.01); 
            var font_size = (lineW / 3);
            var vals = str.data[t].data[0] / maxH * 100;
                vals = vals.toFixed(1);
                vals = vals.replace(".0","");
            svgs += '<text font-size="'+font_size+'" x="0" y="0" fill="'+text_color+'" id="'+arcIds+'" class="val_'+cls+' line shadow">';
            svgs += vals+"%";
            svgs += '</text>';
        }
        
        svgs += '</g>';

        //tooltip
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var tot = 0;
            var per = 0;
            var fontSize = w*0.03;
            for(var i=0; i<str.data[t].data.length; i++){
                var pers = Math.floor(Number(str.data[t].data[i]) / maxH * 100);
                per += Number(pers);
                tot += Number(str.data[t].data[i])
            }
            svgs += '<rect id="'+arcIds+'_rect" fill="'+str.color[t]+'" />';
            svgs += '<text id="'+arcIds+'_text_1" font-size="'+fontSize+'" fill="#666">'+str.data[t].title+'</text>';
            svgs += '<text id="'+arcIds+'_text_2" text-anchor="end" font-size="'+fontSize+'" fill="#666">'
            if(str.fig === "%") svgs += per+'%';
            else svgs += commas(tot);
            svgs += '</text>';
        }

        svgs += '</svg>';
        obj.append(svgs);
        
        
        obj.find(" .line").on("mouseenter",function(){
            var str = $(this).attr("id");
            if(str.indexOf("_text") != -1) str = str.replace("_text","");
            
            obj.find(" .line").css("fill-opacity","0.4");
            obj.find(" .line_s").css("fill-opacity","0.4");
            obj.find(" [id*='"+str+"']").css("fill-opacity","1");
            obj.find(" #"+str+"_text").css("fill-opacity","1");
        });
        obj.find(" .line").on("mouseleave",function(){
            obj.find(" .line").css("fill-opacity","1");
            obj.find(" .line_s").css("fill-opacity","1");
        });


        //view
        var cntX = -90;
        var cntW = 0;
        function _tot(){
            var a = 0;
            for(var i=0; i<str.data[t].data.length; i++){
                a += Number(str.data[t].data[i]);
            }
            return a;
        }
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls = "num_"+(t+1);
            var vals = _tot() / maxH * 100;
                vals = (360 * (vals*0.01))-90;

            cntW += vals;
            obj.find(" #"+arcIds).attr("d",describeArc((w/2), (h/2), (w/2), cntX, cntW));
            

            var maxV = 0;
            for(var i=0; i<str.data[t].data.length; i++){
                maxV += Number(str.data[t].data[i]);
            }
            
            var rmax = (w/2);
            for(var i=0; i<str.data[t].data.length; i++){
                var arcIds = str.id+'_'+(t+1)+'_'+(i+1);
                var r = Number(str.data[t].data[i])/maxV*100;
                    r = lineW * (r*0.01);
                
                obj.find(" #"+arcIds).attr("d",describeArc((w/2), (h/2), rmax, cntX, cntW));
                rmax -= r;
            }

            var com = cntX;
            cntW += 90;
            vals += 90;
            if(vals < 0) vals = vals*-1;
            cntX = cntX+vals;
            var tx = obj.find(" .val_"+cls)[0].getBBox();
            var com2 = com + (vals/2);
            com2 = polarToCartesian((w/2), (h/2), ((w-lineW)/2), com2);

            obj.find(" .val_"+cls).attr("x",com2.x-(tx.width/2));
            obj.find(" .val_"+cls).attr("y",com2.y+(tx.height/2));
        }

        //tooltip
        var tool_max_text = 0;
        var tool_max_w = 0;
        var tool_max_h = 0;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var tool_text_1 = obj.find(" #"+arcIds+'_text_1')[0].getBBox();
            var tool_text_2 = obj.find(" #"+arcIds+'_text_2')[0].getBBox();
            var tool_y = (h/2) + ((tool_text_1.height+(tool_text_1.height/2)) * t);

            tool_max_text = Math.max(tool_max_text,tool_text_1.width+tool_text_2.width+20);
            tool_max_w = (tool_text_1.height+10+tool_max_text);
            tool_max_h = (tool_y) - (h/2);
        }
        
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var tool_rect = obj.find(" #"+arcIds+'_rect');
            var tool_text_1 = obj.find(" #"+arcIds+'_text_1');
            var tool_text_2 = obj.find(" #"+arcIds+'_text_2');

            var tool_x = (w/2) - (tool_max_w/2);
            var tool_y = (h/2) + ((tool_text_1[0].getBBox().height+(tool_text_1[0].getBBox().height/2)) * t) - (tool_max_h/2);
            var rect_w = tool_text_1[0].getBBox().height;

            tool_rect.attr({
                "x":tool_x,
                "y":tool_y-(rect_w/1.3),
                "width":rect_w,
                "height":rect_w
            });
            tool_x += rect_w+10;
            tool_text_1.attr({
                "x":tool_x,
                "y":tool_y
            });
            tool_x += tool_max_text;
            tool_text_2.attr({
                "x":tool_x,
                "y":tool_y
            });
        }

        this.resize(obj,str,b,a);
    },
    //원형
    circle_screw:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        
        var a = w;//비율 가로
        var b = w;//비율 세로
        h = (b*w)/a;

        //set
        h = Math.min(w,h);
        var allCnt = 0;
        var strokeW = ((h/2)-50)/str.data.length;
        if(strokeW > 200) strokeW = 200;

        var maxH = 0;
        for(var i=0; i<str.data.length; i++){
            var maxH_clone = 0;
            for(var t=0; t<str.data[i].data.length; t++){
                maxH_clone += Number(str.data[i].data[t]);
            }
            maxH = Math.max(maxH,maxH_clone);
            str.data[i].tot = maxH_clone;
        }
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+h+'" viewbox="0 0 '+w+' '+w+'">';
        var dw = w-strokeW;
		var dwr = dw/2;
		var dx = 0;
		

		//배경
		svgs += '<g>';
		for(var i=0; i<str.data.length; i++){
            var arcIds = str.id+'_pathbg_'+(i+1);
            var v = str.data[i].tot;
            var per = Math.floor(v/maxH*100);
            var text_per = (str.fig !== "%")? commas(str.data[i].tot):per+"%";
			dx = ((strokeW/2)+(i*strokeW));
			d = 'M'+(dx-i)+','+(dwr+(strokeW/2))+'a'+(dwr-(i*strokeW))+','+(dwr-(i*strokeW))+' 0 1,0 '+(dw-(i*(strokeW*2))+(i*2))+',0a'+(dwr-(i*strokeW))+','+(dwr-(i*strokeW))+' 0 1,0 -'+(dw-(i*(strokeW*2))+(i*2))+',0';
			
            var text_color = (((220+(i*10)) * 299 + (220+(i*10)) * 587 + (220+(i*10)) * 114) / 1000 > 125) ? "#000":"#fff";

			svgs += '	<path id="'+arcIds+'" d="'+d+'" stroke-linecap="round" stroke-width="'+strokeW+'" stroke="rgb('+(220+(i*10))+','+(220+(i*10))+','+(220+(i*10))+')" fill="none" transform="translate(0,'+w+') scale(1,-1) rotate(-90 '+(w/2)+' '+(w/2)+')"></path>';
			svgs += '	<text font-family="dotum" font-size="'+(strokeW/3)+'" fill="'+text_color+'" dominant-baseline="central" text-anchor="start"><textPath xlink:href="#'+arcIds+'" alignment-baseline="top">'+str.data[i].title+' ('+text_per+')</textPath></text>';
		}
		svgs += '</g>';

        //실제데이터
		for(var i=0; i<str.data.length; i++){
            var arcIds = str.id+'_'+(i+1);
			dx = ((strokeW/2)+(i*strokeW));
			d = 'M'+(dx-i)+','+(dwr+(strokeW/2))+'a'+(dwr-(i*strokeW))+','+(dwr-(i*strokeW))+' 0 1,0 '+(dw-(i*(strokeW*2))+(i*2))+',0a'+(dwr-(i*strokeW))+','+(dwr-(i*strokeW))+' 0 1,0 -'+(dw-(i*(strokeW*2))+(i*2))+',0';
            var v = str.data[i].tot;
            var per = Math.floor(v/maxH*100);
            var text_per = (str.fig !== "%")? commas(str.data[i].tot):per+"%";

            //명조대비 색깔지정
            var c = str.color[i]||"#000";
            var color_r = parseInt(c.substring(1,3),16);
            var color_g = parseInt(c.substring(3,5),16);
            var color_b = parseInt(c.substring(5,7),16);
            var text_color = ((color_r * 299 + color_g * 587 + color_b * 114) / 1000 > 125) ? "#000":"#fff";

			svgs += '	<path class="vals" d="'+d+'" stroke-linecap="round" stroke-width="'+strokeW+'" stroke="'+c+'" fill="none"  transform="translate(0,'+w+') scale(1,-1) rotate(-90 '+(w/2)+' '+(w/2)+')">'+per+'</path>';
			svgs += '	<mask id="'+arcIds+'" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" transform="scale(1)">';
			svgs += '		<path class="vals" id="'+arcIds+'_path_" d="'+d+'" stroke-linecap="round" stroke-width="'+strokeW+'" stroke="#fff" fill="none"  transform="translate(0,'+w+') scale(1,-1) rotate(-90 '+(w/2)+' '+(w/2)+')">'+per+'</path>';
			svgs += '	</mask>';
			svgs += '	<text font-family="dotum" font-size="'+(strokeW/3)+'" fill="'+text_color+'" dominant-baseline="central" text-anchor="start" mask="url(#'+arcIds+')">';
			svgs += '		<textPath xlink:href="#'+arcIds+'_path_" alignment-baseline="top">';
			svgs += '			'+str.data[i].title+' ('+text_per+')';
			svgs += '		</textPath>';
			svgs += '	</text>';
		}


        svgs += '</svg>';
        obj.append(svgs);
        

        var pathes = obj.find('path.vals');
		pathes.each(function( i, path ) {
			var total_length = path.getTotalLength();
			path.style.strokeDasharray = total_length + " " + total_length;
			path.style.strokeDashoffset = total_length;
			$(path).css({"strokeDashoffset" : total_length});

			var datas = obj.find("path.vals").eq(i).text();
				datas = total_length-(total_length*(datas/100));
				//console.log(datas);
			$(path).animate({
				//"strokeDashoffset" : total_length-200
				"strokeDashoffset" : datas
			}, 1000);
		});
        

        this.resize(obj,str,b,a);
    },
    //원형-반원
    circle_ban:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        
        var a = w;//비율 가로
        var b = w/2;//비율 세로
        h = (b*w)/a;

        //set
        h = Math.min(w,h);
        h = h/2;
        var allCnt = 0;
        var strokeW = ((h)-50)/str.data.length;
        if(strokeW > 200) strokeW = 200;

        var maxH = 0;
        for(var i=0; i<str.data.length; i++){
            var maxH_clone = 0;
            for(var t=0; t<str.data[i].data.length; t++){
                maxH_clone += Number(str.data[i].data[t]);
            }
            maxH = Math.max(maxH,maxH_clone);
            str.data[i].tot = maxH_clone;
        }
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+h+'" viewbox="0 0 '+w+' '+(w/2)+'">';
        var dw = w-strokeW;
		var dwr = dw/2;
		var dx = 0;
		

		//배경
		svgs += '<g>';
		for(var i=0; i<str.data.length; i++){
            var arcIds = str.id+'_pathbg_'+(i+1);
            var v = str.data[i].tot;
            var per = Math.floor(v/maxH*100);
            var text_per = (str.fig !== "%")? commas(str.data[i].tot):per+"%";
			dx = ((strokeW/2)+(i*strokeW));
			d = 'M'+(dx-i)+','+(dwr+(strokeW/2))+'a'+(dwr-(i*strokeW))+','+(dwr-(i*strokeW))+' 0 1,0 '+(dw-(i*(strokeW*2))+(i*2))+',0a'+(dwr-(i*strokeW))+','+(dwr-(i*strokeW))+' 0 1,0 -'+(dw-(i*(strokeW*2))+(i*2))+',0';
			
            var text_color = (((220+(i*10)) * 299 + (220+(i*10)) * 587 + (220+(i*10)) * 114) / 1000 > 125) ? "#000":"#fff";

			svgs += '	<path id="'+arcIds+'" d="'+d+'" stroke-linecap="round" stroke-width="'+strokeW+'" stroke="rgb('+(220+(i*10))+','+(220+(i*10))+','+(220+(i*10))+')" fill="none" transform="translate(0,'+w+') scale(1,-1) rotate(-10 '+(w/2)+' '+(w/2)+')"></path>';
			svgs += '	<text font-family="dotum" font-size="'+(strokeW/3)+'" fill="'+text_color+'" dominant-baseline="central" text-anchor="start"><textPath xlink:href="#'+arcIds+'" alignment-baseline="top">'+str.data[i].title+' ('+text_per+')</textPath></text>';
		}
		svgs += '</g>';

        //실제데이터
		for(var i=0; i<str.data.length; i++){
            var arcIds = str.id+'_'+(i+1);
			dx = ((strokeW/2)+(i*strokeW));
			d = 'M'+(dx-i)+','+(dwr+(strokeW/2))+'a'+(dwr-(i*strokeW))+','+(dwr-(i*strokeW))+' 0 1,0 '+(dw-(i*(strokeW*2))+(i*2))+',0a'+(dwr-(i*strokeW))+','+(dwr-(i*strokeW))+' 0 1,0 -'+(dw-(i*(strokeW*2))+(i*2))+',0';
            var v = str.data[i].tot;
            var per = Math.floor(v/maxH*50);
            var text_per = (str.fig !== "%")? commas(str.data[i].tot):(per*2)+"%";

            //명조대비 색깔지정
            var c = str.color[i]||"#000";
            var color_r = parseInt(c.substring(1,3),16);
            var color_g = parseInt(c.substring(3,5),16);
            var color_b = parseInt(c.substring(5,7),16);
            var text_color = ((color_r * 299 + color_g * 587 + color_b * 114) / 1000 > 125) ? "#000":"#fff";

			svgs += '	<path class="vals" d="'+d+'" stroke-linecap="round" stroke-width="'+strokeW+'" stroke="'+c+'" fill="none"  transform="translate(0,'+w+') scale(1,-1) rotate(0 '+(w/2)+' '+(w/2)+')">'+per+'</path>';
			svgs += '	<mask id="'+arcIds+'" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" transform="scale(1)">';
			svgs += '		<path class="vals" id="'+arcIds+'_path_" d="'+d+'" stroke-linecap="round" stroke-width="'+strokeW+'" stroke="#fff" fill="none"  transform="translate(0,'+w+') scale(1,-1) rotate(-10 '+(w/2)+' '+(w/2)+')">'+(per - 2)+'</path>';
			svgs += '	</mask>';
			svgs += '	<text font-family="dotum" font-size="'+(strokeW/3)+'" fill="'+text_color+'" dominant-baseline="central" text-anchor="start" mask="url(#'+arcIds+')">';
			svgs += '		<textPath xlink:href="#'+arcIds+'_path_" alignment-baseline="top">';
			svgs += '			'+str.data[i].title+' ('+text_per+')';
			svgs += '		</textPath>';
			svgs += '	</text>';
		}


        svgs += '</svg>';
        obj.append(svgs);
        

        var pathes = obj.find('path.vals');
		pathes.each(function( i, path ) {
			var total_length = path.getTotalLength();
			path.style.strokeDasharray = total_length + " " + total_length;
			path.style.strokeDashoffset = total_length;
			$(path).css({"strokeDashoffset" : total_length});

			var datas = obj.find("path.vals").eq(i).text();
				datas = total_length-(total_length*(datas/100));
				//console.log(datas);
			$(path).animate({
				//"strokeDashoffset" : total_length-200
				"strokeDashoffset" : datas
			}, 1000);
		});
        

        this.resize(obj,str,b,a);
    },
    //방사형
    polygon:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        
        var a = w;//비율 가로
        var b = w;//비율 세로
        h = (b*w)/a;

        //set
        var verticalW = 0;
        h = Math.min(w,h);
        var allCnt = 0;
        var maxH = 0;
        var maxH_clone = 0;
        for(var i=0; i<str.data[0].data.length; i++){
            for(var t=0; t<str.data.length; t++){
                maxH_clone = Math.max(Number(str.data[t].data[i]),maxH_clone);
            }
            maxH = Math.max(maxH,maxH_clone);
        }
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+h+'" viewbox="0 0 '+(w)+' '+(h)+'">';
        
        var ww = w-120;
        var hh = h-60;
        var fontSize = w*0.025;
        for(var i=0; i<str.data.length; i++){
            var arcIds = str.id+'_'+(i+1);
            var mosuri = polarToCartesian((w/2),(h/2),(ww/2),((360/str.data.length)*i) - 90);
            svgs += '<line x1="'+(w/2)+'" y1="'+(h/2)+'" x2="'+mosuri.x+'" y2="'+mosuri.y+'" opacity="0.2" stroke="black" />';
            svgs += '<text id="'+arcIds+'" x="'+mosuri.x+'" y="'+mosuri.y+'" font-size="'+(fontSize)+'" opacity="0.8">'+str.data[i].title+'</text>';
        }

        for(var t=0; t<5; t++){
            var points = "";
            for(var i=0; i<str.data.length; i++){
                var mosuri = polarToCartesian((w/2),(h/2),((ww/2)-(((ww/2)/5)*t)),((360/str.data.length)*i) - 90);
                points += mosuri.x+","+mosuri.y+" ";

                if(t!==0){
                    svgs += '<text x="'+mosuri.x+'" y="'+mosuri.y+'" opacity="0.4" font-size="'+fontSize+'" stroke="#fff" stroke-width="3">'+((100/5) * (5-t))+'</text>';        
                    svgs += '<text x="'+mosuri.x+'" y="'+mosuri.y+'" opacity="0.4" font-size="'+fontSize+'" stroke="#000" stroke-width="1">'+((100/5) * (5-t))+'</text>';        
                }
            }
            svgs += '<polygon points="'+points+'" fill="none" stroke="black" opacity="'+((0.1*(t+1)))+'"></polygon>';
        }

        //단위
        svgs += '<text x="'+w+'" y="20" font-size="'+(fontSize*1.4)+'" text-anchor="end" fill="#666" class="text_dan">[단위:%]</text>';

        //색구분
        if(str.tip === "Y"){
            for(var t=0; t<str.item.length; t++){
                svgs += '<rect id="colorText_'+(t+1)+'_box" rx="2" ry="2" fill="'+str.color[t]+'" opacity="0.4"></rect>';
                svgs += '<text id="colorText_'+(t+1)+'" font-size="'+(fontSize*1.4)+'" x="0" y="'+(h-10)+'" text-anchor="start" fill="#666" class="text_dan">'+str.item[t]+'</text>';
            }
        }
        
        //data
        for(var t=0; t<str.data[0].data.length; t++){
            var points = "";
            for(var i=0; i<str.data.length; i++){
                var per = str.data[i].data[t]/maxH*100;
                var perMax = ww/2;
                    perMax = perMax * (per * 0.01);
                var mosuri = polarToCartesian((w/2),(h/2),perMax,((360/str.data.length)*i) - 90);
                points += mosuri.x+","+mosuri.y+" ";
            }
            svgs += '<polygon points="'+points+'" stroke="none" fill="'+str.color[t]+'" opacity="0.4"></polygon>';
        }

        svgs += '</svg>';
        obj.append(svgs);
        

        //set
        for(var i=0; i<str.data.length; i++){
            var arcIds = str.id+'_'+(i+1);
            var texts = $("#"+arcIds)[0].getBBox();
            var tx = texts.x - (texts.width/2);
            var ty = texts.y + texts.height;
            obj.find(" #"+arcIds).attr("x",tx);
            obj.find(" #"+arcIds).attr("y",ty);
        }

        //dan
        var dan = obj.find(" .text_dan")[0].getBBox();
        obj.find(" .text_dan").attr("y",dan.height);

        //색구분
        if(str.tip === "Y"){
            var colorText_x_total = 0;
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();
                colorText_x_total -= tColor.width;
                colorText_x_total -= tColor.height+5;
                colorText_x_total -= 10;
            }

            var colorText_x = ((w/2)-(colorText_x_total/2)-(verticalW/2));
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();

                colorText_x -= tColor.width;
                obj.find(" #colorText_"+(t+1)).attr({
                    "x":colorText_x,
                    "y":h-7
                });
                colorText_x -= tColor.height+5;
                obj.find(" #colorText_"+(t+1)+"_box").attr({
                    "x":colorText_x,
                    "y":(h-7)-(tColor.height*0.8),
                    "width":tColor.height,
                    "height":tColor.height
                });
                colorText_x -= 20;
            }
        }
        



        this.resize(obj,str,b,a);
    },
    //공간형
    block:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        
        var a = ra[0];//비율 가로
        var b = ra[1];//비율 세로
        h = (b*w)/a;

        //set
        h = Math.min(w,h);
        var allCnt = 0;
        var maxH = 0;
        var maxH_clone = 0;
        for(var i=0; i<str.data[0].data.length; i++){
            for(var t=0; t<str.data.length; t++){
                maxH_clone += Number(str.data[t].data[i]);
            }
            maxH = Math.max(maxH,maxH_clone);
        }
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;
        
        for(var t=0; t<str.data.length; t++){
            maxH_clone = 0;
            for(var i=0; i<str.data[t].data.length; i++){
                maxH_clone += Number(str.data[t].data[i]);
            }
            str.data[t].tot = maxH_clone;
            str.data[t].color = str.color[t];
        }

        str.data.sort(function(a,b) {
            return parseFloat(b.tot) - parseFloat(a.tot);
        });
        // console.log(str.data);


        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+h+'" viewbox="0 0 '+(w)+' '+(h)+'">';
        svgs += '<rect x="0" y="0" width="'+w+'" height="'+h+'" stroke="#000" fill="none" />';
        
        var totAll = 0;
        for(var i=0; i<str.data.length; i++){
            totAll += Number(str.data[i].tot);
        }
        var points = 0;
        var xs = 0;
        var ys = 0;
        var fontSize = w*0.03;
        for(var i=0; i<str.data.length; i++){
            var arcIds = str.id+'_'+(i+1);
            var per = str.data[i].tot/(totAll-points)*100;
            var perMax = (i%2===0) ? (w-xs)*(per*0.01) : (h-ys)*(per*0.01);
            var ws = (i%2===0)?perMax:w-xs;
            var hs = (i%2===0)?h-ys:perMax;;

            var c = str.data[i].color||"#000";
            var color_r = parseInt(c.substring(1,3),16);
            var color_g = parseInt(c.substring(3,5),16);
            var color_b = parseInt(c.substring(5,7),16);
            var text_color = ((color_r * 299 + color_g * 587 + color_b * 114) / 1000 > 125) ? "#000":"#fff";
            
            svgs += '<rect id="'+arcIds+'_box" x="'+xs+'" y="'+ys+'" width="'+ws+'" height="'+hs+'" stroke="#444" fill="'+str.data[i].color+'"></rect>';
            svgs += '<text id="'+arcIds+'" x="'+xs+'" y="'+ys+'" fill="'+text_color+'" font-weight="600" font-size="'+fontSize+'">'+str.data[i].title+'</text>';
            if(i%2===0) xs += ws;
            if(i%2!==0) ys += hs;
            points += str.data[i].tot;
        }


        svgs += '</svg>';
        obj.append(svgs);
        

        //set
        var points = 0;
        for(var i=0; i<str.data.length; i++){
            var arcIds = str.id+'_'+(i+1);
            var box = $("#"+arcIds+"_box")[0].getBBox();
            var texts = $("#"+arcIds)[0].getBBox();
            var tx = box.x + (box.width/2) - (texts.width/2);
            var ty = box.y + (box.height/2) + (texts.height/2);
            obj.find(" #"+arcIds).attr({
                "x":tx,
                "y":ty
            });
        }
        



        this.resize(obj,str,b,a);
    },
    //막대형+라인형
    floatLine:function(obj,str){
        var svgs = "";
        var ids = "svg_"+str.id;
        var w = (obj.innerWidth() < 800) ? 1000:obj.innerWidth();
        var ra = str.ratio.split(":");
        h = 0;
        var a = ra[0];//비율 가로
        var b = ra[1];//비율 세로
        h = (b*w)/a;

        //set
        var maxH = maxH_clone = 0;
        var verticalH = 100;
        var verticalW = 40;
        h = h-verticalH;

        svgs = '<svg id="'+ids+'" width="'+w+'" height="'+(h+verticalH)+'" viewbox="0 0 '+w+' '+(h+verticalH)+'">';
        if(str.fig === "%"){
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone += Number(str.data[t].data[i]);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        } else {
            for(var i=0; i<str.data[0].data.length; i++){
                for(var t=0; t<str.data.length; t++){
                    maxH_clone = Math.max(Number(str.data[t].data[i]),maxH_clone);
                }
                maxH = Math.max(maxH,maxH_clone);
            }
        }
        
        if(maxH == 0) maxH = 2000;
        if(str.maxpoint !== 0 && maxH < str.maxpoint) maxH = str.maxpoint;
        var maxH_save = maxH;

        //bg
        var tVal = 5;
        var y1 = (h * (2 / (tVal*2)));
        for(var t=0; t<tVal; t++){
            var lineVal = (maxH-((maxH/tVal)*(t+1)));
                lineVal = parseInt(lineVal);
            if(t==0){
                lineVal = maxH;
                lineVal = parseInt(lineVal);
                svgs += '<g fill="#6A707E">';
                svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW) - 0)+'" y2="'+(verticalH/2)+'" stroke-width="0.5" stroke="#ddd" />';
                svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+(verticalH/2)+'">';
                if(str.fig === "%") svgs += '100%';
                else svgs += maxH;
                svgs += '</text>';
                svgs += '</g>';
            }
            lineVal = (maxH-((maxH/tVal)*(t+1)));
            lineVal = parseInt(lineVal);
            svgs += '<g fill="#6A707E">';
            svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW) - 0)+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.5" stroke="#ddd" id="bg_line_'+(t+1)+'" />';
            svgs += '<text text-anchor="end" font-size="14" x="'+(verticalW)+'" y="'+((y1*(t+1))+(verticalH/2))+'">';
            if(str.fig === "%"){
                var dan = ((((t+1) * Math.floor(100/(tVal))) - 100) * -1);
                    dan = (t===tVal-1) ? 0:dan;
                svgs += dan+'%';
            }
            else svgs += Math.ceil(maxH - (maxH * (0.2 * (t+1))));
            svgs += '</text>';
            svgs += '</g>';
        }

        //단위
        svgs += '<text font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">[단위:'+str.dan+']</text>';

        //색구분
        if(str.tip === "Y"){
            for(var t=0; t<str.item.length; t++){
                svgs += '<rect id="colorText_'+(t+1)+'_box" rx="2" ry="2" fill="'+str.color[t]+'"></rect>';
                svgs += '<text id="colorText_'+(t+1)+'" font-size="14" x="0" y="'+(20)+'" text-anchor="start" fill="#666" class="text_dan">'+str.item[t]+'</text>';
            }
        }
        

        // line
        if(str.data2 !== undefined){
            var maxH2_clone = 0;
            var maxH2 = 0;
            if(str.fig === "%"){
                for(var i=0; i<str.data2[0].data.length; i++){
                    for(var t=0; t<str.data2.length; t++){
                        maxH2_clone += Number(str.data2[t].data[i]);
                    }
                    maxH2 = Math.max(maxH2,maxH2_clone);
                }
            } else {
                for(var i=0; i<str.data2[0].data.length; i++){
                    for(var t=0; t<str.data2.length; t++){
                        maxH2_clone = Math.max(Number(str.data2[t].data[i]),maxH2_clone);
                    }
                    maxH2 = Math.max(maxH2,maxH2_clone);
                }
            }
            
            if(maxH2 == 0) maxH2 = 2000;
            var maxH2_save = maxH2;

            //bg
            var tVal = 5;
            var y1 = (h * (2 / (tVal*2)));
            for(var t=0; t<tVal; t++){
                var lineVal = (maxH2-((maxH2/tVal)*(t+1)));
                    lineVal = parseInt(lineVal);
                if(t==0){
                    lineVal = maxH2;
                    lineVal = parseInt(lineVal);
                    svgs += '<g fill="#6A707E">';
                    svgs += '<text text-anchor="start" font-size="14" x="'+(w-verticalW)+'" y="'+(verticalH/2)+'">';
                    if(str.fig === "%") svgs += '100%';
                    else svgs += maxH2;
                    svgs += '</text>';
                    svgs += '</g>';

                    //중심선
                    svgs += '<g fill="#ff0000">';
                    svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((verticalH/2)+(h/2))+'" x2="'+(w-(verticalW))+'" y2="'+((verticalH/2)+(h/2))+'" opacity="0.4" stroke-width="0.4" stroke="#ff0000" />';
                    svgs += '<text text-anchor="start" font-size="14" x="'+(w-verticalW)+'" y="'+((verticalH/2)+(h/2))+'" opacity="0.4">';
                    if(str.fig === "%") svgs += '0%';
                    else svgs += '0';
                    svgs += '</text>';
                    svgs += '</g>';
                }
                lineVal = (maxH2-((maxH2/tVal)*(t+1)));
                lineVal = parseInt(lineVal);
                svgs += '<g fill="#6A707E">';
                svgs += '<text text-anchor="start" font-size="14" x="'+(w-(verticalW))+'" y="'+((y1*(t+1))+(verticalH/2))+'">';
                if(str.fig === "%"){
                    var dan = ((((t+1) * Math.floor(100/(tVal/2))) - 100) * -1);
                    svgs += dan+'%';
                }
                else svgs += Math.ceil(maxH2 - (maxH2 * ((Math.floor(100/(tVal/2))*0.01) * (t+1))));
                svgs += '</text>';
                svgs += '</g>';
            }

            for(var t=0; t<str.data2.length; t++){
                var arcIds = "line_"+str.id+'_'+(t+1);
                var cls =  "num_"+(t+1);
                var fills =  str.color[0];

                //막대
                for(var i=0; i<str.data2[t].data.length; i++){
                    svgs += '<rect id="'+arcIds+'_'+(i+1)+'" class="'+cls+'_'+(i+1)+' bong line2" rx="2" ry="2" stroke="#fff" stroke-width="2" fill="'+str.color[i]+'"></rect>';
                }
            }

            // line
            for(var t=0; t<str.data2[0].data.length; t++){
                var arcIds = "line_"+str.id+'_'+(t+1);
                svgs += '<polyline points="" stroke-width="1" fill="none" stroke="'+str.color[t]+'" class="draw_line '+arcIds+'" />';
            }
        }

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            var fills =  str.color[0];

            //막대
            for(var i=0; i<str.data[t].data.length; i++){
                svgs += '<rect id="'+arcIds+'_'+(i+1)+'" class="'+cls+'_'+(i+1)+' bong line" rx="2" ry="2" fill="'+str.color[i]+'"></rect>';
            }
            
            
            //하단 텍스트
            svgs += '<text font-size="14" x="0" y="'+(h+(verticalH/2)+30)+'" fill="#444" class="text_bottom '+arcIds+'_1 '+cls+'_1">'+str.data[t].title+'</text>';
        }

        //가이드선
        svgs += '<line x1="'+((verticalW/2) + 40)+'" y1="'+((h+verticalH)/2)+'" x2="'+(w-(verticalW/2) - 0)+'" y2="'+((h+verticalH)/2)+'" stroke-width="0.5" stroke="#ff0000" id="guide_x" />';
        svgs += '<line x1="'+((w+40)/2)+'" y1="'+(verticalH/2)+'" x2="'+((w+40)/2)+'" y2="'+(h+(verticalH/2))+'" stroke-width="0.5" stroke="#ff0000" id="guide_y" />';


        //tooltip
        var hs = (str.data[0].data.length > 1) ? (55+(22*str.data[0].data.length)):72;
        var offsetVal = 40/hs*100;
        svgs += '<linearGradient id="'+str.id+'_MyGradient" gradientTransform="rotate(90)"><stop offset="'+offsetVal+'%" stop-color="#EFF4FF" /><stop offset="'+offsetVal+'%" stop-color="#fff" /><stop offset="100%" stop-color="#fff" /></linearGradient>';

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var arcIdsTip = 'tipbox_'+(t+1);

            svgs += '<rect x="0" y="0" class="'+arcIdsTip+' '+arcIds+' line" id="'+arcIds+'_box" fill="url(#'+str.id+'_MyGradient)" rx="6" ry="6" width="149px" height="'+hs+'px" stroke-width="1" stroke="#F0F0F0" fill="#ddd"></rect>';
            svgs += '<text x="'+(15)+'" y="20" class="'+arcIdsTip+'_1 '+arcIds+' line text1" id="'+arcIds+'_box_1" font-size="14" fill="#222">'+str.day+'</text>';
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                per = per.toFixed(1);
                per = per.replace(".0","");
                
                svgs += '<text x="'+(15)+'" y="55" class="'+arcIdsTip+'_4_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_2" font-size="14" fill="#666">'+str.item[i]+'</text>';
                svgs += '<text x="'+(15 + 119)+'" y="55" class="'+arcIdsTip+'_5_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_3" text-anchor="end" font-size="14" fill="'+str.color[i]+'">'
                if(str.fig === "%") svgs += per+'%';
                else svgs += commas(Number(str.data[t].data[i]));
                svgs += '</text>';
            }
        }
        // line
        if(str.data2 !== undefined){
            //tooltip
            var hs = (str.data2[0].data.length > 1) ? (55+(22*str.data2[0].data.length)):72;
            var offsetVal = 40/hs*100;
            svgs += '<linearGradient id="line_'+str.id+'_MyGradient" gradientTransform="rotate(90)"><stop offset="'+offsetVal+'%" stop-color="#EFF4FF" /><stop offset="'+offsetVal+'%" stop-color="#fff" /><stop offset="100%" stop-color="#fff" /></linearGradient>';

            for(var t=0; t<str.data2.length; t++){
                var arcIds = "line_"+str.id+'_'+(t+1);
                var arcIdsTip = 'line_tipbox_'+(t+1);

                svgs += '<rect x="0" y="0" class="'+arcIdsTip+' '+arcIds+' line" id="'+arcIds+'_box" fill="url(#line_'+str.id+'_MyGradient)" rx="6" ry="6" width="149px" height="'+hs+'px" stroke-width="1" stroke="#F0F0F0" fill="#ddd"></rect>';
                svgs += '<text x="'+(15)+'" y="20" class="'+arcIdsTip+'_1 '+arcIds+' line text1" id="'+arcIds+'_box_1" font-size="14" fill="#222">'+str.day+'</text>';
                for(var i=0; i<str.data2[t].data.length; i++){
                    var per = Number(str.data2[t].data[i]) / maxH * 100;
                    per = per.toFixed(1);
                    per = per.replace(".0","");
                    
                    svgs += '<text x="'+(15)+'" y="55" class="'+arcIdsTip+'_4_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_2" font-size="14" fill="#666">'+str.item[i]+'</text>';
                    svgs += '<text x="'+(15 + 119)+'" y="55" class="'+arcIdsTip+'_5_'+(i+1)+' '+arcIds+' line text2_'+(i+1)+'" id="'+arcIds+'_box_3" text-anchor="end" font-size="14" fill="'+str.color[i]+'">'
                    if(str.fig === "%") svgs += per+'%';
                    else svgs += commas(Number(str.data2[t].data[i]));
                    svgs += '</text>';
                }
            }
        }

        svgs += '</svg>';
        obj.append(svgs);


        //view
        obj.find(" [id*='guide_']").hide();
        obj.find(">svg").on("mousemove",function(e){
            // var p = e.offsetY / $(this).height() * 100;
            //     p = (((400+verticalH) / 100) * p) - (((hs / 100) * p) * 1.5) - ($(this).find(" [class*='tipbox_']").height() / 2);
            var pers_x = e.offsetX/Number(obj.find(">svg").attr("width"))*100;
            var pers_y = e.offsetY/Number(obj.find(">svg").attr("height"))*100;
            var h = (b*w)/a;
                e.offsetX = w*(pers_x*0.01);
                e.offsetY = h*(pers_y*0.01);

            var p = e.offsetY - (hs/2);
            p = (p<0) ? 0:p;
            
            $(this).find(" [class*='tipbox_']").attr("y",p);
            $(this).find(" [class*='tipbox_'].text1").attr("y",p+25);
            for(var i=0; i<str.item.length; i++){
                $(this).find(" [class*='tipbox_'].text2_"+(i+1)).attr("y",p+63+(22*i));
            }

            if(str.data2 !== undefined){
                $(this).find(" [class*='line_tipbox_']").attr("y",p);
                $(this).find(" [class*='line_tipbox_'].text1").attr("y",p+25);
                for(var i=0; i<str.item.length; i++){
                    $(this).find(" [class*='line_tipbox_'].text2_"+(i+1)).attr("y",p+63+(22*i));
                }
            }
            var guide_x = ((w-(verticalW/2))>e.offsetX) ? e.offsetX:(w-(verticalW/2));
                guide_x = (((verticalW/2)+40)>guide_x) ? ((verticalW/2)+40):guide_x;
            var guide_y = ((h-(verticalH/2))>e.offsetY) ? e.offsetY:h-(verticalH/2);
                guide_y = ((verticalH/2)>guide_y) ? (verticalH/2):guide_y;
            obj.find(" [id*='guide_']").show();
            obj.find(" #guide_y").attr({
                "x1":guide_x+1,
                "x2":guide_x+1
            });
            obj.find(" #guide_x").attr({
                "y1":guide_y+1,
                "y2":guide_y+1
            });
        });
        obj.find(">svg").on("mouseleave",function(e){
            obj.find(" [id*='guide_']").hide();
        });
        obj.find(" .line").on("mouseenter",function(){
            var str = $(this).attr("id").split("_");
                str = str[0]+"_"+str[1]+"_"+str[2];
            obj.find(" [class*='tipbox_']").hide();
            obj.find(" ."+str).show();
            // obj.find(" #"+str+".bong.line").css("fill-opacity","1");
        });
        obj.find(" .line").on("mouseout",function(){
            // obj.find(" .bong.line").css("fill-opacity","0.4");
            obj.find(" [class*='tipbox_']").hide();
        });
        
        //색구분
        if(str.tip === "Y"){
            var colorText_x = (w-(verticalW));
            for(var t=str.item.length-1; t>=0; t--){
                var tColor = obj.find(" #colorText_"+(t+1))[0].getBBox();
                var tColorBox = obj.find(" #colorText_"+(t+1)+"_box")[0].getBBox();

                colorText_x -= tColor.width;
                obj.find(" #colorText_"+(t+1)).attr({
                    "x":colorText_x,
                    "y":20
                });
                colorText_x -= tColor.height+5;
                obj.find(" #colorText_"+(t+1)+"_box").attr({
                    "x":colorText_x,
                    "y":20-(tColor.height*0.8),
                    "width":tColor.height,
                    "height":tColor.height
                });
                colorText_x -= 10;
            }
        }

        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1);
            var cls =  "num_"+(t+1);
            for(var i=0; i<str.data[t].data.length; i++){
                var per = Number(str.data[t].data[i]) / maxH * 100;
                if(isNaN(per)) per = 0;
                if(per > 100) per = 100;
                if(per < 0) per = 0;

                var rw = (((w-30-verticalW)/str.data.length) / 2);
                    rw = (rw > 100) ? 100:rw;
                var rh = (h * (per*0.01));
                
                var rx = (((w-30 - 80)/str.data.length) * t)+(rw/2)+(verticalW/2)+50;
                var ry = (h * ((100 - per)*0.01))+(verticalH/2);

                rw = rw / str.data[t].data.length;
                rx = rx + (rw * i);

                obj.find(" #"+arcIds+"_"+(i+1)).attr("x",rx);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("y",ry);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("width",rw);
                obj.find(" #"+arcIds+"_"+(i+1)).attr("height",rh);

                //animate
                obj.find( ".text_top."+arcIds+"_"+(i+1)).css("opacity",0);
                obj.find( "#"+arcIds+"_"+(i+1))
                    .css({
                        "y":(h+(verticalH/2)),
                        "height":0
                    })
                    .animate({
                        "y":ry,
                        "height":rh
                    },300+(per*10),
                    function(){
                        obj.find(" .text_top."+$(this).attr("id")).css("opacity",1);
                    });
            }

            var rw_t = (((w-30)/str.data.length) / 2);
                rw_t = (rw_t > 100) ? 100:rw_t;
            var rx_t = (((w-30 - 80)/str.data.length) * t)+(rw_t/2)+(verticalW/2)+50;

            var r = obj.find(" #"+arcIds+"_1")[0].getBBox();
            var tx = obj.find(" .text_bottom."+arcIds+"_1")[0].getBBox();
            var tx_x = (rx_t+(rw_t/2))-(tx.width/2);
            obj.find(" .text_bottom."+arcIds+"_1").attr("x",tx_x);

            //tipbox
            var tipbox = 'tipbox_'+(t+1);
            var tb0 = obj.find(" ."+tipbox)[0].getBBox();
            var tb_x = (rx + (r.width) + 10);
            if((tb_x + tb0.width) > w){
                // tb_x = (rx - tb0.width - 10);
                tb_x = tb_x - tb0.width - (((w-30)/str.data.length) / 2) - 20;
            }
            var tb_y = r.y-5;

            obj.find(" ."+tipbox).attr("x",tb_x).attr("y",tb_y).hide();
            obj.find(" ."+tipbox+'_1').attr("x",(tb_x+15)).attr("y",(tb_y+20)).hide();

            for(var i=0; i<str.data[t].data.length; i++){
                tb_y += 55;
                obj.find(" ."+tipbox+'_4_'+(i+1)).attr("x",(tb_x+15)).attr("y",tb_y).hide();
                obj.find(" ."+tipbox+'_5_'+(i+1)).attr("x",(tb_x+15+119)).attr("y",tb_y).hide();
            }
            
        }

        //아래 텍스트 변형
        var maxWidth = 0;
        for(var t=0; t<str.data.length; t++){
            var arcIds = str.id+'_'+(t+1)+'_1';
            var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

            maxWidth += textW;
        }
        if(maxWidth > w){
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1)+'_1';
                var textObj = obj.find(" .text_bottom."+arcIds);
                var boxObj = obj.find(" #"+arcIds);
                textObj.attr({"font-size":"10"});

                var text_w = (((w-30)/str.data.length) / 2);
                    text_w = (text_w > 100) ? 100:text_w;
                var text_x = (((w-30 - 80)/str.data.length) * t)+(text_w)+(verticalW/2)+50 - textObj[0].getBBox().width;
                var text_y = h + verticalH - (textObj[0].getBBox().height * 2) - 20;
                textObj.attr({
                    "x":text_x,
                    "y":text_y
                });
                textObj.attr({
                    "transform":"translate(0,"+(textObj[0].getBBox().height)+") rotate(-45, "+(text_x + textObj[0].getBBox().width)+","+(text_y - textObj[0].getBBox().height)+")"
                });
            }
        }


        // line
        if(str.data2 !== undefined){
            obj.find(" .line2").on("mouseenter",function(){
                var str = $(this).attr("id").split("_");
                    str = str[0]+"_"+str[1]+"_"+str[2]+"_"+str[3];
                obj.find(" [class*='line_tipbox_']").hide();
                obj.find(" ."+str).show();
                // obj.find(" #"+str+".bong.line").css("fill-opacity","1");
            });
            obj.find(" .line2").on("mouseout",function(){
                // obj.find(" .bong.line").css("fill-opacity","0.4");
                obj.find(" [class*='line_tipbox_']").hide();
            });


            var q = 8;
            for(var t=0; t<str.data2.length; t++){
                var arcIds = "line_"+str.id+'_'+(t+1);
                var cls =  "num_"+(t+1);
                var points = "";
                for(var i=0; i<str.data2[t].data.length; i++){
                    var per = Number(str.data2[t].data[i]) / maxH2 * 100;
                    if(isNaN(per)) per = 0;
                    if(per > 100) per = 100;
                    if(per < 0) per = 0;

                    var rw = (((w-30)/str.data2.length) / 2);
                        rw = (rw > 100) ? 100:rw;
                    var rh = (h * (per*0.01));
                    
                    var rx = (((w-30 - 80)/str.data2.length) * t)+(rw/2)+(verticalW/2)+50;
                    var ry = ((h/2) * ((100 - per)*0.01))+(verticalH/2);

                        rx = rx+(rw/2)-(q/2);
                        ry = ry-(q/2);

                    obj.find(" #"+arcIds+"_"+(i+1)).attr("x",rx);
                    obj.find(" #"+arcIds+"_"+(i+1)).attr("y",ry);
                    obj.find(" #"+arcIds+"_"+(i+1)).attr("width",q);
                    obj.find(" #"+arcIds+"_"+(i+1)).attr("height",q);
                }

                //tipbox
                var tipbox = 'line_tipbox_'+(t+1);
                var tb0 = obj.find(" ."+tipbox)[0].getBBox();
                var tb_x = (rx + (r.width) + 10);
                if((tb_x + tb0.width) > w){
                    tb_x = tb_x - tb0.width - (((w-30)/str.data.length) / 2) - 20;
                }
                var tb_y = r.y-5;

                obj.find(" ."+tipbox).attr("x",tb_x).attr("y",tb_y).hide();
                obj.find(" ."+tipbox+'_1').attr("x",(tb_x+15)).attr("y",(tb_y+20)).hide();

                for(var i=0; i<str.data2[t].data.length; i++){
                    tb_y += 55;
                    obj.find(" ."+tipbox+'_4_'+(i+1)).attr("x",(tb_x+15)).attr("y",tb_y).hide();
                    obj.find(" ."+tipbox+'_5_'+(i+1)).attr("x",(tb_x+15+119)).attr("y",tb_y).hide();
                }            
            }

            //draw_line
            for(var t=0; t<str.data2[0].data.length; t++){
                //draw_line
                var arcIds = "line_"+str.id+'_'+(t+1);
                var points = "";
                for(var i=0; i<str.data2.length; i++){
                    var arcIds_clone = "line_"+str.id+'_'+(i+1)+'_'+(t+1);
                    var bx = obj.find( "#"+arcIds_clone)[0].getBBox();
                    
                    points += (bx.x+(q/2))+","+(bx.y+(q/2))+" ";
                }

                obj.find(" .draw_line."+arcIds).attr("points",points);
                obj.find(" .draw_line."+arcIds).css({"opacity":1,"stroke-dasharray":"2000px","stroke-dashoffset":"2000px"});
                obj.find(" .draw_line."+arcIds)
                    .delay(t*300)
                    .animate({
                        "opacity":1,
                        "stroke-dashoffset":0+"px"
                    },(obj.width()*4)
                );
            }
        }

        
        this.resize(obj,str,b,a);
    },
    resize:function(obj,str,b,a){
        $(window).resize(function(){
            var re_w = (obj.innerWidth() < 10) ? 10 : obj.innerWidth();
            //var re_h = ((b*re_w)/a) + verticalH;
            var re_h = (a===b) ? re_w:((b*re_w)/a);
            //높이값이 부모값을 넘길시 재조정
            // if((re_h > obj.parent().height()) && (obj.parent().height() > 0)){
            //     re_h = obj.parent().height();
            //     re_w = ((a*re_h)/b);
            // }
            obj.find(">svg")
                .attr("width",re_w)
                .attr("height",re_h);
            
        });
        $(window).trigger("resize");
    },
    init:function(){
        var gr = $('[data-skin="graph"]');
        var _this = this;
        for(var i=0; i<gr.length; i++){
            _this.json(gr.eq(i));
        }
        gr.find(">input").on("change",function(){_this.json($(this).parent());});
        gr.find(">select").on("change",function(){_this.json($(this).parent());});        
    }
}
$(function(){
    _graph.init();
});