import { ItemView, WorkspaceLeaf, moment } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContext } from "context";
import { FileSystemAdapter, TFile } from "obsidian";
export const VIEW_TYPE_SCHEDULE = "schedule-view";
export const VIEW_TYPE_SCHEDULE_HEADER = "schedule-view-header";
export const VIEW_TYPE_SCHEDULE_BODY = "schedule-view-body";
export const VIEW_TYPE_WEEK = "week-view";
import {Schedule} from 'ScheduleComponent'
import * as fs from 'fs';
import fm from 'front-matter';
import * as path from 'path';


let json_path : string = path.normalize(".obsidian\\plugins\\React_task_manager\\data.json")
export class ScheduleView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_SCHEDULE;
	}

	getDisplayText() {
		return "Schedule view";
	}

	async onOpen() {

		initialize_task_data(json_path);

		ReactDOM.render([
			<div style={header_style.content}> {moment().format("YYYY MMMM")}</div>,
		], this.containerEl.children[1].createEl('h1'));
		
		ReactDOM.render([
			
			<div><Schedule/></div>
		], this.containerEl.children[1].createEl('div'));
		
		console.log(this.containerEl.parentElement.className)
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
		fs.writeFileSync(json_path, "{}");
	}
}
export class ScheduleViewBody extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_SCHEDULE;
	}

	getDisplayText() {
		return "Schedule view";
	}

	async onOpen() {
		
		initialize_task_data(json_path);

		ReactDOM.render([
			<div><Schedule/></div>
		], this.containerEl.children[1].createEl('div'));
		
		
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
		fs.writeFileSync(json_path, "{}");
	}
}
export class ScheduleViewHeader extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}
	
	getViewType() {
		return VIEW_TYPE_SCHEDULE_HEADER;
	}

	getDisplayText() {
		return "Schedule header";
	}

	async onOpen() {
		let HeadLeaf = this.leaf;
		let BodyLeaf = this.app.workspace.splitActiveLeaf('vertical')
		ReactDOM.render([
			<div>{moment().format("YYYY MMMM")}</div>
		], this.containerEl.children[1].createEl('h1'));
		
		
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
		fs.writeFileSync(json_path, "{}");
	}
}
export class WeekView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_WEEK;
	}

	getDisplayText() {
		return "Week view";
	}

	async onOpen() {
		console.log(process.cwd());
		console.log(json_path)
		//process.chdir(this.app.vault.adapter.basepath);
		initialize_task_data(json_path);
		
		
		
		
		ReactDOM.render([
			<div><Week/></div>, 
		], this.containerEl.children[1].createEl("div"));
	}
	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
	}
}
function initialize_task_data(file_path : string){

    //this intializes data.json
    //let json_path = path.normalize("\\.obsidian\\plugins\\React_task_manager\\data.json")
    process.chdir(this.app.vault.adapter.basePath);
    let data_string = "{}"//may break

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
    
    fs.writeFileSync(file_path, data_string);

}


const header_style = {
	content : {
		left:"15px",
		top : "0",
		textAlign: "center",
		width : "300px",
		padding: "30px 0",
		position : "fixed",
		backgroundColor : "var(--background-secondary)"

	}as React.CSSProperties,
}
const test_style = {
	content : {
		color : "Green"

	}
}