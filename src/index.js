document.addEventListener("DOMContentLoaded", () => {
  const breedsUrl = "https://dog.ceo/api/breeds/list/all";
  const breedsList = document.getElementById('dog-breeds');
  const breedDropdown = document.getElementById('breed-dropdown');

  // Fetching dog images
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(data => {
      const imagesContainer = document.getElementById('dog-image-container');
      data.message.forEach(imageUrl => {
        let img = document.createElement('img');
        img.src = imageUrl;
        img.alt = "Dog image";
        imagesContainer.appendChild(img);
      });
    });

  // Fetching breeds and adding to the list
  fetch(breedsUrl)
    .then(response => response.json())
    .then(data => {
      const breeds = data.message;
      for (const breed in breeds) {
        const li = document.createElement('li');
        li.textContent = breed;
        li.addEventListener('click', function() {
          this.style.color = 'red';  // Changing the font color on click
        });
        breedsList.appendChild(li);
      }
    })
    .catch(error => console.error('Error fetching breeds:', error));

  // Event listener for breed filter
  breedDropdown.addEventListener('change', filterBreeds);

  // Function to filter breeds based on dropdown selection
  function filterBreeds() {
    const selectedLetter = breedDropdown.value;
    const breedItems = document.querySelectorAll('#dog-breeds li');

    breedItems.forEach(breedItem => {
      if (breedItem.textContent.startsWith(selectedLetter)) {
        breedItem.style.display = 'list-item';
      } else {
        breedItem.style.display = 'none';
      }
    });
  }
});
