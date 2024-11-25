let map;
let marker;
let searchBox;
function initMap() {
    // Default location for map center and marker
    const mapCenter = { lat: 43.77334654509587, lng: -79.50236757866836 };

    // Initialize the map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: mapCenter,
    });

    // Add a marker at the map's center
    marker = new google.maps.Marker({
        position: mapCenter,
        map: map,
        title: "Default Location",
    });

    // Initialize the DirectionsService and DirectionsRenderer
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Add a search box
    const input = document.getElementById("search-box");
    searchBox = new google.maps.places.SearchBox(input);

    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    // Variable to store the destination
    let destination = null;

    // Listen for search box input
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) {
            alert("No places found!");
            return;
        }

        // Get the first place as the destination
        const place = places[0];
        if (place.geometry && place.geometry.location) {
            destination = place.geometry.location;

            // Add a marker for the destination
            new google.maps.Marker({
                map: map,
                position: destination,
                title: place.name,
            });

            // Center the map to the destination
            map.setCenter(destination);
        } else {
            alert("The place has no valid location.");
        }
    });

    // Add event listener to "Get Route" button
    document.getElementById("get-route").addEventListener("click", () => {
        if (!destination) {
            alert("Please search for a destination first.");
            return;
        }

        // Get selected travel mode
        // allow the user to choose between walking and driving
        const travelMode = document.getElementById("travel-mode").value;

        // Ask for the user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    // Request the route from the user's location to the destination
                    directionsService.route(
                        {
                            origin: userLocation,
                            destination: destination,
                            travelMode: google.maps.TravelMode[travelMode],
                        },
                        (response, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                directionsRenderer.setDirections(response);

                                // Extract travel time from the response
                                const route = response.routes[0];
                                const leg = route.legs[0];
                                const travelTime = leg.duration.text; // e.g., "15 mins"
                                const travelDistance = leg.distance.text; // e.g., "5 km"

                                // Display travel time
                                document.getElementById("travel-info").textContent =
                                    `Estimated time: ${travelTime} (${travelDistance})`;
                            } else {
                                alert("Directions request failed due to " + status);
                            }
                        }
                    );
                },
                (error) => {
                    console.error("Error retrieving location:", error.message);
                    alert("Unable to access your location. Please enable location services.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });
}
// quick location buttons
function goToLocation(lat, lng, locationName) {
    const location = { lat, lng };

    // Populate the search box with the location name
    const searchInput = document.getElementById("search-box");
    searchInput.value = locationName;

    // Trigger a "places_changed" event manually
    const event = new Event("places_changed");
    searchBox.addListener("places_changed", () => {
        // Manually set destination and map marker
        const destination = location;

        if (marker) {
            marker.setPosition(destination);
        } else {
            marker = new google.maps.Marker({
                position: destination,
                map: map,
                title: locationName,
            });
        }

        map.setCenter(destination);
        document.getElementById("travel-info").textContent = `Centered on: ${locationName}`;
    });
    searchBox.dispatchEvent(event); // Trigger the event
}

// Initialize the map
window.onload = initMap;


