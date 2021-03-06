/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author University Of Alcala
 * @since  2013
 */


 var View = require('core/View');
 var GraphCollection = require('collections/GraphCollection'); 

 // Templates & Partials
 var HomeTemplate = require('templates/HomeTemplate');
 var LanguagesTemplate = require('templates/languages');
 
 // Partials
 var RelatedsTemplate = require('templates/relateds');
 var BreadcrumbTemplate = require('templates/breadcrumb');
 
 var HomeView = View.extend({

    /*
     * @private
     */
     
     id: 'home-view',


    /*
     * @private
     */
     

     // FAO's Agrovoc
     // currentUri:'http://......./c_4788';
     // Cropontology's
     //currentUri: 'http://www.cropontology.org/rdf/CO_010%3A0000000',
     currentUri:'http://purl.obolibrary.org/obo/CO_010#_0000000',
     // currentUri: 'http://MoKi_light#Method',
     // rootUri: 'http://MoKi_light#Method',
     rootUri: 'http://purl.obolibrary.org/obo/CO_010#_0000000',
     // rootUri: 'http://www.cropontology.org/rdf/CO_010%3A0000000', // same as currenturi
     currentLang:'EN',
     
     interfaceMutex:[],
     idToLevelsPageNum:[], // stores current page number on each level
     idToUriMapper: [],
     uriToIdMapper: [],
     
     // Id scheme ->  'c' + underscore + longnumber
     currentId: 'c_1', // roots' id; auto re-generated afterwards  
     rootId: 'c_1',
     rootLabel: 'root', // auto regenerated after graph is downloaded.
     
     // Backbone templates
     
     homeTemplate: HomeTemplate,
     languagesTemplate: LanguagesTemplate,
     // temporally commented out
     relatedsTemplate: RelatedsTemplate,
     breadcrumbTemplate: BreadcrumbTemplate,
     
     unCacheString: 'uncache4',
     
     // graphic framework's attributes
     
     labelType : false, 
     useGradients: false, 
     nativeTextSupport: false, 
     animate: false, 
     graph: false,
     json: false,

     breadCrumb: [{'name':'test_breadcrumb1', 'id':'c_11'}], // te be implemented

    //--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------

  /*
   * @private
   */
   
   events: {

    'click .related-click'  :   'onRelatedLabelClick', // not implemented yet
    'click .breadcrumb-click':    'onBreadcrumbClick' //niy
   },

  /*
   * @private
   */


   initialize: function () {


      // map uri and dom's id <-- less mem, more performance
      this.idToUriMapper[this.currentId] = this.currentUri;
      this.uriToIdMapper[this.currentUri] = this.currentId;
      
      this.idToLevelsPageNum[this.currentId] = '1';
      this.collection = new GraphCollection();        
      this.initNavigational();

      _.bindAll( this );

   },



  /* for prefetching and synchronizing. executed once at start */
  initNavigational: function() {

      var self = this;
     
      
      self.collection.url = '/api/getconcept?uri=' + self.customEncode(self.currentUri) +'&lang='+self.currentLang+'&a='+self.unCacheString;
      self.collection.fetch().done(function() {
      
        var root = self.collection.toJSON();
        if (root.length > 0 && typeof root[0].name !== 'undefined') {
          
          self.rootLabel = root[0].name;
        }
        
        // once we have root node we get its children
        self.collection.url = '/api/getnarrowerconcepts?uri=' + self.customEncode(self.currentUri) +'&lang='+self.currentLang +'&a='+self.unCacheString;
        self.collection.fetch().done(function() {
         
           self.afterRender();
      
        }).fail(function (){
           self.Spinner.hide();
           self.Log.write('Error retrieving data');
        }); 
         
        
      
      }).fail(function (){
         self.Spinner.hide();
         self.Log.write('Error retrieving data');
      }); 
      return self;
  
  },

   /* draws languages combo */
   initLanguages: function () {     
        
        function format(state) {
          if (!state.id) {
            return state.text; 
          }

          /* commented out: draw flags */
          return "<img class='flag' width='16' height='16' src='images/flags/" + state.id.toLowerCase() + ".png'/>"+ state.text;
          // return state.text;
        }
        
        $("#language").select2({
           formatResult: format,
           formatSelection: format,
           width: '100%',
           escapeMarkup: function(m) { return m; }
        });
        
        $('#language').select2("val", this.currentLang.toLowerCase()); 
        /* temporally fixed sparql query anguage issue*/
        $('#language').select2("enable", false);
        $('#language').on('change', this.onChangeLanguage);
   },

        
   /* draws search combo */
   initSearchBox: function(){

                var sURL = '/api/getsimilarconcepts?lang='+this.currentLang
                $("#selector").select2({
                  width: '100%',
                  allowClear: true,
                  minimumInputLength: 3,
                        ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                        url: sURL,
                        cache: true,
                        dataType : 'json',
                        data: function (term) {
                          return {
                            'term': term
                          };
                        },
                        results: function (data) {
                          return {
                            results: data
                          };
                        }
                    },
                            
                    formatResult: function(item) {
                        return item.text;
                    },
                    formatSelection: function(item) {
                        return item.text;
                    },
                    id: function (obj) {
                        return obj.uri;
                    },
                                
                    dropdownCssClass: "bigdrop",
                });
                
                $('#selector').on('change', this.onSearchTerm);

  },

  // Checks Canvas HTML5 support
  initializeScreen: function () {
           
      var ua = navigator.userAgent;
      var iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i);
      var typeOfCanvas = typeof HTMLCanvasElement;
      var nativeCanvasSupport = (typeOfCanvas === 'object' || typeOfCanvas === 'function');
      var textSupport = nativeCanvasSupport && 
          (typeof document.createElement('canvas').getContext('2d').fillText === 'function');

      // I'm setting this based on the fact that ExCanvas provides text support for IE
      // and that as of today iPhone/iPad current text support is lame
      this.labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';           
      this.nativeTextSupport = (this.labelType === 'Native');
      this.useGradients = nativeCanvasSupport;
      this.animate = !(iStuff || !nativeCanvasSupport);

      // auto-regenerated after fetch
      this.json = {'name':this.rootLabel, 'id': this.currentId, 'children': [], 'related': []};

  },

  render: function() {

      var self = this;
      var homeTemplate = this.homeTemplate();
      

      self.$el.html(homeTemplate);


      $.get('/json/languages.json', function(data) {
        var languagesTemplate = self.languagesTemplate({'languages':data});
        self.$el.find('#language-container').html(languagesTemplate);    
        self.initLanguages();
      });

      self.updateSubTemplates([], self.breadCrumb);
      return self;
    },
    
    
    updateSubTemplates: function(relateds, breadcrumb) {
      var self = this;
      _.each(relateds, function(r) {
      
         r.id = self.uriToIdMapper[r.uri];
      });
      var relatedsTemplate = this.relatedsTemplate({'related':relateds});
      var breadcrumbTemplate = this.breadcrumbTemplate({'breadcrumb':breadcrumb});
      this.$el.find('#related-container').html(relatedsTemplate);   
      this.$el.find('#breadcrumb-container').html(breadcrumbTemplate);
    },

    afterRender: function () {

      if (!this.json) { 
        this.initializeScreen();
      }
      this.initSearchBox();
      this.customRenderingFunctionsInit();
      this.createGraph();
      this.drawGraph();
    },


     getNewSubtree: function(nodeId) {

        var self = this;
        var data, uri = '';
            
        if (typeof self.idToLevelsPageNum[nodeId] === 'undefined') {    
          self.idToLevelsPageNum[self.currentId] = '1';
        }
                
        pag = self.idToLevelsPageNum[nodeId];
        
        if (typeof self.idToUriMapper[nodeId] !== 'undefined') {
          uri = self.idToUriMapper[nodeId];
    
        } else {
         // map uri and dom's id <-- less mem, more performance
          self.idToUriMapper[self.currentId] = self.currentUri;
          self.uriToIdMapper[self.currentUri] = self.currentId;
          uri = self.idToUriMapper[self.currentId];
        }

        self.collection.url = '/api/getnarrowerconcepts?uri=' + self.customEncode(uri) + '&lang='+self.currentLang+ '&pag='+pag+'&a='+self.unCacheString;        
          
          self.collection.fetch({async:false}) // set Backbone to synchronous mode
          .done(function() {
            data = self.collection.toJSON();            
          })
          .fail(function (){
            self.Spinner.hide();
            self.Log.write('Error retrieving data');
            data = {};

          }); 

          if (typeof data === 'object' && data.length > 0){
          
            return data[0];
          } else {
            return {};
          }
      },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------
  
  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------
  
  onRelatedLabelClick: function (e) {

      var $uri;
      
      var dataId = $(e.currentTarget).data('id');
      var dataUri;
      
      e.preventDefault();
            
      if (typeof id !== 'undefined' && id !== '') {
        $('#'+dataId).trigger('click');
      } else {
        dataUri = $(e.currentTarget).data('uri');
       
       this.resetStatus();
       this.currentUri = dataUri;
       this.rootUri = dataUri;      
       this.Log.warn('Accessing new Ontology...');
       this.graph = {};
       $('#infovis').html('');
       $('#infovis').css('height', '500px');
       $('#infovis-canvaswidget').remove();
       this.initNavigational();
      }
  },

  onBreadcrumbClick: function (e) {

    var dataId = $(e.currentTarget).data('id');
    e.preventDefault();
    $('#'+dataId).trigger('click');
  },
  
  onSearchTerm: function (e) {

    this.resetStatus();
    this.currentUri = e.val;      
    this.rootUri = e.Val;
    this.Log.write('Accessing term, retriving data...');
    this.graph = {};
    $('#infovis').html('');
    $('#infovis').css('height', '500px');
    $('#infovis-canvaswidget').remove();
    this.initNavigational();
  },

  onChangeLanguage: function (e) {

    this.currentLang = e.val.toUpperCase();        
    this.Log.write('Changed language to '+e.added.text+', retriving data...');
    this.graph = undefined;
    $('#infovis').html('');
    $('#infovis').css('height', '500px');
    this.initNavigational();
  },



  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------




        //----------------------------------------------------------
        //+ JavaScript InfoVis Toolkit http://philogb.github.io/jit/
        //----------------------------------------------------------



        updateRelateds: function (newRelated){

          var relatedsTemplate = this.relatedsTemplate({'related':newRelated});
          this.$el.find('#related-container').html(relatedsTemplate);
       },



        //--------------------------------------
        //+ PRIVATE METHODS
        //--------------------------------------

        getTree: function(nodeId) {

              var subtree;
              if ( typeof this.idToLevelsPageNum[nodeId] === 'undefined') {
                  this.idToLevelsPageNum[nodeId] = 1;
              }
              // synchronous, blocking call
              subtree = this.getNewSubtree(nodeId);
              return this.addSubtreeAndPagers(nodeId, subtree);
        },

            
              

        customRenderingFunctionsInit: function () {
              
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
                     ctx.moveTo(algnPos.x + width / 2, algnPos.y);
                     ctx.lineTo(algnPos.x + width / 2, algnPos.y + height);
                  }
                  ctx.stroke();
                 } 
               }
             },
           });
        },



        createGraph: function (){

           var self = this;
           var removing = false;           
           //Create a new ST instance
           self.graph = new $jit.ST(
         
           {
               injectInto: 'infovis',
               orientation: 'bottom',
               //set duration for the animation
               duration: 600,
               //set animation transition type
               transition: $jit.Trans.Quart.easeInOut,
               //set distance between node and its children
               levelDistance: 90,
               levelsToShow: 1,
               
               Navigation: {
                 enable:true,
                 panning:true
                 // zooming:10
               },
             
               Events: {
                 enable:true,
               
                 onClick: function (node, eventInfo, e){
                   if (typeof node.id !== 'undefined' && node.id.toString().substring(0,5) !== '_pag_') {
                     self.currentId = node.id;
                     // self.graph.onClick(node.id);
                     // parent.document.onSelectionChange(node.name);
                   }
                 },    
                 //Implement handler for TouchScreens
                 onTouchMove: function(node, eventInfo, e) {
                    $jit.util.event.stop(e); //stop default touchmove event
                    this.onDragMove(node, eventInfo, e);
                 }
               },
               Tips: {
                 enable: true,
                 onShow: function (tip, node){
                  if (typeof node.id !== 'undefined' && node.id.toString().substring(0, 6) === '_pag_r') {
                    tip.innerHTML = 'Click here to see more terms of this ontology';
                  } else if (typeof node.id !== 'undefined' && node.id.toString().substring(0, 6) === '_pag_l') {
                    tip.innerHTML = 'Click here to see more terms of this ontology';
                  } else {
                      tip.innerHTML = node.name;
                    //}
                  }
                
              }                                
            },
            Node: {
                height: 30,
                width: 150,
                   //use a custom
                   //node rendering function
                   type: 'nodeline', // roundrect, nodeline
                   align:"center",
                   overridable: true
                },
           Edge: {
                type: 'bezier',
                lineWidth: 1,
                color: '#444444',
                   overridable: true
               },
           request: function(nodeId, level, callback) {
                 var response = self.getTree(nodeId, level);
                 self.Log.loading();                                
                 if (typeof response.id !== 'undefined') {
                   if (response.children.length === 0) {
                     self.Log.warn('No subterms found.');
                   }
                   
                   callback.onComplete(nodeId, response); 
                   if (response.related.length > 0) {
                     self.updateSubTemplates(response.related, self.breadCrumb);
                   }
                 }
               },
            onBeforeCompute: function(id){
                 // self.Log.loading();
               },
            onAfterCompute: function(id){
                self.Log.done();
                self.Spinner.hide();
               },
            onCreateLabel: function(label, node){
                if (node.id === self.rootId) {
                  node.name = self.rootLabel;
                }
                
                label.id = node.id;            
                label.innerHTML = node.name;
                label.onclick = function(){
                  // normal node
                  if (label.id.toString().substring(0, 7) !== '_pag_l_' && label.id.toString().substring(0, 7) !== '_pag_r_') {
		      
		      // @bugfix: avoid root node (id: c_1)
		      if (label.id.toString() !== 'c_1') {
                        self.currentId = node.id;
                        self.graph.onClick(node.id);
                      }
                  // go forwards arrow
                  } else if (label.id.toString().substring(0, 7) === '_pag_r_'){
                      
                      self.Log.write("Retrieving data, please wait...");    
                      self.paginateForwards(label.id);                      
                  } else { // go backwards
                  
                      self.Log.write("Retrieving data, please wait...");                          
                      self.paginateBackwards(label.id);
                  };
                };
                   //set label styles
                   var style = label.style;
                   style.width = 150 + 'px';
                   style.height = 'auto';            
                   style.cursor = 'pointer';
                   style.textAlign = 'center';
             },

              onBeforePlotLine: function(adj){
                if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                       adj.data.$color = "#00B19E";
                       adj.data.$lineWidth = 3;
                   }
                   else {
                    adj.data.$color = "#666";
                       delete adj.data.$lineWidth;
                   }
               },
               
               onPlaceLabel: function(label, node){          

                var style = label.style;
                
                if (node.selected) {    
                  style.color = '#00B19E';
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
           
           return self;
       },

       drawGraph: function () {

           // load json data
           this.graph.loadJSON(this.json);

           // compute node positions and layout
           this.graph.compute();

           // emulate a click on the root node.
           this.graph.onClick(this.graph.root);
           
       
       },

       ////////////////////////////////////
       //+     HELPER SUBCLASSES
       ////////////////////////////////////
       
       

       Log: {

        elem: false,
        warnElem: false,

        write: function(txt){
          if (!this.elem) {
            this.elem = $('#log');
          }      
          this.elem.attr("style", "opacity:1;");
          this.elem.text(txt);
        },
        warn: function(txt){
          var self = this;
          if (!self.warnElem) {
            self.warnElem = $('#log-warn');
          } 
          self.done();   
          self.warnElem.attr("style", "opacity:1;");
          self.warnElem.text(txt);

          setTimeout(function(){
            
            self.warnElem.attr("style", "opacity:0;");
            setTimeout(function(){
              self.warnElem.text('');
            }, 600);
          }, 2000);

        },
        loading: function(){
          if (!this.elem) {
            this.elem = $('#log');
          }      
          this.elem.attr("style", "opacity:1;");
          this.elem.text('loading...');
        },
        done: function(){
          if (!this.elem) {
            this.elem = $('#log');
          }      
          this.elem.attr("style", "opacity:0;");   
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
   },
   
   // Helpers 
   
   computeParentNode: function (node) {
     
     var parent = node.replace(/_pag_(l|r)_/g,'');
     
     return parent;
   },

 
   paginateForwards: function(node) {

      this.paginate(node, function (a) { 
        return parseInt(a) + 1; 
      });        
              
   },   
   
   paginateBackwards: function(node) {

      this.paginate(node, function (a) { 
        return parseInt(a) - 1; 
      });        
   },   
   

   paginate: function(node, fx) {

      var parentNode = this.computeParentNode(node);
      var subtree;
      
      if ( typeof this.interfaceMutex[parentNode] === 'undefined' || 
           this.interfaceMutex[parentNode] === false) {
        // semaphore set to on
        this.interfaceMutex[parentNode] = true;
        
        // increment current page num.
        if (typeof this.idToLevelsPageNum[parentNode] === 'undefined') {
           this.idToLevelsPageNum[parentNode]= 1;
        }
        if ( typeof fx === 'function' ) {
          this.idToLevelsPageNum[parentNode] = fx(this.idToLevelsPageNum[parentNode]);
        } 
        
        
        this.Log.write("Retrieving data, please wait...");    
        subtree = this.getNewSubtree(parentNode);
        
        this.paginateUpdate(parentNode, subtree);
      }
        
   },   
   
   addIdsFromUris: function (tree) {

        var self = this;
        var newTree = _.map(tree,function (obj) { 
          
          var uri = obj.uri;

          if (typeof obj.uri !== 'undefined') {


            if (typeof self.uriToIdMapper[uri] === 'undefined') {
              
              // add Id if it doesnt exists on array
              var id = self.generateId();

              while (typeof self.uriToIdMapper[uri] === 'undefined') {

                self.uriToIdMapper[uri] = id;
                self.idToUriMapper[id] = uri;
                obj.id = id;
                id = self.generateId();
              }
            } else {
              obj.id = self.uriToIdMapper[obj.uri];
            }
          }  
        });
   
        return tree;
   },
  
   generateId: function () {
   
     var randomId = Math.floor(Math.random()*10000 +1); 
     randomId = 'c_' + randomId + (Math.floor(Math.random()*10000 +1)); 
     return randomId;
   },
   
   // concatenates pagers and node subtree and draws it on browser   
   paginateUpdate: function(parentNode, newSubtree) {
   
      var self = this;
      
      var node = self.graph.graph.getNode(parentNode);
      var name = node.name;
      var pages = node.pages;
      var page = self.idToLevelsPageNum[parentNode];
      var related = [];
      
      // removing old subtree  
      self.graph.removeSubtree(parentNode, false, 'animate', {  
        hideLabels: false,  
        onComplete: function() {    
          var parsed;
          
              newSubtree = self.addSubtreeAndPagers(parentNode, newSubtree);
              var parsed = JSON.stringify(newSubtree);

              // adding new subtree 
              self.graph.addSubtree(parsed, 'animate', {  
                hideLabels: false,  
                onComplete: function() {
                
                    var m = {
                      offsetX: self.graph.canvas.translateOffsetX,
                      offsetY: self.graph.canvas.translateOffsetY + 100
                    };
  
                    self.Log.done();
                    self.interfaceMutex[parentNode] = false;

                    self.graph.onClick(parentNode, {Move: m});
                }  
              });
        }
      });  
      return self;
   },
   
   
   addSubtreeAndPagers: function(nodeId, tree) {
   
              var paginator_right = '_pag_r_' + nodeId;
              var paginator_left = '_pag_l_' + nodeId;
              var pag = this.idToLevelsPageNum[nodeId];
              
              var newSubtreeCenter = this.addIdsFromUris(tree.children);
                 
              var pages = tree.pages;
              var page = tree.page;
              var newSubtree, newSubtreeRight = [], newSubtreeLeft = [];
              var id = tree.id;
              var name = tree.name;
              var parent;
                              
                
                if (pages > 0){
                 
                 // Go Forwards arrow                
                 if (page < pages) {
                   newSubtreeRight = [{
                     'name': '&raquo;',
                     'id': paginator_right,
                     'children': [],
                     'pages':0,
                     'related': [],
                     'related_count':0,
                     'data': {
                        '$color': '#00B19E',
                        '$type': 'circle',
                        '$dim': 40
                     }
                    }];
                 } 
                 
                 // Go BackWards arrow
                 if (page > 1) {
                   newSubtreeLeft = [{
                     'name': '&laquo;',
                     'id': paginator_left,
                     'children': [],
                     'pages':0,
                     'related':[],
                     'related_count':0,
                     'data': {
                        '$color': '#00B19E',
                        '$type': 'circle',
                        '$dim': 40
                     }
                  }];
                 }
                }
                newSubtree = newSubtreeLeft.concat(
                  newSubtreeCenter,
                  newSubtreeRight
                );
                
                /* Commented out: Relateds */
                // this.updateRelateds(newSubtreeCenter);
                 
                
                 return {

                      'name': name, 
                      'id': id, 
                      'children': newSubtree, 
                      'related': (typeof tree.related !== 'undefined') ? tree.related : [], // not implemented yet
                      'pages':pages,
                      'page':page
                 };
        },
        
        resetStatus: function () {
        
           this.uriToIdMapper = [];
           this.idToUriMapper = [];
           this.idToLevelsPageNum = [];
           this.currentId = 'c_1';
        },
        
        customEncode: function (inText) {
          
          var outText = encodeURI(inText);
          outText = outText.replace(/\#/gi, '%23');
          return outText;
        } 
   
   
}); // Backbone View end


module.exports = HomeView;
