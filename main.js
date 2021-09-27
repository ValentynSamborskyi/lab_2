let map;
let marker;
function initMap() {
  marker = new google.maps.Marker();
  const myLatLng = { lat: 49.22659866665574, lng: 28.40824306005186 };

  let infowindow = new google.maps.InfoWindow({  });

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatLng,
  });
 
  map.addListener('click', (e) => {
      $.getJSON(
          "https://api.openweathermap.org/data/2.5/weather?lat="+e.latLng.lat()+"&lon="+e.latLng.lng()+"&appid=1b5ee5a1a74d624a74750350327ea372",
      function(json){
        var temp = parseInt(json.main.temp-273.15);
        var humidity = parseInt(json.main.humidity);
        var pressure = parseInt(json.main.pressure);
        infowindow.setContent(
        "<div id='txt', class='display-8'>"+
        "<img src='http://openweathermap.org/img/wn/"+json.weather[0].icon+".png' alt='текст'>"+
            "t = "+
            temp.toString()+
            "&#8451\n"+
                ", h = "+
                humidity.toString()+
                "%"+
                    ", p = "+
                    pressure.toString()+
                    "(hPa)" +
            "</div>");
        marker.setMap(null);
        marker = new google.maps.Marker({
          position: e.latLng,
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 0
        }
        });
        infowindow.open(map, marker);
        
    });
    
  });
  
}
