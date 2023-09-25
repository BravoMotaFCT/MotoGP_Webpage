

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
  const cardContainer = document.getElementById('cardContainer');

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
              const lastOption = dropdown.lastElementChild;
              lastOption.selected = true; 
              const event = new Event('change');
              dropdown.dispatchEvent(event);
          })
          .catch(error => console.error('Error:', error));
  }

  dropdown.addEventListener('change', function() {
      const selectedValue = dropdown.value;
      if (selectedValue) {      
          fetch(ridersURL + selectedValue)
              .then(response => response.json())
              .then(data => {
                  // Clear previous cards
                  cardContainer.innerHTML = '';

                  position = 0;
                  data.forEach(item => {
                      position++;
                      const row = document.createElement('div'); // Create a new row div
                      row.classList.add('card-row'); // Add a class for styling

                      const card = document.createElement('div');
                      card.classList.add('card');

                      const cardContent = `
                          <div class="position">${position}.º</div>
                          <div class="rider">
                            <strong style="font-size: 1.5em;">${item.classification_rider_full_name}</strong><br>${item.classification_team_name}
                          </div>
                                                <div class="points">${item.total_points}  pts</div>
                          <div class="flag">
                              <img src="https://www.countryflagicons.com/FLAT/64/${item.classification_rider_country_iso}.png">
                          </div>
                      `;

                      card.innerHTML = cardContent;
                      row.appendChild(card); // Add the card to the row
                      cardContainer.appendChild(row); // Add the row to the container
                  });
              })
              .catch(error => console.error('Error:', error));
      }
  });

  populateDropdown();
});
