// function initMap(callback) {
//     // Default location (e.g., New York City)
//     const mapCenter = { lat: 43.77334654509587, lng: -79.50236757866836 };
//
//     // Initialize the map
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 14,
//         center: mapCenter,
//     });
//
//     // Initialize the DirectionsService and DirectionsRenderer
//     const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     directionsRenderer.setMap(map);
//
//     // Add a search box
//     const input = document.getElementById("search-box");
//     const searchBox = new google.maps.places.SearchBox(input);
//
//     // Bias the search results towards the map's viewport
//     map.addListener("bounds_changed", () => {
//         searchBox.setBounds(map.getBounds());
//     });
//
//     // Variables to store origin and destination
//     let origin = mapCenter; // Default origin is the map's center
//     let destination = null;
//
//     // Request the user's current location
//     if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(
//             (position) => {
//                 const userLocation = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 };
//
//                 // Update map center and marker
//                 map.setCenter(userLocation);
//                 if (!originMarker) {
//                     originMarker = new google.maps.Marker({
//                         position: userLocation,
//                         map: map,
//                         title: "Your Location",
//                         icon: {
//                             url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//                         },
//                     });
//                 } else {
//                     originMarker.setPosition(userLocation);
//                 }
//             },
//             (error) => {
//                 console.error("Error retrieving location:", error.message);
//                 alert("Unable to access your location.");
//             },
//             { enableHighAccuracy: true }
//         );
//     } else {
//         alert("Geolocation is not supported by your browser.");
//     }
//
//     // Listen for search box input
//     searchBox.addListener("places_changed", () => {
//         const places = searchBox.getPlaces();
//
//         if (!places || places.length === 0) {
//             alert("No places found!");
//             return;
//         }
//
//         // Get the first place as the destination
//         const place = places[0];
//         if (place.geometry && place.geometry.location) {
//             destination = place.geometry.location;
//
//             // Add a marker for the destination
//             new google.maps.Marker({
//                 map: map,
//                 position: destination,
//                 title: place.name,
//             });
//
//             // Center the map to the destination
//             map.setCenter(destination);
//         } else {
//             alert("The place has no valid location.");
//         }
//     });
//
//     // Add event listener to "Get Route" button
//     document.getElementById("get-route").addEventListener("click", () => {
//         if (!destination) {
//             alert("Please search for a destination first.");
//             return;
//         }
//
//         // Request the route from the origin to the destination
//         directionsService.route(
//             {
//                 origin: origin,
//                 destination: destination,
//                 travelMode: google.maps.TravelMode.DRIVING, // Change if needed
//             },
//             (response, status) => {
//                 if (status === google.maps.DirectionsStatus.OK) {
//                     directionsRenderer.setDirections(response);
//                 } else {
//                     alert("Directions request failed due to " + status);
//                 }
//             }
//         );
//     });
// }
//
// // Initialize the map
// window.onload = initMap;


function initMap() {
    // Default location for map center and marker
    const mapCenter = { lat: 43.77334654509587, lng: -79.50236757866836 };

    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: mapCenter,
    });

    // Add a marker at the map's center
    new google.maps.Marker({
        position: mapCenter,
        map: map,
        title: "Default Location", // Tooltip text when hovering over the marker
    });

    // Initialize the DirectionsService and DirectionsRenderer
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Add a search box
    const input = document.getElementById("search-box");
    const searchBox = new google.maps.places.SearchBox(input);

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

// Initialize the map
window.onload = initMap;


