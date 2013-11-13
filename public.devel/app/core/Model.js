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
  			id: " ",
	  		children: "[]",
	  		related: "[]",
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
