/**
 * View Base Class
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View = Backbone.View.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  /*
   * @private
   */
  template: function() {},
  

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
  render: function() {
    this.$el.html( this.template() );
    
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

module.exports = View;
