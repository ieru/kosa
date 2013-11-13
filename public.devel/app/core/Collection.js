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
      return response.id
    }
  	//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------

});

module.exports = Collection;