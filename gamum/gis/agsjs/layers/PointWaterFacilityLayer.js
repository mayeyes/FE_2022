dojo.provide('agsjs.layers.PointWaterFacilityLayer');
dojo.declare("agsjs.layers.PointWaterFacilityLayer", esri.layers.GraphicsLayer, {
	waterDate : "",
	constructor : function (opts) {
		this.facMapUrl = "DROUGHTWATERFACILITY/MapServer"; 
		
		opts = opts || {};
		
		this.opacity = opts.opacity === undefined ? 1 : opts.opacity;
		this.queryType;
		
		if (opts.id){
			this.id = opts.id;
		}
		if (opts.visible){
			this.visible = opts.visible;
		}
		this.loaded = true;
		this.onLoad(this);
		
		dojo.connect(this, "onMouseOver", this, this._onMouseOverGraphic);
		dojo.connect(this, "onMouseMove", this, this._onMouseMoveGraphic);
		dojo.connect(this, "onMouseOut", this, this._onMouseOutGraphic);
		dojo.connect(this, "onClick", this, this._onClickGraphic);
		//dojo.connect(this, "onVisibilityChange", this, this._onVisibilityChange);
		
		this.symbol1 = new esri.symbol.PictureMarkerSymbol(ctx + "/gis/images/icon/icon_fountainhead_03.png", 25, 25);
		this.symbol2 = new esri.symbol.PictureMarkerSymbol(ctx + "/gis/images/icon/icon_fountainhead_02.png", 25, 25);
		this.symbol3 = new esri.symbol.PictureMarkerSymbol(ctx + "/gis/images/icon/icon_fountainhead_01.png", 25, 25);
		this.symbol4 = new esri.symbol.PictureMarkerSymbol(ctx + "/gis/images/icon/icon_fountainhead_04.png", 25, 25);
		this.symbol5 = new esri.symbol.PictureMarkerSymbol(ctx + "/gis/images/icon/icon_fountainhead_05.png", 25, 25); // 수원 이미지 추가
				
		//this._graphicsDraw();
	},
	_onVisibilityChange : function (visbility) {
		//this._graphicsDraw();
	},
	queryFeature : function (type, cd) {
		this.queryType = type;
		
		var wsIndex =0;
		
		if(this.queryType == "sup1") wsIndex =1;
		else if(this.queryType == "sup2") wsIndex =2;
		else if(this.queryType == "sup3") wsIndex =3;
		else if(this.queryType == "fac1") wsIndex =1;
		else if(this.queryType == "fac2") wsIndex =2;
		else if(this.queryType == "fac3") wsIndex =3;
		
		this.clear();
		var url = ctx + '/menu/dashboard/selectGisSupHjdInfo.do';
		
		if(this.queryType == "fac1" || this.queryType == "fac2" || this.queryType == "fac3"){
			url = ctx + '/menu/m40/selectGisFacHjdInfo.do';
		}
		
		var paramData = {"umd_cd":cd};
		
		$.ajax({
			type : 'GET',
			url : url,
			data : paramData,
			dataType : 'json',
			success : $.scope(this, function (jsonobj) {
				if(jsonobj.data.length > 0)
				{
					//var extent = mainMap.map.extent;
					var extent = mainMap.selectGraphic.geometry.getExtent();
					var centeroid = mainMap.selectGraphic.geometry.getCentroid();
					var resultFeatures = jsonobj.data;
					for(var i = 1 ; i < 4; i++){ // 수원 종류
						var grachics = {0: null, 1:null, 2:null, 3:null};
						if(i == wsIndex){
							$.each(resultFeatures , $.scope(this, function(index , feature){
								if(i == feature.orderindex){
									var p = new Proj4js.Point(feature.pointX, feature.pointY);
									Proj4js.transform(projHash["EPSG:5181"], projHash["EPSG:3857"], p);
									var point = new esri.geometry.Point(p.x, p.y, mainMap.map.spatialReference);
									
									var graphic = new esri.Graphic(point);
									
									var type = "";
									if(feature.factype == 'SUWON'){
										type = "suwon";
									}else if(feature.factype == "ITKPLTCD"){
										type = "intake";
									}else if(feature.factype == "PURPLTCD"){
										type = "filter";
									}else if(feature.factype == "RESCD"){
										type = "reservior";
									}
									
									graphic.setAttributes({ORDERINDEX:feature.orderindex,FACTYPE:feature.factype,HJDCD:feature.hjdcd,FACCD:feature.faccd,FACNM:feature.facnm,LAYER_TYPE : queryType, TYPE : type});
									
									if(extent.xmin > point.x) extent.xmin = point.x;
									if(extent.xmax < point.x) extent.xmax = point.x;
									if(extent.ymin > point.y) extent.ymin = point.y;
									if(extent.ymax < point.y) extent.ymax = point.y;
									
									if(this.queryType == "nosup")
									{
									}
									else
									{
										if(graphic.attributes.FACTYPE == "SUWON") graphic.setSymbol(this.symbol5);
										else if(graphic.attributes.FACTYPE == "ITKPLTCD") graphic.setSymbol(this.symbol1);
										else if(graphic.attributes.FACTYPE == "PURPLTCD") graphic.setSymbol(this.symbol2);
										else if(graphic.attributes.FACTYPE == "RESCD") graphic.setSymbol(this.symbol3);
									}
									
									if(graphic.attributes.FACTYPE == "SUWON") grachics[0] = graphic;
									else if(graphic.attributes.FACTYPE == "ITKPLTCD") grachics[1] = graphic;
									else if(graphic.attributes.FACTYPE == "PURPLTCD") grachics[2] = graphic
									else if(graphic.attributes.FACTYPE == "RESCD") grachics[3] = graphic;
								}
							}));
							
							//계통도 경로
							var pathGeometry = new esri.geometry.Polyline(5181);
							pathGeometry.addPath([new esri.geometry.Point(centeroid.x,centeroid.y)]);
							if(grachics[3] != null) pathGeometry.insertPoint(0, 0, grachics[3].geometry);
							if(grachics[2] != null) pathGeometry.insertPoint(0, 0, grachics[2].geometry);
							if(grachics[1] != null) pathGeometry.insertPoint(0, 0, grachics[1].geometry);
							if(grachics[0] != null) pathGeometry.insertPoint(0, 0, grachics[0].geometry);
							var pathGraphic = new esri.Graphic();
							pathGraphic.setGeometry(pathGeometry);
							//if(i-1 == 0) pathGraphic.setSymbol(new esri.symbol.SimpleLineSymbol("solid", new esri.Color([255,215,0, 1]), 2.5)); //수원
							if(i == 1) pathGraphic.setSymbol(new esri.symbol.SimpleLineSymbol("solid", new esri.Color([255,215,0, 1]), 2.5)); //1수원
							if(i == 2) pathGraphic.setSymbol(new esri.symbol.SimpleLineSymbol("solid", new esri.Color([198,220,154, 1]), 2.5)); //2수원
							if(i == 3) pathGraphic.setSymbol(new esri.symbol.SimpleLineSymbol("solid", new esri.Color([125,224,222, 1]), 2.5)); //3수원
							this.add(pathGraphic);
							
							//취정배 포인트
							if(grachics[0] != null) this.add(grachics[0]);
							if(grachics[1] != null) this.add(grachics[1]);
							if(grachics[2] != null) this.add(grachics[2]);
							if(grachics[3] != null) this.add(grachics[3]);
							
							//선택된 동 포인트
							var gra = new esri.Graphic();
							gra.setGeometry(centeroid);
							gra.setSymbol(this.symbol4);
							gra.setAttributes({"FACNM":mainMap.selectGraphic.attributes.EMD_NM});
							this.add(gra);
						}
					}
					mainMap.map.setExtent(extent.expand(1.2), true);
					$('#'+mainMap.loadingTag).hide();
				}
				this.loaded = true;
				this.onLoad(this);
			})
		});
	},
	_onClickGraphic : function (evt) {
		var selected = evt.graphic;
		if(selected)
		{
			var attr = selected.attributes;
			if(console != undefined) console.log(JSON.stringify(attr));
			//DataPopupShow(attr);
		}
	},
	_onMouseOverGraphic : function (evt) {
		var selected = evt.graphic;
		if(selected) evt.srcElement.style.cursor="pointer";
		
		var attr = evt.graphic.attributes;

		if(attr == undefined) {
			return;
		}

		var title = attr.FACNM;
		$('<p class="tooltip"></p>')
		.text(title)
		.appendTo('body')
		.fadeIn('slow');
	},
	_onMouseMoveGraphic : function (evt) {
		var mousex = evt.pageX + 15; //Get X coordinates
		var mousey = evt.pageY + 10; //Get Y coordinates
		$('.tooltip').css({ top: mousey, left: mousex })
	},
	_onMouseOutGraphic : function(evt)
	{
		this._map.setMapCursor("default");
		$('.tooltip').remove();
	},
	setGraphicVisible : function(grade , visi)
	{
		$.each(this.graphics, function(index , graphic) { 
			var attr = graphic.attributes;
		});
	}
});