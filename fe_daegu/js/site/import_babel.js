function scriptQuery(){var script = document.getElementsByTagName('script');script = script[script.length-1].src.replace(/^[^\?]+\?/, '').replace(/#.+$/, '').split('&');var queries = {}, query;while(script.length){query = script.shift().split('=');queries[query[0]] = query[1];}return queries;}
var _param = scriptQuery();
function addScript(str,t){var script = document.createElement('script');script.src = str;if(t !== undefined){setTimeout(function(){document.head.appendChild(script);},t);} else {document.head.appendChild(script);}}
function addCss(str){var css = document.createElement('link');css.rel = 'stylesheet';css.href = str;document.head.appendChild(css);}
var localPath = _param.CONTEXT_PATH;
var commonPath = (navigator.onLine === false) ? localPath:'//cdn.jsdelivr.net/gh/mayeyes/cdn';

addScript(commonPath+'/js/babel.min.js');
addScript(commonPath+'/js/babel.polyfill.min.js');
addScript(commonPath+'/js/bluebird.js');

// setting
document.write('<script type="text/babel" data-presets="es2015,stage-2">const CONTEXT_PATH = \''+_param.CONTEXT_PATH+'\';const mno = \''+_param.mno+'\';<\/script>');