---
title: Jar
layout: kb
---

Quick and dirty jar from project:
--------------

{% highlight xml linenos %}
<?xml version="1.0"?>

<project name="Project" default="build">
	<property name="target" value="target" />
	<property name="fileName" value="project" />
	<property name="version" value="1.0.0" />

	<target name="clean">
		<delete dir="${target}" />
		<mkdir dir="${target}" />
	</target>
	
	<target name="jar">
		<jar destfile="${target}/${fileName}-${version}.jar">
			<fileset dir="bin">
				<exclude name="**/.svn/**" />
			</fileset>
		</jar>
	</target>
	
	<target name="build" depends="clean,jar"></target>
</project>
{% endhighlight %}
