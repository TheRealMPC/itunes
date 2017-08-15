angular.module('itunes').service('itunesService', function($http, $q){
  this.getArtist = function(artist) {
    const deferred = $q.defer()
     $http({
      method: 'JSONP',
      url: 'http://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      })
      .then(function(result) {
        let arr = result.data.results
        const newArr = []
        for (let i = 0; i < arr.length; i++) {
          newArr.push({
            AlbumArt: arr[i].artworkUrl60,
            Artist: arr[i].artistName,
            Song: arr[i].trackName,
            Collection: arr[i].collectionName,
            CollectionPrice: arr[i].collectionPrice,
            Play: arr[i].previewUrl,
            Type: arr[i].primaryGenreName
            })
          }
        deferred.resolve(newArr)
      })
    return deferred.promise
  }
});
