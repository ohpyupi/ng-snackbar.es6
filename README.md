# ng-snackbar.es6
This snackbar angular.js module is designed to provide a varierty of services, such as (1) error handling, (2) notification,
and (3) redirection utilizing ui-router (a peer-dependency).

## Installation
Download the module through [npm](https://www.npmjs.com/).
```
npm install angular-ui-router
npm install ng-snackbar.es6
```
Import the module to the angular app.
```
/*
** main angular module (app.module.js)
*/
import uirouter from 'angular-ui-router';
import Snackbar from 'ng-snackbar.es6';

angular.module('app', [uirouter])
.service('snackbar', Snackbar);
```

## Usage
Once the module is registered to the main module, you can bring the module service anywhere you want, for example components,
controllers, or services.

```
export class HomeController {
  constructor(snackbar) {
    this.snackbar = snackbar;
  }
  testMethod() {
    this.snackbar.flash("Hello world!");
  }
}
```
## Methods
#### * snackbar.flash(message, state, params)
1) message (required): It will be displayed in the snackbar
2) state (optional): If specified, it will redirect to the state.
3) params (optional): If specified, it will pass the state parameters to the redirected destination.

## Author
[ohpyupi](https://ohpyupi.wordpress.com/)

## License
Released under the terms of MIT License.
