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
require.register("Application", function(exports, require, module) {
/**
 * Application Bootstrapper
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var Application = {

    /**
     * Initialize the app
     * 
     */
    initialize: function() {

        // Import views
        var HomeView = require('views/HomeView');
        var ApplicationRouter = require('routers/ApplicationRouter');

        // Initialize views
        this.homeView = new HomeView();
        this.applicationRouter = new ApplicationRouter();
        

        if (typeof Object.freeze === 'function') Object.freeze(this);
    }
}

module.exports = Application;

});

;require.register("config/ApplicationConfig", function(exports, require, module) {
/**
 * Application Configuration
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var ApplicationConfig = (function() {

	/*
   	 * @private
	 */
	var _baseUrl = "/";

	/*
   	 * Public interface
	 */
	return {
		BASE_URL: _baseUrl
	}

}).call()

module.exports = ApplicationConfig;
});

;require.register("core/Collection", function(exports, require, module) {
/**
 * Base Class for all Backbone Collections
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */
var Model = require('core/Model');

var Collection = Backbone.Collection.extend({

	//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------

	//--------------------------------------
	//+ INHERITED / OVERRIDES
	//--------------------------------------
	
	//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
  	model: Model,
  	//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
    url: '/api/test',
    parse: function (response){
      console.log("hola");
      console.dir(response);
      return response
    }
  	//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------

});

module.exports = Collection;
});

;require.register("core/Model", function(exports, require, module) {
/**
 * Base Class for all Backbone Models
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var Model = Backbone.Model.extend({

	//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------

	//--------------------------------------
	//+ INHERITED / OVERRIDES
	//--------------------------------------
	
	//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
  		defaults:{
  			id: "2",
  			name: " ",
	  		children: [],
	  		related: [],
	  		childrenNumber:0,
	  		relatedNumber:0
        
  		}
  		


  	//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------

  	//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
  
});

module.exports = Model;

});

;require.register("core/Router", function(exports, require, module) {
/**
 * Backbone Primary Router
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var Router = Backbone.Router.extend({

	//--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------
    
	routes: {},

    /**
     * Initializes the Base router
     * @param  {Object} options 
     * 
     */
    initialize: function( options ) {

    }
});

module.exports = Router;
});

;require.register("core/View", function(exports, require, module) {
/**
 * View Base Class
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View = Backbone.View.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  /*
   * @private
   */
  template: function() {},
  

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------
  
  /*
   * @private
   */
  initialize: function() {
    _.bindAll( this );
  },

  /*
   * @private
   */
  render: function() {
    this.$el.html( this.template() );
    
    return this;
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});

module.exports = View;

});

;require.register("events/Event", function(exports, require, module) {
/**
 * General events
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var Event = {
	
	/*
   	 * Public interface
	 */
	APPLICATION_INITIALIZED			: 'onApplicationInitialized',


}

module.exports = Event;
});

;require.register("helpers/ViewHelper", function(exports, require, module) {
/**
 * Handlebars Template Helpers
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

/*
* @return String
*/
Handlebars.registerHelper( 'link', function( text, url ) {

  text = Handlebars.Utils.escapeExpression( text );
  url  = Handlebars.Utils.escapeExpression( url );

  var result = '<a href="' + url + '">' + text + '</a>';

  return new Handlebars.SafeString( result );
});

});

