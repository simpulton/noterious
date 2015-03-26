![Noterious](https://cloud.githubusercontent.com/assets/590361/6837796/feb3b6ca-d30d-11e4-8647-780ded6524a8.png)

Noterious 
=========

Welcome to the Noterious app. It is built using AngularJS with Firebase as the backend. If you would like to see it in action, visit http://noterio.us; if you want to run it locally, read on!


Challenges
----------
* Using `ngRepeat`, display the `boards` collection in the boards template.
* Create a form to add a new `board` to the `boards` collection.
* Create a form to update an existing `board`.
* Write a unit test for the `BoardsCtrl` controller.

Prerequisites
----------
Before you start, you will need:
* [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js and Node Package Manager (NPM)](https://nodejs.org/download/)

Setting up Firebase
-------------------
To start off, you will need to set up an account with Firebase:
* Navigate to [firebase.com](https://www.firebase.com/) and click `Sign Up`
* Create an app (named whatever you want)
* Click on your new app's URL
* Navigate to the `Login & Auth` section of your dashboard and check the `Enable Email & Password Authentication` checkbox.
* Navigate to the data tab and then copy the URL from your address bar. It should have the form of `https://<your-app-name>.firebaseio.com`.
* Open the `src/app/noterious.js` file and replace the `ENDPOINT_URI` constant with the URL you copied. MAKE SURE there is a trailing slash at the end of the URL.

Get the Code
-------------------
Now go ahead and download the code.
```
git clone https://github.com/simpulton/noterious.git
cd noterious
```

Run the App
-------------------
Next, you need to install all of your dependencies.

`npm install`

And install and run the `serve` package so you can build the app.

```
npm install -g serve
serve src/
```

Navigate to `http://localhost:3000` and view the gloriousness that is Noterious!

Testing
-----------
Noterious uses [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) for running tests.
You can start a [TDD](http://en.wikipedia.org/wiki/Test-driven_development) workflow with `gulp tdd`.

> Note: you must have `Gulp CLI` installed in order to run the tests with `gulp`. If you do not have it installed globally, run `npm install -g gulp-cli` or use the method below.

If you prefer to use the local installation of gulp managed by npm, you can start the TDD workflow with

`node ./node_modules/gulp/bin/gulp.js tdd`

For continuous integration, you can execute tests with `gulp test` or `npm test`.
