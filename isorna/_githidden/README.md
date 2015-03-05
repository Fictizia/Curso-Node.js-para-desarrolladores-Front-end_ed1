# Node.js

The first incarnations of JavaScript lived in browsers. But this is just the context. Node.js really is just another context: it allows you to run JavaScript code in the backend, outside a browser.

In order to execute the JavaScript you intend to run in the backend, it needs to be interpreted and, well, executed. This is what Node.js does, by making use of Google's V8 VM, the same runtime environment for JavaScript that Google Chrome uses.

Plus, Node.js ships with a lot of useful modules, so you don't have to write everything from scratch, like for example something that outputs a string on the console.

Thus, Node.js is really two things: a runtime environment and a library.

## [Understanding Node.js](http://debuggable.com/posts/understanding-node-js)

_"Huh?"_

Alright, I will. Node is basically very good when you need to do several things at the same time. Have you ever written a piece of code and said "I wish this would run in parallel"? Well, in node everything runs in parallel, except your code.

That's right, everything runs in parallel, except your code. To understand that, imagine your code is the king, and node is his army of servants.

The day starts by one servant waking up the king and asking him if he needs anything. The king gives the servant a list of tasks and goes back to sleep a little longer. The servant now distributes those tasks among his colleagues and they get to work.

Once a servant finishes a task, he lines up outside the kings quarter to report. The king lets one servant in at a time, and listens to things he reports. Sometimes the king will give the servant more tasks on the way out.

Life is good, for the king's servants carry out all of his tasks in parallel, but only report with one result at a time, so the king can focus.

_"That's fantastic, but could you quit the silly metaphor and speak geek to me?"_

Sure. A simple node program may look like this_

```
var fs = require('fs')
  , sys = require('sys');

fs.readFile('treasure-chamber-report.txt', function(report) {
  sys.puts("oh, look at all my money: "+report);
});

fs.writeFile('letter-to-princess.txt', '...', function() {
  sys.puts("can't wait to hear back from her!");
});
```

Your code gives node the two tasks to read and write a file, and then goes to sleep. Once node has completed a task, the callback for it is fired. But there can only be one callback firing at the same time. Until that callback has finished executing, all other callbacks have to wait in line. In addition to that, there is no guarantee on the order in which the callbacks will fire.

_"So I don't have to worry about code accessing the same data structures at the same time?"_

You got it! That's the entire beauty of JavaScripts single-threaded / event loop design!

_"Very nice, but why should I use it?"_

One reason is efficiency. In a web application, your main response time cost is usually the sum of time it takes to execute all your database queries. With node, you can execute all your queries at once, reducing the response time to the duration it takes to execute the slowest query.

Another reason is JavaScript. You can use node to share code between the browser and your backend. JavaScript is also on its way to become a really universal language. No matter if you did python, ruby, java, php, ... in the past, you've probably picked up some JS along the way, right?

And the last reason is raw speed. V8 is constantly pushing the boundaries in being one of the fastest dynamic language interpreters on the planet. I can't think of any other language that is being pushed for speed as aggressively as JavaScript is right now. In addition to that, node's I/O facilities are really light weight, bringing you as close to fully utilizing your system's full I/O capacities as possible.

_"So you are saying I should write all my apps in node from now on?"_

Yes and no. Once you start to swing the node hammer, everything is obviously going to start looking like a nail. But if you're working on something with a deadline, you might want to base your decision on:

* Are low response times / high concurrency important? Node is really good at that.
* How big is the project? Small projects should be fine. Big projects should evaluate carefully (available libraries, resources to fix a bug or two upstream, etc.).

## The application stack

* We want to serve web pages, therefore we need an __HTTP server__.
* Our server will need to answer differently to requests, depending on which URL the request was asking for, thus we need some kind of __router__ in order to map requests to request handlers.
* To fulfill the requests that arrived at the server and have been routed using the router, we need actual __request handlers__.
* The router probably should also treat any incoming POST data and give it to the request handlers in a convenient form, thus we need __request data handling__.
* We not only want to handle requests for URLs, we also want to display content when these URLs are requested, which means we need some kind of __view logic__ the request handlers can use in order to send content to the user's browser.
* Last but not least, the user will be able to upload images, so we are going to need some kind of __upload handling__ which takes care of the details.

With Node.js, we not only implement our application, we also implement the whole HTTP server. In fact, our web application and its web server are basically the same.

## Building the application stack

### A basic HTTP server

Let's create a main file which we use to start our application, and a module file where our HTTP server code lives.

```
// server.js
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(process.env.PORT);// 8888
```

Execute your script with Node.js: `node server.js`.

### Analyzing our HTTP server

The first line requires the http module that ships with Node.js and makes it accessible through the variable http.

