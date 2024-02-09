// Function to populate the breed dropdown with options
function populateBreedDropdown() {
    const breedSelect = document.getElementById('breedSelect');

    // Fetch dog breeds
    fetch('https://api.thedogapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => {
            // Clear existing options in the dropdown
            breedSelect.innerHTML = '';

            // Add a default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.text = 'Select a Breed';
            breedSelect.appendChild(defaultOption);

            // Add breed options to the dropdown
            data.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed.id;
                option.text = breed.name;
                breedSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching breeds:', error);
        });
}

// Function to fetch and display dog images based on the selected breed
function callAPI() {
    const selectedBreed = document.getElementById('breedSelect').value;

    // Check if a breed is selected
    if (!selectedBreed) {
        console.error('Please select a breed.');
        return;
    }

    // Fetch dog images for the selected breed
    fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${selectedBreed}&size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=4`)
        .then(response => response.json())
        .then(data => {
            const apiResponseElement = document.getElementById('apiResponse');
            apiResponseElement.innerHTML = ''; // Clear previous content

            if (data && data.length > 0) {
                data.forEach(dog => {
                    const dogImage = `<img src="${dog.url}" alt="Dog">`;
                    apiResponseElement.innerHTML += dogImage;
                });
            } else {
                apiResponseElement.innerHTML = 'No images available for the selected breed.';
            }
        })
        .catch(error => {
            console.error('Error fetching dog images:', error);
        });
}

// Call the function to populate the breed dropdown on page load
populateBreedDropdown();