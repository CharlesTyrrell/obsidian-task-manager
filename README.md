## Obsidian Sample Plugin

This is a task manager plugin for Obsidian (https://obsidian.md).

This project uses Typescript to provide type checking and documentation.
The repo depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format, which contains TSDoc comments describing what it does.

### Quick overview

The goal of this plugin is to add task managing to obsidian
- Takes advantage of the YAML header of notes to designate tasks and task options
- Tasks have attributes such as time, date, color, description
- Tasks can be set to repeat, either on dow or on user specified days
- They are designed for use in view modes such as week view
- The views are interactive, and can be used to manipulate tasks  

### How to use

- To add a task to your vault, use control+t (hotkeys can be modified in plugin options)
- This will bring up a menu allowing you to create a task
- These tasks will then exist as normal .md notes on your vault
- The task information lives in the YAML header of the note, so feel free to transform current notes into tasks
- To interact with the task, open up a view by clicking on the plugin icon on the left ribbon bar
- Drag tasks to change time and date, click to change other attributes
- To make a personal task groups to view, go to task options and click 'create task group' and 'create task view'

### Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.


### API Documentation for obsidian

See https://github.com/obsidianmd/obsidian-api
