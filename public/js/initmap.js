function initMap() {
  // map options
  const options = {
    zoom: 8,
    center: {
      lat: 44.977456,
      lng: -93.2625
    }
  };
  // new map
  const map = new google.maps.Map(document.getElementById("map"), options);
  // Listen for click on map
  google.maps.event.addListener(map, "click", () => {
    // Add marker
  });

  // Array of markers
  const markers = [
    {
      coords: {
        lat: 42.4668,
        lng: -70.9495
      },
      iconImage: "./public/images/yaybidet.jpg",
      content: "<h1>Lynn MA</h1>"
    },
    {
      coords: {
        lat: 45.024963,
        lng: -93.173886
      },
      iconImage: "https://png.icons8.com/ios-glyphs/50/000000/bidet.png",
      content: "<h1>Bent Brewstillery</h1>"
    },
    {
      coords: {
        lat: 42.7762,
        lng: -71.0773
      }
    }
  ];

  // Add Marker Function
  const addMarker = props => {
    const marker = new google.maps.Marker({
      position: props.coords,
      map
      // icon:props.iconImage
    });

    // Check for customicon
    if (props.iconImage) {
      // Set icon image
      marker.setIcon(props.iconImage);
    }

    // Loop through markers
    // for (let i = 0; i < markers.length; i++) {
    markers.forEach(el => {
      // Add marker
      addMarker(el);
    });

    // Check content
    if (props.content) {
      const infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }
  };
  const geocoder = new google.maps.Geocoder();

  function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").value;
    geocoder.geocode(
      {
        address
      },
      (results, status) => {
        if (status === "OK") {
          resultsMap.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          console.log(
            `Geocode was not successful for the following reason: ${status}`
          );
        }
      }
    );
  }

  document.getElementById("submit").addEventListener("click", () => {
    geocodeAddress(geocoder, map);
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // infoWindow.setPosition(pos);
        // infoWindow.setContent("Location found.");
        // infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

initMap();
