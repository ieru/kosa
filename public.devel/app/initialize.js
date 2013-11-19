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
  	
	// Non Backbone apps  	
  	// if ($('#infovis').length > 0) {
  	  // application.graphView.initGraph();
  	  // application.homeView.initSearchBox();
  	// }
});
