// Define your Google Places API key
const apiKey = 'YOUR_GOOGLE_API_KEY';

// Define the place name for which you want to find nearby hotels
const placeName = 'Kigali Convention Center, Kigali, Rwanda';

// Make a request to the Google Places API using the Text Search request
const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&type=lodging&key=${apiKey}`;

// Send an HTTP GET request to the Google Places API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Extract relevant information (image names and map locations) for the nearest hotels
    const nearestHotels = data.results.map(result => {
      return {
        name: result.name,
        location: {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        },
        image: 'hotel_image.jpg', // You may need to obtain hotel images from another source
      };
    });

    // Convert the data to a JSON string
    const nearestHotelsJson = JSON.stringify(nearestHotels, null, 2);

    // Print or use the JSON data
    console.log(nearestHotelsJson);
  })
  .catch(error => {
    console.error('Error making API request:', error);
  });
