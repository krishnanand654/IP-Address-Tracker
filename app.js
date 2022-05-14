

function cipher(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }


const getdata = () => {
  
  

  let token_map = cipher('706b2e65794a31496a6f6961334a706332687559573568626d51694c434a68496a6f69593277795a324e7163574a6a4d444a7362444e6a623246354e7a563463444a3265694a392e75615f334f7a6757554a6d30654b5079676236394a51');

 
    var x = document.getElementById("myip").value;
   

    console.log(x);
    
    fetch("http://ip-api.com/json/"+x+"?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,offset,isp,org,as,query")
    .then( (response) => {
   
      return response.json();
    
    })
    .then( (responseData) => {
      console.log(responseData);

      console.log(responseData.offset);

      d = Number(responseData.offset);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);


      document.querySelector('#ip').innerHTML =  responseData.query;
      document.querySelector('#loc').innerHTML =  responseData.city;
      document.querySelector('#tme').innerHTML =  "-"+ h +':'+ m;
      document.querySelector('#isp').innerHTML =  responseData.isp;

      
      var map = L.map('map').setView([responseData.lat, responseData.lon], 13);

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


      var marker = L.marker([responseData.lat, responseData.lon], {icon: greenIcon}).addTo(map);
     
    


    }) 
    .catch(error => {
      console.log(error);
    })

  

  
  }

  getdata();
