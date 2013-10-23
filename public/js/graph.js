(function ($, d3, _, window, document, undefined) {

// var realWidth = $(window).width();
// var realHeight = $(window).height();

var realWidth = $('#navigational').innerWidth();
var realHeight = $('#navigational').innerHeight();

// CONSTANTS
var X_INCREMENT = 200, Y_INCREMENT = 200;

var m = [-650, 600, 10, 40],
    w = realWidth,
    h = realHeight+m[1],
    // h = 4000,
    i = 1000,
    root;

var tree = d3.layout.tree()
    .size([h, w]);

var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    var a, b;
    a = d.x;
    b = d.y * -1;
    return [a, b];
});

var drag = d3.behavior.drag()
    .on("drag", dragndrop);

var botao = d3.select("#form #button");


var vis = d3.select("#navigational")
    .append("svg:svg")
    .attr("id", "viewbox")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("version", "1.1")
    .attr("class", "svg_container draggable")
    .attr("width", w+"px")
    .attr("height",(h-m[1])+"px")
    .attr("viewBox", '0 0 '+ w +' '+ parseInt(h-m[1]))
    .attr("preserveAspectRatio", "xMidYMax meet")
    // .attr("preserveAspectRatio", "none")
    .attr("x", 0)
    .attr("y", 0)
    // .attr("viewBox", '0 0 '+ w +' '+ parseInt(h))
    // .attr("preserveAspectRatio", "xMidYMin slide")
    // .attr("preserveAspectRatio", "none")
    // .style("overflow", "scroll")
    .style("background-color", "#EEE")
    .call(drag)
    .append("svg:g")
    .append("svg:g")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height","100%")
    .attr("class", "transformable")
    .attr("transform", "translate(" + m[3] + "," +  m[0] + ")");

// var svg = document.getElementsByTagName('svg')[0];
var svg = d3.select("svg#viewbox");

hideSpinner();    


function update(source) {
    
    var duration = d3.event && d3.event.altKey ? 5000 : 500;
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse();

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {

         // var vv = vis.select("g.transformable").
         // attr("transform", "translate(" + w/2 + ", "+ m[0] + 200+ ")");         
         // console.dir(vv);
         // console.log("w: "+ w + "m: "+ (m[0]+200));
         

         
         // console.log(midWidth+ ' --- ' + d.x);
         // console.dir(d);
         
         // d.x0 = (midWidth - d.x);
         
         d.y = (h * -1) + (d.depth * Y_INCREMENT);
         // vis.select("svg:svg");
         
         
                                                                                                                                                     
         // console.dir(d);

         
     /**
     vis
    .attr("x", w / 2)
    .attr("y", function(){ h / 2})
    .style("left", dragTarget.attr("x")+"px")
    .style("bottom", (dragTarget.attr("y") * -1) +"px");
    **/

     });



    // Update the nodes.
    var node = vis.selectAll("g.node")
        .data(nodes, function (d) {
        // console.dir(d);
        return d.nid || (d.nid = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function (d) {
            var a,b;
            a = source.x0;
            b = source.y0 * -1;
            
            return "translate(" + a + ", " + b + ")";
    })
        .on("click", function (d) {
          
          getChildren(d, d.id, 'en');
                      
          // toggle(d);
          // update(d);
        });

    nodeEnter.append("svg:circle")
        .attr("r", function (d) {
        if (typeof d.children != 'undefined' || d.has_children === 1) {
            return 6;
        } else {
            return 4.5;
        }})
        // .attr("r", 4.5)
        .attr("class", function (d) {
           return "level" + d.part_level;
         })
        .style("stroke", function (d) {
        if (d._children || d.has_children === 1) {
            return "#777";
        } else {
            return "#ccc";
        }})
        .style("fill", function (d) {
        if (d._children || d.has_children === 1) {
            // return "#777";
            return "steelblue";
        } else {
            return "#ccc";
        }});
        
        
      
    
    

    nodeEnter.append("svg:text")
        .attr("y", function (d) {
        // return d.children || d._children ? -((Math.sqrt((d.part_cc_p * 1)) + 6) + this.getComputedTextLength()) : Math.sqrt((d.part_cc_p * 1)) + 6;
          return (d.nid % 2 === 0) ? 14 : 26;
        })
        .attr("x", function (d) {
        // return d.children || d._children ? 0 : 0;
          return 0;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function (d) {
          return "middle";
        })
        // .attr("fill", "#eee")
        .text(function (d) {
           var extraDataString = ( typeof d.children == 'object' ) ? ' (+'+d.children.length+')' : '';
           // return (d.name.length < __MAXTERMLENGTH) ? d.name + extraDataString : d.name.substr(0,__MAXTERMLENGTH) + '...'+ extraDataString;
           return d.name + extraDataString;
        });
        // rotate text 90 degrees
        //.attr("transform", function(d) {
        //  return "rotate(-90)";
        // });
        // .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
          var x,y;
          x = d.x;
          y = d.y * -1;
          return "translate(" + x + ", " + y + ")";
    });

    nodeUpdate.select("circle")
        .attr("r", function(d) {
        if (typeof d.children != 'undefined' || d.has_children === 1) {
            return 6;
        } else {
            return 4.5;
        }
        
        })
        .attr("class", function (d) {
        return "level" + d.part_level;
        })
        .style("stroke", function (d) {
          if (d._children || d.has_children === 1 || d.depth === 0) {
              return "#31628B";
          } else {
              return "#aaa";
          }
        })
        .style("fill", function (d) {
          if (d._children || d.has_children === 1 || d.depth === 0) {
              return "steelblue";
          } else {
              return "#ccc";
          }
        });
    
    // nodeUpdate.select("text")
    //    .style("fill-opacity", 1);
    
    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
          var x, y;
          x = source.x;
          y = source.y * -1;
        
          return "translate(" + x + "," + y + ")";
        })
        .remove();

    nodeExit.select("circle")
        .attr("r", function(d) {
        if (d._children || d.has_children === 1) {
            return 6;
        } else {
            return 4.5;
        }
        });

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links.
    var link = vis.selectAll("path.link")
        .data(tree.links(nodes), function (d) {
        return d.target.nid;
    });

    // Enter any new links at the parent's previous position.
    link.enter().insert("svg:path", "g")
        .attr("class", function(d){
        if (d.target._children || d.target.has_children === 1) {
            return "link has_children";
        } else {
            return "link";
        }})
        .attr("stroke-dasharray", "3,3")
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
            y: source.t
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

    /**
     * Zoom feature replaced by drag and drop 
     *
     
    d3.select("svg")
        .call(d3.behavior.zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", zoom));

    */

};

