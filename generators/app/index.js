'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var ejs = require('ejs');
var _ = require('underscore');
var rExt = /^\.(js|json|scss|sass|css|html|md)$/i;


module.exports = yeoman.Base.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the delightful ' + chalk.red('generator-test-yo') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'project_name',
      message: 'Your project_name?',
      default: function() {
        var cwd = path.basename(process.cwd());
        var result = cwd.split(/[-_]/);
        return result.join('-');
      }
    }];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function() {
    this._rewriteProps();
    this._fetchFromGit();
  },
  _rewriteProps: function() {
    var props = this.props;
    _.each(props, function(prop, key) {
      this.props[this._camelCase(key)] = this._camelCase(prop);
    }, this);
  },
  _camelCase: function(inString) {
    return inString.replace(/[_-]\D/g, function(match) {
      return match.charAt(1).toUpperCase();
    });
  },
  _fetchFromGit: function(inCallback) {
    var self = this;
    var done = this.async();
    this.remote('afeiship', 'ionic-wechat-app', 'master', function(err, remote) {
      self._extCopyTpl(path.join(remote.cachePath, './{**,.*}'), './');
      done(err, self);
    });
  },
  _extCopyTpl: function(inSrc, inDest) {
    var self = this;
    this.fs.copy(inSrc, inDest, {
      process: function(contents, filename) {
        var extname = path.extname(filename);
        if (rExt.test(extname)) {
          return ejs.render(
            contents.toString(), self.props, {
              filename: filename
            }
          );
        } else {
          return contents;
        }
      }
    });
  },
  install: function() {
    console.log('install dependencies....');
    this.installDependencies();
  },
  end: function() {
    console.log('Enjoy coding~ :)');
  }
});
