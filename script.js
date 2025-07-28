const steamID64 = '76561198817596493';

function showInventory() {
  const inventorySection = document.getElementById('inventory');
  inventorySection.style.display = 'block';
  const inventoryItems = document.getElementById('inventory-items');

  const inventoryUrl = `https://steamcommunity.com/inventory/${steamID64}/730/2?l=english&count=5000`;

  fetch(inventoryUrl)
    .then(response => response.json())
    .then(data => {
      const descriptions = data.descriptions;
      const assets = data.assets;

      inventoryItems.innerHTML = '';

      assets.forEach(asset => {
        const description = descriptions.find(desc => desc.classid === asset.classid && desc.instanceid === asset.instanceid);
        if (description) {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'inventory-item';

          const img = document.createElement('img');
          img.src = `https://steamcommunity-a.akamaihd.net/economy/image/${description.icon_url}`;
          img.alt = description.market_hash_name;

          const name = document.createElement('p');
          name.textContent = description.market_hash_name;

          itemDiv.appendChild(img);
          itemDiv.appendChild(name);
          inventoryItems.appendChild(itemDiv);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching inventory:', error);
      inventoryItems.innerHTML = '<p>Failed to load inventory.</p>';
    });
}

// Floating skins
const skins = ['ak.png', 'awp.png', 'm9.png', 'cobalt.png', 'blaze.png', 'bravo.png', 'mac10.png', 'keyd.png', 'gaben.png', 'gold.png'];
const floatingContainer = document.getElementById('floating-skins');
const floatingImages = [];

for (let i = 0; i < 20; i++) {
  const img = document.createElement('img');
  img.src = "assets/skins/" + skins[Math.floor(Math.random() * skins.length)];
  img.className = 'floating-skin';
  img.style.top = Math.random() * (window.innerHeight - 50) + 'px';
  img.style.left = Math.random() * (window.innerWidth - 50) + 'px';

  floatingContainer.appendChild(img);

  floatingImages.push({
    el: img,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    dx: (Math.random() - 0.75) * 0.75,
    dy: (Math.random() - 0.75) * 0.75,
  });

  img.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  img.addEventListener('click', () => {
    const skin = floatingImages.find(s => s.el === img);
    if (skin) {
      skin.dx *= 2;
      skin.dy *= 2;
    }
  });
}

function animate() {
  floatingImages.forEach(skin => {
    skin.x += skin.dx;
    skin.y += skin.dy;

    if (skin.x <= 0 || skin.x >= window.innerWidth - 50) skin.dx *= -1;
    if (skin.y <= 0 || skin.y >= window.innerHeight - 50) skin.dy *= -1;

    skin.el.style.left = skin.x + 'px';
    skin.el.style.top = skin.y + 'px';
  });

  requestAnimationFrame(animate);
}

animate();

// Review logic
const reviews = [
  "Trade went super smooth, quick replies, honest guy! I recommend him to everyone! - Hygienic",
  "Sold my ST Huntsman Knife lore MW 100% would recommend to anyone in need of clear communication quick transaction and safe trading! - Kieu",
  "Super fast and responsive, great service - 🗿⃤⃢ KING NOTHINGG",
  "Ben is one of my go to traders, always fast & reliable! Very grateful - leddy_counterstrike_gamer_69",
  "Sold an item and had the money within 15 minutes of first message. GOAT. - 🗿⃤⃢ KING NOTHINGG",
  "10/10 trader and very trustworthy - C0mplex",
  "I sold him a few items from my collection, a super efficient and competent guy. One of the best traders I ever had the pleasure of dealing with. - Thorben",
  "Bought my mw smokeout gloves, the whole transaction was quick, safe and would 100% do it again. - Mo",
];

let currentReview = 0;
const reviewText = document.getElementById("reviewText");

function cycleReviews() {
  reviewText.textContent = reviews[currentReview];
  currentReview = (currentReview + 1) % reviews.length;
}

cycleReviews();
setInterval(cycleReviews, 5000);
