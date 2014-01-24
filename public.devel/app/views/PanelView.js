/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View     = require('core/View');
var OntologiesCollection = require('collections/OntologiesCollection');

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
        
        collection: {},

	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------

	/*
	 * @private
	 */
	initialize: function() {
		this.collection = new OntologiesCollection();
		this.initPanel();
		_.bindAll( this );
	},

	/*
	 * @private
	 */
	 
	events: {
	},

	render: function() {
		this.initPanel();
		this.$el.html( this.template({}));
		this.$el.find('#ontologies').html(this.ontologiesTemplate({'ontologies':this.ontologies}));
		return this;
	},
	
	/* for prefetching and synchronizing. executed once at start */
	initPanel: function() {

	    var self = this;


	    self.collection.url = '/api/getontologies';
	    self.collection.fetch().done(function() {

		self.ontologies = self.collection.toJSON();
    		/*if (root.length > 0 && typeof root[0].name !== 'undefined') {

        	    // self.rootLabel = root[0].name;
    		}*/

    		// once we have root node we get its children
    		/*
    		self.collection.url = '/api/getnarrowerconcepts?uri=' + self.customEncode(self.currentUri) +'&lang='+self.currentLang +'&a='+self.unCacheString;
    		self.collection.fetch().done(function() {

        	    // self.afterRender();

    		}).fail(function (){
        	    self.Spinner.hide();
        	    self.Log.write('Error retrieving data');
    		});
    		*/



    	    }).fail(function (){
    		
    		self.ontologies = {};
    		// self.Spinner.hide();
    		// self.Log.write('Error retrieving data');
    	    });
    	    return self;

	}

	    
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

