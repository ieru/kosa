(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
// Make it safe to do console.log() always.
(function (con) {
  var method;
  var dummy = function() {};
  var methods = ('assert,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' + 
     'time,timeEnd,trace,warn').split(',');
  while (method = methods.pop()) {
    con[method] = con[method] || dummy;
  }
})(window.console = window.console || {});

;/*!
 * jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
	navigator = window.navigator,
	location = window.location;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Matches dashed string for camelizing
	rdashAlpha = /-([a-z]|[0-9])/ig,
	rmsPrefix = /^-ms-/,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,

	// The deferred used on DOM ready
	readyList,

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = quickExpr.exec( selector );
			}

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context ? context.ownerDocument || context : document );

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
					}

					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.7.2",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = this.constructor();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );

		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// Add the callback
		readyList.add( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {
		// Either a released hold or an DOMready/load event and not yet ready
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.fireWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).off( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyList ) {
			return;
		}

		readyList = jQuery.Callbacks( "once memory" );

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}
		var xml, tmp;
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction( object );

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return object;
	},

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array, i ) {
		var len;

		if ( array ) {
			if ( indexOf ) {
				return indexOf.call( array, elem, i );
			}

			len = array.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in array && array[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key, ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		if ( typeof context === "string" ) {
			var tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		var args = slice.call( arguments, 2 ),
			proxy = function() {
				return fn.apply( context, args.concat( slice.call( arguments ) ) );
			};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Mutifunctional method to get and set values to a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	sub: function() {
		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

return jQuery;

})();


// String to Object flags format cache
var flagsCache = {};

// Convert String-formatted flags into Object-formatted ones and store in cache
function createFlags( flags ) {
	var object = flagsCache[ flags ] = {},
		i, length;
	flags = flags.split( /\s+/ );
	for ( i = 0, length = flags.length; i < length; i++ ) {
		object[ flags[i] ] = true;
	}
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	flags:	an optional list of space-separated flags that will change how
 *			the callback list behaves
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible flags:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( flags ) {

	// Convert flags from String-formatted to Object-formatted
	// (we check in cache first)
	flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

	var // Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = [],
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Add one or several callbacks to the list
		add = function( args ) {
			var i,
				length,
				elem,
				type,
				actual;
			for ( i = 0, length = args.length; i < length; i++ ) {
				elem = args[ i ];
				type = jQuery.type( elem );
				if ( type === "array" ) {
					// Inspect recursively
					add( elem );
				} else if ( type === "function" ) {
					// Add if not in unique mode and callback is not in
					if ( !flags.unique || !self.has( elem ) ) {
						list.push( elem );
					}
				}
			}
		},
		// Fire callbacks
		fire = function( context, args ) {
			args = args || [];
			memory = !flags.memory || [ context, args ];
			fired = true;
			firing = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
					memory = true; // Mark as halted
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( !flags.once ) {
					if ( stack && stack.length ) {
						memory = stack.shift();
						self.fireWith( memory[ 0 ], memory[ 1 ] );
					}
				} else if ( memory === true ) {
					self.disable();
				} else {
					list = [];
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					var length = list.length;
					add( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away, unless previous
					// firing was halted (stopOnFalse)
					} else if ( memory && memory !== true ) {
						firingStart = length;
						fire( memory[ 0 ], memory[ 1 ] );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					var args = arguments,
						argIndex = 0,
						argLength = args.length;
					for ( ; argIndex < argLength ; argIndex++ ) {
						for ( var i = 0; i < list.length; i++ ) {
							if ( args[ argIndex ] === list[ i ] ) {
								// Handle firingIndex and firingLength
								if ( firing ) {
									if ( i <= firingLength ) {
										firingLength--;
										if ( i <= firingIndex ) {
											firingIndex--;
										}
									}
								}
								// Remove the element
								list.splice( i--, 1 );
								// If we have some unicity property then
								// we only need to do this once
								if ( flags.unique ) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				if ( list ) {
					var i = 0,
						length = list.length;
					for ( ; i < length; i++ ) {
						if ( fn === list[ i ] ) {
							return true;
						}
					}
				}
				return false;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory || memory === true ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( stack ) {
					if ( firing ) {
						if ( !flags.once ) {
							stack.push( [ context, args ] );
						}
					} else if ( !( flags.once && memory ) ) {
						fire( context, args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};




var // Static reference to slice
	sliceDeferred = [].slice;

jQuery.extend({

	Deferred: function( func ) {
		var doneList = jQuery.Callbacks( "once memory" ),
			failList = jQuery.Callbacks( "once memory" ),
			progressList = jQuery.Callbacks( "memory" ),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function() {
					return state;
				},

				// Deprecated
				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
					deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
					return this;
				},
				always: function() {
					deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
					return this;
				},
				pipe: function( fnDone, fnFail, fnProgress ) {
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( {
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function( handler, data ) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if ( jQuery.isFunction( fn ) ) {
								deferred[ handler ](function() {
									returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								});
							} else {
								deferred[ handler ]( newDefer[ action ] );
							}
						});
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					if ( obj == null ) {
						obj = promise;
					} else {
						for ( var key in promise ) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			deferred = promise.promise({}),
			key;

		for ( key in lists ) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		// Handle state
		deferred.done( function() {
			state = "resolved";
		}, failList.disable, progressList.lock ).fail( function() {
			state = "rejected";
		}, doneList.disable, progressList.lock );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( firstParam ) {
		var args = sliceDeferred.call( arguments, 0 ),
			i = 0,
			length = args.length,
			pValues = new Array( length ),
			count = length,
			pCount = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred(),
			promise = deferred.promise();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					deferred.resolveWith( deferred, args );
				}
			};
		}
		function progressFunc( i ) {
			return function( value ) {
				pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				deferred.notifyWith( promise, pValues );
			};
		}
		if ( length > 1 ) {
			for ( ; i < length; i++ ) {
				if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return promise;
	}
});




jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		tds,
		events,
		eventName,
		i,
		isSupported,
		div = document.createElement( "div" ),
		documentElement = document.documentElement;

	// Preliminary tests
	div.setAttribute("className", "t");
	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName( "*" );
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement( "select" );
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName( "input" )[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		pixelMargin: true
	};

	// jQuery.boxModel DEPRECATED in 1.3, use jQuery.support.boxModel instead
	jQuery.boxModel = support.boxModel = (document.compatMode === "CSS1Compat");

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent( "onclick" );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute("checked", "checked");

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: 1,
			change: 1,
			focusin: 1
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	fragment.removeChild( div );

	// Null elements to avoid leaks in IE
	fragment = select = opt = div = input = null;

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, outer, inner, table, td, offsetSupport,
			marginDiv, conMarginTop, style, html, positionTopLeftWidthHeight,
			paddingMarginBorderVisibility, paddingMarginBorder,
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		conMarginTop = 1;
		paddingMarginBorder = "padding:0;margin:0;border:";
		positionTopLeftWidthHeight = "position:absolute;top:0;left:0;width:1px;height:1px;";
		paddingMarginBorderVisibility = paddingMarginBorder + "0;visibility:hidden;";
		style = "style='" + positionTopLeftWidthHeight + paddingMarginBorder + "5px solid #000;";
		html = "<div " + style + "display:block;'><div style='" + paddingMarginBorder + "0;display:block;overflow:hidden;'></div></div>" +
			"<table " + style + "' cellpadding='0' cellspacing='0'>" +
			"<tr><td></td></tr></table>";

		container = document.createElement("div");
		container.style.cssText = paddingMarginBorderVisibility + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td style='" + paddingMarginBorder + "0;display:none'></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName( "td" );
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check if div with explicit width and no margin-right incorrectly
		// gets computed margin-right based on width of container. For more
		// info see bug #3333
		// Fails in WebKit before Feb 2011 nightlies
		// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
		if ( window.getComputedStyle ) {
			div.innerHTML = "";
			marginDiv = document.createElement( "div" );
			marginDiv.style.width = "0";
			marginDiv.style.marginRight = "0";
			div.style.width = "2px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				( parseInt( ( window.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.width = div.style.padding = "1px";
			div.style.border = 0;
			div.style.overflow = "hidden";
			div.style.display = "inline";
			div.style.zoom = 1;
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div style='width:5px;'></div>";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );
		}

		div.style.cssText = positionTopLeftWidthHeight + paddingMarginBorderVisibility;
		div.innerHTML = html;

		outer = div.firstChild;
		inner = outer.firstChild;
		td = outer.nextSibling.firstChild.firstChild;

		offsetSupport = {
			doesNotAddBorder: ( inner.offsetTop !== 5 ),
			doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
		};

		inner.style.position = "fixed";
		inner.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
		inner.style.position = inner.style.top = "";

		outer.style.overflow = "hidden";
		outer.style.position = "relative";

		offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
		offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );

		if ( window.getComputedStyle ) {
			div.style.marginTop = "1%";
			support.pixelMargin = ( window.getComputedStyle( div, null ) || { marginTop: 0 } ).marginTop !== "1%";
		}

		if ( typeof container.style.zoom !== "undefined" ) {
			container.style.zoom = 1;
		}

		body.removeChild( container );
		marginDiv = div = container = null;

		jQuery.extend( support, offsetSupport );
	});

	return support;
})();




var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var privateCache, thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
			isEvents = name === "events";

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		privateCache = thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Users should not attempt to inspect the internal events object using jQuery.data,
		// it is undocumented and subject to change. But does anyone listen? No.
		if ( isEvents && !thisCache[ name ] ) {
			return privateCache.events;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			// Reference to internal data cache key
			internalKey = jQuery.expando,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,

			// See jQuery.data for more information
			id = isNode ? elem[ internalKey ] : internalKey;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split( " " );
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		// Browsers that fail expando deletion also refuse to delete expandos on
		// the window, but it will allow it on all other JS objects; other browsers
		// don't care
		// Ensure that `cache` is not a window object #10080
		if ( jQuery.support.deleteExpando || !cache.setInterval ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		// We destroyed the cache and need to eliminate the expando on the node to avoid
		// false lookups in the cache for entries that no longer exist
		if ( isNode ) {
			// IE does not allow us to delete expando properties from nodes,
			// nor does it have a removeAttribute function on Document nodes;
			// we must handle all of these cases
			if ( jQuery.support.deleteExpando ) {
				delete elem[ internalKey ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( internalKey );
			} else {
				elem[ internalKey ] = null;
			}
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				jQuery.isNumeric( data ) ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	for ( var name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}




function handleQueueMarkDefer( elem, type, src ) {
	var deferDataKey = type + "defer",
		queueDataKey = type + "queue",
		markDataKey = type + "mark",
		defer = jQuery._data( elem, deferDataKey );
	if ( defer &&
		( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
		( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
		// Give room for hard-coded callbacks to fire first
		// and eventually mark/queue something else on the element
		setTimeout( function() {
			if ( !jQuery._data( elem, queueDataKey ) &&
				!jQuery._data( elem, markDataKey ) ) {
				jQuery.removeData( elem, deferDataKey, true );
				defer.fire();
			}
		}, 0 );
	}
}

jQuery.extend({

	_mark: function( elem, type ) {
		if ( elem ) {
			type = ( type || "fx" ) + "mark";
			jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
		}
	},

	_unmark: function( force, elem, type ) {
		if ( force !== true ) {
			type = elem;
			elem = force;
			force = false;
		}
		if ( elem ) {
			type = type || "fx";
			var key = type + "mark",
				count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
			if ( count ) {
				jQuery._data( elem, key, count );
			} else {
				jQuery.removeData( elem, key, true );
				handleQueueMarkDefer( elem, type, "mark" );
			}
		}
	},

	queue: function( elem, type, data ) {
		var q;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			q = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !q || jQuery.isArray(data) ) {
					q = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					q.push( data );
				}
			}
			return q || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = {};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			jQuery._data( elem, type + ".run", hooks );
			fn.call( elem, function() {
				jQuery.dequeue( elem, type );
			}, hooks );
		}

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue " + type + ".run", true );
			handleQueueMarkDefer( elem, type, "queue" );
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, object ) {
		if ( typeof type !== "string" ) {
			object = type;
			type = undefined;
		}
		type = type || "fx";
		var defer = jQuery.Deferred(),
			elements = this,
			i = elements.length,
			count = 1,
			deferDataKey = type + "defer",
			queueDataKey = type + "queue",
			markDataKey = type + "mark",
			tmp;
		function resolve() {
			if ( !( --count ) ) {
				defer.resolveWith( elements, [ elements ] );
			}
		}
		while( i-- ) {
			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
					jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
				count++;
				tmp.add( resolve );
			}
		}
		resolve();
		return defer.promise( object );
	}
});




var rclass = /[\n\t\r]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	nodeHook, boolHook, fixSpecified;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, i, l, elem, className, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			classNames = ( value || "" ).split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						className = (" " + elem.className + " ").replace( rclass, " " );
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[ c ] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var self = jQuery(this), val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, l, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {
			attrNames = value.toLowerCase().split( rspace );
			l = attrNames.length;

			for ( ; i < l; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
				ret.nodeValue :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.nodeValue = value + "" );
		}
	};

	// Apply the nodeHook to tabindex
	jQuery.attrHooks.tabindex.set = nodeHook.set;

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});




var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
	rhoverHack = /(?:^|\s)hover(\.\S+)?\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
	quickParse = function( selector ) {
		var quick = rquickIs.exec( selector );
		if ( quick ) {
			//   0  1    2   3
			// [ _, tag, id, class ]
			quick[1] = ( quick[1] || "" ).toLowerCase();
			quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
		}
		return quick;
	},
	quickIs = function( elem, m ) {
		var attrs = elem.attributes || {};
		return (
			(!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
			(!m[2] || (attrs.id || {}).value === m[2]) &&
			(!m[3] || m[3].test( (attrs[ "class" ] || {}).value ))
		);
	},
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, quick, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				quick: selector && quickParse( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
			t, tns, type, origType, namespaces, origCount,
			j, events, special, handle, eventType, handleObj;

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, [ "events", "handle" ], true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var type = event.type || event,
			namespaces = [],
			cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			old = null;
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old && old === elem.ownerDocument ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments, 0 ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [],
			i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			// Pregenerate a single jQuery object for reuse with .is()
			jqcur = jQuery(this);
			jqcur.context = this.ownerDocument || this;

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process events on disabled elements (#6911, #8165)
				if ( cur.disabled !== true ) {
					selMatch = {};
					matches = [];
					jqcur[0] = cur;
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = (
								handleObj.quick ? quickIs( cur, handleObj.quick ) : jqcur.is( sel )
							);
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events; add metaKey if it's not there (#3368, IE6/7/8)
		if ( event.metaKey === undefined ) {
			event.metaKey = event.ctrlKey;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady
		},

		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector,
				ret;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !form._submit_attached ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					form._submit_attached = true;
				}
			});
			// return undefined since we don't need an event listener
		},
		
		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
							jQuery.event.simulate( "change", this, event, true );
						}
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !elem._change_attached ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					elem._change_attached = true;
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			var handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( var type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});



/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	expando = "sizcache" + (Math.random() + '').replace('.', ''),
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rReturn = /\r\n/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;

	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];

			parts.push( m[1] );

			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context, seed );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}

				set = posProcess( selector, set, seed );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set, i, len, match, type, left;

	if ( !expr ) {
		return [];
	}

	for ( i = 0, len = Expr.order.length; i < len; i++ ) {
		type = Expr.order[i];

		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		type, found, item, filter, left,
		i, pass,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				filter = Expr.filter[ type ];
				left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							pass = not ^ found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Utility function for retreiving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
    var i, node,
		nodeType = elem.nodeType,
		ret = "";

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent || innerText for elements
			if ( typeof elem.textContent === 'string' ) {
				return elem.textContent;
			} else if ( typeof elem.innerText === 'string' ) {
				// Replace IE's carriage returns
				return elem.innerText.replace( rReturn, '' );
			} else {
				// Traverse it's children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
	} else {

		// If no nodeType, this is expected to be an array
		for ( i = 0; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			if ( node.nodeType !== 8 ) {
				ret += getText( node );
			}
		}
	}
	return ret;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );

			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}

			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},

	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},

		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
		},

		file: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
		},

		password: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
		},

		submit: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "submit" === elem.type;
		},

		image: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
		},

		reset: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "reset" === elem.type;
		},

		button: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && "button" === elem.type || name === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		},

		focus: function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var first, last,
				doneName, parent, cache,
				count, diff,
				type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) ) {
						if ( node.nodeType === 1 ) {
							return false;
						}
					}

					if ( type === "first" ) {
						return true;
					}

					node = elem;

					/* falls through */
				case "last":
					while ( (node = node.nextSibling) ) {
						if ( node.nodeType === 1 ) {
							return false;
						}
					}

					return true;

				case "nth":
					first = match[2];
					last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}

					doneName = match[0];
					parent = elem.parentNode;

					if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
						count = 0;

						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						}

						parent[ expando ] = doneName;
					}

					diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
		},

		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Sizzle.attr ?
					Sizzle.attr( elem, name ) :
					Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				!type && Sizzle.attr ?
				result != null :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}
// Expose origPOS
// "global" as in regardless of relation to brackets/parens
Expr.match.globalPOS = origPOS;

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}

	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}

		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );

				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );

					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}

				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );

					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}

						} else {
							return makeArray( [], extra );
						}
					}

					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}

			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );

		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try {
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem[ expando ] = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem[ expando ] = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context, seed ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet, seed );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
Sizzle.selectors.attrMap = {};
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.globalPOS,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var self = this,
			i, l;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		var ret = this.pushStack( "", "find", selector ),
			length, n, r;

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				POS.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];

		// Array (deprecated as of jQuery 1.7)
		if ( jQuery.isArray( selectors ) ) {
			var level = 1;

			while ( cur && cur.ownerDocument && cur !== context ) {
				for ( i = 0; i < selectors.length; i++ ) {

					if ( jQuery( cur ).is( selectors[ i ] ) ) {
						ret.push({ selector: selectors[ i ], elem: cur, level: level });
					}
				}

				cur = cur.parentNode;
				level++;
			}

			return ret;
		}

		// String
		var pos = POS.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}




function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery.clean(arguments) );
			return set;
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					null;
			}


			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.length ?
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
				this;
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						// Make sure that we do not leak memory by inadvertently discarding
						// the original fragment (which might have attached data) instead of
						// using it; in addition, use the original fragment object for the last
						// item instead of first because it can end up being emptied incorrectly
						// in certain situations (Bug #8070).
						// Fragments from the fragment cache must always be cloned and never used
						// in place.
						results.cacheable || ( l > 1 && i < lastIndex ) ?
							jQuery.clone( fragment, true, true ) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						jQuery.ajax({
							type: "GET",
							global: false,
							url: elem.src,
							async: false,
							dataType: "script"
						});
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 fail to clone children inside object elements that use
	// the proprietary classid attribute value (rather than the type
	// attribute) to identify the type of content to display
	if ( nodeName === "object" ) {
		dest.outerHTML = src.outerHTML;

	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set
		if ( src.checked ) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );

	// Clear flags for bubbling special change/submit events, they must
	// be reattached when the newly cloned events are first activated
	dest.removeAttribute( "_submit_attached" );
	dest.removeAttribute( "_change_attached" );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults, doc,
	first = args[ 0 ];

	// nodes may contain either an explicit document object,
	// a jQuery collection or context object.
	// If nodes[0] contains a valid object to assign to doc
	if ( nodes && nodes[0] ) {
		doc = nodes[0].ownerDocument || nodes[0];
	}

	// Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ first ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ first ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( elem.type === "checkbox" || elem.type === "radio" ) {
		elem.defaultChecked = elem.checked;
	}
}
// Finds all inputs and passes them to fixDefaultChecked
function findInputs( elem ) {
	var nodeName = ( elem.nodeName || "" ).toLowerCase();
	if ( nodeName === "input" ) {
		fixDefaultChecked( elem );
	// Skip scripts, get other children
	} else if ( nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined" ) {
		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	}
}

// Derived From: http://www.iecss.com/shimprove/javascript/shimprove.1-0-1.js
function shimCloneNode( elem ) {
	var div = document.createElement( "div" );
	safeFragment.appendChild( div );

	div.innerHTML = elem.outerHTML;
	return div.firstChild;
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			// IE<=8 does not properly clone detached, unknown element nodes
			clone = jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ?
				elem.cloneNode( true ) :
				shimCloneNode( elem );

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var checkScriptType, script, j,
				ret = [];

		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div"),
						safeChildNodes = safeFragment.childNodes,
						remove;

					// Append wrapper element to unknown element safe doc fragment
					if ( context === document ) {
						// Use the fragment we've already created for this document
						safeFragment.appendChild( div );
					} else {
						// Use a fragment created with the owner document
						createSafeFragment( context ).appendChild( div );
					}

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Clear elements from DocumentFragment (safeFragment or otherwise)
					// to avoid hoarding elements. Fixes #11356
					if ( div ) {
						div.parentNode.removeChild( div );

						// Guard against -1 index exceptions in FF3.6
						if ( safeChildNodes.length > 0 ) {
							remove = safeChildNodes[ safeChildNodes.length - 1 ];

							if ( remove && remove.parentNode ) {
								remove.parentNode.removeChild( remove );
							}
						}
					}
				}
			}

			// Resets defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				script = ret[i];
				if ( scripts && jQuery.nodeName( script, "script" ) && (!script.type || rscriptType.test( script.type )) ) {
					scripts.push( script.parentNode ? script.parentNode.removeChild( script ) : script );

				} else {
					if ( script.nodeType === 1 ) {
						var jsTags = jQuery.grep( script.getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( script );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id,
			cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnum = /^[\-+]?(?:\d*\.)?\d+$/i,
	rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
	rrelNum = /^([\-+])=([\-+.\de]+)/,
	rmargin = /^margin/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },

	// order is important!
	cssExpand = [ "Top", "Right", "Bottom", "Left" ],

	curCSS,

	getComputedStyle,
	currentStyle;

jQuery.fn.css = function( name, value ) {
	return jQuery.access( this, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	}, name, value, arguments.length > 1 );
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {},
			ret, name;

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// DEPRECATED in 1.3, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, name ) {
		var ret, defaultView, computedStyle, width,
			style = elem.style;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( (defaultView = elem.ownerDocument.defaultView) &&
				(computedStyle = defaultView.getComputedStyle( elem, null )) ) {

			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// WebKit uses "computed value (percentage if specified)" instead of "used value" for margins
		// which is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !jQuery.support.pixelMargin && computedStyle && rmargin.test( name ) && rnumnonpx.test( ret ) ) {
			width = style.width;
			style.width = ret;
			ret = computedStyle.width;
			style.width = width;
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft, uncomputed,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && (uncomputed = style[ name ]) ) {
			ret = uncomputed;
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( rnumnonpx.test( ret ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		i = name === "width" ? 1 : 0,
		len = 4;

	if ( val > 0 ) {
		if ( extra !== "border" ) {
			for ( ; i < len; i += 2 ) {
				if ( !extra ) {
					val -= parseFloat( jQuery.css( elem, "padding" + cssExpand[ i ] ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + cssExpand[ i ] ) ) || 0;
				} else {
					val -= parseFloat( jQuery.css( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
				}
			}
		}

		return val + "px";
	}

	// Fall back to computed then uncomputed css if necessary
	val = curCSS( elem, name );
	if ( val < 0 || val == null ) {
		val = elem.style[ name ];
	}

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test(val) ) {
		return val;
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Add padding, border, margin
	if ( extra ) {
		for ( ; i < len; i += 2 ) {
			val += parseFloat( jQuery.css( elem, "padding" + cssExpand[ i ] ) ) || 0;
			if ( extra !== "padding" ) {
				val += parseFloat( jQuery.css( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
			if ( extra === "margin" ) {
				val += parseFloat( jQuery.css( elem, extra + cssExpand[ i ]) ) || 0;
			}
		}
	}

	return val + "px";
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					return getWidthOrHeight( elem, name, extra );
				} else {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				}
			}
		},

		set: function( elem, value ) {
			return rnum.test( value ) ?
				value + "px" :
				value;
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( parseFloat( RegExp.$1 ) / 100 ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery(function() {
	// This hook cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "margin-right" );
					} else {
						return elem.style.marginRight;
					}
				});
			}
		};
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return ( width === 0 && height === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {

	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};
});




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Document location
	ajaxLocation,

	// Document location segments
	ajaxLocParts,

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			var isSuccess,
				success,
				error,
				statusText = nativeStatusText,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( var name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		// Current and previous dataTypes
		current = dataTypes[ 0 ],
		prev,
		// Conversion expression
		conversion,
		// Conversion function
		conv,
		// Conversion functions (transitive conversion)
		conv1,
		conv2;

	// For each dataType in the chain
	for ( i = 1; i < length; i++ ) {

		// Create converters map
		// with lowercased keys
		if ( i === 1 ) {
			for ( key in s.converters ) {
				if ( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		// Get the dataTypes
		prev = current;
		current = dataTypes[ i ];

		// If current is auto dataType, update it to prev
		if ( current === "*" ) {
			current = prev;
		// If no auto and dataTypes are actually different
		} else if ( prev !== "*" && prev !== current ) {

			// Get the converter
			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			// If there is no direct converter, search transitively
			if ( !conv ) {
				conv2 = undefined;
				for ( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			// If we found no converter, dispatch an error
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			// If found converter is not an equivalence
			if ( conv !== true ) {
				// Convert with 1 or 2 converters accordingly
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var inspectData = ( typeof s.data === "string" ) && /^application\/x\-www\-form\-urlencoded/.test( s.contentType );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				inspectData && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2";

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( inspectData ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					// Add callback manually
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		// Install callback
		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		// Clean-up function
		jqXHR.always(function() {
			// Set callback back to previous value
			window[ jsonpCallback ] = previous;
			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( previous ) ) {
				window[ jsonpCallback ]( responseContainer[ 0 ] );
			}
		});

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Delegate to script
		return "script";
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});




var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0,
	xhrCallbacks;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var xhr = s.xhr(),
						handle,
						i;

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( _ ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					// if we're in sync mode or it's in cache
					// and has been retrieved directly (IE6 & IE7)
					// we need to manually fire the callback
					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	],
	fxNow;

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback );

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
						display = elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if ( (display === "" && jQuery.css(elem, "display") === "none") ||
						!jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
						jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					if ( display === "" || display === "none" ) {
						elem.style.display = jQuery._data( elem, "olddisplay" ) || "";
					}
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			var elem, display,
				i = 0,
				j = this.length;

			for ( ; i < j; i++ ) {
				elem = this[i];
				if ( elem.style ) {
					display = jQuery.css( elem, "display" );

					if ( display !== "none" && !jQuery._data( elem, "olddisplay" ) ) {
						jQuery._data( elem, "olddisplay", display );
					}
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				if ( this[i].style ) {
					this[i].style.display = "none";
				}
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed( speed, easing, callback );

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		// Do not change referenced properties as per-property easing will be lost
		prop = jQuery.extend( {}, prop );

		function doAnimation() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p, e, hooks, replace,
				parts, start, end, unit,
				method;

			// will store per property easing and be used to determine when an animation is complete
			opt.animatedProperties = {};

			// first pass over propertys to expand / normalize
			for ( p in prop ) {
				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				if ( ( hooks = jQuery.cssHooks[ name ] ) && "expand" in hooks ) {
					replace = hooks.expand( prop[ name ] );
					delete prop[ name ];

					// not quite $.extend, this wont overwrite keys already present.
					// also - reusing 'p' from above because we have the correct "name"
					for ( p in replace ) {
						if ( ! ( p in prop ) ) {
							prop[ p ] = replace[ p ];
						}
					}
				}
			}

			for ( name in prop ) {
				val = prop[ name ];
				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {

						// inline-level elements accept inline-block;
						// block-level elements need to be inline with layout
						if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
							this.style.display = "inline-block";

						} else {
							this.style.zoom = 1;
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test( val ) ) {

					// Tracks whether to show or hide based on private
					// data attached to the element
					method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
					if ( method ) {
						jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
						e[ method ]();
					} else {
						e[ val ]();
					}

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ( (end || 1) / e.cur() ) * start;
							jQuery.style( this, p, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			// For JS strict compliance
			return true;
		}

		return optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},

	stop: function( type, clearQueue, gotoEnd ) {
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var index,
				hadTimers = false,
				timers = jQuery.timers,
				data = jQuery._data( this );

			// clear marker counters if we know they won't be
			if ( !gotoEnd ) {
				jQuery._unmark( true, this );
			}

			function stopQueue( elem, data, index ) {
				var hooks = data[ index ];
				jQuery.removeData( elem, index, true );
				hooks.stop( gotoEnd );
			}

			if ( type == null ) {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && index.indexOf(".run") === index.length - 4 ) {
						stopQueue( this, data, index );
					}
				}
			} else if ( data[ index = type + ".run" ] && data[ index ].stop ){
				stopQueue( this, data, index );
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					if ( gotoEnd ) {

						// force the next step to be the last
						timers[ index ]( true );
					} else {
						timers[ index ].saveState();
					}
					hadTimers = true;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( !( gotoEnd && hadTimers ) ) {
				jQuery.dequeue( this, type );
			}
		});
	}

});

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = jQuery.now() );
}

function clearFxNow() {
	fxNow = undefined;
}

// Generate parameters to create a standard animation
function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx( "show", 1 ),
	slideUp: genFx( "hide", 1 ),
	slideToggle: genFx( "toggle", 1 ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return ( -Math.cos( p*Math.PI ) / 2 ) + 0.5;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		( jQuery.fx.step[ this.prop ] || jQuery.fx.step._default )( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		// Empty strings, null, undefined and "auto" are converted to 0,
		// complex values such as "rotate(1rad)" are returned as is,
		// simple values such as "10px" are parsed to Float.
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = fxNow || createFxNow();
		this.end = to;
		this.now = this.start = from;
		this.pos = this.state = 0;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );

		function t( gotoEnd ) {
			return self.step( gotoEnd );
		}

		t.queue = this.options.queue;
		t.elem = this.elem;
		t.saveState = function() {
			if ( jQuery._data( self.elem, "fxshow" + self.prop ) === undefined ) {
				if ( self.options.hide ) {
					jQuery._data( self.elem, "fxshow" + self.prop, self.start );
				} else if ( self.options.show ) {
					jQuery._data( self.elem, "fxshow" + self.prop, self.end );
				}
			}
		};

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval( fx.tick, fx.interval );
		}
	},

	// Simple 'show' function
	show: function() {
		var dataShow = jQuery._data( this.elem, "fxshow" + this.prop );

		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = dataShow || jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any flash of content
		if ( dataShow !== undefined ) {
			// This show is picking up where a previous hide or show left off
			this.custom( this.cur(), dataShow );
		} else {
			this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
		}

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = jQuery._data( this.elem, "fxshow" + this.prop ) || jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom( this.cur(), 0 );
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var p, n, complete,
			t = fxNow || createFxNow(),
			done = true,
			elem = this.elem,
			options = this.options;

		if ( gotoEnd || t >= options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			options.animatedProperties[ this.prop ] = true;

			for ( p in options.animatedProperties ) {
				if ( options.animatedProperties[ p ] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

					jQuery.each( [ "", "X", "Y" ], function( index, value ) {
						elem.style[ "overflow" + value ] = options.overflow[ index ];
					});
				}

				// Hide the element if the "hide" operation was done
				if ( options.hide ) {
					jQuery( elem ).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( options.hide || options.show ) {
					for ( p in options.animatedProperties ) {
						jQuery.style( elem, p, options.orig[ p ] );
						jQuery.removeData( elem, "fxshow" + p, true );
						// Toggle data is no longer needed
						jQuery.removeData( elem, "toggle" + p, true );
					}
				}

				// Execute the complete function
				// in the event that the complete function throws an exception
				// we must ensure it won't be called twice. #5684

				complete = options.complete;
				if ( complete ) {

					options.complete = false;
					complete.call( elem );
				}
			}

			return false;

		} else {
			// classical easing cannot be used with an Infinity duration
			if ( options.duration == Infinity ) {
				this.now = t;
			} else {
				n = t - this.startTime;
				this.state = n / options.duration;

				// Perform the easing function, defaults to swing
				this.pos = jQuery.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
				this.now = this.start + ( (this.end - this.start) * this.pos );
			}
			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timer,
			timers = jQuery.timers,
			i = 0;

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

// Ensure props that can't be negative don't go there on undershoot easing
jQuery.each( fxAttrs.concat.apply( [], fxAttrs ), function( i, prop ) {
	// exclude marginTop, marginLeft, marginBottom and marginRight from this list
	if ( prop.indexOf( "margin" ) ) {
		jQuery.fx.step[ prop ] = function( fx ) {
			jQuery.style( fx.elem, prop, Math.max(0, fx.now) + fx.unit );
		};
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

// Try to restore the default display value of an element
function defaultDisplay( nodeName ) {

	if ( !elemdisplay[ nodeName ] ) {

		var body = document.body,
			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
			display = elem.css( "display" );
		elem.remove();

		// If the simple way fails,
		// get element's real default display by attaching it to a temp iframe
		if ( display === "none" || display === "" ) {
			// No iframe to use yet, so create it
			if ( !iframe ) {
				iframe = document.createElement( "iframe" );
				iframe.frameBorder = iframe.width = iframe.height = 0;
			}

			body.appendChild( iframe );

			// Create a cacheable copy of the iframe document on first call.
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
			// document to it; WebKit & Firefox won't allow reusing the iframe document.
			if ( !iframeDoc || !iframe.createElement ) {
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
				iframeDoc.write( ( jQuery.support.boxModel ? "<!doctype html>" : "" ) + "<html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = jQuery.css( elem, "display" );
			body.removeChild( iframe );
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var getOffset,
	rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	getOffset = function( elem, doc, docElem, box ) {
		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow( doc ),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	getOffset = function( elem, doc, docElem ) {
		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var elem = this[0],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return null;
	}

	if ( elem === doc.body ) {
		return jQuery.offset.bodyOffset( elem );
	}

	return getOffset( elem, doc, doc.documentElement );
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					jQuery.support.boxModel && win.document.documentElement[ method ] ||
						win.document.body[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	var clientProp = "client" + name,
		scrollProp = "scroll" + name,
		offsetProp = "offset" + name;

	// innerHeight and innerWidth
	jQuery.fn[ "inner" + name ] = function() {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, "padding" ) ) :
			this[ type ]() :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn[ "outer" + name ] = function( margin ) {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
			this[ type ]() :
			null;
	};

	jQuery.fn[ type ] = function( value ) {
		return jQuery.access( this, function( elem, type, value ) {
			var doc, docElemProp, orig, ret;

			if ( jQuery.isWindow( elem ) ) {
				// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
				doc = elem.document;
				docElemProp = doc.documentElement[ clientProp ];
				return jQuery.support.boxModel && docElemProp ||
					doc.body && doc.body[ clientProp ] || docElemProp;
			}

			// Get document width or height
			if ( elem.nodeType === 9 ) {
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				doc = elem.documentElement;

				// when a window > document, IE6 reports a offset[Width/Height] > client[Width/Height]
				// so we can't use max, as it'll choose the incorrect offset[Width/Height]
				// instead we use the correct client[Width/Height]
				// support:IE6
				if ( doc[ clientProp ] >= doc[ scrollProp ] ) {
					return doc[ clientProp ];
				}

				return Math.max(
					elem.body[ scrollProp ], doc[ scrollProp ],
					elem.body[ offsetProp ], doc[ offsetProp ]
				);
			}

			// Get width or height on the element
			if ( value === undefined ) {
				orig = jQuery.css( elem, type );
				ret = parseFloat( orig );
				return jQuery.isNumeric( ret ) ? ret : orig;
			}

			// Set the width or height on the element
			jQuery( elem ).css( type, value );
		}, type, value, arguments.length, null );
	};
});




// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}



})( window );

;//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      rand = Math.floor(Math.random() * (index + 1));
      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, val, context) {
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      if (a === void 0) return 1;
      if (b === void 0) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj)                                     return [];
    if (_.isArray(obj))                           return slice.call(obj);
    if (_.isArguments(obj))                       return slice.call(obj);
    if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    // The `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) isSorted = true;
    _.reduce(initial, function (memo, value, index) {
      if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1), true);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        result = func.apply(context, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var result = {};
    each(_.flatten(slice.call(arguments, 1)), function(key) {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults(settings || {}, _.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n_.escape(" + unescape(code) + ")+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n(" + unescape(code) + ")+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n;__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __p='';" +
      "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
      source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' +
      source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);

;//     Backbone.js 0.9.9

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to array methods.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.9';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(obj, events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `events` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== (ev.callback._callback || ev.callback)) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(this, events, args);
      if (allEvents) triggerEvents(this, allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(object, events, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = object._listenerId || (object._listenerId = _.uniqueId('l'));
      listeners[id] = object;
      object.on(events, callback || this, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(object, events, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (object) {
        object.off(events, callback, this);
        if (!events && !callback) delete listeners[object._listenerId];
      } else {
        for (var id in listeners) {
          listeners[id].off(null, null, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    this.cid = _.uniqueId('c');
    this.changed = {};
    this.attributes = {};
    this._changes = [];
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs);
    if (defaults = _.result(this, 'defaults')) _.defaults(attrs, defaults);
    this.set(attrs, {silent: true});
    this._currentAttributes = _.clone(this.attributes);
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, val, options) {
      var attr, attrs;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (_.isObject(key)) {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // Extract attributes and options.
      var silent = options && options.silent;
      var unset = options && options.unset;

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var now = this.attributes;

      // For each `set` attribute...
      for (attr in attrs) {
        val = attrs[attr];

        // Update or delete the current value, and track the change.
        unset ? delete now[attr] : now[attr] = val;
        this._changes.push(attr, val);
      }

      // Signal that the model's state has potentially changed, and we need
      // to recompute the actual changes.
      this._hasComputed = false;

      // Fire the `"change"` events.
      if (!silent) this.change(options);
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp), options)) return false;
        if (success) success(model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, current, done;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || _.isObject(key)) {
        attrs = key;
        options = val;
      } else if (key != null) {
        (attrs = {})[key] = val;
      }
      options = options ? _.clone(options) : {};

      // If we're "wait"-ing to set changed attributes, validate early.
      if (options.wait) {
        if (attrs && !this._validate(attrs, options)) return false;
        current = _.clone(this.attributes);
      }

      // Regular saves `set` attributes before persisting to the server.
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }

      // Do not persist invalid models.
      if (!attrs && !this._validate(null, options)) return false;

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        done = true;
        var serverAttrs = model.parse(resp);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (!model.set(serverAttrs, options)) return false;
        if (success) success(model, resp, options);
      };

      // Finish configuring and sending the Ajax request.
      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method == 'patch') options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // When using `wait`, reset attributes to original values unless
      // `success` has been called already.
      if (!done && options.wait) {
        this.clear(silentOptions);
        this.set(current, silentOptions);
      }

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    change: function(options) {
      var changing = this._changing;
      this._changing = true;

      // Generate the changes to be triggered on the model.
      var triggers = this._computeChanges(true);

      this._pending = !!triggers.length;

      for (var i = triggers.length - 2; i >= 0; i -= 2) {
        this.trigger('change:' + triggers[i], this, triggers[i + 1], options);
      }

      if (changing) return this;

      // Trigger a `change` while there have been changes.
      while (this._pending) {
        this._pending = false;
        this.trigger('change', this, options);
        this._previousAttributes = _.clone(this.attributes);
      }

      this._changing = false;
      return this;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (!this._hasComputed) this._computeChanges();
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Looking at the built up list of `set` attribute changes, compute how
    // many of the attributes have actually changed. If `loud`, return a
    // boiled-down list of only the real changes.
    _computeChanges: function(loud) {
      this.changed = {};
      var already = {};
      var triggers = [];
      var current = this._currentAttributes;
      var changes = this._changes;

      // Loop through the current queue of potential model changes.
      for (var i = changes.length - 2; i >= 0; i -= 2) {
        var key = changes[i], val = changes[i + 1];
        if (already[key]) continue;
        already[key] = true;

        // Check if the attribute has been modified since the last change,
        // and update `this.changed` accordingly. If we're inside of a `change`
        // call, also add a trigger to the list.
        if (current[key] !== val) {
          this.changed[key] = val;
          if (!loud) continue;
          triggers.push(key, val);
          current[key] = val;
        }
      }
      if (loud) this._changes = [];

      // Signals `this.changed` is current to prevent duplicate calls from `this.hasChanged`.
      this._hasComputed = true;
      return triggers;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. If a specific `error` callback has
    // been passed, call that instead of firing the general `"error"` event.
    _validate: function(attrs, options) {
      if (!this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(attrs, options);
      if (!error) return true;
      if (options && options.error) options.error(this, error, options);
      this.trigger('error', this, error, options);
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.
    add: function(models, options) {
      var i, args, length, model, existing, needsSort;
      var at = options && options.at;
      var sort = ((options && options.sort) == null ? true : options.sort);
      models = _.isArray(models) ? models.slice() : [models];

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = models.length - 1; i >= 0; i--) {
        if(!(model = this._prepareModel(models[i], options))) {
          this.trigger("error", this, models[i], options);
          models.splice(i, 1);
          continue;
        }
        models[i] = model;

        existing = model.id != null && this._byId[model.id];
        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing || this._byCid[model.cid]) {
          if (options && options.merge && existing) {
            existing.set(model.attributes, options);
            needsSort = sort;
          }
          models.splice(i, 1);
          continue;
        }

        // Listen to added models' events, and index models for lookup by
        // `id` and by `cid`.
        model.on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (models.length) needsSort = sort;
      this.length += models.length;
      args = [at != null ? at : this.models.length, 0];
      push.apply(args, models);
      splice.apply(this.models, args);

      // Sort the collection if appropriate.
      if (needsSort && this.comparator && at == null) this.sort({silent: true});

      if (options && options.silent) return this;

      // Trigger `add` events.
      while (model = models.shift()) {
        model.trigger('add', model, this, options);
      }

      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj.id != null ? obj.id : obj] || this._byCid[obj.cid || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) {
        throw new Error('Cannot sort a set without a comparator');
      }

      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options || !options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Smartly update a collection with a change set of models, adding,
    // removing, and merging as necessary.
    update: function(models, options) {
      var model, i, l, existing;
      var add = [], remove = [], modelMap = {};
      var idAttr = this.model.prototype.idAttribute;
      options = _.extend({add: true, merge: true, remove: true}, options);
      if (options.parse) models = this.parse(models);

      // Allow a single model (or no argument) to be passed.
      if (!_.isArray(models)) models = models ? [models] : [];

      // Proxy to `add` for this case, no need to iterate...
      if (options.add && !options.remove) return this.add(models, options);

      // Determine which models to add and merge, and which to remove.
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i];
        existing = this.get(model.id || model.cid || model[idAttr]);
        if (options.remove && existing) modelMap[existing.cid] = true;
        if ((options.add && !existing) || (options.merge && existing)) {
          add.push(model);
        }
      }
      if (options.remove) {
        for (i = 0, l = this.models.length; i < l; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) remove.push(model);
        }
      }

      // Remove models (if applicable) before we add and merge the rest.
      if (remove.length) this.remove(remove, options);
      if (add.length) this.add(add, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      options || (options = {});
      if (options.parse) models = this.parse(models);
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models;
      this._reset();
      if (models) this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var method = options.update ? 'update' : 'reset';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      var collection = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) collection.add(model, options);
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function() {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) return false;
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'sortedIndex', 'toArray', 'size', 'first', 'head', 'take',
    'initial', 'rest', 'tail', 'last', 'without', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) Backbone.$(el).attr(attributes);
      if (content != null) Backbone.$(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this.make(_.result(this, 'tagName'), attrs), false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    var success = options.success;
    options.success = function(resp, status, xhr) {
      if (success) success(resp, status, xhr);
      model.trigger('sync', model, resp, options);
    };

    var error = options.error;
    options.error = function(xhr, status, thrown) {
      if (error) error(model, xhr, options);
      model.trigger('error', model, xhr, options);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);

;/**
 * |-------------------|
 * | Backbone-Mediator |
 * |-------------------|
 *  Backbone-Mediator is freely distributable under the MIT license.
 *
 *  <a href="https://github.com/chalbert/Backbone-Mediator">More details & documentation</a>
 *
 * @author Nicolas Gilbert
 *
 * @requires _
 * @requires Backbone
 */
(function(factory){
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else {
    factory(_, Backbone);
  }

})(function (_, Backbone){
  'use strict';

  /**
   * @static
   */
  var channels = {},
      Subscriber,
      /** @borrows Backbone.View#delegateEvents */
      delegateEvents = Backbone.View.prototype.delegateEvents,
      /** @borrows Backbone.View#delegateEvents */
      undelegateEvents = Backbone.View.prototype.undelegateEvents;

  /**
   * @class
   */
  Backbone.Mediator = {

    /**
     * Subscribe to a channel
     *
     * @param channel
     */
    subscribe: function(channel, subscription, context, once) {
      if (!channels[channel]) channels[channel] = [];
      channels[channel].push({fn: subscription, context: context || this, once: once});
    },

    /**
     * Trigger all callbacks for a channel
     *
     * @param channel
     * @params N Extra parametter to pass to handler
     */
    publish: function(channel) {
      if (!channels[channel]) return;

      var args = [].slice.call(arguments, 1),
          subscription;

      for (var i = 0; i < channels[channel].length; i++) {
        subscription = channels[channel][i];
        subscription.fn.apply(subscription.context, args);
        if (subscription.once) {
          Backbone.Mediator.unsubscribe(channel, subscription.fn, subscription.context);
          i--;
        }
      }
    },

    /**
     * Cancel subscription
     *
     * @param channel
     * @param fn
     * @param context
     */

    unsubscribe: function(channel, fn, context){
      if (!channels[channel]) return;

      var subscription;
      for (var i = 0; i < channels[channel].length; i++) {
        subscription = channels[channel][i];
        if (subscription.fn === fn && subscription.context === context) {
          channels[channel].splice(i, 1);
          i--;
        }
      }
    },

    /**
     * Subscribing to one event only
     *
     * @param channel
     * @param subscription
     * @param context
     */
    subscribeOnce: function (channel, subscription, context) {
      Backbone.Mediator.subscribe(channel, subscription, context, true);
    }

  };

  /**
   * Allow to define convention-based subscriptions
   * as an 'subscriptions' hash on a view. Subscriptions
   * can then be easily setup and cleaned.
   *
   * @class
   */


  Subscriber = {

    /**
     * Extend delegateEvents() to set subscriptions
     */
    delegateEvents: function(){
      delegateEvents.apply(this, arguments);
      this.setSubscriptions();
    },

    /**
     * Extend undelegateEvents() to unset subscriptions
     */
    undelegateEvents: function(){
      undelegateEvents.apply(this, arguments);
      this.unsetSubscriptions();
    },

    /** @property {Object} List of subscriptions, to be defined */
    subscriptions: {},

    /**
     * Subscribe to each subscription
     * @param {Object} [subscriptions] An optional hash of subscription to add
     */

    setSubscriptions: function(subscriptions){
      if (subscriptions) _.extend(this.subscriptions || {}, subscriptions);
      subscriptions = subscriptions || this.subscriptions;
      if (!subscriptions || _.isEmpty(subscriptions)) return;
      // Just to be sure we don't set duplicate
      this.unsetSubscriptions(subscriptions);

      _.each(subscriptions, function(subscription, channel){
        var once;
        if (subscription.$once) {
          subscription = subscription.$once;
          once = true;
        }
        if (_.isString(subscription)) {
          subscription = this[subscription];
        }
        Backbone.Mediator.subscribe(channel, subscription, this, once);
      }, this);
    },

    /**
     * Unsubscribe to each subscription
     * @param {Object} [subscriptions] An optional hash of subscription to remove
     */
    unsetSubscriptions: function(subscriptions){
      subscriptions = subscriptions || this.subscriptions;
      if (!subscriptions || _.isEmpty(subscriptions)) return;
      _.each(subscriptions, function(subscription, channel){
        if (_.isString(subscription)) {
          subscription = this[subscription];
        }
        Backbone.Mediator.unsubscribe(channel, subscription.$once || subscription, this);
      }, this);
    }
  };

  /**
   * @lends Backbone.View.prototype
   */
  _.extend(Backbone.View.prototype, Subscriber);

  /**
   * @lends Backbone.Mediator
   */
  _.extend(Backbone.Mediator, {
    /**
     * Shortcut for publish
     * @function
     */
    pub: Backbone.Mediator.publish,
    /**
     * Shortcut for subscribe
     * @function
     */
    sub: Backbone.Mediator.subscribe
  });

  return Backbone;

});
;(function() {
  var WebSocket = window.WebSocket || window.MozWebSocket;
  var br = window.brunch || {};
  var ar = br['auto-reload'] || {};
  if (!WebSocket || !ar.enabled) return;

  var cacheBuster = function(url){
    var date = Math.round(Date.now() / 1000).toString();
    url = url.replace(/(\&|\\?)cacheBuster=\d*/, '');
    return url + (url.indexOf('?') >= 0 ? '&' : '?') +'cacheBuster=' + date;
  };

  var reloaders = {
    page: function(){
      window.location.reload(true);
    },

    stylesheet: function(){
      [].slice
        .call(document.querySelectorAll('link[rel="stylesheet"]'))
        .filter(function(link){
          return (link != null && link.href != null);
        })
        .forEach(function(link) {
          link.href = cacheBuster(link.href);
        });
    }
  };
  var port = ar.port || 9485;
  var host = (!br['server']) ? window.location.hostname : br['server'];
  var connection = new WebSocket('ws://' + host + ':' + port);
  connection.onmessage = function(event) {
    var message = event.data;
    var b = window.brunch;
    if (!b || !b['auto-reload'] || !b['auto-reload'].enabled) return;
    if (reloaders[message] != null) {
      reloaders[message]();
    } else {
      reloaders.page();
    }
  };
})();

;// lib/handlebars/base.js

/*jshint eqnull:true*/
this.Handlebars = {};

(function(Handlebars) {

Handlebars.VERSION = "1.0.rc.1";

Handlebars.helpers  = {};
Handlebars.partials = {};

Handlebars.registerHelper = function(name, fn, inverse) {
  if(inverse) { fn.not = inverse; }
  this.helpers[name] = fn;
};

Handlebars.registerPartial = function(name, str) {
  this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

var toString = Object.prototype.toString, functionType = "[object Function]";

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;


  var ret = "";
  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "", data;

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      if (data) { data.index = i; }
      ret = ret + fn(context[i], { data: data });
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});

Handlebars.registerHelper('if', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if(!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  options.fn = inverse;
  options.inverse = fn;

  return Handlebars.helpers['if'].call(this, context, options);
});

Handlebars.registerHelper('with', function(context, options) {
  return options.fn(context);
});

Handlebars.registerHelper('log', function(context) {
  Handlebars.log(context);
});

}(this.Handlebars));
;
// lib/handlebars/utils.js
Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  for (var p in tmp) {
    if (tmp.hasOwnProperty(p)) { this[p] = tmp[p]; }
  }

  this.message = tmp.message;
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

(function() {
  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  var escapeChar = function(chr) {
    return escape[chr] || "&amp;";
  };

  Handlebars.Utils = {
    escapeExpression: function(string) {
      // don't escape SafeStrings, since they're already safe
      if (string instanceof Handlebars.SafeString) {
        return string.toString();
      } else if (string == null || string === false) {
        return "";
      }

      if(!possible.test(string)) { return string; }
      return string.replace(badChars, escapeChar);
    },

    isEmpty: function(value) {
      if (typeof value === "undefined") {
        return true;
      } else if (value === null) {
        return true;
      } else if (value === false) {
        return true;
      } else if(Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
})();;
// lib/handlebars/runtime.js
Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          return Handlebars.VM.program(fn, data);
        } else if(programWrapper) {
          return programWrapper;
        } else {
          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
          return programWrapper;
        }
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop
    };

    return function(context, options) {
      options = options || {};
      return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
    };
  },

  programWithDepth: function(fn, data, $depth) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
  },
  program: function(fn, data) {
    return function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;

;/*
Copyright (c) 2011 Sencha Inc. - Author: Nicolas Garcia Belmonte (http://philogb.github.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 */
(function() {
    window.$jit = function(x) {
        x = x || window;
        for (var y in $jit) {
            if ($jit[y].$extend) {
                x[y] = $jit[y]
            }
        }
    };
    $jit.version = "2.0.1";
    var c = function(w) {
        return document.getElementById(w)
    };
    c.empty = function() {};
    c.extend = function(y, w) {
        for (var x in (w || {})) {
            y[x] = w[x]
        }
        return y
    };
    c.lambda = function(w) {
        return (typeof w == "function") ? w : function() {
            return w
        }
    };
    c.time = Date.now || function() {
        return + new Date
    };
    c.splat = function(x) {
        var w = c.type(x);
        return w ? ((w != "array") ? [x] : x) : []
    };
    c.type = function(x) {
        var w = c.type.s.call(x).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
        if (w != "object") {
            return w
        }
        if (x && x.$$family) {
            return x.$$family
        }
        return (x && x.nodeName && x.nodeType == 1) ? "element" : w
    };
    c.type.s = Object.prototype.toString;
    c.each = function(B, A) {
        var z = c.type(B);
        if (z == "object") {
            for (var y in B) {
                A(B[y], y)
            }
        } else {
            for (var x = 0, w = B.length; x < w; x++) {
                A(B[x], x)
            }
        }
    };
    c.indexOf = function(z, y) {
        if (Array.indexOf) {
            return z.indexOf(y)
        }
        for (var x = 0, w = z.length; x < w; x++) {
            if (z[x] === y) {
                return x
            }
        }
        return -1
    };
    c.map = function(y, x) {
        var w = [];
        c.each(y, function(A, z) {
            w.push(x(A, z))
        });
        return w
    };
    c.reduce = function(A, y, x) {
        var w = A.length;
        if (w == 0) {
            return x
        }
        var z = arguments.length == 3 ? x: A[--w];
        while (w--) {
            z = y(z, A[w])
        }
        return z
    };
    c.merge = function() {
        var A = {};
        for (var z = 0, w = arguments.length; z < w; z++) {
            var x = arguments[z];
            if (c.type(x) != "object") {
                continue
            }
            for (var y in x) {
                var C = x[y], B = A[y];
                A[y] = (B && c.type(C) == "object" && c.type(B) == "object") ? c.merge(B, C) : c.unlink(C)
            }
        }
        return A
    };
    c.unlink = function(y) {
        var x;
        switch (c.type(y)) {
        case"object":
            x = {};
            for (var A in y) {
                x[A] = c.unlink(y[A])
            }
            break;
        case"array":
            x = [];
            for (var z = 0, w = y.length; z < w; z++) {
                x[z] = c.unlink(y[z])
            }
            break;
        default:
            return y
        }
        return x
    };
    c.zip = function() {
        if (arguments.length === 0) {
            return []
        }
        for (var y = 0, x = [], w = arguments.length, B = arguments[0].length; y < B; y++) {
            for (var z = 0, A = []; z < w; z++) {
                A.push(arguments[z][y])
            }
            x.push(A)
        }
        return x
    };
    c.rgbToHex = function(A, z) {
        if (A.length < 3) {
            return null
        }
        if (A.length == 4 && A[3] == 0&&!z) {
            return "transparent"
        }
        var x = [];
        for (var w = 0; w < 3; w++) {
            var y = (A[w]-0).toString(16);
            x.push(y.length == 1 ? "0" + y : y)
        }
        return z ? x : "#" + x.join("")
    };
    c.hexToRgb = function(y) {
        if (y.length != 7) {
            y = y.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
            y.shift();
            if (y.length != 3) {
                return null
            }
            var w = [];
            for (var x = 0; x < 3; x++) {
                var z = y[x];
                if (z.length == 1) {
                    z += z
                }
                w.push(parseInt(z, 16))
            }
            return w
        } else {
            y = parseInt(y.slice(1), 16);
            return [y>>16, y>>8 & 255, y & 255]
        }
    };
    c.destroy = function(w) {
        c.clean(w);
        if (w.parentNode) {
            w.parentNode.removeChild(w)
        }
        if (w.clearAttributes) {
            w.clearAttributes()
        }
    };
    c.clean = function(z) {
        for (var y = z.childNodes, x = 0, w = y.length; x < w; x++) {
            c.destroy(y[x])
        }
    };
    c.addEvent = function(y, x, w) {
        if (y.addEventListener) {
            y.addEventListener(x, w, false)
        } else {
            y.attachEvent("on" + x, w)
        }
    };
    c.addEvents = function(x, y) {
        for (var w in y) {
            c.addEvent(x, w, y[w])
        }
    };
    c.hasClass = function(x, w) {
        return (" " + x.className + " ").indexOf(" " + w + " ")>-1
    };
    c.addClass = function(x, w) {
        if (!c.hasClass(x, w)) {
            x.className = (x.className + " " + w)
        }
    };
    c.removeClass = function(x, w) {
        x.className = x.className.replace(new RegExp("(^|\\s)" + w + "(?:\\s|$)"), "$1")
    };
    c.getPos = function(y) {
        var B = A(y);
        var w = z(y);
        return {
            x: B.x - w.x,
            y: B.y - w.y
        };
        function A(D) {
            var C = {
                x: 0,
                y: 0
            };
            while (D&&!x(D)) {
                C.x += D.offsetLeft;
                C.y += D.offsetTop;
                D = D.offsetParent
            }
            return C
        }
        function z(D) {
            var C = {
                x: 0,
                y: 0
            };
            while (D&&!x(D)) {
                C.x += D.scrollLeft;
                C.y += D.scrollTop;
                D = D.parentNode
            }
            return C
        }
        function x(C) {
            return (/^(?:body|html)$/i).test(C.tagName)
        }
    };
    c.event = {
        get: function(x, w) {
            w = w || window;
            return x || w.event
        },
        getWheel: function(w) {
            return w.wheelDelta ? w.wheelDelta / 120 : - (w.detail || 0) / 3
        },
        isRightClick: function(w) {
            return (w.which == 3 || w.button == 2)
        },
        getPos: function(z, y) {
            y = y || window;
            z = z || y.event;
            var x = y.document;
            x = x.documentElement || x.body;
            if (z.touches && z.touches.length) {
                z = z.touches[0]
            }
            var w = {
                x: z.pageX || (z.clientX + x.scrollLeft),
                y: z.pageY || (z.clientY + x.scrollTop)
            };
            return w
        },
        stop: function(w) {
            if (w.stopPropagation) {
                w.stopPropagation()
            }
            w.cancelBubble = true;
            if (w.preventDefault) {
                w.preventDefault()
            } else {
                w.returnValue = false
            }
        }
    };
    $jit.util = $jit.id = c;
    var q = function(x) {
        x = x || {};
        var w = function() {
            for (var A in this) {
                if (typeof this[A] != "function") {
                    this[A] = c.unlink(this[A])
                }
            }
            this.constructor = w;
            if (q.prototyping) {
                return this
            }
            var z = this.initialize ? this.initialize.apply(this, arguments): this;
            this.$$family = "class";
            return z
        };
        for (var y in q.Mutators) {
            if (!x[y]) {
                continue
            }
            x = q.Mutators[y](x, x[y]);
            delete x[y]
        }
        c.extend(w, this);
        w.constructor = q;
        w.prototype = x;
        return w
    };
    q.Mutators = {
        Implements: function(w, x) {
            c.each(c.splat(x), function(z) {
                q.prototyping = z;
                var y = (typeof z == "function") ? new z: z;
                for (var A in y) {
                    if (!(A in w)) {
                        w[A] = y[A]
                    }
                }
                delete q.prototyping
            });
            return w
        }
    };
    c.extend(q, {
        inherit: function(w, z) {
            for (var y in z) {
                var x = z[y];
                var B = w[y];
                var A = c.type(x);
                if (B && A == "function") {
                    if (x != B) {
                        q.override(w, y, x)
                    }
                } else {
                    if (A == "object") {
                        w[y] = c.merge(B, x)
                    } else {
                        w[y] = x
                    }
                }
            }
            return w
        },
        override: function(x, w, A) {
            var z = q.prototyping;
            if (z && x[w] != z[w]) {
                z = null
            }
            var y = function() {
                var B = this.parent;
                this.parent = z ? z[w] : x[w];
                var C = A.apply(this, arguments);
                this.parent = B;
                return C
            };
            x[w] = y
        }
    });
    q.prototype.implement = function() {
        var w = this.prototype;
        c.each(Array.prototype.slice.call(arguments || []), function(x) {
            q.inherit(w, x)
        });
        return this
    };
    $jit.Class = q;
    $jit.json = {
        prune: function(x, w) {
            this.each(x, function(z, y) {
                if (y == w && z.children) {
                    delete z.children;
                    z.children = []
                }
            })
        },
        getParent: function(w, A) {
            if (w.id == A) {
                return false
            }
            var z = w.children;
            if (z && z.length > 0) {
                for (var y = 0; y < z.length; y++) {
                    if (z[y].id == A) {
                        return w
                    } else {
                        var x = this.getParent(z[y], A);
                        if (x) {
                            return x
                        }
                    }
                }
            }
            return false
        },
        getSubtree: function(w, A) {
            if (w.id == A) {
                return w
            }
            for (var y = 0, z = w.children; z && y < z.length; y++) {
                var x = this.getSubtree(z[y], A);
                if (x != null) {
                    return x
                }
            }
            return null
        },
        eachLevel: function(w, B, y, A) {
            if (B <= y) {
                A(w, B);
                if (!w.children) {
                    return 
                }
                for (var x = 0, z = w.children; x < z.length; x++) {
                    this.eachLevel(z[x], B + 1, y, A)
                }
            }
        },
        each: function(w, x) {
            this.eachLevel(w, 0, Number.MAX_VALUE, x)
        }
    };
    $jit.Trans = {
        $extend: true,
        linear: function(w) {
            return w
        }
    };
    var i = $jit.Trans;
    (function() {
        var w = function(z, y) {
            y = c.splat(y);
            return c.extend(z, {
                easeIn: function(A) {
                    return z(A, y)
                },
                easeOut: function(A) {
                    return 1 - z(1 - A, y)
                },
                easeInOut: function(A) {
                    return (A <= 0.5) ? z(2 * A, y) / 2 : (2 - z(2 * (1 - A), y)) / 2
                }
            })
        };
        var x = {
            Pow: function(z, y) {
                return Math.pow(z, y[0] || 6)
            },
            Expo: function(y) {
                return Math.pow(2, 8 * (y-1))
            },
            Circ: function(y) {
                return 1 - Math.sin(Math.acos(y))
            },
            Sine: function(y) {
                return 1 - Math.sin((1 - y) * Math.PI / 2)
            },
            Back: function(z, y) {
                y = y[0] || 1.618;
                return Math.pow(z, 2) * ((y + 1) * z - y)
            },
            Bounce: function(B) {
                var A;
                for (var z = 0, y = 1; 1; z += y, y/=2) {
                    if (B >= (7-4 * z) / 11) {
                        A = y * y - Math.pow((11-6 * z-11 * B) / 4, 2);
                        break
                    }
                }
                return A
            },
            Elastic: function(z, y) {
                return Math.pow(2, 10*--z) * Math.cos(20 * z * Math.PI * (y[0] || 1) / 3)
            }
        };
        c.each(x, function(z, y) {
            i[y] = w(z)
        });
        c.each(["Quad", "Cubic", "Quart", "Quint"], function(z, y) {
            i[z] = w(function(A) {
                return Math.pow(A, [y + 2])
            })
        })
    })();
    var u = new q({
        initialize: function(w) {
            this.setOptions(w)
        },
        setOptions: function(w) {
            var x = {
                duration: 2500,
                fps: 40,
                transition: i.Quart.easeInOut,
                compute: c.empty,
                complete: c.empty,
                link: "ignore"
            };
            this.opt = c.merge(x, w || {});
            return this
        },
        step: function() {
            var x = c.time(), w = this.opt;
            if (x < this.time + w.duration) {
                var y = w.transition((x - this.time) / w.duration);
                w.compute(y)
            } else {
                this.timer = clearInterval(this.timer);
                w.compute(1);
                w.complete()
            }
        },
        start: function() {
            if (!this.check()) {
                return this
            }
            this.time = 0;
            this.startTimer();
            return this
        },
        startTimer: function() {
            var w = this, x = this.opt.fps;
            if (this.timer) {
                return false
            }
            this.time = c.time() - this.time;
            this.timer = setInterval((function() {
                w.step()
            }), Math.round(1000 / x));
            return true
        },
        pause: function() {
            this.stopTimer();
            return this
        },
        resume: function() {
            this.startTimer();
            return this
        },
        stopTimer: function() {
            if (!this.timer) {
                return false
            }
            this.time = c.time() - this.time;
            this.timer = clearInterval(this.timer);
            return true
        },
        check: function() {
            if (!this.timer) {
                return true
            }
            if (this.opt.link == "cancel") {
                this.stopTimer();
                return true
            }
            return false
        }
    });
    var n = function() {
        var y = arguments;
        for (var A = 0, w = y.length, x = {}; A < w; A++) {
            var z = n[y[A]];
            if (z.$extend) {
                c.extend(x, z)
            } else {
                x[y[A]] = z
            }
        }
        return x
    };
    n.AreaChart = {
        $extend: true,
        animate: true,
        labelOffset: 3,
        type: "stacked",
        Tips: {
            enable: false,
            onShow: c.empty,
            onHide: c.empty
        },
        Events: {
            enable: false,
            onClick: c.empty
        },
        selectOnHover: true,
        showAggregates: true,
        showLabels: true,
        filterOnClick: false,
        restoreOnRightClick: false
    };
    n.Margin = {
        $extend: false,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    n.Canvas = {
        $extend: true,
        injectInto: "id",
        type: "2D",
        width: false,
        height: false,
        useCanvas: false,
        withLabels: true,
        background: false,
        Scene: {
            Lighting: {
                enable: false,
                ambient: [1, 1, 1],
                directional: {
                    direction: {
                        x: -100,
                        y: -100,
                        z: -100
                    },
                    color: [0.5, 0.3, 0.1]
                }
            }
        }
    };
    n.Tree = {
        $extend: true,
        orientation: "left",
        subtreeOffset: 8,
        siblingOffset: 5,
        indent: 10,
        multitree: false,
        align: "center"
    };
    n.Node = {
        $extend: false,
        overridable: false,
        type: "circle",
        color: "#ccb",
        alpha: 1,
        dim: 3,
        height: 20,
        width: 90,
        autoHeight: false,
        autoWidth: false,
        lineWidth: 1,
        transform: true,
        align: "center",
        angularWidth: 1,
        span: 1,
        CanvasStyles: {}
    };
    n.Edge = {
        $extend: false,
        overridable: false,
        type: "line",
        color: "#ccb",
        lineWidth: 1,
        dim: 15,
        alpha: 1,
        epsilon: 7,
        CanvasStyles: {}
    };
    n.Fx = {
        $extend: true,
        fps: 40,
        duration: 2500,
        transition: $jit.Trans.Quart.easeInOut,
        clearCanvas: true
    };
    n.Label = {
        $extend: false,
        overridable: false,
        type: "HTML",
        style: " ",
        size: 10,
        family: "sans-serif",
        textAlign: "center",
        textBaseline: "alphabetic",
        color: "#fff"
    };
    n.Tips = {
        $extend: false,
        enable: false,
        type: "auto",
        offsetX: 20,
        offsetY: 20,
        force: false,
        onShow: c.empty,
        onHide: c.empty
    };
    n.NodeStyles = {
        $extend: false,
        enable: false,
        type: "auto",
        stylesHover: false,
        stylesClick: false
    };
    n.Events = {
        $extend: false,
        enable: false,
        enableForEdges: false,
        type: "auto",
        onClick: c.empty,
        onRightClick: c.empty,
        onMouseMove: c.empty,
        onMouseEnter: c.empty,
        onMouseLeave: c.empty,
        onDragStart: c.empty,
        onDragMove: c.empty,
        onDragCancel: c.empty,
        onDragEnd: c.empty,
        onTouchStart: c.empty,
        onTouchMove: c.empty,
        onTouchEnd: c.empty,
        onMouseWheel: c.empty
    };
    n.Navigation = {
        $extend: false,
        enable: false,
        type: "auto",
        panning: false,
        zooming: false
    };
    n.Controller = {
        $extend: true,
        onBeforeCompute: c.empty,
        onAfterCompute: c.empty,
        onCreateLabel: c.empty,
        onPlaceLabel: c.empty,
        onComplete: c.empty,
        onBeforePlotLine: c.empty,
        onAfterPlotLine: c.empty,
        onBeforePlotNode: c.empty,
        onAfterPlotNode: c.empty,
        request: false
    };
    var t = {
        initialize: function(y, w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config[y];
            this.nodeTypes = w.fx.nodeTypes;
            var x = this.config.type;
            this.dom = x == "auto" ? (w.config.Label.type != "Native") : (x != "Native");
            this.labelContainer = this.dom && w.labels.getLabelContainer();
            this.isEnabled() && this.initializePost()
        },
        initializePost: c.empty,
        setAsProperty: c.lambda(false),
        isEnabled: function() {
            return this.config.enable
        },
        isLabel: function(B, A, z) {
            B = c.event.get(B, A);
            var w = this.labelContainer, y = B.target || B.srcElement, x = B.relatedTarget;
            if (z) {
                return x && x == this.viz.canvas.getCtx().canvas&&!!y && this.isDescendantOf(y, w)
            } else {
                return this.isDescendantOf(y, w)
            }
        },
        isDescendantOf: function(x, w) {
            while (x && x.parentNode) {
                if (x.parentNode == w) {
                    return x
                }
                x = x.parentNode
            }
            return false
        }
    };
    var h = {
        onMouseUp: c.empty,
        onMouseDown: c.empty,
        onMouseMove: c.empty,
        onMouseOver: c.empty,
        onMouseOut: c.empty,
        onMouseWheel: c.empty,
        onTouchStart: c.empty,
        onTouchMove: c.empty,
        onTouchEnd: c.empty,
        onTouchCancel: c.empty
    };
    var s = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.node = false;
            this.edge = false;
            this.registeredObjects = [];
            this.attachEvents()
        },
        attachEvents: function() {
            var y = this.canvas.getElement(), x = this;
            y.oncontextmenu = c.lambda(false);
            c.addEvents(y, {
                mouseup: function(B, A) {
                    var z = c.event.get(B, A);
                    x.handleEvent("MouseUp", B, A, x.makeEventObject(B, A), c.event.isRightClick(z))
                },
                mousedown: function(B, A) {
                    var z = c.event.get(B, A);
                    x.handleEvent("MouseDown", B, A, x.makeEventObject(B, A), c.event.isRightClick(z))
                },
                mousemove: function(A, z) {
                    x.handleEvent("MouseMove", A, z, x.makeEventObject(A, z))
                },
                mouseover: function(A, z) {
                    x.handleEvent("MouseOver", A, z, x.makeEventObject(A, z))
                },
                mouseout: function(A, z) {
                    x.handleEvent("MouseOut", A, z, x.makeEventObject(A, z))
                },
                touchstart: function(A, z) {
                    x.handleEvent("TouchStart", A, z, x.makeEventObject(A, z))
                },
                touchmove: function(A, z) {
                    x.handleEvent("TouchMove", A, z, x.makeEventObject(A, z))
                },
                touchend: function(A, z) {
                    x.handleEvent("TouchEnd", A, z, x.makeEventObject(A, z))
                }
            });
            var w = function(C, B) {
                var A = c.event.get(C, B);
                var z = c.event.getWheel(A);
                x.handleEvent("MouseWheel", C, B, z)
            };
            if (!document.getBoxObjectFor && window.mozInnerScreenX == null) {
                c.addEvent(y, "mousewheel", w)
            } else {
                y.addEventListener("DOMMouseScroll", w, false)
            }
        },
        register: function(w) {
            this.registeredObjects.push(w)
        },
        handleEvent: function() {
            var x = Array.prototype.slice.call(arguments), A = x.shift();
            for (var z = 0, y = this.registeredObjects, w = y.length; z < w; z++) {
                y[z]["on" + A].apply(y[z], x)
            }
        },
        makeEventObject: function(C, B) {
            var z = this, A = this.viz.graph, y = this.viz.fx, x = y.nodeTypes, w = y.edgeTypes;
            return {
                pos: false,
                node: false,
                edge: false,
                contains: false,
                getNodeCalled: false,
                getEdgeCalled: false,
                getPos: function() {
                    var F = z.viz.canvas, G = F.getSize(), H = F.getPos(), E = F.translateOffsetX, D = F.translateOffsetY, K = F.scaleOffsetX, I = F.scaleOffsetY, J = c.event.getPos(C, B);
                    this.pos = {
                        x: (J.x - H.x - G.width / 2 - E) * 1 / K,
                        y: (J.y - H.y - G.height / 2 - D) * 1 / I
                    };
                    return this.pos
                },
                getNode: function() {
                    if (this.getNodeCalled) {
                        return this.node
                    }
                    this.getNodeCalled = true;
                    for (var G in A.nodes) {
                        var F = A.nodes[G], E = F && x[F.getData("type")], D = E && E.contains && E.contains.call(y, F, this.getPos());
                        if (D) {
                            this.contains = D;
                            return z.node = this.node = F
                        }
                    }
                    return z.node = this.node = false
                },
                getEdge: function() {
                    if (this.getEdgeCalled) {
                        return this.edge
                    }
                    this.getEdgeCalled = true;
                    var F = {};
                    for (var J in A.edges) {
                        var H = A.edges[J];
                        F[J] = true;
                        for (var I in H) {
                            if (I in F) {
                                continue
                            }
                            var G = H[I], E = G && w[G.getData("type")], D = E && E.contains && E.contains.call(y, G, this.getPos());
                            if (D) {
                                this.contains = D;
                                return z.edge = this.edge = G
                            }
                        }
                    }
                    return z.edge = this.edge = false
                },
                getContains: function() {
                    if (this.getNodeCalled) {
                        return this.contains
                    }
                    this.getNode();
                    return this.contains
                }
            }
        }
    });
    var o = {
        initializeExtras: function() {
            var x = new s(this), w = this;
            c.each(["NodeStyles", "Tips", "Navigation", "Events"], function(y) {
                var z = new o.Classes[y](y, w);
                if (z.isEnabled()) {
                    x.register(z)
                }
                if (z.setAsProperty()) {
                    w[y.toLowerCase()] = z
                }
            })
        }
    };
    o.Classes = {};
    o.Classes.Events = new q({
        Implements: [t, h],
        initializePost: function() {
            this.fx = this.viz.fx;
            this.ntypes = this.viz.fx.nodeTypes;
            this.etypes = this.viz.fx.edgeTypes;
            this.hovered = false;
            this.pressed = false;
            this.touched = false;
            this.touchMoved = false;
            this.moved = false
        },
        setAsProperty: c.lambda(true),
        onMouseUp: function(A, z, x, y) {
            var w = c.event.get(A, z);
            if (!this.moved) {
                if (y) {
                    this.config.onRightClick(this.hovered, x, w)
                } else {
                    this.config.onClick(this.pressed, x, w)
                }
            }
            if (this.pressed) {
                if (this.moved) {
                    this.config.onDragEnd(this.pressed, x, w)
                } else {
                    this.config.onDragCancel(this.pressed, x, w)
                }
                this.pressed = this.moved = false
            }
        },
        onMouseOut: function(B, A, z) {
            var x = c.event.get(B, A), y;
            if (this.dom && (y = this.isLabel(B, A, true))) {
                this.config.onMouseLeave(this.viz.graph.getNode(y.id), z, x);
                this.hovered = false;
                return 
            }
            var w = x.relatedTarget, C = this.canvas.getElement();
            while (w && w.parentNode) {
                if (C == w.parentNode) {
                    return 
                }
                w = w.parentNode
            }
            if (this.hovered) {
                this.config.onMouseLeave(this.hovered, z, x);
                this.hovered = false
            }
        },
        onMouseOver: function(A, z, y) {
            var w = c.event.get(A, z), x;
            if (this.dom && (x = this.isLabel(A, z, true))) {
                this.hovered = this.viz.graph.getNode(x.id);
                this.config.onMouseEnter(this.hovered, y, w)
            }
        },
        onMouseMove: function(C, B, A) {
            var x, w = c.event.get(C, B);
            if (this.pressed) {
                this.moved = true;
                this.config.onDragMove(this.pressed, A, w);
                return 
            }
            if (this.dom) {
                this.config.onMouseMove(this.hovered, A, w)
            } else {
                if (this.hovered) {
                    var D = this.hovered;
                    var z = D.nodeFrom ? this.etypes[D.getData("type")]: this.ntypes[D.getData("type")];
                    var y = z && z.contains && z.contains.call(this.fx, D, A.getPos());
                    if (y) {
                        this.config.onMouseMove(D, A, w);
                        return 
                    } else {
                        this.config.onMouseLeave(D, A, w);
                        this.hovered = false
                    }
                }
                if (this.hovered = (A.getNode() || (this.config.enableForEdges && A.getEdge()))) {
                    this.config.onMouseEnter(this.hovered, A, w)
                } else {
                    this.config.onMouseMove(false, A, w)
                }
            }
        },
        onMouseWheel: function(x, w, y) {
            this.config.onMouseWheel(y, c.event.get(x, w))
        },
        onMouseDown: function(A, z, y) {
            var w = c.event.get(A, z), x;
            if (this.dom) {
                if (x = this.isLabel(A, z)) {
                    this.pressed = this.viz.graph.getNode(x.id)
                }
            } else {
                this.pressed = y.getNode() || (this.config.enableForEdges && y.getEdge())
            }
            this.pressed && this.config.onDragStart(this.pressed, y, w)
        },
        onTouchStart: function(A, z, y) {
            var w = c.event.get(A, z), x;
            if (this.dom && (x = this.isLabel(A, z))) {
                this.touched = this.viz.graph.getNode(x.id)
            } else {
                this.touched = y.getNode() || (this.config.enableForEdges && y.getEdge())
            }
            this.touched && this.config.onTouchStart(this.touched, y, w)
        },
        onTouchMove: function(z, y, x) {
            var w = c.event.get(z, y);
            if (this.touched) {
                this.touchMoved = true;
                this.config.onTouchMove(this.touched, x, w)
            }
        },
        onTouchEnd: function(z, y, x) {
            var w = c.event.get(z, y);
            if (this.touched) {
                if (this.touchMoved) {
                    this.config.onTouchEnd(this.touched, x, w)
                } else {
                    this.config.onTouchCancel(this.touched, x, w)
                }
                this.touched = this.touchMoved = false
            }
        }
    });
    o.Classes.Tips = new q({
        Implements: [t, h],
        initializePost: function() {
            if (document.body) {
                var w = c("_tooltip") || document.createElement("div");
                w.id = "_tooltip";
                w.className = "tip";
                c.extend(w.style, {
                    position: "absolute",
                    display: "none",
                    zIndex: 13000
                });
                document.body.appendChild(w);
                this.tip = w;
                this.node = false
            }
        },
        setAsProperty: c.lambda(true),
        onMouseOut: function(z, y) {
            var x = c.event.get(z, y);
            if (this.dom && this.isLabel(z, y, true)) {
                this.hide(true);
                return 
            }
            var w = z.relatedTarget, A = this.canvas.getElement();
            while (w && w.parentNode) {
                if (A == w.parentNode) {
                    return 
                }
                w = w.parentNode
            }
            this.hide(false)
        },
        onMouseOver: function(y, x) {
            var w;
            if (this.dom && (w = this.isLabel(y, x, false))) {
                this.node = this.viz.graph.getNode(w.id);
                this.config.onShow(this.tip, this.node, w)
            }
        },
        onMouseMove: function(z, y, w) {
            if (this.dom && this.isLabel(z, y)) {
                this.setTooltipPosition(c.event.getPos(z, y))
            }
            if (!this.dom) {
                var x = w.getNode();
                if (!x) {
                    this.hide(true);
                    return 
                }
                if (this.config.force ||!this.node || this.node.id != x.id) {
                    this.node = x;
                    this.config.onShow(this.tip, x, w.getContains())
                }
                this.setTooltipPosition(c.event.getPos(z, y))
            }
        },
        setTooltipPosition: function(F) {
            var B = this.tip, A = B.style, z = this.config;
            A.display = "";
            var D = {
                height: document.body.clientHeight,
                width: document.body.clientWidth
            };
            var C = {
                width: B.offsetWidth,
                height: B.offsetHeight
            };
            var w = z.offsetX, E = z.offsetY;
            A.top = ((F.y + E + C.height > D.height) ? (F.y - C.height - E) : F.y + E) + "px";
            A.left = ((F.x + C.width + w > D.width) ? (F.x - C.width - w) : F.x + w) + "px"
        },
        hide: function(w) {
            this.tip.style.display = "none";
            w && this.config.onHide()
        }
    });
    o.Classes.NodeStyles = new q({
        Implements: [t, h],
        initializePost: function() {
            this.fx = this.viz.fx;
            this.types = this.viz.fx.nodeTypes;
            this.nStyles = this.config;
            this.nodeStylesOnHover = this.nStyles.stylesHover;
            this.nodeStylesOnClick = this.nStyles.stylesClick;
            this.hoveredNode = false;
            this.fx.nodeFxAnimation = new u();
            this.down = false;
            this.move = false
        },
        onMouseOut: function(y, x) {
            this.down = this.move = false;
            if (!this.hoveredNode) {
                return 
            }
            if (this.dom && this.isLabel(y, x, true)) {
                this.toggleStylesOnHover(this.hoveredNode, false)
            }
            var w = y.relatedTarget, z = this.canvas.getElement();
            while (w && w.parentNode) {
                if (z == w.parentNode) {
                    return 
                }
                w = w.parentNode
            }
            this.toggleStylesOnHover(this.hoveredNode, false);
            this.hoveredNode = false
        },
        onMouseOver: function(z, y) {
            var w;
            if (this.dom && (w = this.isLabel(z, y, true))) {
                var x = this.viz.graph.getNode(w.id);
                if (x.selected) {
                    return 
                }
                this.hoveredNode = x;
                this.toggleStylesOnHover(this.hoveredNode, true)
            }
        },
        onMouseDown: function(A, z, x, y) {
            if (y) {
                return 
            }
            var w;
            if (this.dom && (w = this.isLabel(A, z))) {
                this.down = this.viz.graph.getNode(w.id)
            } else {
                if (!this.dom) {
                    this.down = x.getNode()
                }
            }
            this.move = false
        },
        onMouseUp: function(z, y, w, x) {
            if (x) {
                return 
            }
            if (!this.move) {
                this.onClick(w.getNode())
            }
            this.down = this.move = false
        },
        getRestoredStyles: function(x, w) {
            var z = {}, y = this["nodeStylesOn" + w];
            for (var A in y) {
                z[A] = x.styles["$" + A]
            }
            return z
        },
        toggleStylesOnHover: function(w, x) {
            if (this.nodeStylesOnHover) {
                this.toggleStylesOn("Hover", w, x)
            }
        },
        toggleStylesOnClick: function(w, x) {
            if (this.nodeStylesOnClick) {
                this.toggleStylesOn("Click", w, x)
            }
        },
        toggleStylesOn: function(A, w, C) {
            var D = this.viz;
            var B = this.nStyles;
            if (C) {
                var z = this;
                if (!w.styles) {
                    w.styles = c.merge(w.data, {})
                }
                for (var E in this["nodeStylesOn" + A]) {
                    var x = "$" + E;
                    if (!(x in w.styles)) {
                        w.styles[x] = w.getData(E)
                    }
                }
                D.fx.nodeFx(c.extend({
                    elements: {
                        id: w.id,
                        properties: z["nodeStylesOn" + A]
                    },
                    transition: i.Quart.easeOut,
                    duration: 300,
                    fps: 40
                }, this.config))
            } else {
                var y = this.getRestoredStyles(w, A);
                D.fx.nodeFx(c.extend({
                    elements: {
                        id: w.id,
                        properties: y
                    },
                    transition: i.Quart.easeOut,
                    duration: 300,
                    fps: 40
                }, this.config))
            }
        },
        onClick: function(w) {
            if (!w) {
                return 
            }
            var x = this.nodeStylesOnClick;
            if (!x) {
                return 
            }
            if (w.selected) {
                this.toggleStylesOnClick(w, false);
                delete w.selected
            } else {
                this.viz.graph.eachNode(function(z) {
                    if (z.selected) {
                        for (var y in x) {
                            z.setData(y, z.styles["$" + y], "end")
                        }
                        delete z.selected
                    }
                });
                this.toggleStylesOnClick(w, true);
                w.selected = true;
                delete w.hovered;
                this.hoveredNode = false
            }
        },
        onMouseMove: function(C, B, z) {
            if (this.down) {
                this.move = true
            }
            if (this.dom && this.isLabel(C, B)) {
                return 
            }
            var A = this.nodeStylesOnHover;
            if (!A) {
                return 
            }
            if (!this.dom) {
                if (this.hoveredNode) {
                    var x = this.types[this.hoveredNode.getData("type")];
                    var w = x && x.contains && x.contains.call(this.fx, this.hoveredNode, z.getPos());
                    if (w) {
                        return 
                    }
                }
                var y = z.getNode();
                if (!this.hoveredNode&&!y) {
                    return 
                }
                if (y.hovered) {
                    return 
                }
                if (y&&!y.selected) {
                    this.fx.nodeFxAnimation.stopTimer();
                    this.viz.graph.eachNode(function(E) {
                        if (E.hovered&&!E.selected) {
                            for (var D in A) {
                                E.setData(D, E.styles["$" + D], "end")
                            }
                            delete E.hovered
                        }
                    });
                    y.hovered = true;
                    this.hoveredNode = y;
                    this.toggleStylesOnHover(y, true)
                } else {
                    if (this.hoveredNode&&!this.hoveredNode.selected) {
                        this.fx.nodeFxAnimation.stopTimer();
                        this.toggleStylesOnHover(this.hoveredNode, false);
                        delete this.hoveredNode.hovered;
                        this.hoveredNode = false
                    }
                }
            }
        }
    });
    o.Classes.Navigation = new q({
        Implements: [t, h],
        initializePost: function() {
            this.pos = false;
            this.pressed = false
        },
        onMouseWheel: function(z, y, w) {
            if (!this.config.zooming) {
                return 
            }
            c.event.stop(c.event.get(z, y));
            var A = this.config.zooming / 1000, x = 1 + w * A;
            this.canvas.scale(x, x)
        },
        onMouseDown: function(B, A, z) {
            if (!this.config.panning) {
                return 
            }
            if (this.config.panning == "avoid nodes" && (this.dom ? this.isLabel(B, A) : z.getNode())) {
                return 
            }
            this.pressed = true;
            this.pos = z.getPos();
            var y = this.canvas, x = y.translateOffsetX, w = y.translateOffsetY, D = y.scaleOffsetX, C = y.scaleOffsetY;
            this.pos.x*=D;
            this.pos.x += x;
            this.pos.y*=C;
            this.pos.y += w
        },
        onMouseMove: function(D, C, F) {
            if (!this.config.panning) {
                return 
            }
            if (!this.pressed) {
                return 
            }
            if (this.config.panning == "avoid nodes" && (this.dom ? this.isLabel(D, C) : F.getNode())) {
                return 
            }
            var B = this.pos, E = F.getPos(), z = this.canvas, A = z.translateOffsetX, w = z.translateOffsetY, J = z.scaleOffsetX, H = z.scaleOffsetY;
            E.x*=J;
            E.y*=H;
            E.x += A;
            E.y += w;
            var I = E.x - B.x, G = E.y - B.y;
            this.pos = E;
            this.canvas.translate(I * 1 / J, G * 1 / H)
        },
        onMouseUp: function(z, y, x, w) {
            if (!this.config.panning) {
                return 
            }
            this.pressed = false
        }
    });
    var l;
    (function() {
        var w = typeof HTMLCanvasElement, y = (w == "object" || w == "function");
        function x(z, A) {
            var B = document.createElement(z);
            for (var C in A) {
                if (typeof A[C] == "object") {
                    c.extend(B[C], A[C])
                } else {
                    B[C] = A[C]
                }
            }
            if (z == "canvas"&&!y && G_vmlCanvasManager) {
                B = G_vmlCanvasManager.initElement(document.body.appendChild(B))
            }
            return B
        }
        $jit.Canvas = l = new q({
            canvases: [],
            pos: false,
            element: false,
            labelContainer: false,
            translateOffsetX: 0,
            translateOffsetY: 0,
            scaleOffsetX: 1,
            scaleOffsetY: 1,
            initialize: function(L, E) {
                this.viz = L;
                this.opt = this.config = E;
                var B = c.type(E.injectInto) == "string" ? E.injectInto: E.injectInto.id, K = E.type, C = B + "-label", z = c(B), D = E.width || z.offsetWidth, M = E.height || z.offsetHeight;
                this.id = B;
                var F = {
                    injectInto: B,
                    width: D,
                    height: M
                };
                this.element = x("div", {
                    id: B + "-canvaswidget",
                    style: {
                        position: "relative",
                        width: D + "px",
                        height: M + "px"
                    }
                });
                this.labelContainer = this.createLabelContainer(E.Label.type, C, F);
                this.canvases.push(new l.Base[K]({
                    config: c.extend({
                        idSuffix: "-canvas"
                    }, F),
                    plot: function(N) {
                        L.fx.plot()
                    },
                    resize: function() {
                        L.refresh()
                    }
                }));
                var G = E.background;
                if (G) {
                    var J = new l.Background[G.type](L, c.extend(G, F));
                    this.canvases.push(new l.Base[K](J))
                }
                var I = this.canvases.length;
                while (I--) {
                    this.element.appendChild(this.canvases[I].canvas);
                    if (I > 0) {
                        this.canvases[I].plot()
                    }
                }
                this.element.appendChild(this.labelContainer);
                z.appendChild(this.element);
                var A = null, H = this;
                c.addEvent(window, "scroll", function() {
                    clearTimeout(A);
                    A = setTimeout(function() {
                        H.getPos(true)
                    }, 500)
                })
            },
            getCtx: function(z) {
                return this.canvases[z || 0].getCtx()
            },
            getConfig: function() {
                return this.opt
            },
            getElement: function() {
                return this.element
            },
            getSize: function(z) {
                return this.canvases[z || 0].getSize()
            },
            resize: function(D, z) {
                this.getPos(true);
                this.translateOffsetX = this.translateOffsetY = 0;
                this.scaleOffsetX = this.scaleOffsetY = 1;
                for (var B = 0, A = this.canvases.length; B < A; B++) {
                    this.canvases[B].resize(D, z)
                }
                var C = this.element.style;
                C.width = D + "px";
                C.height = z + "px";
                if (this.labelContainer) {
                    this.labelContainer.style.width = D + "px"
                }
            },
            translate: function(z, D, C) {
                this.translateOffsetX += z * this.scaleOffsetX;
                this.translateOffsetY += D * this.scaleOffsetY;
                for (var B = 0, A = this.canvases.length; B < A; B++) {
                    this.canvases[B].translate(z, D, C)
                }
            },
            scale: function(E, B, C) {
                var F = this.scaleOffsetX * E, D = this.scaleOffsetY * B;
                var H = this.translateOffsetX * (E-1) / F, G = this.translateOffsetY * (B-1) / D;
                this.scaleOffsetX = F;
                this.scaleOffsetY = D;
                for (var A = 0, z = this.canvases.length; A < z; A++) {
                    this.canvases[A].scale(E, B, true)
                }
                this.translate(H, G, false)
            },
            getPos: function(z) {
                if (z ||!this.pos) {
                    return this.pos = c.getPos(this.getElement())
                }
                return this.pos
            },
            clear: function(z) {
                this.canvases[z || 0].clear()
            },
            path: function(A, B) {
                var z = this.canvases[0].getCtx();
                z.beginPath();
                B(z);
                z[A]();
                z.closePath()
            },
            createLabelContainer: function(B, F, E) {
                var D = "http://www.w3.org/2000/svg";
                if (B == "HTML" || B == "Native") {
                    return x("div", {
                        id: F,
                        style: {
                            overflow: "visible",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: E.width + "px",
                            height: 0
                        }
                    })
                } else {
                    if (B == "SVG") {
                        var C = document.createElementNS(D, "svg:svg");
                        C.setAttribute("width", E.width);
                        C.setAttribute("height", E.height);
                        var A = C.style;
                        A.position = "absolute";
                        A.left = A.top = "0px";
                        var z = document.createElementNS(D, "svg:g");
                        z.setAttribute("width", E.width);
                        z.setAttribute("height", E.height);
                        z.setAttribute("x", 0);
                        z.setAttribute("y", 0);
                        z.setAttribute("id", F);
                        C.appendChild(z);
                        return C
                    }
                }
            }
        });
        l.Base = {};
        l.Base["2D"] = new q({
            translateOffsetX: 0,
            translateOffsetY: 0,
            scaleOffsetX: 1,
            scaleOffsetY: 1,
            initialize: function(z) {
                this.viz = z;
                this.opt = z.config;
                this.size = false;
                this.createCanvas();
                this.translateToCenter()
            },
            createCanvas: function() {
                var A = this.opt, B = A.width, z = A.height;
                this.canvas = x("canvas", {
                    id: A.injectInto + A.idSuffix,
                    width: B,
                    height: z,
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: B + "px",
                        height: z + "px"
                    }
                })
            },
            getCtx: function() {
                if (!this.ctx) {
                    return this.ctx = this.canvas.getContext("2d")
                }
                return this.ctx
            },
            getSize: function() {
                if (this.size) {
                    return this.size
                }
                var z = this.canvas;
                return this.size = {
                    width: z.width,
                    height: z.height
                }
            },
            translateToCenter: function(C) {
                var A = this.getSize(), B = C ? (A.width - C.width - this.translateOffsetX * 2): A.width;
                height = C ? (A.height - C.height - this.translateOffsetY * 2) : A.height;
                var z = this.getCtx();
                C && z.scale(1 / this.scaleOffsetX, 1 / this.scaleOffsetY);
                z.translate(B / 2, height / 2)
            },
            resize: function(C, z) {
                var B = this.getSize(), A = this.canvas, D = A.style;
                this.size = false;
                A.width = C;
                A.height = z;
                D.width = C + "px";
                D.height = z + "px";
                if (!y) {
                    this.translateToCenter(B)
                } else {
                    this.translateToCenter()
                }
                this.translateOffsetX = this.translateOffsetY = 0;
                this.scaleOffsetX = this.scaleOffsetY = 1;
                this.clear();
                this.viz.resize(C, z, this)
            },
            translate: function(z, D, A) {
                var C = this.scaleOffsetX, B = this.scaleOffsetY;
                this.translateOffsetX += z * C;
                this.translateOffsetY += D * B;
                this.getCtx().translate(z, D);
                !A && this.plot()
            },
            scale: function(z, B, A) {
                this.scaleOffsetX*=z;
                this.scaleOffsetY*=B;
                this.getCtx().scale(z, B);
                !A && this.plot()
            },
            clear: function() {
                var B = this.getSize(), A = this.translateOffsetX, z = this.translateOffsetY, D = this.scaleOffsetX, C = this.scaleOffsetY;
                this.getCtx().clearRect(( - B.width / 2 - A) * 1 / D, ( - B.height / 2 - z) * 1 / C, B.width * 1 / D, B.height * 1 / C)
            },
            plot: function() {
                this.clear();
                this.viz.plot(this)
            }
        });
        l.Background = {};
        l.Background.Circles = new q({
            initialize: function(z, A) {
                this.viz = z;
                this.config = c.merge({
                    idSuffix: "-bkcanvas",
                    levelDistance: 100,
                    numberOfCircles: 6,
                    CanvasStyles: {},
                    offset: 0
                }, A)
            },
            resize: function(A, z, B) {
                this.plot(B)
            },
            plot: function(z) {
                var A = z.canvas, G = z.getCtx(), D = this.config, F = D.CanvasStyles;
                for (var H in F) {
                    G[H] = F[H]
                }
                var B = D.numberOfCircles, E = D.levelDistance;
                for (var C = 1; C <= B; C++) {
                    G.beginPath();
                    G.arc(0, 0, E * C, 0, 2 * Math.PI, false);
                    G.stroke();
                    G.closePath()
                }
            }
        })
    })();
    var b = function(x, w) {
        this.theta = x || 0;
        this.rho = w || 0
    };
    $jit.Polar = b;
    b.prototype = {
        getc: function(w) {
            return this.toComplex(w)
        },
        getp: function() {
            return this
        },
        set: function(w) {
            w = w.getp();
            this.theta = w.theta;
            this.rho = w.rho
        },
        setc: function(w, z) {
            this.rho = Math.sqrt(w * w + z * z);
            this.theta = Math.atan2(z, w);
            if (this.theta < 0) {
                this.theta += Math.PI * 2
            }
        },
        setp: function(x, w) {
            this.theta = x;
            this.rho = w
        },
        clone: function() {
            return new b(this.theta, this.rho)
        },
        toComplex: function(A) {
            var w = Math.cos(this.theta) * this.rho;
            var z = Math.sin(this.theta) * this.rho;
            if (A) {
                return {
                    x: w,
                    y: z
                }
            }
            return new p(w, z)
        },
        add: function(w) {
            return new b(this.theta + w.theta, this.rho + w.rho)
        },
        scale: function(w) {
            return new b(this.theta, this.rho * w)
        },
        equals: function(w) {
            return this.theta == w.theta && this.rho == w.rho
        },
        $add: function(w) {
            this.theta = this.theta + w.theta;
            this.rho += w.rho;
            return this
        },
        $madd: function(w) {
            this.theta = (this.theta + w.theta)%(Math.PI * 2);
            this.rho += w.rho;
            return this
        },
        $scale: function(w) {
            this.rho*=w;
            return this
        },
        isZero: function() {
            var x = 0.0001, w = Math.abs;
            return w(this.theta) < x && w(this.rho) < x
        },
        interpolate: function(y, F) {
            var z = Math.PI, C = z * 2;
            var x = function(H) {
                var G = (H < 0) ? (H%C) + C: H%C;
                return G
            };
            var B = this.theta, E = y.theta;
            var A, D = Math.abs(B - E);
            if (D == z) {
                if (B > E) {
                    A = x((E + ((B - C) - E) * F))
                } else {
                    A = x((E - C + (B - (E)) * F))
                }
            } else {
                if (D >= z) {
                    if (B > E) {
                        A = x((E + ((B - C) - E) * F))
                    } else {
                        A = x((E - C + (B - (E - C)) * F))
                    }
                } else {
                    A = x((E + (B - E) * F))
                }
            }
            var w = (this.rho - y.rho) * F + y.rho;
            return {
                theta: A,
                rho: w
            }
        }
    };
    var k = function(x, w) {
        return new b(x, w)
    };
    b.KER = k(0, 0);
    var p = function(w, z) {
        this.x = w || 0;
        this.y = z || 0
    };
    $jit.Complex = p;
    p.prototype = {
        getc: function() {
            return this
        },
        getp: function(w) {
            return this.toPolar(w)
        },
        set: function(w) {
            w = w.getc(true);
            this.x = w.x;
            this.y = w.y
        },
        setc: function(w, z) {
            this.x = w;
            this.y = z
        },
        setp: function(x, w) {
            this.x = Math.cos(x) * w;
            this.y = Math.sin(x) * w
        },
        clone: function() {
            return new p(this.x, this.y)
        },
        toPolar: function(y) {
            var w = this.norm();
            var x = Math.atan2(this.y, this.x);
            if (x < 0) {
                x += Math.PI * 2
            }
            if (y) {
                return {
                    theta: x,
                    rho: w
                }
            }
            return new b(x, w)
        },
        norm: function() {
            return Math.sqrt(this.squaredNorm())
        },
        squaredNorm: function() {
            return this.x * this.x + this.y * this.y
        },
        add: function(w) {
            return new p(this.x + w.x, this.y + w.y)
        },
        prod: function(w) {
            return new p(this.x * w.x - this.y * w.y, this.y * w.x + this.x * w.y)
        },
        conjugate: function() {
            return new p(this.x, - this.y)
        },
        scale: function(w) {
            return new p(this.x * w, this.y * w)
        },
        equals: function(w) {
            return this.x == w.x && this.y == w.y
        },
        $add: function(w) {
            this.x += w.x;
            this.y += w.y;
            return this
        },
        $prod: function(A) {
            var w = this.x, z = this.y;
            this.x = w * A.x - z * A.y;
            this.y = z * A.x + w * A.y;
            return this
        },
        $conjugate: function() {
            this.y =- this.y;
            return this
        },
        $scale: function(w) {
            this.x*=w;
            this.y*=w;
            return this
        },
        $div: function(B) {
            var w = this.x, A = this.y;
            var z = B.squaredNorm();
            this.x = w * B.x + A * B.y;
            this.y = A * B.x - w * B.y;
            return this.$scale(1 / z)
        },
        isZero: function() {
            var x = 0.0001, w = Math.abs;
            return w(this.x) < x && w(this.y) < x
        }
    };
    var r = function(x, w) {
        return new p(x, w)
    };
    p.KER = r(0, 0);
    $jit.Graph = new q({
        initialize: function(y, x, w, C) {
            var A = {
                klass: p,
                Node: {}
            };
            this.Node = x;
            this.Edge = w;
            this.Label = C;
            this.opt = c.merge(A, y || {});
            this.nodes = {};
            this.edges = {};
            var z = this;
            this.nodeList = {};
            for (var B in j) {
                z.nodeList[B] = (function(D) {
                    return function() {
                        var E = Array.prototype.slice.call(arguments);
                        z.eachNode(function(F) {
                            F[D].apply(F, E)
                        })
                    }
                })(B)
            }
        },
        getNode: function(w) {
            if (this.hasNode(w)) {
                return this.nodes[w]
            }
            return false
        },
        get: function(w) {
            return this.getNode(w)
        },
        getByName: function(w) {
            for (var y in this.nodes) {
                var x = this.nodes[y];
                if (x.name == w) {
                    return x
                }
            }
            return false
        },
        getAdjacence: function(x, w) {
            if (x in this.edges) {
                return this.edges[x][w]
            }
            return false
        },
        addNode: function(x) {
            if (!this.nodes[x.id]) {
                var w = this.edges[x.id] = {};
                this.nodes[x.id] = new e.Node(c.extend({
                    id: x.id,
                    name: x.name,
                    data: c.merge(x.data || {}, {}),
                    adjacencies: w
                }, this.opt.Node), this.opt.klass, this.Node, this.Edge, this.Label)
            }
            return this.nodes[x.id]
        },
        addAdjacence: function(z, y, x) {
            if (!this.hasNode(z.id)) {
                this.addNode(z)
            }
            if (!this.hasNode(y.id)) {
                this.addNode(y)
            }
            z = this.nodes[z.id];
            y = this.nodes[y.id];
            if (!z.adjacentTo(y)) {
                var A = this.edges[z.id] = this.edges[z.id] || {};
                var w = this.edges[y.id] = this.edges[y.id] || {};
                A[y.id] = w[z.id] = new e.Adjacence(z, y, x, this.Edge, this.Label);
                return A[y.id]
            }
            return this.edges[z.id][y.id]
        },
        removeNode: function(y) {
            if (this.hasNode(y)) {
                delete this.nodes[y];
                var x = this.edges[y];
                for (var w in x) {
                    delete this.edges[w][y]
                }
                delete this.edges[y]
            }
        },
        removeAdjacence: function(x, w) {
            delete this.edges[x][w];
            delete this.edges[w][x]
        },
        hasNode: function(w) {
            return w in this.nodes
        },
        empty: function() {
            this.nodes = {};
            this.edges = {}
        }
    });
    var e = $jit.Graph;
    var j;
    (function() {
        var w = function(D, F, A, C, E) {
            var B;
            A = A || "current";
            D = "$" + (D ? D + "-" : "");
            if (A == "current") {
                B = this.data
            } else {
                if (A == "start") {
                    B = this.startData
                } else {
                    if (A == "end") {
                        B = this.endData
                    }
                }
            }
            var z = D + F;
            if (C) {
                return B[z]
            }
            if (!this.Config.overridable) {
                return E[F] || 0
            }
            return (z in B) ? B[z] : ((z in this.data) ? this.data[z] : (E[F] || 0))
        };
        var y = function(C, D, B, z) {
            z = z || "current";
            C = "$" + (C ? C + "-" : "");
            var A;
            if (z == "current") {
                A = this.data
            } else {
                if (z == "start") {
                    A = this.startData
                } else {
                    if (z == "end") {
                        A = this.endData
                    }
                }
            }
            A[C + D] = B
        };
        var x = function(B, z) {
            B = "$" + (B ? B + "-" : "");
            var A = this;
            c.each(z, function(D) {
                var C = B + D;
                delete A.data[C];
                delete A.endData[C];
                delete A.startData[C]
            })
        };
        j = {
            getData: function(B, z, A) {
                return w.call(this, "", B, z, A, this.Config)
            },
            setData: function(B, A, z) {
                y.call(this, "", B, A, z)
            },
            setDataset: function(C, D) {
                C = c.splat(C);
                for (var z in D) {
                    for (var B = 0, E = c.splat(D[z]), A = C.length; B < A; B++) {
                        this.setData(z, E[B], C[B])
                    }
                }
            },
            removeData: function() {
                x.call(this, "", Array.prototype.slice.call(arguments))
            },
            getCanvasStyle: function(B, z, A) {
                return w.call(this, "canvas", B, z, A, this.Config.CanvasStyles)
            },
            setCanvasStyle: function(B, A, z) {
                y.call(this, "canvas", B, A, z)
            },
            setCanvasStyles: function(C, D) {
                C = c.splat(C);
                for (var z in D) {
                    for (var B = 0, E = c.splat(D[z]), A = C.length; B < A; B++) {
                        this.setCanvasStyle(z, E[B], C[B])
                    }
                }
            },
            removeCanvasStyle: function() {
                x.call(this, "canvas", Array.prototype.slice.call(arguments))
            },
            getLabelData: function(B, z, A) {
                return w.call(this, "label", B, z, A, this.Label)
            },
            setLabelData: function(B, A, z) {
                y.call(this, "label", B, A, z)
            },
            setLabelDataset: function(C, D) {
                C = c.splat(C);
                for (var z in D) {
                    for (var B = 0, E = c.splat(D[z]), A = C.length; B < A; B++) {
                        this.setLabelData(z, E[B], C[B])
                    }
                }
            },
            removeLabelData: function() {
                x.call(this, "label", Array.prototype.slice.call(arguments))
            }
        }
    })();
    e.Node = new q({
        initialize: function(z, w, y, x, B) {
            var A = {
                id: "",
                name: "",
                data: {},
                startData: {},
                endData: {},
                adjacencies: {},
                selected: false,
                drawn: false,
                exist: false,
                angleSpan: {
                    begin: 0,
                    end: 0
                },
                pos: new w,
                startPos: new w,
                endPos: new w
            };
            c.extend(this, c.extend(A, z));
            this.Config = this.Node = y;
            this.Edge = x;
            this.Label = B
        },
        adjacentTo: function(w) {
            return w.id in this.adjacencies
        },
        getAdjacency: function(w) {
            return this.adjacencies[w]
        },
        getPos: function(w) {
            w = w || "current";
            if (w == "current") {
                return this.pos
            } else {
                if (w == "end") {
                    return this.endPos
                } else {
                    if (w == "start") {
                        return this.startPos
                    }
                }
            }
        },
        setPos: function(x, w) {
            w = w || "current";
            var y;
            if (w == "current") {
                y = this.pos
            } else {
                if (w == "end") {
                    y = this.endPos
                } else {
                    if (w == "start") {
                        y = this.startPos
                    }
                }
            }
            y.set(x)
        }
    });
    e.Node.implement(j);
    e.Adjacence = new q({
        initialize: function(x, A, y, w, z) {
            this.nodeFrom = x;
            this.nodeTo = A;
            this.data = y || {};
            this.startData = {};
            this.endData = {};
            this.Config = this.Edge = w;
            this.Label = z
        }
    });
    e.Adjacence.implement(j);
    e.Util = {
        filter: function(x) {
            if (!x ||!(c.type(x) == "string")) {
                return function() {
                    return true
                }
            }
            var w = x.split(" ");
            return function(z) {
                for (var y = 0; y < w.length; y++) {
                    if (z[w[y]]) {
                        return false
                    }
                }
                return true
            }
        },
        getNode: function(w, x) {
            return w.nodes[x]
        },
        eachNode: function(A, z, w) {
            var y = this.filter(w);
            for (var x in A.nodes) {
                if (y(A.nodes[x])) {
                    z(A.nodes[x])
                }
            }
        },
        each: function(y, x, w) {
            this.eachNode(y, x, w)
        },
        eachAdjacency: function(B, C, x) {
            var y = B.adjacencies, A = this.filter(x);
            for (var D in y) {
                var w = y[D];
                if (A(w)) {
                    if (w.nodeFrom != B) {
                        var z = w.nodeFrom;
                        w.nodeFrom = w.nodeTo;
                        w.nodeTo = z
                    }
                    C(w, D)
                }
            }
        },
        computeLevels: function(C, D, z, y) {
            z = z || 0;
            var A = this.filter(y);
            this.eachNode(C, function(E) {
                E._flag = false;
                E._depth =- 1
            }, y);
            var x = C.getNode(D);
            x._depth = z;
            var w = [x];
            while (w.length != 0) {
                var B = w.pop();
                B._flag = true;
                this.eachAdjacency(B, function(E) {
                    var F = E.nodeTo;
                    if (F._flag == false && A(F)) {
                        if (F._depth < 0) {
                            F._depth = B._depth + 1 + z
                        }
                        w.unshift(F)
                    }
                }, y)
            }
        },
        eachBFS: function(B, C, A, x) {
            var y = this.filter(x);
            this.clean(B);
            var w = [B.getNode(C)];
            while (w.length != 0) {
                var z = w.pop();
                z._flag = true;
                A(z, z._depth);
                this.eachAdjacency(z, function(D) {
                    var E = D.nodeTo;
                    if (E._flag == false && y(E)) {
                        E._flag = true;
                        w.unshift(E)
                    }
                }, x)
            }
        },
        eachLevel: function(A, E, x, B, z) {
            var D = A._depth, w = this.filter(z), C = this;
            x = x === false ? Number.MAX_VALUE - D : x;
            (function y(H, F, G) {
                var I = H._depth;
                if (I >= F && I <= G && w(H)) {
                    B(H, I)
                }
                if (I < G) {
                    C.eachAdjacency(H, function(J) {
                        var K = J.nodeTo;
                        if (K._depth > I) {
                            y(K, F, G)
                        }
                    })
                }
            })(A, E + D, x + D)
        },
        eachSubgraph: function(x, y, w) {
            this.eachLevel(x, 0, false, y, w)
        },
        eachSubnode: function(x, y, w) {
            this.eachLevel(x, 1, 1, y, w)
        },
        anySubnode: function(z, y, x) {
            var w = false;
            y = y || c.lambda(true);
            var A = c.type(y) == "string" ? function(B) {
                return B[y]
            }
            : y;
            this.eachSubnode(z, function(B) {
                if (A(B)) {
                    w = true
                }
            }, x);
            return w
        },
        getSubnodes: function(B, C, w) {
            var y = [], A = this;
            C = C || 0;
            var z, x;
            if (c.type(C) == "array") {
                z = C[0];
                x = C[1]
            } else {
                z = C;
                x = Number.MAX_VALUE - B._depth
            }
            this.eachLevel(B, z, x, function(D) {
                y.push(D)
            }, w);
            return y
        },
        getParents: function(x) {
            var w = [];
            this.eachAdjacency(x, function(y) {
                var z = y.nodeTo;
                if (z._depth < x._depth) {
                    w.push(z)
                }
            });
            return w
        },
        isDescendantOf: function(z, A) {
            if (z.id == A) {
                return true
            }
            var y = this.getParents(z), w = false;
            for (var x = 0; !w && x < y.length; x++) {
                w = w || this.isDescendantOf(y[x], A)
            }
            return w
        },
        clean: function(w) {
            this.eachNode(w, function(x) {
                x._flag = false
            })
        },
        getClosestNodeToOrigin: function(x, y, w) {
            return this.getClosestNodeToPos(x, b.KER, y, w)
        },
        getClosestNodeToPos: function(y, B, A, w) {
            var x = null;
            A = A || "current";
            B = B && B.getc(true) || p.KER;
            var z = function(D, C) {
                var F = D.x - C.x, E = D.y - C.y;
                return F * F + E * E
            };
            this.eachNode(y, function(C) {
                x = (x == null || z(C.getPos(A).getc(true), B) < z(x.getPos(A).getc(true), B)) ? C : x
            }, w);
            return x
        }
    };
    c.each(["get", "getNode", "each", "eachNode", "computeLevels", "eachBFS", "clean", "getClosestNodeToPos", "getClosestNodeToOrigin"], function(w) {
        e.prototype[w] = function() {
            return e.Util[w].apply(e.Util, [this].concat(Array.prototype.slice.call(arguments)))
        }
    });
    c.each(["eachAdjacency", "eachLevel", "eachSubgraph", "eachSubnode", "anySubnode", "getSubnodes", "getParents", "isDescendantOf"], function(w) {
        e.Node.prototype[w] = function() {
            return e.Util[w].apply(e.Util, [this].concat(Array.prototype.slice.call(arguments)))
        }
    });
    e.Op = {
        options: {
            type: "nothing",
            duration: 2000,
            hideLabels: true,
            fps: 30
        },
        initialize: function(w) {
            this.viz = w
        },
        removeNode: function(B, z) {
            var w = this.viz;
            var x = c.merge(this.options, w.controller, z);
            var D = c.splat(B);
            var y, A, C;
            switch (x.type) {
            case"nothing":
                for (y = 0; y < D.length; y++) {
                    w.graph.removeNode(D[y])
                }
                break;
            case"replot":
                this.removeNode(D, {
                    type: "nothing"
                });
                w.labels.clearLabels();
                w.refresh(true);
                break;
            case"fade:seq":
            case"fade":
                A = this;
                for (y = 0; y < D.length; y++) {
                    C = w.graph.getNode(D[y]);
                    C.setData("alpha", 0, "end")
                }
                w.fx.animate(c.merge(x, {
                    modes: ["node-property:alpha"],
                    onComplete: function() {
                        A.removeNode(D, {
                            type: "nothing"
                        });
                        w.labels.clearLabels();
                        w.reposition();
                        w.fx.animate(c.merge(x, {
                            modes: ["linear"]
                        }))
                    }
                }));
                break;
            case"fade:con":
                A = this;
                for (y = 0; y < D.length; y++) {
                    C = w.graph.getNode(D[y]);
                    C.setData("alpha", 0, "end");
                    C.ignore = true
                }
                w.reposition();
                w.fx.animate(c.merge(x, {
                    modes: ["node-property:alpha", "linear"],
                    onComplete: function() {
                        A.removeNode(D, {
                            type: "nothing"
                        });
                        x.onComplete && x.onComplete()
                    }
                }));
                break;
            case"iter":
                A = this;
                w.fx.sequence({
                    condition: function() {
                        return D.length != 0
                    },
                    step: function() {
                        A.removeNode(D.shift(), {
                            type: "nothing"
                        });
                        w.labels.clearLabels()
                    },
                    onComplete: function() {
                        x.onComplete && x.onComplete()
                    },
                    duration: Math.ceil(x.duration / D.length)
                });
                break;
            default:
                this.doError()
            }
        },
        removeEdge: function(D, B) {
            var w = this.viz;
            var z = c.merge(this.options, w.controller, B);
            var y = (c.type(D[0]) == "string") ? [D]: D;
            var A, C, x;
            switch (z.type) {
            case"nothing":
                for (A = 0; A < y.length; A++) {
                    w.graph.removeAdjacence(y[A][0], y[A][1])
                }
                break;
            case"replot":
                this.removeEdge(y, {
                    type: "nothing"
                });
                w.refresh(true);
                break;
            case"fade:seq":
            case"fade":
                C = this;
                for (A = 0; A < y.length; A++) {
                    x = w.graph.getAdjacence(y[A][0], y[A][1]);
                    if (x) {
                        x.setData("alpha", 0, "end")
                    }
                }
                w.fx.animate(c.merge(z, {
                    modes: ["edge-property:alpha"],
                    onComplete: function() {
                        C.removeEdge(y, {
                            type: "nothing"
                        });
                        w.reposition();
                        w.fx.animate(c.merge(z, {
                            modes: ["linear"]
                        }))
                    }
                }));
                break;
            case"fade:con":
                C = this;
                for (A = 0; A < y.length; A++) {
                    x = w.graph.getAdjacence(y[A][0], y[A][1]);
                    if (x) {
                        x.setData("alpha", 0, "end");
                        x.ignore = true
                    }
                }
                w.reposition();
                w.fx.animate(c.merge(z, {
                    modes: ["edge-property:alpha", "linear"],
                    onComplete: function() {
                        C.removeEdge(y, {
                            type: "nothing"
                        });
                        z.onComplete && z.onComplete()
                    }
                }));
                break;
            case"iter":
                C = this;
                w.fx.sequence({
                    condition: function() {
                        return y.length != 0
                    },
                    step: function() {
                        C.removeEdge(y.shift(), {
                            type: "nothing"
                        });
                        w.labels.clearLabels()
                    },
                    onComplete: function() {
                        z.onComplete()
                    },
                    duration: Math.ceil(z.duration / y.length)
                });
                break;
            default:
                this.doError()
            }
        },
        sum: function(A, z) {
            var w = this.viz;
            var y = c.merge(this.options, w.controller, z), x = w.root;
            var C;
            w.root = z.id || w.root;
            switch (y.type) {
            case"nothing":
                C = w.construct(A);
                C.eachNode(function(E) {
                    E.eachAdjacency(function(F) {
                        w.graph.addAdjacence(F.nodeFrom, F.nodeTo, F.data)
                    })
                });
                break;
            case"replot":
                w.refresh(true);
                this.sum(A, {
                    type: "nothing"
                });
                w.refresh(true);
                break;
            case"fade:seq":
            case"fade":
            case"fade:con":
                that = this;
                C = w.construct(A);
                var D = this.preprocessSum(C);
                var B=!D ? ["node-property:alpha"] : ["node-property:alpha", "edge-property:alpha"];
                w.reposition();
                if (y.type != "fade:con") {
                    w.fx.animate(c.merge(y, {
                        modes: ["linear"],
                        onComplete: function() {
                            w.fx.animate(c.merge(y, {
                                modes: B,
                                onComplete: function() {
                                    y.onComplete()
                                }
                            }))
                        }
                    }))
                } else {
                    w.graph.eachNode(function(E) {
                        if (E.id != x && E.pos.isZero()) {
                            E.pos.set(E.endPos);
                            E.startPos.set(E.endPos)
                        }
                    });
                    w.fx.animate(c.merge(y, {
                        modes: ["linear"].concat(B)
                    }))
                }
                break;
            default:
                this.doError()
            }
        },
        morph: function(E, x, z) {
            z = z || {};
            var B = this.viz;
            var F = c.merge(this.options, B.controller, x), A = B.root;
            var C;
            B.root = x.id || B.root;
            switch (F.type) {
            case"nothing":
                C = B.construct(E);
                C.eachNode(function(I) {
                    var H = B.graph.hasNode(I.id);
                    I.eachAdjacency(function(M) {
                        var L=!!B.graph.getAdjacence(M.nodeFrom.id, M.nodeTo.id);
                        B.graph.addAdjacence(M.nodeFrom, M.nodeTo, M.data);
                        if (L) {
                            var K = B.graph.getAdjacence(M.nodeFrom.id, M.nodeTo.id);
                            for (var N in (M.data || {})) {
                                K.data[N] = M.data[N]
                            }
                        }
                    });
                    if (H) {
                        var G = B.graph.getNode(I.id);
                        for (var J in (I.data || {})) {
                            G.data[J] = I.data[J]
                        }
                    }
                });
                B.graph.eachNode(function(G) {
                    G.eachAdjacency(function(H) {
                        if (!C.getAdjacence(H.nodeFrom.id, H.nodeTo.id)) {
                            B.graph.removeAdjacence(H.nodeFrom.id, H.nodeTo.id)
                        }
                    });
                    if (!C.hasNode(G.id)) {
                        B.graph.removeNode(G.id)
                    }
                });
                break;
            case"replot":
                B.labels.clearLabels(true);
                this.morph(E, {
                    type: "nothing"
                });
                B.refresh(true);
                B.refresh(true);
                break;
            case"fade:seq":
            case"fade":
            case"fade:con":
                that = this;
                C = B.construct(E);
                var D = ("node-property" in z) && c.map(c.splat(z["node-property"]), function(G) {
                    return "$" + G
                });
                B.graph.eachNode(function(H) {
                    var I = C.getNode(H.id);
                    if (!I) {
                        H.setData("alpha", 1);
                        H.setData("alpha", 1, "start");
                        H.setData("alpha", 0, "end");
                        H.ignore = true
                    } else {
                        var G = I.data;
                        for (var J in G) {
                            if (D && (c.indexOf(D, J)>-1)) {
                                H.endData[J] = G[J]
                            } else {
                                H.data[J] = G[J]
                            }
                        }
                    }
                });
                B.graph.eachNode(function(G) {
                    if (G.ignore) {
                        return 
                    }
                    G.eachAdjacency(function(H) {
                        if (H.nodeFrom.ignore || H.nodeTo.ignore) {
                            return 
                        }
                        var I = C.getNode(H.nodeFrom.id);
                        var J = C.getNode(H.nodeTo.id);
                        if (!I.adjacentTo(J)) {
                            var H = B.graph.getAdjacence(I.id, J.id);
                            w = true;
                            H.setData("alpha", 1);
                            H.setData("alpha", 1, "start");
                            H.setData("alpha", 0, "end")
                        }
                    })
                });
                var w = this.preprocessSum(C);
                var y=!w ? ["node-property:alpha"] : ["node-property:alpha", "edge-property:alpha"];
                y[0] = y[0] + (("node-property" in z) ? (":" + c.splat(z["node-property"]).join(":")) : "");
                y[1] = (y[1] || "edge-property:alpha") + (("edge-property" in z) ? (":" + c.splat(z["edge-property"]).join(":")) : "");
                if ("label-property" in z) {
                    y.push("label-property:" + c.splat(z["label-property"]).join(":"))
                }
                if (B.reposition) {
                    B.reposition()
                } else {
                    B.compute("end")
                }
                B.graph.eachNode(function(G) {
                    if (G.id != A && G.pos.getp().equals(b.KER)) {
                        G.pos.set(G.endPos);
                        G.startPos.set(G.endPos)
                    }
                });
                B.fx.animate(c.merge(F, {
                    modes: [z.position || "polar"].concat(y),
                    onComplete: function() {
                        B.graph.eachNode(function(G) {
                            if (G.ignore) {
                                B.graph.removeNode(G.id)
                            }
                        });
                        B.graph.eachNode(function(G) {
                            G.eachAdjacency(function(H) {
                                if (H.ignore) {
                                    B.graph.removeAdjacence(H.nodeFrom.id, H.nodeTo.id)
                                }
                            })
                        });
                        F.onComplete()
                    }
                }));
                break;
            default:
            }
        },
        contract: function(y, x) {
            var w = this.viz;
            if (y.collapsed ||!y.anySubnode(c.lambda(true))) {
                return 
            }
            x = c.merge(this.options, w.config, x || {}, {
                modes: ["node-property:alpha:span", "linear"]
            });
            y.collapsed = true;
            (function z(A) {
                A.eachSubnode(function(B) {
                    B.ignore = true;
                    B.setData("alpha", 0, x.type == "animate" ? "end" : "current");
                    z(B)
                })
            })(y);
            if (x.type == "animate") {
                w.compute("end");
                if (w.rotated) {
                    w.rotate(w.rotated, "none", {
                        property: "end"
                    })
                }(function z(A) {
                    A.eachSubnode(function(B) {
                        B.setPos(y.getPos("end"), "end");
                        z(B)
                    })
                })(y);
                w.fx.animate(x)
            } else {
                if (x.type == "replot") {
                    w.refresh()
                }
            }
        },
        expand: function(y, x) {
            if (!("collapsed" in y)) {
                return 
            }
            var w = this.viz;
            x = c.merge(this.options, w.config, x || {}, {
                modes: ["node-property:alpha:span", "linear"]
            });
            delete y.collapsed;
            (function z(A) {
                A.eachSubnode(function(B) {
                    delete B.ignore;
                    B.setData("alpha", 1, x.type == "animate" ? "end" : "current");
                    z(B)
                })
            })(y);
            if (x.type == "animate") {
                w.compute("end");
                if (w.rotated) {
                    w.rotate(w.rotated, "none", {
                        property: "end"
                    })
                }
                w.fx.animate(x)
            } else {
                if (x.type == "replot") {
                    w.refresh()
                }
            }
        },
        preprocessSum: function(x) {
            var w = this.viz;
            x.eachNode(function(z) {
                if (!w.graph.hasNode(z.id)) {
                    w.graph.addNode(z);
                    var A = w.graph.getNode(z.id);
                    A.setData("alpha", 0);
                    A.setData("alpha", 0, "start");
                    A.setData("alpha", 1, "end")
                }
            });
            var y = false;
            x.eachNode(function(z) {
                z.eachAdjacency(function(A) {
                    var B = w.graph.getNode(A.nodeFrom.id);
                    var C = w.graph.getNode(A.nodeTo.id);
                    if (!B.adjacentTo(C)) {
                        var A = w.graph.addAdjacence(B, C, A.data);
                        if (B.startAlpha == B.endAlpha && C.startAlpha == C.endAlpha) {
                            y = true;
                            A.setData("alpha", 0);
                            A.setData("alpha", 0, "start");
                            A.setData("alpha", 1, "end")
                        }
                    }
                })
            });
            return y
        }
    };
    var a = {
        none: {
            render: c.empty,
            contains: c.lambda(false)
        },
        circle: {
            render: function(z, A, w, y) {
                var x = y.getCtx();
                x.beginPath();
                x.arc(A.x, A.y, w, 0, Math.PI * 2, true);
                x.closePath();
                x[z]()
            },
            contains: function(B, A, w) {
                var y = B.x - A.x, x = B.y - A.y, z = y * y + x * x;
                return z <= w * w
            }
        },
        ellipse: {
            render: function(C, E, w, F, x) {
                var G = x.getCtx(), z = 1, y = 1, D = 1, B = 1, A = 0;
                if (w > F) {
                    A = w / 2;
                    y = F / w;
                    B = w / F
                } else {
                    A = F / 2;
                    z = w / F;
                    D = F / w
                }
                G.save();
                G.scale(z, y);
                G.beginPath();
                G.arc(E.x * D, E.y * B, A, 0, Math.PI * 2, true);
                G.closePath();
                G[C]();
                G.restore()
            },
            contains: function(w, D, x, F) {
                var C = 0, B = 1, A = 1, z = 0, y = 0, E = 0;
                if (x > F) {
                    C = x / 2;
                    A = F / x
                } else {
                    C = F / 2;
                    B = x / F
                }
                z = (w.x - D.x) * (1 / B);
                y = (w.y - D.y) * (1 / A);
                E = z * z + y * y;
                return E <= C * C
            }
        },
        square: {
            render: function(x, z, y, w) {
                w.getCtx()[x + "Rect"](z.x - y, z.y - y, 2 * y, 2 * y)
            },
            contains: function(y, x, w) {
                return Math.abs(x.x - y.x) <= w && Math.abs(x.y - y.y) <= w
            }
        },
        rectangle: {
            render: function(z, A, y, w, x) {
                x.getCtx()[z + "Rect"](A.x - y / 2, A.y - w / 2, y, w)
            },
            contains: function(z, y, x, w) {
                return Math.abs(y.x - z.x) <= x / 2 && Math.abs(y.y - z.y) <= w / 2
            }
        },
        triangle: {
            render: function(C, D, z, w) {
                var G = w.getCtx(), y = D.x, x = D.y - z, F = y - z, E = D.y + z, B = y + z, A = E;
                G.beginPath();
                G.moveTo(y, x);
                G.lineTo(F, E);
                G.lineTo(B, A);
                G.closePath();
                G[C]()
            },
            contains: function(y, x, w) {
                return a.circle.contains(y, x, w)
            }
        },
        star: {
            render: function(A, C, B, x) {
                var w = x.getCtx(), z = Math.PI / 5;
                w.save();
                w.translate(C.x, C.y);
                w.beginPath();
                w.moveTo(B, 0);
                for (var y = 0; y < 9; y++) {
                    w.rotate(z);
                    if (y%2 == 0) {
                        w.lineTo((B / 0.525731) * 0.200811, 0)
                    } else {
                        w.lineTo(B, 0)
                    }
                }
                w.closePath();
                w[A]();
                w.restore()
            },
            contains: function(y, x, w) {
                return a.circle.contains(y, x, w)
            }
        }
    };
    var m = {
        line: {
            render: function(z, y, x) {
                var w = x.getCtx();
                w.beginPath();
                w.moveTo(z.x, z.y);
                w.lineTo(y.x, y.y);
                w.stroke()
            },
            contains: function(G, y, B, E) {
                var z = Math.min, C = Math.max, x = z(G.x, y.x), F = C(G.x, y.x), w = z(G.y, y.y), D = C(G.y, y.y);
                if (B.x >= x && B.x <= F && B.y >= w && B.y <= D) {
                    if (Math.abs(y.x - G.x) <= E) {
                        return true
                    }
                    var A = (y.y - G.y) / (y.x - G.x) * (B.x - G.x) + G.y;
                    return Math.abs(A - B.y) <= E
                }
                return false
            }
        },
        arrow: {
            render: function(F, G, z, x, w) {
                var H = w.getCtx();
                if (x) {
                    var y = F;
                    F = G;
                    G = y
                }
                var C = new p(G.x - F.x, G.y - F.y);
                C.$scale(z / C.norm());
                var A = new p(G.x - C.x, G.y - C.y), B = new p( - C.y / 2, C.x / 2), E = A.add(B), D = A.$add(B.$scale(-1));
                H.beginPath();
                H.moveTo(F.x, F.y);
                H.lineTo(G.x, G.y);
                H.stroke();
                H.beginPath();
                H.moveTo(E.x, E.y);
                H.lineTo(D.x, D.y);
                H.lineTo(G.x, G.y);
                H.closePath();
                H.fill()
            },
            contains: function(x, w, z, y) {
                return m.line.contains(x, w, z, y)
            }
        },
        hyperline: {
            render: function(D, E, w, y) {
                var F = y.getCtx();
                var z = A(D, E);
                if (z.a > 1000 || z.b > 1000 || z.ratio < 0) {
                    F.beginPath();
                    F.moveTo(D.x * w, D.y * w);
                    F.lineTo(E.x * w, E.y * w);
                    F.stroke()
                } else {
                    var C = Math.atan2(E.y - z.y, E.x - z.x);
                    var B = Math.atan2(D.y - z.y, D.x - z.x);
                    var x = x(C, B);
                    F.beginPath();
                    F.arc(z.x * w, z.y * w, z.ratio * w, C, B, x);
                    F.stroke()
                }
                function A(S, R) {
                    var K = (S.x * R.y - S.y * R.x), G = K;
                    var J = S.squaredNorm(), I = R.squaredNorm();
                    if (K == 0) {
                        return {
                            x: 0,
                            y: 0,
                            ratio: -1
                        }
                    }
                    var Q = (S.y * I - R.y * J + S.y - R.y) / K;
                    var O = (R.x * J - S.x * I + R.x - S.x) / G;
                    var P =- Q / 2;
                    var N =- O / 2;
                    var M = (Q * Q + O * O) / 4-1;
                    if (M < 0) {
                        return {
                            x: 0,
                            y: 0,
                            ratio: -1
                        }
                    }
                    var L = Math.sqrt(M);
                    var H = {
                        x: P,
                        y: N,
                        ratio: L > 1000?-1: L,
                        a: Q,
                        b: O
                    };
                    return H
                }
                function x(G, H) {
                    return (G < H) ? ((G + Math.PI > H) ? false : true) : ((H + Math.PI > G) ? true : false)
                }
            },
            contains: c.lambda(false)
        }
    };
    e.Plot = {
        initialize: function(x, w) {
            this.viz = x;
            this.config = x.config;
            this.node = x.config.Node;
            this.edge = x.config.Edge;
            this.animation = new u;
            this.nodeTypes = new w.Plot.NodeTypes;
            this.edgeTypes = new w.Plot.EdgeTypes;
            this.labels = x.labels
        },
        nodeHelper: a,
        edgeHelper: m,
        Interpolator: {
            map: {
                border: "color",
                color: "color",
                width: "number",
                height: "number",
                dim: "number",
                alpha: "number",
                lineWidth: "number",
                angularWidth: "number",
                span: "number",
                valueArray: "array-number",
                dimArray: "array-number"
            },
            canvas: {
                globalAlpha: "number",
                fillStyle: "color",
                strokeStyle: "color",
                lineWidth: "number",
                shadowBlur: "number",
                shadowColor: "color",
                shadowOffsetX: "number",
                shadowOffsetY: "number",
                miterLimit: "number"
            },
            label: {
                size: "number",
                color: "color"
            },
            compute: function(y, x, w) {
                return y + (x - y) * w
            },
            moebius: function(D, C, F, z) {
                var B = z.scale( - F);
                if (B.norm() < 1) {
                    var w = B.x, E = B.y;
                    var A = D.startPos.getc().moebiusTransformation(B);
                    D.pos.setc(A.x, A.y);
                    B.x = w;
                    B.y = E
                }
            },
            linear: function(x, w, A) {
                var z = x.startPos.getc(true);
                var y = x.endPos.getc(true);
                x.pos.setc(this.compute(z.x, y.x, A), this.compute(z.y, y.y, A))
            },
            polar: function(y, x, B) {
                var A = y.startPos.getp(true);
                var z = y.endPos.getp();
                var w = z.interpolate(A, B);
                y.pos.setp(w.theta, w.rho)
            },
            number: function(x, C, B, w, A) {
                var z = x[w](C, "start");
                var y = x[w](C, "end");
                x[A](C, this.compute(z, y, B))
            },
            color: function(y, w, E, B, z) {
                var C = c.hexToRgb(y[B](w, "start"));
                var D = c.hexToRgb(y[B](w, "end"));
                var A = this.compute;
                var x = c.rgbToHex([parseInt(A(C[0], D[0], E)), parseInt(A(C[1], D[1], E)), parseInt(A(C[2], D[2], E))]);
                y[z](w, x)
            },
            "array-number": function(z, y, J, G, B) {
                var H = z[G](y, "start"), I = z[G](y, "end"), K = [];
                for (var E = 0, A = H.length; E < A; E++) {
                    var x = H[E], w = I[E];
                    if (x.length) {
                        for (var D = 0, F = x.length, C = []; D < F; D++) {
                            C.push(this.compute(x[D], w[D], J))
                        }
                        K.push(C)
                    } else {
                        K.push(this.compute(x, w, J))
                    }
                }
                z[B](y, K)
            },
            node: function(x, C, E, w, D, y) {
                w = this[w];
                if (C) {
                    var B = C.length;
                    for (var z = 0; z < B; z++) {
                        var A = C[z];
                        this[w[A]](x, A, E, D, y)
                    }
                } else {
                    for (var A in w) {
                        this[w[A]](x, A, E, D, y)
                    }
                }
            },
            edge: function(y, x, D, z, w, C) {
                var B = y.adjacencies;
                for (var A in B) {
                    this["node"](B[A], x, D, z, w, C)
                }
            },
            "node-property": function(x, w, y) {
                this["node"](x, w, y, "map", "getData", "setData")
            },
            "edge-property": function(x, w, y) {
                this["edge"](x, w, y, "map", "getData", "setData")
            },
            "label-property": function(x, w, y) {
                this["node"](x, w, y, "label", "getLabelData", "setLabelData")
            },
            "node-style": function(x, w, y) {
                this["node"](x, w, y, "canvas", "getCanvasStyle", "setCanvasStyle")
            },
            "edge-style": function(x, w, y) {
                this["edge"](x, w, y, "canvas", "getCanvasStyle", "setCanvasStyle")
            }
        },
        sequence: function(x) {
            var y = this;
            x = c.merge({
                condition: c.lambda(false),
                step: c.empty,
                onComplete: c.empty,
                duration: 200
            }, x || {});
            var w = setInterval(function() {
                if (x.condition()) {
                    x.step()
                } else {
                    clearInterval(w);
                    x.onComplete()
                }
                y.viz.refresh(true)
            }, x.duration)
        },
        prepare: function(C) {
            var B = this.viz.graph, z = {
                "node-property": {
                    getter: "getData",
                    setter: "setData"
                },
                "edge-property": {
                    getter: "getData",
                    setter: "setData"
                },
                "node-style": {
                    getter: "getCanvasStyle",
                    setter: "setCanvasStyle"
                },
                "edge-style": {
                    getter: "getCanvasStyle",
                    setter: "setCanvasStyle"
                }
            };
            var x = {};
            if (c.type(C) == "array") {
                for (var A = 0, w = C.length; A < w; A++) {
                    var y = C[A].split(":");
                    x[y.shift()] = y
                }
            } else {
                for (var D in C) {
                    if (D == "position") {
                        x[C.position] = []
                    } else {
                        x[D] = c.splat(C[D])
                    }
                }
            }
            B.eachNode(function(E) {
                E.startPos.set(E.pos);
                c.each(["node-property", "node-style"], function(H) {
                    if (H in x) {
                        var I = x[H];
                        for (var G = 0, F = I.length; G < F; G++) {
                            E[z[H].setter](I[G], E[z[H].getter](I[G]), "start")
                        }
                    }
                });
                c.each(["edge-property", "edge-style"], function(F) {
                    if (F in x) {
                        var G = x[F];
                        E.eachAdjacency(function(I) {
                            for (var J = 0, H = G.length; J < H; J++) {
                                I[z[F].setter](G[J], I[z[F].getter](G[J]), "start")
                            }
                        })
                    }
                })
            });
            return x
        },
        animate: function(z, y) {
            z = c.merge(this.viz.config, z || {});
            var A = this, x = this.viz, C = x.graph, D = this.Interpolator, B = z.type === "nodefx" ? this.nodeFxAnimation: this.animation;
            var w = this.prepare(z.modes);
            if (z.hideLabels) {
                this.labels.hideLabels(true)
            }
            B.setOptions(c.extend(z, {
                $animating: false,
                compute: function(E) {
                    C.eachNode(function(F) {
                        for (var G in w) {
                            D[G](F, w[G], E, y)
                        }
                    });
                    A.plot(z, this.$animating, E);
                    this.$animating = true
                },
                complete: function() {
                    if (z.hideLabels) {
                        A.labels.hideLabels(false)
                    }
                    A.plot(z);
                    z.onComplete()
                }
            })).start()
        },
        nodeFx: function(y) {
            var D = this.viz, E = D.graph, B = this.nodeFxAnimation, F = c.merge(this.viz.config, {
                elements: {
                    id: false,
                    properties: {}
                },
                reposition: false
            });
            y = c.merge(F, y || {}, {
                onBeforeCompute: c.empty,
                onAfterCompute: c.empty
            });
            B.stopTimer();
            var C = y.elements.properties;
            if (!y.elements.id) {
                E.eachNode(function(H) {
                    for (var G in C) {
                        H.setData(G, C[G], "end")
                    }
                })
            } else {
                var w = c.splat(y.elements.id);
                c.each(w, function(I) {
                    var H = E.getNode(I);
                    if (H) {
                        for (var G in C) {
                            H.setData(G, C[G], "end")
                        }
                    }
                })
            }
            var A = [];
            for (var x in C) {
                A.push(x)
            }
            var z = ["node-property:" + A.join(":")];
            if (y.reposition) {
                z.push("linear");
                D.compute("end")
            }
            this.animate(c.merge(y, {
                modes: z,
                type: "nodefx"
            }))
        },
        plot: function(x, G) {
            var E = this.viz, B = E.graph, y = E.canvas, w = E.root, C = this, F = y.getCtx(), A = Math.min, x = x || this.viz.controller;
            x.clearCanvas && y.clear();
            var D = B.getNode(w);
            if (!D) {
                return 
            }
            var z=!!D.visited;
            B.eachNode(function(I) {
                var H = I.getData("alpha");
                I.eachAdjacency(function(J) {
                    var K = J.nodeTo;
                    if (!!K.visited === z && I.drawn && K.drawn) {
                        !G && x.onBeforePlotLine(J);
                        C.plotLine(J, y, G);
                        !G && x.onAfterPlotLine(J)
                    }
                });
                if (I.drawn) {
                    !G && x.onBeforePlotNode(I);
                    C.plotNode(I, y, G);
                    !G && x.onAfterPlotNode(I)
                }
                if (!C.labelsHidden && x.withLabels) {
                    if (I.drawn && H >= 0.95) {
                        C.labels.plotLabel(y, I, x)
                    } else {
                        C.labels.hideLabel(I, false)
                    }
                }
                I.visited=!z
            })
        },
        plotTree: function(A, x, E) {
            var B = this, C = this.viz, y = C.canvas, z = this.config, D = y.getCtx();
            var w = A.getData("alpha");
            A.eachSubnode(function(G) {
                if (x.plotSubtree(A, G) && G.exist && G.drawn) {
                    var F = A.getAdjacency(G.id);
                    !E && x.onBeforePlotLine(F);
                    B.plotLine(F, y, E);
                    !E && x.onAfterPlotLine(F);
                    B.plotTree(G, x, E)
                }
            });
            if (A.drawn) {
                !E && x.onBeforePlotNode(A);
                this.plotNode(A, y, E);
                !E && x.onAfterPlotNode(A);
                if (!x.hideLabels && x.withLabels && w >= 0.95) {
                    this.labels.plotLabel(y, A, x)
                } else {
                    this.labels.hideLabel(A, false)
                }
            } else {
                this.labels.hideLabel(A, true)
            }
        },
        plotNode: function(y, x, F) {
            var C = y.getData("type"), B = this.node.CanvasStyles;
            if (C != "none") {
                var w = y.getData("lineWidth"), A = y.getData("color"), z = y.getData("alpha"), D = x.getCtx();
                D.save();
                D.lineWidth = w;
                D.fillStyle = D.strokeStyle = A;
                D.globalAlpha = z;
                for (var E in B) {
                    D[E] = y.getCanvasStyle(E)
                }
                this.nodeTypes[C].render.call(this, y, x, F);
                D.restore()
            }
        },
        plotLine: function(C, x, G) {
            var B = C.getData("type"), z = this.edge.CanvasStyles;
            if (B != "none") {
                var w = C.getData("lineWidth"), y = C.getData("color"), E = x.getCtx(), A = C.nodeFrom, D = C.nodeTo;
                E.save();
                E.lineWidth = w;
                E.fillStyle = E.strokeStyle = y;
                E.globalAlpha = Math.min(A.getData("alpha"), D.getData("alpha"), C.getData("alpha"));
                for (var F in z) {
                    E[F] = C.getCanvasStyle(F)
                }
                this.edgeTypes[B].render.call(this, C, x, G);
                E.restore()
            }
        }
    };
    e.Plot3D = c.merge(e.Plot, {
        Interpolator: {
            linear: function(x, w, A) {
                var z = x.startPos.getc(true);
                var y = x.endPos.getc(true);
                x.pos.setc(this.compute(z.x, y.x, A), this.compute(z.y, y.y, A), this.compute(z.z, y.z, A))
            }
        },
        plotNode: function(x, w) {
            if (x.getData("type") == "none") {
                return 
            }
            this.plotElement(x, w, {
                getAlpha: function() {
                    return x.getData("alpha")
                }
            })
        },
        plotLine: function(w, x) {
            if (w.getData("type") == "none") {
                return 
            }
            this.plotElement(w, x, {
                getAlpha: function() {
                    return Math.min(w.nodeFrom.getData("alpha"), w.nodeTo.getData("alpha"), w.getData("alpha"))
                }
            })
        },
        plotElement: function(Y, E, z) {
            var V = E.getCtx(), F = new Matrix4, x = E.config.Scene.Lighting, Z = E.canvases[0], K = Z.program, X = Z.camera;
            if (!Y.geometry) {
                Y.geometry = new O3D[Y.getData("type")]
            }
            Y.geometry.update(Y);
            if (!Y.webGLVertexBuffer) {
                var J = [], B = [], P = [], N = 0, S = Y.geometry;
                for (var W = 0, U = S.vertices, H = S.faces, G = H.length; W < G; W++) {
                    var M = H[W], D = U[M.a], C = U[M.b], A = U[M.c], y = M.d ? U[M.d]: false, R = M.normal;
                    J.push(D.x, D.y, D.z);
                    J.push(C.x, C.y, C.z);
                    J.push(A.x, A.y, A.z);
                    if (y) {
                        J.push(y.x, y.y, y.z)
                    }
                    P.push(R.x, R.y, R.z);
                    P.push(R.x, R.y, R.z);
                    P.push(R.x, R.y, R.z);
                    if (y) {
                        P.push(R.x, R.y, R.z)
                    }
                    B.push(N, N + 1, N + 2);
                    if (y) {
                        B.push(N, N + 2, N + 3);
                        N += 4
                    } else {
                        N += 3
                    }
                }
                Y.webGLVertexBuffer = V.createBuffer();
                V.bindBuffer(V.ARRAY_BUFFER, Y.webGLVertexBuffer);
                V.bufferData(V.ARRAY_BUFFER, new Float32Array(J), V.STATIC_DRAW);
                Y.webGLFaceBuffer = V.createBuffer();
                V.bindBuffer(V.ELEMENT_ARRAY_BUFFER, Y.webGLFaceBuffer);
                V.bufferData(V.ELEMENT_ARRAY_BUFFER, new Uint16Array(B), V.STATIC_DRAW);
                Y.webGLFaceCount = B.length;
                Y.webGLNormalBuffer = V.createBuffer();
                V.bindBuffer(V.ARRAY_BUFFER, Y.webGLNormalBuffer);
                V.bufferData(V.ARRAY_BUFFER, new Float32Array(P), V.STATIC_DRAW)
            }
            F.multiply(X.matrix, Y.geometry.matrix);
            V.uniformMatrix4fv(K.viewMatrix, false, F.flatten());
            V.uniformMatrix4fv(K.projectionMatrix, false, X.projectionMatrix.flatten());
            var L = Matrix4.makeInvert(F);
            L.$transpose();
            V.uniformMatrix4fv(K.normalMatrix, false, L.flatten());
            var T = c.hexToRgb(Y.getData("color"));
            T.push(z.getAlpha());
            V.uniform4f(K.color, T[0] / 255, T[1] / 255, T[2] / 255, T[3]);
            V.uniform1i(K.enableLighting, x.enable);
            if (x.enable) {
                if (x.ambient) {
                    var O = x.ambient;
                    V.uniform3f(K.ambientColor, O[0], O[1], O[2])
                }
                if (x.directional) {
                    var Q = x.directional, T = Q.color, I = Q.direction, w = new Vector3(I.x, I.y, I.z).normalize().$scale(-1);
                    V.uniform3f(K.lightingDirection, w.x, w.y, w.z);
                    V.uniform3f(K.directionalColor, T[0], T[1], T[2])
                }
            }
            V.bindBuffer(V.ARRAY_BUFFER, Y.webGLVertexBuffer);
            V.vertexAttribPointer(K.position, 3, V.FLOAT, false, 0, 0);
            V.bindBuffer(V.ARRAY_BUFFER, Y.webGLNormalBuffer);
            V.vertexAttribPointer(K.normal, 3, V.FLOAT, false, 0, 0);
            V.bindBuffer(V.ELEMENT_ARRAY_BUFFER, Y.webGLFaceBuffer);
            V.drawElements(V.TRIANGLES, Y.webGLFaceCount, V.UNSIGNED_SHORT, 0)
        }
    });
    e.Label = {};
    e.Label.Native = new q({
        initialize: function(w) {
            this.viz = w
        },
        plotLabel: function(y, z, x) {
            var w = y.getCtx();
            var A = z.pos.getc(true);
            w.font = z.getLabelData("style") + " " + z.getLabelData("size") + "px " + z.getLabelData("family");
            w.textAlign = z.getLabelData("textAlign");
            w.fillStyle = w.strokeStyle = z.getLabelData("color");
            w.textBaseline = z.getLabelData("textBaseline");
            this.renderLabel(y, z, x)
        },
        renderLabel: function(y, z, x) {
            var w = y.getCtx();
            var A = z.pos.getc(true);
            w.fillText(z.name, A.x, A.y + z.getData("height") / 2)
        },
        hideLabel: c.empty,
        hideLabels: c.empty
    });
    e.Label.DOM = new q({
        labelsHidden: false,
        labelContainer: false,
        labels: {},
        getLabelContainer: function() {
            return this.labelContainer ? this.labelContainer : this.labelContainer = document.getElementById(this.viz.config.labelContainer)
        },
        getLabel: function(w) {
            return (w in this.labels && this.labels[w] != null) ? this.labels[w] : this.labels[w] = document.getElementById(w)
        },
        hideLabels: function(x) {
            var w = this.getLabelContainer();
            if (x) {
                w.style.display = "none"
            } else {
                w.style.display = ""
            }
            this.labelsHidden = x
        },
        clearLabels: function(w) {
            for (var x in this.labels) {
                if (w ||!this.viz.graph.hasNode(x)) {
                    this.disposeLabel(x);
                    delete this.labels[x]
                }
            }
        },
        disposeLabel: function(x) {
            var w = this.getLabel(x);
            if (w && w.parentNode) {
                w.parentNode.removeChild(w)
            }
        },
        hideLabel: function(A, w) {
            A = c.splat(A);
            var x = w ? "": "none", y, z = this;
            c.each(A, function(C) {
                var B = z.getLabel(C.id);
                if (B) {
                    B.style.display = x
                }
            })
        },
        fitsInCanvas: function(y, w) {
            var x = w.getSize();
            if (y.x >= x.width || y.x < 0 || y.y >= x.height || y.y < 0) {
                return false
            }
            return true
        }
    });
    e.Label.HTML = new q({
        Implements: e.Label.DOM,
        plotLabel: function(z, A, y) {
            var B = A.id, w = this.getLabel(B);
            if (!w&&!(w = document.getElementById(B))) {
                w = document.createElement("div");
                var x = this.getLabelContainer();
                w.id = B;
                w.className = "node";
                w.style.position = "absolute";
                y.onCreateLabel(w, A);
                x.appendChild(w);
                this.labels[A.id] = w
            }
            this.placeLabel(w, A, y)
        }
    });
    e.Label.SVG = new q({
        Implements: e.Label.DOM,
        plotLabel: function(z, B, y) {
            var D = B.id, w = this.getLabel(D);
            if (!w&&!(w = document.getElementById(D))) {
                var A = "http://www.w3.org/2000/svg";
                w = document.createElementNS(A, "svg:text");
                var C = document.createElementNS(A, "svg:tspan");
                w.appendChild(C);
                var x = this.getLabelContainer();
                w.setAttribute("id", D);
                w.setAttribute("class", "node");
                x.appendChild(w);
                y.onCreateLabel(w, B);
                this.labels[B.id] = w
            }
            this.placeLabel(w, B, y)
        }
    });
    e.Geom = new q({
        initialize: function(w) {
            this.viz = w;
            this.config = w.config;
            this.node = w.config.Node;
            this.edge = w.config.Edge
        },
        translate: function(x, w) {
            w = c.splat(w);
            this.viz.graph.eachNode(function(y) {
                c.each(w, function(z) {
                    y.getPos(z).$add(x)
                })
            })
        },
        setRightLevelToShow: function(z, w, B) {
            var A = this.getRightLevelToShow(z, w), y = this.viz.labels, x = c.merge({
                execShow: true,
                execHide: true,
                onHide: c.empty,
                onShow: c.empty
            }, B || {});
            z.eachLevel(0, this.config.levelsToShow, function(D) {
                var C = D._depth - z._depth;
                if (C > A) {
                    x.onHide(D);
                    if (x.execHide) {
                        D.drawn = false;
                        D.exist = false;
                        y.hideLabel(D, false)
                    }
                } else {
                    x.onShow(D);
                    if (x.execShow) {
                        D.exist = true
                    }
                }
            });
            z.drawn = true
        },
        getRightLevelToShow: function(z, x) {
            var w = this.config;
            var A = w.levelsToShow;
            var y = w.constrained;
            if (!y) {
                return A
            }
            while (!this.treeFitsInCanvas(z, x, A) && A > 1) {
                A--
            }
            return A
        }
    });
    var d = {
        construct: function(x) {
            var y = (c.type(x) == "array");
            var w = new e(this.graphOptions, this.config.Node, this.config.Edge, this.config.Label);
            if (!y) {
                (function(z, B) {
                    z.addNode(B);
                    if (B.children) {
                        for (var A = 0, C = B.children; A < C.length; A++) {
                            z.addAdjacence(B, C[A]);
                            arguments.callee(z, C[A])
                        }
                    }
                })(w, x)
            } else {
                (function(H, I) {
                    var A = function(M) {
                        for (var L = 0, J = I.length; L < J; L++) {
                            if (I[L].id == M) {
                                return I[L]
                            }
                        }
                        var K = {
                            id: M,
                            name: M
                        };
                        return H.addNode(K)
                    };
                    for (var E = 0, B = I.length; E < B; E++) {
                        H.addNode(I[E]);
                        var F = I[E].adjacencies;
                        if (F) {
                            for (var C = 0, G = F.length; C < G; C++) {
                                var z = F[C], D = {};
                                if (typeof F[C] != "string") {
                                    D = c.merge(z.data, {});
                                    z = z.nodeTo
                                }
                                H.addAdjacence(I[E], A(z), D)
                            }
                        }
                    }
                })(w, x)
            }
            return w
        },
        loadJSON: function(x, w) {
            this.json = x;
            if (this.labels && this.labels.clearLabels) {
                this.labels.clearLabels(true)
            }
            this.graph = this.construct(x);
            if (c.type(x) != "array") {
                this.root = x.id
            } else {
                this.root = x[w ? w: 0].id
            }
        },
        toJSON: function(A) {
            A = A || "tree";
            if (A == "tree") {
                var y = {};
                var x = this.graph.getNode(this.root);
                var y = (function w(D) {
                    var B = {};
                    B.id = D.id;
                    B.name = D.name;
                    B.data = D.data;
                    var C = [];
                    D.eachSubnode(function(E) {
                        C.push(w(E))
                    });
                    B.children = C;
                    return B
                })(x);
                return y
            } else {
                var y = [];
                var z=!!this.graph.getNode(this.root).visited;
                this.graph.eachNode(function(C) {
                    var B = {};
                    B.id = C.id;
                    B.name = C.name;
                    B.data = C.data;
                    var D = [];
                    C.eachAdjacency(function(E) {
                        var G = E.nodeTo;
                        if (!!G.visited === z) {
                            var F = {};
                            F.nodeTo = G.id;
                            F.data = E.data;
                            D.push(F)
                        }
                    });
                    B.adjacencies = D;
                    y.push(B);
                    C.visited=!z
                });
                return y
            }
        }
    };
    var g = $jit.Layouts = {};
    var f = {
        label: null,
        compute: function(z, A, x) {
            this.initializeLabel(x);
            var w = this.label, y = w.style;
            z.eachNode(function(D) {
                var H = D.getData("autoWidth"), I = D.getData("autoHeight");
                if (H || I) {
                    delete D.data.$width;
                    delete D.data.$height;
                    delete D.data.$dim;
                    var B = D.getData("width"), J = D.getData("height");
                    y.width = H ? "auto" : B + "px";
                    y.height = I ? "auto" : J + "px";
                    w.innerHTML = D.name;
                    var F = w.offsetWidth, C = w.offsetHeight;
                    var G = D.getData("type");
                    if (c.indexOf(["circle", "square", "triangle", "star"], G)===-1) {
                        D.setData("width", F);
                        D.setData("height", C)
                    } else {
                        var E = F > C ? F: C;
                        D.setData("width", E);
                        D.setData("height", E);
                        D.setData("dim", E)
                    }
                }
            })
        },
        initializeLabel: function(w) {
            if (!this.label) {
                this.label = document.createElement("div");
                document.body.appendChild(this.label)
            }
            this.setLabelStyles(w)
        },
        setLabelStyles: function(w) {
            c.extend(this.label.style, {
                visibility: "hidden",
                position: "absolute",
                width: "auto",
                height: "auto"
            });
            this.label.className = "jit-autoadjust-label"
        }
    };
    g.Tree = (function() {
        var F = Array.prototype.slice;
        function D(P, K, H, N, I) {
            var M = K.Node;
            var J = K.multitree;
            if (M.overridable) {
                var O =- 1, L =- 1;
                P.eachNode(function(S) {
                    if (S._depth == H && (!J || ("$orn" in S.data) && S.data.$orn == N)) {
                        var Q = S.getData("width", I);
                        var R = S.getData("height", I);
                        O = (O < Q) ? Q : O;
                        L = (L < R) ? R : L
                    }
                });
                return {
                    width: O < 0 ? M.width: O,
                    height: L < 0 ? M.height: L
                }
            } else {
                return M
            }
        }
        function G(I, L, K, H) {
            var J = (H == "left" || H == "right") ? "y": "x";
            I.getPos(L)[J] += K
        }
        function B(I, J) {
            var H = [];
            c.each(I, function(K) {
                K = F.call(K);
                K[0] += J;
                K[1] += J;
                H.push(K)
            });
            return H
        }
        function E(K, H) {
            if (K.length == 0) {
                return H
            }
            if (H.length == 0) {
                return K
            }
            var J = K.shift(), I = H.shift();
            return [[J[0], I[1]]].concat(E(K, H))
        }
        function z(H, I) {
            I = I || [];
            if (H.length == 0) {
                return I
            }
            var J = H.pop();
            return z(H, E(J, I))
        }
        function C(K, I, L, H, J) {
            if (K.length <= J || I.length <= J) {
                return 0
            }
            var N = K[J][1], M = I[J][0];
            return Math.max(C(K, I, L, H, ++J) + L, N - M + H)
        }
        function A(K, I, H) {
            function J(N, P, M) {
                if (P.length <= M) {
                    return []
                }
                var O = P[M], L = C(N, O, I, H, 0);
                return [L].concat(J(E(N, B(O, L)), P, ++M))
            }
            return J([], K, 0)
        }
        function x(L, K, J) {
            function H(O, Q, N) {
                if (Q.length <= N) {
                    return []
                }
                var P = Q[N], M =- C(P, O, K, J, 0);
                return [M].concat(H(E(B(P, M), O), Q, ++N))
            }
            L = F.call(L);
            var I = H([], L.reverse(), 0);
            return I.reverse()
        }
        function w(N, L, I, O) {
            var J = A(N, L, I), M = x(N, L, I);
            if (O == "left") {
                M = J
            } else {
                if (O == "right") {
                    J = M
                }
            }
            for (var K = 0, H = []; K < J.length; K++) {
                H[K] = (J[K] + M[K]) / 2
            }
            return H
        }
        function y(H, R, I, Y, W) {
            var K = Y.multitree;
            var Q = ["x", "y"], N = ["width", "height"];
            var J =+ (W == "left" || W == "right");
            var O = Q[J], X = Q[1 - J];
            var T = Y.Node;
            var M = N[J], V = N[1 - J];
            var L = Y.siblingOffset;
            var U = Y.subtreeOffset;
            var S = Y.align;
            function P(ab, af, aj) {
                var aa = ab.getData(M, I);
                var ai = af || (ab.getData(V, I));
                var am = [], ak = [], ag = false;
                var Z = ai + Y.levelDistance;
                ab.eachSubnode(function(ao) {
                    if (ao.exist && (!K || ("$orn" in ao.data) && ao.data.$orn == W)) {
                        if (!ag) {
                            ag = D(H, Y, ao._depth, W, I)
                        }
                        var an = P(ao, ag[V], aj + Z);
                        am.push(an.tree);
                        ak.push(an.extent)
                    }
                });
                var ae = w(ak, U, L, S);
                for (var ad = 0, ac = [], ah = []; ad < am.length; ad++) {
                    G(am[ad], I, ae[ad], W);
                    ah.push(B(ak[ad], ae[ad]))
                }
                var al = [[ - aa / 2, aa / 2]].concat(z(ah));
                ab.getPos(I)[O] = 0;
                if (W == "top" || W == "left") {
                    ab.getPos(I)[X] = aj
                } else {
                    ab.getPos(I)[X] =- aj
                }
                return {
                    tree: ab,
                    extent: al
                }
            }
            P(R, false, 0)
        }
        return new q({
            compute: function(J, I) {
                var K = J || "start";
                var H = this.graph.getNode(this.root);
                c.extend(H, {
                    drawn: true,
                    exist: true,
                    selected: true
                });
                f.compute(this.graph, K, this.config);
                if (!!I ||!("_depth" in H)) {
                    this.graph.computeLevels(this.root, 0, "ignore")
                }
                this.computePositions(H, K)
            },
            computePositions: function(L, H) {
                var J = this.config;
                var I = J.multitree;
                var O = J.align;
                var K = O !== "center" && J.indent;
                var P = J.orientation;
                var N = I ? ["top", "right", "bottom", "left"]: [P];
                var M = this;
                c.each(N, function(Q) {
                    y(M.graph, L, H, M.config, Q, H);
                    var R = ["x", "y"][ + (Q == "left" || Q == "right")];
                    (function S(T) {
                        T.eachSubnode(function(U) {
                            if (U.exist && (!I || ("$orn" in U.data) && U.data.$orn == Q)) {
                                U.getPos(H)[R] += T.getPos(H)[R];
                                if (K) {
                                    U.getPos(H)[R] += O == "left" ? K : - K
                                }
                                S(U)
                            }
                        })
                    })(L)
                })
            }
        })
    })();
    $jit.ST = (function() {
        var x = [];
        function y(D) {
            D = D || this.clickedNode;
            if (!this.config.constrained) {
                return []
            }
            var A = this.geom;
            var H = this.graph;
            var B = this.canvas;
            var z = D._depth, E = [];
            H.eachNode(function(I) {
                if (I.exist&&!I.selected) {
                    if (I.isDescendantOf(D.id)) {
                        if (I._depth <= z) {
                            E.push(I)
                        }
                    } else {
                        E.push(I)
                    }
                }
            });
            var F = A.getRightLevelToShow(D, B);
            D.eachLevel(F, F, function(I) {
                if (I.exist&&!I.selected) {
                    E.push(I)
                }
            });
            for (var G = 0; G < x.length; G++) {
                var C = this.graph.getNode(x[G]);
                if (!C.isDescendantOf(D.id)) {
                    E.push(C)
                }
            }
            return E
        }
        function w(B) {
            var A = [], z = this.config;
            B = B || this.clickedNode;
            this.clickedNode.eachLevel(0, z.levelsToShow, function(C) {
                if (z.multitree&&!("$orn" in C.data) && C.anySubnode(function(D) {
                    return D.exist&&!D.drawn
                })) {
                    A.push(C)
                } else {
                    if (C.drawn&&!C.anySubnode("drawn")) {
                        A.push(C)
                    }
                }
            });
            return A
        }
        return new q({
            Implements: [d, o, g.Tree],
            initialize: function(z) {
                var B = $jit.ST;
                var A = {
                    levelsToShow: 2,
                    levelDistance: 30,
                    constrained: true,
                    Node: {
                        type: "rectangle"
                    },
                    duration: 700,
                    offsetX: 0,
                    offsetY: 0
                };
                this.controller = this.config = c.merge(n("Canvas", "Fx", "Tree", "Node", "Edge", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), A, z);
                var C = this.config;
                if (C.useCanvas) {
                    this.canvas = C.useCanvas;
                    this.config.labelContainer = this.canvas.id + "-label"
                } else {
                    if (C.background) {
                        C.background = c.merge({
                            type: "Circles"
                        }, C.background)
                    }
                    this.canvas = new l(this, C);
                    this.config.labelContainer = (typeof C.injectInto == "string" ? C.injectInto : C.injectInto.id) + "-label"
                }
                this.graphOptions = {
                    klass: p
                };
                this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
                this.labels = new B.Label[C.Label.type](this);
                this.fx = new B.Plot(this, B);
                this.op = new B.Op(this);
                this.group = new B.Group(this);
                this.geom = new B.Geom(this);
                this.clickedNode = null;
                this.initializeExtras()
            },
            plot: function() {
                this.fx.plot(this.controller)
            },
            switchPosition: function(E, D, C) {
                var z = this.geom, A = this.fx, B = this;
                if (!A.busy) {
                    A.busy = true;
                    this.contract({
                        onComplete: function() {
                            z.switchOrientation(E);
                            B.compute("end", false);
                            A.busy = false;
                            if (D == "animate") {
                                B.onClick(B.clickedNode.id, C)
                            } else {
                                if (D == "replot") {
                                    B.select(B.clickedNode.id, C)
                                }
                            }
                        }
                    }, E)
                }
            },
            switchAlignment: function(B, A, z) {
                this.config.align = B;
                if (A == "animate") {
                    this.select(this.clickedNode.id, z)
                } else {
                    if (A == "replot") {
                        this.onClick(this.clickedNode.id, z)
                    }
                }
            },
            addNodeInPath: function(z) {
                x.push(z);
                this.select((this.clickedNode && this.clickedNode.id) || this.root)
            },
            clearNodesInPath: function(z) {
                x.length = 0;
                this.select((this.clickedNode && this.clickedNode.id) || this.root)
            },
            refresh: function() {
                this.reposition();
                this.select((this.clickedNode && this.clickedNode.id) || this.root)
            },
            reposition: function() {
                this.graph.computeLevels(this.root, 0, "ignore");
                this.geom.setRightLevelToShow(this.clickedNode, this.canvas);
                this.graph.eachNode(function(z) {
                    if (z.exist) {
                        z.drawn = true
                    }
                });
                this.compute("end")
            },
            requestNodes: function(B, C) {
                var A = c.merge(this.controller, C), z = this.config.levelsToShow;
                if (A.request) {
                    var E = [], D = B._depth;
                    B.eachLevel(0, z, function(F) {
                        if (F.drawn&&!F.anySubnode()) {
                            E.push(F);
                            F._level = z - (F._depth - D)
                        }
                    });
                    this.group.requestNodes(E, A)
                } else {
                    A.onComplete()
                }
            },
            contract: function(D, E) {
                var C = this.config.orientation;
                var z = this.geom, B = this.group;
                if (E) {
                    z.switchOrientation(E)
                }
                var A = y.call(this);
                if (E) {
                    z.switchOrientation(C)
                }
                B.contract(A, c.merge(this.controller, D))
            },
            move: function(A, B) {
                this.compute("end", false);
                var z = B.Move, C = {
                    x: z.offsetX,
                    y: z.offsetY
                };
                if (z.enable) {
                    this.geom.translate(A.endPos.add(C).$scale(-1), "end")
                }
                this.fx.animate(c.merge(this.controller, {
                    modes: ["linear"]
                }, B))
            },
            expand: function(A, B) {
                var z = w.call(this, A);
                this.group.expand(z, c.merge(this.controller, B))
            },
            selectPath: function(C) {
                var B = this;
                this.graph.eachNode(function(E) {
                    E.selected = false
                });
                function D(F) {
                    if (F == null || F.selected) {
                        return 
                    }
                    F.selected = true;
                    c.each(B.group.getSiblings([F])[F.id], function(G) {
                        G.exist = true;
                        G.drawn = true
                    });
                    var E = F.getParents();
                    E = (E.length > 0) ? E[0] : null;
                    D(E)
                }
                for (var z = 0, A = [C.id].concat(x); z < A.length; z++) {
                    D(this.graph.getNode(A[z]))
                }
            },
            setRoot: function(G, F, E) {
                if (this.busy) {
                    return 
                }
                this.busy = true;
                var D = this, B = this.canvas;
                var z = this.graph.getNode(this.root);
                var A = this.graph.getNode(G);
                function C() {
                    if (this.config.multitree && A.data.$orn) {
                        var I = A.data.$orn;
                        var J = {
                            left: "right",
                            right: "left",
                            top: "bottom",
                            bottom: "top"
                        }
                        [I];
                        z.data.$orn = J;
                        (function H(K) {
                            K.eachSubnode(function(L) {
                                if (L.id != G) {
                                    L.data.$orn = J;
                                    H(L)
                                }
                            })
                        })(z);
                        delete A.data.$orn
                    }
                    this.root = G;
                    this.clickedNode = A;
                    this.graph.computeLevels(this.root, 0, "ignore");
                    this.geom.setRightLevelToShow(A, B, {
                        execHide: false,
                        onShow: function(K) {
                            if (!K.drawn) {
                                K.drawn = true;
                                K.setData("alpha", 1, "end");
                                K.setData("alpha", 0);
                                K.pos.setc(A.pos.x, A.pos.y)
                            }
                        }
                    });
                    this.compute("end");
                    this.busy = true;
                    this.fx.animate({
                        modes: ["linear", "node-property:alpha"],
                        onComplete: function() {
                            D.busy = false;
                            D.onClick(G, {
                                onComplete: function() {
                                    E && E.onComplete()
                                }
                            })
                        }
                    })
                }
                delete z.data.$orns;
                if (F == "animate") {
                    C.call(this);
                    D.selectPath(A)
                } else {
                    if (F == "replot") {
                        C.call(this);
                        this.select(this.root)
                    }
                }
            },
            addSubtree: function(z, B, A) {
                if (B == "replot") {
                    this.op.sum(z, c.extend({
                        type: "replot"
                    }, A || {}))
                } else {
                    if (B == "animate") {
                        this.op.sum(z, c.extend({
                            type: "fade:seq"
                        }, A || {}))
                    }
                }
            },
            removeSubtree: function(E, A, D, C) {
                var B = this.graph.getNode(E), z = [];
                B.eachLevel(+!A, false, function(F) {
                    z.push(F.id)
                });
                if (D == "replot") {
                    this.op.removeNode(z, c.extend({
                        type: "replot"
                    }, C || {}))
                } else {
                    if (D == "animate") {
                        this.op.removeNode(z, c.extend({
                            type: "fade:seq"
                        }, C || {}))
                    }
                }
            },
            select: function(z, C) {
                var H = this.group, F = this.geom;
                var D = this.graph.getNode(z), B = this.canvas;
                var G = this.graph.getNode(this.root);
                var A = c.merge(this.controller, C);
                var E = this;
                A.onBeforeCompute(D);
                this.selectPath(D);
                this.clickedNode = D;
                this.requestNodes(D, {
                    onComplete: function() {
                        H.hide(H.prepare(y.call(E)), A);
                        F.setRightLevelToShow(D, B);
                        E.compute("current");
                        E.graph.eachNode(function(K) {
                            var J = K.pos.getc(true);
                            K.startPos.setc(J.x, J.y);
                            K.endPos.setc(J.x, J.y);
                            K.visited = false
                        });
                        var I = {
                            x: A.offsetX,
                            y: A.offsetY
                        };
                        E.geom.translate(D.endPos.add(I).$scale(-1), ["start", "current", "end"]);
                        H.show(w.call(E));
                        E.plot();
                        A.onAfterCompute(E.clickedNode);
                        A.onComplete()
                    }
                })
            },
            onClick: function(A, H) {
                var C = this.canvas, G = this, z = this.geom, D = this.config;
                var F = {
                    Move: {
                        enable: true,
                        offsetX: D.offsetX || 0,
                        offsetY: D.offsetY || 0
                    },
                    setRightLevelToShowConfig: false,
                    onBeforeRequest: c.empty,
                    onBeforeContract: c.empty,
                    onBeforeMove: c.empty,
                    onBeforeExpand: c.empty
                };
                var B = c.merge(this.controller, F, H);
                if (!this.busy) {
                    this.busy = true;
                    var E = this.graph.getNode(A);
                    this.selectPath(E, this.clickedNode);
                    this.clickedNode = E;
                    B.onBeforeCompute(E);
                    B.onBeforeRequest(E);
                    this.requestNodes(E, {
                        onComplete: function() {
                            B.onBeforeContract(E);
                            G.contract({
                                onComplete: function() {
                                    z.setRightLevelToShow(E, C, B.setRightLevelToShowConfig);
                                    B.onBeforeMove(E);
                                    G.move(E, {
                                        Move: B.Move,
                                        onComplete: function() {
                                            B.onBeforeExpand(E);
                                            G.expand(E, {
                                                onComplete: function() {
                                                    G.busy = false;
                                                    B.onAfterCompute(A);
                                                    B.onComplete()
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    })();
    $jit.ST.$extend = true;
    $jit.ST.Op = new q({
        Implements: e.Op
    });
    $jit.ST.Group = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config;
            this.animation = new u;
            this.nodes = null
        },
        requestNodes: function(B, A) {
            var z = 0, x = B.length, D = {};
            var y = function() {
                A.onComplete()
            };
            var w = this.viz;
            if (x == 0) {
                y()
            }
            for (var C = 0; C < x; C++) {
                D[B[C].id] = B[C];
                A.request(B[C].id, B[C]._level, {
                    onComplete: function(F, E) {
                        if (E && E.children) {
                            E.id = F;
                            w.op.sum(E, {
                                type: "nothing"
                            })
                        }
                        if (++z == x) {
                            w.graph.computeLevels(w.root, 0);
                            y()
                        }
                    }
                })
            }
        },
        contract: function(y, x) {
            var w = this.viz;
            var z = this;
            y = this.prepare(y);
            this.animation.setOptions(c.merge(x, {
                $animating: false,
                compute: function(A) {
                    if (A == 1) {
                        A = 0.99
                    }
                    z.plotStep(1 - A, x, this.$animating);
                    this.$animating = "contract"
                },
                complete: function() {
                    z.hide(y, x)
                }
            })).start()
        },
        hide: function(y, x) {
            var w = this.viz;
            for (var z = 0; z < y.length; z++) {
                if (true ||!x ||!x.request) {
                    y[z].eachLevel(1, false, function(B) {
                        if (B.exist) {
                            c.extend(B, {
                                drawn: false,
                                exist: false
                            })
                        }
                    })
                } else {
                    var A = [];
                    y[z].eachLevel(1, false, function(B) {
                        A.push(B.id)
                    });
                    w.op.removeNode(A, {
                        type: "nothing"
                    });
                    w.labels.clearLabels()
                }
            }
            x.onComplete()
        },
        expand: function(x, w) {
            var y = this;
            this.show(x);
            this.animation.setOptions(c.merge(w, {
                $animating: false,
                compute: function(z) {
                    y.plotStep(z, w, this.$animating);
                    this.$animating = "expand"
                },
                complete: function() {
                    y.plotStep(undefined, w, false);
                    w.onComplete()
                }
            })).start()
        },
        show: function(w) {
            var x = this.config;
            this.prepare(w);
            c.each(w, function(z) {
                if (x.multitree&&!("$orn" in z.data)) {
                    delete z.data.$orns;
                    var y = " ";
                    z.eachSubnode(function(A) {
                        if (("$orn" in A.data) && y.indexOf(A.data.$orn) < 0 && A.exist&&!A.drawn) {
                            y += A.data.$orn + " "
                        }
                    });
                    z.data.$orns = y
                }
                z.eachLevel(0, x.levelsToShow, function(A) {
                    if (A.exist) {
                        A.drawn = true
                    }
                })
            })
        },
        prepare: function(w) {
            this.nodes = this.getNodesWithChildren(w);
            return this.nodes
        },
        getNodesWithChildren: function(y) {
            var x = [], A = this.config, w = this.viz.root;
            y.sort(function(E, D) {
                return (E._depth <= D._depth) - (E._depth >= D._depth)
            });
            for (var B = 0; B < y.length; B++) {
                if (y[B].anySubnode("exist")) {
                    for (var z = B + 1, C = false; !C && z < y.length; z++) {
                        if (!A.multitree || "$orn" in y[z].data) {
                            C = C || y[B].isDescendantOf(y[z].id)
                        }
                    }
                    if (!C) {
                        x.push(y[B])
                    }
                }
            }
            return x
        },
        plotStep: function(G, C, I) {
            var F = this.viz, z = this.config, y = F.canvas, H = y.getCtx(), w = this.nodes;
            var B, A;
            var x = {};
            for (B = 0; B < w.length; B++) {
                A = w[B];
                x[A.id] = [];
                var E = z.multitree&&!("$orn" in A.data);
                var D = E && A.data.$orns;
                A.eachSubgraph(function(J) {
                    if (E && D && D.indexOf(J.data.$orn) > 0 && J.drawn) {
                        J.drawn = false;
                        x[A.id].push(J)
                    } else {
                        if ((!E ||!D) && J.drawn) {
                            J.drawn = false;
                            x[A.id].push(J)
                        }
                    }
                });
                A.drawn = true
            }
            if (w.length > 0) {
                F.fx.plot()
            }
            for (B in x) {
                c.each(x[B], function(J) {
                    J.drawn = true
                })
            }
            for (B = 0; B < w.length; B++) {
                A = w[B];
                H.save();
                F.fx.plotSubtree(A, C, G, I);
                H.restore()
            }
        },
        getSiblings: function(w) {
            var x = {};
            c.each(w, function(A) {
                var z = A.getParents();
                if (z.length == 0) {
                    x[A.id] = [A]
                } else {
                    var y = [];
                    z[0].eachSubnode(function(B) {
                        y.push(B)
                    });
                    x[A.id] = y
                }
            });
            return x
        }
    });
    $jit.ST.Geom = new q({
        Implements: e.Geom,
        switchOrientation: function(w) {
            this.config.orientation = w
        },
        dispatch: function() {
            var x = Array.prototype.slice.call(arguments);
            var y = x.shift(), w = x.length;
            var z = function(A) {
                return typeof A == "function" ? A() : A
            };
            if (w == 2) {
                return (y == "top" || y == "bottom") ? z(x[0]) : z(x[1])
            } else {
                if (w == 4) {
                    switch (y) {
                    case"top":
                        return z(x[0]);
                    case"right":
                        return z(x[1]);
                    case"bottom":
                        return z(x[2]);
                    case"left":
                        return z(x[3])
                    }
                }
            }
            return undefined
        },
        getSize: function(E, D) {
            var C = E.data, z = this.config;
            var y = z.siblingOffset;
            var B = (z.multitree && ("$orn" in C) && C.$orn) || z.orientation;
            var x = E.getData("width") + y;
            var A = E.getData("height") + y;
            if (!D) {
                return this.dispatch(B, A, x)
            } else {
                return this.dispatch(B, x, A)
            }
        },
        getTreeBaseSize: function(A, B, x) {
            var y = this.getSize(A, true), w = 0, z = this;
            if (x(B, A)) {
                return y
            }
            if (B === 0) {
                return 0
            }
            A.eachSubnode(function(C) {
                w += z.getTreeBaseSize(C, B-1, x)
            });
            return (y > w ? y : w) + this.config.subtreeOffset
        },
        getEdge: function(C, B, A) {
            var y = function(E, w) {
                return function() {
                    return C.pos.add(new p(E, w))
                }
            };
            var D = this.node;
            var x = C.getData("width");
            var z = C.getData("height");
            if (B == "begin") {
                if (D.align == "center") {
                    return this.dispatch(A, y(0, z / 2), y( - x / 2, 0), y(0, - z / 2), y(x / 2, 0))
                } else {
                    if (D.align == "left") {
                        return this.dispatch(A, y(0, z), y(0, 0), y(0, 0), y(x, 0))
                    } else {
                        if (D.align == "right") {
                            return this.dispatch(A, y(0, 0), y( - x, 0), y(0, - z), y(0, 0))
                        } else {
                            throw "align: not implemented"
                        }
                    }
                }
            } else {
                if (B == "end") {
                    if (D.align == "center") {
                        return this.dispatch(A, y(0, - z / 2), y(x / 2, 0), y(0, z / 2), y( - x / 2, 0))
                    } else {
                        if (D.align == "left") {
                            return this.dispatch(A, y(0, 0), y(x, 0), y(0, z), y(0, 0))
                        } else {
                            if (D.align == "right") {
                                return this.dispatch(A, y(0, - z), y(0, 0), y(0, 0), y( - x, 0))
                            } else {
                                throw "align: not implemented"
                            }
                        }
                    }
                }
            }
        },
        getScaledTreePosition: function(B, D) {
            var C = this.node;
            var x = B.getData("width");
            var A = B.getData("height");
            var z = (this.config.multitree && ("$orn" in B.data) && B.data.$orn) || this.config.orientation;
            var y = function(E, w) {
                return function() {
                    return B.pos.add(new p(E, w)).$scale(1 - D)
                }
            };
            if (C.align == "left") {
                return this.dispatch(z, y(0, A), y(0, 0), y(0, 0), y(x, 0))
            } else {
                if (C.align == "center") {
                    return this.dispatch(z, y(0, A / 2), y( - x / 2, 0), y(0, - A / 2), y(x / 2, 0))
                } else {
                    if (C.align == "right") {
                        return this.dispatch(z, y(0, 0), y( - x, 0), y(0, - A), y(0, 0))
                    } else {
                        throw "align: not implemented"
                    }
                }
            }
        },
        treeFitsInCanvas: function(B, w, C) {
            var y = w.getSize();
            var z = (this.config.multitree && ("$orn" in B.data) && B.data.$orn) || this.config.orientation;
            var x = this.dispatch(z, y.width, y.height);
            var A = this.getTreeBaseSize(B, C, function(E, D) {
                return E === 0 ||!D.anySubnode()
            });
            return (A < x)
        }
    });
    $jit.ST.Plot = new q({
        Implements: e.Plot,
        plotSubtree: function(z, w, A, E) {
            var C = this.viz, x = C.canvas, y = C.config;
            A = Math.min(Math.max(0.001, A), 1);
            if (A >= 0) {
                z.drawn = false;
                var D = x.getCtx();
                var B = C.geom.getScaledTreePosition(z, A);
                D.translate(B.x, B.y);
                D.scale(A, A)
            }
            this.plotTree(z, c.merge(w, {
                withLabels: true,
                hideLabels: !!A,
                plotSubtree: function(I, G) {
                    var F = y.multitree&&!("$orn" in z.data);
                    var H = F && z.getData("orns");
                    return !F || H.indexOf(z.getData("orn"))>-1
                }
            }), E);
            if (A >= 0) {
                z.drawn = true
            }
        },
        getAlignedPos: function(B, z, w) {
            var y = this.node;
            var A, x;
            if (y.align == "center") {
                A = {
                    x: B.x - z / 2,
                    y: B.y - w / 2
                }
            } else {
                if (y.align == "left") {
                    x = this.config.orientation;
                    if (x == "bottom" || x == "top") {
                        A = {
                            x: B.x - z / 2,
                            y: B.y
                        }
                    } else {
                        A = {
                            x: B.x,
                            y: B.y - w / 2
                        }
                    }
                } else {
                    if (y.align == "right") {
                        x = this.config.orientation;
                        if (x == "bottom" || x == "top") {
                            A = {
                                x: B.x - z / 2,
                                y: B.y - w
                            }
                        } else {
                            A = {
                                x: B.x - z,
                                y: B.y - w / 2
                            }
                        }
                    } else {
                        throw "align: not implemented"
                    }
                }
            }
            return A
        },
        getOrientation: function(w) {
            var y = this.config;
            var x = y.orientation;
            if (y.multitree) {
                var z = w.nodeFrom;
                var A = w.nodeTo;
                x = (("$orn" in z.data) && z.data.$orn) || (("$orn" in A.data) && A.data.$orn)
            }
            return x
        }
    });
    $jit.ST.Label = {};
    $jit.ST.Label.Native = new q({
        Implements: e.Label.Native,
        renderLabel: function(z, B, y) {
            var x = z.getCtx(), D = B.pos.getc(true), A = B.getData("width"), w = B.getData("height"), C = this.viz.fx.getAlignedPos(D, A, w);
            x.fillText(B.name, C.x + A / 2, C.y + w / 2)
        }
    });
    $jit.ST.Label.DOM = new q({
        Implements: e.Label.DOM,
        placeLabel: function(P, J, F) {
            var B = J.pos.getc(true), O = this.viz.config, K = O.Node, x = this.viz.canvas, C = J.getData("width"), M = J.getData("height"), y = x.getSize(), G, N;
            var A = x.translateOffsetX, z = x.translateOffsetY, E = x.scaleOffsetX, D = x.scaleOffsetY, I = B.x * E + A, H = B.y * D + z;
            if (K.align == "center") {
                G = {
                    x: Math.round(I - C / 2 + y.width / 2),
                    y: Math.round(H - M / 2 + y.height / 2)
                }
            } else {
                if (K.align == "left") {
                    N = O.orientation;
                    if (N == "bottom" || N == "top") {
                        G = {
                            x: Math.round(I - C / 2 + y.width / 2),
                            y: Math.round(H + y.height / 2)
                        }
                    } else {
                        G = {
                            x: Math.round(I + y.width / 2),
                            y: Math.round(H - M / 2 + y.height / 2)
                        }
                    }
                } else {
                    if (K.align == "right") {
                        N = O.orientation;
                        if (N == "bottom" || N == "top") {
                            G = {
                                x: Math.round(I - C / 2 + y.width / 2),
                                y: Math.round(H - M + y.height / 2)
                            }
                        } else {
                            G = {
                                x: Math.round(I - C + y.width / 2),
                                y: Math.round(H - M / 2 + y.height / 2)
                            }
                        }
                    } else {
                        throw "align: not implemented"
                    }
                }
            }
            var L = P.style;
            L.left = G.x + "px";
            L.top = G.y + "px";
            L.display = this.fitsInCanvas(G, x) ? "" : "none";
            F.onPlaceLabel(P, J)
        }
    });
    $jit.ST.Label.SVG = new q({
        Implements: [$jit.ST.Label.DOM, e.Label.SVG],
        initialize: function(w) {
            this.viz = w
        }
    });
    $jit.ST.Label.HTML = new q({
        Implements: [$jit.ST.Label.DOM, e.Label.HTML],
        initialize: function(w) {
            this.viz = w
        }
    });
    $jit.ST.Plot.NodeTypes = new q({
        none: {
            render: c.empty,
            contains: c.lambda(false)
        },
        circle: {
            render: function(x, w) {
                var z = x.getData("dim"), A = this.getAlignedPos(x.pos.getc(true), z, z), y = z / 2;
                this.nodeHelper.circle.render("fill", {
                    x: A.x + y,
                    y: A.y + y
                }, y, w)
            },
            contains: function(w, A) {
                var y = w.getData("dim"), z = this.getAlignedPos(w.pos.getc(true), y, y), x = y / 2;
                this.nodeHelper.circle.contains({
                    x: z.x + x,
                    y: z.y + x
                }, A, x)
            }
        },
        square: {
            render: function(x, w) {
                var z = x.getData("dim"), y = z / 2, A = this.getAlignedPos(x.pos.getc(true), z, z);
                this.nodeHelper.square.render("fill", {
                    x: A.x + y,
                    y: A.y + y
                }, y, w)
            },
            contains: function(w, A) {
                var y = w.getData("dim"), z = this.getAlignedPos(w.pos.getc(true), y, y), x = y / 2;
                this.nodeHelper.square.contains({
                    x: z.x + x,
                    y: z.y + x
                }, A, x)
            }
        },
        ellipse: {
            render: function(z, x) {
                var y = z.getData("width"), w = z.getData("height"), A = this.getAlignedPos(z.pos.getc(true), y, w);
                this.nodeHelper.ellipse.render("fill", {
                    x: A.x + y / 2,
                    y: A.y + w / 2
                }, y, w, x)
            },
            contains: function(y, A) {
                var x = y.getData("width"), w = y.getData("height"), z = this.getAlignedPos(y.pos.getc(true), x, w);
                this.nodeHelper.ellipse.contains({
                    x: z.x + x / 2,
                    y: z.y + w / 2
                }, A, x, w)
            }
        },
        rectangle: {
            render: function(z, x) {
                var y = z.getData("width"), w = z.getData("height"), A = this.getAlignedPos(z.pos.getc(true), y, w);
                this.nodeHelper.rectangle.render("fill", {
                    x: A.x + y / 2,
                    y: A.y + w / 2
                }, y, w, x)
            },
            contains: function(y, A) {
                var x = y.getData("width"), w = y.getData("height"), z = this.getAlignedPos(y.pos.getc(true), x, w);
                this.nodeHelper.rectangle.contains({
                    x: z.x + x / 2,
                    y: z.y + w / 2
                }, A, x, w)
            }
        }
    });
    $jit.ST.Plot.EdgeTypes = new q({
        none: c.empty,
        line: {
            render: function(x, z) {
                var y = this.getOrientation(x), A = x.nodeFrom, B = x.nodeTo, w = A._depth < B._depth, D = this.viz.geom.getEdge(w ? A : B, "begin", y), C = this.viz.geom.getEdge(w ? B : A, "end", y);
                this.edgeHelper.line.render(D, C, z)
            },
            contains: function(x, D) {
                var y = this.getOrientation(x), z = x.nodeFrom, A = x.nodeTo, w = z._depth < A._depth, C = this.viz.geom.getEdge(w ? z : A, "begin", y), B = this.viz.geom.getEdge(w ? A : z, "end", y);
                return this.edgeHelper.line.contains(C, B, D, this.edge.epsilon)
            }
        },
        arrow: {
            render: function(C, x) {
                var B = this.getOrientation(C), y = C.nodeFrom, w = C.nodeTo, A = C.getData("dim"), E = this.viz.geom.getEdge(y, "begin", B), F = this.viz.geom.getEdge(w, "end", B), D = C.data.$direction, z = (D && D.length > 1 && D[0] != y.id);
                this.edgeHelper.arrow.render(E, F, A, z, x)
            },
            contains: function(x, D) {
                var y = this.getOrientation(x), z = x.nodeFrom, A = x.nodeTo, w = z._depth < A._depth, C = this.viz.geom.getEdge(w ? z : A, "begin", y), B = this.viz.geom.getEdge(w ? A : z, "end", y);
                return this.edgeHelper.arrow.contains(C, B, D, this.edge.epsilon)
            }
        },
        "quadratic:begin": {
            render: function(C, w) {
                var B = this.getOrientation(C);
                var A = C.nodeFrom, D = C.nodeTo, F = A._depth < D._depth, x = this.viz.geom.getEdge(F ? A : D, "begin", B), y = this.viz.geom.getEdge(F ? D : A, "end", B), z = C.getData("dim"), E = w.getCtx();
                E.beginPath();
                E.moveTo(x.x, x.y);
                switch (B) {
                case"left":
                    E.quadraticCurveTo(x.x + z, x.y, y.x, y.y);
                    break;
                case"right":
                    E.quadraticCurveTo(x.x - z, x.y, y.x, y.y);
                    break;
                case"top":
                    E.quadraticCurveTo(x.x, x.y + z, y.x, y.y);
                    break;
                case"bottom":
                    E.quadraticCurveTo(x.x, x.y - z, y.x, y.y);
                    break
                }
                E.stroke()
            }
        },
        "quadratic:end": {
            render: function(C, w) {
                var B = this.getOrientation(C);
                var A = C.nodeFrom, D = C.nodeTo, F = A._depth < D._depth, x = this.viz.geom.getEdge(F ? A : D, "begin", B), y = this.viz.geom.getEdge(F ? D : A, "end", B), z = C.getData("dim"), E = w.getCtx();
                E.beginPath();
                E.moveTo(x.x, x.y);
                switch (B) {
                case"left":
                    E.quadraticCurveTo(y.x - z, y.y, y.x, y.y);
                    break;
                case"right":
                    E.quadraticCurveTo(y.x + z, y.y, y.x, y.y);
                    break;
                case"top":
                    E.quadraticCurveTo(y.x, y.y - z, y.x, y.y);
                    break;
                case"bottom":
                    E.quadraticCurveTo(y.x, y.y + z, y.x, y.y);
                    break
                }
                E.stroke()
            }
        },
        bezier: {
            render: function(C, w) {
                var B = this.getOrientation(C), A = C.nodeFrom, D = C.nodeTo, F = A._depth < D._depth, x = this.viz.geom.getEdge(F ? A : D, "begin", B), y = this.viz.geom.getEdge(F ? D : A, "end", B), z = C.getData("dim"), E = w.getCtx();
                E.beginPath();
                E.moveTo(x.x, x.y);
                switch (B) {
                case"left":
                    E.bezierCurveTo(x.x + z, x.y, y.x - z, y.y, y.x, y.y);
                    break;
                case"right":
                    E.bezierCurveTo(x.x - z, x.y, y.x + z, y.y, y.x, y.y);
                    break;
                case"top":
                    E.bezierCurveTo(x.x, x.y + z, y.x, y.y - z, y.x, y.y);
                    break;
                case"bottom":
                    E.bezierCurveTo(x.x, x.y - z, y.x, y.y + z, y.x, y.y);
                    break
                }
                E.stroke()
            }
        }
    });
    $jit.ST.Plot.NodeTypes.implement({
        "areachart-stacked": {
            render: function(W, D) {
                var U = W.pos.getc(true), w = W.getData("width"), A = W.getData("height"), G = this.getAlignedPos(U, w, A), ab = G.x, aa = G.y, L = W.getData("stringArray"), F = W.getData("dimArray"), B = W.getData("valueArray"), ad = c.reduce(B, function(aj, ak) {
                    return aj + ak[0]
                }, 0), ac = c.reduce(B, function(aj, ak) {
                    return aj + ak[1]
                }, 0), I = W.getData("colorArray"), C = I.length, Y = W.getData("config"), J = W.getData("gradient"), ai = Y.showLabels, N = Y.showAggregates, ae = Y.Label, T = W.getData("prev");
                var M = D.getCtx(), H = W.getData("border");
                if (I && F && L) {
                    for (var ah = 0, af = F.length, K = 0, E = 0, X = 0; ah < af; ah++) {
                        M.fillStyle = M.strokeStyle = I[ah%C];
                        M.save();
                        if (J && (F[ah][0] > 0 || F[ah][1] > 0)) {
                            var R = K + F[ah][0], P = E + F[ah][1], ag = Math.atan((P - R) / w), Z = 55;
                            var V = M.createLinearGradient(ab + w / 2, aa - (R + P) / 2, ab + w / 2 + Z * Math.sin(ag), aa - (R + P) / 2 + Z * Math.cos(ag));
                            var Q = c.rgbToHex(c.map(c.hexToRgb(I[ah%C].slice(1)), function(x) {
                                return (x * 0.85)>>0
                            }));
                            V.addColorStop(0, I[ah%C]);
                            V.addColorStop(1, Q);
                            M.fillStyle = V
                        }
                        M.beginPath();
                        M.moveTo(ab, aa - K);
                        M.lineTo(ab + w, aa - E);
                        M.lineTo(ab + w, aa - E - F[ah][1]);
                        M.lineTo(ab, aa - K - F[ah][0]);
                        M.lineTo(ab, aa - K);
                        M.fill();
                        M.restore();
                        if (H) {
                            var S = H.name == L[ah];
                            var z = S ? 0.7: 0.8;
                            var Q = c.rgbToHex(c.map(c.hexToRgb(I[ah%C].slice(1)), function(x) {
                                return (x * z)>>0
                            }));
                            M.strokeStyle = Q;
                            M.lineWidth = S ? 4 : 1;
                            M.save();
                            M.beginPath();
                            if (H.index === 0) {
                                M.moveTo(ab, aa - K);
                                M.lineTo(ab, aa - K - F[ah][0])
                            } else {
                                M.moveTo(ab + w, aa - E);
                                M.lineTo(ab + w, aa - E - F[ah][1])
                            }
                            M.stroke();
                            M.restore()
                        }
                        K += (F[ah][0] || 0);
                        E += (F[ah][1] || 0);
                        if (F[ah][0] > 0) {
                            X += (B[ah][0] || 0)
                        }
                    }
                    if (T && ae.type == "Native") {
                        M.save();
                        M.beginPath();
                        M.fillStyle = M.strokeStyle = ae.color;
                        M.font = ae.style + " " + ae.size + "px " + ae.family;
                        M.textAlign = "center";
                        M.textBaseline = "middle";
                        var O = N(W.name, ad, ac, W, X);
                        if (O !== false) {
                            M.fillText(O !== true ? O : X, ab, aa - K - Y.labelOffset - ae.size / 2, w)
                        }
                        if (ai(W.name, ad, ac, W)) {
                            M.fillText(W.name, ab, aa + ae.size / 2 + Y.labelOffset)
                        }
                        M.restore()
                    }
                }
            },
            contains: function(C, E) {
                var J = C.pos.getc(true), z = C.getData("width"), N = C.getData("height"), M = this.getAlignedPos(J, z, N), L = M.x, K = M.y, O = C.getData("dimArray"), w = E.x - L;
                if (E.x < L || E.x > L + z || E.y > K || E.y < K - N) {
                    return false
                }
                for (var F = 0, D = O.length, I = K, A = K; F < D; F++) {
                    var B = O[F];
                    I -= B[0];
                    A -= B[1];
                    var G = I + (A - I) * w / z;
                    if (E.y >= G) {
                        var H =+ (w > z / 2);
                        return {
                            name: C.getData("stringArray")[F],
                            color: C.getData("colorArray")[F],
                            value: C.getData("valueArray")[F][H],
                            index: H
                        }
                    }
                }
                return false
            }
        }
    });
    $jit.AreaChart = new q({
        st: null,
        colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
        selected: {},
        busy: false,
        initialize: function(y) {
            this.controller = this.config = c.merge(n("Canvas", "Margin", "Label", "AreaChart"), {
                Label: {
                    type: "Native"
                }
            }, y);
            var z = this.config.showLabels, x = c.type(z), A = this.config.showAggregates, w = c.type(A);
            this.config.showLabels = x == "function" ? z : c.lambda(z);
            this.config.showAggregates = w == "function" ? A : c.lambda(A);
            this.initializeViz()
        },
        initializeViz: function() {
            var x = this.config, B = this, w = x.type.split(":")[0], A = {};
            var z = new $jit.ST({
                injectInto: x.injectInto,
                width: x.width,
                height: x.height,
                orientation: "bottom",
                levelDistance: 0,
                siblingOffset: 0,
                subtreeOffset: 0,
                withLabels: x.Label.type != "Native",
                useCanvas: x.useCanvas,
                Label: {
                    type: x.Label.type
                },
                Node: {
                    overridable: true,
                    type: "areachart-" + w,
                    align: "left",
                    width: 1,
                    height: 1
                },
                Edge: {
                    type: "none"
                },
                Tips: {
                    enable: x.Tips.enable,
                    type: "Native",
                    force: true,
                    onShow: function(G, F, D) {
                        var E = D;
                        x.Tips.onShow(G, E, F)
                    }
                },
                Events: {
                    enable: true,
                    type: "Native",
                    onClick: function(F, G, D) {
                        if (!x.filterOnClick&&!x.Events.enable) {
                            return 
                        }
                        var E = G.getContains();
                        if (E) {
                            x.filterOnClick && B.filter(E.name)
                        }
                        x.Events.enable && x.Events.onClick(E, G, D)
                    },
                    onRightClick: function(E, F, D) {
                        if (!x.restoreOnRightClick) {
                            return 
                        }
                        B.restore()
                    },
                    onMouseMove: function(F, G, D) {
                        if (!x.selectOnHover) {
                            return 
                        }
                        if (F) {
                            var E = G.getContains();
                            B.select(F.id, E.name, E.index)
                        } else {
                            B.select(false, false, false)
                        }
                    }
                },
                onCreateLabel: function(J, G) {
                    var P = x.Label, O = G.getData("valueArray"), H = c.reduce(O, function(Q, R) {
                        return Q + R[0]
                    }, 0), M = c.reduce(O, function(Q, R) {
                        return Q + R[1]
                    }, 0);
                    if (G.getData("prev")) {
                        var L = {
                            wrapper: document.createElement("div"),
                            aggregate: document.createElement("div"),
                            label: document.createElement("div")
                        };
                        var D = L.wrapper, N = L.label, E = L.aggregate, F = D.style, K = N.style, I = E.style;
                        A[G.id] = L;
                        D.appendChild(N);
                        D.appendChild(E);
                        if (!x.showLabels(G.name, H, M, G)) {
                            N.style.display = "none"
                        }
                        if (!x.showAggregates(G.name, H, M, G)) {
                            E.style.display = "none"
                        }
                        F.position = "relative";
                        F.overflow = "visible";
                        F.fontSize = P.size + "px";
                        F.fontFamily = P.family;
                        F.color = P.color;
                        F.textAlign = "center";
                        I.position = K.position = "absolute";
                        J.style.width = G.getData("width") + "px";
                        J.style.height = G.getData("height") + "px";
                        N.innerHTML = G.name;
                        J.appendChild(D)
                    }
                },
                onPlaceLabel: function(V, P) {
                    if (!P.getData("prev")) {
                        return 
                    }
                    var T = A[P.id], E = T.wrapper.style, D = T.label.style, O = T.aggregate.style, M = P.getData("width"), K = P.getData("height"), J = P.getData("dimArray"), G = P.getData("valueArray"), L = c.reduce(G, function(W, X) {
                        return W + X[0]
                    }, 0), H = c.reduce(G, function(W, X) {
                        return W + X[1]
                    }, 0), I = parseInt(E.fontSize, 10), N = V.style;
                    if (J && G) {
                        if (x.showLabels(P.name, L, H, P)) {
                            D.display = ""
                        } else {
                            D.display = "none"
                        }
                        var F = x.showAggregates(P.name, L, H, P);
                        if (F !== false) {
                            O.display = ""
                        } else {
                            O.display = "none"
                        }
                        E.width = O.width = D.width = V.style.width = M + "px";
                        O.left = D.left =- M / 2 + "px";
                        for (var S = 0, Q = G.length, R = 0, U = 0; S < Q; S++) {
                            if (J[S][0] > 0) {
                                R += G[S][0];
                                U += J[S][0]
                            }
                        }
                        O.top = ( - I - x.labelOffset) + "px";
                        D.top = (x.labelOffset + U) + "px";
                        V.style.top = parseInt(V.style.top, 10) - U + "px";
                        V.style.height = E.height = U + "px";
                        T.aggregate.innerHTML = F !== true ? F : R
                    }
                }
            });
            var y = z.canvas.getSize(), C = x.Margin;
            z.config.offsetY =- y.height / 2 + C.bottom + (x.showLabels && (x.labelOffset + x.Label.size));
            z.config.offsetX = (C.right - C.left) / 2;
            this.delegate = z;
            this.canvas = this.delegate.canvas
        },
        loadJSON: function(N) {
            var J = c.time(), B = [], M = this.delegate, Q = c.splat(N.label), I = c.splat(N.color || this.colors), O = this.config, x=!!O.type.split(":")[1], z = O.animate;
            for (var K = 0, y = N.values, H = y.length; K < H-1; K++) {
                var P = y[K], E = y[K-1], F = y[K + 1];
                var L = c.splat(y[K].values), w = c.splat(y[K + 1].values);
                var A = c.zip(L, w);
                var D = 0, C = 0;
                B.push({
                    id: J + P.label,
                    name: P.label,
                    data: {
                        value: A,
                        "$valueArray": A,
                        "$colorArray": I,
                        "$stringArray": Q,
                        "$next": F.label,
                        "$prev": E ? E.label: false,
                        "$config": O,
                        "$gradient": x
                    },
                    children: []
                })
            }
            var G = {
                id: J + "$root",
                name: "",
                data: {
                    "$type": "none",
                    "$width": 1,
                    "$height": 1
                },
                children: B
            };
            M.loadJSON(G);
            this.normalizeDims();
            M.compute();
            M.select(M.root);
            if (z) {
                M.fx.animate({
                    modes: ["node-property:height:dimArray"],
                    duration: 1500
                })
            }
        },
        updateJSON: function(G, x) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var D = this.delegate, F = D.graph, A = G.label && c.splat(G.label), E = G.values, w = this.config.animate, C = this, B = {};
            for (var z = 0, y = E.length; z < y; z++) {
                B[E[z].label] = E[z]
            }
            F.eachNode(function(L) {
                var H = B[L.name], I = L.getData("stringArray"), K = L.getData("valueArray"), J = L.getData("next");
                if (H) {
                    H.values = c.splat(H.values);
                    c.each(K, function(M, N) {
                        M[0] = H.values[N];
                        if (A) {
                            I[N] = A[N]
                        }
                    });
                    L.setData("valueArray", K)
                }
                if (J) {
                    H = B[J];
                    if (H) {
                        c.each(K, function(M, N) {
                            M[1] = H.values[N]
                        })
                    }
                }
            });
            this.normalizeDims();
            D.compute();
            D.select(D.root);
            if (w) {
                D.fx.animate({
                    modes: ["node-property:height:dimArray"],
                    duration: 1500,
                    onComplete: function() {
                        C.busy = false;
                        x && x.onComplete()
                    }
                })
            }
        },
        filter: function(z, A) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            if (this.config.Tips.enable) {
                this.delegate.tips.hide()
            }
            this.select(false, false, false);
            var x = c.splat(z);
            var w = this.delegate.graph.getNode(this.delegate.root);
            var y = this;
            this.normalizeDims();
            w.eachAdjacency(function(B) {
                var E = B.nodeTo, D = E.getData("dimArray", "end"), C = E.getData("stringArray");
                E.setData("dimArray", c.map(D, function(G, F) {
                    return (c.indexOf(x, C[F])>-1) ? G : [0, 0]
                }), "end")
            });
            this.delegate.fx.animate({
                modes: ["node-property:dimArray"],
                duration: 1500,
                onComplete: function() {
                    y.busy = false;
                    A && A.onComplete()
                }
            })
        },
        restore: function(x) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            if (this.config.Tips.enable) {
                this.delegate.tips.hide()
            }
            this.select(false, false, false);
            this.normalizeDims();
            var w = this;
            this.delegate.fx.animate({
                modes: ["node-property:height:dimArray"],
                duration: 1500,
                onComplete: function() {
                    w.busy = false;
                    x && x.onComplete()
                }
            })
        },
        select: function(B, x, w) {
            if (!this.config.selectOnHover) {
                return 
            }
            var y = this.selected;
            if (y.id != B || y.name != x || y.index != w) {
                y.id = B;
                y.name = x;
                y.index = w;
                this.delegate.graph.eachNode(function(C) {
                    C.setData("border", false)
                });
                if (B) {
                    var A = this.delegate.graph.getNode(B);
                    A.setData("border", y);
                    var z = w === 0 ? "prev": "next";
                    z = A.getData(z);
                    if (z) {
                        A = this.delegate.graph.getByName(z);
                        if (A) {
                            A.setData("border", {
                                name: x,
                                index: 1 - w
                            })
                        }
                    }
                }
                this.delegate.plot()
            }
        },
        getLegend: function() {
            var y = {};
            var z;
            this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(A) {
                z = A.nodeTo
            });
            var x = z.getData("colorArray"), w = x.length;
            c.each(z.getData("stringArray"), function(B, A) {
                y[B] = x[A%w]
            });
            return y
        },
        getMaxValue: function() {
            var w = 0;
            this.delegate.graph.eachNode(function(B) {
                var y = B.getData("valueArray"), x = 0, A = 0;
                c.each(y, function(C) {
                    x+=+C[0];
                    A+=+C[1]
                });
                var z = A > x ? A: x;
                w = w > z ? w : z
            });
            return w
        },
        normalizeDims: function() {
            var C = this.delegate.graph.getNode(this.delegate.root), z = 0;
            C.eachAdjacency(function() {
                z++
            });
            var B = this.getMaxValue() || 1, F = this.delegate.canvas.getSize(), y = this.config, A = y.Margin, D = y.labelOffset + y.Label.size, w = (F.width - (A.left + A.right)) / z, x = y.animate, E = F.height - (A.top + A.bottom) - (y.showAggregates && D) - (y.showLabels && D);
            this.delegate.graph.eachNode(function(L) {
                var I = 0, K = 0, G = [];
                c.each(L.getData("valueArray"), function(M) {
                    I+=+M[0];
                    K+=+M[1];
                    G.push([0, 0])
                });
                var J = K > I ? K: I;
                L.setData("width", w);
                if (x) {
                    L.setData("height", J * E / B, "end");
                    L.setData("dimArray", c.map(L.getData("valueArray"), function(M) {
                        return [M[0] * E / B, M[1] * E / B]
                    }), "end");
                    var H = L.getData("dimArray");
                    if (!H) {
                        L.setData("dimArray", G)
                    }
                } else {
                    L.setData("height", J * E / B);
                    L.setData("dimArray", c.map(L.getData("valueArray"), function(M) {
                        return [M[0] * E / B, M[1] * E / B]
                    }))
                }
            })
        }
    });
    n.BarChart = {
        $extend: true,
        animate: true,
        type: "stacked",
        labelOffset: 3,
        barsOffset: 0,
        hoveredColor: "#9fd4ff",
        orientation: "horizontal",
        showAggregates: true,
        showLabels: true,
        Tips: {
            enable: false,
            onShow: c.empty,
            onHide: c.empty
        },
        Events: {
            enable: false,
            onClick: c.empty
        }
    };
    $jit.ST.Plot.NodeTypes.implement({
        "barchart-stacked": {
            render: function(R, C) {
                var H = R.pos.getc(true), Q = R.getData("width"), O = R.getData("height"), M = this.getAlignedPos(H, Q, O), L = M.x, K = M.y, N = R.getData("dimArray"), F = R.getData("valueArray"), E = R.getData("colorArray"), B = E.length, Y = R.getData("stringArray");
                var T = C.getCtx(), w = {}, U = R.getData("border"), z = R.getData("gradient"), aa = R.getData("config"), A = aa.orientation == "horizontal", D = aa.showAggregates, P = aa.showLabels, J = aa.Label;
                if (E && N && Y) {
                    for (var X = 0, S = N.length, W = 0, G = 0; X < S; X++) {
                        T.fillStyle = T.strokeStyle = E[X%B];
                        if (z) {
                            var Z;
                            if (A) {
                                Z = T.createLinearGradient(L + W + N[X] / 2, K, L + W + N[X] / 2, K + O)
                            } else {
                                Z = T.createLinearGradient(L, K - W - N[X] / 2, L + Q, K - W - N[X] / 2)
                            }
                            var V = c.rgbToHex(c.map(c.hexToRgb(E[X%B].slice(1)), function(x) {
                                return (x * 0.5)>>0
                            }));
                            Z.addColorStop(0, V);
                            Z.addColorStop(0.5, E[X%B]);
                            Z.addColorStop(1, V);
                            T.fillStyle = Z
                        }
                        if (A) {
                            T.fillRect(L + W, K, N[X], O)
                        } else {
                            T.fillRect(L, K - W - N[X], Q, N[X])
                        }
                        if (U && U.name == Y[X]) {
                            w.acum = W;
                            w.dimValue = N[X]
                        }
                        W += (N[X] || 0);
                        G += (F[X] || 0)
                    }
                    if (U) {
                        T.save();
                        T.lineWidth = 2;
                        T.strokeStyle = U.color;
                        if (A) {
                            T.strokeRect(L + w.acum + 1, K + 1, w.dimValue-2, O-2)
                        } else {
                            T.strokeRect(L + 1, K - w.acum - w.dimValue + 1, Q-2, w.dimValue-2)
                        }
                        T.restore()
                    }
                    if (J.type == "Native") {
                        T.save();
                        T.fillStyle = T.strokeStyle = J.color;
                        T.font = J.style + " " + J.size + "px " + J.family;
                        T.textBaseline = "middle";
                        var I = D(R.name, G, R);
                        if (I !== false) {
                            I = I !== true ? I : G;
                            if (A) {
                                T.textAlign = "right";
                                T.fillText(I, L + W - aa.labelOffset, K + O / 2)
                            } else {
                                T.textAlign = "center";
                                T.fillText(I, L + Q / 2, K - O - J.size / 2 - aa.labelOffset)
                            }
                        }
                        if (P(R.name, G, R)) {
                            if (A) {
                                T.textAlign = "center";
                                T.translate(L - aa.labelOffset - J.size / 2, K + O / 2);
                                T.rotate(Math.PI / 2);
                                T.fillText(R.name, 0, 0)
                            } else {
                                T.textAlign = "center";
                                T.fillText(R.name, L + Q / 2, K + J.size / 2 + aa.labelOffset)
                            }
                        }
                        T.restore()
                    }
                }
            },
            contains: function(D, F) {
                var I = D.pos.getc(true), A = D.getData("width"), N = D.getData("height"), M = this.getAlignedPos(I, A, N), L = M.x, J = M.y, O = D.getData("dimArray"), B = D.getData("config"), z = F.x - L, w = B.orientation == "horizontal";
                if (w) {
                    if (F.x < L || F.x > L + A || F.y > J + N || F.y < J) {
                        return false
                    }
                } else {
                    if (F.x < L || F.x > L + A || F.y > J || F.y < J - N) {
                        return false
                    }
                }
                for (var G = 0, E = O.length, K = (w ? L : J); G < E; G++) {
                    var C = O[G];
                    if (w) {
                        K += C;
                        var H = K;
                        if (F.x <= H) {
                            return {
                                name: D.getData("stringArray")[G],
                                color: D.getData("colorArray")[G],
                                value: D.getData("valueArray")[G],
                                label: D.name
                            }
                        }
                    } else {
                        K -= C;
                        var H = K;
                        if (F.y >= H) {
                            return {
                                name: D.getData("stringArray")[G],
                                color: D.getData("colorArray")[G],
                                value: D.getData("valueArray")[G],
                                label: D.name
                            }
                        }
                    }
                }
                return false
            }
        },
        "barchart-grouped": {
            render: function(S, C) {
                var I = S.pos.getc(true), R = S.getData("width"), P = S.getData("height"), N = this.getAlignedPos(I, R, P), M = N.x, L = N.y, O = S.getData("dimArray"), G = S.getData("valueArray"), Y = G.length, F = S.getData("colorArray"), B = F.length, aa = S.getData("stringArray");
                var U = C.getCtx(), w = {}, V = S.getData("border"), z = S.getData("gradient"), ac = S.getData("config"), A = ac.orientation == "horizontal", E = ac.showAggregates, Q = ac.showLabels, K = ac.Label, D = (A ? P : R) / Y;
                if (F && O && aa) {
                    for (var Z = 0, T = Y, X = 0, H = 0; Z < T; Z++) {
                        U.fillStyle = U.strokeStyle = F[Z%B];
                        if (z) {
                            var ab;
                            if (A) {
                                ab = U.createLinearGradient(M + O[Z] / 2, L + D * Z, M + O[Z] / 2, L + D * (Z + 1))
                            } else {
                                ab = U.createLinearGradient(M + D * Z, L - O[Z] / 2, M + D * (Z + 1), L - O[Z] / 2)
                            }
                            var W = c.rgbToHex(c.map(c.hexToRgb(F[Z%B].slice(1)), function(x) {
                                return (x * 0.5)>>0
                            }));
                            ab.addColorStop(0, W);
                            ab.addColorStop(0.5, F[Z%B]);
                            ab.addColorStop(1, W);
                            U.fillStyle = ab
                        }
                        if (A) {
                            U.fillRect(M, L + D * Z, O[Z], D)
                        } else {
                            U.fillRect(M + D * Z, L - O[Z], D, O[Z])
                        }
                        if (V && V.name == aa[Z]) {
                            w.acum = D * Z;
                            w.dimValue = O[Z]
                        }
                        X += (O[Z] || 0);
                        H += (G[Z] || 0)
                    }
                    if (V) {
                        U.save();
                        U.lineWidth = 2;
                        U.strokeStyle = V.color;
                        if (A) {
                            U.strokeRect(M + 1, L + w.acum + 1, w.dimValue-2, D-2)
                        } else {
                            U.strokeRect(M + w.acum + 1, L - w.dimValue + 1, D-2, w.dimValue-2)
                        }
                        U.restore()
                    }
                    if (K.type == "Native") {
                        U.save();
                        U.fillStyle = U.strokeStyle = K.color;
                        U.font = K.style + " " + K.size + "px " + K.family;
                        U.textBaseline = "middle";
                        var J = E(S.name, H, S);
                        if (J !== false) {
                            J = J !== true ? J : H;
                            if (A) {
                                U.textAlign = "right";
                                U.fillText(J, M + Math.max.apply(null, O) - ac.labelOffset, L + P / 2)
                            } else {
                                U.textAlign = "center";
                                U.fillText(J, M + R / 2, L - Math.max.apply(null, O) - K.size / 2 - ac.labelOffset)
                            }
                        }
                        if (Q(S.name, H, S)) {
                            if (A) {
                                U.textAlign = "center";
                                U.translate(M - ac.labelOffset - K.size / 2, L + P / 2);
                                U.rotate(Math.PI / 2);
                                U.fillText(S.name, 0, 0)
                            } else {
                                U.textAlign = "center";
                                U.fillText(S.name, M + R / 2, L + K.size / 2 + ac.labelOffset)
                            }
                        }
                        U.restore()
                    }
                }
            },
            contains: function(J, F) {
                var B = J.pos.getc(true), I = J.getData("width"), H = J.getData("height"), E = this.getAlignedPos(B, I, H), D = E.x, C = E.y, G = J.getData("dimArray"), M = G.length, P = J.getData("config"), A = F.x - D, w = P.orientation == "horizontal", z = (w ? H : I) / M;
                if (w) {
                    if (F.x < D || F.x > D + I || F.y > C + H || F.y < C) {
                        return false
                    }
                } else {
                    if (F.x < D || F.x > D + I || F.y > C || F.y < C - H) {
                        return false
                    }
                }
                for (var L = 0, K = G.length; L < K; L++) {
                    var O = G[L];
                    if (w) {
                        var N = C + z * L;
                        if (F.x <= D + O && F.y >= N && F.y <= N + z) {
                            return {
                                name: J.getData("stringArray")[L],
                                color: J.getData("colorArray")[L],
                                value: J.getData("valueArray")[L],
                                label: J.name
                            }
                        }
                    } else {
                        var N = D + z * L;
                        if (F.x >= N && F.x <= N + z && F.y >= C - O) {
                            return {
                                name: J.getData("stringArray")[L],
                                color: J.getData("colorArray")[L],
                                value: J.getData("valueArray")[L],
                                label: J.name
                            }
                        }
                    }
                }
                return false
            }
        }
    });
    $jit.BarChart = new q({
        st: null,
        colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
        selected: {},
        busy: false,
        initialize: function(y) {
            this.controller = this.config = c.merge(n("Canvas", "Margin", "Label", "BarChart"), {
                Label: {
                    type: "Native"
                }
            }, y);
            var z = this.config.showLabels, x = c.type(z), A = this.config.showAggregates, w = c.type(A);
            this.config.showLabels = x == "function" ? z : c.lambda(z);
            this.config.showAggregates = w == "function" ? A : c.lambda(A);
            this.initializeViz()
        },
        initializeViz: function() {
            var x = this.config, B = this;
            var w = x.type.split(":")[0], D = x.orientation == "horizontal", A = {};
            var z = new $jit.ST({
                injectInto: x.injectInto,
                width: x.width,
                height: x.height,
                orientation: D ? "left": "bottom",
                levelDistance: 0,
                siblingOffset: x.barsOffset,
                subtreeOffset: 0,
                withLabels: x.Label.type != "Native",
                useCanvas: x.useCanvas,
                Label: {
                    type: x.Label.type
                },
                Node: {
                    overridable: true,
                    type: "barchart-" + w,
                    align: "left",
                    width: 1,
                    height: 1
                },
                Edge: {
                    type: "none"
                },
                Tips: {
                    enable: x.Tips.enable,
                    type: "Native",
                    force: true,
                    onShow: function(H, G, E) {
                        var F = E;
                        x.Tips.onShow(H, F, G)
                    }
                },
                Events: {
                    enable: true,
                    type: "Native",
                    onClick: function(G, H, E) {
                        if (!x.Events.enable) {
                            return 
                        }
                        var F = H.getContains();
                        x.Events.onClick(F, H, E)
                    },
                    onMouseMove: function(G, H, E) {
                        if (!x.hoveredColor) {
                            return 
                        }
                        if (G) {
                            var F = H.getContains();
                            B.select(G.id, F.name, F.index)
                        } else {
                            B.select(false, false, false)
                        }
                    }
                },
                onCreateLabel: function(J, H) {
                    var P = x.Label, N = H.getData("valueArray"), M = c.reduce(N, function(Q, R) {
                        return Q + R
                    }, 0);
                    var L = {
                        wrapper: document.createElement("div"),
                        aggregate: document.createElement("div"),
                        label: document.createElement("div")
                    };
                    var E = L.wrapper, O = L.label, F = L.aggregate, G = E.style, K = O.style, I = F.style;
                    A[H.id] = L;
                    E.appendChild(O);
                    E.appendChild(F);
                    if (!x.showLabels(H.name, M, H)) {
                        K.display = "none"
                    }
                    if (!x.showAggregates(H.name, M, H)) {
                        I.display = "none"
                    }
                    G.position = "relative";
                    G.overflow = "visible";
                    G.fontSize = P.size + "px";
                    G.fontFamily = P.family;
                    G.color = P.color;
                    G.textAlign = "center";
                    I.position = K.position = "absolute";
                    J.style.width = H.getData("width") + "px";
                    J.style.height = H.getData("height") + "px";
                    I.left = K.left = "0px";
                    O.innerHTML = H.name;
                    J.appendChild(E)
                },
                onPlaceLabel: function(U, P) {
                    if (!A[P.id]) {
                        return 
                    }
                    var T = A[P.id], G = T.wrapper.style, E = T.label.style, O = T.aggregate.style, V = x.type.split(":")[0] == "grouped", F = x.orientation == "horizontal", K = P.getData("dimArray"), I = P.getData("valueArray"), M = (V && F) ? Math.max.apply(null, K): P.getData("width"), L = (V&&!F) ? Math.max.apply(null, K): P.getData("height"), J = parseInt(G.fontSize, 10), N = U.style;
                    if (K && I) {
                        G.width = O.width = E.width = U.style.width = M + "px";
                        for (var S = 0, Q = I.length, R = 0; S < Q; S++) {
                            if (K[S] > 0) {
                                R += I[S]
                            }
                        }
                        if (x.showLabels(P.name, R, P)) {
                            E.display = ""
                        } else {
                            E.display = "none"
                        }
                        var H = x.showAggregates(P.name, R, P);
                        if (H !== false) {
                            O.display = ""
                        } else {
                            O.display = "none"
                        }
                        if (x.orientation == "horizontal") {
                            O.textAlign = "right";
                            E.textAlign = "left";
                            E.textIndex = O.textIndent = x.labelOffset + "px";
                            O.top = E.top = (L - J) / 2 + "px";
                            U.style.height = G.height = L + "px"
                        } else {
                            O.top = ( - J - x.labelOffset) + "px";
                            E.top = (x.labelOffset + L) + "px";
                            U.style.top = parseInt(U.style.top, 10) - L + "px";
                            U.style.height = G.height = L + "px"
                        }
                        T.aggregate.innerHTML = H !== true ? H : R
                    }
                }
            });
            var y = z.canvas.getSize(), C = x.Margin;
            if (D) {
                z.config.offsetX = y.width / 2 - C.left - (x.showLabels && (x.labelOffset + x.Label.size));
                z.config.offsetY = (C.bottom - C.top) / 2
            } else {
                z.config.offsetY =- y.height / 2 + C.bottom + (x.showLabels && (x.labelOffset + x.Label.size));
                z.config.offsetX = (C.right - C.left) / 2
            }
            this.delegate = z;
            this.canvas = this.delegate.canvas
        },
        loadJSON: function(K) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var H = c.time(), C = [], J = this.delegate, N = c.splat(K.label), G = c.splat(K.color || this.colors), L = this.config, w=!!L.type.split(":")[1], z = L.animate, y = L.orientation == "horizontal", A = this;
            for (var I = 0, x = K.values, E = x.length; I < E; I++) {
                var M = x[I];
                var B = c.splat(x[I].values);
                var F = 0;
                C.push({
                    id: H + M.label,
                    name: M.label,
                    data: {
                        value: B,
                        "$valueArray": B,
                        "$colorArray": G,
                        "$stringArray": N,
                        "$gradient": w,
                        "$config": L
                    },
                    children: []
                })
            }
            var D = {
                id: H + "$root",
                name: "",
                data: {
                    "$type": "none",
                    "$width": 1,
                    "$height": 1
                },
                children: C
            };
            J.loadJSON(D);
            this.normalizeDims();
            J.compute();
            J.select(J.root);
            if (z) {
                if (y) {
                    J.fx.animate({
                        modes: ["node-property:width:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false
                        }
                    })
                } else {
                    J.fx.animate({
                        modes: ["node-property:height:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false
                        }
                    })
                }
            } else {
                this.busy = false
            }
        },
        updateJSON: function(y, C) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            this.select(false, false, false);
            var z = this.delegate;
            var B = z.graph;
            var x = y.values;
            var w = this.config.animate;
            var A = this;
            var D = this.config.orientation == "horizontal";
            c.each(x, function(E) {
                var F = B.getByName(E.label);
                if (F) {
                    F.setData("valueArray", c.splat(E.values));
                    if (y.label) {
                        F.setData("stringArray", c.splat(y.label))
                    }
                }
            });
            this.normalizeDims();
            z.compute();
            z.select(z.root);
            if (w) {
                if (D) {
                    z.fx.animate({
                        modes: ["node-property:width:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false;
                            C && C.onComplete()
                        }
                    })
                } else {
                    z.fx.animate({
                        modes: ["node-property:height:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false;
                            C && C.onComplete()
                        }
                    })
                }
            }
        },
        select: function(y, w) {
            if (!this.config.hoveredColor) {
                return 
            }
            var x = this.selected;
            if (x.id != y || x.name != w) {
                x.id = y;
                x.name = w;
                x.color = this.config.hoveredColor;
                this.delegate.graph.eachNode(function(z) {
                    if (y == z.id) {
                        z.setData("border", x)
                    } else {
                        z.setData("border", false)
                    }
                });
                this.delegate.plot()
            }
        },
        getLegend: function() {
            var y = {};
            var z;
            this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(A) {
                z = A.nodeTo
            });
            var x = z.getData("colorArray"), w = x.length;
            c.each(z.getData("stringArray"), function(B, A) {
                y[B] = x[A%w]
            });
            return y
        },
        getMaxValue: function() {
            var x = 0, w = this.config.type.split(":")[0] == "stacked";
            this.delegate.graph.eachNode(function(A) {
                var y = A.getData("valueArray"), z = 0;
                if (!y) {
                    return 
                }
                if (w) {
                    c.each(y, function(B) {
                        z+=+B
                    })
                } else {
                    z = Math.max.apply(null, y)
                }
                x = x > z ? x : z
            });
            return x
        },
        setBarType: function(w) {
            this.config.type = w;
            this.delegate.config.Node.type = "barchart-" + w.split(":")[0]
        },
        normalizeDims: function() {
            var G = this.delegate.graph.getNode(this.delegate.root), B = 0;
            G.eachAdjacency(function() {
                B++
            });
            var D = this.getMaxValue() || 1, J = this.delegate.canvas.getSize(), z = this.config, C = z.Margin, H = C.left + C.right, A = C.top + C.bottom, x = z.orientation == "horizontal", w = (J[x ? "height": "width"] - (x ? A : H) - (B-1) * z.barsOffset) / B, y = z.animate, I = J[x ? "width": "height"] - (x ? H : A) - (!x && z.showAggregates && (z.Label.size + z.labelOffset)) - (z.showLabels && (z.Label.size + z.labelOffset)), F = x ? "height": "width", E = x ? "width": "height";
            this.delegate.graph.eachNode(function(N) {
                var M = 0, K = [];
                c.each(N.getData("valueArray"), function(O) {
                    M+=+O;
                    K.push(0)
                });
                N.setData(F, w);
                if (y) {
                    N.setData(E, M * I / D, "end");
                    N.setData("dimArray", c.map(N.getData("valueArray"), function(O) {
                        return O * I / D
                    }), "end");
                    var L = N.getData("dimArray");
                    if (!L) {
                        N.setData("dimArray", K)
                    }
                } else {
                    N.setData(E, M * I / D);
                    N.setData("dimArray", c.map(N.getData("valueArray"), function(O) {
                        return O * I / D
                    }))
                }
            })
        }
    });
    n.PieChart = {
        $extend: true,
        animate: true,
        offset: 25,
        sliceOffset: 0,
        labelOffset: 3,
        type: "stacked",
        hoveredColor: "#9fd4ff",
        Events: {
            enable: false,
            onClick: c.empty
        },
        Tips: {
            enable: false,
            onShow: c.empty,
            onHide: c.empty
        },
        showLabels: true,
        resizeLabels: false,
        updateHeights: false
    };
    g.Radial = new q({
        compute: function(x) {
            var y = c.splat(x || ["current", "start", "end"]);
            f.compute(this.graph, y, this.config);
            this.graph.computeLevels(this.root, 0, "ignore");
            var w = this.createLevelDistanceFunc();
            this.computeAngularWidths(y);
            this.computePositions(y, w)
        },
        computePositions: function(D, A) {
            var F = D;
            var E = this.graph;
            var B = E.getNode(this.root);
            var C = this.parent;
            var w = this.config;
            for (var y = 0, x = F.length; y < x; y++) {
                var z = F[y];
                B.setPos(k(0, 0), z);
                B.setData("span", Math.PI * 2, z)
            }
            B.angleSpan = {
                begin: 0,
                end: 2 * Math.PI
            };
            E.eachBFS(this.root, function(K) {
                var Q = K.angleSpan.end - K.angleSpan.begin;
                var S = K.angleSpan.begin;
                var R = A(K);
                var T = 0, G = [], J = {};
                K.eachSubnode(function(W) {
                    T += W._treeAngularWidth;
                    for (var X = 0, V = F.length; X < V; X++) {
                        var Z = F[X], Y = W.getData("dim", Z);
                        J[Z] = (Z in J) ? (Y > J[Z] ? Y : J[Z]) : Y
                    }
                    G.push(W)
                }, "ignore");
                if (C && C.id == K.id && G.length > 0 && G[0].dist) {
                    G.sort(function(W, V) {
                        return (W.dist >= V.dist) - (W.dist <= V.dist)
                    })
                }
                for (var M = 0, O = G.length; M < O; M++) {
                    var I = G[M];
                    if (!I._flag) {
                        var U = I._treeAngularWidth / T * Q;
                        var H = S + U / 2;
                        for (var N = 0, L = F.length; N < L; N++) {
                            var P = F[N];
                            I.setPos(k(H, R), P);
                            I.setData("span", U, P);
                            I.setData("dim-quotient", I.getData("dim", P) / J[P], P)
                        }
                        I.angleSpan = {
                            begin: S,
                            end: S + U
                        };
                        S += U
                    }
                }
            }, "ignore")
        },
        setAngularWidthForNodes: function(w) {
            this.graph.eachBFS(this.root, function(z, x) {
                var y = z.getData("angularWidth", w[0]) || 5;
                z._angularWidth = y / x
            }, "ignore")
        },
        setSubtreesAngularWidth: function() {
            var w = this;
            this.graph.eachNode(function(x) {
                w.setSubtreeAngularWidth(x)
            }, "ignore")
        },
        setSubtreeAngularWidth: function(z) {
            var y = this, x = z._angularWidth, w = 0;
            z.eachSubnode(function(A) {
                y.setSubtreeAngularWidth(A);
                w += A._treeAngularWidth
            }, "ignore");
            z._treeAngularWidth = Math.max(x, w)
        },
        computeAngularWidths: function(w) {
            this.setAngularWidthForNodes(w);
            this.setSubtreesAngularWidth()
        }
    });
    $jit.Sunburst = new q({
        Implements: [d, o, g.Radial],
        initialize: function(w) {
            var y = $jit.Sunburst;
            var x = {
                interpolation: "linear",
                levelDistance: 100,
                Node: {
                    type: "multipie",
                    height: 0
                },
                Edge: {
                    type: "none"
                },
                Label: {
                    textAlign: "start",
                    textBaseline: "middle"
                }
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), x, w);
            var z = this.config;
            if (z.useCanvas) {
                this.canvas = z.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (z.background) {
                    z.background = c.merge({
                        type: "Circles"
                    }, z.background)
                }
                this.canvas = new l(this, z);
                this.config.labelContainer = (typeof z.injectInto == "string" ? z.injectInto : z.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: b,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new y.Label[z.Label.type](this);
            this.fx = new y.Plot(this, y);
            this.op = new y.Op(this);
            this.json = null;
            this.root = null;
            this.rotated = null;
            this.busy = false;
            this.initializeExtras()
        },
        createLevelDistanceFunc: function() {
            var w = this.config.levelDistance;
            return function(x) {
                return (x._depth + 1) * w
            }
        },
        refresh: function() {
            this.compute();
            this.plot()
        },
        reposition: function() {
            this.compute("end")
        },
        rotate: function(y, z, x) {
            var w = y.getPos(x.property || "current").getp(true).theta;
            this.rotated = y;
            this.rotateAngle( - w, z, x)
        },
        rotateAngle: function(y, B, x) {
            var z = this;
            var w = c.merge(this.config, x || {}, {
                modes: ["polar"]
            });
            var A = x.property || (B === "animate" ? "end" : "current");
            if (B === "animate") {
                this.fx.animation.pause()
            }
            this.graph.eachNode(function(D) {
                var C = D.getPos(A);
                C.theta += y;
                if (C.theta < 0) {
                    C.theta += Math.PI * 2
                }
            });
            if (B == "animate") {
                this.fx.animate(w)
            } else {
                if (B == "replot") {
                    this.fx.plot();
                    this.busy = false
                }
            }
        },
        plot: function() {
            this.fx.plot()
        }
    });
    $jit.Sunburst.$extend = true;
    (function(w) {
        w.Op = new q({
            Implements: e.Op
        });
        w.Plot = new q({
            Implements: e.Plot
        });
        w.Label = {};
        w.Label.Native = new q({
            Implements: e.Label.Native,
            initialize: function(x) {
                this.viz = x;
                this.label = x.config.Label;
                this.config = x.config
            },
            renderLabel: function(C, E, G) {
                var N = E.getData("span");
                if (N < Math.PI / 2 && Math.tan(N) * this.config.levelDistance * E._depth < 10) {
                    return 
                }
                var O = C.getCtx();
                var A = O.measureText(E.name);
                if (E.id == this.viz.root) {
                    var M =- A.width / 2, K = 0, L = 0;
                    var z = 0
                } else {
                    var D = 5;
                    var z = G.levelDistance - D;
                    var J = E.pos.clone();
                    J.rho += D;
                    var B = J.getp(true);
                    var H = J.getc(true);
                    var M = H.x, K = H.y;
                    var F = Math.PI;
                    var I = (B.theta > F / 2 && B.theta < 3 * F / 2);
                    var L = I ? B.theta + F: B.theta;
                    if (I) {
                        M -= Math.abs(Math.cos(B.theta) * A.width);
                        K += Math.sin(B.theta) * A.width
                    } else {
                        if (E.id == this.viz.root) {
                            M -= A.width / 2
                        }
                    }
                }
                O.save();
                O.translate(M, K);
                O.rotate(L);
                O.fillText(E.name, 0, 0);
                O.restore()
            }
        });
        w.Label.SVG = new q({
            Implements: e.Label.SVG,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(N, C, E) {
                var J = C.pos.getc(true), M = this.viz, A = this.viz.canvas;
                var F = A.getSize();
                var B = {
                    x: Math.round(J.x + F.width / 2),
                    y: Math.round(J.y + F.height / 2)
                };
                N.setAttribute("x", B.x);
                N.setAttribute("y", B.y);
                var G = N.getBBox();
                if (G) {
                    var L = N.getAttribute("x");
                    var I = N.getAttribute("y");
                    var z = C.pos.getp(true);
                    var D = Math.PI;
                    var H = (z.theta > D / 2 && z.theta < 3 * D / 2);
                    if (H) {
                        N.setAttribute("x", L - G.width);
                        N.setAttribute("y", I - G.height)
                    } else {
                        if (C.id == M.root) {
                            N.setAttribute("x", L - G.width / 2)
                        }
                    }
                    var K = H ? z.theta + D: z.theta;
                    if (C._depth) {
                        N.setAttribute("transform", "rotate(" + K * 360 / (2 * D) + " " + L + " " + I + ")")
                    }
                }
                E.onPlaceLabel(N, C)
            }
        });
        w.Label.HTML = new q({
            Implements: e.Label.HTML,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(G, A, C) {
                var E = A.pos.clone(), y = this.viz.canvas, F = A.getData("height"), B = ((F || A._depth == 0) ? F : this.viz.config.levelDistance) / 2, D = y.getSize();
                E.rho += B;
                E = E.getc(true);
                var z = {
                    x: Math.round(E.x + D.width / 2),
                    y: Math.round(E.y + D.height / 2)
                };
                var x = G.style;
                x.left = z.x + "px";
                x.top = z.y + "px";
                x.display = this.fitsInCanvas(z, y) ? "" : "none";
                C.onPlaceLabel(G, A)
            }
        });
        w.Plot.NodeTypes = new q({
            none: {
                render: c.empty,
                contains: c.lambda(false),
                anglecontains: function(B, D) {
                    var A = B.getData("span") / 2, y = B.pos.theta;
                    var z = y - A, x = y + A;
                    if (z < 0) {
                        z += Math.PI * 2
                    }
                    var C = Math.atan2(D.y, D.x);
                    if (C < 0) {
                        C += Math.PI * 2
                    }
                    if (z > x) {
                        return (C > z && C <= Math.PI * 2) || C < x
                    } else {
                        return C > z && C < x
                    }
                }
            },
            pie: {
                render: function(C, A) {
                    var G = C.getData("span") / 2, z = C.pos.theta;
                    var B = z - G, D = z + G;
                    var F = C.pos.getp(true);
                    var x = new b(F.rho, B);
                    var y = x.getc(true);
                    x.theta = D;
                    var E = x.getc(true);
                    var H = A.getCtx();
                    H.beginPath();
                    H.moveTo(0, 0);
                    H.lineTo(y.x, y.y);
                    H.moveTo(0, 0);
                    H.lineTo(E.x, E.y);
                    H.moveTo(0, 0);
                    H.arc(0, 0, F.rho * C.getData("dim-quotient"), B, D, false);
                    H.fill()
                },
                contains: function(z, B) {
                    if (this.nodeTypes.none.anglecontains.call(this, z, B)) {
                        var x = Math.sqrt(B.x * B.x + B.y * B.y);
                        var y = this.config.levelDistance, A = z._depth;
                        return (x <= y * A)
                    }
                    return false
                }
            },
            multipie: {
                render: function(D, B) {
                    var K = D.getData("height");
                    var E = K ? K: this.config.levelDistance;
                    var J = D.getData("span") / 2, A = D.pos.theta;
                    var C = A - J, G = A + J;
                    var I = D.pos.getp(true);
                    var y = new b(I.rho, C);
                    var z = y.getc(true);
                    y.theta = G;
                    var H = y.getc(true);
                    y.rho += E;
                    var x = y.getc(true);
                    y.theta = C;
                    var F = y.getc(true);
                    var L = B.getCtx();
                    L.moveTo(0, 0);
                    L.beginPath();
                    L.arc(0, 0, I.rho, C, G, false);
                    L.arc(0, 0, I.rho + E, G, C, true);
                    L.moveTo(z.x, z.y);
                    L.lineTo(F.x, F.y);
                    L.moveTo(H.x, H.y);
                    L.lineTo(x.x, x.y);
                    L.fill();
                    if (D.collapsed) {
                        L.save();
                        L.lineWidth = 2;
                        L.moveTo(0, 0);
                        L.beginPath();
                        L.arc(0, 0, I.rho + E + 5, G-0.01, C + 0.01, true);
                        L.stroke();
                        L.restore()
                    }
                },
                contains: function(A, D) {
                    if (this.nodeTypes.none.anglecontains.call(this, A, D)) {
                        var y = Math.sqrt(D.x * D.x + D.y * D.y);
                        var x = A.getData("height");
                        var B = x ? x: this.config.levelDistance;
                        var z = this.config.levelDistance, C = A._depth;
                        return (y >= z * C) && (y <= (z * C + B))
                    }
                    return false
                }
            },
            "gradient-multipie": {
                render: function(A, x) {
                    var F = x.getCtx();
                    var E = A.getData("height");
                    var B = E ? E: this.config.levelDistance;
                    var y = F.createRadialGradient(0, 0, A.getPos().rho, 0, 0, A.getPos().rho + B);
                    var D = c.hexToRgb(A.getData("color")), C = [];
                    c.each(D, function(G) {
                        C.push(parseInt(G * 0.5, 10))
                    });
                    var z = c.rgbToHex(C);
                    y.addColorStop(0, z);
                    y.addColorStop(1, A.getData("color"));
                    F.fillStyle = y;
                    this.nodeTypes.multipie.render.call(this, A, x)
                },
                contains: function(x, y) {
                    return this.nodeTypes.multipie.contains.call(this, x, y)
                }
            },
            "gradient-pie": {
                render: function(C, z) {
                    var x = z.getCtx();
                    var D = x.createRadialGradient(0, 0, 0, 0, 0, C.getPos().rho);
                    var B = c.hexToRgb(C.getData("color")), y = [];
                    c.each(B, function(E) {
                        y.push(parseInt(E * 0.5, 10))
                    });
                    var A = c.rgbToHex(y);
                    D.addColorStop(1, A);
                    D.addColorStop(0, C.getData("color"));
                    x.fillStyle = D;
                    this.nodeTypes.pie.render.call(this, C, z)
                },
                contains: function(x, y) {
                    return this.nodeTypes.pie.contains.call(this, x, y)
                }
            }
        });
        w.Plot.EdgeTypes = new q({
            none: c.empty,
            line: {
                render: function(x, y) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true);
                    this.edgeHelper.line.render(A, z, y)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.line.contains(z, y, A, this.edge.epsilon)
                }
            },
            arrow: {
                render: function(y, z) {
                    var D = y.nodeFrom.pos.getc(true), C = y.nodeTo.pos.getc(true), B = y.getData("dim"), A = y.data.$direction, x = (A && A.length > 1 && A[0] != y.nodeFrom.id);
                    this.edgeHelper.arrow.render(D, C, B, x, z)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.arrow.contains(z, y, A, this.edge.epsilon)
                }
            },
            hyperline: {
                render: function(x, y) {
                    var B = x.nodeFrom.pos.getc(), A = x.nodeTo.pos.getc(), z = Math.max(B.norm(), A.norm());
                    this.edgeHelper.hyperline.render(B.$scale(1 / z), A.$scale(1 / z), z, y)
                },
                contains: c.lambda(false)
            }
        })
    })($jit.Sunburst);
    $jit.Sunburst.Plot.NodeTypes.implement({
        "piechart-stacked": {
            render: function(U, A) {
                var T = U.pos.getp(true), C = U.getData("dimArray"), S = U.getData("valueArray"), G = U.getData("colorArray"), z = G.length, M = U.getData("stringArray"), P = U.getData("span") / 2, K = U.pos.theta, F = K - P, J = K + P, R = new b;
                var N = A.getCtx(), L = {}, I = U.getData("gradient"), D = U.getData("border"), Z = U.getData("config"), ai = Z.showLabels, Y = Z.resizeLabels, ab = Z.Label;
                var ae = Z.sliceOffset * Math.cos((F + J) / 2);
                var E = Z.sliceOffset * Math.sin((F + J) / 2);
                if (G && C && M) {
                    for (var af = 0, ac = C.length, w = 0, X = 0; af < ac; af++) {
                        var B = C[af], ag = G[af%z];
                        if (B <= 0) {
                            continue
                        }
                        N.fillStyle = N.strokeStyle = ag;
                        if (I && B) {
                            var ad = N.createRadialGradient(ae, E, w + Z.sliceOffset, ae, E, w + B + Z.sliceOffset);
                            var x = c.hexToRgb(ag), W = c.map(x, function(al) {
                                return (al * 0.8)>>0
                            }), y = c.rgbToHex(W);
                            ad.addColorStop(0, ag);
                            ad.addColorStop(0.5, ag);
                            ad.addColorStop(1, y);
                            N.fillStyle = ad
                        }
                        R.rho = w + Z.sliceOffset;
                        R.theta = F;
                        var ah = R.getc(true);
                        R.theta = J;
                        var O = R.getc(true);
                        R.rho += B;
                        var aj = R.getc(true);
                        R.theta = F;
                        var Q = R.getc(true);
                        N.beginPath();
                        N.arc(ae, E, w + 0.01, F, J, false);
                        N.arc(ae, E, w + B + 0.01, J, F, true);
                        N.fill();
                        if (D && D.name == M[af]) {
                            L.acum = w;
                            L.dimValue = C[af];
                            L.begin = F;
                            L.end = J
                        }
                        w += (B || 0);
                        X += (S[af] || 0)
                    }
                    if (D) {
                        N.save();
                        N.globalCompositeOperation = "source-over";
                        N.lineWidth = 2;
                        N.strokeStyle = D.color;
                        var aa = F < J ? 1: -1;
                        N.beginPath();
                        N.arc(ae, E, L.acum + 0.01 + 1, L.begin, L.end, false);
                        N.arc(ae, E, L.acum + L.dimValue + 0.01-1, L.end, L.begin, true);
                        N.closePath();
                        N.stroke();
                        N.restore()
                    }
                    if (ai && ab.type == "Native") {
                        N.save();
                        N.fillStyle = N.strokeStyle = ab.color;
                        var V = Y ? U.getData("normalizedDim"): 1, H = (ab.size * V)>>0;
                        H = H<+Y?+Y : H;
                        N.font = ab.style + " " + H + "px " + ab.family;
                        N.textBaseline = "middle";
                        N.textAlign = "center";
                        R.rho = w + Z.labelOffset + Z.sliceOffset;
                        R.theta = U.pos.theta;
                        var ak = R.getc(true);
                        N.fillText(U.name, ak.x, ak.y);
                        N.restore()
                    }
                }
            },
            contains: function(z, D) {
                if (this.nodeTypes.none.anglecontains.call(this, z, D)) {
                    var F = Math.sqrt(D.x * D.x + D.y * D.y);
                    var w = this.config.levelDistance, C = z._depth;
                    var x = z.getData("config");
                    if (F <= w * C + x.sliceOffset) {
                        var G = z.getData("dimArray");
                        for (var B = 0, A = G.length, E = x.sliceOffset; B < A; B++) {
                            var y = G[B];
                            if (F >= E && F <= E + y) {
                                return {
                                    name: z.getData("stringArray")[B],
                                    color: z.getData("colorArray")[B],
                                    value: z.getData("valueArray")[B],
                                    label: z.name
                                }
                            }
                            E += y
                        }
                    }
                    return false
                }
                return false
            }
        }
    });
    $jit.PieChart = new q({
        sb: null,
        colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
        selected: {},
        busy: false,
        initialize: function(w) {
            this.controller = this.config = c.merge(n("Canvas", "PieChart", "Label"), {
                Label: {
                    type: "Native"
                }
            }, w);
            this.initializeViz()
        },
        initializeViz: function() {
            var x = this.config, B = this;
            var w = x.type.split(":")[0];
            var A = new $jit.Sunburst({
                injectInto: x.injectInto,
                width: x.width,
                height: x.height,
                useCanvas: x.useCanvas,
                withLabels: x.Label.type != "Native",
                Label: {
                    type: x.Label.type
                },
                Node: {
                    overridable: true,
                    type: "piechart-" + w,
                    width: 1,
                    height: 1
                },
                Edge: {
                    type: "none"
                },
                Tips: {
                    enable: x.Tips.enable,
                    type: "Native",
                    force: true,
                    onShow: function(F, E, C) {
                        var D = C;
                        x.Tips.onShow(F, D, E)
                    }
                },
                Events: {
                    enable: true,
                    type: "Native",
                    onClick: function(E, F, C) {
                        if (!x.Events.enable) {
                            return 
                        }
                        var D = F.getContains();
                        x.Events.onClick(D, F, C)
                    },
                    onMouseMove: function(E, F, C) {
                        if (!x.hoveredColor) {
                            return 
                        }
                        if (E) {
                            var D = F.getContains();
                            B.select(E.id, D.name, D.index)
                        } else {
                            B.select(false, false, false)
                        }
                    }
                },
                onCreateLabel: function(F, E) {
                    var C = x.Label;
                    if (x.showLabels) {
                        var D = F.style;
                        D.fontSize = C.size + "px";
                        D.fontFamily = C.family;
                        D.color = C.color;
                        D.textAlign = "center";
                        F.innerHTML = E.name
                    }
                },
                onPlaceLabel: function(S, M) {
                    if (!x.showLabels) {
                        return 
                    }
                    var G = M.pos.getp(true), J = M.getData("dimArray"), P = M.getData("span") / 2, H = M.pos.theta, R = H - P, D = H + P, U = new b;
                    var L = x.showLabels, F = x.resizeLabels, I = x.Label;
                    if (J) {
                        for (var Q = 0, N = J.length, O = 0; Q < N; Q++) {
                            O += J[Q]
                        }
                        var T = F ? M.getData("normalizedDim"): 1, C = (I.size * T)>>0;
                        C = C<+F?+F : C;
                        S.style.fontSize = C + "px";
                        U.rho = O + x.labelOffset + x.sliceOffset;
                        U.theta = (R + D) / 2;
                        var G = U.getc(true);
                        var E = B.canvas.getSize();
                        var K = {
                            x: Math.round(G.x + E.width / 2),
                            y: Math.round(G.y + E.height / 2)
                        };
                        S.style.left = K.x + "px";
                        S.style.top = K.y + "px"
                    }
                }
            });
            var z = A.canvas.getSize(), y = Math.min;
            A.config.levelDistance = y(z.width, z.height) / 2 - x.offset - x.sliceOffset;
            this.delegate = A;
            this.canvas = this.delegate.canvas;
            this.canvas.getCtx().globalCompositeOperation = "lighter"
        },
        loadJSON: function(K) {
            var H = c.time(), B = [], J = this.delegate, N = c.splat(K.label), D = N.length, G = c.splat(K.color || this.colors), y = G.length, L = this.config, w=!!L.type.split(":")[1], z = L.animate, F = D == 1;
            for (var I = 0, x = K.values, E = x.length; I < E; I++) {
                var M = x[I];
                var A = c.splat(M.values);
                B.push({
                    id: H + M.label,
                    name: M.label,
                    data: {
                        value: A,
                        "$valueArray": A,
                        "$colorArray": F ? c.splat(G[I%y]): G,
                        "$stringArray": N,
                        "$gradient": w,
                        "$config": L,
                        "$angularWidth": c.reduce(A, function(O, P) {
                            return O + P
                        })
                    },
                    children: []
                })
            }
            var C = {
                id: H + "$root",
                name: "",
                data: {
                    "$type": "none",
                    "$width": 1,
                    "$height": 1
                },
                children: B
            };
            J.loadJSON(C);
            this.normalizeDims();
            J.refresh();
            if (z) {
                J.fx.animate({
                    modes: ["node-property:dimArray"],
                    duration: 1500
                })
            }
        },
        updateJSON: function(y, C) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var z = this.delegate;
            var B = z.graph;
            var x = y.values;
            var w = this.config.animate;
            var A = this;
            c.each(x, function(D) {
                var F = B.getByName(D.label), E = c.splat(D.values);
                if (F) {
                    F.setData("valueArray", E);
                    F.setData("angularWidth", c.reduce(E, function(G, H) {
                        return G + H
                    }));
                    if (y.label) {
                        F.setData("stringArray", c.splat(y.label))
                    }
                }
            });
            this.normalizeDims();
            if (w) {
                z.compute("end");
                z.fx.animate({
                    modes: ["node-property:dimArray:span", "linear"],
                    duration: 1500,
                    onComplete: function() {
                        A.busy = false;
                        C && C.onComplete()
                    }
                })
            } else {
                z.refresh()
            }
        },
        select: function(y, w) {
            if (!this.config.hoveredColor) {
                return 
            }
            var x = this.selected;
            if (x.id != y || x.name != w) {
                x.id = y;
                x.name = w;
                x.color = this.config.hoveredColor;
                this.delegate.graph.eachNode(function(z) {
                    if (y == z.id) {
                        z.setData("border", x)
                    } else {
                        z.setData("border", false)
                    }
                });
                this.delegate.plot()
            }
        },
        getLegend: function() {
            var y = {};
            var z;
            this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(A) {
                z = A.nodeTo
            });
            var x = z.getData("colorArray"), w = x.length;
            c.each(z.getData("stringArray"), function(B, A) {
                y[B] = x[A%w]
            });
            return y
        },
        getMaxValue: function() {
            var w = 0;
            this.delegate.graph.eachNode(function(z) {
                var x = z.getData("valueArray"), y = 0;
                c.each(x, function(A) {
                    y+=+A
                });
                w = w > y ? w : y
            });
            return w
        },
        normalizeDims: function() {
            var x = this.delegate.graph.getNode(this.delegate.root), w = 0;
            x.eachAdjacency(function() {
                w++
            });
            var B = this.getMaxValue() || 1, A = this.config, y = A.animate, z = this.delegate.config.levelDistance;
            this.delegate.graph.eachNode(function(G) {
                var F = 0, C = [];
                c.each(G.getData("valueArray"), function(H) {
                    F+=+H;
                    C.push(1)
                });
                var E = (C.length == 1)&&!A.updateHeights;
                if (y) {
                    G.setData("dimArray", c.map(G.getData("valueArray"), function(H) {
                        return E ? z : (H * z / B)
                    }), "end");
                    var D = G.getData("dimArray");
                    if (!D) {
                        G.setData("dimArray", C)
                    }
                } else {
                    G.setData("dimArray", c.map(G.getData("valueArray"), function(H) {
                        return E ? z : (H * z / B)
                    }))
                }
                G.setData("normalizedDim", F / B)
            })
        }
    });
    g.TM = {};
    g.TM.SliceAndDice = new q({
        compute: function(B) {
            var x = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
            this.controller.onBeforeCompute(x);
            var z = this.canvas.getSize(), y = this.config, A = z.width, w = z.height;
            this.graph.computeLevels(this.root, 0, "ignore");
            x.getPos(B).setc( - A / 2, - w / 2);
            x.setData("width", A, B);
            x.setData("height", w + y.titleHeight, B);
            this.computePositions(x, x, this.layout.orientation, B);
            this.controller.onAfterCompute(x)
        },
        computePositions: function(F, D, P, y) {
            var M = 0;
            F.eachSubnode(function(R) {
                M += R.getData("area", y)
            });
            var Q = this.config, N = Q.offset, J = F.getData("width", y), H = Math.max(F.getData("height", y) - Q.titleHeight, 0), x = F == D ? 1: (D.getData("area", y) / M);
            var I, G, L, B, A, E, C;
            var O = (P == "h");
            if (O) {
                P = "v";
                I = H;
                G = J * x;
                L = "height";
                B = "y";
                A = "x";
                E = Q.titleHeight;
                C = 0
            } else {
                P = "h";
                I = H * x;
                G = J;
                L = "width";
                B = "x";
                A = "y";
                E = 0;
                C = Q.titleHeight
            }
            var w = D.getPos(y);
            D.setData("width", G, y);
            D.setData("height", I, y);
            var K = 0, z = this;
            D.eachSubnode(function(S) {
                var R = S.getPos(y);
                R[B] = K + w[B] + E;
                R[A] = w[A] + C;
                z.computePositions(D, S, P, y);
                K += S.getData(L, y)
            })
        }
    });
    g.TM.Area = {
        compute: function(w) {
            w = w || "current";
            var C = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
            this.controller.onBeforeCompute(C);
            var y = this.config, F = this.canvas.getSize(), x = F.width, E = F.height, D = y.offset, z = x - D, B = E - D;
            this.graph.computeLevels(this.root, 0, "ignore");
            C.getPos(w).setc( - x / 2, - E / 2);
            C.setData("width", x, w);
            C.setData("height", E, w);
            var A = {
                top: - E / 2 + y.titleHeight,
                left: - x / 2,
                width: z,
                height: B - y.titleHeight
            };
            this.computePositions(C, A, w);
            this.controller.onAfterCompute(C)
        },
        computeDim: function(B, C, E, A, z, x) {
            if (B.length + C.length == 1) {
                var y = (B.length == 1) ? B: C;
                this.layoutLast(y, E, A, x);
                return 
            }
            if (B.length >= 2 && C.length == 0) {
                C = [B.shift()]
            }
            if (B.length == 0) {
                if (C.length > 0) {
                    this.layoutRow(C, E, A, x)
                }
                return 
            }
            var D = B[0];
            if (z(C, E) >= z([D].concat(C), E)) {
                this.computeDim(B.slice(1), C.concat([D]), E, A, z, x)
            } else {
                var F = this.layoutRow(C, E, A, x);
                this.computeDim(B, [], F.dim, F, z, x)
            }
        },
        worstAspectRatio: function(x, F) {
            if (!x || x.length == 0) {
                return Number.MAX_VALUE
            }
            var y = 0, G = 0, B = Number.MAX_VALUE;
            for (var D = 0, C = x.length; D < C; D++) {
                var z = x[D]._area;
                y += z;
                B = B < z ? B : z;
                G = G > z ? G : z
            }
            var E = F * F, A = y * y;
            return Math.max(E * G / A, A / (E * B))
        },
        avgAspectRatio: function(B, y) {
            if (!B || B.length == 0) {
                return Number.MAX_VALUE
            }
            var D = 0;
            for (var z = 0, x = B.length; z < x; z++) {
                var C = B[z]._area;
                var A = C / y;
                D += y > A ? y / A : A / y
            }
            return D / x
        },
        layoutLast: function(y, x, B, A) {
            var z = y[0];
            z.getPos(A).setc(B.left, B.top);
            z.setData("width", B.width, A);
            z.setData("height", B.height, A)
        }
    };
    g.TM.Squarified = new q({
        Implements: g.TM.Area,
        computePositions: function(A, D, x) {
            var z = this.config, F = Math.max;
            if (D.width >= D.height) {
                this.layout.orientation = "h"
            } else {
                this.layout.orientation = "v"
            }
            var w = A.getSubnodes([1, 1], "ignore");
            if (w.length > 0) {
                this.processChildrenLayout(A, w, D, x);
                for (var C = 0, B = w.length; C < B; C++) {
                    var G = w[C], H = z.offset, I = F(G.getData("height", x) - H - z.titleHeight, 0), y = F(G.getData("width", x) - H, 0), E = G.getPos(x);
                    D = {
                        width: y,
                        height: I,
                        top: E.y + z.titleHeight,
                        left: E.x
                    };
                    this.computePositions(G, D, x)
                }
            }
        },
        processChildrenLayout: function(G, w, C, x) {
            var A = C.width * C.height;
            var B, y = w.length, D = 0, H = [];
            for (B = 0; B < y; B++) {
                H[B] = parseFloat(w[B].getData("area", x));
                D += H[B]
            }
            for (B = 0; B < y; B++) {
                w[B]._area = A * H[B] / D
            }
            var z = this.layout.horizontal() ? C.height: C.width;
            w.sort(function(J, I) {
                var K = I._area - J._area;
                return K ? K : (I.id == J.id ? 0 : (I.id < J.id ? 1 : -1))
            });
            var F = [w[0]];
            var E = w.slice(1);
            this.squarify(E, F, z, C, x)
        },
        squarify: function(y, B, x, A, z) {
            this.computeDim(y, B, x, A, this.worstAspectRatio, z)
        },
        layoutRow: function(y, x, A, z) {
            if (this.layout.horizontal()) {
                return this.layoutV(y, x, A, z)
            } else {
                return this.layoutH(y, x, A, z)
            }
        },
        layoutV: function(x, I, E, y) {
            var J = 0, A = function(w) {
                return w
            };
            c.each(x, function(w) {
                J += w._area
            });
            var z = A(J / I), F = 0;
            for (var C = 0, B = x.length; C < B; C++) {
                var D = A(x[C]._area / z);
                var G = x[C];
                G.getPos(y).setc(E.left, E.top + F);
                G.setData("width", z, y);
                G.setData("height", D, y);
                F += D
            }
            var H = {
                height: E.height,
                width: E.width - z,
                top: E.top,
                left: E.left + z
            };
            H.dim = Math.min(H.width, H.height);
            if (H.dim != H.height) {
                this.layout.change()
            }
            return H
        },
        layoutH: function(x, G, C, y) {
            var I = 0;
            c.each(x, function(w) {
                I += w._area
            });
            var H = I / G, D = C.top, z = 0;
            for (var B = 0, A = x.length; B < A; B++) {
                var E = x[B];
                var G = E._area / H;
                E.getPos(y).setc(C.left + z, D);
                E.setData("width", G, y);
                E.setData("height", H, y);
                z += G
            }
            var F = {
                height: C.height - H,
                width: C.width,
                top: C.top + H,
                left: C.left
            };
            F.dim = Math.min(F.width, F.height);
            if (F.dim != F.width) {
                this.layout.change()
            }
            return F
        }
    });
    g.TM.Strip = new q({
        Implements: g.TM.Area,
        computePositions: function(A, D, x) {
            var w = A.getSubnodes([1, 1], "ignore"), z = this.config, F = Math.max;
            if (w.length > 0) {
                this.processChildrenLayout(A, w, D, x);
                for (var C = 0, B = w.length; C < B; C++) {
                    var G = w[C];
                    var H = z.offset, I = F(G.getData("height", x) - H - z.titleHeight, 0), y = F(G.getData("width", x) - H, 0);
                    var E = G.getPos(x);
                    D = {
                        width: y,
                        height: I,
                        top: E.y + z.titleHeight,
                        left: E.x
                    };
                    this.computePositions(G, D, x)
                }
            }
        },
        processChildrenLayout: function(G, w, B, x) {
            var z = B.width * B.height;
            var A, y = w.length, C = 0, H = [];
            for (A = 0; A < y; A++) {
                H[A] =+ w[A].getData("area", x);
                C += H[A]
            }
            for (A = 0; A < y; A++) {
                w[A]._area = z * H[A] / C
            }
            var F = this.layout.horizontal() ? B.width: B.height;
            var E = [w[0]];
            var D = w.slice(1);
            this.stripify(D, E, F, B, x)
        },
        stripify: function(y, B, x, A, z) {
            this.computeDim(y, B, x, A, this.avgAspectRatio, z)
        },
        layoutRow: function(y, x, A, z) {
            if (this.layout.horizontal()) {
                return this.layoutH(y, x, A, z)
            } else {
                return this.layoutV(y, x, A, z)
            }
        },
        layoutV: function(x, G, D, y) {
            var H = 0;
            c.each(x, function(w) {
                H += w._area
            });
            var z = H / G, E = 0;
            for (var B = 0, A = x.length; B < A; B++) {
                var F = x[B];
                var C = F._area / z;
                F.getPos(y).setc(D.left, D.top + (G - C - E));
                F.setData("width", z, y);
                F.setData("height", C, y);
                E += C
            }
            return {
                height: D.height,
                width: D.width - z,
                top: D.top,
                left: D.left + z,
                dim: G
            }
        },
        layoutH: function(x, F, C, y) {
            var H = 0;
            c.each(x, function(w) {
                H += w._area
            });
            var G = H / F, D = C.height - G, z = 0;
            for (var B = 0, A = x.length; B < A; B++) {
                var E = x[B];
                var I = E._area / G;
                E.getPos(y).setc(C.left + z, C.top + D);
                E.setData("width", I, y);
                E.setData("height", G, y);
                z += I
            }
            return {
                height: C.height - G,
                width: C.width,
                top: C.top,
                left: C.left,
                dim: F
            }
        }
    });
    g.Icicle = new q({
        compute: function(E) {
            E = E || "current";
            var D = this.graph.getNode(this.root), z = this.config, H = this.canvas.getSize(), w = H.width, G = H.height, A = z.offset, C = z.constrained ? z.levelsToShow: Number.MAX_VALUE;
            this.controller.onBeforeCompute(D);
            e.Util.computeLevels(this.graph, D.id, 0, "ignore");
            var F = 0;
            e.Util.eachLevel(D, 0, false, function(J, I) {
                if (I > F) {
                    F = I
                }
            });
            var y = this.graph.getNode(this.clickedNode && this.clickedNode.id || D.id);
            var x = Math.min(F, C-1);
            var B = y._depth;
            if (this.layout.horizontal()) {
                this.computeSubtree(y, - w / 2, - G / 2, w / (x + 1), G, B, x, E)
            } else {
                this.computeSubtree(y, - w / 2, - G / 2, w, G / (x + 1), B, x, E)
            }
        },
        computeSubtree: function(G, I, F, w, L, E, A, H) {
            G.getPos(H).setc(I, F);
            G.setData("width", w, H);
            G.setData("height", L, H);
            var C, K = 0, J = 0;
            var z = e.Util.getSubnodes(G, [1, 1], "ignore");
            if (!z.length) {
                return 
            }
            c.each(z, function(x) {
                J += x.getData("dim")
            });
            for (var D = 0, B = z.length; D < B; D++) {
                if (this.layout.horizontal()) {
                    C = L * z[D].getData("dim") / J;
                    this.computeSubtree(z[D], I + w, F, w, C, E, A, H);
                    F += C
                } else {
                    C = w * z[D].getData("dim") / J;
                    this.computeSubtree(z[D], I, F + L, C, L, E, A, H);
                    I += C
                }
            }
        }
    });
    $jit.Icicle = new q({
        Implements: [d, o, g.Icicle],
        layout: {
            orientation: "h",
            vertical: function() {
                return this.orientation == "v"
            },
            horizontal: function() {
                return this.orientation == "h"
            },
            change: function() {
                this.orientation = this.vertical() ? "h" : "v"
            }
        },
        initialize: function(w) {
            var x = {
                animate: false,
                orientation: "h",
                offset: 2,
                levelsToShow: Number.MAX_VALUE,
                constrained: false,
                Node: {
                    type: "rectangle",
                    overridable: true
                },
                Edge: {
                    type: "none"
                },
                Label: {
                    type: "Native"
                },
                duration: 700,
                fps: 45
            };
            var z = n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label");
            this.controller = this.config = c.merge(z, x, w);
            this.layout.orientation = this.config.orientation;
            var y = this.config;
            if (y.useCanvas) {
                this.canvas = y.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                this.canvas = new l(this, y);
                this.config.labelContainer = (typeof y.injectInto == "string" ? y.injectInto : y.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: p,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge, this.config.Label);
            this.labels = new $jit.Icicle.Label[this.config.Label.type](this);
            this.fx = new $jit.Icicle.Plot(this, $jit.Icicle);
            this.op = new $jit.Icicle.Op(this);
            this.group = new $jit.Icicle.Group(this);
            this.clickedNode = null;
            this.initializeExtras()
        },
        refresh: function() {
            var w = this.config.Label.type;
            if (w != "Native") {
                var x = this;
                this.graph.eachNode(function(y) {
                    x.labels.hideLabel(y, false)
                })
            }
            this.compute();
            this.plot()
        },
        plot: function() {
            this.fx.plot(this.config)
        },
        enter: function(y) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var x = this, w = this.config;
            var z = {
                onComplete: function() {
                    if (w.request) {
                        x.compute()
                    }
                    if (w.animate) {
                        x.graph.nodeList.setDataset(["current", "end"], {
                            alpha: [1, 0]
                        });
                        e.Util.eachSubgraph(y, function(A) {
                            A.setData("alpha", 1, "end")
                        }, "ignore");
                        x.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                x.clickedNode = y;
                                x.compute("end");
                                x.fx.animate({
                                    modes: ["linear", "node-property:width:height"],
                                    duration: 1000,
                                    onComplete: function() {
                                        x.busy = false;
                                        x.clickedNode = y
                                    }
                                })
                            }
                        })
                    } else {
                        x.clickedNode = y;
                        x.busy = false;
                        x.refresh()
                    }
                }
            };
            if (w.request) {
                this.requestNodes(clickedNode, z)
            } else {
                z.onComplete()
            }
        },
        out: function() {
            if (this.busy) {
                return 
            }
            var B = this, A = e.Util, y = this.config, D = this.graph, x = A.getParents(D.getNode(this.clickedNode && this.clickedNode.id || this.root)), z = x[0], w = z, C = this.clickedNode;
            this.busy = true;
            this.events.hoveredNode = false;
            if (!z) {
                this.busy = false;
                return 
            }
            callback = {
                onComplete: function() {
                    B.clickedNode = z;
                    if (y.request) {
                        B.requestNodes(z, {
                            onComplete: function() {
                                B.compute();
                                B.plot();
                                B.busy = false
                            }
                        })
                    } else {
                        B.compute();
                        B.plot();
                        B.busy = false
                    }
                }
            };
            if (y.animate) {
                this.clickedNode = w;
                this.compute("end");
                this.clickedNode = C;
                this.fx.animate({
                    modes: ["linear", "node-property:width:height"],
                    duration: 1000,
                    onComplete: function() {
                        B.clickedNode = w;
                        D.nodeList.setDataset(["current", "end"], {
                            alpha: [0, 1]
                        });
                        A.eachSubgraph(C, function(E) {
                            E.setData("alpha", 1)
                        }, "ignore");
                        B.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                callback.onComplete()
                            }
                        })
                    }
                })
            } else {
                callback.onComplete()
            }
        },
        requestNodes: function(y, z) {
            var x = c.merge(this.controller, z), w = this.config.constrained ? this.config.levelsToShow: Number.MAX_VALUE;
            if (x.request) {
                var B = [], A = y._depth;
                e.Util.eachLevel(y, 0, w, function(C) {
                    if (C.drawn&&!e.Util.anySubnode(C)) {
                        B.push(C);
                        C._level = C._depth - A;
                        if (this.config.constrained) {
                            C._level = w - C._level
                        }
                    }
                });
                this.group.requestNodes(B, x)
            } else {
                x.onComplete()
            }
        }
    });
    $jit.Icicle.Op = new q({
        Implements: e.Op
    });
    $jit.Icicle.Group = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config
        },
        requestNodes: function(B, A) {
            var z = 0, x = B.length, D = {};
            var y = function() {
                A.onComplete()
            };
            var w = this.viz;
            if (x == 0) {
                y()
            }
            for (var C = 0; C < x; C++) {
                D[B[C].id] = B[C];
                A.request(B[C].id, B[C]._level, {
                    onComplete: function(F, E) {
                        if (E && E.children) {
                            E.id = F;
                            w.op.sum(E, {
                                type: "nothing"
                            })
                        }
                        if (++z == x) {
                            e.Util.computeLevels(w.graph, w.root, 0);
                            y()
                        }
                    }
                })
            }
        }
    });
    $jit.Icicle.Plot = new q({
        Implements: e.Plot,
        plot: function(A, y) {
            A = A || this.viz.controller;
            var w = this.viz, B = w.graph, x = B.getNode(w.clickedNode && w.clickedNode.id || w.root), z = x._depth;
            w.canvas.clear();
            this.plotTree(x, c.merge(A, {
                withLabels: true,
                hideLabels: false,
                plotSubtree: function(C, D) {
                    return !w.config.constrained || (D._depth - z < w.config.levelsToShow)
                }
            }), y)
        }
    });
    $jit.Icicle.Label = {};
    $jit.Icicle.Label.Native = new q({
        Implements: e.Label.Native,
        renderLabel: function(x, y, A) {
            var D = x.getCtx(), w = y.getData("width"), C = y.getData("height"), E = y.getLabelData("size"), z = D.measureText(y.name);
            if (C < (E * 1.5) || w < z.width) {
                return 
            }
            var B = y.pos.getc(true);
            D.fillText(y.name, B.x + w / 2, B.y + C / 2)
        }
    });
    $jit.Icicle.Label.SVG = new q({
        Implements: e.Label.SVG,
        initialize: function(w) {
            this.viz = w
        },
        placeLabel: function(x, A, y) {
            var C = A.pos.getc(true), z = this.viz.canvas;
            var w = z.getSize();
            var B = {
                x: Math.round(C.x + w.width / 2),
                y: Math.round(C.y + w.height / 2)
            };
            x.setAttribute("x", B.x);
            x.setAttribute("y", B.y);
            y.onPlaceLabel(x, A)
        }
    });
    $jit.Icicle.Label.HTML = new q({
        Implements: e.Label.HTML,
        initialize: function(w) {
            this.viz = w
        },
        placeLabel: function(x, B, y) {
            var D = B.pos.getc(true), z = this.viz.canvas;
            var w = z.getSize();
            var C = {
                x: Math.round(D.x + w.width / 2),
                y: Math.round(D.y + w.height / 2)
            };
            var A = x.style;
            A.left = C.x + "px";
            A.top = C.y + "px";
            A.display = "";
            y.onPlaceLabel(x, B)
        }
    });
    $jit.Icicle.Plot.NodeTypes = new q({
        none: {
            render: c.empty
        },
        rectangle: {
            render: function(z, x, K) {
                var y = this.viz.config;
                var C = y.offset;
                var w = z.getData("width");
                var H = z.getData("height");
                var B = z.getData("border");
                var G = z.pos.getc(true);
                var F = G.x + C / 2, D = G.y + C / 2;
                var J = x.getCtx();
                if (w - C < 2 || H - C < 2) {
                    return 
                }
                if (y.cushion) {
                    var A = z.getData("color");
                    var I = J.createRadialGradient(F + (w - C) / 2, D + (H - C) / 2, 1, F + (w - C) / 2, D + (H - C) / 2, w < H ? H : w);
                    var E = c.rgbToHex(c.map(c.hexToRgb(A), function(L) {
                        return L * 0.3>>0
                    }));
                    I.addColorStop(0, A);
                    I.addColorStop(1, E);
                    J.fillStyle = I
                }
                if (B) {
                    J.strokeStyle = B;
                    J.lineWidth = 3
                }
                J.fillRect(F, D, Math.max(0, w - C), Math.max(0, H - C));
                B && J.strokeRect(G.x, G.y, w, H)
            },
            contains: function(y, A) {
                if (this.viz.clickedNode&&!$jit.Graph.Util.isDescendantOf(y, this.viz.clickedNode.id)) {
                    return false
                }
                var z = y.pos.getc(true), x = y.getData("width"), w = y.getData("height");
                return this.nodeHelper.rectangle.contains({
                    x: z.x + x / 2,
                    y: z.y + w / 2
                }, A, x, w)
            }
        }
    });
    $jit.Icicle.Plot.EdgeTypes = new q({
        none: c.empty
    });
    g.ForceDirected = new q({
        getOptions: function(D) {
            var B = this.canvas.getSize();
            var y = B.width, A = B.height;
            var C = 0;
            this.graph.eachNode(function(w) {
                C++
            });
            var E = y * A / C, z = Math.sqrt(E);
            var x = this.config.levelDistance;
            return {
                width: y,
                height: A,
                tstart: y * 0.1,
                nodef: function(w) {
                    return E / (w || 1)
                },
                edgef: function(w) {
                    return z * (w - x)
                }
            }
        },
        compute: function(x, y) {
            var z = c.splat(x || ["current", "start", "end"]);
            var w = this.getOptions();
            f.compute(this.graph, z, this.config);
            this.graph.computeLevels(this.root, 0, "ignore");
            this.graph.eachNode(function(A) {
                c.each(z, function(B) {
                    var C = A.getPos(B);
                    if (C.equals(p.KER)) {
                        C.x = w.width / 5 * (Math.random()-0.5);
                        C.y = w.height / 5 * (Math.random()-0.5)
                    }
                    A.disp = {};
                    c.each(z, function(D) {
                        A.disp[D] = r(0, 0)
                    })
                })
            });
            this.computePositions(z, w, y)
        },
        computePositions: function(A, y, B) {
            var C = this.config.iterations, x = 0, z = this;
            if (B) {
                (function w() {
                    for (var E = B.iter, D = 0; D < E; D++) {
                        y.t = y.tstart;
                        if (C) {
                            y.t*=(1 - x++ / (C-1))
                        }
                        z.computePositionStep(A, y);
                        if (C && x >= C) {
                            B.onComplete();
                            return 
                        }
                    }
                    B.onStep(Math.round(x / (C-1) * 100));
                    setTimeout(w, 1)
                })()
            } else {
                for (; x < C; x++) {
                    y.t = y.tstart * (1 - x / (C-1));
                    this.computePositionStep(A, y)
                }
            }
        },
        computePositionStep: function(D, w) {
            var E = this.graph;
            var y = Math.min, C = Math.max;
            var B = r(0, 0);
            E.eachNode(function(G) {
                c.each(D, function(H) {
                    G.disp[H].x = 0;
                    G.disp[H].y = 0
                });
                E.eachNode(function(H) {
                    if (H.id != G.id) {
                        c.each(D, function(L) {
                            var J = G.getPos(L), I = H.getPos(L);
                            B.x = J.x - I.x;
                            B.y = J.y - I.y;
                            var K = B.norm() || 1;
                            G.disp[L].$add(B.$scale(w.nodef(K) / K))
                        })
                    }
                })
            });
            var x=!!E.getNode(this.root).visited;
            E.eachNode(function(G) {
                G.eachAdjacency(function(H) {
                    var I = H.nodeTo;
                    if (!!I.visited === x) {
                        c.each(D, function(M) {
                            var K = G.getPos(M), J = I.getPos(M);
                            B.x = K.x - J.x;
                            B.y = K.y - J.y;
                            var L = B.norm() || 1;
                            G.disp[M].$add(B.$scale( - w.edgef(L) / L));
                            I.disp[M].$add(B.$scale(-1))
                        })
                    }
                });
                G.visited=!x
            });
            var F = w.t, z = w.width / 2, A = w.height / 2;
            E.eachNode(function(G) {
                c.each(D, function(J) {
                    var H = G.disp[J];
                    var I = H.norm() || 1;
                    var J = G.getPos(J);
                    J.$add(r(H.x * y(Math.abs(H.x), F) / I, H.y * y(Math.abs(H.y), F) / I));
                    J.x = y(z, C( - z, J.x));
                    J.y = y(A, C( - A, J.y))
                })
            })
        }
    });
    $jit.ForceDirected = new q({
        Implements: [d, o, g.ForceDirected],
        initialize: function(x) {
            var w = $jit.ForceDirected;
            var y = {
                iterations: 50,
                levelDistance: 50
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), y, x);
            var z = this.config;
            if (z.useCanvas) {
                this.canvas = z.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (z.background) {
                    z.background = c.merge({
                        type: "Circles"
                    }, z.background)
                }
                this.canvas = new l(this, z);
                this.config.labelContainer = (typeof z.injectInto == "string" ? z.injectInto : z.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: p,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new w.Label[z.Label.type](this);
            this.fx = new w.Plot(this, w);
            this.op = new w.Op(this);
            this.json = null;
            this.busy = false;
            this.initializeExtras()
        },
        refresh: function() {
            this.compute();
            this.plot()
        },
        reposition: function() {
            this.compute("end")
        },
        computeIncremental: function(w) {
            w = c.merge({
                iter: 20,
                property: "end",
                onStep: c.empty,
                onComplete: c.empty
            }, w || {});
            this.config.onBeforeCompute(this.graph.getNode(this.root));
            this.compute(w.property, w)
        },
        plot: function() {
            this.fx.plot()
        },
        animate: function(w) {
            this.fx.animate(c.merge({
                modes: ["linear"]
            }, w || {}))
        }
    });
    $jit.ForceDirected.$extend = true;
    (function(w) {
        w.Op = new q({
            Implements: e.Op
        });
        w.Plot = new q({
            Implements: e.Plot
        });
        w.Label = {};
        w.Label.Native = new q({
            Implements: e.Label.Native
        });
        w.Label.SVG = new q({
            Implements: e.Label.SVG,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(H, B, C) {
                var F = B.pos.getc(true), y = this.viz.canvas, z = y.translateOffsetX, x = y.translateOffsetY, G = y.scaleOffsetX, E = y.scaleOffsetY, D = y.getSize();
                var A = {
                    x: Math.round(F.x * G + z + D.width / 2),
                    y: Math.round(F.y * E + x + D.height / 2)
                };
                H.setAttribute("x", A.x);
                H.setAttribute("y", A.y);
                C.onPlaceLabel(H, B)
            }
        });
        w.Label.HTML = new q({
            Implements: e.Label.HTML,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(I, C, D) {
                var G = C.pos.getc(true), z = this.viz.canvas, A = z.translateOffsetX, y = z.translateOffsetY, H = z.scaleOffsetX, F = z.scaleOffsetY, E = z.getSize();
                var B = {
                    x: Math.round(G.x * H + A + E.width / 2),
                    y: Math.round(G.y * F + y + E.height / 2)
                };
                var x = I.style;
                x.left = B.x + "px";
                x.top = B.y + "px";
                x.display = this.fitsInCanvas(B, z) ? "" : "none";
                D.onPlaceLabel(I, C)
            }
        });
        w.Plot.NodeTypes = new q({
            none: {
                render: c.empty,
                contains: c.lambda(false)
            },
            circle: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.circle.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.circle.contains(z, A, y)
                }
            },
            ellipse: {
                render: function(A, y) {
                    var B = A.pos.getc(true), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.ellipse.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var A = z.pos.getc(true), y = z.getData("width"), x = z.getData("height");
                    return this.nodeHelper.ellipse.contains(A, B, y, x)
                }
            },
            square: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.square.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.square.contains(z, A, y)
                }
            },
            rectangle: {
                render: function(A, y) {
                    var B = A.pos.getc(true), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.rectangle.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var A = z.pos.getc(true), y = z.getData("width"), x = z.getData("height");
                    return this.nodeHelper.rectangle.contains(A, B, y, x)
                }
            },
            triangle: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.triangle.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.triangle.contains(z, A, y)
                }
            },
            star: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.star.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.star.contains(z, A, y)
                }
            }
        });
        w.Plot.EdgeTypes = new q({
            none: c.empty,
            line: {
                render: function(x, y) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true);
                    this.edgeHelper.line.render(A, z, y)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.line.contains(z, y, A, this.edge.epsilon)
                }
            },
            arrow: {
                render: function(y, z) {
                    var D = y.nodeFrom.pos.getc(true), C = y.nodeTo.pos.getc(true), B = y.getData("dim"), A = y.data.$direction, x = (A && A.length > 1 && A[0] != y.nodeFrom.id);
                    this.edgeHelper.arrow.render(D, C, B, x, z)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.arrow.contains(z, y, A, this.edge.epsilon)
                }
            }
        })
    })($jit.ForceDirected);
    $jit.TM = {};
    var v = $jit.TM;
    $jit.TM.$extend = true;
    v.Base = {
        layout: {
            orientation: "h",
            vertical: function() {
                return this.orientation == "v"
            },
            horizontal: function() {
                return this.orientation == "h"
            },
            change: function() {
                this.orientation = this.vertical() ? "h" : "v"
            }
        },
        initialize: function(w) {
            var x = {
                orientation: "h",
                titleHeight: 13,
                offset: 2,
                levelsToShow: 0,
                constrained: false,
                animate: false,
                Node: {
                    type: "rectangle",
                    overridable: true,
                    width: 3,
                    height: 3,
                    color: "#444"
                },
                Label: {
                    textAlign: "center",
                    textBaseline: "top"
                },
                Edge: {
                    type: "none"
                },
                duration: 700,
                fps: 45
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), x, w);
            this.layout.orientation = this.config.orientation;
            var y = this.config;
            if (y.useCanvas) {
                this.canvas = y.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (y.background) {
                    y.background = c.merge({
                        type: "Circles"
                    }, y.background)
                }
                this.canvas = new l(this, y);
                this.config.labelContainer = (typeof y.injectInto == "string" ? y.injectInto : y.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: p,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new v.Label[y.Label.type](this);
            this.fx = new v.Plot(this);
            this.op = new v.Op(this);
            this.group = new v.Group(this);
            this.geom = new v.Geom(this);
            this.clickedNode = null;
            this.busy = false;
            this.initializeExtras()
        },
        refresh: function() {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var x = this;
            if (this.config.animate) {
                this.compute("end");
                this.config.levelsToShow > 0 && this.geom.setRightLevelToShow(this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root));
                this.fx.animate(c.merge(this.config, {
                    modes: ["linear", "node-property:width:height"],
                    onComplete: function() {
                        x.busy = false
                    }
                }))
            } else {
                var w = this.config.Label.type;
                if (w != "Native") {
                    var x = this;
                    this.graph.eachNode(function(y) {
                        x.labels.hideLabel(y, false)
                    })
                }
                this.busy = false;
                this.compute();
                this.config.levelsToShow > 0 && this.geom.setRightLevelToShow(this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root));
                this.plot()
            }
        },
        plot: function() {
            this.fx.plot()
        },
        leaf: function(w) {
            return w.getSubnodes([1, 1], "ignore").length == 0
        },
        enter: function(C) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var y = this, x = this.config, A = this.graph, w = C, z = this.clickedNode;
            var B = {
                onComplete: function() {
                    if (x.levelsToShow > 0) {
                        y.geom.setRightLevelToShow(C)
                    }
                    if (x.levelsToShow > 0 || x.request) {
                        y.compute()
                    }
                    if (x.animate) {
                        A.nodeList.setData("alpha", 0, "end");
                        C.eachSubgraph(function(D) {
                            D.setData("alpha", 1, "end")
                        }, "ignore");
                        y.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                y.clickedNode = w;
                                y.compute("end");
                                y.clickedNode = z;
                                y.fx.animate({
                                    modes: ["linear", "node-property:width:height"],
                                    duration: 1000,
                                    onComplete: function() {
                                        y.busy = false;
                                        y.clickedNode = w
                                    }
                                })
                            }
                        })
                    } else {
                        y.busy = false;
                        y.clickedNode = C;
                        y.refresh()
                    }
                }
            };
            if (x.request) {
                this.requestNodes(w, B)
            } else {
                B.onComplete()
            }
        },
        out: function() {
            if (this.busy) {
                return 
            }
            this.busy = true;
            this.events.hoveredNode = false;
            var A = this, y = this.config, C = this.graph, x = C.getNode(this.clickedNode && this.clickedNode.id || this.root).getParents(), z = x[0], w = z, B = this.clickedNode;
            if (!z) {
                this.busy = false;
                return 
            }
            callback = {
                onComplete: function() {
                    A.clickedNode = z;
                    if (y.request) {
                        A.requestNodes(z, {
                            onComplete: function() {
                                A.compute();
                                A.plot();
                                A.busy = false
                            }
                        })
                    } else {
                        A.compute();
                        A.plot();
                        A.busy = false
                    }
                }
            };
            if (y.levelsToShow > 0) {
                this.geom.setRightLevelToShow(z)
            }
            if (y.animate) {
                this.clickedNode = w;
                this.compute("end");
                this.clickedNode = B;
                this.fx.animate({
                    modes: ["linear", "node-property:width:height"],
                    duration: 1000,
                    onComplete: function() {
                        A.clickedNode = w;
                        C.eachNode(function(D) {
                            D.setDataset(["current", "end"], {
                                alpha: [0, 1]
                            })
                        }, "ignore");
                        B.eachSubgraph(function(D) {
                            D.setData("alpha", 1)
                        }, "ignore");
                        A.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                callback.onComplete()
                            }
                        })
                    }
                })
            } else {
                callback.onComplete()
            }
        },
        requestNodes: function(y, z) {
            var x = c.merge(this.controller, z), w = this.config.levelsToShow;
            if (x.request) {
                var B = [], A = y._depth;
                y.eachLevel(0, w, function(D) {
                    var C = w - (D._depth - A);
                    if (D.drawn&&!D.anySubnode() && C > 0) {
                        B.push(D);
                        D._level = C
                    }
                });
                this.group.requestNodes(B, x)
            } else {
                x.onComplete()
            }
        },
        reposition: function() {
            this.compute("end")
        }
    };
    v.Op = new q({
        Implements: e.Op,
        initialize: function(w) {
            this.viz = w
        }
    });
    v.Geom = new q({
        Implements: e.Geom,
        getRightLevelToShow: function() {
            return this.viz.config.levelsToShow
        },
        setRightLevelToShow: function(x) {
            var y = this.getRightLevelToShow(), w = this.viz.labels;
            x.eachLevel(0, y + 1, function(A) {
                var z = A._depth - x._depth;
                if (z > y) {
                    A.drawn = false;
                    A.exist = false;
                    A.ignore = true;
                    w.hideLabel(A, false)
                } else {
                    A.drawn = true;
                    A.exist = true;
                    delete A.ignore
                }
            });
            x.drawn = true;
            delete x.ignore
        }
    });
    v.Group = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config
        },
        requestNodes: function(B, A) {
            var z = 0, x = B.length, D = {};
            var y = function() {
                A.onComplete()
            };
            var w = this.viz;
            if (x == 0) {
                y()
            }
            for (var C = 0; C < x; C++) {
                D[B[C].id] = B[C];
                A.request(B[C].id, B[C]._level, {
                    onComplete: function(F, E) {
                        if (E && E.children) {
                            E.id = F;
                            w.op.sum(E, {
                                type: "nothing"
                            })
                        }
                        if (++z == x) {
                            w.graph.computeLevels(w.root, 0);
                            y()
                        }
                    }
                })
            }
        }
    });
    v.Plot = new q({
        Implements: e.Plot,
        initialize: function(w) {
            this.viz = w;
            this.config = w.config;
            this.node = this.config.Node;
            this.edge = this.config.Edge;
            this.animation = new u;
            this.nodeTypes = new v.Plot.NodeTypes;
            this.edgeTypes = new v.Plot.EdgeTypes;
            this.labels = w.labels
        },
        plot: function(y, x) {
            var w = this.viz, z = w.graph;
            w.canvas.clear();
            this.plotTree(z.getNode(w.clickedNode && w.clickedNode.id || w.root), c.merge(w.config, y || {}, {
                withLabels: true,
                hideLabels: false,
                plotSubtree: function(B, A) {
                    return B.anySubnode("exist")
                }
            }), x)
        }
    });
    v.Label = {};
    v.Label.Native = new q({
        Implements: e.Label.Native,
        initialize: function(w) {
            this.config = w.config;
            this.leaf = w.leaf
        },
        renderLabel: function(z, A, B) {
            if (!this.leaf(A)&&!this.config.titleHeight) {
                return 
            }
            var D = A.pos.getc(true), G = z.getCtx(), w = A.getData("width"), F = A.getData("height"), E = D.x + w / 2, C = D.y;
            G.fillText(A.name, E, C, w)
        }
    });
    v.Label.SVG = new q({
        Implements: e.Label.SVG,
        initialize: function(w) {
            this.viz = w;
            this.leaf = w.leaf;
            this.config = w.config
        },
        placeLabel: function(G, A, B) {
            var E = A.pos.getc(true), x = this.viz.canvas, y = x.translateOffsetX, w = x.translateOffsetY, F = x.scaleOffsetX, D = x.scaleOffsetY, C = x.getSize();
            var z = {
                x: Math.round(E.x * F + y + C.width / 2),
                y: Math.round(E.y * D + w + C.height / 2)
            };
            G.setAttribute("x", z.x);
            G.setAttribute("y", z.y);
            if (!this.leaf(A)&&!this.config.titleHeight) {
                G.style.display = "none"
            }
            B.onPlaceLabel(G, A)
        }
    });
    v.Label.HTML = new q({
        Implements: e.Label.HTML,
        initialize: function(w) {
            this.viz = w;
            this.leaf = w.leaf;
            this.config = w.config
        },
        placeLabel: function(H, B, C) {
            var F = B.pos.getc(true), y = this.viz.canvas, z = y.translateOffsetX, x = y.translateOffsetY, G = y.scaleOffsetX, E = y.scaleOffsetY, D = y.getSize();
            var A = {
                x: Math.round(F.x * G + z + D.width / 2),
                y: Math.round(F.y * E + x + D.height / 2)
            };
            var w = H.style;
            w.left = A.x + "px";
            w.top = A.y + "px";
            w.width = B.getData("width") * G + "px";
            w.height = B.getData("height") * E + "px";
            w.zIndex = B._depth * 100;
            w.display = "";
            if (!this.leaf(B)&&!this.config.titleHeight) {
                H.style.display = "none"
            }
            C.onPlaceLabel(H, B)
        }
    });
    v.Plot.NodeTypes = new q({
        none: {
            render: c.empty
        },
        rectangle: {
            render: function(z, x, M) {
                var D = this.viz.leaf(z), y = this.config, I = y.offset, C = y.titleHeight, H = z.pos.getc(true), w = z.getData("width"), J = z.getData("height"), B = z.getData("border"), L = x.getCtx(), G = H.x + I / 2, E = H.y + I / 2;
                if (w <= I || J <= I) {
                    return 
                }
                if (D) {
                    if (y.cushion) {
                        var K = L.createRadialGradient(G + (w - I) / 2, E + (J - I) / 2, 1, G + (w - I) / 2, E + (J - I) / 2, w < J ? J : w);
                        var A = z.getData("color");
                        var F = c.rgbToHex(c.map(c.hexToRgb(A), function(N) {
                            return N * 0.2>>0
                        }));
                        K.addColorStop(0, A);
                        K.addColorStop(1, F);
                        L.fillStyle = K
                    }
                    L.fillRect(G, E, w - I, J - I);
                    if (B) {
                        L.save();
                        L.strokeStyle = B;
                        L.strokeRect(G, E, w - I, J - I);
                        L.restore()
                    }
                } else {
                    if (C > 0) {
                        L.fillRect(H.x + I / 2, H.y + I / 2, w - I, C - I);
                        if (B) {
                            L.save();
                            L.strokeStyle = B;
                            L.strokeRect(H.x + I / 2, H.y + I / 2, w - I, J - I);
                            L.restore()
                        }
                    }
                }
            },
            contains: function(z, B) {
                if (this.viz.clickedNode&&!z.isDescendantOf(this.viz.clickedNode.id) || z.ignore) {
                    return false
                }
                var A = z.pos.getc(true), y = z.getData("width"), x = this.viz.leaf(z), w = x ? z.getData("height"): this.config.titleHeight;
                return this.nodeHelper.rectangle.contains({
                    x: A.x + y / 2,
                    y: A.y + w / 2
                }, B, y, w)
            }
        }
    });
    v.Plot.EdgeTypes = new q({
        none: c.empty
    });
    v.SliceAndDice = new q({
        Implements: [d, o, v.Base, g.TM.SliceAndDice]
    });
    v.Squarified = new q({
        Implements: [d, o, v.Base, g.TM.Squarified]
    });
    v.Strip = new q({
        Implements: [d, o, v.Base, g.TM.Strip]
    });
    $jit.RGraph = new q({
        Implements: [d, o, g.Radial],
        initialize: function(w) {
            var x = $jit.RGraph;
            var y = {
                interpolation: "linear",
                levelDistance: 100
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), y, w);
            var z = this.config;
            if (z.useCanvas) {
                this.canvas = z.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (z.background) {
                    z.background = c.merge({
                        type: "Circles"
                    }, z.background)
                }
                this.canvas = new l(this, z);
                this.config.labelContainer = (typeof z.injectInto == "string" ? z.injectInto : z.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: b,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new x.Label[z.Label.type](this);
            this.fx = new x.Plot(this, x);
            this.op = new x.Op(this);
            this.json = null;
            this.root = null;
            this.busy = false;
            this.parent = false;
            this.initializeExtras()
        },
        createLevelDistanceFunc: function() {
            var w = this.config.levelDistance;
            return function(x) {
                return (x._depth + 1) * w
            }
        },
        refresh: function() {
            this.compute();
            this.plot()
        },
        reposition: function() {
            this.compute("end")
        },
        plot: function() {
            this.fx.plot()
        },
        getNodeAndParentAngle: function(D) {
            var y = false;
            var C = this.graph.getNode(D);
            var A = C.getParents();
            var z = (A.length > 0) ? A[0]: false;
            if (z) {
                var w = z.pos.getc(), B = C.pos.getc();
                var x = w.add(B.scale(-1));
                y = Math.atan2(x.y, x.x);
                if (y < 0) {
                    y += 2 * Math.PI
                }
            }
            return {
                parent: z,
                theta: y
            }
        },
        tagChildren: function(A, C) {
            if (A.angleSpan) {
                var B = [];
                A.eachAdjacency(function(D) {
                    B.push(D.nodeTo)
                }, "ignore");
                var w = B.length;
                for (var z = 0; z < w && C != B[z].id; z++) {}
                for (var y = (z + 1)%w, x = 0; C != B[y].id; y = (y + 1)%w) {
                    B[y].dist = x++
                }
            }
        },
        onClick: function(B, x) {
            if (this.root != B&&!this.busy) {
                this.busy = true;
                this.root = B;
                var y = this;
                this.controller.onBeforeCompute(this.graph.getNode(B));
                var z = this.getNodeAndParentAngle(B);
                this.tagChildren(z.parent, B);
                this.parent = z.parent;
                this.compute("end");
                var w = z.theta - z.parent.endPos.theta;
                this.graph.eachNode(function(C) {
                    C.endPos.set(C.endPos.getp().add(k(w, 0)))
                });
                var A = this.config.interpolation;
                x = c.merge({
                    onComplete: c.empty
                }, x || {});
                this.fx.animate(c.merge({
                    hideLabels: true,
                    modes: [A]
                }, x, {
                    onComplete: function() {
                        y.busy = false;
                        x.onComplete()
                    }
                }))
            }
        }
    });
    $jit.RGraph.$extend = true;
    (function(w) {
        w.Op = new q({
            Implements: e.Op
        });
        w.Plot = new q({
            Implements: e.Plot
        });
        w.Label = {};
        w.Label.Native = new q({
            Implements: e.Label.Native
        });
        w.Label.SVG = new q({
            Implements: e.Label.SVG,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(H, B, C) {
                var F = B.pos.getc(true), y = this.viz.canvas, z = y.translateOffsetX, x = y.translateOffsetY, G = y.scaleOffsetX, E = y.scaleOffsetY, D = y.getSize();
                var A = {
                    x: Math.round(F.x * G + z + D.width / 2),
                    y: Math.round(F.y * E + x + D.height / 2)
                };
                H.setAttribute("x", A.x);
                H.setAttribute("y", A.y);
                C.onPlaceLabel(H, B)
            }
        });
        w.Label.HTML = new q({
            Implements: e.Label.HTML,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(I, C, D) {
                var G = C.pos.getc(true), z = this.viz.canvas, A = z.translateOffsetX, y = z.translateOffsetY, H = z.scaleOffsetX, F = z.scaleOffsetY, E = z.getSize();
                var B = {
                    x: Math.round(G.x * H + A + E.width / 2),
                    y: Math.round(G.y * F + y + E.height / 2)
                };
                var x = I.style;
                x.left = B.x + "px";
                x.top = B.y + "px";
                x.display = this.fitsInCanvas(B, z) ? "" : "none";
                D.onPlaceLabel(I, C)
            }
        });
        w.Plot.NodeTypes = new q({
            none: {
                render: c.empty,
                contains: c.lambda(false)
            },
            circle: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.circle.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.circle.contains(z, A, y)
                }
            },
            ellipse: {
                render: function(A, y) {
                    var B = A.pos.getc(true), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.ellipse.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var A = z.pos.getc(true), y = z.getData("width"), x = z.getData("height");
                    return this.nodeHelper.ellipse.contains(A, B, y, x)
                }
            },
            square: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.square.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.square.contains(z, A, y)
                }
            },
            rectangle: {
                render: function(A, y) {
                    var B = A.pos.getc(true), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.rectangle.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var A = z.pos.getc(true), y = z.getData("width"), x = z.getData("height");
                    return this.nodeHelper.rectangle.contains(A, B, y, x)
                }
            },
            triangle: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.triangle.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.triangle.contains(z, A, y)
                }
            },
            star: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.star.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.star.contains(z, A, y)
                }
            }
        });
        w.Plot.EdgeTypes = new q({
            none: c.empty,
            line: {
                render: function(x, y) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true);
                    this.edgeHelper.line.render(A, z, y)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.line.contains(z, y, A, this.edge.epsilon)
                }
            },
            arrow: {
                render: function(y, z) {
                    var D = y.nodeFrom.pos.getc(true), C = y.nodeTo.pos.getc(true), B = y.getData("dim"), A = y.data.$direction, x = (A && A.length > 1 && A[0] != y.nodeFrom.id);
                    this.edgeHelper.arrow.render(D, C, B, x, z)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.arrow.contains(z, y, A, this.edge.epsilon)
                }
            }
        })
    })($jit.RGraph);
    p.prototype.moebiusTransformation = function(y) {
        var w = this.add(y);
        var x = y.$conjugate().$prod(this);
        x.x++;
        return w.$div(x)
    };
    e.Util.moebiusTransformation = function(y, A, z, x, w) {
        this.eachNode(y, function(C) {
            for (var B = 0; B < z.length; B++) {
                var E = A[B].scale(-1), D = x ? x: z[B];
                C.getPos(z[B]).set(C.getPos(D).getc().moebiusTransformation(E))
            }
        }, w)
    };
    $jit.Hypertree = new q({
        Implements: [d, o, g.Radial],
        initialize: function(w) {
            var z = $jit.Hypertree;
            var x = {
                radius: "auto",
                offset: 0,
                Edge: {
                    type: "hyperline"
                },
                duration: 1500,
                fps: 35
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), x, w);
            var y = this.config;
            if (y.useCanvas) {
                this.canvas = y.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (y.background) {
                    y.background = c.merge({
                        type: "Circles"
                    }, y.background)
                }
                this.canvas = new l(this, y);
                this.config.labelContainer = (typeof y.injectInto == "string" ? y.injectInto : y.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: b,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new z.Label[y.Label.type](this);
            this.fx = new z.Plot(this, z);
            this.op = new z.Op(this);
            this.json = null;
            this.root = null;
            this.busy = false;
            this.initializeExtras()
        },
        createLevelDistanceFunc: function() {
            var A = this.getRadius();
            var C = 0, w = Math.max, x = this.config;
            this.graph.eachNode(function(D) {
                C = w(D._depth, C)
            }, "ignore");
            C++;
            var B = function(D) {
                return function(F) {
                    F.scale = A;
                    var H = F._depth + 1;
                    var G = 0, E = Math.pow;
                    while (H) {
                        G += E(D, H--)
                    }
                    return G - x.offset
                }
            };
            for (var z = 0.51; z <= 1; z += 0.01) {
                var y = (1 - Math.pow(z, C)) / (1 - z);
                if (y >= 2) {
                    return B(z-0.01)
                }
            }
            return B(0.75)
        },
        getRadius: function() {
            var w = this.config.radius;
            if (w !== "auto") {
                return w
            }
            var x = this.canvas.getSize();
            return Math.min(x.width, x.height) / 2
        },
        refresh: function(w) {
            if (w) {
                this.reposition();
                this.graph.eachNode(function(x) {
                    x.startPos.rho = x.pos.rho = x.endPos.rho;
                    x.startPos.theta = x.pos.theta = x.endPos.theta
                })
            } else {
                this.compute()
            }
            this.plot()
        },
        reposition: function() {
            this.compute("end");
            var w = this.graph.getNode(this.root).pos.getc().scale(-1);
            e.Util.moebiusTransformation(this.graph, [w], ["end"], "end", "ignore");
            this.graph.eachNode(function(x) {
                if (x.ignore) {
                    x.endPos.rho = x.pos.rho;
                    x.endPos.theta = x.pos.theta
                }
            })
        },
        plot: function() {
            this.fx.plot()
        },
        onClick: function(y, w) {
            var x = this.graph.getNode(y).pos.getc(true);
            this.move(x, w)
        },
        move: function(A, y) {
            var x = r(A.x, A.y);
            if (this.busy === false && x.norm() < 1) {
                this.busy = true;
                var w = this.graph.getClosestNodeToPos(x), z = this;
                this.graph.computeLevels(w.id, 0);
                this.controller.onBeforeCompute(w);
                y = c.merge({
                    onComplete: c.empty
                }, y || {});
                this.fx.animate(c.merge({
                    modes: ["moebius"],
                    hideLabels: true
                }, y, {
                    onComplete: function() {
                        z.busy = false;
                        y.onComplete()
                    }
                }), x)
            }
        }
    });
    $jit.Hypertree.$extend = true;
    (function(w) {
        w.Op = new q({
            Implements: e.Op
        });
        w.Plot = new q({
            Implements: e.Plot
        });
        w.Label = {};
        w.Label.Native = new q({
            Implements: e.Label.Native,
            initialize: function(x) {
                this.viz = x
            },
            renderLabel: function(z, B, y) {
                var x = z.getCtx();
                var C = B.pos.getc(true);
                var A = this.viz.getRadius();
                x.fillText(B.name, C.x * A, C.y * A)
            }
        });
        w.Label.SVG = new q({
            Implements: e.Label.SVG,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(I, C, D) {
                var G = C.pos.getc(true), z = this.viz.canvas, A = z.translateOffsetX, y = z.translateOffsetY, H = z.scaleOffsetX, F = z.scaleOffsetY, E = z.getSize(), x = this.viz.getRadius();
                var B = {
                    x: Math.round((G.x * H) * x + A + E.width / 2),
                    y: Math.round((G.y * F) * x + y + E.height / 2)
                };
                I.setAttribute("x", B.x);
                I.setAttribute("y", B.y);
                D.onPlaceLabel(I, C)
            }
        });
        w.Label.HTML = new q({
            Implements: e.Label.HTML,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(J, D, E) {
                var H = D.pos.getc(true), A = this.viz.canvas, B = A.translateOffsetX, z = A.translateOffsetY, I = A.scaleOffsetX, G = A.scaleOffsetY, F = A.getSize(), x = this.viz.getRadius();
                var C = {
                    x: Math.round((H.x * I) * x + B + F.width / 2),
                    y: Math.round((H.y * G) * x + z + F.height / 2)
                };
                var y = J.style;
                y.left = C.x + "px";
                y.top = C.y + "px";
                y.display = this.fitsInCanvas(C, A) ? "" : "none";
                E.onPlaceLabel(J, D)
            }
        });
        w.Plot.NodeTypes = new q({
            none: {
                render: c.empty,
                contains: c.lambda(false)
            },
            circle: {
                render: function(z, x) {
                    var y = this.node, B = z.getData("dim"), A = z.pos.getc();
                    B = y.transform ? B * (1 - A.squaredNorm()) : B;
                    A.$scale(z.scale);
                    if (B > 0.2) {
                        this.nodeHelper.circle.render("fill", A, B, x)
                    }
                },
                contains: function(x, A) {
                    var y = x.getData("dim"), z = x.pos.getc().$scale(x.scale);
                    return this.nodeHelper.circle.contains(z, A, y)
                }
            },
            ellipse: {
                render: function(A, y) {
                    var B = A.pos.getc().$scale(A.scale), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.ellipse.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var y = z.getData("width"), x = z.getData("height"), A = z.pos.getc().$scale(z.scale);
                    return this.nodeHelper.circle.contains(A, B, y, x)
                }
            },
            square: {
                render: function(z, x) {
                    var y = this.node, B = z.getData("dim"), A = z.pos.getc();
                    B = y.transform ? B * (1 - A.squaredNorm()) : B;
                    A.$scale(z.scale);
                    if (B > 0.2) {
                        this.nodeHelper.square.render("fill", A, B, x)
                    }
                },
                contains: function(x, A) {
                    var y = x.getData("dim"), z = x.pos.getc().$scale(x.scale);
                    return this.nodeHelper.square.contains(z, A, y)
                }
            },
            rectangle: {
                render: function(B, y) {
                    var A = this.node, z = B.getData("width"), x = B.getData("height"), C = B.pos.getc();
                    z = A.transform ? z * (1 - C.squaredNorm()) : z;
                    x = A.transform ? x * (1 - C.squaredNorm()) : x;
                    C.$scale(B.scale);
                    if (z > 0.2 && x > 0.2) {
                        this.nodeHelper.rectangle.render("fill", C, z, x, y)
                    }
                },
                contains: function(z, B) {
                    var y = z.getData("width"), x = z.getData("height"), A = z.pos.getc().$scale(z.scale);
                    return this.nodeHelper.rectangle.contains(A, B, y, x)
                }
            },
            triangle: {
                render: function(z, x) {
                    var y = this.node, B = z.getData("dim"), A = z.pos.getc();
                    B = y.transform ? B * (1 - A.squaredNorm()) : B;
                    A.$scale(z.scale);
                    if (B > 0.2) {
                        this.nodeHelper.triangle.render("fill", A, B, x)
                    }
                },
                contains: function(x, A) {
                    var y = x.getData("dim"), z = x.pos.getc().$scale(x.scale);
                    return this.nodeHelper.triangle.contains(z, A, y)
                }
            },
            star: {
                render: function(z, x) {
                    var y = this.node, B = z.getData("dim"), A = z.pos.getc();
                    B = y.transform ? B * (1 - A.squaredNorm()) : B;
                    A.$scale(z.scale);
                    if (B > 0.2) {
                        this.nodeHelper.star.render("fill", A, B, x)
                    }
                },
                contains: function(x, A) {
                    var y = x.getData("dim"), z = x.pos.getc().$scale(x.scale);
                    return this.nodeHelper.star.contains(z, A, y)
                }
            }
        });
        w.Plot.EdgeTypes = new q({
            none: c.empty,
            line: {
                render: function(x, y) {
                    var B = x.nodeFrom.pos.getc(true), A = x.nodeTo.pos.getc(true), z = x.nodeFrom.scale;
                    this.edgeHelper.line.render({
                        x: B.x * z,
                        y: B.y * z
                    }, {
                        x: A.x * z,
                        y: A.y * z
                    }, y)
                },
                contains: function(x, B) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true), y = x.nodeFrom.scale;
                    this.edgeHelper.line.contains({
                        x: A.x * y,
                        y: A.y * y
                    }, {
                        x: z.x * y,
                        y: z.y * y
                    }, B, this.edge.epsilon)
                }
            },
            arrow: {
                render: function(y, z) {
                    var E = y.nodeFrom.pos.getc(true), D = y.nodeTo.pos.getc(true), A = y.nodeFrom.scale, C = y.getData("dim"), B = y.data.$direction, x = (B && B.length > 1 && B[0] != y.nodeFrom.id);
                    this.edgeHelper.arrow.render({
                        x: E.x * A,
                        y: E.y * A
                    }, {
                        x: D.x * A,
                        y: D.y * A
                    }, C, x, z)
                },
                contains: function(x, B) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true), y = x.nodeFrom.scale;
                    this.edgeHelper.arrow.contains({
                        x: A.x * y,
                        y: A.y * y
                    }, {
                        x: z.x * y,
                        y: z.y * y
                    }, B, this.edge.epsilon)
                }
            },
            hyperline: {
                render: function(x, y) {
                    var B = x.nodeFrom.pos.getc(), A = x.nodeTo.pos.getc(), z = this.viz.getRadius();
                    this.edgeHelper.hyperline.render(B, A, z, y)
                },
                contains: c.lambda(false)
            }
        })
    })($jit.Hypertree)
})();

;var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
  iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
  typeOfCanvas = typeof HTMLCanvasElement,
  nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
  textSupport = nativeCanvasSupport 
  && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
  this.elem.innerHTML = text;
  this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
}
};

function hideSpinner () {
 $("#spinner").
   attr("style", "display:none;");
}

function showSpinner () {
 $("#spinner").
   attr("style", "display:block;");
}


/*
// (jul: removed json() )
    
    //end
    function start(json){
        //init Spacetree
        //Create a new ST instance
        var st = new $jit.ST({
            //id of viz container element
            injectInto: 'infovis',
            //set duration for the animation
            duration: 800,
            //set animation transition type
            transition: $jit.Trans.Quart.easeInOut,
            //set distance between node and its children
            levelDistance: 50,
            //enable panning
            Navigation: {
              enable:true,
              panning:true
            },
            // (jul)
            Position: 'bottom',           
            //set node and edge styles
            //set overridable=true for styling individual
            //nodes or edges
            Node: {
                height: 20,
                width: 60,
                type: 'rectangle',
                color: '#aaa',
                overridable: true
            },
            
            Edge: {
                type: 'bezier',
                overridable: true
            },
            
            onBeforeCompute: function(node){
                Log.write("loading " + node.name);
            },
            
            onAfterCompute: function(){
                Log.write("done");
            },
            
            //This method is called on DOM label creation.
            //Use this method to add event handlers and styles to
            //your node.
            onCreateLabel: function(label, node){
                label.id = node.id;            
                label.innerHTML = node.name;
                label.onclick = function(){
                    if(normal.checked) {
                      st.onClick(node.id);
                  } else {
                    st.setRoot(node.id, 'animate');
                }
            };
                //set label styles
                var style = label.style;
                style.width = 60 + 'px';
                style.height = 17 + 'px';            
                style.cursor = 'pointer';
                style.color = '#333';
                style.fontSize = '0.8em';
                style.textAlign= 'center';
                style.paddingTop = '3px';
            },
            
            //This method is called right before plotting
            //a node. It's useful for changing an individual node
            //style properties before plotting it.
            //The data properties prefixed with a dollar
            //sign will override the global node style properties.
            onBeforePlotNode: function(node){
                //add some color to the nodes in the path between the
                //root node and the selected node.
                if (node.selected) {
                    node.data.$color = "#ff7";
                }
                else {
                    delete node.data.$color;
                    //if the node belongs to the last plotted level
                    if(!node.anySubnode("exist")) {
                        //count children number
                        var count = 0;
                        node.eachSubnode(function(n) { count++; });
                        //assign a node color based on
                        //how many children it has
                        node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];  
                        
                        // avoid background-color back (no contrast) 
                        if (count > 5) {
                          node.data.$color = '#999';
                        }                  
                    }
                }
            },
            
            //This method is called right before plotting
            //an edge. It's useful for changing an individual edge
            //style properties before plotting it.
            //Edge data proprties prefixed with a dollar sign will
            //override the Edge global style properties.
            onBeforePlotLine: function(adj){
                if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                    adj.data.$color = "#eed";
                    adj.data.$lineWidth = 3;
                }
                else {
                    delete adj.data.$color;
                    delete adj.data.$lineWidth;
                }
            }
        });
        //load json data
        st.loadJSON(json);

        //compute node positions and layout
        st.compute();

        //optional: make a translation of the tree
        st.geom.translate(new $jit.Complex(-200, 0), "current");


        //emulate a click on the root node.
        st.onClick(st.root);
        //end
        //Add event handlers to switch spacetree orientation.

        // call bottom align: changed on html (jul)
        // st.switchPosition('bottom', "animate", function(){});


        var top = $jit.id('r-top'), 
        left = $jit.id('r-left'), 
        bottom = $jit.id('r-bottom'), 
        right = $jit.id('r-right'),
        normal = $jit.id('s-normal');

        
        function changeHandler() {
            if(this.checked) {
                top.disabled = bottom.disabled = right.disabled = left.disabled = true;
                st.switchPosition(this.value, "animate", {
                    onComplete: function(){
                        top.disabled = bottom.disabled = right.disabled = left.disabled = false;
                    }
                });
            }
        };
        
        top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler;
        //end
        

    }


function init(){
    $.ajax({
      dataType: "json",
      url: '/json/test_data2.json',
      success: function(data){
        start(data)
      }
  });
};
*/

// (jul: new init function. new test data)


function init(){
    //init data
    var json = "{id:\"node02\", name:\"0.2\", data:{}, children:[{id:\"node13\", name:\"1.3\", data:{}, children:[{id:\"node24\", name:\"2.4\", data:{}, children:[{id:\"node35\", name:\"3.5\", data:{}, children:[{id:\"node46\", name:\"4.6\", data:{}, children:[]}]}, {id:\"node37\", name:\"3.7\", data:{}, children:[{id:\"node48\", name:\"4.8\", data:{}, children:[]}, {id:\"node49\", name:\"4.9\", data:{}, children:[]}, {id:\"node410\", name:\"4.10\", data:{}, children:[]}, {id:\"node411\", name:\"4.11\", data:{}, children:[]}]}, {id:\"node312\", name:\"3.12\", data:{}, children:[{id:\"node413\", name:\"4.13\", data:{}, children:[]}]}, {id:\"node314\", name:\"3.14\", data:{}, children:[{id:\"node415\", name:\"4.15\", data:{}, children:[]}, {id:\"node416\", name:\"4.16\", data:{}, children:[]}, {id:\"node417\", name:\"4.17\", data:{}, children:[]}, {id:\"node418\", name:\"4.18\", data:{}, children:[]}]}, {id:\"node319\", name:\"3.19\", data:{}, children:[{id:\"node420\", name:\"4.20\", data:{}, children:[]}, {id:\"node421\", name:\"4.21\", data:{}, children:[]}]}]}, {id:\"node222\", name:\"2.22\", data:{}, children:[{id:\"node323\", name:\"3.23\", data:{}, children:[{id:\"node424\", name:\"4.24\", data:{}, children:[]}]}]}]}, {id:\"node125\", name:\"1.25\", data:{}, children:[{id:\"node226\", name:\"2.26\", data:{}, children:[{id:\"node327\", name:\"3.27\", data:{}, children:[{id:\"node428\", name:\"4.28\", data:{}, children:[]}, {id:\"node429\", name:\"4.29\", data:{}, children:[]}]}, {id:\"node330\", name:\"3.30\", data:{}, children:[{id:\"node431\", name:\"4.31\", data:{}, children:[]}]}, {id:\"node332\", name:\"3.32\", data:{}, children:[{id:\"node433\", name:\"4.33\", data:{}, children:[]}, {id:\"node434\", name:\"4.34\", data:{}, children:[]}, {id:\"node435\", name:\"4.35\", data:{}, children:[]}, {id:\"node436\", name:\"4.36\", data:{}, children:[]}]}]}, {id:\"node237\", name:\"2.37\", data:{}, children:[{id:\"node338\", name:\"3.38\", data:{}, children:[{id:\"node439\", name:\"4.39\", data:{}, children:[]}, {id:\"node440\", name:\"4.40\", data:{}, children:[]}, {id:\"node441\", name:\"4.41\", data:{}, children:[]}]}, {id:\"node342\", name:\"3.42\", data:{}, children:[{id:\"node443\", name:\"4.43\", data:{}, children:[]}]}, {id:\"node344\", name:\"3.44\", data:{}, children:[{id:\"node445\", name:\"4.45\", data:{}, children:[]}, {id:\"node446\", name:\"4.46\", data:{}, children:[]}, {id:\"node447\", name:\"4.47\", data:{}, children:[]}]}, {id:\"node348\", name:\"3.48\", data:{}, children:[{id:\"node449\", name:\"4.49\", data:{}, children:[]}, {id:\"node450\", name:\"4.50\", data:{}, children:[]}, {id:\"node451\", name:\"4.51\", data:{}, children:[]}, {id:\"node452\", name:\"4.52\", data:{}, children:[]}, {id:\"node453\", name:\"4.53\", data:{}, children:[]}]}, {id:\"node354\", name:\"3.54\", data:{}, children:[{id:\"node455\", name:\"4.55\", data:{}, children:[]}, {id:\"node456\", name:\"4.56\", data:{}, children:[]}, {id:\"node457\", name:\"4.57\", data:{}, children:[]}]}]}, {id:\"node258\", name:\"2.58\", data:{}, children:[{id:\"node359\", name:\"3.59\", data:{}, children:[{id:\"node460\", name:\"4.60\", data:{}, children:[]}, {id:\"node461\", name:\"4.61\", data:{}, children:[]}, {id:\"node462\", name:\"4.62\", data:{}, children:[]}, {id:\"node463\", name:\"4.63\", data:{}, children:[]}, {id:\"node464\", name:\"4.64\", data:{}, children:[]}]}]}]}, {id:\"node165\", name:\"1.65\", data:{}, children:[{id:\"node266\", name:\"2.66\", data:{}, children:[{id:\"node367\", name:\"3.67\", data:{}, children:[{id:\"node468\", name:\"4.68\", data:{}, children:[]}, {id:\"node469\", name:\"4.69\", data:{}, children:[]}, {id:\"node470\", name:\"4.70\", data:{}, children:[]}, {id:\"node471\", name:\"4.71\", data:{}, children:[]}]}, {id:\"node372\", name:\"3.72\", data:{}, children:[{id:\"node473\", name:\"4.73\", data:{}, children:[]}, {id:\"node474\", name:\"4.74\", data:{}, children:[]}, {id:\"node475\", name:\"4.75\", data:{}, children:[]}, {id:\"node476\", name:\"4.76\", data:{}, children:[]}]}, {id:\"node377\", name:\"3.77\", data:{}, children:[{id:\"node478\", name:\"4.78\", data:{}, children:[]}, {id:\"node479\", name:\"4.79\", data:{}, children:[]}]}, {id:\"node380\", name:\"3.80\", data:{}, children:[{id:\"node481\", name:\"4.81\", data:{}, children:[]}, {id:\"node482\", name:\"4.82\", data:{}, children:[]}]}]}, {id:\"node283\", name:\"2.83\", data:{}, children:[{id:\"node384\", name:\"3.84\", data:{}, children:[{id:\"node485\", name:\"4.85\", data:{}, children:[]}]}, {id:\"node386\", name:\"3.86\", data:{}, children:[{id:\"node487\", name:\"4.87\", data:{}, children:[]}, {id:\"node488\", name:\"4.88\", data:{}, children:[]}, {id:\"node489\", name:\"4.89\", data:{}, children:[]}, {id:\"node490\", name:\"4.90\", data:{}, children:[]}, {id:\"node491\", name:\"4.91\", data:{}, children:[]}]}, {id:\"node392\", name:\"3.92\", data:{}, children:[{id:\"node493\", name:\"4.93\", data:{}, children:[]}, {id:\"node494\", name:\"4.94\", data:{}, children:[]}, {id:\"node495\", name:\"4.95\", data:{}, children:[]}, {id:\"node496\", name:\"4.96\", data:{}, children:[]}]}, {id:\"node397\", name:\"3.97\", data:{}, children:[{id:\"node498\", name:\"4.98\", data:{}, children:[]}]}, {id:\"node399\", name:\"3.99\", data:{}, children:[{id:\"node4100\", name:\"4.100\", data:{}, children:[]}, {id:\"node4101\", name:\"4.101\", data:{}, children:[]}, {id:\"node4102\", name:\"4.102\", data:{}, children:[]}, {id:\"node4103\", name:\"4.103\", data:{}, children:[]}]}]}, {id:\"node2104\", name:\"2.104\", data:{}, children:[{id:\"node3105\", name:\"3.105\", data:{}, children:[{id:\"node4106\", name:\"4.106\", data:{}, children:[]}, {id:\"node4107\", name:\"4.107\", data:{}, children:[]}, {id:\"node4108\", name:\"4.108\", data:{}, children:[]}]}]}, {id:\"node2109\", name:\"2.109\", data:{}, children:[{id:\"node3110\", name:\"3.110\", data:{}, children:[{id:\"node4111\", name:\"4.111\", data:{}, children:[]}, {id:\"node4112\", name:\"4.112\", data:{}, children:[]}]}, {id:\"node3113\", name:\"3.113\", data:{}, children:[{id:\"node4114\", name:\"4.114\", data:{}, children:[]}, {id:\"node4115\", name:\"4.115\", data:{}, children:[]}, {id:\"node4116\", name:\"4.116\", data:{}, children:[]}]}, {id:\"node3117\", name:\"3.117\", data:{}, children:[{id:\"node4118\", name:\"4.118\", data:{}, children:[]}, {id:\"node4119\", name:\"4.119\", data:{}, children:[]}, {id:\"node4120\", name:\"4.120\", data:{}, children:[]}, {id:\"node4121\", name:\"4.121\", data:{}, children:[]}]}, {id:\"node3122\", name:\"3.122\", data:{}, children:[{id:\"node4123\", name:\"4.123\", data:{}, children:[]}, {id:\"node4124\", name:\"4.124\", data:{}, children:[]}]}]}, {id:\"node2125\", name:\"2.125\", data:{}, children:[{id:\"node3126\", name:\"3.126\", data:{}, children:[{id:\"node4127\", name:\"4.127\", data:{}, children:[]}, {id:\"node4128\", name:\"4.128\", data:{}, children:[]}, {id:\"node4129\", name:\"4.129\", data:{}, children:[]}]}]}]}, {id:\"node1130\", name:\"1.130\", data:{}, children:[{id:\"node2131\", name:\"2.131\", data:{}, children:[{id:\"node3132\", name:\"3.132\", data:{}, children:[{id:\"node4133\", name:\"4.133\", data:{}, children:[]}, {id:\"node4134\", name:\"4.134\", data:{}, children:[]}, {id:\"node4135\", name:\"4.135\", data:{}, children:[]}, {id:\"node4136\", name:\"4.136\", data:{}, children:[]}, {id:\"node4137\", name:\"4.137\", data:{}, children:[]}]}]}, {id:\"node2138\", name:\"2.138\", data:{}, children:[{id:\"node3139\", name:\"3.139\", data:{}, children:[{id:\"node4140\", name:\"4.140\", data:{}, children:[]}, {id:\"node4141\", name:\"4.141\", data:{}, children:[]}]}, {id:\"node3142\", name:\"3.142\", data:{}, children:[{id:\"node4143\", name:\"4.143\", data:{}, children:[]}, {id:\"node4144\", name:\"4.144\", data:{}, children:[]}, {id:\"node4145\", name:\"4.145\", data:{}, children:[]}, {id:\"node4146\", name:\"4.146\", data:{}, children:[]}, {id:\"node4147\", name:\"4.147\", data:{}, children:[]}]}]}]}]}";
    //end
    
    //A client-side tree generator
    var getTree = (function() {
        var i = 0;
        return function(nodeId, level) {
          var subtree = eval('(' + json.replace(/id:\"([a-zA-Z0-9]+)\"/g, 
          function(all, match) {
            return "id:\"" + match + "_" + i + "\""  
          }) + ')');
          $jit.json.prune(subtree, level); i++;
          return {
              'id': nodeId,
              'children': subtree.children
          };
        };
    })();
    
    //Implement a node rendering function called 'nodeline' that plots a straight line
    //when contracting or expanding a subtree.
    $jit.ST.Plot.NodeTypes.implement({
        'nodeline': {
          'render': function(node, canvas, animating) {
                if(animating === 'expand' || animating === 'contract') {
                  var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
                  var width  = nconfig.width, height = nconfig.height;
                  var algnPos = this.getAlignedPos(pos, width, height);
                  var ctx = canvas.getCtx(), ort = this.config.orientation;
                  ctx.beginPath();
                  if(ort == 'left' || ort == 'right') {
                      ctx.moveTo(algnPos.x, algnPos.y + height / 2);
                      ctx.lineTo(algnPos.x + width, algnPos.y + height / 2);
                  } else {
                      ctx.moveTo(algnPos.x + width / 2, algnPos.y);
                      ctx.lineTo(algnPos.x + width / 2, algnPos.y + height);
                  }
                  ctx.stroke();
              } 
          }
        }
          
    });

    //Create a new ST instance
    var st = new $jit.ST({
        injectInto: 'infovis',
        orientation: 'bottom',
        //set duration for the animation
        duration: 800,
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 60,
        //set max levels to show. Useful when used with
        //the request method for requesting trees of specific depth
        levelsToShow: 1,
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        Navigation: {
          enable:true,
          panning:true
	},
        Node: {
            height: 20,
            width: 40,
            //use a custom
            //node rendering function
            type: 'nodeline',
            color:'#23A4FF',
            lineWidth: 2,
            align:"center",
            overridable: true
        },
        
        Edge: {
            type: 'bezier',
            lineWidth: 2,
            color: '#ccc',
            // color:'#23A4FF',
            overridable: true
        },
        
        //Add a request method for requesting on-demand json trees. 
        //This method gets called when a node
        //is clicked and its subtree has a smaller depth
        //than the one specified by the levelsToShow parameter.
        //In that case a subtree is requested and is added to the dataset.
        //This method is asynchronous, so you can make an Ajax request for that
        //subtree and then handle it to the onComplete callback.
        //Here we just use a client-side tree generator (the getTree function).
        request: function(nodeId, level, onComplete) {
          var ans = getTree(nodeId, level);
          onComplete.onComplete(nodeId, ans);  
        },
        
        onBeforeCompute: function(node){
            Log.write("loading " + node.name);
            // showSpinner();
        },
        
        onAfterCompute: function(){
            Log.write("done");
            hideSpinner();
        },
        
        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function(label, node){
            label.id = node.id;            
            label.innerHTML = node.name;
            label.onclick = function(){
                st.onClick(node.id);
            };
            //set label styles
            var style = label.style;
            style.width = 40 + 'px';
            style.height = 17 + 'px';            
            style.cursor = 'pointer';
            // style.color = 'black';
    	    // style.backgroundColor = '#1a1a1a';
            style.fontSize = '12px';
            style.textAlign= 'center';
            style.textDecoration = 'underline';
            style.paddingTop = '0';
        },
        
        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function(node){
            //add some color to the nodes in the path between the
            //root node and the selected node.
            if (node.selected) {
                node.data.$color = "#ff7";
                // (jul) focus
                // node.data.$color = "#23A4FF";
                
            }
            else {
                delete node.data.$color;
            }
        },
        
        //This method is called right before plotting
        //an edge. It's useful for changing an individual edge
        //style properties before plotting it.
        //Edge data proprties prefixed with a dollar sign will
        //override the Edge global style properties.
        onBeforePlotLine: function(adj){
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                // adj.data.$color = "#eed";
		// jul: selected path line color 
		adj.data.$color = "#23A4FF";
                adj.data.$lineWidth = 3;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        }
    });
    //load json data
    st.loadJSON(eval( '(' + json + ')' ));
    //compute node positions and layout
    st.compute();
    //emulate a click on the root node.
    st.onClick(st.root);
   


}


;/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) { throw new Error("Bootstrap requires jQuery") }

/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#affix
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(window.jQuery);

;
//# sourceMappingURL=vendor.js.map