(function (d3, window, document) {
var w = 960,
    h = 2000,
    i = 0,
    duration = 500,
    root;

var tree = d3.layout.tree()
    .size([h, w - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var vis = d3.select("#navigational")
   .append("svg:svg")
    .attr("id", "diagram") 
    .attr("width", w)
    .attr("height", h)
    // .attr("viewBox", "0 0 960 500")
    // .attr("preserveAspectRatio", "xMidYMid")
   .append("svg:g")
    .attr("transform", "translate(40, 0)");



d3.json("assets/json/test_data2.json", function(json) {
  json.x0 = 800;
  json.y0 = 0;
  update(json);
});

function update(json) {

  var nodes = tree.nodes(json);
  
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes))
    .enter().append("svg:path")
      .attr("class", "link")
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

/*
  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

*/
  var node = vis.selectAll("g.node")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("svg:circle")
      .attr("r", 4.5);

  node.append("svg:text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.name; });



  // Transition nodes to their new position.
  node.transition()
      .duration(duration)
      .attr("cx", function(d) { return d.y; })
      .attr("cy", function(d) { return d.x; })
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#222"; });


/*
  // Transition exiting nodes to the parent's new position.
  node.exit().transition()
      .duration(duration)
      .attr("cx", function(d) { return source.y; })
      .attr("cy", function(d) { return source.x; })
      .remove();
*/


  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
  

};

/*
d3.json("assets/json/test_data2.json", function(json) {
  json.x0 = 800;
  json.y0 = 0;
  update(root = json);
});

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();

  // Update the nodes.
  var node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });


  // Update the links.
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes), function(d) { return d.target.id; });


  // Enter any new links at the parent's previous position.
  link.enter().insert("svg:path", "circle")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();




  // Enter any new nodes at the parent's previous position.
  node.enter()  
     .append("svg:g")
      .attr("class", "node")
      .attr("transform", "translate(40,0)")
     .append("svg:circle")
      .attr("cx", function(d) { return source.y0; })
      .attr("cy", function(d) { return source.x0; })
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
    .append("svg:text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.name; })
    .on("click", click)
      .transition()
      .duration(duration)
      .attr("cx", function(d) { return d.y; })
      .attr("cy", function(d) { return d.x; });


  // Transition nodes to their new position.
  node.transition()
      .duration(duration)
      .attr("cx", function(d) { return d.y; })
      .attr("cy", function(d) { return d.x; })
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  // Transition exiting nodes to the parent's new position.
  node.exit().transition()
      .duration(duration)
      .attr("cx", function(d) { return source.y; })
      .attr("cy", function(d) { return source.x; })
      .remove();



  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
  
}
*/
// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
};

/*
// responsive auto resize with jQuery
var aspect = w / h,
    chart = $("#diagram");
$(window).on("resize", function() {
    var targetWidth = chart.parent().width();
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
});
*/
})(d3, this, this.document);
