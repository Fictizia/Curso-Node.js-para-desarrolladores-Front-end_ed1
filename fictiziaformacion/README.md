# Node.js

## Setup Git and basic commands

* Setup `git: git config remote.origin.push HEAD`.
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

### Modularity

If we want to make a good application with Node.js, we must learn to modularize our code, so that we can `require` them whenever they're necessary. You can use `export` from a module to allow access to your module's functionality:

```
// server.js
var http = require("http");

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

Here we can see which Node.js modules should be used when parsing the URL, in order to achieve a correct interpretation and build a router.

...

__Practice:__ ...

...