## Obsidian Task Manager Plugin

This is a task manager plugin, similar to google calendar, for Obsidian (https://obsidian.md).

This plugin is still in early development, and most if not all features do not work properly.


### Quick overview

The goal of this plugin is to add task managing to obsidian
- Takes advantage of the YAML header of notes to designate tasks and task options
- Tasks have attributes such as time, date, color, description
- Tasks can be set to repeat, either on dow or on user specified days
- They are designed for use in view modes such as week view
- The views are interactive, and can be used to manipulate tasks  

### How to use

- To add a task to your vault, open the create-task modal (hotkeys can be modified in plugin options)
- input task data
- These tasks will then exist as normal .md notes on your vault
- The task information lives in the YAML header of the note, so feel free to transform current notes into tasks
- To view your tasks in a schedule, open up a view by clicking on the calendar icon on the left ribbon bar

### Manually installing the plugin

- download the code as a zip file from the master branch
- go to /YOURVAULT/.obsidian/plugins (if plugins folder doesn't exist, create it)
- extract zip file into the plugins folder
- the plugin folder MUST be named obsidian-task-manager-master
- go to community plugins tab and allow the plugin
- if you do not see the plugin, you may need to first install a plugin off of the community plugins tab

### API Documentation for obsidian

See https://github.com/obsidianmd/obsidian-api
