(function ($, window, document, undefined ) {

var default_query = "\
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns\#>\
\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema\#>\
\n\
\nSELECT * WHERE {\
\n  \?s \?p \?o\
\n} LIMIT 50\
";

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
  
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
    	    <h4>Results</h4><pre>'+syntaxHighlight(m)+'</pre></div>');

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
