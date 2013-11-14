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
  	
  	if ($('#infovis').length > 0) {
  	  application.graph.init();
  	  application.homeView.initSearchBox();
  	}
});
