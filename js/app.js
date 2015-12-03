angular.module('pokemon', [])

.factory('pokemonFactory', function($http, $q){
	return {
		get: function(){
			defer = $q.defer();

			$http.get('pokemons.json')
				.success(function(data){
					defer.resolve(data);
				})
				
			return defer.promise;
		}
	}
})

.filter('toImage', function(){
	return function(input) {
		if(input != undefined){
			input = input.replace('♀', 'f')
			input = input.replace('♂', 'f')
			input = input.replace(".", '')
			input = input.replace(" ", '')
			input = input.replace("'", '')
			return 'images/' + input + '.jpg'
		}
  	};
})

.controller('pokemonController', function($scope, pokemonFactory){
	
	pokemonFactory.get().then(
		function(data){
			$scope.pokemons = data;	
		}
	)
	$scope.ver = function(pokemon){
		$scope.pokemon = pokemon;
	}
	$scope.buscarPokemon = function(nombre){
		pokemon = $scope.pokemons.filter(function(pokemon){
			return pokemon.name == nombre
		})
		$scope.ver(pokemon[0]);
	}
	$scope.tipoPokemon = function(tipo){
		pokemon = $scope.pokemons.filter(function(pokemon){
			return pokemon.type == tipo
		})
		$scope.ver(pokemon[0]);
	}
})
