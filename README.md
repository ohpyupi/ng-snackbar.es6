# ng-snackbar.es6
This snackbar module was initially designed to handle to display a notification message and dynamic redirection utilziing ui-router. Thanks to ui-router's react version module, however, it could be also utilized even on React with ui-router. Recently, it's been added for the module to be used under React with react-router (above 0.5.0).

The module provides features:
1) Error handling
2) Notification
3) Redirection

## Installation
Download the module through [npm](https://www.npmjs.com/).
```
// peer dependencies (Choose one of them)
npm install angular-ui-router
npm install react-ui-router
npm install react-router-dom

// The Snackbar module
npm install ng-snackbar.es6
```

## Usage - Angular.js & UI Router
Once the module is registered to the main module, you can bring the module service anywhere you want, for example components,
controllers, or services.

```
import SnackbarGenerator from 'ng-snackbar.es6';

// Recommended to generate Snackbar class module in other configuration file
// and feed it to the point where it needs to be initiated.
const Snackbar = SnackbarGenerator({
 duration: 1,
 closeLabel: "CLOSE",
 xi: -13,
 xf: 20,
 directionFrom: "top",
 router: 'ui-router',
});

export class HomeController {
 constructor($state) {
  // Snackbar needs $state when initiated, which is one of the dependencies from ui-router end.
  this.snackbar = new Snackbar($state);
 }
 fetchUserData() {
  ...
  this.snackbar.flash("Successfully loaded a user data!");
 }
}
```

## Usage - React.js & UI Router
```
import SnackbarGenerator from 'ng-snackbar.es6';

const Snackbar = SnackbarGenerator({
 duration: 1,
 closeLabel: "CLOSE",
 xi: -13,
 xf: 20,
 directionFrom: "top",
 router: 'ui-router',
});

export class Home extends React.Component {
 constructor(props) {
  super(props);
  // In React with UI Router, you can access to $state dependency from "props".
  this.snackbar = new Snackbar(this.props.transition.router.stateService);
 }
 fetchData() {
  ...
  // Snackbar module will notify a user with the message passed in 
  // and redirect the user to "profile" state.
  this.snackbar.flash('Successfully loaded a user data!', 'profile');
 }
}
```

## Usage - React.js & React Router
```
import SnackbarGenerator from 'ng-snackbar.es6';

const Snackbar = SnackbarGenerator({
 duration: 1,
 closeLabel: "CLOSE",
 xi: -13,
 xf: 20,
 directionFrom: "top",
 router: 'react-router',
});

export class Home extends React.Component {
 constructor(props) {
  super(props);
   // To utilize redirection feature, you need to pass react router's history service.
   // The history service can be accessed from "props".
   this.snackbar = new Snackbar(this.props.history);
 }
 fetchUserData {
  ...
  // Due to the the architectural difference between UI Router and React Router,
  // the parameters need for redirection should differ.
  // You need to input the target URL a user will be redirected to flash() method.
  this.snackbar.flash('Successfully fetched user data', '/user-profile/new-users');
 }
}
```

## Methods
#### * snackbar.flash(message, state or URL, params)
1) message (required): It will be displayed in the snackbar
2) state (optional): If specified, it will redirect to the state.
3) URL (optional): If specified, it will redirect to the URL.
3) params (optional): (ONLY IN UI-ROUTER)If specified, it will pass the state parameters to the redirected destination.

## Author
[ohpyupi](https://ohpyupi.wordpress.com/)

## License
Released under the terms of MIT License.
