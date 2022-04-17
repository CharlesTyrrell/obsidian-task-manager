## Obsidian Task Manager Plugin

This is a task manager plugin, similar to google calendar, for Obsidian (https://obsidian.md).

# A WARNING
This plugin is still in development, and not all features may work properly

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

- Create a new directory in your plugins folder `YOURVAULT/.obsidian/plugins/React_task_manager/`.
- Copy over `main.js`, `styles.css`, `manifest.json` 


### API Documentation for obsidian

See https://github.com/obsidianmd/obsidian-api
