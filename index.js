const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
try{
var t_file = [];
const files = fs.readdirSync("/home/xzerad/");
for (var i= 0; i<files.length; i++ ){
	let ext = path.extname(files[i])
	if (ext === ".jpg" || ext == ".png")
	class_ = "fas fa-file-image "
	else if (ext == ".mp3")
	class_ = "fas fa-file-audio"
	else if (ext == ".mp4")
	class_ = "fas fa-film"
	else
	class_ = "fas fa-archive"
	t_file.push([files[i], class_ ])
}
var dir = {files:t_file}
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
