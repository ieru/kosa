/**
 * Handlebars Template Helpers
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

/*
* @return String
*/
Handlebars.registerHelper( 'link', function( text, url ) {

  text = Handlebars.Utils.escapeExpression( text );
  url  = Handlebars.Utils.escapeExpression( url );

  var result = '<a href="' + url + '">' + text + '</a>';

  return new Handlebars.SafeString( result );
});
