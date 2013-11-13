/**
 * Base Class for all Backbone Collections
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

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
      return response.id
      // console.log("hola");
    }
  	//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------

});

module.exports = Collection;