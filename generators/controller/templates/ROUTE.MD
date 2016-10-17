##Router Snippets():
###Add index.router.js: (eg: ~/my-project/src/app/index.route.js)
```javascript
.state('<%= controller_name %>', {
        url: '/<%= controller_name %>',
        templateUrl: 'app/<%= controller_name %>/index.html',
        controller: '<%= ControllerName %>Controller',
        controllerAs: 'vm'
      })
```
