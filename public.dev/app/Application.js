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

        // Initialize views
        this.homeView = new HomeView();
        this.applicationRouter = new ApplicationRouter();
        

        if (typeof Object.freeze === 'function') Object.freeze(this);
    }
}

module.exports = Application;
