---
title: Docker start.sh
layout: kb
---

Example of start.sh script that can be used as entry point to container:

{% highlight sh %}
#!/bin/sh

# USE the trap if you need to also do manual cleanup after the service is stopped,
#     or need to start multiple services in the one container
trap "echo TRAPed signal" HUP INT QUIT TERM

# start service in background here
/opt/tomcat8/bin/startup.sh

#exit after keypress
#echo "[hit enter key to exit] or run 'docker stop <container>'"
#read

#run top
#top

#view appended logs
sleep 3
tail -n 100 -F `ls /opt/tomcat8/logs/localhost.* | sort -n | head -1`

#run sh then exit
#sh

# stop service and clean up here
echo "stopping tomcat"
/opt/tomcat8/bin/shutdown.sh

echo "exited $0"
{% endhighlight %}