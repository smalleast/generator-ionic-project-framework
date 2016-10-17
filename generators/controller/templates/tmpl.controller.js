(function() {
  'use strict';

  angular
    .module('<%= projectName %>')
    .controller('<%= ControllerName %>Controller', <%= ControllerName %>Controller);

  /** @ngInject */
  function <%= ControllerName %>Controller($timeout, toastr) {
    var vm = this;
    vm.testFn = testFn;

    vm.myContent = 'I AM AUTO CREATED BY THE GENERATOR!!!';

    function testFn() {
      alert('Continue enjoy coding~');
    }
  }
})();
