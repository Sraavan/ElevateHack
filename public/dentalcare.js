var arr_Latitude = []
var arr_Longitude = []
var map;
function initMap() {
	var myLatLng = { lat: 43.659899, lng: -79.388492 };
	// Create a map object and specify the DOM element
	// for display.
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 10
	});

	// Create a marker and set its position.
	var fdafads = new google.maps.Marker({
		map: map,
		position: myLatLng,
		title: 'My Location'
	});
}

fetch("http://localhost:4001/DentalCare")
	.then(res => res.json()
		.then((res => {
			console.log(res);
			for (var i = 0; i < 21; i++) {
				console.log(res[i].Long);
				console.log(res[i].Lat);
				arr_Longitude.push(res[i].Lat)
				arr_Latitude.push(res[i].Long)
			}
		})
		))
	.then(res => {
		console.log(arr_Latitude);
		
		for (let i = 0; i < arr_Latitude.length; i++) {
			console.log(`position: { lat: ${arr_Latitude[i]}, lng: ${arr_Longitude[i]} }`)
			var marker = new google.maps.Marker({
				map: map,
				position: { lat: arr_Latitude[i], lng: arr_Longitude[i] },
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