# Node.js Practice

1. Write a node module that creates a list of your project's archives, and writes it in an [application cache file](http://www.html5rocks.com/es/tutorials/appcache/beginner/):
 * Use the __fs__ and __path__ node modules.
 * Your module must receive a path parameter, with the location of the app directory.
 * The module will iterate through your files and write a `manifest.appcache` file inside the path specified.
 * Remember to use Node.js code strategies with callback parameters and error handling.
 * You can use [generate-appcache.js](practice/generate-appcache.js) as a guide for starting.
2. Separate your web server application in different modules:
 * A server module for your server functionality.
 * A router module for your router configuration and methods.
 * A request handling module that's linked to our router and handles non existing routes to a 404 message page.
3. Create different routes for our server application:
 * Define routes that will interact with our filesystem module, so that you can show our web app content, and use it to configure our `manifest.appcache` file.
 * Create the routes that you think are needed for the preview file and build file actions.
4. Complete our web server, so that it can serve static files.

## To be determined

* Write a RSS Updater, so that you can insert a RSS address and the app will check when was last updated.
* Write a spider bot that accepts query parameters and search an specified URL to store its data in firebase.