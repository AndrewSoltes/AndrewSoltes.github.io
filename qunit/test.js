
function _testing_setup_function() {

	QUnit.module('test some module methods', {
		beforeEach: function() {
		},
		afterEach: function() {
		}
	});

	QUnit.test('it should test', function(assert) {
		assert.equal(1, 1);
		assert.deepEqual({test: {test: 1}}, {test: {test: 1}});
		assert.ok("" == '');
	});

	QUnit.only('it should only run me', function(assert) {
		assert.expect(2);
		assert.ok("" == '');
		
		var done = assert.async();
		
		setTimeout(function() {
			assert.equal('a', 'a');
			done();
		});
	});
}

var testing = (function (test) {
	/**
	 * Enhanced log
	 */
	test.log = function() {
		// if dev tools in ie8 is closed, the console obj is undefined, switch to silent drop
		if (typeof console === 'undefined') {
			console = {}
			console.log = function() {
			}
			return;
		}
		// check good old ie8
		//if ($.browser && $.broser.msie && parseFloat($.browser.version) <= 8) {
		var ieVersion = navigator.appVersion.match(/MSIE (\d+)\./);
		if (ieVersion instanceof Array && ieVersion[1] && parseInt(ieVersion[1]) <= 8) {
			// smarter log for ie 8
			var output = '';
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (typeof arg === 'object') {
					output = JSON.stringify(arg, null, 4);
				} else {
					output = arg;
				}
			};
			console.log(output);
			return;
		}
		console.log.apply(console, arguments);
	}

	/**
	 * ADD GLOBAL
	 */
	log = test.log;

	test.run = function() {
		// compute path to test.js, with this you just have to put quit stuff to same 
		// folder and it will automagically work
		var path = '';
		var scriptName = 'test.js';
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			var src = scripts[i].src.split('?')[0];
			var pos = src.lastIndexOf('/');
			var fname = src.substring(pos + 1, src.length);
			if (fname === scriptName) {
				path = src.substring(0, pos + 1);
			}
		};

		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = path + 'qunit.css';
		document.getElementsByTagName('head')[0].appendChild(link);

		$.getScript(path + 'qunit.js', function () {
			_testing_setup_function();
		});
		$('body').append('<div id="qunit"></div><div id="qunit-fixture"></div>');
	}

	return test;

})(testing || {});
