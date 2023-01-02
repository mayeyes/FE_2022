//jquery에서 ajax로 localhost를 호출하도록 허용
$.support.cors = true;
$.ajaxSetup({cache:false}); 
$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
$.fn.clearForm = function() {
    return this.each(function() {
        var type = this.type, tag = this.tagName.toLowerCase();
        if (tag === 'form'){
            return $(':input',this).clearForm();
        }
        if (type === 'text' || type === 'password' || type === 'hidden' || tag === 'textarea'){
            this.value = '';
        }else if (type === 'checkbox' || type === 'radio'){
            this.checked = false;
        }else if (tag === 'select'){
            this.selectedIndex = -1;
        }
    });
};
$.fn.visible = function() {
    return this.css('visibility', 'visible');
};

$.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

$.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};
$.extend({
	scope : function (scope , fn) {
		return function () {
			return fn.apply(scope, arguments);
		}
	},
	delay : ( function() {
		var timer = 0;
		return function(callback, ms) {
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})()
});
// Ajax 파일 다운로드
$.download = function(url, data, method){
    // url과 data를 입력받음
    if( url && data ){ 
		// 파라미터를 form의  input으로 만든다.
        var inputs = '';
		if(typeof data == 'string')
		{
			var pair = this.split('=');
            inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
		}
		else
		{
			$.each(data, function(key, value){
				 inputs+='<input type="hidden" name="'+ key +'" value="'+ value +'" />';
			});
		}
        // request를 보낸다.
        jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
        .appendTo('body').submit().remove();
    };
};
$(function(){
	$.String = {
		startsWith: function (c, a) {
			return (c.indexOf(a) == 0)
		},
		contains: function (c, a) {
			return (c.indexOf(a) != -1)
		},
		trim: function (a) {
			return a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
		},
		camelize: function (g) {
			var e = g.split("-");
			var c = e[0];
			for (var d = 1, a = e.length; d < a; d++) {
				var f = e[d];
				c += f.charAt(0).toUpperCase() + f.substring(1)
			}
			return c
		},
		format: function (e, d, a) {
			if (!d) {
				d = window
			}
			var c = function (k, f) {
				var j;
				var h = f.split(/\.+/);
				for (var g = 0; g < h.length; g++) {
					if (g == 0) {
						j = d
					}
					j = j[h[g]]
				}
				if (Array.isArray(j)) {
					j = j.join(' > ')
				}
				if (typeof j == "function") {
					j = a ? j.apply(null, a) : j()
				}
				if(j == null) j = "";
				if (typeof j == "undefined") {
					return "undefined"
				} else {
					return j
				}
			};
			return e.replace($.String.tokenRegEx, c);
		},
		dbFormat: function (e, d, a) {
			if (!d) {
				d = window
			}
			var c = function (k, f) {
				var j;
				var h = f.split(/\.+/);
				for (var g = 0; g < h.length; g++) {
					if (g == 0) {
						j = d
					}
					j = j[h[g]]
				}
				if (Array.isArray(j)) {
					j = j.join(' > ')
				}
				if (typeof j == "function") {
					j = a ? j.apply(null, a) : j()
				}
				if(j == null) j = "";
				if (typeof j == "undefined") {
					return "undefined"
				} else {
					return j
				}
			};
			return e.replace($.String.dbTokenRegEx, c);
		},
		tokenRegEx: /\$\{([\w.]+?)\}/g,
		dbTokenRegEx: /\@\{([\w.]+?)\}/g,
		numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
		isNumeric: function (a) {
			return $.String.numberRegEx.test(a)
		},
		numericIf: function (a) {
			return $.String.isNumeric(a) ? parseFloat(a) : a
		}
	};
});
Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};
Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};
Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};
Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};
Date.prototype.addDays = function (value) {
	this.setDate(this.getDate() + parseInt(value));
    return this;
};

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " "; 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
}; 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

//$('#TABLE ID').rowspan(0);
$.fn.rowspan = function(colIdx, isStats) {       
	return this.each(function(){      
		var that;     
		$('tr', this).each(function(row) {      
			$('td:eq('+colIdx+')', this).filter(':visible').each(function(col) {
				if ($(this).html() == $(that).html() && (!isStats || isStats && $(this).prev().html() == $(that).prev().html())) {            
					rowspan = $(that).attr("rowspan") || 1;
					rowspan = Number(rowspan)+1;
					$(that).attr("rowspan",rowspan);				            
					$(this).hide();
				} else {            
					that = this;         
				}
				that = (that == null) ? this : that;      
			});     
		});    
	});  
}; 