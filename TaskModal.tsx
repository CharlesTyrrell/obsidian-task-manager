import * as React from "react";
import * as ReactDOM from "react-dom";
import {Modal, App, stringifyYaml} from 'obsidian';

import { AppContext } from "context";
import { useApp } from "hook";
import { stringifyNumber, stringifyString, toJSON } from "yaml/util";
import fm from "front-matter";

import * as fs from 'fs'
import { stringify } from "yaml";
import { isStringObject } from "util/types";
import { moment, Setting} from "obsidian";




export class TaskModal extends Modal {
	result: string;
  onSubmit: (result: string) => void;
  
  constructor(app: App) {
		super(app);
    
	}
  
	onOpen() {
		const {contentEl} = this;
    
		ReactDOM.render([
      //<AppContext.Provider value={this.app}>
        <TaskForm app = {this.app}/>
      //</AppContext.Provider>
			
		],this.contentEl)
    
    
    
	}
  
	create_task(){
		


		function check_for_task(){

		}
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
    
	}
}

class TaskForm extends React.Component<
{
  app : App
},
{ task_name : string, 
  task_time :string, 
  color : any, 
  dow: {[key : boolean] : {}}, 
  task_start_date : string, 
  task_end_date :string}>  //constructor 
{
    
    constructor(props : any) {
      super(props);
      
      this.state = {
        task_name: "",
        task_start_date : moment().format("YYYY-MM-DD"),
        task_end_date: moment().add(3, "months").format("YYYY-MM-DD"),
        task_time: moment().format("HH:mm"),
        color: "" ,
        dow: {
          Mo : false,
          Tu : false,
          We : false,
          Th : false,
          Fr : false,
          Sa : false,
          Su : false
        }

      
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event : any) {
      
      this.setState({[event.target.name] : event.target.value})
      
      
    }
    handleDOWChange(event : any){
      
      console.log("HELLLOOOOO")

      let dow_name : any = event.target.name;
      let dow_array : any = this.state.dow;
      

      if(dow_array[dow_name] == true){
        dow_array[dow_name] = false;
      }
      else{
        dow_array[dow_name] = true;
      }
      console.log(dow_array[dow_name])
      this.setState({dow : dow_array})
      


    }
    handleSubmit(event : any) {

      console.log(moment(this.state.task_time, "HH:mm").format("HH:mm"))
      let json_data = {
        aliases: [""],
        task : {
      	color: this.state.color,
      	  schedule: {
            time:  this.state.task_time,
            start_date: this.state.task_start_date,
            end_date: this.state.task_end_date,
            dow : this.state.dow,
	       },
          description: "hello",
          sub_tasks : {
            format: ["name", "date"],
          },
        }   
      }

      // let document =  fs.readFileSync(this.state.task_name + ".md") //probably wont find tasks within files
      // let doc_body;
      // if(fm.test(document)){
      //   doc_body = fm()
      // }

      fs.writeFileSync(this.state.task_name + ".md", "---\n" + JSON.stringify(json_data) + "\n---")
      

      event.preventDefault();
      
    }
    
    
  

    render() {
      return (
        <div>
        <h1>Create New Task</h1>
        <form onSubmit={this.handleSubmit}>
          
          <label>
            Task Name:
            <div/>
            <input type="text" name= "task_name" value={this.state.task_name} onChange={this.handleChange} />
          </label>
          
          <div/>
          
          <label>
            Task date:
            <div/>
            <input type="date" name= "task_start_date" value={this.state.task_start_date} onChange={this.handleChange} />
          </label>
          
          <div/>

          <label>
            Task time:
            <div/>
            <input type="time" name = "task_time" value={this.state.task_time} onChange={this.handleChange} />
          </label>

          <div/>

          <label>
            Task color:
            <div/>
            <input type="color" name = "color" value={this.state.color} onChange={this.handleChange} />
          </label>

          <div/>

          
            Task repeats:
            <div/>
           
            <input type="checkbox" name = "Mo" onChange={this.handleDOWChange.bind(this)} />
            <input type="checkbox" name = "Tu" onChange={this.handleDOWChange.bind(this)} />
            <input type="checkbox" name = "We" onChange={this.handleDOWChange.bind(this)} />
            <input type="checkbox" name = "Th" onChange={this.handleDOWChange.bind(this)} />
            <input type="checkbox" name = "Fr" onChange={this.handleDOWChange.bind(this)} />
            <input type="checkbox" name = "Sa" onChange={this.handleDOWChange.bind(this)} />
            <input type="checkbox" name = "Su" onChange={this.handleDOWChange.bind(this)} />
          

          <div/>

          <input type="submit" value="Submit" />
          
        </form>
        </div>
      );
    }
  }

  const checkbox_style = {
		container: {
			contain : "A"
			
		} as React.CSSProperties,
	  };
 
