// ß search = new SerpApi.GoogleSearch("1eca3d0052a0aaa535560e2a0bd96f3a7d6634f0fde34d1d4043fe57fb4dc557");


const secret = "1eca3d0052a0aaa535560e2a0bd96f3a7d6634f0fde34d1d4043fe57fb4dc557"

const championshipsURL = "https://racingmike.com/api/v1.0/motogp-category?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=2023";
const ridersURL = "https://racingmike.com/api/v1.0/motogp-world-standing-riders?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=2023&categoryid=";

function imageSearchStr(query, engine){
  return "https://serpapi.com/search.json?q=" + query + "&engine=" + engine;
}
function fetchRiderImage(){
  let params = {
    engine: "google_images",
    q: "Coffee",
    location: "Austin, TX, Texas, United States"
  };

  const callback = function(data) {
    console.log(data);
  };
  
  // Show result as JSON
  search.json(params, callback);
}

function fetchRiderImage2(name){
  url = imageSearchStr(name, "google_images")
  fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(option => {
      return option.images_result.link;
    });
  })
  .catch(error => console.error('Error:', error));

}

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
        .catch(error => console.error('Error:', error));ß
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
                const image = document.createElement('img');
                const riderName = item.classification_rider_full_name;
                image.src = fetchRiderImage2(riderName);
                image.alt = riderName;
                image.width = 50;
                imageCell.appendChild(image);
  
    
                row.appendChild(posCell);
                row.appendChild(nameCell);
                row.appendChild(pointsCell);
                row.appendChild(imageCell); // Append the image cell
      
                resultBody.appendChild(row);
      
              });
            })
            .catch(error => console.error('Error:', error));
        }
      });
      
  
    populateDropdown();
  });
  