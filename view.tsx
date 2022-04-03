import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContext } from "context";
import {ScheduleView} from 'ScheduleView'
import { FileSystemAdapter } from "obsidian";
import { ReactView, Example} from "./ReactView";
import { get_yaml_from_files } from "TestScript"
export const VIEW_TYPE_EXAMPLE = "example-view";
import {Schedule} from 'TestView'
import * as fs from 'fs';
import fm from 'front-matter';
import * as path from 'path';

let json_path : string = path.normalize(".obsidian\\plugins\\React_task_manager\\data.json")

export class ExampleView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "Example view";
	}

	async onOpen() {
		console.log(process.cwd());
		console.log(json_path)
		//process.chdir(this.app.vault.adapter.basepath);
		initialize_task_data(json_path);
		
		
		let file_yaml_dict = get_yaml_from_files();
		
		ReactDOM.render([
			<Schedule/>,
		], this.containerEl.children[1].createEl("div", { text: "How to Take Smart Notes", cls: "book__title" }));

		
		//const myelement = (
		//	<ReactView x={3} />
		//);

		//ReactDOM.render(myelement, book.createEl("div", { text: "How to Take Smart Notes", cls: "book__title" }));

		
		//contains file name (string) as key
		//contains array of Pairs as value
		

		
	/*
	for (let i = 0; i < 10; i++) {
			this.containerEl.children[i].createEl("div", { text: "How to Take Smart Notes", cls: "book__title" });
			ReactDOM.render(
				<AppContext.Provider value={this.app}>
					<ReactView
						x={i}
						y={2}
						lifestyle={"hello beautiful"}
					/>
				</AppContext.Provider>,
				this.containerEl.children[i]
			);
			}
	let { containerEl } = this;
	containerEl.createEl("h1", { text: "Heading 1" });
	*/
	}

	async onClose() {
		//ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
	}
}
function initialize_task_data(file_path : string){

    //this intializes data.json
    //let json_path = path.normalize("\\.obsidian\\plugins\\React_task_manager\\data.json")
    process.chdir(this.app.vault.adapter.basePath);
    let data_string = fs.readFileSync(file_path, 'utf8')//may break

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