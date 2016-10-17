'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var ejs = require('ejs');
var _ = require('underscore');


module.exports = yeoman.Base.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the delightful ' + chalk.red('generator-test-yo') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'project_name',
      message: 'Your project_name',
      default: function() {
        var cwd = path.basename(process.cwd());
        var result = cwd.split(/[-_]/);
        return result.join('-');
      }
    }, {
      type: 'input',
      name: 'controller_name',
      message: 'Your controller_name (eg:user/user-list)?'
    }];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function() {
    this._rewriteProps();
    this._copyRouteSinppets();
    this._copyCtrlJS();
    this._copyCtrlScss();
    this._copyCtrlHtml();
  },
  _copyRouteSinppets: function() {
    this.fs.copyTpl(
      this.templatePath('ROUTE.MD'),
      this.destinationPath('src/app/' + this._ctrlName + '/ROUTE.MD'),
      this.props
    );
  },
  _copyCtrlJS: function() {
    this.fs.copyTpl(
      this.templatePath('tmpl.controller.js'),
      this.destinationPath('src/app/' + this._ctrlName + '/' + this._ctrlName + '.controller.js'),
      this.props
    );
  },
  _copyCtrlScss: function() {
    this.fs.copyTpl(
      this.templatePath('tmpl.scss'),
      this.destinationPath('src/app/' + this._ctrlName + '/index.scss'),
      this.props
    );
  },
  _copyCtrlHtml: function() {
    this.fs.copyTpl(
      this.templatePath('tmpl.html'),
      this.destinationPath('src/app/' + this._ctrlName + '/index.html'),
      this.props
    );
  },
  _rewriteProps: function() {
    var props = this.props;
    this._ctrlName = this.props['controller_name'];
    this._CtrlName = this._capitalize(this._camelCase(this._ctrlName));
    _.each(props, function(prop, key) {
      this.props[this._camelCase(key)] = this._camelCase(prop);
    }, this);

    _.extend(this.props,{
      ControllerName:this._CtrlName
    });
  },
  _camelCase: function(inString) {
    return inString.replace(/[_-]\D/g, function(match) {
      return match.charAt(1).toUpperCase();
    });
  },
  _capitalize: function(inString) {
    var str=inString || '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
