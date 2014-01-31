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
      /*"admin"					: "login",*/
      /*"sparql"				: "sparql",*/
      /*"panel"					: "panel",*/

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

    sparql: function() {
      $( 'body' ).html( application.sparqlView.render().el );
    },

    panel: function() {
      $( 'body' ).html( application.panelView.render().el );
    },
    
    getNarrowerConcepts: function (node){
    },
    
    test: function () {  
    }
  });


 module.exports = ApplicationRouter;
