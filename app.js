
function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }
 

const getdata = () => {
  
  let token_geo = hex_to_ascii('61745f3967595442674d62524e37624c5741454361566c547454444a59496679266970416464726573733d');
  let token_map = hex_to_ascii('706b2e65794a31496a6f6961334a706332687559573568626d51694c434a68496a6f69593277795a324e7163574a6a4d444a7362444e6a623246354e7a563463444a3265694a392e75615f334f7a6757554a6d30654b5079676236394a51');

 
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
