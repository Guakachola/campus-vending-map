const map = L.map('map').setView([29.7199, -95.3422], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const vendingMachines = [
  {
    name: "Science Building - Floor 1",
    coords: [29.7202, -95.3430],
    drinks: [
      { name: "Coke", price: 2.25 },
      { name: "Sprite", price: 2.25 }
    ]
  },
  {
    name: "Library - Entrance",
    coords: [29.7188, -95.3415],
    drinks: [
      { name: "Dr Pepper", price: 2.50 }
    ]
  }
];

const vendingIcon = L.icon({
  iconUrl: 'assests/vending.png',
  iconSize: [40, 40],      // size of icon
  iconAnchor: [20, 40],    // point of icon that touches map
  popupAnchor: [0, -40]    // where popup opens relative to icon
});

vendingMachines.forEach(machine => {

  const marker = L.marker(machine.coords, { icon: vendingIcon}).addTo(map);

  let drinkListHTML = "<ul>";

  machine.drinks.forEach(drink => {
    drinkListHTML += `<li>${drink.name} - $${drink.price}</li>`;
  });

  drinkListHTML += "</ul>";

  marker.bindPopup(`
    <b>${machine.name}</b>
    ${drinkListHTML}
  `);

});

map.locate({
  setView: true,
  maxZoom: 17
})

map.on('locationfound', function(e) {

  const userLatLng = e.latlng;

  L.marker(userLatLng)
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

