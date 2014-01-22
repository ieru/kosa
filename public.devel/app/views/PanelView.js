/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View     = require('core/View');
var PanelTemplate = require('templates/PanelTemplate');
var OntologiesTemplate = require('templates/ontologies');

var PanelView = View.extend({

  	/*
   	 * @private
	 */
	id: 'home-view',
	/*
   	 * @private
   	*/
	template: PanelTemplate,
	ontologiesTemplate: OntologiesTemplate,


	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------

	/*
	 * @private
	 */
	initialize: function() {
		_.bindAll( this );
	},

	/*
	 * @private
	 */
	 
	events: {
	},

	render: function() {
		this.$el.html( this.template({}));
		return this;
	},
	
	
	    
	//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------

	//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------

	//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------

});

module.exports = PanelView;

