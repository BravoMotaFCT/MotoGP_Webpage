  

const championshipsURL = "https://racingmike.com/api/v1.0/motogp-category?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=2023";
const ridersURL = "https://racingmike.com/api/v1.0/motogp-world-standing-riders?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=2023&categoryid=";
const riderImagesURL = "https://racingmike.com/api/v1.0/rider-images?token=YOUR_TOKEN";

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('dropdown');
    const selectedOption = document.getElementById('selectedOption');
    const resultBody = document.getElementById('resultBody');
  
    function populateDropdown() {
      fetch(championshipsURL)
        .then(response => response.json())
        .then(data => {
          data.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            dropdown.appendChild(optionElement);
          });
        })
        .catch(error => console.error('Error:', error));
    }
  
    dropdown.addEventListener('change', function() {
        const selectedValue = dropdown.value;
        if (selectedValue) {
          selectedOption.textContent = `Selected Option: ${selectedValue}`;
      
          // Make a second request to the API using the selected value
          fetch(ridersURL + selectedValue)
            .then(response => response.json())
            .then(data => {
              // Clear previous table rows
              resultBody.innerHTML = '';
      
              position = 0;
              data.forEach(item => {
                position++;
                const row = document.createElement('tr');
                const posCell = document.createElement('td');
                posCell.textContent = position + ".º";
      
                const nameCell = document.createElement('td');
                nameCell.textContent = item.classification_rider_full_name;
      
                const pointsCell = document.createElement('td');
                pointsCell.textContent = item.total_points;
      
                // Add an empty cell for the rider image
                const imageCell = document.createElement('td');
      
                row.appendChild(posCell);
                row.appendChild(nameCell);
                row.appendChild(pointsCell);
                row.appendChild(imageCell); // Append the image cell
      
                resultBody.appendChild(row);
      
                // Fetch the rider image
                fetch(`${riderImagesURL}&riderid=${item.rider_id}`)
                  .then(response => response.json())
                  .then(imageData => {
                    if (imageData.length > 0) {
                      const image = document.createElement('img');
                      image.src = imageData[0].image_url; // Assuming 'image_url' is the property for the image URL
                      image.alt = item.classification_rider_full_name;
                      image.width = 50; // Set the desired width
                      imageCell.appendChild(image);
                    }
                  })
                  .catch(error => console.error('Error:', error));
              });
            })
            .catch(error => console.error('Error:', error));
        }
      });
      
  
    populateDropdown();
  });
  