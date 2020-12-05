const fs = require("fs");
const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
var image_ext = [".bmp", ".gif", ".jpg", ".jpeg", ".png", ".tga", ".tif", ".tiff", ".svg"];
var audio_ext = [".aac", ".m3u", ".m4a", ".mp3", ".wav", ".wma"];
var video_ext = [".avi", ".flv", ".mp4", ".mkv", ".mov", ".mpeg", ".mpg", ".mpv", ".ogg", ".vob", ".wmv"];
var code_ext = [".c", ".cpp", ".cs", ".go", ".h", ".java", ".php", ".pl", ".py", ".sh", ".swift", ".html", ".css", ".js"];
var text_ext = [".txt"];
var compressed_ext = [".rar", ".zip"];

app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

app.get("/", (req, res)=>{

res.render("index");
});

app.get("/download", (req, res)=>{
try{
var t_file = [];
const files = fs.readdirSync("/home/xzerad/");
for (var i= 0; i<files.length; i++ ){
	let ext = path.extname(files[i])
	if ( image_ext.indexOf(ext) != -1 )
	class_ = "fas fa-file-image "
	else if (audio_ext.indexOf(ext) != -1)
	class_ = "fas fa-file-audio"
	else if (video_ext.indexOf(ext) != -1)
	class_ = "fas fa-film"
	else if (code_ext.indexOf(ext) != -1)
	class_= "fas fa-file-code"
	else if (text_ext.indexOf(ext) != -1)
	class_ = "fas fa-file-alt"
	else if (compressed_ext.indexOf(ext) != -1)
	class_ = "fas fa-file-archive"
	else
	class_ = "fas fa-archive"
	t_file.push([files[i], class_ ])
}
var dir = {files:t_file}
res.render("download", dir);
}catch(err){
console.log(err);
}

});

app.get("/upload", (req, res)=>{
res.render("upload");
});
app.post("/upload", upload.array("files", 30), (req, res, next)=>{
res.redirect("/download");
	

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
