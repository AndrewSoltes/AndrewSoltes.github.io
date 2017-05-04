
$(function () {
	setupMenuCollapsing();
});

function setupMenuCollapsing() {
	$(".nav[data-menu-depth='2'] > li").each(function () {
		var el = $(this);
		if (el.find("ul").length > 0) {
			var a = el.find("> a");
			var ul = el.find("> ul");

			var href = a.attr("href");
			var genId = href.replace(/\//g, "_");

			ul.addClass("collapse");
			ul.attr("id", genId);
			a.attr("href", "#" + genId);
			a.attr("data-toggle","collapse");
			a.addClass("kb-toggle");

			if (ul.find(".nav-active").length > 0) {
				//a.attr("aria-expanded","true");
				ul.addClass("in");
			}
		}
	});
}