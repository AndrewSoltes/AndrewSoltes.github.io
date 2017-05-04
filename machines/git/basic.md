---
title: Basic Git
layout: kb
---

Basic Git for logging history
=============================

Commit all

	git commit -a -m "msg"

Replace last commit

	git commit --amend

Tagging
-------
Add lightweight tag to current commit

	git tag v1.2

Tagging previous commit

	git tag v1.2 4682c32610

Show tag
	
	git show v1.2

Logging
-------
Unstaged changes

	git diff

Staged changes

	git diff --staged

Log newest first

	git log

Show difference from last 2 patches

	git log -p -2

Show log as graph. Format options: oneline, short, full, fuller

	git log --graph --pretty=oneline

Make oneline pretty

	git log --oneline --decorate --graph

Log by author

	git log --author=Andrej

Switching

	git checkout 4682c32610
	git checkout v1.2

Go back

	git checkout master

Save file in specific version

	git show 4682c32610:test.js > test-old.js
