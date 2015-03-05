# Node.js Practice

* Write a node module that creates a list of your project's archives, and writes it in an [application cache file](http://www.html5rocks.com/es/tutorials/appcache/beginner/).
 * Use the __fs__ and __path__ node modules.
 * Your module must receive a path parameter, with the location of the app directory.
 * The module will iterate through your files and write a `manifest.appcache` file inside the path specified.
 * Remember to use Node.js code strategies with callback parameters and error handling.
* Write a RSS Updater, so that you can insert a RSS address and the app will check when was last updated.
* Write a spider bot that accepts query parameters and search an specified URL to store its data in firebase.