var mongoose = require("mongoose");
var uri = "mongodb+srv://juwelpc1993:XzgjrcXYkYETEZ4@cluster0.wxrpk.gcp.mongodb.net/PROJECT0?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

var db = mongoose.connection;