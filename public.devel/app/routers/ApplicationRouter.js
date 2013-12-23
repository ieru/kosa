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

      ""					: "home",
      "admin"					: "login",
      "api/getnarrowerconcepts/:node"		: "getNarrowerConcepts",
      "api/test"				: "test"
    },


  	//--------------------------------------
  	//+ Route Handlers
  	//--------------------------------------

    home: function() {
      $( 'body' ).html( application.homeView.render().el );
    },

    login: function() {
      $( 'body' ).html( application.loginView.render().el );
    },
    
    getNarrowerConcepts: function (node){
    },
    
    test: function () {  
    }
  });


 module.exports = ApplicationRouter;
