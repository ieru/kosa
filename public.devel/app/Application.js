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

        // Import views
        var HomeView = require('views/HomeView');
        var ApplicationRouter = require('routers/ApplicationRouter');


        // Import Navigational
        var Graph = require('canvas/Graph');

        // Initialize views
        this.homeView = new HomeView();
        this.applicationRouter = new ApplicationRouter();

        // Initialize Navigational
        this.graph = new Graph;

        if (typeof Object.freeze === 'function') Object.freeze(this);
    }
}

module.exports = Application;
