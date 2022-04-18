import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { text } from 'stream/consumers';
import { ScheduleView, VIEW_TYPE_SCHEDULE} from './view.js'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { TaskModal } from 'TaskModal';
// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		process.chdir(this.app.vault.adapter.basePath);
		
		this.registerView(
			VIEW_TYPE_SCHEDULE,
			(leaf) => new ScheduleView(leaf)
		);

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('calendar', 'Week View', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			this.activateScheduleView();
		});

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

		
		this.addCommand({
			id: "display-modal",
			name: "Display modal",
			callback: () => {
			  new TaskModal(this.app).open();
			},
		  });
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_SCHEDULE);
	}
	
	async activateScheduleView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_SCHEDULE);
		
		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE_SCHEDULE,
			active: true,
		});
		
		this.app.workspace.revealLeaf(
		this.app.workspace.getLeavesOfType(VIEW_TYPE_SCHEDULE)[0]
		
		);
	}
}
