const vendingMachines = {
  1: {
    name: "SEC 2 - Breakout Room",
    drinks: [
      { name: "White Monster", price: 3.75 },
      { name: "Dasani", price: 2.75 },
      { name: "Water", price: 1.75 }
    ]
  },
  2: {
    name: "Library - Entrance",
    drinks: [
      { name: "Dr Pepper", price: 2.50 },
      { name: "Fanta", price: 2.25 }
    ]
  }
};

document.querySelectorAll(".marker").forEach(marker => {
  marker.addEventListener("click", () => {
    const id = marker.getAttribute("data-id");
    showMachineInfo(id);
  });
});

function showMachineInfo(id) {
  const machine = vendingMachines[id];

  document.getElementById("machine-name").innerText = machine.name;

  const drinkList = document.getElementById("drink-list");
  drinkList.innerHTML = "";

  machine.drinks.forEach(drink => {
    const li = document.createElement("li");
    li.innerText = `${drink.name} - $${drink.price}`;
    drinkList.appendChild(li);
  });

  document.getElementById("info-panel").classList.remove("hidden");
}

function closePanel() {
  document.getElementById("info-panel").classList.add("hidden");
}

