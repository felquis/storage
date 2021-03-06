/* 2011-09-13 By: @felquis http://github.com/felquis/storage */
var JSON;if(!JSON){JSON={}}(function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];if(i&&typeof i==="object"&&typeof i.toJSON==="function"){i=i.toJSON(a)}if(typeof rep==="function"){i=rep.call(b,a,i)}switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i){return"null"}gap+=indent;h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1){h[c]=str(c,i)||"null"}e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]";gap=g;return e}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1){if(typeof rep[c]==="string"){d=rep[c];e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}else{for(d in i){if(Object.prototype.hasOwnProperty.call(i,d)){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}";gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict";if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(a,b,c){var d;gap="";indent="";if(typeof c==="number"){for(d=0;d<c;d+=1){indent+=" "}}else if(typeof c==="string"){indent=c}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e==="object"){for(c in e){if(Object.prototype.hasOwnProperty.call(e,c)){d=walk(e,c);if(d!==undefined){e[c]=d}else{delete e[c]}}}}return reviver.call(a,b,e)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()

/* $.storage() */
$.storage = function(opt){
	// setup //
	obj = {
		get : '',
		value : '',
		id : ''
	}

	var local = localStorage;

	$api = $.extend(obj, opt);

	/*
	 * Essas fun��es s�o responsaveis por setar dados e pegar dados
	 */

	// Seta um localStorage que o programador definiu um ID
	function newid($id, $valor){

		$valor = JSON.stringify($valor);

		local.setItem($id, $valor);
	}

	// Seta um localStorage em que o programador N�O definiu um ID - ID autom�tico
	function newvalor($valor){

		$valor = JSON.stringify($valor);

		var nome = local.length + 1;

		local.setItem(nome, $valor);
	}

	// Pega um localStorage pelo seu KEY ou sej� pelo seu identificador no Array de Dados do localStorage
	function getkey(key){

		var num = local.key(key);
		$valor = local.getItem(num);

		$valor = JSON.parse($valor);

		return $valor;
	}

	// Pega um localStorage pelo seu nome/ID indicado pelo programador na hora de seta-lo
	function getID(name){
		var item, item2;

		item = local.getItem(name);

		item2 = JSON.parse(item);

		return item2;
	}

	/*
	 * Esses IF's avaliam o que foi passado como par�metro no $.storage
	 * e define qual tarefa ser� realizada
	 */

	// Pegar valores
	 if($api.get != ''){
		if($.type( $api.get ) === 'number'){
			$retorno = getkey($api.get);
			return $retorno;
		}else{
			$retorno = getID($api.get);
			return $retorno;
		}
	 }

	// Setar/Salvar valores
	if($api.value != ''){
		if($api.id != ''){
			newid($api.id, $api.value);
		}else{
			newvalor($api.value);
		}
	}

	// Retorna um Array de todo o localStorage
	if(opt == null){
		$total = local.length;
		$retorno = [];
		 if($total == 0){
			 $retorno[0] = "N�o a dados gravados.";
			 return $retorno;
		 }else{
			$i = 0;

			while($i < $total){
				$retorno[$i] = getkey($i);
				$i++;
			}
			return $retorno;
		}
	}

	// Limpar todo o localStorage
	if(opt == 'clear'){
		local.clear();
	}

	//
	if($api.remove != ''){
		local.removeItem($api.remove);
	}
}