var drought_map_url = "//gisportal.water.or.kr/arcgis/rest/services/DA/";
//var drought_map_url = "//192.168.10.150:6080/arcgis/rest/services/DA/";
var baseMapUrl = "DROUGHTMAP_WGS/MapServer";
var droughtSymbol, outlineSymbol, selectedSymbol, droughtUniqueRenderer, textSymbol, initMapExtent, recentMapExtent;
var nosupSymbol, nosupUniqueRenderer;
var factorySymbol, factoryUniqueRenderer;
var KwaterFacilityMap;

var sd_cd="", sgg_cd="", queryType="sg";
var sd_nm="", sgg_nm="";

var mainMap;

var wkid = 102100;
var latestWkid = 3857; 
/*
var mapExtent = {
	xmin: 14007195.0949149 - 200000,
	ymin: 4113223.4899299815,
	xmax: 14421789.536333674 - 200000,
	ymax: 4521702.969085943,
	spatialReference:{
		"wkid": 3857
	}
};
*/
var mapExtent = {
	xmin: 14007195.0949149,
	ymin: 4113223.4899299815,
	xmax: 14421789.536333674,
	ymax: 4521702.969085943,
	spatialReference:{
		"wkid": 3857
	}
};
require([
		"dojo/on",
		"dojo/ready",
		"dojo/parser",
		"esri/map",
		"esri/config",
		"esri/urlUtils",
		"esri/graphic",
		"esri/SpatialReference",
		
		"esri/arcgis/utils",
		"esri/layers/ArcGISDynamicMapServiceLayer",
		"esri/layers/ArcGISTiledMapServiceLayer",
		"esri/layers/FeatureLayer",
		"esri/layers/GraphicsLayer",
		"esri/layers/WebTiledLayer",
        "esri/layers/LabelClass",
		"esri/layers/ImageParameters",
		"esri/layers/TiledMapServiceLayer",
		
		"esri/symbols/Font",
		"esri/symbols/PictureMarkerSymbol",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/TextSymbol",
        "esri/renderers/SimpleRenderer",
		"esri/renderers/ClassBreaksRenderer",
		"esri/renderers/UniqueValueRenderer",
		
		"agsjs/layers/PointWaterFacilityLayer",
		"agsjs/layers/VWorldTiledMapServiceLayer",
		
		"esri/tasks/query", "esri/tasks/QueryTask",
		
        "esri/Color",
		
		"esri/geometry/Extent", "esri/geometry/Polygon", "esri/geometry/Point",
		
		"esri/toolbars/navigation",
		
		"dojo/dom",
		"dojo/_base/array",

		"dojo/domReady!"
	], function (
		on,
		ready,
		parser,
		Map,
		config,
		urlUtils,
		Graphic,
		SpatialReference,
		
		arcgisUtils,
		ArcGISDynamicMapServiceLayer,
		ArcGISTiledMapServiceLayer,
		FeatureLayer,
		GraphicsLayer,
		WebTiledLayer,
		LabelClass,
		ImageParameters,
		TiledMapServiceLayer,
		
		Font,
		PictureMarkerSymbol,
		SimpleMarkerSymbol,
		SimpleLineSymbol,
		SimpleFillSymbol,
		TextSymbol,
		SimpleRenderer,
		ClassBreaksRenderer,
		UniqueValueRenderer,
		
		PointWaterFacilityLayer, VWorldTiledMapServiceLayer,
		
		Query, QueryTask,
		
		Color,
		
		Extent, Polygon, Point,
		Navigation,

		dom,
		array) {
	ready(function () {
		
		
		parser.parse();
		
		initMapExtent = new Extent(mapExtent);
		recentMapExtent = new Extent(mapExtent);
		
		textSymbol = new TextSymbol({
			font : new Font("12", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Dotum"),
			color : new Color([0, 0, 0, 1])
		});
		textSymbol.setHaloColor(new Color([255,255,255,1]));
		textSymbol.setHaloSize(1);
		
		//색상정보!!
		droughtSymbol = new SimpleFillSymbol("solid", new SimpleLineSymbol("solid", new Color([136,136,136,125]), 0.5), new Color([255,255,255,0]));
		outlineSymbol = new SimpleFillSymbol("solid", new SimpleLineSymbol("solid", new Color([255,255,255, 0.6]), 1), new Color([1, 126, 6, 0.5]));
		selectedSymbol = new SimpleFillSymbol("solid", new SimpleLineSymbol("solid", new Color([255,230,0, 1]), 2.5), new Color([255,255,36, 0.4]));
		
		nosupSymbol = new PictureMarkerSymbol(ctx + "/gis/images/icon/nosup_06_non.png", 20, 20);
		nosupUniqueRenderer = new UniqueValueRenderer(nosupSymbol, "decrst");
		nosupUniqueRenderer.addValue("심각", new PictureMarkerSymbol(ctx + "/gis/images/icon/nosup_01_dangerous.png", 20, 20) );
		nosupUniqueRenderer.addValue("경계", new PictureMarkerSymbol(ctx + "/gis/images/icon/nosup_02_alert.png", 20, 20) );
		nosupUniqueRenderer.addValue("주의", new PictureMarkerSymbol(ctx + "/gis/images/icon/nosup_03_warning.png", 20, 20) );
		nosupUniqueRenderer.addValue("관심", new PictureMarkerSymbol(ctx + "/gis/images/icon/nosup_04_attention.png", 20, 20) );
		nosupUniqueRenderer.addValue("정상", new PictureMarkerSymbol(ctx + "/gis/images/icon/nosup_05_normal.png", 20, 20) );
		
		factorySymbol = new PictureMarkerSymbol(ctx + "/gis/images/icon/fac_06_non.png", 20, 20);
		factoryUniqueRenderer = new UniqueValueRenderer(factorySymbol, "decrst");
		factoryUniqueRenderer.addValue("심각", new PictureMarkerSymbol(ctx + "/gis/images/icon/fac_01_dangerous.png", 20, 20) );
		factoryUniqueRenderer.addValue("경계", new PictureMarkerSymbol(ctx + "/gis/images/icon/fac_02_alert.png", 20, 20) );
		factoryUniqueRenderer.addValue("주의", new PictureMarkerSymbol(ctx + "/gis/images/icon/fac_03_warning.png", 20, 20) );
		factoryUniqueRenderer.addValue("관심", new PictureMarkerSymbol(ctx + "/gis/images/icon/fac_04_attention.png", 20, 20) );
		factoryUniqueRenderer.addValue("정상", new PictureMarkerSymbol(ctx + "/gis/images/icon/fac_05_normal.png", 20, 20) );
		
		KwaterFacilityMap = function () {
			var root = this;
			root.maxOffset = 100;
			
			root.map, root.graphicLayer, root.nosupplyLayer, root.factoryLayer, root.sido, root.featureLayer, root.labelLayer;
			
			root.CalculateOffset = function(extent) {
				if(queryType == "umd") root.maxOffset = (extent.getWidth() / root.map.width) * 1;
				else root.maxOffset = (extent.getWidth() / root.map.width) * 1;
			};
			root.loadingTag = "";
			
			root.selectGraphic;
			
			root.initial = function (target, opts) {
				if(opts.loadingTag != undefined) this.loadingTag = opts.loadingTag;
				
				$('#'+this.loadingTag).show();
				
				var lods = [
					{"level" : 1, "resolution" : 1222.99245256249, "scale" : 4622324.434309},
					{"level" : 2, "resolution" : 611.49622628138,  "scale" : 2311162.217155},
					{"level" : 3, "resolution" : 305.748113140558, "scale" : 1155581.108577},
					{"level" : 4, "resolution" : 152.874056570411, "scale" : 577790.554289},
					{"level" : 5, "resolution" : 76.4370282850732, "scale" : 288895.277144},
					{"level" : 6, "resolution" : 38.2185141425366, "scale" : 144447.638572},
					{"level" : 7, "resolution" : 19.1092570712683, "scale" : 72223.819286},
					{"level" : 8, "resolution" : 9.55462853563415, "scale" : 36111.909643}
				];
				this.map = new Map(target, {
					lods: lods,
					extent: initMapExtent,
					showLabels : false, //very important that this must be set to true! 
					zoom:0,
					logo:false,
					slider : false,
					autoResize : true
				});
				var base = new WebTiledLayer("http://" + "xdworld.vworld.kr:8080/2d/Base/201512/{level}/{col}/{row}.png", {
					"copyright": "vworld",
					"id": "Open Cycle Map"
				});
				var hyd = new WebTiledLayer("http://" + "xdworld.vworld.kr:8080/2d/Hybrid/201512/{level}/{col}/{row}.png", {
					"copyright": "vworld",
					"id": "Open Cycle Map"
				});
				var air = new WebTiledLayer("http://" + "xdworld.vworld.kr:8080/2d/Satellite/201301/{level}/{col}/{row}.jpeg", {
					"copyright": "vworld",
					"id": "Open Cycle Map"
				});
				var gray = new WebTiledLayer("http://" + "xdworld.vworld.kr:8080/2d/gray/201512/{level}/{col}/{row}.png", {
					"copyright": "vworld",
					"id": "Open Cycle Map"
				});
				this.map.addLayer(base);
				
				/*
				this.map = new Map(target, {
					extent : initMapExtent,
					showLabels : true, //very important that this must be set to true! 
					zoom : 1,
					logo : false,
					slider : false,
					autoResize : true
				});
				*/
				
				//현재 지도 영역의 지도 offset 계산
				this.CalculateOffset(initMapExtent);
				
				
				var base = new ArcGISDynamicMapServiceLayer(drought_map_url + baseMapUrl , {opacity : 1, visible:false});
				this.map.addLayer(base);
				
				
				this.graphicLayer = new GraphicsLayer();
				this.graphicLayer.setRenderer(
					new SimpleRenderer(droughtSymbol)
				);
				this.map.addLayer(this.graphicLayer);
				
				this.nosupplyLayer = new GraphicsLayer({visible:false});
				this.nosupplyLayer.setRenderer(nosupUniqueRenderer);
				this.map.addLayer(this.nosupplyLayer);
				
				this.factoryLayer = new GraphicsLayer({visible:false});
				this.factoryLayer.setRenderer(factoryUniqueRenderer);
				this.map.addLayer(this.factoryLayer);
				
				//create a feature collection for the flickr photos
				var featureCollection = {
					"layerDefinition" : null,
					"featureSet" : {
						"features" : [],
						"geometryType" : "esriGeometryPolygon"
					}
				};
				featureCollection.layerDefinition = {
					"geometryType" : "esriGeometryPolygon",
					"objectIdField" : "OBJECTID",
					"drawingInfo" : {
						"renderer" : {
							"type" : "simple",
							"symbol" : {
								"type" : "esriPMS",
								"url" : "images/flickr.png",
								"contentType" : "image/png",
								"width" : 15,
								"height" : 15
							}
						}
					},
					"fields" : [{
							"name" : "OBJECTID",
							"type" : "esriFieldTypeOID",
							"alias" : "OBJECTID"
						}, {
							"name" : "SD_CD",
							"type" : "esriFieldTypeString",
							"alias" : "SD_CD",
							"length" : 50
						}, {
							"name" : "SD_NM",
							"type" : "esriFieldTypeString",
							"alias" : "SD_NM",
							"length" : 50
						}, {
							"name" : "SHAPE.AREA",
							"type" : "esriFieldTypeDouble",
							"alias" : "SHAPE.AREA"
						}, {
							"name" : "SHAPE.LEN",
							"type" : "esriFieldTypeDouble",
							"alias" : "SHAPE.LEN"
						}
					]
				};
				/*
				this.sido = new FeatureLayer(drought_map_url + baseMapUrl + "/0", {
					outFields : ["*"],
					maxAllowableOffset: this.maxOffset,
					mode: FeatureLayer.MODE_ONDEMAND
				});
				*/
				this.sido = new FeatureLayer(featureCollection, {
					outFields : ["*"],
					maxAllowableOffset: this.maxOffset,
					mode: FeatureLayer.MODE_ONDEMAND
				});
				this.sido.setRenderer(
					new SimpleRenderer(outlineSymbol)
				);
				var labelClass = new LabelClass({
					"labelExpressionInfo" : {
						"value" : "{SD_NM}",
						"labelPlacement" : "always-horizontal"
					}
				});
				labelClass.symbol = textSymbol;
				this.sido.setLabelingInfo([labelClass]);
				this.map.addLayer(this.sido);
				
				//this.labelLayer = new GraphicsLayer();
				//this.map.addLayer(this.labelLayer);
				
				this.featureLayer = new PointWaterFacilityLayer();
				this.map.addLayer(this.featureLayer);
				
				this.sido.on("click", dojo.hitch(this, function(evt) {
					if (evt.graphic) {
						//변수값 설정
						sd_cd = evt.graphic.attributes.SD_CD;
						sd_nm = evt.graphic.attributes.SD_NM;
						sgg_cd = "";
						sgg_nm = "";
						queryType = "sgg";
						
						//select box 설정
						$('#sidoSelect').val(sd_cd);
						onChangeSido(sd_cd,sd_nm);
					}
				}));
				this.sido.on("mouse-over", dojo.hitch(this, function(evt) {
					var el = evt.srcElement ? evt.srcElement : evt.target;
					if (el.style.cursor != "pointer") {
						el.style.cursor = "pointer";
					}
					var el = evt.srcElement ? evt.srcElement : evt.target;
					if (el.style.cursor != "pointer") {
						el.style.cursor = "pointer";
					}
					var attr = evt.graphic.attributes;
					var title = attr.SD_NM;
					$('<p class="tooltip"></p>')
					.text(title)
					.appendTo('body')
					.fadeIn('slow');
				}));
				this.sido.on("mouse-out", dojo.hitch(this, function(evt) {
					$('.tooltip').remove();					
				}));
				this.sido.on("mouse-move", dojo.hitch(this, function(evt) {
					var mousex = evt.pageX + 15; //Get X coordinates
					var mousey = evt.pageY + 10; //Get Y coordinates
					$('.tooltip').css({ top: mousey, left: mousex })
				}));
				this.sido.on("update-end", dojo.hitch(this, this.MapMouseEventSetting));
				
				this.graphicLayer.on("click", dojo.hitch(this, function(evt) {
					if (evt.graphic) {
						var g = evt.graphic;
						if(queryType == "sgg")
						{
							//변수값 설정
							//sd_cd = "";
							//sd_nm = g.attributes.SD_NM;
							sgg_cd = g.attributes.SGG_CD;
							sgg_nm = g.attributes.SGG_NM;
							queryType = "umd";
							
							//select box 설정
							onChangeSgg(sgg_cd,sgg_nm);
						}else if(queryType == "umd" || queryType == "detail"){
							queryType = "detail";
							var attr = g.attributes;
							onChangeUmd(attr.EMD_CD,attr.EMD_NM);
						}
					}
				}));
				this.graphicLayer.on("mouse-over", dojo.hitch(this, function(evt) {
					var el = evt.srcElement ? evt.srcElement : evt.target;
					if (el.style.cursor != "pointer") {
						el.style.cursor = "pointer";
					}
					var attr = evt.graphic.attributes;
					var title = attr.SGG_NM;
					if(queryType == "umd") title = attr.EMD_NM;
					if(queryType == "detail") title = attr.EMD_NM;
					$('<p class="tooltip"></p>')
					.text(title)
					.appendTo('body')
					.fadeIn('slow');
				}));
				this.graphicLayer.on("mouse-out", dojo.hitch(this, function(evt) {
					$('.tooltip').remove();	
				}));
				this.graphicLayer.on("mouse-move", dojo.hitch(this, function(evt) {
					var mousex = evt.pageX + 15; //Get X coordinates
					var mousey = evt.pageY + 10; //Get Y coordinates
					$('.tooltip').css({ top: mousey, left: mousex })
				}));
				this.graphicLayer.on("update-end", dojo.hitch(this, this.MapMouseEventSetting));
				
				this.nosupplyLayer.on("click", dojo.hitch(this, function(evt) {
					if (evt.graphic) {
						//if(queryType == "detail"){
						if(evt.graphic.attributes.fntdv == "소규모급수시설" ||evt.graphic.attributes.fntdv == "마을상수도"){
							showNonWaterPointInfo(evt.graphic.attributes.pnucd, evt.graphic.attributes.decrst );
						}
					}
				}));
				this.nosupplyLayer.on("mouse-over", dojo.hitch(this, function(evt) {
					var el = evt.srcElement ? evt.srcElement : evt.target;
					if (el.style.cursor != "pointer") {
						el.style.cursor = "pointer";
					}
					var attr = evt.graphic.attributes;
					var title = attr.fntnm + "[" + attr.fntdv + "]";
					$('<p class="tooltip"></p>')
					.text(title)
					.appendTo('body')
					.fadeIn('slow');
					
				}));
				this.nosupplyLayer.on("mouse-out", dojo.hitch(this, function(evt) {
					$('.tooltip').remove();
				}));
				this.nosupplyLayer.on("mouse-move", dojo.hitch(this, function(evt) {
					var mousex = evt.pageX + 15; //Get X coordinates
					var mousey = evt.pageY + 10; //Get Y coordinates
					$('.tooltip').css({ top: mousey, left: mousex })
				}));
				
				this.factoryLayer.on("click", dojo.hitch(this, function(evt) {
					if (evt.graphic) {
						var attr = evt.graphic.attributes;
						var title = attr.industrialName;
						ind_nm = attr.industrialName;
						showIndInfoNm(attr.industrialCode);
					}
				}));
				this.factoryLayer.on("mouse-over", dojo.hitch(this, function(evt) {
					var el = evt.srcElement ? evt.srcElement : evt.target;
					if (el.style.cursor != "pointer") {
						el.style.cursor = "pointer";
					}
					var attr = evt.graphic.attributes;
					var title = attr.industrialName;
					$('<p class="tooltip"></p>')
					.text(title)
					.appendTo('body')
					.fadeIn('slow');
					
				}));
				this.factoryLayer.on("mouse-out", dojo.hitch(this, function(evt) {
					$('.tooltip').remove();
				}));
				this.factoryLayer.on("mouse-move", dojo.hitch(this, function(evt) {
					var mousex = evt.pageX + 15; //Get X coordinates
					var mousey = evt.pageY + 10; //Get Y coordinates
					$('.tooltip').css({ top: mousey, left: mousex })
				}));
				
				$('#'+this.loadingTag).hide();
				//this.QueryGraphicLayer("1=1");
				
				this.RequestSidoFeatures();
			}
			
			root.MapMouseEventSetting = function ()
			{
				//this.map.disableDoubleClickZoom();	// None Disallows double clicking on a map to zoom in a level and center the map. 
				//this.map.disableRubberBandZoom();	// None Disallows zooming in or out on a map using a bounding box. 
				//this.map.disableScrollWheelZoom();	// None Disallows zooming in or out on a map using the mouse scroll wheel. 
				//this.map.disableShiftDoubleClickZoom();	// None Disallows shift double clicking on a map to zoom in a l
				/*
				this.map.disableClickRecenter();	// None Disallows clicking on a map to center it. 
				this.map.disableKeyboardNavigation();	// None Disallows panning and zooming using the keyboard. 
				this.map.disableMapNavigation();	// None Disallows all map navigation except the slider and pan arrows. 
				this.map.disablePan();	// None Disallows panning a map using the mouse. 
				evel and center the map. 
				this.map.disableSnapping();	// None Disables snapping on the map. 
				*/
			}
			root.RequestSidoFeatures = function() {
				$.ajax({
					url : "/gis/geodata/wgs/sido.json",
					dataType : "json",
					success : $.scope(this, function (jsonobj) {
						if(jsonobj.features.length > 0)
						{
							var resultFeatures = jsonobj.features;
							if (resultFeatures.length == 0) {
								return;
							}
							else
							{
								$.each(resultFeatures , $.scope(this, function(index , feature){
									var polygon = new Polygon(feature.geometry);
									polygon.setSpatialReference(new SpatialReference(wkid));
									var graphic = new Graphic(polygon);
									graphic.setAttributes(feature.attributes);
									this.sido.add(graphic);
								}));
							}
						}
					})
				});
			}
			root.QueryFeatureExtent = function () {
				$('#'+this.loadingTag).show();
				
				var where, url;
				if(queryType == "sgg")
				{
					where = "SD_CD='"+sd_cd+"'";
					url = drought_map_url + baseMapUrl + "/0/query?";
				}else if(queryType == "umd")
				{
					where = "SGG_CD='"+sgg_cd+"'";
					url = drought_map_url + baseMapUrl + "/2/query?";
				}
				var params = {
					where : where,
					geometryType : "esriGeometryEnvelope",
					spatialRel : "esriSpatialRelIntersects",
					outFields : "*",
					returnGeometry : true,
					returnTrueCurves : false,
					maxAllowableOffset : this.maxOffset,
					returnIdsOnly : false,
					returnCountOnly : false,
					returnZ : false,
					returnM : false,
					returnDistinctValues : false,
					f : "pjson"
				};
				$.ajax({
					url : url + dojo.objectToQuery(params),
					dataType : "jsonp",
					success : $.scope(this, function (jsonobj) {
						var resultFeatures = jsonobj.features;
						if (resultFeatures.length == 0) {
							$('#'+this.loadingTag).hide();
							return;
						}
						if(jsonobj.features.length > 0)
						{
							var feature = resultFeatures[0];
							var polygon = new Polygon(feature.geometry);
							var extent = polygon.getExtent().expand(1.5);
							extent.setSpatialReference(new SpatialReference(wkid));
							/*
							if(queryType == "umd")
							{
								var wOffset = extent.getWidth() * 0.2;
								extent.xmin -= wOffset;
								extent.xmax -= wOffset;
							}
							*/
							this.map.setExtent(extent, false);
							recentMapExtent = extent;
							
							this.sido.setVisibility(false);
							
							this.CalculateOffset(extent);
							
							if(queryType == "sgg")
							{
								this.QueryGraphicLayer("SD_CD='"+sd_cd+"'");
							}
							else if(queryType == "umd")
							{
								this.QueryGraphicLayer("SGG_CD LIKE '"+sgg_cd+"%'");
							}
						}
						$('#'+this.loadingTag).hide();
					})
				});
			}
			root.QueryGraphicLayer = function(where) {
				var sLayerId = "0";
				if(queryType == "sg") sLayerId = "1";
				else if(queryType == "sgg") sLayerId = "2";
				else if(queryType == "umd") sLayerId = "3";
				
				$('#'+this.loadingTag).show();
				this.graphicLayer.clear();
				this.nosupplyLayer.clear();
				this.factoryLayer.clear();
				var url = drought_map_url + baseMapUrl + "/" + sLayerId + "/query?";
				var params = {
					where : where,
					geometryType : "esriGeometryEnvelope",
					spatialRel : "esriSpatialRelIntersects",
					outFields : "*",
					returnGeometry : true,
					returnTrueCurves : false,
					maxAllowableOffset : this.maxOffset,
					returnIdsOnly : false,
					returnCountOnly : false,
					returnZ : false,
					returnM : false,
					returnDistinctValues : false,
					f : "pjson"
				};
				$.ajax({
					url : url + dojo.objectToQuery(params),
					dataType : "jsonp",
					success : $.scope(this, function (jsonobj) {
						if(jsonobj.features.length > 0)
						{
							var resultFeatures = jsonobj.features;
							if (resultFeatures.length == 0) {
								$('#'+this.loadingTag).hide();
								return;
							}
							this.CreateGraphicLayer(resultFeatures);
						}
					})
				});
				
				if(queryType == "umd") this.QueryNosupplyLayer();
				if(queryType == "umd") this.QueryFactoryLayer();
			}
			root.CreateGraphicLayer = function (resultFeatures)
			{
				$.each(resultFeatures , $.scope(this, function(index , feature){
					var polygon = new Polygon(feature.geometry);
					polygon.setSpatialReference(new SpatialReference(wkid));
					
					var graphic = new Graphic(polygon);
					feature.attributes.USER_DROUGHT = "";
					graphic.setAttributes(feature.attributes);
					
					if(queryType != "sg") graphic.setSymbol(outlineSymbol);
					
					this.graphicLayer.add(graphic);
				}));
				$('#'+this.loadingTag).hide();
				this.MapMouseEventSetting();
			}
			root.QueryLabelLayer = function(where) {
				var sLayerId = "0";
				if(queryType == "sg") sLayerId = "1";
				else if(queryType == "sgg") sLayerId = "1";
				else if(queryType == "umd") sLayerId = "3";
				
				$('#'+this.loadingTag).show();
				//this.labelLayer.clear();
				
				if(this.sido.visible) return;
				
				var url = drought_map_url + baseMapUrl + "/" + sLayerId + "/query?";
				var params = {
					where : where,
					geometryType : "esriGeometryEnvelope",
					spatialRel : "esriSpatialRelIntersects",
					outFields : "*",
					returnGeometry : true,
					returnTrueCurves : false,
					maxAllowableOffset : this.maxOffset,
					returnIdsOnly : false,
					returnCountOnly : false,
					returnZ : false,
					returnM : false,
					returnDistinctValues : false,
					f : "pjson"
				};
				$.ajax({
					url : url + dojo.objectToQuery(params),
					dataType : "jsonp",
					success : $.scope(this, function (jsonobj) {
						if(jsonobj.features.length > 0)
						{
							var resultFeatures = jsonobj.features;
							if (resultFeatures.length == 0) {
								$('#'+this.loadingTag).hide();
								return;
							}
							//this.CreateLabelLayer(resultFeatures);
						}
					})
				});
			}
			root.CreateLabelLayer = function (resultFeatures)
			{
				$.each(resultFeatures , $.scope(this, function(index , feature){
					var polygon = new Polygon(feature.geometry);
					polygon.setSpatialReference(new SpatialReference(wkid));
					
					var labelField = queryType == "sgg"?feature.attributes.SGG_NM:feature.attributes.EMD_NM;
					var labelPoint = polygon.getCentroid();
					var labelSymbol = new TextSymbol(labelField);
					labelSymbol.setColor(new Color("#000"));
					//labelSymbol.setHaloColor(new Color("#fff"));
					//labelSymbol.setHaloSize(1);
					labelSymbol.font.setSize("10pt");
					labelSymbol.font.setFamily("nanumgothic");
					labelSymbol.font.setWeight(Font.WEIGHT_BOLD);
					var labelPointGraphic = new Graphic(labelPoint, labelSymbol);
					this.labelLayer.add(labelPointGraphic);
				}));
				$('#'+this.loadingTag).hide();
				this.MapMouseEventSetting();
			}
			root.QueryNosupplyLayer = function (){
				$('#'+this.loadingTag).show();
				var url = "/menu/m50/droughtNosupplyPosition.do?";
				var params = {
					"hjdcd" : sgg_cd,
					"wr_date" : wr_date
				};
				$.ajax({
					url : url + dojo.objectToQuery(params),
					dataType : "json",
					success : $.scope(this, function (jsonobj) {
						if(jsonobj.length > 0)
						{
							var resultFeatures = jsonobj;
							if (resultFeatures.length == 0) {
								$('#'+this.loadingTag).hide();
								return;
							}
							if(console != undefined) console.log("resultFeatures.length : " + resultFeatures.length);
							$.each(resultFeatures , $.scope(this, function(index , feature){
								var p = new Proj4js.Point(feature.pointX, feature.pointY);
								Proj4js.transform(projHash["EPSG:5181"], projHash["EPSG:3857"], p);
								var point = new Point(p.x, p.y, this.map.spatialReference);
								var graphic = new Graphic(point);
								graphic.setAttributes({fntnm:feature.fntnm,fntdv:feature.fntdv,decrst:feature.decrst,pnucd:feature.pnucd});
								this.nosupplyLayer.add(graphic);
							}));
							this.nosupplyLayer.redraw();
						}
					})
				});
			}
			root.QueryFactoryLayer = function (){
				$('#'+this.loadingTag).show();
				var url = "/menu/m50/droughtFactoryPosition.do?";
				var params = {
					"hjdcd" : sgg_cd,
					"wr_date" : wr_date
				};
				$.ajax({
					url : url + dojo.objectToQuery(params),
					dataType : "json",
					success : $.scope(this, function (jsonobj) {
						if(jsonobj.length > 0)
						{
							var resultFeatures = jsonobj;
							if (resultFeatures.length == 0) {
								$('#'+this.loadingTag).hide();
								return;
							}
							if(console != undefined) console.log("resultFeatures.length : " + resultFeatures.length);
							$.each(resultFeatures , $.scope(this, function(index , feature){
								var p = new Proj4js.Point(feature.pointX, feature.pointY);
								Proj4js.transform(projHash["EPSG:5181"], projHash["EPSG:3857"], p); // Bessel -> WGS 84
								var point = new Point(p.x, p.y, this.map.spatialReference);
								var graphic = new Graphic(point);
								graphic.setAttributes({industrialName:feature.industrialName,industrialCode:feature.industrialCode,decrst:feature.decrst});
								this.factoryLayer.add(graphic);
							}));
							this.factoryLayer.redraw();
						}
					})
				});
			}
			root.fullExtent = function() {
				//변수값 설정
				sd_cd = "";
				sd_nm = "";
				sgg_cd = "";
				sgg_nm = "";
				queryType = "sg";
				
				this.sido.setVisibility(true);
				this.map.setExtent(initMapExtent, true);
				recentMapExtent = initMapExtent;
				
				this.CalculateOffset(initMapExtent);
				this.graphicLayer.clear();
				this.nosupplyLayer.clear();
				this.factoryLayer.clear();
				//this.labelLayer.clear();
			}
			
			root.refresh = function () {
				this.map.resize();
				this.map.reposition();
			}
			
			root.moveToUmd = function (umdcd) {
				$.each(this.graphicLayer.graphics, function(index , g) {
					var hjCd = g.attributes.EMD_CD;
					if (hjCd == umdcd) {
						
						var toExtent = g.geometry.getExtent().expand(1.5);
						/*
						var wOffset = toExtent.getWidth() * 0.2;
						toExtent.xmin -= wOffset;
						toExtent.xmax -= wOffset;
						*/
						mainMap.map.setExtent(toExtent, false);
						queryType = "detail";
						
						if(mainMap.selectGraphic != undefined) mainMap.selectGraphic.setSymbol(outlineSymbol);
						g.setSymbol(selectedSymbol);
						mainMap.selectGraphic = g;
						
						return;
					}
				});
			}
			root.showMapSupInfo = function (type, cd)
			{
				$('#'+this.loadingTag).show();
				this.featureLayer.queryFeature(type, cd);
			}
			root.init = function (target, opts) {
				this.initial(target, opts);
				return this;
			}
			
			root.setVisibilitySidoLayer = function (visi)
			{
				this.sido.setVisibility(visi);
			}
		};
		mainMap = new KwaterFacilityMap().init("mainMapDiv", {loadingTag:"loadingBarMain"});
	});
});
