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
      store: true,
      default: function() {
        var cwd = path.basename(process.cwd());
        var result = cwd.split(/[-_]/);
        return result.join('-');
      }
    }, {
      type: 'input',
      name: 'component_name',
      message: 'Your controller_name (eg:comp/my-componet)?'
    }];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function() {
    this._rewriteProps();
    this._copyDirectiveJS();
    this._copyDirectiveScss();
    this._copyDirectiveHtml();
  },
  _copyDirectiveJS: function() {
    this.fs.copyTpl(
      this.templatePath('tmpl.directive.js'),
      this.destinationPath('src/app/components/' + this._compName+'/'+ this._compName + '.directive.js'),
      this.props
    );
  },
  _copyDirectiveScss: function() {
    this.fs.copyTpl(
      this.templatePath('tmpl.scss'),
      this.destinationPath('src/app/components/'+this._compName+'/tmpl.scss'),
      this.props
    );
  },
  _copyDirectiveHtml: function() {
    this.fs.copyTpl(
      this.templatePath('tmpl.html'),
      this.destinationPath('src/app/components/'+this._compName+'/tmpl.html'),
      this.props
    );
  },
  _rewriteProps: function() {
    var props = this.props;
    this._compName = this.props['component_name'];
    _.each(props, function(prop, key) {
      this.props[this._camelCase(key)] = this._camelCase(prop);
    }, this);
  },
  _camelCase: function(inString) {
    return inString.replace(/[_-]\D/g, function(match) {
      return match.charAt(1).toUpperCase();
    });
  }
});
