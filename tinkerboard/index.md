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

Setup OpenVPN
------------

{% highlight sh %}
cd /tmp
sudo apt-get install openvpn
wget “https://s3-us-west-1.amazonaws.com/heartbleed/linux/linux-files.zip“
unzip linux-files.zip
cd “Linux OpenVPN Updated files”/
sudo cp ca.crt TCP/* UDP/* Wdc.key /etc/openvpn/
cd /etc/openvpn/
sudo sed -i “s/auth-user-pass/auth-user-pass pass.txt/g” *.ovpn
sudo nano pass.txt
# put into file:
# username
# password

# Run:
cd /etc/openvpn/
sudo openvpn Netherlands1-tcp.ovpn
{% endhighlight %}

Convert All Ebooks in Folder to .mobi
------------

	sudo apt install calibre

{% highlight python %}
import os
import sys
import subprocess
 
if len(sys.argv) < 2:
    print('Usage: ebook_convert <root-dir> [output-extension(.mobi, .epub, ...)]')

rootDir = sys.argv[1]
outExt = sys.argv[2] if len(sys.argv) >= 3 else '.mobi'
# add .pdf if you want
inputExts = ['.fb2', '.epub', '.rtf', '.pdb', '.txt', '.html', '.mobi', '.lrf']

for dirName, subdirList, fileList in os.walk(rootDir):
    for fname in fileList:
        extIdx = fname.rfind('.')
        inExt = fname[extIdx:]
        if inExt != outExt and inExt in inputExts:
            outFname = fname[:extIdx] + outExt
            inFilePath = os.path.join(dirName, fname)
            outFilePath = os.path.join(dirName, outFname)
            print('Converting - From: [%s], To: [%s]' % (inFilePath, outFilePath))
            subprocess.call(
                ['ebook-convert', inFilePath, outFilePath],
                stderr=subprocess.STDOUT)

{% endhighlight %}
