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
7. WebSockets:
 * Use your computer terminal for testing `websockets` example, as it's not possible to test it inside c9.io due to websockets and ports behaviour inside a virtual machine.
8. Firebase integration:
 * Create a page for inserting new data in our new firebase.
 * Use your response cookies header for sending the operation result to the user.
 * Modify our search page so that it can handle our database results.
9. Refactorization:
 * Use a new module for our app configuration variables.
 * Change our `routes.json` handling on `app.js` so that now it loads our route handlers like a node module.
 * Remove our `eval(...)` expressions from `request_handler.js` and use direct calls to our methods.
10. Express:
 * Build an static server with our previous client code.
 * Create a parallel server project, trying to replicate the routes we used before.
 * _Optional:_ use an ajax call for our insertion form, instead of the html form post method.
11. Jade:
 * Create jade templates for our pages, following `express` folder structure.
 * Create our search page, using `express` form parameters for our detail views.
 * _Optional:_ use [Swig template system](http://paularmstrong.github.io/swig/docs/#express) as an alternative to Jade.
12. MongoDB:
 * Create a test db on your c9 workspace.
 * Launch some CRUD operations, to get used to the `mongod` interface.
 * Integrate MongoDB Node.js driver and create a sample connection module.
13. Mongooose:
 * Integrate Mongoose within your express application.
 * Practice with Geospatial Indexes and Queries.
 * Practice with population and related database models.
14. Socket.io
 * Create a bootstraped Socket.io application on your c9 workspace.
 * Replicate our express application, now with Socket.io & Angular.js.
 * Practice with Socket.io rooms.

