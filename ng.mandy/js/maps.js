

const makeMap = async(target, center={lat:37.786231,lng:-122.399310}) => {
   await checkData(()=>window.google);

   let map_el = $(target);

   if(!map_el.data("map"))
      map_el.data({
         "map": new google.maps.Map(map_el[0], {
            center: center,
            zoom: 12,
            styles:mapStyles,
            disableDefaultUI: true
         }),
         "infoWindow": new google.maps.InfoWindow({content:''})
      });

   return map_el;
}


const makeMarkers = (map_el,map_locs,setbounds=true) => {
   let map = map_el.data("map");
   let markers = map_el.data("markers");

   if(markers) markers.forEach(o=>o.setMap(null));

   markers = [];

   map_locs.forEach(o=>{
      let pos = {
         position:o,
         map:map
      }
      if(o.icon) pos.icon = {
            url: o.icon,
            scaledSize: {
               width:40,
               height:40  
            }
         };
      let m = new google.maps.Marker(pos);
      markers.push(m);
   });

   map_el.data("markers",markers);
   if(setbounds) setTimeout(()=>setMapBounds(map_el,map_locs),150);
}



const setMapBounds = (map_el,map_locs) => {
   let map = map_el.data("map");
   let zoom = 14;

   if(map_locs.length==1) {
      map.setCenter(map_locs[0]);
      map.setZoom(zoom);
   } else if(map_locs.length==0) {
      if(window.location.protocol!=="https:") return;
      else {
         navigator.geolocation.getCurrentPosition(p=>{
            let pos = {
               lat:p.coords.latitude,
               lng:p.coords.longitude
            };
            map.setCenter(pos);
            map.setZoom(zoom);
         },(...args)=>{
            console.log("error?",args)
         },{
            enableHighAccuracy:false,
            timeout:5000,
            maximumAge:0
         });
      }
   } else {
      let bounds = new google.maps.LatLngBounds(null);
      map_locs.forEach(o=>{
         bounds.extend(o);
      });
      map.fitBounds(bounds);
   }
}















const mapStyles = [
    {
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f5f5f2"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#71c8d4"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#e5e8e7"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#8ba129"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c7c7c7"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#a0d3d3"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#91b65d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "gamma": 1.51
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road"
    },
    {
        "featureType": "road"
    },
    {},
    {
        "featureType": "road.highway"
    }
];