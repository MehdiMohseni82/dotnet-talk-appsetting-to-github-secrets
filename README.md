# Tool to Move All Variables from .Net AppSetting.json to the GitHub Secrets
## Simple NodeJs to push all appsetting values (as json) to Github Environment Secrets 

Setting up a secure pipeline to perform release operations from Github repositories, requires putting sensitive data stored in AppSetting into Git secrets. This is usually done in the final stages of the project and when the AppSettings structure that includes tens of different data is finished. Transferring all these data to the GitHub secrets may be long and very boring. This becomes much more difficult when you have several different environments such as dev and staging.

This is a simple tool that works on top of the GitHub API(s) to upload all variables and properties from the existing AppSettings to the GitHub secrets. The tool is written in Node Js. 

## For using the tool, please follow these steps
### Find the repository id:
   Finding a repository ID on GitHub can take hours as there is no user interface for this. I found an easy way to do this via the metadata element on the main page of    the repository on GitHub:

1. View the page source (Right Click > View Page Source in Chrome or Firefox for example)
2. Search the page source and look for ``` octolytics-dimension-repository_id ```. You should find something that looks like: 
<meta content="123456789" name="octolytics-dimension-repository_id" /> (In this example, the ID of the repository is 123456789.)
