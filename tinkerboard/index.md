---
title: Tinkerboard
layout: kb
---

CPU governor, edit /etc/rc.local
echo userspace > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor

= nano /etc/pulse/default.pa =
Comment whole section ### Load audio drivers statically

  load-module module-udev-detect tsched=0
  set-default-sink alsa_output.usb-XMOS_iBasso_Audio-00.analog-stereo

= nano /etc/pulse/daemon.conf =

