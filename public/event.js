var arr_Latitude = []
var arr_Longitude = []
var map;
  function initMap() {
    var myLatLng = {lat: 43.659899, lng: -79.388492};
    
    
    // Create a map object and specify the DOM element
    // for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 10
    });
    
  }

  fetch("http://localhost:4001/ChildCare")
.then(res => res.json())
.then(res => {
  console.log(res);
  for (var i =0; i<10; i++){
    console.log(res[i].LOC_NAME);
    console.log(res[i].PCODE);
    console.log(res[i].run_date);
    console.log(res[i].PGSPACE)
    appendResponse(res[i].LOC_NAME, res[i].run_date, res[i].PGSPACE, i, res[i].PCODE);
    arr_Longitude.push(res[i].LONGITUDE)
    arr_Latitude.push(res[i].LATITUDE)
  }
  }).then((res) => {
  // Create a marker and set its position.
console.log(arr_Latitude)
for (let i=0;i<arr_Latitude.length;i++){
     var marker = new google.maps.Marker({
     map: map,
     position: {lat: arr_Latitude[i], lng: arr_Longitude[i]},
     title: `Location ${i}`
     });
}
});



function appendResponse(name, cap, date, i, pcode) {
	let results_row = document.querySelector('#results_row');
	var node = document.createElement("div");
	node.classList.add("row");
	node.id = `row${i}`;
	node.innerHTML = `<div class="col-md-12">
                    <h3>${name}</h3>
                    </div>
                    <div class="col-md-4">
                    <h6>Start Date: ${date} Capacity: ${cap} </h6>
                    </div>  
                    <div class="col-md-4">
                        <h6>${pcode}</h6>
                    </div>
                    `;
	results_row.appendChild(node);
}

