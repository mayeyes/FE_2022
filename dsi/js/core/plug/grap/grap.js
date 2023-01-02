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
	var d = ["M", x, y, "L", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y, "z"].join(" ");
	return d;       
}

function js_grap_svg(str){
	//console.log(str);
	var obj = $(".js_grap#"+str.id);

	var svgs = "";
	var allCnt = 0;
	var ids = "svg_"+str.id;
	var w = Number(str.widths);
	var h = Number(str.heights);

	if(str.data.length > 0){
		//원형
		if(str.type=="pie"){
			//set
			h = Math.min(w,h);
			var verticalH = 40;//여백
			if(!str.caption) verticalH = 0;
			var bgColor = "";
			var bdColor = "";
			if(str.backgroundColors && str.backgroundColors != "") bgColor = "background-color:"+str.backgroundColors+";";
			if(str.borderColors && str.borderColors != "") bdColor = "border:1px solid "+str.borderColors+";";
			svgs = '<svg id="'+ids+'" style="width:100%; min-height:200px" viewbox="0 0 '+w+' '+(h+verticalH)+'" style="'+bgColor+' '+bdColor+'">';
			svgs += '<text font-size="14" font-weight="600" class="titles">'+str.names+'</text>';
			for(var t=0; t<str.data.length; t++){
				var arcIds = str.id+'_'+(t+1);
				var cls =  "num_"+(t+1);
				var fills =  str.color[t];
				var rect_size = 10;
				svgs += '<path id="'+arcIds+'" class="'+cls+'" fill="'+fills+'"></path>';
				if(str.caption){
					svgs += '<rect width="'+rect_size+'" height="'+rect_size+'" class="caption_bottom '+arcIds+'" fill="'+fills+'"></rect>';
					svgs += '<text font-size="10" fill="#000" class="caption_bottom '+arcIds+'">'+str.title[t]+'</text>';
				}

				allCnt += Number(str.data[t]);
			}

			for(var t=0; t<str.data.length; t++){
				var arcIds = str.id+'_'+(t+1);
				var cls =  "num_"+(t+1);
				var fills =  str.color[t];
				var fills_text =  "#fff";
				if(str.textOver) fills_text =  "#000";
				var tx = w * (((100/str.data.length)*t)*0.01);
				var rect_size = 12;
				var font_size = 11;
				if(str.textOver) font_size = 9;
				svgs += '<text font-size="'+font_size+'" x="'+(tx+rect_size+5)+'" y="'+(w)+'" fill="'+fills_text+'" class="val_'+cls+'">';
				
				if(str.textTitle && str.textData){
					svgs += str.title[t]+"("+str.data[t]+str.unit+")";
				} else {
					if(str.textTitle) svgs += str.title[t];
					if(str.textData) svgs += str.data[t]+str.unit;
				}
				svgs += '</text>';
				svgs += '<line stroke-width="0.5" stroke="#000" class="lines_'+cls+'" />';
			}

			//도넛
			if(str.shape=="type_02"){
				svgs += '<circle cx="'+(w/2)+'" cy="'+(w/2)+'" r="'+(w/7)+'" style="fill:rgb(255,255,255);" />';
			}
			svgs += '</svg>';
			obj.append(svgs);

			if(str.textOver){
				var textMaxWidth = 0;
				for(var t=0; t<str.data.length; t++){
					var cls = "num_"+(t+1);
					var textbox = obj.find(" .val_"+cls)[0].getBBox();
					textMaxWidth = Math.max(textbox.width,textMaxWidth);
				}
				verticalH = textMaxWidth+60;
			}


			//view
			var cntX = -90;
			var cntW = 0;
			if(str.namesView){
				var title_box = obj.find(" .titles")[0].getBBox();
				obj.find(" .titles").attr("x",((w-title_box.width)/2));
				obj.find(" .titles").attr("y",25);
			} else {
				obj.find(" .titles").remove();
			}
			for(var t=0; t<str.data.length; t++){
				var arcIds = str.id+'_'+(t+1);
				var cls = "num_"+(t+1);
				var vals = str.data[t] / allCnt * 100;
					vals = (360 * (vals*0.01))-90;

				cntW += vals;
				//document.getElementById(arcIds).setAttribute("d", describeArc((w/2), (h/2), (w/2), cntX, cntW));
				obj.find(" #"+arcIds).attr("d",describeArc((w/2), (h/2), (w/2)-verticalH, cntX, cntW));


				var com = cntX;

				cntW += 90;
				vals += 90;
				if(vals < 0) vals = vals*-1;
				cntX = cntX+vals;

				var tx = obj.find(" .val_"+cls)[0].getBBox();

				var com2 = com + (vals/2);
				var com3 = com + (vals/2);

				if(!str.textOver){
					if(str.shape=="type_02"){
						com2 = polarToCartesian((w/2), (h/2), (w/4)-(verticalH/2)+((w/7)/2), com2);
					} else {
						com2 = polarToCartesian((w/2), (h/2), (w/4)-(verticalH/2), com2);
					}
				} else {
					if(t%2==0){
						com2 = polarToCartesian((w/2), (h/2), (w/2)-(verticalH-18), com2);
					} else {
						com2 = polarToCartesian((w/2), (h/2), (w/2)-(verticalH-35), com2);
					}
					com3 = polarToCartesian((w/2), (h/2), (w/2)-(verticalH), com3);
					/*
					com2 = polarToCartesian((w/2), (h/2), (w/2)-(verticalH-10), com2);
					*/
				}

				if(!str.textOver){
					obj.find(" .val_"+cls).attr("x",com2.x-(tx.width/2));
					obj.find(" .val_"+cls).attr("y",com2.y+(tx.height/2));
				} else {
					if((com+(vals/2)) <= 90){
						obj.find(" .val_"+cls).attr("x",com2.x);
					} else {
						obj.find(" .val_"+cls).attr("x",com2.x-tx.width);
					}
					obj.find(" .val_"+cls).attr("y",com2.y+(tx.height/2));
					obj.find(" .val_"+cls).attr("transform","translate(0) rotate(0 "+com2.x+" "+com2.y+")");

					//line
					obj.find(" .lines_"+cls).attr("x1",com2.x);
					obj.find(" .lines_"+cls).attr("y1",com2.y);
					obj.find(" .lines_"+cls).attr("x2",com3.x);
					obj.find(" .lines_"+cls).attr("y2",com3.y);
				}
				/*
				if(!str.textOver){
					obj.find(" .val_"+cls).attr("x",com2.x-(tx.width/2));
					obj.find(" .val_"+cls).attr("y",com2.y+(tx.height/2));
				} else {
					obj.find(" .val_"+cls).attr("x",com2.x);
					obj.find(" .val_"+cls).attr("y",com2.y+(tx.height/2));

					obj.find(" .val_"+cls).attr("transform","translate(0) rotate("+(com+(vals/2))+" "+com2.x+" "+com2.y+")");
				}
				*/
			}

			
			if(str.caption){
				var caption_bottom_x = 0;
				for(var t=0; t<str.data.length; t++){
					var arcIds = str.id+'_'+(t+1);
					var rcx = obj.find(" rect.caption_bottom."+arcIds)[0].getBBox();
					var tcx = obj.find(" text.caption_bottom."+arcIds)[0].getBBox();
					caption_bottom_x += rcx.width+5+tcx.width+10;
				}
				var rtAll = 0;
				for(var t=0; t<str.data.length; t++){
					var arcIds = str.id+'_'+(t+1);
					var rect_size = 12;
					var rcx = obj.find(" rect.caption_bottom."+arcIds)[0].getBBox();
					var tcx = obj.find(" text.caption_bottom."+arcIds)[0].getBBox();
					
					obj.find(" rect.caption_bottom."+arcIds).attr("x",((w-caption_bottom_x)/2)+rtAll);
					obj.find(" rect.caption_bottom."+arcIds).attr("y",(h-rect_size-15+3));
					obj.find(" text.caption_bottom."+arcIds).attr("x",((w-caption_bottom_x)/2)+rtAll+rect_size+2);
					obj.find(" text.caption_bottom."+arcIds).attr("y",(h-15));
				
					rtAll += rcx.width+5+tcx.width+10;
				}
			}
		

		//라인
		} else if(str.type=="line"){
			//set
			var maxH = 0;
			var verticalH = 110;
			var verticalW = 40;
			var bgColor = "";
			var bdColor = "";
			h = h-verticalH;
			if(str.backgroundColors && str.backgroundColors != "") bgColor = "background-color:"+str.backgroundColors+";";
			if(str.borderColors && str.borderColors != "") bdColor = "border:1px solid "+str.borderColors+";";
			svgs = '<svg id="'+ids+'" style="width:100%; min-height:200px" viewbox="0 0 '+w+' '+(h+verticalH)+'" style="'+bgColor+' '+bdColor+'">';
			svgs += '<text font-size="14" font-weight="600" class="titles">'+str.names+'</text>';
			for(var t=0; t<str.data.length; t++){
				var maxH_val = 0;
				if(Array.isArray(str.data[t])){
					for(var r=0; r<str.data[t].length; r++){
						maxH_val += Number(str.data[t][r]);
					}
				} else {
					maxH_val = Number(str.data[t]);
				}
				maxH = Math.max(maxH_val,maxH);
			}
			var maxH_save = maxH;

			//bg
			if(str.unit == "%" && str.shape != "type_02") maxH = 100;
			var tVal = 5;
			var y1 = (h * (2 / (tVal*2)));
			for(var t=0; t<tVal; t++){
				var lineVal = (maxH-((maxH/tVal)*(t+1)));
					lineVal = parseInt(lineVal);
				if(t==0){
					lineVal = maxH;
					lineVal = parseInt(lineVal);
					svgs += '<g fill="#000">';
					svgs += '<line x1="'+(verticalW/2)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW/2))+'" y2="'+(verticalH/2)+'" stroke-width="0.3" stroke="#ccc" />';
					svgs += '<text font-size="10" x="'+(verticalW/2)+'" y="'+(verticalH/2)+'">'+lineVal+'</text>';
					svgs += '</g>';
				}
				lineVal = (maxH-((maxH/tVal)*(t+1)));
				lineVal = parseInt(lineVal);
				svgs += '<g fill="#000">';
				svgs += '<line x1="'+(verticalW/2)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW/2))+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.3" stroke="#ccc" id="bg_line_'+(t+1)+'" />';
				svgs += '<text font-size="10" x="'+(verticalW/2)+'" y="'+((y1*(t+1))+(verticalH/2))+'">'+lineVal+'</text>';
				svgs += '</g>';
			}
			
			

			for(var t=0; t<str.data.length; t++){
				var arcIds = str.id+'_'+(t+1);
				var cls =  "num_"+(t+1);
				var fills =  str.color[t];
				if(Array.isArray(str.data[t])){
					for(var r=0; r<str.data[t].length; r++){
						if(str.color[t] != undefined && str.color[t][r]) fills =  str.color[t][r];
						else fills =  "#000";
						svgs += '<rect id="'+arcIds+'_'+(r+1)+'" class="'+cls+'" rx="0" ry="0" fill="'+fills+'"></rect>';
					}
					for(var r=0; r<str.data[t].length; r++){
						svgs += '<text font-size="11" x="0" y="20" fill="#fff" class="text_top '+arcIds+'_'+(r+1)+' '+cls+'">'+str.data[t][r]+str.unit+'</text>';
					}
				} else {
					svgs += '<rect id="'+arcIds+'" class="'+cls+'" rx="5" ry="5" fill="'+fills+'"></rect>';
					svgs += '<text font-size="11" x="0" y="20" fill="#ccc" class="text_top '+arcIds+' '+cls+'">';
					if(str.unit == "%"){
						var setT = Number(str.data[t]) / maxH_save * 100;
							setT = setT.toFixed(2);
							setT = setT.replace(".00","");
						svgs += setT;
					} else {
						svgs += str.data[t];
					}
					svgs += '</text>';
				}
				svgs += '<text font-size="11" x="0" y="'+(h+(verticalH/2)+20)+'" fill="#000" class="text_bottom '+arcIds+' '+cls+'">'+str.title[t]+'</text>';
			}
			if(str.titleGroup){
				for(var t=0; t<str.titleGroup.length; t++){
					var arcIds = str.id+'_'+(t+1);
					var fills =  str.color[0][t];
					var rect_size = 10;
					if(str.caption){
						svgs += '<rect width="'+rect_size+'" height="'+rect_size+'" class="caption_bottom '+arcIds+'" fill="'+fills+'"></rect>';
						svgs += '<text font-size="10" fill="#000" class="caption_bottom '+arcIds+'">'+str.titleGroup[t]+'</text>';
					}
				}
			}
			if(str.unit != "") svgs += '<text font-size="11" x="'+w+'" y="'+((verticalH/2)-10)+'" fill="#555" class="text_unit">[단위 : '+str.unit+']</text>';
			svgs += '</svg>';
			obj.append(svgs);


			//view
			w = w-verticalW;
			if(str.unit == "%" && str.shape != "type_02") maxH = h;
			if(str.namesView){
				var title_box = obj.find(" .titles")[0].getBBox();
				obj.find(" .titles").attr("x",(((w-30)-title_box.width)/2)+30);
				obj.find(" .titles").attr("y",25);
			} else {
				obj.find(" .titles").remove();
			}
			for(var t=0; t<str.data.length; t++){

				if(str.unit != ""){
					var unitObj = obj.find(" .text_unit")[0].getBBox();
					obj.find(" .text_unit").attr("x",w-unitObj.width+(verticalW/2));
				}
				if(Array.isArray(str.data[t])){
					//그룹
					var allh=0;
					for(var r=0; r<str.data[t].length; r++){
						allh += Number(str.data[t][r]);
					}

					var ry = 0;
					for(var r=0; r<str.data[t].length; r++){
						var arcIdsG = str.id+'_'+(t+1)+'_'+(r+1);
						var per = Number(str.data[t][r]) / maxH * 100;
						if(isNaN(per)) per = 0;

						var rw = (((w-30)/str.data.length) / 2);
						var rh = (h * (per*0.01));
						var rx = (((w-30)/str.data.length) * t)+(rw/2)+(verticalW/2)+30;
						//var ry = (allh * ((100 - per)*0.01))+(verticalH/2);
						if(ry == 0){
							ry = (h * ((100 - per)*0.01))+(verticalH/2);
						} else {
							ry = ry-rh;
						}
						
						obj.find(" #"+arcIdsG).attr("x",rx);
						obj.find(" #"+arcIdsG).attr("y",ry);
						obj.find(" #"+arcIdsG).attr("width",rw);
						obj.find(" #"+arcIdsG).attr("height",rh);

						var rG = obj.find(" #"+arcIdsG)[0].getBBox();
						var tx2 = obj.find(" .text_top."+arcIdsG)[0].getBBox();
						var tx2_x = (rG.x+(rG.width/2))-(tx2.width/2);
						var tx2_y = (rG.y+(rG.height/2))+7;
						obj.find(" .text_top."+arcIdsG).attr("x",tx2_x);
						obj.find(" .text_top."+arcIdsG).attr("y",tx2_y);

						//animate
						obj.find(" .text_top."+arcIdsG).css("opacity",0);
						obj.find(" #"+arcIdsG)
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
					
					var arcIds = str.id+'_'+(t+1);
					var r = obj.find(" #"+arcIds+"_1")[0].getBBox();
					var tx = obj.find(" .text_bottom."+arcIds)[0].getBBox();
					var tx_x = (r.x+(r.width/2))-(tx.width/2);

					obj.find(" .text_bottom."+arcIds).attr("x",tx_x);

				} else {
					//싱글
					var arcIds = str.id+'_'+(t+1);
					var cls =  "num_"+(t+1);
					var per = Number(str.data[t]) / maxH * 100;
					if(isNaN(per)) per = 0;
					//if(str.unit == "%") per = Number(str.data[t]);

					var rw = (((w-30)/str.data.length) / 2);
					var rh = (h * (per*0.01));
					var rx = (((w-30)/str.data.length) * t)+(rw/2)+(verticalW/2)+30;
					var ry = (h * ((100 - per)*0.01))+(verticalH/2);

					obj.find(" #"+arcIds).attr("x",rx);
					obj.find(" #"+arcIds).attr("y",ry);
					obj.find(" #"+arcIds).attr("width",rw);
					obj.find(" #"+arcIds).attr("height",rh);
				


					var r = obj.find(" #"+arcIds)[0].getBBox();
					var tx = obj.find(" .text_bottom."+arcIds)[0].getBBox();
					var tx_x = (r.x+(r.width/2))-(tx.width/2);
					obj.find(" .text_bottom."+arcIds).attr("x",tx_x);
					//obj.find(" .text_bottom."+arcIds).attr("y",tx.y+30);
					//obj.find(" .text_bottom."+arcIds).attr("transform","rotate(-45, 50,100)");




					var tx2 = obj.find(" .text_top."+arcIds)[0].getBBox();
					var tx2_x = (r.x+(r.width/2))-(tx2.width/2);
					var tx2_y = r.y-5;
					obj.find(" .text_top."+arcIds).attr("x",tx2_x);
					obj.find(" .text_top."+arcIds).attr("y",tx2_y);


					//animate
					obj.find( ".text_top."+arcIds).css("opacity",0);
					obj.find( "#"+arcIds)
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
				
			}


			//아래 텍스트 변형
            var maxWidth = 0;
			var textGap = 20;
			var textMaxWidth = 0;
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1);
                var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

				maxWidth += textW+textGap;
				textMaxWidth = Math.max(textMaxWidth,textW);
            }
            if(maxWidth > w){
                for(var t=0; t<str.data.length; t++){
                    var arcIds = str.id+'_'+(t+1);
                    var textObj = obj.find(" .text_bottom."+arcIds);
                    var boxObj = obj.find(" #"+arcIds);
					
					textObj.attr({"font-size":"7"});
                    textObj.attr({
						"x":((boxObj[0].getBBox().x + (boxObj[0].getBBox().width/2)) - textObj[0].getBBox().width),
						"y":(boxObj[0].getBBox().y + (textObj[0].getBBox().height/2))
					});
					textObj.attr({
                        "transform":"translate("+((textObj[0].getBBox().height - 10) * -1)+",5) rotate(-45, "+(boxObj[0].getBBox().x)+", "+(boxObj[0].getBBox().y + (textObj[0].getBBox().height/2))+")"
                    });
                }
            }


			if(str.titleGroup){
				if(str.caption){
					var caption_bottom_x = 0;
					for(var t=0; t<str.titleGroup.length; t++){
						var arcIds = str.id+'_'+(t+1);
						var rcx = obj.find(" rect.caption_bottom."+arcIds)[0].getBBox();
						var tcx = obj.find(" text.caption_bottom."+arcIds)[0].getBBox();
						caption_bottom_x += rcx.width+5+tcx.width+10;
					}
					var rtAll = 0;
					for(var t=0; t<str.titleGroup.length; t++){
						var arcIds = str.id+'_'+(t+1);
						var rect_size = 12;
						var rcx = obj.find(" rect.caption_bottom."+arcIds)[0].getBBox();
						var tcx = obj.find(" text.caption_bottom."+arcIds)[0].getBBox();
						
						obj.find(" rect.caption_bottom."+arcIds).attr("x",(((w-30)-caption_bottom_x)/2)+rtAll+30);
						obj.find(" rect.caption_bottom."+arcIds).attr("y",(h-rect_size+(verticalH/2)+40+3));
						obj.find(" text.caption_bottom."+arcIds).attr("x",(((w-30)-caption_bottom_x)/2)+rtAll+rect_size+2+30);
						obj.find(" text.caption_bottom."+arcIds).attr("y",(h+(verticalH/2)+40));
					
						rtAll += rcx.width+5+tcx.width+10;
					}
				}
			}
		//포인트형
		} else if(str.type=="point"){
			//set
			var maxH = 0;
			var verticalH = 100;
			var verticalW = 40;
			var bgColor = "";
			var bdColor = "";
			h = h-verticalH;
			if(str.backgroundColors && str.backgroundColors != "") bgColor = "background-color:"+str.backgroundColors+";";
			if(str.borderColors && str.borderColors != "") bdColor = "border:1px solid "+str.borderColors+";";
			svgs = '<svg id="'+ids+'" style="width:100%; min-height:200px" viewbox="0 0 '+w+' '+(h+verticalH)+'" style="'+bgColor+' '+bdColor+'">';
			svgs += '<text font-size="14" font-weight="600" class="titles">'+str.names+'</text>';

			if(str.shape == "type_02"){
				for(var t=0; t<str.data.length; t++){
					for(var r=0; r<str.data[t].length; r++){
						var maxH_val = Number(str.data[t][r]);
						maxH = Math.max(maxH_val,maxH);
					}
				}
			} else {
				for(var t=0; t<str.data.length; t++){
					var maxH_val = Number(str.data[t]);
					maxH = Math.max(maxH_val,maxH);
				}
			}
			var maxH_save = maxH;

			//bg
			if(str.unit == "%") maxH = 100;
			var y1 = (h * 0.2);
			for(var t=0; t<5; t++){
				var lineVal = (maxH-((maxH/5)*(t+1)));
					lineVal = parseInt(lineVal);
				if(t==0){
					lineVal = maxH;
					lineVal = parseInt(lineVal);
					svgs += '<g fill="#000">';
					svgs += '<line x1="'+(verticalW/2)+'" y1="'+(verticalH/2)+'" x2="'+(w-(verticalW/2))+'" y2="'+(verticalH/2)+'" stroke-width="0.3" stroke="#ccc" />';
					svgs += '<text font-size="10" x="'+(verticalW/2)+'" y="'+(verticalH/2)+'">'+lineVal+'</text>';
					svgs += '</g>';
				}
				svgs += '<g fill="#000">';
				svgs += '<line x1="'+(verticalW/2)+'" y1="'+((y1*(t+1))+(verticalH/2))+'" x2="'+(w-(verticalW/2))+'" y2="'+((y1*(t+1))+(verticalH/2))+'" stroke-width="0.3" stroke="#ccc" id="bg_line_'+(t+1)+'" />';
				svgs += '<text font-size="10" x="'+(verticalW/2)+'" y="'+((y1*(t+1))+(verticalH/2))+'">'+lineVal+'</text>';
				svgs += '</g>';
			}
			
			if(str.shape == "type_02"){
				for(var t=0; t<str.data.length; t++){
					for(var r=0; r<str.data[t].length; r++){
						var arcIds = str.id+'_'+(t+1)+'_'+(r+1);
						var fills =  str.color[t];
						svgs += '<line x1="0" y1="" x2="" y2="" stroke-width="1" stroke="'+fills+'" class="draw_line '+arcIds+'" />';
					}
				}
			} else {
				for(var t=0; t<str.data.length; t++){
					var arcIds = str.id+'_'+(t+1);
					svgs += '<line x1="0" y1="" x2="" y2="" stroke-width="1" stroke="#ccc" class="draw_line '+arcIds+'" />';
				}
			}

			
			if(str.shape == "type_02"){
				for(var t=0; t<str.data.length; t++){
					for(var r=0; r<str.data[t].length; r++){
						var arcIds = str.id+'_'+(t+1)+'_'+(r+1);
						var fills =  str.color[t];
						svgs += '<rect id="'+arcIds+'" rx="5" ry="5" stroke="#fff" stroke-width="2" fill="'+fills+'"></rect>';
						svgs += '<text font-size="11" x="0" y="20" fill="#ccc" class="text_top '+arcIds+'">';
						if(str.unit == "%"){
							var setT = Number(str.data[t][r]) / maxH_save * 100;
								setT = setT.toFixed(2);
								setT = setT.replace(".00","");
							svgs += setT;
						} else {
							svgs += str.data[t][r];
						}
						svgs += '</text>';
					}
				}
				for(var t=0; t<str.title.length; t++){
					var arcIds = str.id+'_'+(t+1);
					svgs += '<text font-size="11" x="0" y="'+(h+(verticalH/2)+20)+'" fill="#000" class="text_bottom '+arcIds+'">'+str.title[t]+'</text>';
				}
			} else {
				for(var t=0; t<str.data.length; t++){
					var arcIds = str.id+'_'+(t+1);
					var fills =  str.color[t];
					svgs += '<rect id="'+arcIds+'" rx="5" ry="5" stroke="#fff" stroke-width="2" fill="'+fills+'"></rect>';
					svgs += '<text font-size="11" x="0" y="20" fill="#ccc" class="text_top '+arcIds+'">';
					if(str.unit == "%"){
						var setT = Number(str.data[t]) / maxH_save * 100;
							setT = setT.toFixed(2);
							setT = setT.replace(".00","");
						svgs += setT;
					} else {
						svgs += str.data[t];
					}
					svgs += '</text>';
					svgs += '<text font-size="11" x="0" y="'+(h+(verticalH/2)+20)+'" fill="#000" class="text_bottom '+arcIds+'">'+str.title[t]+'</text>';
				}
			}
			if(str.titleGroup){
				for(var t=0; t<str.titleGroup.length; t++){
					var arcIds = str.id+'_'+(t+1);
					var fills =  str.color[t];
					var rect_size = 10;
					if(str.caption){
						svgs += '<rect width="'+rect_size+'" height="'+rect_size+'" class="caption_bottom '+arcIds+'" fill="'+fills+'"></rect>';
						svgs += '<text font-size="10" fill="#000" class="caption_bottom '+arcIds+'">'+str.titleGroup[t]+'</text>';
					}
				}
			}
			if(str.unit != "") svgs += '<text font-size="11" x="'+(w-(verticalW/2))+'" y="'+((verticalH/2)-10)+'" fill="#555" class="text_unit">[단위 : '+str.unit+']</text>';
			svgs += '</svg>';
			obj.append(svgs);


			//view
			w = w-verticalW;
			if(str.unit == "%") maxH = h;
			if(str.namesView){
				var title_box = obj.find(" .titles")[0].getBBox();
				obj.find(" .titles").attr("x",(((w-30)-title_box.width)/2)+(verticalW/2)+30);
				obj.find(" .titles").attr("y",25);
			} else {
				obj.find(" .titles").remove();
			}

			if(str.unit != ""){
				var unitObj = obj.find(" .text_unit")[0].getBBox();
				obj.find(" .text_unit").attr("x",w-unitObj.width+(verticalW/2));
			}

			if(str.shape == "type_02"){
				for(var t=0; t<str.title.length; t++){
					var arcIds = str.id+'_'+(t+1);
					var r = (((w-30)/str.title.length)*t)+(((w-30)/str.title.length)/2);
					var tx = obj.find(" .text_bottom."+arcIds)[0].getBBox();
					var tx_x = r-(tx.width/2)+(verticalW/2)+30;
					obj.find(" .text_bottom."+arcIds).attr("x",tx_x);
				}
				for(var t=0; t<str.data.length; t++){
					var draw_x1 = 0;
					var draw_y1 = 0;
					var draw_x2 = 0;
					var draw_y2 = 0;
					for(var q=0; q<str.data[t].length; q++){
						arcIds = str.id+'_'+(t+1)+'_'+(q+1);
						var per = Number(str.data[t][q]) / maxH * 100;
						if(isNaN(per)) per = 0;
						//if(str.unit == "%") per = Number(str.data[t]);
						var wn = (w-30)/str.data[t].length;
						var rw = 10;
						var rh = 10;
						var rx = (wn * q)+(wn/2)-(rw/2)+(verticalW/2)+30;
						var ry = (h * ((100 - per)*0.01))+(verticalH/2)-(rh/2);

						obj.find(" #"+arcIds).attr("x",rx);
						obj.find(" #"+arcIds).attr("y",ry);
						obj.find(" #"+arcIds).attr("width",rw);
						obj.find(" #"+arcIds).attr("height",rh);

						var r = obj.find(" #"+arcIds)[0].getBBox();
						var tx2 = obj.find(" .text_top."+arcIds)[0].getBBox();
						var tx2_x = (r.x+(r.width/2))-(tx2.width/2);
						var tx2_y = r.y-5;
						obj.find(" .text_top."+arcIds).attr("x",tx2_x);
						obj.find(" .text_top."+arcIds).attr("y",tx2_y);

						draw_x2 = rx+(rw/2);
						draw_y2 = ry+(rh/2);
						if(q==0){
							draw_x1 = rx+(rw/2);
							draw_y1 = ry+(rh/2);
						}
						obj.find(" .draw_line."+arcIds).attr("x1",draw_x1);
						obj.find(" .draw_line."+arcIds).attr("y1",draw_y1);
						obj.find(" .draw_line."+arcIds).attr("x2",draw_x2);
						obj.find(" .draw_line."+arcIds).attr("y2",draw_y2);

						draw_x1 = draw_x2;
						draw_y1 = draw_y2;

						//animate
						obj.find(" .text_top."+arcIds).css("opacity",0);
						obj.find(" .draw_line."+arcIds).css("opacity",0);
						obj.find(" #"+arcIds)
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
							}
						);

						obj.find(" .draw_line."+arcIds)
							.animate({
								"opacity":0
							},300+(q*100),
							function(){
								$(this).css("opacity",1);
							}
						);

					}
				}
			} else {
				var draw_x1 = 0;
				var draw_y1 = 0;
				var draw_x2 = 0;
				var draw_y2 = 0;
				for(var t=0; t<str.data.length; t++){
					var arcIds = str.id+'_'+(t+1);
					var per = Number(str.data[t]) / maxH * 100;
					if(isNaN(per)) per = 0;
					//if(str.unit == "%") per = Number(str.data[t]);
					var wn = (w-30)/str.data.length;
					var rw = 10;
					var rh = 10;
					var rx = (wn * t)+(wn/2)-(rw/2)+(verticalW/2)+30;
					var ry = (h * ((100 - per)*0.01))+(verticalH/2)-(rh/2);

					obj.find(" #"+arcIds).attr("x",rx);
					obj.find(" #"+arcIds).attr("y",ry);
					obj.find(" #"+arcIds).attr("width",rw);
					obj.find(" #"+arcIds).attr("height",rh);
				

					var r = obj.find(" #"+arcIds)[0].getBBox();
					var tx = obj.find(" .text_bottom."+arcIds)[0].getBBox();
					var tx_x = (r.x+(r.width/2))-(tx.width/2);
					obj.find(" .text_bottom."+arcIds).attr("x",tx_x);

					var tx2 = obj.find(" .text_top."+arcIds)[0].getBBox();
					var tx2_x = (r.x+(r.width/2))-(tx2.width/2);
					var tx2_y = r.y-5;
					obj.find(" .text_top."+arcIds).attr("x",tx2_x);
					obj.find(" .text_top."+arcIds).attr("y",tx2_y);

					draw_x2 = rx+(rw/2);
					draw_y2 = ry+(rh/2);
					if(t==0){
						draw_x1 = rx+(rw/2);
						draw_y1 = ry+(rh/2);
					}
					obj.find(" .draw_line."+arcIds).attr("x1",draw_x1);
					obj.find(" .draw_line."+arcIds).attr("y1",draw_y1);
					obj.find(" .draw_line."+arcIds).attr("x2",draw_x2);
					obj.find(" .draw_line."+arcIds).attr("y2",draw_y2);

					draw_x1 = draw_x2;
					draw_y1 = draw_y2;

					//animate
					obj.find(" .text_top."+arcIds).css("opacity",0);
					obj.find(" .draw_line."+arcIds).css("opacity",0);
					obj.find(" #"+arcIds)
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
						}
					);

					obj.find(" .draw_line."+arcIds)
						.animate({
							"opacity":0
						},300+(t*100),
						function(){
							$(this).css("opacity",1);
						}
					);
					
				}
			}


			if(str.titleGroup){
				if(str.caption){
					var caption_bottom_x = 0;
					for(var t=0; t<str.titleGroup.length; t++){
						var arcIds = str.id+'_'+(t+1);
						var rcx = obj.find(" rect.caption_bottom."+arcIds)[0].getBBox();
						var tcx = obj.find(" text.caption_bottom."+arcIds)[0].getBBox();
						caption_bottom_x += rcx.width+5+tcx.width+10;
					}
					var rtAll = 0;
					for(var t=0; t<str.titleGroup.length; t++){
						var arcIds = str.id+'_'+(t+1);
						var rect_size = 12;
						var rcx = obj.find(" rect.caption_bottom."+arcIds)[0].getBBox();
						var tcx = obj.find(" text.caption_bottom."+arcIds)[0].getBBox();
						
						obj.find(" rect.caption_bottom."+arcIds).attr("x",(((w-30)-caption_bottom_x)/2)+rtAll+30);
						obj.find(" rect.caption_bottom."+arcIds).attr("y",(h-rect_size+(verticalH/2)+40+3));
						obj.find(" text.caption_bottom."+arcIds).attr("x",(((w-30)-caption_bottom_x)/2)+rtAll+rect_size+2+30);
						obj.find(" text.caption_bottom."+arcIds).attr("y",(h+(verticalH/2)+40));
					
						rtAll += rcx.width+5+tcx.width+10;
					}
				}
			}

			//아래 텍스트 변형
            var maxWidth = 0;
			var textGap = 20;
			var textMaxWidth = 0;
            for(var t=0; t<str.data.length; t++){
                var arcIds = str.id+'_'+(t+1);
                var textW = obj.find(" .text_bottom."+arcIds)[0].getBBox().width;

				maxWidth += textW+textGap;
				textMaxWidth = Math.max(textMaxWidth,textW);
            }
            if(maxWidth > w){
                for(var t=0; t<str.data.length; t++){
                    var arcIds = str.id+'_'+(t+1);
                    var textObj = obj.find(" .text_bottom."+arcIds);
                    var boxObj = obj.find(" #"+arcIds);
					
					textObj.attr({"font-size":"7"});
                    textObj.attr({
						"x":((boxObj[0].getBBox().x + (boxObj[0].getBBox().width/2)) - textObj[0].getBBox().width),
						"y":(boxObj[0].getBBox().y + (textObj[0].getBBox().height/2))
					});
					textObj.attr({
                        "transform":"translate("+((textObj[0].getBBox().height - 10) * -1)+",5) rotate(-45, "+(boxObj[0].getBBox().x)+", "+(boxObj[0].getBBox().y + (textObj[0].getBBox().height/2))+")"
                    });
                }
            }
		}
	}

}