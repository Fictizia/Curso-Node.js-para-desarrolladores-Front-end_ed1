# Node.js

## [Setup Git and basic commands](http://git-scm.com/book/es/v1/Empezando-Configurando-Git-por-primera-vez)

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

---

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

---

## Building a complete static files web server

In order to build a working web server, we must understand how to serve different files from it without blocking the server process.

### Using the [Buffer](https://nodejs.org/api/buffer.html) class

Pure JavaScript is Unicode friendly but not nice to binary data. When dealing with TCP streams or the file system, it's necessary to handle octet streams. Node has several strategies for manipulating, creating, and consuming octet streams.

Raw data is stored in instances of the `Buffer` class. A `Buffer` is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap. A `Buffer` cannot be resized.

The `Buffer` class is a global, making it very rare that one would need to ever `require('buffer')`.

### Using the [Stream](https://nodejs.org/api/stream.html) class

A stream is a concept that was popularized in the early days of unix. It is an input/output (I/O) mechanism for transmitting data from one program to another. The streaming data is delivered in chunks which allows for efficient use of memory and realtime communication.

Here is a very simple example of reading a stream from file and piping to an HTTP response:

```
var fs = require('fs'),
    http = require('http');

var server = http.createServer(function (req, res) {
  // logic here to determine what file, etc
  var rstream = fs.createReadStream('existingFile');
  rstream.pipe(res); // pipe file to response
});
```

__[Why use them in building applications?](http://codewinds.com/blog/2013-07-25-streams-what-why.html)__

* Smaller, focused modules.
* Standard API for input/output which can even cross process boundaries.
* Streams can allow us to use less memory and serve more concurrent users.
* Realtime updates using streams and sockets.

A Node.js stream is an abstract interface implemented by various objects in Node. For example a request to an __HTTP server__ is a stream, as is __stdout__. Streams are readable, writable, or both. All streams are instances of __EventEmitter__.

You can load the Stream base classes by doing `require('stream')`. There are base classes provided for __Readable__ streams, __Writable__ streams, __Duplex__ streams, and __Transform__ streams.

__Listening to stream events__

Node.js streams are event emitters so you can listen to its events to monitor the data being transmitted.

```
var dataLength = 0;
// using a readStream that we created already
rstream
  .on('data', function (chunk) {
    dataLength += chunk.length;
  })
  .on('end', function () {  // done
    console.log('The length was:', dataLength);
  });
```

You can also pipe chains so that the file content is processed:

```
var r = fs.createReadStream('file.txt');
var z = zlib.createGzip();
var w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w);
```

Or interact with the terminal process:

```
process.stdin.pipe(process.stdout);
```

[Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex_1) streams are streams that implement both the __Readable__ and __Writable__ interfaces.

[Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform_1) streams are __Duplex__ streams where the output is in some way computed from the input. They implement both the __Readable__ and __Writable__ interfaces.

### Using the request POST method

...

---