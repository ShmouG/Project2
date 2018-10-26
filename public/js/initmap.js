const options = {
  zoom: 12,
  center: {
    lat: 44.977456,
    lng: -93.2625
  }
};
const map = new google.maps.Map(document.getElementById("map"), options);
function initMap() {
  // map options

  // new map
  // Listen for click on map
  google.maps.event.addListener(map, "click", event => {
    event.preventDefault();
    // Add marker
  });
  // content of marker
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Bent Brewstillery</h1>' +
    '<div id="bodyContent">' +
    "</div>" +
    '<img src="https://s3-media1.fl.yelpcdn.com/bphoto/yac1q7X_vOirkNkYgfc-sw/o.jpg" height="115" width="83">' +
    "</div>";
  // Add Marker Function
  function addMarker(props) {
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
    // Check content
    if (props.content) {
      const infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }
  }
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
      content: contentString
    },
    {
      coords: {
        lat: 44.980674,
        lng: -93.175621
      },
      iconImage: "/images/toilet-paper.png",
      content: "<h1>Minnesota State Fair Restroom</h1>"
    }
  ];
  // Loop through markers
  markers.forEach(el => {
    // add marker
    addMarker(el);
  });
}
const geocoder = new google.maps.Geocoder();

function geocodeAddress(location, resultsMap) {
  const address = document.getElementById("address").value;
  location.geocode(
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
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
        console.log(marker);
      } else {
        alert(`Geocode was not successful for the following reason: ${status}`);
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
      console.log(pos);
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