We then call one of the functions the http module offers: __createServer__. This function returns an object, and this object has a method named listen, and takes a numeric value which indicates the port number our HTTP server is going to listen on.

Please ignore for a second the function definition that follows the opening bracket of http.createServer.

We could have written the code that starts our server and makes it listen at port 8888 like this:

```
// server.js
var http = require("http");

var server = http.createServer();
server.listen(process.env.PORT);
```

That would start an HTTP server listening at port 8888 and doing nothing else (not even answering any incoming requests).

The really interesting (and, if your background is a more conservative language like PHP, odd looking) part is the function definition right there where you would expect the first parameter of the createServer() call.

Turns out, this function definition IS the first (and only) parameter we are giving to the createServer() call. Because in JavaScript, functions can be passed around like any other value.

### How function passing makes our HTTP server work

By now it should be clear what we are actually doing here: we pass the createServer function an anonymous function.

We could achieve the same by refactoring our code to:

```
// server.js
var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(process.env.PORT);
```

Maybe now is a good moment to ask: Why are we doing it that way?.

### Event-driven asynchronous callbacks

Let's take a very simple piece of code like this:

```
var result = database.query("SELECT * FROM hugetable");
console.log("Hello World");
```

The way we have written this code, the JavaScript interpreter of Node.js first has to read the complete result set from the database, and then it can execute the console.log() function.

If this piece of code actually was, say, PHP, it would work the same way: read all the results at once, then execute the next line of code. If this code would be part of a web page script, the user would have to wait several seconds for the page to load.

However, in the execution model of PHP, this would not become a "global" problem: the web server starts its own PHP process for every HTTP request it receives. If one of these requests results in the execution of a slow piece of code, it results in a slow page load for this particular user, but other users requesting other pages would not be affected.

The execution model of Node.js is different - there is only one single process. If there is a slow database query somewhere in this process, this affects the whole process - everything comes to a halt until the slow query has finished.

To avoid this, JavaScript, and therefore Node.js, introduces the concept of event-driven, asynchronous callbacks, by utilizing an event loop.

We can understand this concept by analyzing a rewritten version of our problematic code:

```
database.query("SELECT * FROM hugetable", function(rows) {
  var result = rows;
});
console.log("Hello World");
```

Now, Node.js can handle the database request asynchronously. Provided that database.query() is part of an asynchronous library, this is what Node.js does: just as before, it takes the query and sends it to the database. But instead of waiting for it to be finished, it makes a mental note that says "When at some point in the future the database server is done and sends the result of the query, then I have to execute the anonymous function that was passed to database.query()."

Then, it immediately executes console.log(), and afterwards, it enters the event loop. Node.js continuously cycles through this loop again and again whenever there is nothing else to do, waiting for events. Events like, e.g., a slow database query finally delivering its results.

Let's play around a bit with this new concept. Can we prove that our code continues after creating the server, even if no HTTP request happened and the callback function we passed isn't called? Let's try it:

```
// server.js
var http = require("http");

function onRequest(request, response) {
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(process.env.PORT);

console.log("Server has started.");
```

Note that I use console.log to output a text whenever the onRequest function (our callback) is triggered, and another text right after starting the HTTP server.

