/**
 * Application Bootstrapper
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var Application = {

    /**
     * Initialize the app
     * 
     */
    initialize: function() {

        // Imports
        var HomeView = require('views/HomeView');
        var ApplicationRouter = require('routers/ApplicationRouter');
        var Events = require('events/Event');
        // var GraphView = require('views/GraphView');
        var GraphCollection = require('collections/GraphCollection');

        // Initialize
        // this.graphView = new GraphView();
        this.homeView = new HomeView();
        this.applicationRouter = new ApplicationRouter();

        
        /* 
        if ($('#infovis').length > 0) {
        this.graph.init();
        this.homeView.initSearchBox();
        }
        */


        if (typeof Object.freeze === 'function') Object.freeze(this);
    }
}

module.exports = Application;
