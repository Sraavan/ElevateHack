function initMap() {
	var myLatLng = { lat: 43.659899, lng: -79.388492 };
	// Create a map object and specify the DOM element
	// for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 15
	});

	// Create a marker and set its position.
	var marker = new google.maps.Marker({
		map: map,
		position: myLatLng,
		title: 'My Location'
	});

	fetch("http://localhost:4001/DentalCare")
		.then(res => res.json()
			.then((res => {
				console.log(res);
				for (var i = 0; i < 24; i++) {
					var marker = new google.maps.Marker({
						map: map,
						position: { lat: res[i].Lat, lng: res[i].Lon },
						title: `${res[i].Name}`
					});
				}
			})
	));
}




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