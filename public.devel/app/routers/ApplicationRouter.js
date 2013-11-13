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
      
      
      var tree = new application.Collection();
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
