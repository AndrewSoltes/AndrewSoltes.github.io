---
title: Plugin
layout: kb
---

To make plugin:
--------------

Xml in jar:
{% highlight xml linenos %}
<?xml version="1.0"?>
<antlib>
  <!-- Tasks -->
  <taskdef name="rcmExport" classname="com.actimize.cdev.ant.tasks.RcmExport" />
  <taskdef name="copyFromSvn" classname="com.actimize.cdev.ant.tasks.CopyFromSvn" />
  <!--taskdef name="buildWord" classname="com.actimize.cdev.ant.tasks.BuildWord" /-->
  <taskdef name="vtlVar" classname="com.actimize.cdev.ant.tasks.VtlVar" />
  <taskdef name="vtlParse" classname="com.actimize.cdev.ant.tasks.VtlParse" />
  <taskdef name="cmiScripts" classname="com.actimize.cdev.ant.tasks.CmiScripts" />

  <!-- Types -->
  <typedef name="releaseSetting" classname="com.actimize.cdev.ant.types.ReleaseSetting" />
  
  <!-- Selectors -->
  <typedef name="revision" classname="com.actimize.cdev.ant.selectors.Revision" />
  
  <!-- Conditions -->

</antlib>
{% endhighlight %}

Task class, use bean getters/setters for xml tag attributes:
{% highlight java linenos %}
public class BuildWord extends Task {
	public void execute() throws BuildException {

	}
}

// support <fileset> in task tag
public void addFileset(FileSet fileset) {
	filesets.add(fileset);
}

// support child tag of certain type
public void addConfigured(VtlVar var) {
	vars.add(var);
}
{% endhighlight %}

Selector class:
{% highlight java linenos %}
public class Revision extends BaseSelectorContainer {
	@Override
	public boolean isSelected(File baseDir, String filename, File file) {

	}
}
{% endhighlight %}

Type class:
{% highlight java linenos %}
public class ReleaseSetting extends DataType {

}
{% endhighlight %}

Condition class:
{% highlight java linenos %}
???
{% endhighlight %}

Add to build.xml
{% highlight xml linenos %}
<path id="cdevant.classpath">
	<fileset dir="target">
		<include name="*.jar" />
	</fileset>
</path>
<typedef resource="cdev/ant/cdevant.xml" classpathref="cdevant.classpath"/>
{% endhighlight %}
