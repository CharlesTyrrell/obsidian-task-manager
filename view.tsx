import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContext } from "context";

import { ReactView, Example} from "./ReactView";
import { get_yaml_from_files } from "TestScript"
export const VIEW_TYPE_EXAMPLE = "example-view";

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
		//console.log(process.cwd());
		let file_yaml_dict = get_yaml_from_files();
		//console.log(Object.values(file_yaml_dict));

		const items: number[] = [1, 2, 3, 4, 5];
		const book = this.containerEl.children[1];
		book.createEl("div", { text: "How to Take Smart Notes", cls: "book__title" })
		book.empty();
		ReactDOM.render([
			<ReactView file_dict={file_yaml_dict}/>,
		], book.createEl("div"));

		
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
