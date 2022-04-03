import * as path from 'path';
import * as fs from 'fs';
import { App, TFile, TFolder, stringifyYaml, TAbstractFile  } from 'obsidian';
import { useApp } from "./hook";
import fm from "front-matter";
import { Pair, Scalar } from 'yaml/types';
const yaml = require('js-yaml');
const YAML = require('yaml')
//import yaml from 

export function get_files_in_folder() {
	process.chdir(this.app.vault.adapter.basePath);

	var parent_folder_path: string = "/";
	console.log(fs.lstatSync(path.normalize(parent_folder_path)).isDirectory())

	var parent_folder = this.app.vault.getAbstractFileByPath(parent_folder_path);

	let file_array: TFile[] = [];

	get_files_in_folder(parent_folder, file_array)

	console.log(fs.lstatSync(path.normalize(file_array[0].path)).isFile())
	console.log(file_array.length);

	return;
	
	//console.log(stringifyYaml))
	



	function get_files_in_folder(folder: any , file_array: TFile[]) {
		var folder_children = folder.children;

		for (var i = 0; i < folder_children.length; i++) {

			if (fs.lstatSync(path.normalize(folder_children[i].path)).isFile()) {
				//console.log(folder_children[i].name)
				let really_file = <TFile>folder_children[i];
				file_array.push(really_file);
			}

			else if (fs.lstatSync(path.normalize(folder_children[i].path)).isDirectory()) {
				//console.log(folder_children[i].name);
				let really_folder = <TFolder>folder_children[i];
				get_files_in_folder(really_folder, file_array);
			}

		}
	}
}


export function get_yaml_from_files_test() {//node.js front-matter implementation of the script
	
	let all_files: TFile[] = this.app.vault.getFiles();
	const file = fs.readFileSync(all_files[0].path, 'utf8');

	//var content = fm(file);
	//console.log(fm.test(file));
	let content = fm(file);// this returns a dictionary basically
	let array = [1,2,3,4,5]
	console.log(array);
	//console.log(content.attributes["hello"]);
	//console.log(file);

}

export function get_yaml_from_files() : { [key: string]: Pair[] } { //node.js yaml implementation of the script
	process.chdir(this.app.vault.adapter.basePath);
	//inefficient, looks through all of the files every time
	let file_yaml_dict: { [key: string]: Pair[] } = {}; //Key is file name, content is an array of yaml attiributes
	let all_files: TFile[] = this.app.vault.getFiles();
	//console.log(all_files)

	for (let i = 0; i < all_files.length; i++) {
		let file: TFile = all_files[i];
		let yaml_doc = YAML.parseAllDocuments(fs.readFileSync(path.normalize(file.path), 'utf8'))[0];
		
		if (yaml_doc.contents!= null) {
			//console.log(yaml_doc.contents);
			file_yaml_dict[file.name] = yaml_doc.contents.items; //.items returns an array of the PAIR class { [key: string]: Pair[] }
			
		}
		
	}
	return file_yaml_dict; //returns a dictionary
						   //key is file name
						   //value is array of PAIR types, 
						   //each PAIR is a YAML class with three attributes,
						   //1. key, value and type (key and value are the important ones)
}

export function get_yaml_from_file(file_path : string) : Pair[] { //node.js yaml implementation of the script
	process.chdir(this.app.vault.adapter.basePath);

	let file_content: string = fs.readFileSync(path.normalize(file_path), 'utf8')
	let yaml_doc = YAML.parseAllDocuments(file_content)[0];
	//console.log(all_files)
	let file_yaml_tags;
	if (yaml_doc.contents!= null) {
		file_yaml_tags = yaml_doc.contents.items; //.items returns an array of the PAIR class
	}

	return file_yaml_tags; //returns an array of PAIR types

}

export function get_body_from_file(file_path : string) : string {
	return "get_body_from_file stub";
};

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
/*
export function get_yaml_from_files() {
	//inefficient, looks through all of the files every time
	let file_yaml_array: { [key: string]: {} } = {}; //Key is file name, content is a dictionary of yaml attiributes
	let all_files: TFile[] = this.app.vault.getFiles();
	console.log("--------");
	
	yaml.loadAll(fs.readFileSync(all_files[0].path, 'utf8'), function (doc :any) {
		console.log(doc);
	});
	
//console.log(YAML.parseAllDocuments(fs.readFileSync(all_files[0].path, 'utf8'))[0].contents.items[0].key.value);
console.log("--------");
for (let i = 0; i < all_files.length; i++) {
	let file = fs.readFileSync(all_files[i].path, 'utf8'); //creates string
	let content = fm(file).attributes;// this returns a dictionary basically

	file_yaml_array[all_files[i].name] = content;
	console.log(file_yaml_array[all_files[i].name]);

}
	//console.log(file);

	//return file_yaml_array;

}
*/

/*
 export function get_yaml_from_files() {
	//inefficient, looks through all of the files every time
	let file_yaml_dict: { [key: string]: Pair[] } = {}; //Key is file name, content is a dictionary of yaml attiributes
	let all_files: TFile[] = this.app.vault.getFiles();


	for (let i = 0; i < all_files.length; i++) {
		let file: TFile = all_files[i];
		let yaml_doc = YAML.parseAllDocuments(fs.readFileSync(file.path, 'utf8'))[0];
		console.log(yaml_doc.contents.items);
		file_yaml_dict[file.name] = yaml_doc.contents.items; //.items returns an array of the PAIR class


	}

	return file_yaml_dict; //returns a dictionary
						   //key is file name
						   //value is array of PAIR types,
						   //each PAIR is a YAML class with three attributes,
						   //1. key, value and type (key and value are the important ones)

}
*/
