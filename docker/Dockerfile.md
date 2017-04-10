---
title: Dockerfile
layout: kb
---

Sample *Dockerfile* file:


{% highlight sh %}
FROM node

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

#ENTRYPOINT ["/opt/start.sh"]

CMD [ "node", "src/server.js" ]
{% endhighlight %}