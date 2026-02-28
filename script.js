const map = L.map('map').setView([29.7199, -95.3422], 16);
const markers = [];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const vendingMachines = [
  {
    name: "Science Building - Floor 1",
    coords: [29.7202, -95.3430],
    drinks: [
      { 
        name: "Coke", 
        history: [ {
          price: 2.25, timestamp: Date.now()} 
        ]
      },
      { 
        name: "Sprite", 
        history: [ {
          price: 2.25, timestamp: Date.now() }
        ]
      }
    ]
  },
  {
    name: "Library - Entrance",
    coords: [29.7188, -95.3415],
    drinks: [
      { 
        name: "Dr Pepper", 
        history: [{
        price: 2.50, timestamp: Date.now() }
        ]
      }
    ]
  }
];

//help function

function getLatestPrice(drink) {
  return drink.history[drink.history.length - 1].price;
}

function getLastUpdated(drink) {
  const timestamp = drink.history[drink.history.length - 1].timestamp;
  return new Date(timestamp).toLocaleString();
}

function getSubmissionCount(drink) {
  return drink.history.length;
}


function generatePopupContent(machine, index) {
  let slides = machine.drinks
    .map((drink, drinkIndex) => `
      <div class="swiper-slide">
        <div style="text-align:center;">
          <h4>${drink.name}</h4>
          <p>$${getLatestPrice(drink).toFixed(2)}</p>
          <p>${getSubmissionCount(drink)} submissions</p>
          <small>${getLastUpdated(drink)}</small><br/>
          <button onclick="showUpdateForm(${index}, ${drinkIndex})">
            Update Price
          </button>
        </div>
      </div>
    `)
    .join("");

  return `
    <div class="swiper mySwiper-${index}">
      <div class="swiper-wrapper">
        ${slides}
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  `;
}

function generateSideBar() {
  const sidebar = document.getElementById("sidebar");
  

  let content = ` 
    <button id="sidebar-close" class="sidebar-toggle">x</button>
    <div class="sidebar-header"> 
      <h2>All Drinks</h2>
    </div>
  `;

  vendingMachines.forEach(machine => {
    content += `
      <div class="machine-section">
        <h3 class="machine-title">${machine.name}</h3>
    `;

    machine.drinks.forEach(drink => {
      content += `
        <div class="drink-item">
          <div>
            <div class="drink-name">${drink.name}</div>
            <div class="drink-meta">
              ${getSubmissionCount(drink)} submissions
            </div>
          </div>
          <div class="drink-price">
            $${getLatestPrice(drink).toFixed(2)}
          </div>
        </div>
      `;
    });

    content += `</div>`;
  });

  sidebar.innerHTML = content;
}
document.addEventListener("click", function (e) {

  const app = document.getElementById("app-container");
  const openBtn = document.getElementById("sidebar-open");
  const overlay = document.getElementById("overlay");

  if (!app || !openBtn || !overlay) return;

  // OPEN SIDEBAR
  if (e.target.id === "sidebar-open") {
    app.classList.remove("sidebar-collapsed");
    openBtn.classList.add("hidden");
    overlay.classList.remove("hidden");
  }

  // CLOSE SIDEBAR
  if (e.target.id === "sidebar-close" || e.target.id === "overlay") {
    app.classList.add("sidebar-collapsed");
    openBtn.classList.remove("hidden");
    overlay.classList.add("hidden");
  }

});

const vendingIcon = L.icon({
  iconUrl: 'assests/vending.png',
  iconSize: [40, 40],      // size of icon
  iconAnchor: [20, 40],    // point of icon that touches map
  popupAnchor: [0, -40]    // where popup opens relative to icon
});
const personIcon = L.icon({
  iconUrl: 'assests/person.png',
  iconSize: [40, 40],      // size of icon
  iconAnchor: [20, 40],    // point of icon that touches map
  popupAnchor: [0, -40]    // where popup opens relative to icon
});

vendingMachines.forEach((machine, index) => {

  const marker = L.marker(machine.coords, { 
    icon: vendingIcon 
  }).addTo(map);

  marker.bindPopup(generatePopupContent(machine, index));
  marker.on('popupopen', function() {
  new Swiper(`.mySwiper-${index}`, {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

  markers.push(marker);

``});

function showUpdateForm(machineIndex, drinkIndex) {
  const machine = vendingMachines[machineIndex];
  const drink = machine.drinks[drinkIndex];

  const formHTML = `
    <div style="margin-top:10px;">
      <strong>Update ${drink.name}</strong><br/>
      <input 
        type="number" 
        step="0.01" 
        id="new-price-${machineIndex}-${drinkIndex}" 
        placeholder="New price"
        style="width:80px;"
      />
      <button onclick="submitPriceUpdate(${machineIndex}, ${drinkIndex})">
        Submit
      </button>
    </div>
  `;

  document.getElementById(`update-form-${machineIndex}`).innerHTML = formHTML;
}

function submitPriceUpdate(machineIndex, drinkIndex) {
const inout = document.getElementById(
  `new-price-${machineIndex}-${drinkIndex}`
  );

  const newPrice = pareseFloat(input.value);

  if (!isNaN(newPrice)) {
    venginMachines[machineIndex].drinks[drinkIndex].history.push({
      price: newPrice,
      timestamp: Date.now()
    });

    map.closePopup();

    const marker = markers[machineIndex];
    marker.bindPopup(generatePopupContent(veindingMachines[machineIndex], machineIndex));
    marker.openPopup();
  }
}

map.locate({
  setView: true,
  maxZoom: 17
})

map.on('locationfound', function(e) {

  const userLatLng = e.latlng;

  L.marker(userLatLng, {icon: personIcon})
    .addTo(map)
    .bindPopup("You are here!")
    .openPopup();
  
  let nearestMachine = null;
  let shortestDistance = Infinity;

  veindingMachines.forEach(machine => {
  const machineLatLng = L.latlng(machine.coords);
  const distance = userLatLng.distanceTo(machineLatLng);
  
  if (distance < shortestDistance) {
    shortestDistance = distance;
    nearestMachine = machine;
  }
  });

  if (nearestMachine) {
    L.marker(nearestMachine.coords)
    .addTo(map)
    .bindPopup(`Nearets Machine <br><br>${nearestMachine.name}</br>`);
  }

});

map.on('locationerror', function(e) {
  alert("Location access denied. Enable GPS for better experience.");
});

generateSideBar();
document.getElementById("app-container")
  .classList.add("sidebar-collapsed");
