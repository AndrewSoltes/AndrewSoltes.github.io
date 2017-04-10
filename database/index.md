---
title: Database
layout: kb
---

Mssql create table if not exists

{% highlight sql linenos %}
IF NOT EXISTS (SELECT * FROM sysobjects WHERE 
	id = object_id(N'dbo.my_table')
AND 
	OBJECTPROPERTY(id, N'IsUserTable') = 1)
CREATE TABLE ...
{% endhighlight %}

Get SID when you get service name
{% highlight sql linenos %}
select sys_context('userenv','instance_name') from dual; 
{% endhighlight %}

Get service name when you have SID (maybe)
{% highlight sql linenos %}
select sys_context('userenv','db_name') from dual;
select ora_database_name from dual;
select * from global_name;
{% endhighlight %}

Oracle - get hidden errors if error message from dll is stupid
{% highlight sql linenos %}
select text from dba_errors where name = '[OBJECT_NAME]' and owner = '[OBJECT_OWNER]';

select text from user_errors where name = '[OBJECT_NAME]' and owner = '[OBJECT_OWNER]';
{% endhighlight %}

Oracle - unlock user
{% highlight sql linenos %}
-- Find out all expired/locked users
Select username, account_status from dba_users where ACCOUNT_STATUS LIKE '%EXPIRED%';

-- If user is already expired, unexpire them by assigning password to user (can be same like before)
ALTER USER RCM IDENTIFIED BY PASSWORD;
ALTER USER UDM_CDS IDENTIFIED BY PASSWORD;

-- Unlock users
ALTER USER RCM ACCOUNT UNLOCK;
ALTER USER UDM_CDS ACCOUNT UNLOCK;

-- Optionally, set user passwords to never experire (for users created with default profile)
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
{% endhighlight %}