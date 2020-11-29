const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
try{
const files = fs.readdirSync("/home/xzerad/");
var dir = {file:files}
res.render("index", dir);
}catch(err){
console.log(err);
}

});

app.get("/download/:path", (req, res)=>{

	const file = `/home/xzerad/${req.params.path}`
	res.download(file);

});

app.listen(8000, function(err){
	if(err) throw err;
	console.log("server created successfully");
	console.log("http://localhost:8000")
});
