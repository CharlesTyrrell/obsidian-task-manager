import * as React from "react";

import { useApp } from "hook";
import { myAdd, return_vault_name} from "TestScript"

import { useState } from 'react';
import { Pair } from "yaml/types";

export const ReactView = (props: any) => {
	
	
	return get_task_html_element(props);
};

function print_props(props: any) {
	console.log(props.file_dict);

}

function get_task_html_element(props : any) {

	/*
	//props give simply the name of the file
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