When we start this (node server.js, as always), it will immediately output "Server has started." on the command line. Whenever we request our server (by opening http://localhost:8888/ in our browser), the message "Request received." is printed on the command line.

### How our server handles requests

When the callback fires and our onRequest() function gets triggered, two parameters are passed into it: request and response.

Those are objects, and you can use their methods to handle the details of the HTTP request that occurred and to respond to the request (i.e., to actually send something over the wire back to the browser that requested your server).

And our code does just that: Whenever a request is received, it uses the response.writeHead() function to send an HTTP status 200 and content-type in the HTTP response header, and the response.write() function to send the text "Hello World" in the HTTP response body.

At last, we call response.end() to actually finish our response.

### Finding a place for our server module

Let's find out by turning our server.js script into a real module.

Turns out, we don't have to change that much. Making some code a module means we need to export those parts of its functionality that we want to provide to scripts that require our module.

For now, the functionality our HTTP server needs to export is simple: scripts requiring our server module simply need to start the server.

To make this possible, we will put our server code into a function named start, and we will export this function:

```
// server.js
var http = require("http");

function start() {
  function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(process.env.PORT);
  console.log("Server has started.");
}

exports.start = start;
```

This way, we can now create our main file index.js, and start our HTTP there, although the code for the server is still in our server.js file.

Create a file index.js with the following content:

```
// index.js
var server = require("./server");

server.start();
```

We still have only the very first part of our application in place: we can receive HTTP requests. But we need to do something with them - depending on which URL the browser requested from our server, we need to react differently.

For a very simple application, you could do this directly within the callback function onRequest(). But as I said, let's add a bit more abstraction in order to make our example application a bit more interesting.

Making different HTTP requests point at different parts of our code is called "routing" - well, then, let's create a module called router.

### What's needed to "route" requests?

We need to be able to feed the requested URL and possible additional GET and POST parameters into our router, and based on these the router then needs to be able to decide which code to execute (this "code to execute" is the third part of our application: a collection of request handlers that do the actual work when a request is received).

So, we need to look into the HTTP requests and extract the requested URL as well as the GET/POST parameters from them. It could be argued if that should be part of the router or part of the server (or even a module of its own), but let's just agree on making it part of our HTTP server for now.

All the information we need is available through the request object which is passed as the first parameter to our callback function onRequest(). But to interpret this information, we need some additional Node.js modules, namely url and querystring.

The url module provides methods which allow us to extract the different parts of a URL (like e.g. the requested path and query string), and querystring can in turn be used to parse the query string for request parameters:

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

We can, of course, also use querystring to parse the body of a POST request for parameters, as we will see later.

Let's now add to our onRequest() function the logic needed to find out which URL path the browser requested:

```
// server.js
var http = require("http");
var url = require("url");

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

Fine. Our application can now distinguish requests based on the URL path requested - this allows us to map requests to our request handlers based on the URL path using our (yet to be written) router.

In the context of our application, it simply means that we will be able to have requests for the /start and /upload URLs handled by different parts of our code. We will see how everything fits together soon.

Ok, it's time to actually write our router. Create a new file called router.js, with the following content:

```
// router.js
function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;
```

Of course, this code basically does nothing, but that's ok for now. Let's first see how to wire together this router with our server before putting more logic into the router.

Our HTTP server needs to know about and make use of our router. We could hard-wire this dependency into the server, but because we learned the hard way from our experience with other programming languages, we are going to loosely couple server and router by injecting this dependency (you may want to read Martin Fowlers excellent post on Dependency Injection for background information).

Let's first extend our server's start() function in order to enable us to pass the route function to be used by parameter:

``` 
// server.js
var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

And let's extend our index.js accordingly, that is, injecting the route function of our router into the server:

```
// index.js
var server = require("./server");
var router = require("./router");

server.start(router.route);
```

Again, we are passing a function, which by now isn't any news for us.

If we start our application now (node index.js, as always), and request an URL, you can now see from the application's output that our HTTP server makes use of our router and passes it the requested pathname:

```
bash$ node index.js
Request for /foo received.
About to route a request for /foo
```

### [Execution in the kingdom of verbs](http://steve-yegge.blogspot.com.es/2006/03/execution-in-kingdom-of-nouns.html)

### Routing to real request handlers

Back to business. Our HTTP server and our request router are now best friends and talk to each other as we intended.

Of course, that's not enough. "Routing" means, we want to handle requests to different URLs differently. We would like to have the "business logic" for requests to /start handled in another function than requests to /upload.

Right now, the routing "ends" in the router, and the router is not the place to actually "do" something with the requests, because that wouldn't scale well once our application becomes more complex.

Let's call these functions, where requests are routed to, request handlers. And let's tackle those next, because unless we have these in place there isn't much sense in doing anything with the router for now.

_Taken from [The Node Beginner Book](http://www.nodebeginner.org/)_

### [Completando el router](http://www.genbetadev.com/frameworks/introduccion-a-la-programacion-asincrona-con-nodejs)

Para poder procesar esa información con el objetivo de crear rutas para las peticiones HTTP hemos de hacer uso del módulo url. Vamos a crear un nuevo módulo llamado router.js donde escribiremos el código necesario para empezar a enrutar y a modificar el código de nuestro servidor.

```
// server.js
var http = require("http");
var url = require("url");
function serverStart(route) {
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Received petition for " + pathname);
        route(pathname);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("¿Que pasa tronco?");
        response.end();
    }).listen(4444);
    console.log("Server started...");
}
exports.start = serverStart;

// router.js
function route(pathname) {
    console.log("Routing a new petition for " + pathname);
}
exports.route = route;

// app.js
var server = require("./server");
var router = require("./router");
server.start(router.route);
```
### Route Request Handlers

```
// request-handlers.js
function a_donde_vas(response) {
    console.log("Handler for request 'a_donde_vas' dispatched.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Patatas traigo");
    response.end();
}
function disimula_disimula(response) {
    console.log("Handler for request 'disimula_disimula' dispatched.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Y la mula dijo si");
    response.end();
}
exports.a_donde_vas = a_donde_vas;
exports.disimula_disimula = disimula_disimula;

// server.js
var http = require("http");
var url = require("url");
function serverStart(route, handler) {
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Received petition for " + pathname);
        route(handler, pathname, response);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("¿Que pasa tronco?");
        response.end();
    }).listen(4444);
    console.log("Server started...");
}
exports.start = serverStart;

// router.js
function route(handler, pathname, response) {
    console.log("Routing a new petition for" + pathname);
    if (typeof handler[pathname] === 'function') {
        handler[pathname](response);
    } else {
        console.log("No request handler for " + pathname + " skipping");
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not Found");
        response.end();
    }
}
exports.route = route;

// app.js
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handler = {}
handler["/"] = requestHandlers.a_donde_vas;
handler["/a_donde_vas"] = requestHandlers.a_donde_vas;
handler["/disimula_disimula"] = requestHandlers.disimula_disimula;
server.start(router.route, handler);
```
### Using Node.js from the console (learnyounode)

__process.argv__

You can access command-line arguments via the global process object. The process object has an argv property which is an array containing the complete command-line. i.e. process.argv.

You'll need to think about how to loop through the number arguments so  you can output just their sum. The first element of the process.argv array is always 'node', and the second element is always the path to your program.js file, so you need to start at the 3rd element (index 2), adding each item to the total until you reach the end of the array.

Also be aware that all elements of process.argv are strings and you may need to coerce them into numbers. You can do this by prefixing the property with + or passing it to Number(). e.g. +process.argv[2] or Number(process.argv[2]).

__fs and Buffer__

All synchronous (or blocking) filesystem methods in the fs module end with 'Sync'. To read a file, you'll need to use fs.readFileSync('/path/to/file'). This method will return a Buffer object containing the complete contents of the file.

Buffer objects are Node's way of efficiently representing arbitrary arrays of data, whether it be ascii, binary or some other format. Buffer objects can be converted to strings by simply calling the toString() method on them. e.g. var str = buf.toString().

Instead of fs.readFileSync() you will want to use fs.readFile() and instead of using the return value of this method you need to collect the value from a callback function that you pass in as the second argument. To learn more about callbacks, check out: [https://github.com/maxogden/art-of-node#callbacks](https://github.com/maxogden/art-of-node#callbacks).

Remember that idiomatic Node.js callbacks normally have the signature:

```
function callback (err, data) { /* ... */ }
```

so you can check if an error occurred by checking whether the first argument is truthy. If there is no error, you should have your Buffer object as the second argument. As with readFileSync(), you can supply 'utf8' as the second argument and put the callback as the third argument and you will get a String instead of a Buffer.

The fs.readdir() method takes a pathname as its first argument and a callback as its second. The callback signature is:

    function callback (err, list) { /* ... */ }

where list is an array of filename strings.

Documentation on the fs module can be found by pointing your browser here:
  file:///home/ubuntu/.nvm/v0.10.35/lib/node_modules/learnyounode/node_apidoc/fs.html

You may also find node's path module helpful, particularly the extname method.

Documentation on the path module can be found by pointing your browser here:
  file:///home/ubuntu/.nvm/v0.10.35/lib/node_modules/learnyounode/node_apidoc/path.html
  
Create a new module by creating a new file that just contains your directory reading and filtering function. To define a single function export, you assign your function to the module.exports object, overwriting what is already there:

    module.exports = function (args) { /* ... */ }

Or you can use a named function and assign the name.

To use your new module in your original program file, use the require() call in the same way that you require('fs') to load the fs module. The only difference is that for local modules must be prefixed with './'. So, if your file is named mymodule.js then:

    var mymodule = require('./mymodule.js')

The '.js' is optional here and you will often see it omitted.

You now have the module.exports object in your module assigned to the mymodule variable. Since you are exporting a single function, mymodule is a function you can call!

Also keep in mind that it is idiomatic to check for errors and do early-returns within callback functions:

    function bar (callback) {
      foo(function (err, data) {
        if (err)
          return callback(err) // early return
    
        // ... no error, continue doing cool things with `data`
    
        // all went well, call callback with `null` for the error argument
    
        callback(null, data)
      })
    }
    
    
__HTTP Client__

For this exercise you will need to use the http core module.

Documentation on the http module can be found by pointing your browser here:
  file:///home/ubuntu/.nvm/v0.10.35/lib/node_modules/learnyounode/node_apidoc/http.html

The http.get() method is a shortcut for simple GET requests, use it to simplify your solution. The first argument to http.get() can be the URL you want to GET; provide a callback as the second argument.

Unlike other callback functions, this one has the signature:

    function callback (response) { /* ... */ }

Where the response object is a Node Stream object. You can treat Node Streams as objects that emit events. The three events that are of most interest are: "data", "error" and "end". You listen to an event like so:

    response.on("data", function (data) { /* ... */ })

The "data" event is emitted when a chunk of data is available and can be processed. The size of the chunk depends upon the underlying data source.

The response object / Stream that you get from http.get() also has a setEncoding() method. If you call this method with "utf8", the "data" events will emit Strings rather than the standard Node Buffer objects which you have to explicitly convert to Strings.


