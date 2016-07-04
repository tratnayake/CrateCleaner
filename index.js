/*Dependencies*/
var Q = require('q');
var fs = require('fs.extra');
var path = require('path');
/*Globals*/
var parentDir = "T:\\HD_Music"
var workingDir = "T:\\HD_Music"
/*Helpers*/
var processDirectory = function(workingDir){
	var files = fs.readdirSync(workingDir);
	for (var i = 0; i < files.length; i++) {
		var fileName = files[i];
		walkFiles(fileName,workingDir);
	};
}
var walkFiles = function(fileName,workingDir){

	var file = path.resolve(workingDir,fileName);
	var stats = fs.statSync(file);
	if (stats.isDirectory()){
		//Add the directory name into the workingDir
		var newDir = workingDir + "\\"+ fileName
		processDirectory(newDir)
	}
	else{
		if(workingDir == parentDir){
		}
		else{
			var oldPath = file;
			var newPath = parentDir + "\\" + fileName;
			fs.move(oldPath, newPath, function(err){
				if(err){
					console.log(err);
				}
				console.log("Moved " + oldPath + "to " + newPath); 
			})
		}
	}	
}
/*Main*/
var main = Q.async(function*(){
	var files = fs.readdirSync(workingDir);
  	for (var i = 0; i < files.length; i++) {
  		var fileName = files[i];
  		walkFiles(fileName,workingDir);
  	};
})
main();
/*Psuedocode*/
//1. For each file in the directory
//2. Check if it's a folder
//3. If no (and you're in the parent folder) do nothing.
//4. If yes, processFiles(folderName)
//REPEAT for folder contents
