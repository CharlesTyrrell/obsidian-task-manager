import * as React from "react";
import * as path from 'path';
import * as fs from 'fs';
import { App, TFile, TFolder, stringifyYaml, TAbstractFile  } from 'obsidian';
import { writeFile, WriteFileOptions} from 'fs';
import { Buffer } from 'buffer';
import { useState } from 'react';
import { Pair } from "yaml/types";
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
export const ScheduleView = (props: any) => {
	
	
	return get_schedule_view_element(current_date);
};
export function get_schedule_view_element(current_date : string) : JSX.Element{
    initialize_task_data(json_path);
   
    process.chdir(this.app.vault.adapter.basePath);
    let day_list = get_day_list(current_date)
    let day_element_list: JSX.Element[] = []
    for (let i =0; i < day_list.length; i++){
       
        day_element_list.push(get_day_element(day_list[i]));
    }

    return <div>{day_element_list}</div>

}

function get_day_list(current_date : string) : string[]{
    
    
    let day_list: string[] = []

    for (let i = 0; i < num_days; i++){
        var day = moment(current_date, day_format).add(i, 'days').format(day_format)
        day_list.push(day)
        
    }
     
   
    return day_list

}

function get_day_element(date: string) : JSX.Element{
   
    let day_task_list = get_day_tasks(date);


    

    let task_element_list : JSX.Element[] = []

    let task_list = Object.keys(day_task_list);
    for (let i =0; i < task_list.length; i++){
        
        let task_element = get_task_element(day_task_list[task_list[i]])
      
        task_element_list.push(<tr><th>{task_element}</th><th style={task_name_style.container}>{task_list[i]}</th></tr>)
        
    }


    


    return <body style={table_style.container}><ul style={table_style.container}><h1>{date}</h1><table style={table_style.container}><tbody style={table_style.container}>{task_element_list}</tbody></table></ul></body>;


}
function initialize_task_data(file_path : string){

    //this intializes data.json
    //let json_path = path.normalize("\\.obsidian\\plugins\\React_task_manager\\data.json")
    process.chdir(this.app.vault.adapter.basePath);
    let data_string = fs.readFileSync(json_path, 'utf8')//may break

    let data = JSON.parse(data_string);
    
    let files :TFile[] = this.app.vault.getFiles();

    for (let i = 0; i < files.length; i++){
        let file_string = fs.readFileSync(path.normalize(files[i].path), 'utf8')
        
        if(fm.test(file_string)){
            let yaml_content = fm(file_string).attributes
            
            if ("task" in yaml_content) //checks if there is a task yaml header in yaml_content
            {   
                
                
                data[files[i].basename] = yaml_content;
            }
        }
    }
    data_string = JSON.stringify(data);
    
    fs.writeFileSync(json_path, data_string);

}

function is_on_day(date : string, task : any) : boolean {
    let day_of_week = moment(date, day_format).format("d")

    
    //let is_on_day = false;

    //check if date is == task.date--
    if(date == task.task.date){
        return true;
    }
    return false
    //check if date is equal to any of the days added to day list

    for(let i = 0; i < task.task.repeats.length; i ++){
        if(day_of_week == task.task.repeats[i]){
            return true;
        }

    }
    

    //check if repeats on day of week --
        //check if date falls within start and end date 

        //oops can't compared strings like this
    //if((date >= task.task.start_date || date >= task.task.date) && date <= task.task.end_date){

        //if so, check if date falls on day of week that the it repeats
        
    //}



    return false;
}
/*
function update_task_data(task_name : string, yaml_content : JSON){

    //this updates data.json for a single file
    if ("task" in yaml_content) //checks if there is a task yaml header in yaml_content
    {
        if(task_name in data)
        {
            data[task_name] = yaml_content;
        }
        else {}
    }

}
*/

function get_day_tasks(date: string){

    //gets the day tasks from data.json

    let data_string = fs.readFileSync(json_path, 'utf8')//may break
    
    let data = JSON.parse(data_string);


    


    let day_tasks : {[key : string] : {}} = {};
    let all_tasks : string[]= Object.keys(data);
    for (let i = 0; i < all_tasks.length; i++){
        
        if(is_on_day(date, data[all_tasks[i]])) //still need to implement repeating tasks
        {

            day_tasks[all_tasks[i]] = data[all_tasks[i]].task;
            

            //here is where I am sorting the tasks by time of day
            for (let i =0; i < day_tasks.length; i++)
            {
                //if(i == 0)
               // {
                //    day_tasks.push(data[task])
                //}
                
            }
        }
        
    }


    


    return day_tasks;

}

function get_task_element(task_file : any) : JSX.Element{
    
    const bullet_style = {
		container: {
			content : "•",
			color : task_file.color,
			fontSize : "170%",
			textAlign: "center"
		
			
		} as React.CSSProperties,
	  };

	const span_style = {
		container: {
			color : "white",
			fontSize : "58%",
			textAlign: "center"
			
			
			
		} as React.CSSProperties,
	  };
  
    return <li style={bullet_style.container}><span style={span_style.container}>{task_file.time}</span></li>


}

function get_task_time(task_file : unknown) : string { //not sure I need these 
/*
    


*/
    return "STUB"
}

function get_task_date(task_file : unknown) : string {
/*
    


*/
    return "STUB"
}
const table_style  = {
		container: {
			minWidth: "60%",
            textAlign : "center",
			
		} as React.CSSProperties,
	  };
const list_style  = {
    container: {
        minWidth: "60%",
        textAlign : "center",
        
    } as React.CSSProperties,
    };
	const task_name_style = {
		container: {
			textAlign : "left",
			//paddingLeft : "10%",
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