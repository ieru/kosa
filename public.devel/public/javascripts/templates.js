(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("templates/homeViewTemplate", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " <a class=\"breadcrumb-click\" href=\"#\" data-id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a> &raquo; ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n              <button class=\"btn btn-default btn-xs related-click\" type=\"button\" data-id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n                ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n              </button>\n            ";
  return buffer;}

  buffer += "    <!-- Fixed navbar -->\n    <div class=\"navbar navbar-default navbar-fixed-top\">\n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"#\">Navigational Browser</a>\n        </div>\n        <div class=\"navbar-collapse collapse\">\n          <ul class=\"nav navbar-nav\">\n            <li class=\"active\"><a href=\"#\">Home</a></li>\n            <!--\n            <li><a href=\"#about\">About</a></li>\n            <li><a href=\"#contact\">Contact</a></li>\n            <li class=\"dropdown\">\n              <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Dropdown <b class=\"caret\"></b></a>\n              <ul class=\"dropdown-menu\">\n                <li><a href=\"#\">Action</a></li>\n                <li><a href=\"#\">Another action</a></li>\n                <li><a href=\"#\">Something else here</a></li>\n                <li class=\"divider\"></li>\n                <li class=\"dropdown-header\">Nav header</li>\n                <li><a href=\"#\">Separated link</a></li>\n                <li><a href=\"#\">One more separated link</a></li>\n              </ul>\n            </li>\n          -->\n        </ul>\n\n\n        <ul class=\"nav navbar-nav navbar-right\">\n          <!--<li><a href=\"/tools\">RDF Tools</a></li>-->\n          <!--<li><a href=\"/sparql\">SPARQL Query Form</a></li>-->\n          <li><a href=\"#\">SPARQL Query Form</a></li>          \n          <!--<li><a href=\"/signin\">Sign in</a></li>-->\n            <!--\n            <li><a href=\"navbar-static-top/\">Static top</a></li>\n            <li class=\"active\"><a href=\"./\">Fixed top</a></li>\n          -->\n        </ul>\n\n      </div><!--/.nav-collapse -->\n    </div>\n  </div>\n\n  <div class=\"container\">\n\n    <!-- Main component for a primary marketing message or call to action -->\n    <div class=\"row\">\n      <div id=\"breadcrumb\" class=\"col-md-12\">";
  foundHelper = helpers.breadcrumb;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  else { stack1 = depth0.breadcrumb; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if (!helpers.breadcrumb) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>\n    </div>\n    <div class=\"jumbotron\">\n      <div class=\"row\">\n        <div class=\"col-md-8\">\n          <span style=\"font-size:25px; background-color:#393939;\" class=\"label label-default\">Navigational</span><br><br>\n          <h4 class=\"h4 col-md-12 text-info\" >Related terms</h4>\n          <div class=\"col-md-10\">\n            ";
  foundHelper = helpers.relatedList;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}); }
  else { stack1 = depth0.relatedList; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if (!helpers.relatedList) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      </div>\n      <div style=\"margin-top:20px;\" class=\"col-md-4\">\n        <p style=\"font-size:15px;\">Search</p>\n        <input type=\"text\" class=\"bigdrop select2-offscreen\" id=\"selector\" style=\"width:200px; margin-top:-40px;\" value=\"16340\" tabindex=\"-1\" placeholder=\"hola\">\n      </div>\n\n\n\n      <br>\n\n\n      <div class=\"col-md-1 col-md-offset-2 log-area\"><span class=\"label label-primary fade out\" id=\"log\"></span></div>\n\n    </div>\n\n    <!-- Navigational is loaded here -->       \n    <div id=\"infovis\" class=\"draggable-parent\">\n      <div id=\"spinner\" class=\"text-center\"> \n        <img src=\"/images/spinner.gif\" height=\"66\" width=\"66\" style=\"width:66px;height:66px;\" title=\"loading\"/>\n      </div>\n    </div>    \n    <p></p>\n\n\n    <p id=\"form\">\n      <a class=\"btn btn-primary\" id=\"button\">Reset View</a>\n      <a class=\"btn btn-default\" target=\"_blank\" href=\"https://github.com/ieru/kosa\">Go to Documentation &raquo;</a>\n    </p>\n  </div>\n\n\n</div>\n</div> <!-- /container -->\n";
  return buffer;});
});

;
//# sourceMappingURL=templates.js.map