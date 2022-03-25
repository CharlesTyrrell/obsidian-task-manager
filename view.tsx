import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContext } from "context";
import { ReactView } from "./ReactView";

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
	
		ReactDOM.render(
			<AppContext.Provider value={this.app}>
				<ReactView />
			</AppContext.Provider>,
			this.containerEl.children[1]
		);
	/*
	let { containerEl } = this;
	containerEl.createEl("h1", { text: "Heading 1" });
	*/
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
	}
}
