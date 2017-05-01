---
title: Tinkerboard
layout: kb
---

{% highlight sh %}
# CPU governor, 
sudo nano /etc/rc.local

echo userspace > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor

sudo nano /etc/pulse/default.pa

# Comment whole section: ### Load audio drivers statically

load-module module-udev-detect tsched=0
set-default-sink alsa_output.usb-XMOS_iBasso_Audio-00.analog-stereo

nano /etc/pulse/daemon.conf

{% endhighlight %}

Setup samba
-----------

{% highlight sh %}
sudo nano /etc/samba/smb.conf

# Global parameters
[global]
       workgroup = HOME
       netbios name = SAMBA
       server string = Samba Server %v
       map to guest = Bad User
       log file = /var/log/samba/log.%m
       max log size = 50
       socket options = TCP_NODELAY SO_RCVBUF=8192 SO_SNDBUF=8192
       preferred master = No
       local master = No
       dns proxy = No
       security = user

# Share
[Data]
       path = /media/linaro/Data
       valid users = defk
       read only = No
       create mask = 0777
       directory mask = 0777
       guest ok = yes
       guest account = ftp
       
# add new user
sudo useradd -c "Def K" defk
sudo smbpasswd -a defk
New SMB password: secret
Reenter SMB password: secret
{% endhighlight %}
