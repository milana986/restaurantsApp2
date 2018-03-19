(function() {
	"use strict";
	angular
		.module("dining-room.restaurant")
		.config(config);

	config.$inject = ["$stateProvider"];
	function config($stateProvider) {
		$stateProvider
			.state("main.restaurants", {
				url: "/restaurants/:cuisine",
				views: {
					"content@": {
						templateUrl: "app/components/restaurant/restaurant-list.html",
						controller: "RestaurantListController",
						resolve: {
							restaurants: function($stateParams, Restaurant){
								return Restaurant.get({ "filter":{"cuisine": $stateParams.cuisine}, sort:"rating", sortDirection:"desc", "pageSize": 9 })
								.then(function(data){
									return data;
								});
							}
						}
					}
				}
			});
		}
})();