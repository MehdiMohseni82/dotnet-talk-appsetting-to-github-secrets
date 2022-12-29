# Tool to Move All Variables from .Net AppSetting.json to the GitHub Secrets
## Simple NodeJs to push all appsetting values (as json) to Github Environment Secrets 

Setting up a secure pipeline to perform release operations from Github repositories, requires putting sensitive data stored in AppSetting into Git secrets. This is usually done in the final stages of the project and when the AppSettings structure that includes tens of different data is finished. Transferring all these data to the GitHub secrets may be long and very boring. This becomes much more difficult when you have several different environments such as dev and staging.
