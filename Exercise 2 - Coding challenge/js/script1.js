// Function to fetch and display dog images based on the selected breed
function callAPI() {
    const apiKey = 'live_jWFifZpGS7xU4iQipmQk25UQr8rsjAUfvUmreyDUTVw7HuCKtQX0vi0O6i2vBV6f';
    const selectedBreed = document.getElementById('breedSelect').value;
    const apiEndpoint = `https://api.thedogapi.com/v1/images/search?breed_ids=${selectedBreed}&size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=4`;
    
    const headers = new Headers({
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    });

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    };

    fetch(apiEndpoint, requestOptions)
    .then(response => response.json())
    .then(data => {
        const apiResponseElement = document.getElementById('apiResponse');
        apiResponseElement.innerHTML = ''; // this clears previous content
        
        if (data.length > 0) {
            data.forEach(dog => {
                const dogImage = `<img src="${dog.url}" alt="Dog">`;
                apiResponseElement.innerHTML += dogImage;
            });
        } else {
            apiResponseElement.innerHTML = 'No images available for the selected breed.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to populate the breed dropdown with options
function populateBreedDropdown() {
    const apiKey = 'live_jWFifZpGS7xU4iQipmQk25UQr8rsjAUfvUmreyDUTVw7HuCKtQX0vi0O6i2vBV6f';
    const breedSelect = document.getElementById('breedSelect');
    const breedEndpoint = 'https://api.thedogapi.com/v1/breeds';
    
    const headers = new Headers({
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    });

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    };

    fetch(breedEndpoint, requestOptions)
    .then(response => response.json())
    .then(data => {
        // Add breed options to the dropdown
        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.text = breed.name;
            breedSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Call the function to populate the breed dropdown on page load
populateBreedDropdown();