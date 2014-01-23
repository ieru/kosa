/**
 * Base Class for all Backbone Collections
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */
var OntologiesModel = require('models/OntologiesModel');
var Collection = require('core/Collection');

var OntologiesCollection = Collection.extend({

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
  	model: OntologiesModel,
  	//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
	parse: function (response){
	    // console.log('Parse at GraphColletion');
    	    // console.dir(response);
            return response;
	}
	
  	//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------

});

module.exports = OntologiesCollection;
