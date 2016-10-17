(function() {
  'use strict';

  angular
    .module('<%= projectName %>')
    .directive('<%= componentName %>', <%= componentName %>);

  /** @ngInject */
  function <%= componentName %>($rootScope) {
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '='
      },
      templateUrl: 'app/components/<%= component_name %>/tmpl.html',
      link: linkFunc,
      controller: controllerFunc,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: true,
        postfix: ' '
      });

      scope.$on('$destroy', function () {
        console.log('destroy!!!');
      });
    }

    /** @ngInject */
    function controllerFunc($log) {
      var vm = this;

      vm.contributors = [];

      activate();

      function activate() {
        console.log('activate!!!');
      }
    }

  }

})();
