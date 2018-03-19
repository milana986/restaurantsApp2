(function() {
	"use strict";
	angular
		.module("dining-room.core")
		.config(config);

	config.$inject = ["$stateProvider", "$urlRouterProvider"];
	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/homepage");
		
		$stateProvider
			.state("main", {
				abstract: true,
				views: {
					"header": {
						templateUrl: "app/components/core/header.html"
					},
					"side-bar": {
						templateUrl: "app/components/core/side-bar.html"
					}
				}
			})
			.state("main.home", {
				url:"/home",
				views: {
					"content@": {
						templateUrl: "app/components/core/home.html"
					}
				}
			})
			.state("main.about", {
				url:"/about",
				views: {
					"content@": {
						templateUrl: "app/components/core/about.html"
					}
				}
			});
		}
})();