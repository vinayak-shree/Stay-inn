const mapFrame = document.getElementById("mapFrame");
  const apiKey = mapToken;

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function success(position) {
    // const lat = position.coords.latitude;
    // const lon = position.coords.longitude;
    // zoom level 14 = city level view
    const zoom = 14;
// 26.2124° N, 78.1772° E
const lat = position.coords.latitude;
const lon = position.coords.longitude;
    // update iframe src dynamically
    console.log("Your Postion" , lat , lon);
    
    mapFrame.src = `https://api.maptiler.com/maps/streets-v2/?key=${apiKey}#${lat},${lon},${zoom}`;
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    mapFrame.src = `https://api.maptiler.com/maps/streets-v2/?key=${apiKey}#14/26.2124/78.1772`;
  }
