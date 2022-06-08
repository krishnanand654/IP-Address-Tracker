const getdata = () => {
  var x = document.getElementById("myip").value;

  console.log(x);

  fetch(
    "http://ip-api.com/json/" +
      x +
      "?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,offset,isp,org,as,query"
  )
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);

      console.log(responseData.offset);

      d = Number(responseData.offset);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);

      document.querySelector("#ip").innerHTML = responseData.query;
      document.querySelector("#loc").innerHTML = responseData.city;
      document.querySelector("#tme").innerHTML = h + ":" + m;
      document.querySelector("#isp").innerHTML = responseData.isp;

      var map = L.map("map").setView([responseData.lat, responseData.lon], 13);

      var container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
      }

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
          "pk.eyJ1Ijoia3Jpc2huYW5hbmQiLCJhIjoiY2wyZ2NqcWJjMDJsbDNjb2F5NzV4cDJ2eiJ9.ua_3OzgWUJm0eKPygb69JQ",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1Ijoia3Jpc2huYW5hbmQiLCJhIjoiY2wyZ2NqcWJjMDJsbDNjb2F5NzV4cDJ2eiJ9.ua_3OzgWUJm0eKPygb69JQ",
        }
      ).addTo(map);

      var greenIcon = new L.Icon({
        iconUrl: "./images/icon-location.svg",
        iconSize: [40, 50],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      map.invalidateSize();

      var marker = L.marker([responseData.lat, responseData.lon], {
        icon: greenIcon,
      }).addTo(map);
    })
    .catch((error) => {
      console.log(error);
    });
};

getdata();
