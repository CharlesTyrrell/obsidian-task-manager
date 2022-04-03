import * as React from "react";
import * as path from 'path';
import * as fs from 'fs';
import { App, TFile, TFolder, stringifyYaml, TAbstractFile, Tasks  } from 'obsidian';
import { writeFile, WriteFileOptions} from 'fs';
import { useState } from 'react';
import fm from 'front-matter';
import { JSXElement } from "@typescript-eslint/types/dist/generated/ast-spec";
import { JsonObjectExpressionStatement } from "typescript";
import { format } from "path";
const moment = require('moment');


//IM USING npm front-matter for this one. SSSOOOO much easier 
//dont need json-loader, as I can just use file system readfilesync(file_path, 'utf8')
//export function get_schedule_view(){}
//formatting of day, formatting of hour (defined in options for plugin)

let hour_format : string = "HH:mm";
let day_format : string = "MM-DD-YYYY";
let json_path : string = path.normalize(".obsidian\\plugins\\React_task_manager\\data.json")
let current_date = "03-27-2022"

let num_days = 7;

//THIS IS THE TEST VIEW!!!!!!!!!!!!!!!!

export class Schedule extends React.Component<{}, {data: any, days :string[], day_elements: JSX.Element[]}>{
    constructor(props){
        super(props);
        this.state = {
            data: JSON.parse(fs.readFileSync(json_path, 'utf8')),
            days: ["03-28-2022"],
			day_elements: []
        }
		
		
        
    }

	render_day(task_data :any, date : string){
		return <DaySchedule data = {task_data} date = {date}/>
	}

	render(){
		for (let i =0; i < this.state.days.length; i++){
			//console.log("this is the day: ");
			//console.log(this.state.days[i]);
			//console.log("this is the data: ");
			//console.log(this.state.data[this.state.days[i]]);
			//console.log("this is all the data: ");
			//console.log(this.state.data);
			this.state.day_elements.push(this.render_day(this.state.data, this.state.days[i]));
		}
		console.log(<div>{this.state.day_elements}</div>)
		return <div>{this.state.day_elements}</div>
	}
    

}

class DaySchedule extends React.Component<{data: any,date : string}, {tasks : any, folded : boolean}>{

    constructor(props){
        super(props);
        this.state = {
            //remember immutability 
			tasks: this.get_day_tasks(),
            folded: false,
			
        }
    }
	table_style  = {
		container: {
			minWidth: "60%",
            textAlign : "center",
			
		} as React.CSSProperties,
	  };
	get_day_tasks(){
		let day_tasks : {[key : string] : {}} = {};
		let all_tasks : string[]= Object.keys(this.props.data);
		for (let i = 0; i < all_tasks.length; i++){
			if(this.is_on_day(this.props.data[all_tasks[i]])) //still need to implement repeating tasks
			{
				day_tasks[all_tasks[i]] = this.props.data[all_tasks[i]].task;
				
				for (let i =0; i < day_tasks.length; i++)
				{
					//here is where I am sorting the tasks by time of day
				}
			}
		}

		return day_tasks;
	}
	
	is_on_day(task_file : any) : boolean {
		let day_of_week = moment(this.props.date, day_format).format("d")
		//console.log("task_file:")
		//console.log(task_file)
		if(this.props.date == task_file.task.schedule.start_date){
			return true;
		}
		return false
	}


	render(){
		let task_elements: JSX.Element[] = [];
		let task_list = Object.keys(this.state.tasks);

		for (let i =0; i < task_list.length; i++){
			//console.log("this state :")
			//console.log(this.state.tasks[task_list[i]])
			task_elements.push(<TaskElement task_file={this.state.tasks[task_list[i]]} task_name = {task_list[i]}/>)
		}
		return(
			<body style={this.table_style.container}>
				<ul style={this.table_style.container}>
					<h1>{this.props.date}</h1>
					<table style={this.table_style.container}>
						<tbody style={this.table_style.container}>
							{task_elements}
						</tbody>
					</table>
				</ul>
			</body>
			);
	}
}

class TaskElement extends React.Component<{task_file : any, task_name : string}, {}>{
	constructor(props){
		super(props);
		//console.log("hello!!!!!!")
		//console.log(this.props.task_file)
	}
	task_name_style = {
		container: {
			textAlign : "left",
			//paddingLeft : "10%",
			//padding : "5%"
			
		} as React.CSSProperties,
	  };
	    
    bullet_style = {
		container: {
			content : "•",
			color : this.props.task_file.color,
			fontSize : "170%",
			textAlign: "center"
		
			
		} as React.CSSProperties,
	  };

	span_style = {
		container: {
			color : "white",
			fontSize : "58%",
			textAlign: "center"
			
			
			
		} as React.CSSProperties,
	  };

	render(){
		return (
			<tr>
				<th>
					<li style={this.bullet_style.container}>
						<span style={this.span_style.container}>
							{this.props.task_file.schedule.time}
						</span>
					</li>
				</th>
				<th style={this.task_name_style.container}>
					{this.props.task_name}
				</th>
			</tr>)
	}
}

