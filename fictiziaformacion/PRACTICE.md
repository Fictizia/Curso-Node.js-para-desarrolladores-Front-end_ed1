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
 * Build a log service, that stores our server's petitions, and also create server routes for showing and handling the logs.
 * Investigate about response heads, so that we can complete the information needed for each file petition.
 * Complete the mimeTypes list, and create some kind of configuration for our assets location.
 * _Optional:_ integrate [zlib](https://nodejs.org/api/zlib.html) with our static file server.
5. Modify our request handler, so that it now accepts POST parameters:
 * Now we'll be able to use a search form, and return the intended results according to our search parameters.
6. Create a watcher for one of our files, so that i'll inform us from the terminal whenever it's been changed.
 * Add node-sass compiler to our watcher service.
7. WebSockets.
8. Firebase integration.
---

## To be determined

* Write a RSS Updater, so that you can insert a RSS address and the app will check when was last updated.
* Write a spider bot that accepts query parameters and search an specified URL to store its data in firebase.
