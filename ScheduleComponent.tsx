import * as React from "react";
import * as path from 'path';
import * as fs from 'fs';
import { isStringObject } from "util/types";
import * as moment from "moment";
const moment = require('moment');

let hour_format : string = "HH:mm";
let day_format : string = "YYYY-MM-DD";
let json_path : string = path.normalize(".obsidian\\plugins\\React_task_manager\\data.json")
//let start_date = moment()


let num_days = 7;
function get_days(){
	let days : string[] = [];

	for(let i = 0; i < num_days; i++){

		days.push(moment().add(i, 'days').format(day_format))
	}
	return days;
}


export class Schedule extends React.Component<{}, {data: any, days :string[], day_elements: JSX.Element[]}>{
    constructor(props : any){
        super(props);
        this.state = {
            data: JSON.parse(fs.readFileSync(json_path, 'utf8')),
            days: get_days(),
			day_elements: []
        }
		
		
        
    }

	render_day(task_data :any, date : string){
		return <DaySchedule data = {task_data} date = {date}/>
	}
	schedule_style ={
		container : {
			
			left: "0",
			right:"0",
			overflow: "auto",
			
			
		}as React.CSSProperties,

	}
	render(){
		for (let i =0; i < this.state.days.length; i++){

			this.state.day_elements.push(this.render_day(this.state.data, this.state.days[i]));
		}
		
		return (
			
      			<div style={this.schedule_style.container}>
					  {this.state.day_elements}
				</div>
			
		)		
	}
    

}

class DaySchedule extends React.Component<{data: any,date : string}, {tasks : any, folded : boolean}>{

    constructor(props : any){
        super(props);
        this.state = {
            //remember immutability 
			tasks: this.get_day_tasks(),
            folded: false,
			
        }
    }
	table_style  = {
		container: {
			
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
		let day_of_week = moment(this.props.date, day_format).format("dd")//from parent functions
		console.log(task_file.task.schedule.dow[day_of_week])
		//this checks if today is the start date (works for single day tasks)
		if(this.props.date ==  task_file.task.schedule.start_date){
			return true;
		}
		//this checks if today is on the dow the task repeats (between start and end date)

		

		
		if(this.props.date > task_file.task.schedule.start_date && 
			(task_file.task.schedule.end_date == "" || this.props.date <= task_file.task.schedule.end_date)
			){
				if(task_file.task.schedule.dow[day_of_week]){
					
					return true;
				}
			}
		
	}
	day_style = {
		container: {
			
			backgroundColor : "var(--background-primary)",
			width: "270px",
			marginLeft: "5px",
			marginBottom: "10px"
			
			
		} as React.CSSProperties,
	};

	render(){
		let task_elements: JSX.Element[] = [];
		let order_tasks : any = [];
		let task_list = Object.keys(this.state.tasks);

		for (let i =0; i < task_list.length; i++){
			if(this.state.tasks[task_list[i]]["schedule"]["time"] == undefined){
				//console.log("Undefined time (day schedule render)")
				continue;
			}

			//console.log(moment(this.state.tasks[task_list[i]]["schedule"]["time"], "HH:mm"))
			
			if(task_elements.length <= 0){
				task_elements.push(<TaskElement task_file={this.state.tasks[task_list[i]]} task_name = {task_list[i]}/>);
			}
			else{
				let is_after = true;
				for (let j = 0; j < task_elements.length; j++){
					//console.log("hetasdf" )
					//console.log(task_elements[j].props.task_file["schedule"]["time"])
					//console.log(this.state.tasks[task_list[i]]["schedule"]["time"])

					if(moment(task_elements[j].props.task_file["schedule"]["time"], "HH:mm").isSameOrAfter(moment(this.state.tasks[task_list[i]]["schedule"]["time"], "HH:mm"))){
						//console.log("inserted task element");
						task_elements.splice(j, 0, <TaskElement task_file={this.state.tasks[task_list[i]]} task_name = {task_list[i]}/>);
						is_after = false;
						break;
					}
					
				}
				if(is_after == true){
					task_elements.push(<TaskElement task_file={this.state.tasks[task_list[i]]} task_name = {task_list[i]}/>);
				}
			}
		}
		
		return(
			<body style={this.day_style.container}>
				<ul>
					<h1>{moment(this.props.date, day_format).format("dd, MMMM DD ")}</h1>
					<table>
						<tbody>
							{task_elements}
						</tbody>
					</table>
				</ul>
			</body>
			);
	}
}

class TaskElement extends React.Component<{task_file : any, task_name : string}, {}>{
	constructor(props : any){
		super(props);
	
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
			fontSize : "130%",
			paddingBottom : "3px",
			color : this.props.task_file.color,
			
			textAlign: "center"
		
			
		} as React.CSSProperties,
	  };

	span_style = {
		container: {
			color: "var(--text-normal)",
			fontSize : "76%",
			textAlign: "center"
			
			
			
		} as React.CSSProperties,
	  };

	render(){
		return (
			<tr>
				<th>
					<li style={this.bullet_style.container}>
						<span style={this.span_style.container}>
							{this.props.task_file.schedule.time} {moment(this.props.task_file.schedule.time, "HH:mm").format('A')}
						</span>
					</li>
				</th>
				<th style={this.task_name_style.container}>
					{this.props.task_name}
				</th>
			</tr>)
	}
}

const header_style = {
	content : {
		width : "110%",
		fontSize: "30px",
		top : "0",
		zIndex: "1",
		padding: "20px",
		paddingBottom: "30px 0",
		textAlign : "inherit",
		position : "absolute",
		backgroundColor : "var(--background-secondary)"

	}as React.CSSProperties,
}
const page_style = { 
	constent : {
    position: "absolute",
    left: "0",
    right:"0",
    overflow: "auto",
    margin: "44px 0"
}as React.CSSProperties,
}
const main_style = { 
	content: {
	overflow : "hidden",
	overflowY : "scroll"
}as React.CSSProperties,
}
