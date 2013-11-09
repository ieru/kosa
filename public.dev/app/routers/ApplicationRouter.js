/**
 * Backbone Primary Router
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var Router = require('core/Router');
var application = require('Application');

var ApplicationRouter = Router.extend({

	//--------------------------------------
  	//+ Routes
  	//--------------------------------------
  	
  	routes: {
      '': 'home'
  	},

  	//--------------------------------------
  	//+ Route Handlers
  	//--------------------------------------

  	home: function() {
      $( 'body' ).html( application.homeView.render().el );
  	}
});

module.exports = ApplicationRouter;