---
title: Websphere
layout: kb
---

	admin console:
	server:port/ibm/console
	port: 9060
	user: admin


HOT RELOAD AND SETTINGS:  
- Servers -> Server Types -> WebSphere application servers  
- Select server then check Run in development mode  
- In Applications find RCM, in Class loader select ... (parent last), check Override class reloading ..., put polling at 2 seconds  



c:\Program Files (x86)\IBM\WebSphere\AppServer\profiles\AppSrv01\installedApps\ilvdbsercmdevNode01Cell\RCM_war.ear\RCM.war\

