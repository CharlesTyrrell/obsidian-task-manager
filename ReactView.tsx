import * as React from "react";
import * as path from 'path';
import * as fs from 'fs';
import { App, TFile, TFolder, stringifyYaml, TAbstractFile  } from 'obsidian';
import { useApp } from "hook";
import { myAdd, return_vault_name, get_yaml_from_file, get_body_from_file} from "TestScript"

import { useState } from 'react';
import { Pair } from "yaml/types";

import * as YAML from 'yaml'

export const ReactView = (props: any) => {
	
	
	return get_tasK_day_schedule(props);
};

function print_props(props: any) {
	console.log(props.file_dict);

}

function get_tasK_day_schedule(props : any){
	process.chdir(this.app.vault.adapter.basePath);
	const table_style  = {
		container: {
			minWidth: "50%",
			
		} as React.CSSProperties,
	  };
	const task_name_style = {
		container: {
			textAlign : "left",
			paddingLeft : "5%",
			//padding : "5%"
			
		} as React.CSSProperties,
	  };
	const task_name_box_style = {
		container: {
			textAlign : "left",
			//paddingLeft : "5%",
			//margin : "110%"
			
		} as React.CSSProperties,
	  };
	let all_files: TFile[] = this.app.vault.getFiles();
	//console.log(all_files)
	let task_schedule_list = [];

	for (let i = 0; i < all_files.length; i++) {
		let file: TFile = all_files[i];
		let yaml_doc = YAML.parseAllDocuments(fs.readFileSync(path.normalize(file.path), 'utf8'))[0];
		
		if (yaml_doc.contents!= null) {
			//console.log(yaml_doc.contents);
			let task_element = get_task_bullet_element(yaml_doc.contents.items);
			console.log(task_element)
			if (task_element != null){
				task_schedule_list.push(<tr><th>{task_element}</th><th style={task_name_style.container}>{file.basename}</th></tr>);
			}
		}
		
	}
	

	return <ul>
		<h1>March-03-2022</h1>
    <table style={table_style.container}>
		
        <tbody>
            {task_schedule_list}
        </tbody>
    </table>
</ul>;
}
function get_task_bullet_element(file_yaml_list : Pair[]) {
	
	//<li>Adele</li> is a component of a bulleted list sorrounded by <ul> for unordered list
	
	let yaml_list = file_yaml_list;
	
	let task_time = "00:00am-12:12pm";
	let task_name = "unknown";
	let task_color = "red";
	let task_symbol = "question mark face";
	
	for (let i = 0; i < yaml_list.length; i++){
		//console.log(typeof( yaml_list[i].key.value))
		console.log(yaml_list[i].key.value)
		if(yaml_list[i].key.value == 'time'){
			console.log("IT worked")
		}
		
		switch(yaml_list[i].key.value){
			case 'time':
				task_time = yaml_list[i].value.value;
				console.log("IT WORKED")
				break;
			case 'name':
				console.log("IT WORKED")
				task_name = yaml_list[i].value.value;
				break;
			case 'color':
				console.log("IT WORKED")
				task_color = yaml_list[i].value.value;
				break;
			case 'symbol':
				console.log("IT WORKED")
				task_symbol = yaml_list[i].value.value;
				break;
		}
	}
	const bullet_style = {
		container: {
			content : "•",
			color : task_color,
			fontSize : "170%",
			textAlign: "left"
		
			
		} as React.CSSProperties,
	  };

	const span_style = {
		container: {
			color : "white",
			fontSize : "58%",
			textAlign: "left"
			
			
			
		} as React.CSSProperties,
	  };

	return <li style={bullet_style.container}> <span style={span_style.container}>{task_time}</span></li>
	
	
	/*
	//props give simply the name of the file, and location

	//can take a parameter that specifies what view the element is for, such as schedule or week view
	//kinda want to create a month calendar view as well
	file_path = get_file_path(props.file_name);
	file = fs.filereadsync(file_path);

	file_yaml_tags = YAML.parse(file); //list of each tag and its value
	file_body = get_rest_of_file(file);
	
	let is_task = false;
	for tags in file_yaml_tags {
		if (file_yaml_tags[tags] == "task" && file_yaml_tags[value] == true){
			is_task = true;
			break;
		}
	if(is_task == false){
		return false;
    }
	
	parse the tags to get if it is viewable, if it is a main task, etc

	need to create a function with a bunch of deeper functions that describes how to get the html element depending
	on the yaml_tags
	Then return an html element based on that tag

	*/
	return <h1> hey </h1>
}
export function Example(props : any) {
	// Declare a new state variable, which we'll call "count"
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}
	// Declare a new state variable, which we'll call "count"

	//props.file_dict ->
    //key is file name
    //value is an array of attributes:
	//-attributes are of the PAIR type
	//--each PAIR is a YAML class with three **SCALER** attributes,
	//---1. key, value and type (key and value are the important ones)
	//FOR EACH OF THESE, YOU MUST SPECIFY THEIR value PARAMETER i.e. attributes.key.value and attributes.value.value

function get_task_elements(props :any) { // Node.js Yaml pipeline 

	let element_array: JSX.Element[] = []; //add header (which is file name) then add elements (key and value pairs)
	let file_names = Object.keys(props.file_dict);

	for (let i = 0; i < file_names.length; i++) {
		let file_name = file_names[i];
		element_array.push(<h1> File : {file_name} </h1>);

		let file_yaml_attributes = props.file_dict[file_name];
		for (let j = 0; j < file_yaml_attributes.length; j++) {
			console.log(file_yaml_attributes[j].key);
			console.log(file_yaml_attributes[j].value);
			element_array.push(<h4>key : {file_yaml_attributes[j].key.value} || value : {file_yaml_attributes[j].value.value} </h4>)
		}

	}
	console.log(typeof element_array);

	return element_array;
}

function get_task_tags(props: any) {

	let key_array: string[] = Object.keys(props.element_dict);

	let element_array = [];
	for (let i = 0; i < key_array.length; i++) {
		element_array.push(<p> Key {key_array[i]} value: {props.element_dict[key_array[i]]} </p>);
	}

	return element_array;
}

