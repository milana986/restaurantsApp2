(function() {
	"use strict";
	angular
		.module("dining-room.restaurant")
		.controller("RestaurantListController", RestaurantListController);

	RestaurantListController.$inject = ["Restaurant", "restaurants", "$stateParams", "$scope", "$uibModal"];
	function RestaurantListController(Restaurant, restaurants, $stateParams, $scope, $uibModal) {
		$scope.restaurants = restaurants.results;

		$scope.filter = {
			"cuisine": $stateParams.cuisine ? $stateParams.cuisine : '',
			"priceFrom": 1,
			"priceTo": 5
		};

		$scope.pagination = {
			page: 1,
			pageSize: 12,
			totalItems: restaurants.count
		};

		$scope.$watch("pagination.page", function() {
			getRestaurants();
		});

		$scope.$watch("filter", function() {
			getRestaurants();
		}, true);

		function getRestaurants() {
			Restaurant.get({
				"page": $scope.pagination.page,
				"pageSize": $scope.pagination.pageSize,
				"sort": "rating",
				"sortDirection": "desc",
				"filter": $scope.filter		
			}).then(function(data) {
				$scope.restaurants = data.results;
				$scope.pagination.totalItems = data.count;
			});
		}

		$scope.getMenu = function(restaurant) {
			$uibModal.open({
				templateUrl: "app/components/restaurant/menu.html",
				controller: "MenuController",
				controllerAs: "mc",
				resolve: {
					menu: function() {
						return Restaurant.getMenu(restaurant._id);
					},
					restaurant: function() {
						return restaurant;
					}
				}
			});
		};

	}
})();