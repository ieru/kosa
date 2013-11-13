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