// Toggle children.
function toggle(d) {
  if (d.has_children === 1) {     
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
  }
};

/**
 *
 * Zoom feature. not responsive, removed
 *
 * 
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
**/


function getRoot(node, lang) {
  showSpinner();

  $.ajax({
     dataType:"json",
    url: "/api/gettopconcepts?node="+encodeURIComponent(node)+"&lang="+encodeURIComponent(lang),
    success: function(json) {
        var isJsonArrayValid = false;
   
        if (typeof json == 'object' && json.id != undefined && json.name != undefined) {
          isJsonArrayValid = true;                    
        }

        json.children = null;
        root = json;
        
        
        hideSpinner();
        if (isJsonArrayValid) {

          getRootChildren(json, 'en');
        } else {          

          rootUpdate();
        }

      },
      error: function(e) {
        hideSpinner();
        console.warn('There was an error retrieving data.');
      }
    });
}

function resizeViewBox() {
    // console.dir(svg);

    var viewW, viewH;
    var params = svg.attr('viewBox');
    // var viewPortW = svg.attr('width');
    var viewPortH = svg.attr('height');
    var incrementedH, calculatedH;
         
    // remove min-x
    params = params.substring(params.indexOf(' ') + 1, params.length);
    // remove min-y
    params = params.substring(params.indexOf(' ') + 1, params.length);
    // get width
    viewW = parseInt(params.substring(0, params.indexOf(' ')));
    // viewH = parseInt(params.substring(params.indexOf(' ') + 1, params.length));                    
         
         
    // svg.attr("width",  (viewPortW + X_INCREMENT) + "px" );
    incrementedH = (parseInt(viewPortH) + Y_INCREMENT);
    // position of viewBox in relatio of preseveAspectRatio_YMax
    calculatedH = incrementedH / 2 + Y_INCREMENT + (Y_INCREMENT / 2);
    
    // preserveAspectRatio_YMid
    // calculatedH = 50;
    

    svg.attr("viewBox", "0 0 "+ viewW + " " + calculatedH);
    svg.attr("height", incrementedH +"px" );

}

function getChildren(subTree, searchText, lang) {
  showSpinner();

  $.ajax({
    dataType:"json",
    url: "/api/getnarrowerconcepts?node="+encodeURIComponent(searchText)+"&lang="+encodeURIComponent(lang),
    success: function(childs) {
      
      hideSpinner();
      
      if (typeof subTree == 'undefined' || subTree === null) {
        return; 
      }
      
      subTree.children = childs;
      
      update(subTree);
      update(subTree.children);
      resizeViewBox();
      resizeViewBox();
      

    },
    error: function(e) {
      hideSpinner();
      console.warn('There was an error retrieving data.');
    }
  });
}

function getRootChildren(json, lang) {
  showSpinner();

  $.ajax({
    dataType:"json",
    url: "/api/getnarrowerconcepts?node="+encodeURIComponent(json.id)+"&lang="+encodeURIComponent(lang),
    success: function(childs) {

      hideSpinner();

      if (childs === null) {
        return;
      }
      root.children = childs;
      rootUpdate();

    },
    error: function(e) {
      hideSpinner();
      console.warn('There was an error retrieving data.');
    }
  });
}


function rootUpdate() {

    d3.select("#processName").html(root.text);
    root.x0 = 0;
    root.y0 = 0;
    
    
    botao.on("click", function () {    
      // toggle(root);
      // update(root);
      var mainLayer = d3.select("#navigational>svg");
      mainLayer
	.attr("x", 0)
	.attr("y", 0 )
	.style("left", "0px")
	.style("top", "0px");

    });

    update(root);
    resizeViewBox();  
}


function dragndrop(d) {

  var dragTarget = d3.select(this);

  dragTarget
    .attr("x", function(){return (d3.event.dx + parseInt(dragTarget.attr("x")))})
    .attr("y", function(){return (d3.event.dy + parseInt(dragTarget.attr("y")))})
    .style("left", dragTarget.attr("x")+"px")
    .style("top", dragTarget.attr("y") +"px");
    // .style("bottom", (dragTarget.attr("y") * -1) +"px");
    
    
    

}

function hideSpinner () {

 d3.select("#spinner").
   style("display", "none");
}
function showSpinner () {

 d3.select("#spinner").
   style("display", "block");
}


/**
 * JS init()
 *
 */

$.ajaxSetup({ cache: true });
getRoot('nonExistentNode', 'en');

})(jQuery, d3, _, this, this.document);

