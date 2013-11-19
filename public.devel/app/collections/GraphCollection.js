/**
 * Base Class for all Backbone Collections
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */
var GraphModel = require('models/GraphModel');
var Collection = require('core/Collection');

var GraphCollection = Collection.extend({

	//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------

	//--------------------------------------
	//+ INHERITED / OVERRIDES
	//--------------------------------------
	url: '/api/test',
	
	//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
  	model: GraphModel,
  	//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
	parse: function (response){
	    // console.log('Parse at GraphColletion');
    	    // console.dir(response);
    	    
	    this.deferred = this.fetch();
            return response;
	}
	
  	//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------

});

module.exports = GraphCollection;
