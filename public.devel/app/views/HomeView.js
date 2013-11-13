/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View     = require('core/View');
var template = require('templates/homeViewTemplate');
var Event    = require('events/Event');

var HomeView = View.extend({

  	/*
   	 * @private
	 */
	id: 'home-view',
	/*
   	 * @private
   	*/
	template: template,


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
	
		'click .btn.btn-default.btn-xs'	:		'onTriggerNodeClick'
	},
	
	render: function() {
		this.$el.html( this.template(
		{
		'relatedList': [ 
		{
		'name':'related1',
		'id': 'idd1'
		},
		{
		'name':'related2',
				'id': 'idd2'
		},
		{
		'name':'related3',
		'id': 'idd3'
		}
		]
		
		}));

		return this;
	},
	initSearchBox: function(){

                            // sURL = HMP.core.getCallURL('users_json');
                            sURL = '/api'
                            $("#selector").select2({
                                width: '80%',
                                placeholder: "Search ...",
                                allowClear: true,
                                minimumInputLength: 1,
                                ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                                    url: sURL,
                                    cache: true,
                                    dataType : 'json',
                                    data: function (term, page) {
                                        return {
                                            q: term
                                        };
                                    },
                                    results: function (data, page) {
                                        return {
                                            results: data
                                        };
                                    }
                                },
                                formatResult: function(item) {
                                    return "aaa";
                                },
                                formatSelection: function(item) {
                                    return "bbbb";
                                },
                                id: function (obj) {
                                  return "aaaa";
                                },
                                dropdownCssClass: "bigdrop"
                                // escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
                            });
		
	},
	
	    
	//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------

	//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------
	
	onTriggerNodeClick: function () {
	    
	    alert('trigger test');
	}
	
	//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------

});

module.exports = HomeView;

