/**
 * Base Class for all Backbone Models
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var Model = require('core/Model');

var GraphModel = Model.extend({

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
  		id: 'root',
  		name: 'root',
		children: [],
		related: [],
		pages:0,
		page:1,
		related_count:0
	}

  	//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------

  	//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
  
});

module.exports = GraphModel;
