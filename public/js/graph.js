(function ($, d3, window, document, undefined) {

var realWidth = window.innerWidth;
var realHeight = window.innerHeight;

var m = [40, 240, 40, 40],
    // w = realWidth - m[0] - m[0],
    w = 980,
    // h = realHeight - m[0] - m[2],
    h = 2000,
    i = 0,
    root;

var tree = d3.layout.tree()
    .size([h, w]);

var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    return [d.y, d.x];
});

var drag = d3.behavior.drag()
    .on("drag", dragndrop);

//var vis = d3.select("#navigational");

var botao = d3.select("#form #button");


var vis = d3.select("#navigational")
    .append("svg:svg")
    .attr("class", "svg_container draggable")
    .attr("width", w)
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h)
    .style("overflow", "scroll")
    .style("background-color", "#EEE")
    .call(drag)
    .append("svg:g")
    .attr("class", "drawarea")
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

hideSpinner();    
    /*
    vis
      .on("load", hideSpinner);
    */


function update(source) {
    var duration = d3.event && d3.event.altKey ? 5000 : 500;

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse();
    // console.warn(nodes)

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 150;
    });

    // Update the nodes.
    var node = vis.selectAll("g.node")
        .data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function (d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
        // return "translate(" + 500 + "," + source.x0 + ")";
    })
        .on("click", function (d) {
          toggle(d);
          update(d);
        });

    nodeEnter.append("svg:circle")
        .attr("r", 4.5)
        .attr("class", function (d) {
           return "level" + d.part_level;
         })
        .style("stroke", function (d) {
        if (d._children) {
            return "#777";
        }})
        /*
        .style("fill", function (d) {
        if (d._children) {
            return "steelblue";
        }});
        */
      
    
    

    nodeEnter.append("svg:text")
        .attr("x", function (d) {
        // return d.children || d._children ? -((Math.sqrt((d.part_cc_p * 1)) + 6) + this.getComputedTextLength()) : Math.sqrt((d.part_cc_p * 1)) + 6;
          return d.children || d._children ? -8  : 8;
        })
        .attr("y", function (d) {
        // return d.children || d._children ? 0 : 0;
          return 0;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function (d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function (d) {
        if (d.part_level > 0) {
            return d.name;
        } else if (d.part_multi > 1) {
            return  d.name + " [" + d.part_multi + "]";
        } else {
            return d.name;
        }
    });
        // .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
        // return "translate(" + 250 + "," + d.x + ")";
    });

    nodeUpdate.select("circle")
    //    .attr("r", function (d) {
    //    return Math.sqrt((d.part_cc_p * 1)) + 4;
    //})
        .attr("r", 4.5)
        .attr("class", function (d) {
        return "level" + d.part_level;
    })
        .style("stroke", function (d) {
        if (d._children) {
            return "steelblue";
        } else {
            return null;
        }
    })
        .style("fill", function (d) {
        if (d._children) {
            return "steelblue";
        } else {
            return null;
        }
    });
    /*
    nodeUpdate.select("text")
        .style("fill-opacity", 1);
    */
    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + source.y + "," + source.x + ")";
    })
        .remove();

    nodeExit.select("circle")
    //    .attr("r", function (d) {
    //    return Math.sqrt((d.part_cc_p * 1)) + 4;
    //});
	.attr("r", 4.5);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links.
    var link = vis.selectAll("path.link")
        .data(tree.links(nodes), function (d) {
        return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link.enter().insert("svg:path", "g")
        .attr("class", "link")
        .attr("d", function (d) {
        var o = {
            x: source.x0,
            y: source.y0
        };
        return diagonal({
            source: o,
            target: o
        });
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
        .attr("d", function (d) {
        var o = {
            x: source.x,
            y: source.y
        };
        return diagonal({
            source: o,
            target: o
        });
    })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    /*
    d3.select("svg")
        .call(d3.behavior.zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", zoom));

    */

};
// Toggle children.
function toggle(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }

};
/*
function zoom() {
    var scale = d3.event.scale,
        translation = d3.event.translate,
        tbound = -h * scale,
        bbound = h * scale,
        lbound = (-w + m[1]) * scale,
        rbound = (w - m[3]) * scale;
    // limit translation to thresholds
    translation = [
    Math.max(Math.min(translation[0], rbound), lbound),
    Math.max(Math.min(translation[1], bbound), tbound)];
    d3.select(".drawarea")
        .attr("transform", "translate(" + translation + ")" +
        " scale(" + scale + ")");
};
*/

// load data using AJAX
$.getJSON("/json/test_data2.json", function(json) {
// d3.json("/json/test_data2.json", function(json) {

    root = json;
    d3.select("#processName").html(root.text);
    root.x0 = h / 2;
    root.y0 = 0;
    
    
    botao.on("click", function () {    
    // toggle(root);
    // update(root);
    var mainLayer = d3.select("#navigational>svg");
       mainLayer
	
     //vis
	.attr("x", 0)
	.attr("y", 0)
	.style("left", "0px")
	.style("top", "0px");

    });

    update(root);
});


function dragndrop(d) {

    var dragTarget = d3.select(this);
    
      // .attr("y", d3.event.y)
      // .attr("x", d3.event.x)
      // .attr("y", d3.event.sourceEvent.pageY)
      // .attr("x", d3.event.sourceEvent.pageX);
	dragTarget
	    .attr("x", function(){return (d3.event.dx + parseInt(dragTarget.attr("x")))})
	    .attr("y", function(){return (d3.event.dy + parseInt(dragTarget.attr("y")))})
	    .style("left", dragTarget.attr("x")+"px")
	    .style("top", dragTarget.attr("y")+"px");
         // .style("left", function(){return (d3.event.dx + parseInt(dragTarget.style("left")))+"px" })
         // .style("top", function(){return (d3.event.dy + parseInt(dragTarget.style("top")))+"px"})
	 //  console.log(d3.event.dx + parseInt(dragTarget.attr("x")));
	 //  console.log(d3.event.dy + parseInt(dragTarget.attr("y")));

}

function hideSpinner () {
console.log("weee");
 d3.select("#spinner").
   style("display", "none");
}

function showSpinner () {
 d3.select("#spinner").
   style("display", "block");
}

/*
function dragndrop(d) {
    //var drag = d3.select(this);
     d3.select(this)
      .style("top", ((d3.event.sourceEvent.pageY) - this.offsetHeight/2)+"px")
      .style("left", ((d3.event.sourceEvent.pageX) - this.offsetWidth/2)+"px");
      //drag
      //.style("top", ((parseInt(drag.style("top")) + d3.event.sourceEvent.pageY) - this.offsetHeight/2)+"px")
      //.style("left", ((parseInt(drag.style("left")) + d3.event.sourceEvent.pageX) - this.offsetWidth/2)+"px")
}
*/
})(jQuery, d3, this, this.document);

