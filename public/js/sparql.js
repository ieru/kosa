(function ($, window, document, undefined ) {

var default_query = "\
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns\#>\
\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema\#>\
\n\
\nSELECT * WHERE {\
\n  \?s \?p \?o\
\n} LIMIT 50\
";
  
  // reset default text
  $("#clear").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $("#query").val(default_query);

    $("#result").html('\
      <div class="bs-callout bs-callout-warning">\
      <h4>Results</h4>\
      <p>No results yet. Run Query!</p>\
      </div>');

  });

  // send query to sparql api
  $("#run").on("click", function (e) {
    var query;
    e.stopPropagation();
    e.preventDefault();
    
    query = $("#query").val();
    
   $.ajax({
     type: "POST",
     url: "api/sparqlQuery",
     data: { q: query },
     success: function (m) {
       
       $("#result").html('\
      <div class="bs-callout bs-callout-info">\
      <h4>Results</h4>\
      <p>'+m+'</p>\
      </div>');

       // console.log(m);
       
     },
     error: function (m) {
     
       $("#result").html('\
      <div class="bs-callout bs-callout-danger">\
      <h4>Error</h4>\
      <p>The query could not be performed.</p>\
      </div>');
                        
     }
   });

  });

})(jQuery, this, this.document);
