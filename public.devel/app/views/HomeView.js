/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */


 var View     = require('core/View');
 var GraphCollection = require('collections/GraphCollection'); 

 var HomeTemplate = require('templates/HomeTemplate');
 var RelatedsTemplate = require('templates/relateds');
 var BreadcrumbTemplate = require('templates/breadcrumb');
 var LanguagesTemplate = require('templates/languages');

 var HomeView = View.extend({

  	/*
   	 * @private
   	 */
   	 id: 'home-view',
	/*
   	 * @private
   	 */
   	 homeTemplate: HomeTemplate,
   	 relatedsTemplate: RelatedsTemplate,
   	 breadcrumbTemplate: BreadcrumbTemplate,
   	 languagesTemplate: LanguagesTemplate,

   	 currentNode:'c_4788',
   	 currentLang:'EN',
   	 currentLanguage: 'English',

	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------

	/*
	 * @private
	 */
	 
	 events: {

	 	'click .related-click'	:		'onTriggerNodeClick',
	 	'click .breadcrumb-click':		'onBreadcrumbClick'
	 },

	/*
	 * @private
	 */



	 initialize: function() {




	
	    this.collection = new GraphCollection();
            // this.once('getNewNode', this.getNewNode);
            
            this.initNavigational();
            // this.collection.on('reset', this.getNewNode, this.currentNode);
	    // this.router = new Router();
	    // this.render();
	    _.bindAll( this );


	},


	render: function() {
		var self = this;

		var homeTemplate = this.homeTemplate();
		var relatedsTemplate = this.relatedsTemplate({'related':[]});
		var breadcrumbTemplate = this.breadcrumbTemplate({'breadcrumb':[]});


		self.$el.html(homeTemplate);
		// commented out
		// self.$el.find('#related-container').html(relatedsTemplate);
		self.$el.find('#breadcrumb-container').html(breadcrumbTemplate);

		$.get('/json/languages.json', function(data) {
			var languagesTemplate = self.languagesTemplate({'languages':data});
			self.$el.find('#language-container').html(languagesTemplate);    
			self.initLanguages();
		});

     // $.when(self.$el.html(homeview)).then(function (data, self) {
     // });


    	    return self;
    	},


    	getNewSubtree: function(nodeId, pag) {
    		var self = this;
    		var data;
    		if (typeof nodeId == 'undefined') {
    			nodeId = self.currentNode;
    		}
    		if (typeof pag == 'undefined') {
    		  pag = 0;
    		}
    		self.collection.url = '/api/getnarrowerconcepts?node=' + nodeId + '&lang='+self.currentLang+ '&pag='+pag;
    	    // set Backbone synchronous
    	    self.collection.fetch({async:false})
    	    .done(function() {

    	    	data = self.collection.toJSON();

	    })
    	    .fail(function (){
    	    	self.Spinner.hide();
    	    	self.Log.write('Error retrieving data');
    	    	data = {};

    	    }); 

    	    if (typeof data == 'object' && data.length > 0){
		/*
    	        var json = data[0];
    	        if (json.id === 'undefined') {
    	           json.name = 'root';
    	           json.id = self.currentNode;
    	        }*/
    	    	return data[0];
    	    	
    	    } else {
    	    	return {};
    	    }



    	},

    	redrawRelated: function(newRelated){
    		$("#relateds").empty();
    		var relatedNumber = newRelated.length;
    		var relatedElementWidth = 150;
    		var relatedSpace = relatedNumber*relatedElementWidth;
    		var canvasWidth = $(window).innerWidth();
    		var relatedSpaceBeginning = canvasWidth/2 - relatedSpace/2;
    		var relatedHeight = 350;
    		var radioDiff = 14;

                var graphReference = this.graph;
                console.dir(this.graph);
                var canvas = this.graph.canvas;
    	        graphReference.fx.edgeHelper.line.render({ x: 10, y: 30 }, { x: 10, y: 50 }, canvas); 
    		
    		for (var i = 0; i < relatedNumber; i++) {
    			var relHeight = relatedHeight + radioDiff * Math.round(Math.pow(Math.abs(i-relatedNumber/2), 1.1));
    			var relWidth = Math.floor(relatedSpaceBeginning + i*relatedElementWidth);
    			$("#relateds").append('<div class="related-label" style="top:' + relHeight + 'px; left:' + relWidth + 'px">' + newRelated[i].name + '</div>');

                        // graph.edgeHelper.line.render({ x: 10, y: 30 }, { x: 10, y: 50 }, canvas); 
    			// test.moveTo(100,100);
    			// test.lineTo(relWidth,relHeight);
    			// test.stroke();
    			// this.graph.canvas.getContext("2d").moveTo(100,100);
    			// this.graph.canvas.getContext("2d").lineTo(relWidth,relHeight);
    			// this.graph.canvas.getContext("2d").stroke;
    		};
    		

    	},
    	initLanguages: function () {     
    		function format(state) {
    			if (!state.id) {
    				return state.text; 
    			}
    			return "<img class='flag' width='16' height='16' src='images/flags/" + state.id.toLowerCase() + ".png'/>"+ state.text;
    		}
    		$("#language").select2({
    			formatResult: format,
    			formatSelection: format,
    			width: '100%',
    			escapeMarkup: function(m) { return m; }
    		});
    		$('#language').select2("val", this.currentLang.toLowerCase()); 

    		$('#language').on('change', this.changeLanguage);
    	},

    	changeLanguage: function (e) {
    		self = this;
    		self.currentLang = e.val.toUpperCase();
         // self.currentLanguage = e.text;
          self.Log.write('Changed language, graph re-started');
	  // Saying hello to garbage collection
	  self.graph = undefined;
	  $('#infovis').html('');
	  $('#infovis').css('height', '500px');
	  // .append('<div id="spinner" class="text-center" style="display:none;"><img src="/images/spinner.gif" height="66" width="66" style="width:66px;height:66px;" title="loading"></div>');
	  self.initNavigational();
	
	      
          // self.Log.write('Re-setting language');
          setTimeout(function() {
	    // $('#infovis').append('<div id="spinner" class="text-center" style="display:none;"><img src="/images/spinner.gif" height="66" width="66" style="width:66px;height:66px;" title="loading"></div>');
            self.Log.done();
          }, 3400);
          // return self;
},


initNavigational: function() {
	var self = this;


	self.collection.url = '/api/getnarrowerconcepts?node=' + self.currentNode+'&lang='+self.currentLang;
	self.collection.fetch().done(function() {
		// var data = self.collection.toJSON();
		// data.name = 'root';
		// data.id = self.currentNode;
          // console.log( JSON.stringify( data, '', '  ' ) );
          self.afterRender();
      }).fail(function (){
      	self.Spinner.hide();
      	self.Log.write('Error retrieving data');
      }); 
      return self;
  },


  afterRender: function () {

  	if (!this.json) { 
  	  this.initializeScreen();
  	}
  	this.initSearchBox();
  	
  	this.draw();
  },

        
            
	initSearchBox: function(){
                // sURL = HMP.core.getCallURL('users_json');
                sURL = '/api'
                $("#selector").select2({
                	width: '100%',
                	placeholder: "Search ...",
                	allowClear: true,
                	minimumInputLength: 3,
                        ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                        url: sURL,
                        cache: true,
                        dataType : 'json',
                        data: function (term, page) {
                        	return {
                        		q: term
                        	};
                        },
                        results: function (data, page) {
                        	return {
                        		results: data
                        	};
                        }
                    },
                                /*
                                formatResult: function(item) {
                                    return "aaa";
                                },
                                formatSelection: function(item) {
                                    return "bbbb";
                                },
                                id: function (obj) {
                                  return "aaaa";
                                },
                                */
                                dropdownCssClass: "bigdrop"
                                // escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
                            });

},


	//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------
	
	//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------
	
	onTriggerNodeClick: function (e) {


	    e.stopImmediatePropagation();
	    
	    var dataId = $(e.currentTarget).data('id');
	    // this.currentNode = dataId;
	    // this.draw();
	    $('#'+dataId).trigger('click');

	},

	onBreadcrumbClick: function (e) {

	    e.stopImmediatePropagation();

		var dataId = $(e.currentTarget).data('id');
	    // var id = clickedEl.attr("id");
	    // $('#'+e.target.id).trigger('click');

	    console.log(dataId);
	    $('#'+dataId).trigger('click');
	    
	    //e.preventDefault();
	    //e.stopImmediatePropagation();
	    

	},


	//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------


        //----------------------------------------------------------
        //+ JavaScript InfoVis Toolkit http://philogb.github.io/jit/
        //----------------------------------------------------------


        /*
         * @private
         */

         labelType : false, 
         useGradients: false, 
         nativeTextSupport: false, 
         animate: false, 
         graph: false,
         json: false,

         breadCrumbs: null,



        //--------------------------------------
        //+ PUBLIC ATTRIBUTES
        //--------------------------------------


        //--------------------------------------
        //+ PUBLIC METHODS
        //--------------------------------------

        updateRelated: function (newRelated){


        	var relatedsTemplate = this.relatedsTemplate({'related':newRelated});

                // commented out
                // this.$el.find('#related-container').html(relatedsTemplate);
       },

       initializeScreen: function () {
       
       	var ua = navigator.userAgent,
	iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
	typeOfCanvas = typeof HTMLCanvasElement, 
	nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
	textSupport = nativeCanvasSupport && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');

           //I'm setting this based on the fact that ExCanvas provides text support for IE
           //and that as of today iPhone/iPad current text support is lame
           this.labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';           
           this.nativeTextSupport = this.labelType === 'Native';
           this.useGradients = nativeCanvasSupport;
           this.animate = !(iStuff || !nativeCanvasSupport);
           
           this.json = "{}";

       },


        //--------------------------------------
        //+ PRIVATE METHODS
        //--------------------------------------


          /*         
          var getTree = function() {
               var i = 0;
               return function(nodeId, level) {
                 var subtree = eval('(' + json.replace(/id:\"([a-zA-Z0-9]+)\"/g, 
                 function(all, match) {
                   return "id:\"" + match + "_" + i + "\""  
                 }) + ')');
                 $jit.json.prune(subtree, level); i++;
                 
                 return {
                     'id': nodeId,
                     'children': subtree.children,
                     'related': subtree.children
                 };
               };
            };
            */
/*
          var getTree = function() {
               var i = 0;
               return function(nodeId, level) {
                 var subtree = eval('(' + json.replace(/id:\"([a-zA-Z0-9]+)\"/g, 
                 function(all, match) {
                   return "id:\"" + match + "_" + i + "\""  
                 }) + ')');
                 $jit.json.prune(subtree, level); i++;
                 
                 return {
                     'id': nodeId,
                     'children': subtree.children,
                     'related': subtree.children
                 };
               };
            };
*/
            
            getTree: function(nodeId, level) {
                // console.log(level);
                var paginator_right = '_pag_r_' + nodeId;
                var paginator_left = '_pag_l_' + nodeId;
                var pag = 0;
                var newSubtreeCenter = this.getNewSubtree(nodeId, pag).children;
                 
                 var newSubtreeRight = [{
                    'name': '&raquo;',
                    'id': paginator_right,
                    'children': [],
                    'children_number':0,
                    'related': [],
                    'related_number':0,
                    'data': {
                        /*'$color': '#23A4FF',
                        '$color': '#428BCA',*/
                        '$color': '#777',
                        '$type': 'circle',
                        '$dim': 40
                    }
                 }];

                 var newSubtreeLeft = [{
                    'name': '&laquo;',
                    'id': paginator_left,
                    'children': [],
                    'children_number':0,
                    'related':[],
                    'related_number':0,
                    'data': {
                        /*'$color': '#23A4FF',
                        '$color': '#428BCA',*/
                        '$color': '#777',
                        '$type': 'circle',
                        '$dim': 40
                    }
                 }];
                // console.dir(newCenterSubtree);
                var newSubtree = newSubtreeLeft.concat(
            	    newSubtreeCenter,
            	    newSubtreeRight);
                
                /*
                var tree = {
                  'name': newSubtreeCenter.name,
                  'id': Math.floor(Math.random(10000)),
                  'children': newSubtree,
                  'related': newSubtree,
                };*/	
                
                // commented out
                // this.updateRelated(newSubtree);


                 return {

                      'name': newSubtreeCenter.name, 
                      'id': Math.floor(Math.random(10000)), // newNode.id, 
                      'children': newSubtree, 
                      'related': newSubtree
                  };
              }, 
              



              draw: function (){

              	var self = this;


           //Implement a node rendering function called 'nodeline' that plots a straight line
           //when contracting or expanding a subtree.
           $jit.ST.Plot.NodeTypes.implement({
           	'nodeline': {
           		'render': function(node, canvas, animating) {
           			if(animating === 'expand' || animating === 'contract') {
           				var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
           				var width  = nconfig.width, height = nconfig.height;
           				var algnPos = this.getAlignedPos(pos, width, height);
           				var ctx = canvas.getCtx(), ort = this.config.orientation;
           				ctx.beginPath();
           				if(ort == 'left' || ort == 'right') {
           					ctx.moveTo(algnPos.x, algnPos.y + height / 2);
           					ctx.lineTo(algnPos.x + width, algnPos.y + height / 2);
           				} else {

                     // var _random = Math.abs(Math.floor(Math.random()*100)+1);
                     // console.log('y: '+algnPos.y+' random: '+_random);
                     ctx.moveTo(algnPos.x + width / 2, algnPos.y);
                     ctx.lineTo(algnPos.x + width / 2, algnPos.y + height);
                      
                 }
                 // ctx.save();
                 ctx.stroke();
             } 
         }
     }
 });


           //Create a new ST instance
           // self.relateds = new $jit.Plot();
           self.graph = new $jit.ST({
           	injectInto: 'infovis',
           	orientation: 'bottom',
               //set duration for the animation
               duration: 800,
               //set animation transition type
               transition: $jit.Trans.Quart.easeInOut,
               //set distance between node and its children
               levelDistance: 90,
               /*
               function () {
                 // var a = Math.abs(Math.floor((Math.random()*1000)+1));
                 // console.log(a);
                 return 200;
             },*/

               //set max levels to show. Useful when used with
               //the request method for requesting trees of specific depth
               levelsToShow: 1,
               //set node and edge styles
               //set overridable=true for styling individual
               //nodes or edges
               Navigation: {
               	enable:true,
               	panning:true
                 // zooming:10
             },
             Label: {
               //type: self.labelType, //Native or HTML
               //size: 10,
               //style: 'bold'
               //type: 'HTML'
             },
             Events: {
             	enable:true,
             	onClick: function (nodeId, eventInfo, e){
       	            // alert('nodeId: '+nodeId);
       	            // self.Log.loading();

       	        },
                //Implement the same handler for touchscreens
                onTouchMove: function(node, eventInfo, e) {
                    $jit.util.event.stop(e); //stop default touchmove event
                       this.onDragMove(node, eventInfo, e);
                }

       	    },
       	    Tips: {
       	       enable: true,
       	       onShow: function (tip, node){
       	          if (node.id.substring(0, 6) === '_pag_r') {
       	            tip.innerHTML = 'Click here to see more terms of this ontology';
       	          } else if (node.id.substring(0, 6) === '_pag_l') {
       	            tip.innerHTML = 'Click here to see more terms of this ontology';
       	          
       	          } else {
       	            tip.innerHTML = node.name;
       	          
       	          }
       	       }                                
       	    },
       	    Node: {
       	    	height: 30,
       	    	width: 150,
                   //use a custom
                   //node rendering function
                   type: 'nodeline',
                   // color:'#00DD00',
                   // lineWidth: 2,
                   align:"center",
                   overridable: true
               },

               Edge: {
               	type: 'bezier',
               	lineWidth: 1,
               	color: '#444444',
                   // color:'#23A4FF',
                   overridable: true
               },

               request: function(nodeId, level, onComplete) {

               	self.Log.loading();

               	var ans = eval(self.getTree(nodeId, level, this));
                   // console.log('id: '+nodeId+' level: '+level);

                 // console.dir(ans);
                 onComplete.onComplete(nodeId, ans);  
             },

             onBeforeCompute: function(){
                   // self.Log.loading();
               },

             onAfterCompute: function(){
               // console.dir(nodeId);
               	self.Log.done();
               	self.Spinner.hide();
               },

               //This method is called on DOM label creation.
               //Use this method to add event handlers and styles to
               //your node.
               onCreateLabel: function(label, node){
               	label.id = node.id;            
               	label.innerHTML = node.name;
               	label.onclick = function(){
               	        // console.log(label.id.substring(0, 5));
               		if (label.id.substring(0, 7) != '_pag_l_' && label.id.substring(0, 7) != '_pag_r_') {
               		    self.graph.onClick(node.id);
               		} else if (label.id.substring(0, 7) === '_pag_r_'){
               		    alert('+ pag');
               		} else {
               		    alert('- pag');
               		};
               	};
                   //set label styles
                   var style = label.style;
                   style.width = 150 + 'px';
                   style.height = 'auto';            
                   style.cursor = 'pointer';
                   // style.color = 'black';
           	    // style.backgroundColor = '#1a1a1a';
                   // style.fontSize = '12px';
                   style.textAlign= 'center';
               },

               onBeforePlotNode: function(node){

               	if (node.selected) {
               		// node.data.$color = "#ff7";

                       // node.data.$color = "#23A4FF";
                       
                   }
                   else {
                   	// delete node.data.$color;
                   }
               },

               onBeforePlotLine: function(adj){
               	if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                       // adj.data.$color = "#eed";

                       adj.data.$color = "#23A4FF";
                       adj.data.$lineWidth = 3;
                   }
                   else {
                   	adj.data.$color = "#666";
                       // delete adj.data.$color;
                       delete adj.data.$lineWidth;
                   }
               },
               
               // handler to change label
               /*
               onCreateLabel: function(domElement, node){
                 
                 domElement.innerHTML = node.name;
                 domElement.onclick = function(){
        
                        doc_rgraph[document_id].onClick(node.id, {
                        onComplete: function() {
                        Log.write("Done");
                        }
                    });
                    
                  };
                  
                },
                */
               onPlaceLabel: function(label, node, controllers){          

               	var style = label.style;  
               	if (node.selected) {    
               		style.color = '#23A4FF';
               		style.fontSize = '15px';
               		style.lineHeight='15px';
               		style.fontWeight = 'bold';
               	}
               	else {
               		style.color = '#666';
               		style.fontSize = '13px';
               		style.lineHeight='13px';
               		style.fontWeight = 'normal';
               	}
                   // show the label and let the canvas clip it
                   style.display = ''; 
               }       
           });

           // load json data
           self.graph.loadJSON(eval( '(' + self.json + ')' ));
           // compute node positions and layout
           self.graph.compute();
           // emulate a click on the root node.
           self.graph.onClick(self.graph.root);
           
           return self;
       },



       ////////////////////////////////////
       //+      SUBCLASSES
       ////////////////////////////////////
       
       

       Log: {

       	elem: false,

       	write: function(txt){
       		if (!this.elem) {
       			this.elem = $('#log');
       		}      
       		this.elem.attr("style", "opacity:1;");
       		this.elem.text(txt);
       	},
       	loading: function(txt){
       		if (!this.elem) {
       			this.elem = $('#log');
       		}      
       		this.elem.attr("style", "opacity:1;")    
       		this.elem.text('loading...');
       	},
       	done: function(txt){
       		if (!this.elem) {
       			this.elem = $('#log');
       		}      
       		this.elem.attr("style", "opacity:0;")    
           // this.elem.text('done');
       }
   },




   Spinner: {

   	elem: false,
   	show: function () {
   		if (!this.elem) {
   			this.elem = $("#spinner");
   		}
   		this.elem.attr("style", "display:block;");

   	},
   	hide: function () {
   		if (!this.elem) {
   			this.elem = $("#spinner");
   		}
   		this.elem.attr("style", "display:none;");
   	} 
   }


});


module.exports = HomeView;
