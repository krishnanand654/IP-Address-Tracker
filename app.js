  
const getdata = () => {
  
  let token_geo = config.my_api_key.geo;
  let token_map = config.my_api_key.map;

 
    var x = document.getElementById("myip").value;
    
    
    fetch("https://geo.ipify.org/api/v2/country,city?apiKey="+token_geo+x)
    .then( (response) => {
      return response.json();
    })
    .then( (responseData) => {
       
      document.querySelector('#ip').innerHTML =  responseData.ip;
      document.querySelector('#loc').innerHTML =  responseData.location.city;
      document.querySelector('#tme').innerHTML =  responseData.location.timezone;
      document.querySelector('#isp').innerHTML =  responseData.isp;

      
      var map = L.map('map').setView([responseData.location.lat, responseData.location.lng], 13);

      var container = L.DomUtil.get('map');
      if(container != null){
      container._leaflet_id = null;
      }
      
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+token_map, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: token_map
      }).addTo(map);


      var greenIcon = new L.Icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [40, 50],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      map.invalidateSize()


      var marker = L.marker([responseData.location.lat, responseData.location.lng], {icon: greenIcon}).addTo(map);
     
    


    }) 
    .catch(error => {
      console.log(error);
    })

  

  
  }

  getdata();
