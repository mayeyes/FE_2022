var gis_domain = "http://gisportal.water.or.kr";
//var gis_domain = "http://192.168.10.150:6080";
var drought_map_url = gis_domain + "/arcgis/rest/services/DA/";
var print_url = gis_domain + "/arcgis/rest/services/gpservice/ExportWebMap/GPServer/ExportWebMap";

var baseMapUrl = "DROUGHTMAP_2018/MapServer";
var droughtSymbol, droughtUniqueRenderer, textSymbol, initMapExtent;
var nosupSymbol, nosupUniqueRenderer;
var factorySymbol, factoryUniqueRenderer;
var damSymbol , damUniqueRenderer;
var KwaterDroughtMap;

var sd_cd="", sgg_cd="", emd_cd="", queryType="sd";
var sd_nm="", sgg_nm="", emd_nm="";
var xmin=0 ,xmax=0 ,ymin=0 ,ymax=0;
var mainMap;
var towMapList=['28','50','4127','4794','4687','4691','4613'];
var mapDv=null; 
var mapextent="";
var mapExtent = {
	"xmin": 90861,
	"ymin": -35610,
	"xmax": 437221,
	"ymax": 576095,
	"spatialReference" : {wkid : 5181}
};
var towMap_ck=0;
var towMap_cnt=0;
var hide_ck=false;
require([
		"dojo/on",
		"dojo/ready",
		"dojo/parser",
		"esri/map",
		"esri/config",
		"esri/urlUtils",
		"esri/graphic",
		"esri/SpatialReference",
		"esri/dijit/Print",
		
		"esri/arcgis/utils",
		"esri/layers/ArcGISDynamicMapServiceLayer",
		"esri/layers/ArcGISTiledMapServiceLayer",
		"esri/layers/FeatureLayer",
		"esri/layers/GraphicsLayer",
		"esri/layers/WebTiledLayer",
        "esri/layers/LabelClass",
		"esri/layers/ImageParameters",
		
		"esri/symbols/Font",
		"esri/symbols/PictureFillSymbol",
		"esri/symbols/PictureMarkerSymbol",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/TextSymbol",
        "esri/renderers/SimpleRenderer",
		"esri/renderers/ClassBreaksRenderer",
		"esri/renderers/UniqueValueRenderer",
		
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
		Print,
		
		arcgisUtils,
		ArcGISDynamicMapServiceLayer,
		ArcGISTiledMapServiceLayer,
		FeatureLayer,
		GraphicsLayer,
		WebTiledLayer,
		LabelClass,
		ImageParameters,
		
		Font,
		PictureFillSymbol,
		PictureMarkerSymbol,
		SimpleMarkerSymbol,
		SimpleLineSymbol,
		SimpleFillSymbol,
		TextSymbol,
		SimpleRenderer,
		ClassBreaksRenderer,
		UniqueValueRenderer,
		
		Query, QueryTask,
		
		Color,
		
		Extent, Polygon, Point,
		Navigation,

		dom,
		array) {
	ready(function () {	

		parser.parse();
		config.defaults.io.proxyUrl = "/proxy.jsp";

		initMapExtent = new Extent(mapExtent);
		
		textSymbol = new TextSymbol({
			font : new Font("10", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, 900, "Dotum"),
			color : new Color([0, 0, 0, 1])
		});
		//textSymbol.setHaloColor(new Color([255,255,255,1]));
		//textSymbol.setHaloSize(1);
		

	
		droughtSymbol = new SimpleFillSymbol("solid", new SimpleLineSymbol("solid", new Color("#666"), 0.5), new Color([255,255,255,1]));
		droughtUniqueRenderer = new UniqueValueRenderer(droughtSymbol, "DV");
		droughtUniqueRenderer.addValue("a1", new PictureFillSymbol('/images/report/a1.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("a2", new PictureFillSymbol('/images/report/a2.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("a3", new PictureFillSymbol('/images/report/a3.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("a4", new PictureFillSymbol('/images/report/a4.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("a5", new PictureFillSymbol('/images/report/a5.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("a6", new PictureFillSymbol('/images/report/a6.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("a7", new PictureFillSymbol('/images/report/a7.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("a8", new PictureFillSymbol('/images/report/a8.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("a9", new PictureFillSymbol('/images/report/a9.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("a10", new PictureFillSymbol('/images/report/a10.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b1", new PictureFillSymbol('/images/report/b1.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b2", new PictureFillSymbol('/images/report/b2.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b3", new PictureFillSymbol('/images/report/b3.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b4", new PictureFillSymbol('/images/report/b4.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b5", new PictureFillSymbol('/images/report/b5.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b6", new PictureFillSymbol('/images/report/b6.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b7", new PictureFillSymbol('/images/report/b7.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b8", new PictureFillSymbol('/images/report/b8.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b9", new PictureFillSymbol('/images/report/b9.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("b10", new PictureFillSymbol('/images/report/b10.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c1", new PictureFillSymbol('/images/report/c1.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c2", new PictureFillSymbol('/images/report/c2.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c3", new PictureFillSymbol('/images/report/c3.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c4", new PictureFillSymbol('/images/report/c4.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c5", new PictureFillSymbol('/images/report/c5.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c6", new PictureFillSymbol('/images/report/c6.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c7", new PictureFillSymbol('/images/report/c7.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c8", new PictureFillSymbol('/images/report/c8.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c9", new PictureFillSymbol('/images/report/c9.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("c10", new PictureFillSymbol('/images/report/c10.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		droughtUniqueRenderer.addValue("d", new PictureFillSymbol('/images/report/d.png', new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([136,136,136,1]), 0.5), 10, 10));
		
		
		damSymbol = new PictureMarkerSymbol(ctx + "/images/analysisdata/icon_fountainhead_03.png", 20, 20);
		damUniqueRenderer = new UniqueValueRenderer(damSymbol, "FACTYPE");
		damUniqueRenderer.addValue("DAM1", new PictureMarkerSymbol(ctx + "/gis/images/icon/wr27_small.png", 20, 20) );
		damUniqueRenderer.addValue("DAM2", new PictureMarkerSymbol(ctx + "/gis/images/icon/wr26_small.png", 20, 20) );
		damUniqueRenderer.addValue("DAM3", new PictureMarkerSymbol(ctx + "/gis/images/icon/wr25_small.png", 20, 20) );
		damUniqueRenderer.addValue("DAM4", new PictureMarkerSymbol(ctx + "/gis/images/icon/wr23_small.png", 20, 20) );
		damUniqueRenderer.addValue("ITKPLTCD", new PictureMarkerSymbol(ctx + "/images/analysisdata/icon_fountainhead_03.png", 20, 20) );
		damUniqueRenderer.addValue("PURPLTCD", new PictureMarkerSymbol(ctx + "/images/analysisdata/icon_fountainhead_02.png", 20, 20) );

		
		
		KwaterDroughtMap = function () {
			var root = this;
			root.maxOffset = 100;
			root.map, root.graphicLayer,  root.sido,  root.umd, root.labelLayer, root.printer;//root.nosupplyLayer, root.factoryLayer,
			root.damLayer;
			root.CalculateOffset = function(extent) {
				root.map.width = $('#mainMapDiv').width();//지정된 div의 넓이를 못가져와 해당 객채의 넓이를 설정
				root.map.height =$('#mainMapDiv').height();//지정된 div의 길이를 못가져와 해당 객채의 길이를 설정
				root.maxOffset = (extent.getWidth() / root.map.width) * 1;
				console.log(extent.getWidth() + " , " + root.map.width + " , " + root.maxOffset);
				
			};
			root.loadingTag = "";
			root.damLayer = new GraphicsLayer({
			});
			root.damLayer.setRenderer(damUniqueRenderer);
			root.initial = function (target, opts) {
				if(opts.loadingTag != undefined) this.loadingTag = opts.loadingTag;
				
				$('#'+this.loadingTag).show();
				
				this.map = new Map(target, {
					extent : initMapExtent,
					showLabels : true, //very important that this must be set to true! 
					zoom : 0,
					logo : false,
					slider : false,
					autoResize : true
				});
				
				//현재 지도 영역의 지도 offset 계산
				this.CalculateOffset(initMapExtent);
				
				var base = new ArcGISDynamicMapServiceLayer(drought_map_url + baseMapUrl , {opacity : 1, visible:false});
				//this.map.addLayer(base);


				this.graphicLayer = new GraphicsLayer();
				this.graphicLayer.setRenderer(droughtUniqueRenderer);
				
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
						}
					]
				};

				this.sido = new FeatureLayer(featureCollection);
				this.sido.setRenderer(
					new SimpleRenderer(new SimpleFillSymbol("solid", new SimpleLineSymbol("solid", new Color([85,85,85,1]), 1), new Color([85,85,85,0])))
				);
				
				var labelClass = new LabelClass({
					"labelExpressionInfo" : {
						"value" : "{SD_NM}",
						"labelPlacement" : "always-horizontal"
					}
				});
				labelClass.symbol = textSymbol;
				this.sido.setLabelingInfo([labelClass]);
				

				//읍면동 라벨 겹치는 경우 처리 0926 pms 
				//읍면동 라벨  s
				var umdfeatureCollection = {
					"layerDefinition" : null,
					"featureSet" : {
						"features" : [],
						"geometryType" : "esriGeometryPolygon"
					}
				};
				umdfeatureCollection.layerDefinition = {
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
							"name" : "EMD_CD",
							"type" : "esriFieldTypeString",
							"alias" : "EMD_CD",
							"length" : 50
						}, {
							"name" : "EMD_NM",
							"type" : "esriFieldTypeString",
							"alias" : "EMD_NM",
							"length" : 50
						}
					]
				};
	
				this.umd = new FeatureLayer(umdfeatureCollection);
				
				this.umd.setRenderer(
					new SimpleRenderer(new SimpleFillSymbol("solid", new SimpleLineSymbol("solid", new Color([85,85,85,1]), 1.2), new Color([255,255,255,0])))
				);
				
				var umdlabelClass = new LabelClass({
					"labelExpressionInfo" : {
						"value" : "{EMD_NM}",
						"labelPlacement" : "always-horizontal"
					}
				});
				umdlabelClass.symbol = textSymbol;
				this.umd.setLabelingInfo([umdlabelClass]);
	
				//읍면동 라벨  e

				this.labelLayer = new GraphicsLayer();
				
				this.nosupplyLayer = new GraphicsLayer();
				this.nosupplyLayer.setRenderer(nosupUniqueRenderer);
				
				this.factoryLayer = new GraphicsLayer();
				this.factoryLayer.setRenderer(factoryUniqueRenderer);
				
								
				this.map.on("layers-add-result", this.RequestSidoFeatures);
				this.map.addLayers([base, this.graphicLayer, this.sido, this.umd,  this.labelLayer,this.nosupplyLayer, this.factoryLayer,this.damLayer]);
				
				if(sgg_cd!='' && sgg_nm!='') this.InitOnselectSgg(false);
				else if(sd_cd!='' && sd_nm!='') this.InitOnselectSido();
				else this.QueryGraphicLayer("1=1");
			}
			
			root.InitOnselectSido = function() {
				queryType = "sgg";
								
				onChangeSido(sd_cd,sd_nm);
				this.QueryFeatureExtent();
			}
			root.InitOnselectSgg = function(type) {
				//포항시 남구 북구 때문에 시군으로 셋팅하는것으로 수정
				
				if(type){
					queryType = "umd";
					onChangeSgg(sgg_cd,sgg_nm);														
				}else{
					queryType = "sgg";
					onChangeSido(sd_cd,sd_nm);						
				}
						
				this.QueryFeatureExtent();
			}
			
			root.RequestSidoFeatures = function() {
				$.ajax({
					url : "../gis/geodata/ktm/sido.json",
					dataType : "json",
					success : function (jsonobj) {
						if(jsonobj.features.length > 0)
						{
							var resultFeatures = jsonobj.features;
							if (resultFeatures.length == 0) {
								return;
							}
							else
							{
								var features = [];
								$.each(resultFeatures , function(index , feature){
									var polygon = new Polygon(feature.geometry);
									polygon.setSpatialReference(new SpatialReference(5181));
									var graphic = new Graphic(polygon);
									graphic.setAttributes(feature.attributes);
									features.push(graphic);
								});
								mainMap.sido.applyEdits(features, null, null, 
									function(){
										var aaa = 111;
									}, 
									function(){
										var aaa = 111;
									}
								);
								mainMap.sido.refresh();
								mainMap.MapMouseEventSetting();
							}
						}
					}
				});
			}
			root.MapMouseEventSetting = function ()
			{
				this.map.disableClickRecenter();	// None Disallows clicking on a map to center it. 
				this.map.disableDoubleClickZoom();	// None Disallows double clicking on a map to zoom in a level and center the map. 
				this.map.disableKeyboardNavigation();	// None Disallows panning and zooming using the keyboard. 
				this.map.disableMapNavigation();	// None Disallows all map navigation except the slider and pan arrows. 
				this.map.disablePan();	// None Disallows panning a map using the mouse. 
				this.map.disableRubberBandZoom();	// None Disallows zooming in or out on a map using a bounding box. 
				this.map.disableScrollWheelZoom();	// None Disallows zooming in or out on a map using the mouse scroll wheel. 
				this.map.disableShiftDoubleClickZoom();	// None Disallows shift double clicking on a map to zoom in a level and center the map. 
				this.map.disableSnapping();	// None Disables snapping on the map. 
				
				/*
				$("svg > defs").append($(''+
				'<filter filterUnits="userSpaceOnUse" x="0" y="0" width="483" height="576" id="halofilter">'+
				'<feMorphology operator="dilate" radius="1" result="dilated"></feMorphology>'+
				'<feFlood flood-color="rgba(255, 255, 255, 1)"></feFlood>'+
				'<feComposite in2="dilated" operator="in" result="composite"></feComposite>'+
				'<feMerge><feMergeNode in="composite"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>'+
				'</filter>'));
				*/
				$('#'+this.loadingTag).hide();
			}
			//extentDB화 로 인해 extent 조절
			root.Extentsetting = function (){
				
				for(var i=0; i<towMapList.length;i++){
					if(sgg_cd==towMapList[i]){
						if(sgg_cd.length>2){
							mapDv='C';//시군구
						}else{	
							mapDv='M';//특광역시
						}
					}
					
				}
				if(mapDv!=null){
					if(towMap_cnt>0){								
						mapDv='S';
					}else{
						towMap_cnt++;
					}
				}
				if(	mapDv == null){
					data= {'code':sgg_cd}
				}else{
					data= {'code':sgg_cd,'dv': mapDv}
				}
		
				
				$.ajax({
					type : 'GET',
					url : ctx + '/menu/dataCollect/selectExtent.do',
					data :data,
					dataType : 'json',
					success :  function (result) {
						xmin = result.data[0].xmin;									
						xmax = result.data[0].xmax;									
						ymin = result.data[0].ymin;									
						ymax = result.data[0].ymax;			
						
						mainMap.QueryFeatureExtent();
						
						if(mapDv=='S'){
							mapDv=null;
							towMap_cnt=0;
							towMap_ck=0;
							hide_ck=true;
						}
					}
				});
				
				
			}
			root.QueryFeatureExtent = function () {
				$('#'+this.loadingTag).show();
				
				var where, url;
				
				
					if(sgg_cd < 100){
						where = "SD_CD ='"+sgg_cd+"'";
						url = drought_map_url + baseMapUrl + "/0/query?";
					}else{
						where = "SGG_CD LIKE'"+sgg_cd+"%'";
						url = drought_map_url + baseMapUrl + "/0/query?";
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
						if(jsonobj.features.length > 0)
						{
							var resultFeatures = jsonobj.features;
							if (resultFeatures.length == 0) {
								$('#'+this.loadingTag).hide();
								return;
							}
							var feature = resultFeatures[0];
							var polygon = new Polygon(feature.geometry);
							var extent = polygon.getExtent().expand(1);
								extent.xmin = xmin-2000;									
								extent.xmax = xmax+2000;									
								extent.ymin = ymin-2000;									
								extent.ymax = ymax+2000;
							
							

							mapextent=extent;
							extent.setSpatialReference(new SpatialReference(5181));
							this.map.setExtent(extent, true);
							
							this.sido.setVisibility(false);

							this.CalculateOffset(extent);
							
								this.QueryGraphicLayer("SGG_CD LIKE '"+sgg_cd+"%'");

						}
					})
				});
			}

			root.QueryGraphicLayer = function(where) {
				var sLayerId = "0";
				/*if(queryType == "sg") sLayerId = "1";
				else if(queryType == "sgg") sLayerId = "2";
				else if(queryType == "umd") sLayerId = "3";*/
				
				$('#'+this.loadingTag).show();
				this.graphicLayer.clear();
				this.labelLayer.clear();
				this.nosupplyLayer.clear();
				this.factoryLayer.clear();
				this.umd.clear();
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
				var dataType = "";
				if(queryType == "sg")
				{
					url = "/gis/geodata/ktm/sg.json";
					dataType = "json";
				}
				else if(queryType == "sgg")
				{
					url = "/gis/geodata/ktm/sgg_"+sd_cd+".json";
					dataType = "json";
				}
				else
				{
					url = url + dojo.objectToQuery(params);
					dataType = "jsonp";
				}
				$.ajax({
					url : url,
					dataType : dataType,
					success : $.scope(this, function (jsonobj) {
						var features = [];
						if(jsonobj.features.length > 0)
						{
							var resultFeatures = jsonobj.features;
							if (resultFeatures.length == 0) {
								$('#'+this.loadingTag).hide();
								return;
							}
							if(this.sido.visible == false)
							{
								var features = [];
								$.each(resultFeatures , function(index , feature){
									var polygon = new Polygon(feature.geometry);
									polygon.setSpatialReference(new SpatialReference(5181));
									var graphic = new Graphic(polygon);
									graphic.setAttributes(feature.attributes);
									features.push(graphic);
								});
								mainMap.umd.applyEdits(features, null, null, 
									function(){
										var aaa = 111;
									}, 
									function(){
										var aaa = 111;
									}
								);
								mainMap.umd.refresh();
							}
							this.CreateGraphicLayer(resultFeatures);
						}
					})
				});
				$('#'+this.loadingTag).hide();
			}

			root.CreateGraphicLayer = function (resultFeatures)
			{
				$.each(resultFeatures , $.scope(this, function(index , feature){
					var polygon = new Polygon(feature.geometry);
						var graphic = new Graphic(polygon);
						feature.attributes.USER_DROUGHT = "";
						graphic.setAttributes(feature.attributes);
						this.graphicLayer.add(graphic);
				
				}));
				$.each(resultFeatures , $.scope(this, function(index , feature){
					var polygon = new Polygon(feature.geometry);
				}));
				
				this.DroughtPolygonHandler();
				this.MapMouseEventSetting();
			}
			
			
			root.DroughtPolygonHandler = function (){

				if(queryType == "umd"){		
					data ={
							"sgg_cd" :sgg_cd
						};
				var url = ctx + '/menu/dataCollect/reportMap.do';
				$.ajax({
					type : 'POST',
					url : url,
					data : data,
					dataType : 'json',
					success : $.scope(this, function (jsonObj) {
						var dataArray = {};								
						var check="";
						$("#suwon_legend").html("");

				
						$.each(jsonObj.data, function(index , record) {
							var hjCd = record.sggcd;
							if(sgg_cd != "") hjCd = record.emdcd;
							dataArray[hjCd] = record.dv;
							if(check!=record.dv){
								check=record.dv;
								var background ="'/images/report/"+check+".png'"
								//수원현황 
								var suwon_level =check.substr(0,1);
								if(suwon_level=='b'){		
									$('#suwon_legend').append('<li style="margin-bottom:10px;"><label id="'+check+'" style="width: 30px; height: 30px;display: table-cell; background: url('+background+'); background-size: 10px;  border: 1px solid black;"></label><span style="padding-left:10px; font-size:20px; display: table-cell;font-weight: bold;">'+record.site1+'+'+record.site2+'</span></li>');							
								}else if(suwon_level=='c'){
									$('#suwon_legend').append('<li style="margin-bottom:10px;"><label id="'+check+'" style="width: 30px; height: 30px;display: table-cell; background: url('+background+'); background-size: 15px; border: 1px solid black;"></label><span style="padding-left:10px; font-size:20px; display: table-cell; font-weight: bold;">'+record.site1+'+'+record.site2+'+'+record.site3+'</span></li>');															
							}else{
								$('#suwon_legend').append('<li style="margin-bottom:10px;"><label id="'+check+'" style="width: 30px; height: 30px; display: table-cell; background: url('+background+');  background-size: 15px; border: 1px solid black;"></label><span style=" padding-left:10px; font-size:20px; display: table-cell;font-weight: bold;">'+record.site1+'</span></li>');
							}
								//$("#"+check).css("background", "url('/images/report/"+check+".png')");

							}
						});
						if(hide_ck==true){
							$('#suwon_legend_div').hide();
							$('#reference_div').hide();
						}else{
							$('#suwon_legend_div').show();						
							$('#reference_div').show();						
						}
					
						
						//지도 컬러링  
						$.each(this.graphicLayer.graphics, function(index , g) {
						
							var hjCd = g.attributes.SGG_CD;
							if(sgg_cd != ""){
								hjCd = g.attributes.HJDCD;
								hjCd=hjCd.substr(0,8);
							}
							
							var dv = dataArray[hjCd];
							if (dv != undefined) {
								g.attributes.DV = dv;
							}else{
								g.setSymbol(droughtSymbol);
							}
						
						});
						
						if(!this.graphicLayer.visible) this.graphicLayer.setVisibility(true);
						this.graphicLayer.redraw();
						
					
						
						$('#'+this.loadingTag).hide();
						if(queryType=='umd'){			
							mainMap.damLayer.clear();
							mainMap.drawSystemFac();
						}
					}),
				
					error : function (XMLHttpRequest, textStatus, errorThrown) {
					}
				});
				}
				
			}
			
			root.refreshMap = function() {
				$('#'+this.loadingTag).show();
				SetDroughtInfo();
				SetDroughtWater();
				
				//this.DroughtPolygonHandler();
				if(queryType == "sg") this.QueryGraphicLayer("1=1");
				else if(queryType == "sgg") this.QueryGraphicLayer("SD_CD='"+sd_cd+"'");
				else if(queryType == "umd") this.QueryGraphicLayer("SGG_CD LIKE '"+sgg_cd+"%'");
			}
			
			root.fullExtent = function() {
				//변수값 설정
				sd_cd = "";
				sd_nm = "";
				sgg_cd = "";
				sgg_nm = "";
				ind_nm = "";
				queryType = "sg";
				$("#queryTitle").html("시군 수");
				
				this.sido.setVisibility(true);
				this.map.setExtent(initMapExtent, true);
				
				this.CalculateOffset(initMapExtent);
				this.QueryGraphicLayer("1=1");
			}
			
			root.init = function (target, opts) {
				this.initial(target, opts);
				return this;
			}
			
			root.setVisibilitySidoLayer = function (visi)
			{
				this.sido.setVisibility(visi);
			}
			// 리포트 다운시 취수장 정수장 표시 0921-pms 
			root.drawSystemFac = function(){
				var url = "/menu/dataCollect/selectSystemFac.do?";
				var params = {
					"sgg_cd" : sgg_cd
				};
				var outside_fac=0;
				var y=0;

				$('#suwon_fac').html("");
				$.ajax({
					url : url + dojo.objectToQuery(params),
					dataType : "json",
					success : $.scope(this, function (jsonobj) {
						
						if(jsonobj.data.length > 0)
						{
							var resultFeatures = jsonobj.data;
							if (resultFeatures.length == 0) {
								$('#'+root.loadingTag).hide();
								return;
							}
							var xmax=mapextent.xmax;
							var xmin=mapextent.xmin;
							var ymax=mapextent.ymax;
							var ymin=mapextent.ymin;
							if(ymin<0){
								y=(ymax+ymin)/5
							}else{
								y=(ymax-ymin)/5
							}
							xmax=xmax+y;
							xmin=xmin-y;
							if(sgg_cd == 28){
								xmin = -12080;
							}
							var background="";

							$.each(resultFeatures , $.scope(this, function(index , feature){
								var p = new Proj4js.Point(feature.pointX, feature.pointY);
								
								for(var i =0;i<resultFeatures.length;i++){
									var compare_feature = resultFeatures[i];
									var minusX=p.x-compare_feature.pointX;
									var minusY=p.y-compare_feature.pointY;
									if(compare_feature.factype==feature.factype){
											if(feature.facnm != compare_feature.facnm){
												if(3800 >= Math.abs(minusX)){//근처 x좌표일때만 

												if(feature.factype=="PURPLTCD"){ //장수장 위아래 조절 
													if(600 >= Math.abs(minusY) ){
														if(p.y>compare_feature.pointY){p.y += 300+minusY;

														}else{ p.y += -300+minusY;
														}	
													}
												}else if(feature.factype=="ITKPLTCD"){
													if(600 >= Math.abs(p.y-compare_feature.pointY) ){
														if(p.y>compare_feature.pointY){p.y += 300+minusY;

														}else{ p.y += -300+minusY;

														}	
													}
												}

												}
											}
										}else{
											
											if(700 >= Math.abs(p.y-compare_feature.pointY)){
											if(feature.factype=="PURPLTCD" && compare_feature.factype=="ITKPLTCD"){ //정수장   위아래 조절 
												if(-2800 <=minusX && 0>= minusX) {
													console.log(feature.facnm+" x"+minusX+" "+compare_feature.facnm);	
													if(p.y>compare_feature.pointY){
														p.y += 300+minusY;
													}else{ p.y += -300+minusY;}	
												}
												
											}else if(feature.factype=="ITKPLTCD" && compare_feature.factype=="PURPLTCD"){//취수장  위아래조절 
												if(2800 >= minusX && 0<=minusY) {
													if(p.y>compare_feature.pointY){
														p.y += 300+minusY;

													}else{ p.y += -300+minusY;
													}	
													}
											}
										}
											
										}
	
								}

								var point = new Point(p.x, p.y, new SpatialReference(5181));
								var graphic = new Graphic(point);
								if(feature.factype == "ITKPLTCD"){
									type = "intake";
									background="'/images/analysisdata/icon_fountainhead_03.png'";
								}else if(feature.factype == "PURPLTCD"){
									type = "filter";
									background="'/images/analysisdata/icon_fountainhead_02.png'";
								}else {
									type ='dam';
								}
								//관할지역외 시설물- extent 벋어난 시설물 판별   
								if(xmax<feature.pointX){
									 outside_fac=1;
									 if(type == "filter"){
										 $('#suwon_fac').append('<li style="margin:10px;"><label style="width: 25px; height: 25px;margin-bottom:0px; display: table-cell;background: url('+background+');background-size: cover;"></label><span style="padding-left:10px; color:rgb(102 0 102);display: table-cell; font-size: 16px; font-weight: bold; ">'+feature.facnm+'</span></li>');							
									 }else if(type == "intake"){										 
										 $('#suwon_fac').prepend('<li style="margin:10px;"><label style="width: 25px; height: 25px;margin-bottom:0px; display: table-cell;background: url('+background+');background-size: cover;"></label><span style="padding-left:10px; color:rgb(0 0 255);display: table-cell; font-size: 16px;font-weight: bold; ">'+feature.facnm+'</span></li>');							
									 }
								}else if(xmin>feature.pointX) {
									 outside_fac=1;
									 if(type == "filter"){
										 $('#suwon_fac').append('<li style="margin:10px;"><label style="width: 25px; height: 25px;margin-bottom:0px; display: table-cell;background: url('+background+');background-size: cover;"></label><span style="padding-left:10px; color:rgb(102 0 102);display: table-cell;  font-size: 16px;font-weight: bold; ">'+feature.facnm+'</span></li>');							
									 }else if(type == "intake"){									 
										 $('#suwon_fac').prepend('<li style="margin:10px;"><label style="width: 25px; height: 25px;margin-bottom:0px; display: table-cell;background: url('+background+');background-size: cover;"></label><span style="padding-left:10px; color:rgb(0 0 255);display: table-cell; font-size: 16px;font-weight: bold; ">'+feature.facnm+'</span></li>');							
									 }							
								}else if(ymax<feature.pointY) {
									outside_fac=1;
									 if(type == "filter"){
										 $('#suwon_fac').append('<li style="margin:10px;"><label style="width: 25px; height: 25px;margin-bottom:0px; display: table-cell;background: url('+background+');background-size: cover;"></label><span style="padding-left:10px;  color:rgb(102 0 102);display: table-cell; font-size: 16px;font-weight: bold; ">'+feature.facnm+'</span></li>');							
									 }else if(type == "intake"){									 
										 $('#suwon_fac').prepend('<li style="margin:10px;"><label style="width: 25px; height: 25px;margin-bottom:0px; display: table-cell;background: url('+background+');background-size: cover;"></label><span style="padding-left:10px; color:rgb(0 0 255);display: table-cell; font-size: 16px;font-weight: bold; ">'+feature.facnm+'</span></li>');							
									 }							
								}else if(ymin>feature.pointY) {
									 outside_fac=1;
									 if(type == "filter"){
										 $('#suwon_fac').append('<li style="margin:10px;"><label style="width: 25px; height: 25px;margin-bottom:0px; display: table-cell;background: url('+background+');background-size: cover;"></label><span style="padding-left:10px; color:rgb(102 0 102);display: table-cell; font-size: 16px;font-weight: bold; ">'+feature.facnm+'</span></li>');							
									 }else if(type == "intake"){							 
										 $('#suwon_fac').prepend('<li style="margin:10px;"><label style="width: 25px; height: 25px;margin-bottom:0px;display: table-cell; background: url('+background+');background-size: cover;"></label><span style="padding-left:10px; color:rgb(0 0 255);display: table-cell; font-size: 16px;font-weight: bold; ">'+feature.facnm+'</span></li>');							
									 }							
								}else{
								
								graphic.setAttributes(
										{ORDERINDEX:feature.orderindex,FACTYPE:feature.factype,HJDCD:feature.hjdcd,FACCD:feature.faccd,FACNM:feature.facnm,LAYER_TYPE : queryType, TYPE : type});
							
								root.damLayer.add(graphic);
								
								//var polygon = new Polygon(point);
								var labelField =""
/*									if(type=='intake'){	*/									
										labelField=	"["+feature.facnm+"]";	
							/*		 }else if(type == "intake"){	
										labelField=	"["+feature.facnm+"]";	
									}*/
								//var labelPoint = polygon.getCentroid();
							if(type == "dam"){	
								var labelSymbol = new TextSymbol(labelField, 
										new Font("12", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Dotum"),
										new Color([255, 0, 0, 1])
									);
								labelSymbol.setOffset(0,-25);
							}else if(type=='intake'){			
									var labelSymbol = new TextSymbol(labelField, 
											new Font("12", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Dotum"),
											new Color([0, 0, 255, 1])
										);
									labelSymbol.setOffset(0,12);
									labelSymbol.setHorizontalAlignment("right");
								 }else if(type == "filter"){	
									var labelSymbol = new TextSymbol(labelField, 
											new Font("12", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Dotum"),
											new Color([102, 0, 102, 1])
										);
									labelSymbol.setOffset(0,12);
									labelSymbol.setHorizontalAlignment("left");
								}
								labelSymbol.setHaloColor(new Color([255,255,255,1]));
								labelSymbol.setHaloSize(2);
								//labelSymbol.setHaloSize(1);
								var labelPointGraphic = new Graphic(point, labelSymbol);
								this.labelLayer.add(labelPointGraphic);
								}
							}));
							if(outside_fac>0){
								if(	hide_ck==false){
									$('#suwon_fac_div').show();									
								}else{
									$('#suwon_fac_div').hide();	
								}
							}else{
								$('#suwon_fac_div').hide();
							}
							hide_ck=false;
							executeMapImageExport();
						}

					})
				
				});
			
			}
			
		};
	});
});