;require.register("initialize", function(exports, require, module) {
/**
 * Application Initializer
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var application = require('Application');

$(function() {

	// Initialize Application
	application.initialize();

	// Start Backbone router
  	Backbone.history.start();
  	
  	// Avoid race conditions
  	if ($('#infovis').length > 0) {
  	  init();
  	  application.homeView.initSearchBox();
  	}
});

});

;require.register("routers/ApplicationRouter", function(exports, require, module) {
/**
 * Backbone Primary Router
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

 var Router = require('core/Router');
 var Collection = require('core/Collection');
 var application = require('Application');

 var ApplicationRouter = Router.extend({

	//--------------------------------------
  	//+ Routes
  	//--------------------------------------
  	
  	routes: {

      ""					: "home",
      "api/getnarrowerconcepts/:node"		: "getNarrowerConcepts",
      "api/test"				: "test"
    },


  	//--------------------------------------
  	//+ Route Handlers
  	//--------------------------------------

    home: function() {

      $( 'body' ).html( application.homeView.render().el );
    },
    
    getNarrowerConcepts: function (node){
      alert('aaaa');
    },
    test: function () {
      
      
      var tree = new Collection();
      // tree.url = '/accounts';
      tree.fetch({
        success: function(response,xhr) {
    	     console.log("Inside success");
    	     console.log(response);
    	},
    	error: function (errorResponse) {
    	    console.log(errorResponse)
    	}
     });
     
    	    		            
    }
  });


 module.exports = ApplicationRouter;

});

;require.register("utils/BackboneView", function(exports, require, module) {
/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View     = require('core/View');
var template = require('templates/HomeViewTemplate');

var BackboneView = View.extend({

  	/*
   	 * @private
	 */
	id: 'view',
	/*
   	 * @private
   	*/
	template: template,
	

	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------

	/*
	 * @private
	 */
	initialize: function() {
		this.render = _.bind( this.render, this );
	},

	/*
	 * @private
	 */
	render: function() {
		this.$el.html( this.template({
			content: "View Content"
		}));

		return this;
	}

	//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------

	//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------

	//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------

});

module.exports = BackboneView;
});

;require.register("views/HomeView", function(exports, require, module) {
/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View     = require('core/View');
var template = require('templates/homeViewTemplate');
var Event    = require('events/Event');

var HomeView = View.extend({

  	/*
   	 * @private
	 */
	id: 'home-view',
	/*
   	 * @private
   	*/
	template: template,


	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------

	/*
	 * @private
	 */
	initialize: function() {
		_.bindAll( this );
	},

	/*
	 * @private
	 */
	 
	events: {
	
		'click .btn.btn-default.btn-xs'	:		'onTriggerNodeClick',
		'click .breadcrumb-click'	:		'onBreadcrumbClick'
	},
	
	render: function() {
		this.$el.html( this.template(
		{
		'relatedList': [ 
		{
		'name':'related1',
		'id': 'idd1'
		},
		{
		'name':'related2',
				'id': 'idd2'
		},
		{
		'name':'related3',
		'id': 'idd3'
		}
		],
		'breadcrumb': [ 
		{
		'name':'node1',
		'id': 'node13'
		},
		{
		'name':'node2',
		'id': 'node125'
		},
		{
		'name':'node3',
		'id': 'node165'
		}
		],
		
		
		
		}));

		return this;
	},
	initSearchBox: function(){

                            // sURL = HMP.core.getCallURL('users_json');
                            sURL = '/api'
                            $("#selector").select2({
                                width: '80%',
                                placeholder: "Search ...",
                                allowClear: true,
                                minimumInputLength: 1,
                                ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                                    url: sURL,
                                    cache: true,
                                    dataType : 'json',
                                    data: function (term, page) {
                                        return {
                                            q: term
                                        };
                                    },
                                    results: function (data, page) {
                                        return {
                                            results: data
                                        };
                                    }
                                },
                                formatResult: function(item) {
                                    return "aaa";
                                },
                                formatSelection: function(item) {
                                    return "bbbb";
                                },
                                id: function (obj) {
                                  return "aaaa";
                                },
                                dropdownCssClass: "bigdrop"
                                // escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
                            });
		
	},
	
	    
	//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------

	//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------
	
	onTriggerNodeClick: function () {
	    
	    alert('trigger test');
	},

	onBreadcrumbClick: function (e) {
	
	    e.stopImmediatePropagation();
	    
	    var dataId = $(e.currentTarget).data('id');
	    // var id = clickedEl.attr("id");
	    // $('#'+e.target.id).trigger('click');
	
	    console.log(dataId);
	    $('#'+dataId).trigger('click');
	    
	    //e.preventDefault();
	    //e.stopImmediatePropagation();
	    
	
	}

	
	//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------

});

module.exports = HomeView;


});

;
//# sourceMappingURL=app.js.map