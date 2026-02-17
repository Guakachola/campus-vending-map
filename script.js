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

vendingMachines.forEach(machine => {

  const marker = L.marker(machine.coords).addTo(map);

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

const vendingIcon = L.icon({
  iconUrl: 'icons/vending.png',
  iconSize: [40, 40],      // size of icon
  iconAnchor: [20, 40],    // point of icon that touches map
  popupAnchor: [0, -40]    // where popup opens relative to icon
});



