var express = require("express"),
    app = express.createServer();

app.use(express.bodyParser());
app.post('/search', function(req, res){
   var oSearchForm = req.body;  // <-- search items
   var MySearch = { // mockup database search service
        doSearch: function (poSearchForm) {
            var oReturnItems = [];
            // search database here and return found items...
            return oReturnItems;
   }};
   
   MySearch.doSearch(oSearchForm,function(poError, poItems) {
       res.send(poItems);
   });
});

app.listen(process.env.PORT);