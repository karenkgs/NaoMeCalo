function enableScrollingWithMouseWheel() {
    map.setOptions({ scrollwheel: true });
}

function disableScrollingWithMouseWheel() {
    map.setOptions({ scrollwheel: false });
}

function initialize() {

  var markers = [];

  var  mapOptions = {
	  center: new google.maps.LatLng(-30.03, -51.21),
	  zoom: 13,
    scrollwheel: false,
	  };

  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  google.maps.event.addListener(map, 'click', function(event){
          this.setOptions({scrollwheel:true});
        });

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = 'img/pin.png'
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  var opiniaoLatLong = new google.maps.LatLng(-30.041778, -51.220882);
  var pinguimLatLong = new google.maps.LatLng(-30.037958, -51.222263);
  var image = 'img/pin.png';


  var infowindow = new google.maps.InfoWindow({
      content: '<h2 class="local">Bar Olar</h2><p class="data">28/02/2015</p>Estava na fila da festa quando um rapaz alto e moreno, com cabelo ralo,<br> e uma garrafa de cerveja na mão, me abordou e ofereceu sua comapnhia<br> de uma forma agressiva. Chamei ajuda de outras pessoas na fila para afastá-lo.'
  });

  var markerOpiniao = new google.maps.Marker({
        position: opiniaoLatLong,
        map: map,
        icon: image,
        clickable: true,
        title: "opiniao"
    });

    google.maps.event.addListener(markerOpiniao, 'click', function() {
    infowindow.open(map,markerOpiniao);
  });

}

google.maps.event.addDomListener(window, 'load', initialize);
