import * as path from 'path';
import * as fs from 'fs';
import { App } from 'obsidian';
import { useApp } from "./hook";
export function my_function() {
	return 5;
/* //THIS IS MY TEST THINGY
	process.chdir(app.vault.adapter.basePath);//very important to keep

	//var parent_folder_path = path.relative(app.vault.adapter.basePath, file_name);
	var parent_folder_path =  file_name;
	//return parent_folder_path;
	var parent_folder = app.vault.getAbstractFileByPath(parent_folder_path);
	
	var files = [];
	
	get_files_in_folder(parent_folder, files);

	for(var i = 0; i < files.length; i++){
		console.log(files[i].name);
		console.log(fs.readFileSync(files[i].path, "utf8"));
	}
	
	
	
	///*
	//for(var i = 0; i < files.length; i++){
	//	console.log(fs.readFileSync(files[i].path);
	//}
	//
	
	//internal functions
	function get_files_in_folder(folder, file_array){
		var folder_children = folder.children;

		for(var i = 0; i < folder_children.length; i++){
			
			if(fs.lstatSync(path.normalize(folder_children[i].path)).isFile()){
				//console.log(folder_children[i].name)
				file_array.push(folder_children[i]);
			}
	
			else if(fs.lstatSync(path.normalize(folder_children[i].path)).isDirectory()){
				//console.log(folder_children[i].name);
				get_files_in_folder(folder_children[i], file_array);
			}
	
		}
	}

	function parse_yaml(string, yaml_string){
		
		formatted_yaml_header = false;
		
		int i;
		for(i = 0; i < string.length; i++){
			if(string[i] != '\n' && string[i] != '-'){
				return false;
			}	
			
			if(string[i] = '-' && string[i + 1] = '-' && 
			string[i+2] = '-' && string[i+3] = '\n'){
				formatted_yaml_header = true;
				break;

			}
		for(i; 
			
		}		

	
	}
*/ //THIS IS MY TEST THINGY
}

export let myAdd: (baseValue: number, increment: number) => number = function (
	x: number,
	y: number
): number {
	const { vault } = useApp();

	return;
};

export let return_vault_name: () => string = function (): string {
	const { vault } = useApp();
	return vault.getName();
};


/*
//return app.vault.adapter.exists(parent_folder_path);
for this basically need to go through file system 
	for the folder that has the tasks etc in it
		read those folders
			if those folders have the correct time and day for that day note
				put them into the note as tasks (with checkmark)
should I sort through files based on file or based on yaml header?
>>well I don't know how to parse a yaml header in java without donwloading something
>>so for now, I'll work on file 
I think I mainly need to create a function to start at a given file path
And get all the files in that path

things I need to think about
-how I go about doing this -done 
	>>exports to export a single function from this file

-how I read the file -done 
	>>(use readFileSync) could have simply 
	done this with tp.file.content

-how I look through this data -done in theory 
	>>(the output (data) from the readFileSync function 
	is just one long string. I can just look through the string 
	and find out if the correct data is present)

-need a function to be able to get working directory for obsidian folder -done in theory
	>>use the app class with this.app.vault.getName() or some other function 
	i think I can do this by getting name of folder, and name of the directory
	within the vault, and then connecting them through the file system command 
	thingy, one of the commands just adds a path on to the end
	but one of the commands actuall connects them 
	>>**SOLVED** the working directory is already the vault folder,
	and it is denoted as simply \  
	when finding new files paths, always replace absolute path to vault
	with just \
	
	//also app.vault.adapter.basePath

-how I know where all of the files in the obsidian folder I am
working in are
	>> use the above in conjunction with the 'getFiles()' function
	for the vault. I think that makes an array with all of the files
	so I just iterate through the array of those files

-how I iterate through those files
	>>see 'how I know where all of the files are'


how i change working directory-
process.chdir(directory)

-> i think that I need to get the vault as a folder, and then get its path,

Then I can change the current working directory to that path
*/

/*

if (folderOrFile instanceof TFile) {
  console.log("It's a file!");
} else if (folderOrFile instanceof TFolder) {
  console.log("It's a folder!");
}


*/
/*
fs.writeFile('', "Welcome to TUTORIALANDEXAMPLE", function(err){
		if (err) {
			return console.error(err);
		}
		console.log("Input.txt has been created succesfully");
	})


*/
/*
	//internal functions
	function get_files_in_folder(folder, file_array){
		var folder_children = folder.children;
		
		for(var i = 0; i < folder_children.length; i++){
			
			if(fs.lstatSync(folder_children[i].path).isFile()){
				file_array.push(folder_children[i]);
			}
	
			fs.lstatSync(folder_children[i].path).isDirectory(){
				get_files_in_folder(folder_children[i], file_array);
			}
	
		}
	}
	
}
*/
