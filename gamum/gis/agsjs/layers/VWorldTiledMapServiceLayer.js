/**
 * @name VWorld Maps Layer for ArcGIS Server JavaScript API
 * @version 1.1
 * @author: 
 * @fileoverview
 * <p>Use VWorld Maps in application built on ESRI ArcGIS Server JavaScript API and dojo. 
 *  </p>
 */
/*
var vworld_SKYVIEW = new gis.js.VWorldTiledMapServiceLayer({mapType : "Satellite", id : "VWORLD_SKYVIEW", opacity:1});
var vworld_HYBRID = new gis.js.VWorldTiledMapServiceLayer({mapType : "Hybrid", id : "VWORLD_HYBRID", opacity:1});
var vworld_ROADMAP = new gis.js.VWorldTiledMapServiceLayer({mapType : "BaseMap", id : "VWORLD_BASEMAP", opacity:1});
*/
dojo.require("esri.layers.TiledMapServiceLayer");
dojo.provide('agsjs.layers.VWorldTiledMapServiceLayer');
dojo.declare("agsjs.layers.VWorldTiledMapServiceLayer", esri.layers.TiledMapServiceLayer, {
  /**
   * @name VWorldTiledMapServiceLayerOptions
   * @class VWorld 지도를 오버레이하기 위한 클래스
   * @property {String} [mapType] 맵타입 선택 - 지정 안할 경우 기본맵
   * @property {Number} [opacity] opacity (0-1)
   * @property {String} [id] layerId.
   * @property {Boolean} [visible] default visibility
   */
	minX : 13846870.019949863,
	minY : 3884784.7837452833,
	maxX : 14698072.766933357,
	maxY : 4660161.998669902,
	mapType : "",
	constructor: function(opts) {
		opts = opts || {};
		
		this.mapType = opts.mapType===undefined?"BaseMap":opts.mapType;
		this.opacity = opts.opacity===undefined?1:opts.opacity;
		this.visible = opts.visible===undefined?true:opts.visible;
		if(opts.id) this.id = opts.id;
		
		this.spatialReference = new esri.SpatialReference({wkid:3857});
		this.initialExtent = (this.fullExtent = new esri.geometry.Extent(
			(this.minX),
			(this.minY),
			(this.maxX),
			(this.maxY),
			this.spatialReference)
		);
		this.tileInfo = new esri.layers.TileInfo({
			"rows" : 256,
			"cols" : 256,
			//"dpi" : 96,
			//"format" : "PNG32",
			//"compressionQuality" : 0,
			"origin" : {"x":13462700, "y":5322463},
			"spatialReference" : this.spatialReference,
			"center" : [14272471.39344161, 4272473.391207593],
			"lods" : [
				{ "level": 0, "resolution": 1222.99245256249, "scale": 4622324.434309 },
				{ "level": 1, "resolution": 611.49622628138, "scale": 2311162.217155 },
				{ "level": 2, "resolution": 305.748113140558, "scale": 1155581.108577 },
				{ "level": 3, "resolution": 152.874056570411, "scale": 577790.554289 },
				{ "level": 4, "resolution": 76.4370282850732, "scale": 288895.277144 },
				{ "level": 5, "resolution": 38.2185141425366, "scale": 144447.638572 },
				{ "level": 6, "resolution": 19.1092570712683, "scale": 72223.819286 },
				{ "level": 7, "resolution": 9.55462853563415, "scale": 36111.909643 },
				{ "level": 8, "resolution": 4.77731426794937, "scale": 18055.954822 },
				{ "level": 9, "resolution": 2.38865713397468, "scale": 9027.977411 },
				{ "level": 10, "resolution": 1.19432856685505, "scale": 4513.988705 },
				{ "level": 11, "resolution": 0.597164283559817, "scale": 2256.994353 }
			]
		});
		this.loaded = true;
		this.onLoad(this);
	},
	getTileUrl : function(level, row, col) {
		var returnUrl = "";
		var newrow = row + (Math.pow(2, level) * 47);
		var newcol = col + (Math.pow(2, level) * 107);
		returnUrl = "/xdworld.vworld.kr:8080/2d/Base/201310/" + (level + 7) + "/" + newcol + "/" + newrow + ".png";
		return returnUrl;
		/*
		var reURL,defaultUrl,imgType;
		switch (this.mapType) {
			case "BaseMap":
				defaultUrl = "//map.ktgis.com/BaseMap/version130322/layers/_alllayers";
				imgType = "png";
				break;
			case "Satellite":
				defaultUrl = "//map.ktgis.com/ServiceAir/version20110705";
				imgType = "jpg";
				break;
			case "Hybrid":
				defaultUrl = "//map.ktgis.com/HybridMap/version130325_hyb/layers/_alllayers";
				imgType = "png";
				break;
			case "Traffic":
				defaultUrl = "//traffic.ktgis.com/NTraffic/TTileServlet/256";
				imgType = "png";
				reURL = defaultUrl + "/" +
					"L" + dojo.string.pad(level, 2, '0') + "/" +
					"R" + dojo.string.pad(row.toString(16), 8, '0') + "/" +
					"C" + dojo.string.pad(col.toString(16), 8, '0') + "." +
					imgType;
				return reURL;
				break;
		}
		reURL = defaultUrl + "/" +
					"l" + dojo.string.pad(level, 2, '0') + "/" +
					"r" + dojo.string.pad(row.toString(16), 8, '0') + "/" +
					"c" + dojo.string.pad(col.toString(16), 8, '0') + "." +
					imgType;
		return reURL;*/
	}
});