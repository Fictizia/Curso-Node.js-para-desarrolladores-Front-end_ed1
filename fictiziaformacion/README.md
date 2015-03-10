# Node.js

## Setup Git and basic commands

* Setup `git: git config remote.origin.push HEAD`.
 * `git config --global user.name "John Doe"`.
 * `git config --global user.email johndoe@example.com`.
* Git commands: `git status, git add, git rm, git pull, git commit -m "Commit message", git push`.

## First steps with Node.js

Follow the installation steps from [nodejs.org](http://nodejs.org), you'll need a terminal interface while working with Node.js.

### What can be done with Node.js?

With Node.js you can access filesystem, import C/C++ dll's or create and manage servers, like a web server, an ftp server or a tcp server.First steps with Node.js

Node.js gives us a JavaScript interface to use Google's V8 engine, and that interface includes extra modules and utilities for us to implement our server applications.

We can use Node.js for building automated processes that we'll use in our server applications, like a builder for our configuration files.First steps with Node.js

Later we'll learn to use Node.js for building a REST API, or a terminal client (CLI), or manage our databases.

In order to execute a JavaScript file with Node.js, just type from the terminal:

```
node filename.js
```

### Process arguments

In Node.js you can access your current process arguments with a native variable:

```
process.argv.forEach(console.log);
```

Remember that your real process arguments will start at the third position of the array.

### Simple HTTP Server

We can build a simple HTTP server with a few lines of code:

```
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(process.env.PORT, process.env.IP);
```

In this example, we can see the `require` method being used to import the http module for our own process.

__Practice:__ build an script that automatize our `manifest.appcache` file, take a look at [PRACTICE.md](PRACTICE.md) for reference.

### [Modularity](https://nodejs.org/api/modules.html)

If we want to make a good application with Node.js, we must learn to modularize our code, so that we can `require` them whenever they're necessary. You can use `export` from a module to allow access to your module's functionality:

```
// server.js
var http = require("http"),
    url = require("url");

function serverStart() {
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Received petition for " + pathname);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("What's up?");
        response.end();
    }).listen(process.env.PORT, process.env.IP);
    console.log("Server started...");
}

exports.start = serverStart;
```

And then use `require` to import it, and use its exported methods:

```
// app.js
var server = require('server');

server.start();
```
__Practice:__ Let's start mocking our web server application, create different files for your app and the server module, and import it from your app file.

### The Router

Let's take a look at an URL structure:

```
                               url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
        querystring.parse(string)["foo"]    |
                                            |
                   querystring.parse(string)["hello"]
```

Here we can see which Node.js modules should be used when parsing the request's URL, in order to achieve a correct interpretation and build a router.

__Practice:__ create a router module that exports a single method `route`, that should be passed to our `server.start` method.

Now let's talk about the __Request Handler__ concept. We don't want our router to be responsible of how each request is handled, as that would lead us to a non scalable situation.

We'll have to build a request handling module, so that we've some way of storing each possible route of our application, and different methods that will trigger whenever those routes are requested, if there's no handler for a given route, our router will act accordingly if necessary.

__Practice:__ create a request handler module, so that it can use different handler methods, and they can be assigned to each configured route. The router must be modified so that it'll check requested handler exists, or redirect to a 404 message page.

### Wiring all together

Now that we know how to use the `fs` module to access our system information, and how to create and manage a server and handle its routes, it's the moment to build a complete server application, please refer to [PRACTICE.md](PRACTICE.md) #3 task for further detail.

...