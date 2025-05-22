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
  "Bought my UU balance, everything was smooth and easy. He even let me pick the item to borrow for a week during the 7 day cooldown. - KrisGFX",
  "Second time going through B3n5 to sell an item, this time for a Skeleton Ruby I unboxed! Always fair, quick and reliable! -FFACTgg",
  "Was my first time selling skins to a cash trader, and he was very quick and helped me price my skins fairly!!! 10/10 would sell again. - leddy_counterstrike_gamer_69",
  "Sold him a CS skin worth $2k via Wise, very nice and reliable person - Crouch",
  "Sold Karambit Fade through bank. Took about 15 minutes from DMing to receiving the money. Would recommend. - Guardy"
  //"sold knife for bank tranf 417 sent as soon as item was accepted. - Garfield"
  //"Another smooth quick and reliable trade. Bought 2 knives and 2 gloves worth 1.135 USD. Recommended trader. +rep - DYZ Trades
  //"Sold a mixture of cases, capsules and skins. B3n5 was accommodating with the time it took to move items from storage and paid instantly. - Tobek"
  //"B3N5 is fastm reliable and will bend over backwards to accommodate you. He will give you a price and show you how he got to that price. My GOAT. - Lyons"
  //"sold him skeleton fade fn for around 1150€ the trade was quick and safe and i went first with the trade, highly recommend ! - Mo"
  //"My first trader outside of trading and selling sites and it was a good and fast trade. Recommend him! I would trade with him again 100%. Thank you bro - |шлюха| F8XX"
  //"Always super smooth, great price ez transaction <3 - Fawkesie"
  //"Good guy. Easy to trust and his actions and communications showed that. Would 100% do business with again. Thank you mate :) - ohheaso"
  //"Bought a few items from my inventory, he is very communicative, quick, & easy to trade with. Had no issues with recieving funds via bank transfer :) - Beige"
  //"a mutual friend connected between us and i enjoyed the trade a lot, ben was very professional, patient and quick, would trade with him again for sure - Pood"
];

let currentReview = 0;
const reviewText = document.getElementById("reviewText");

function cycleReviews() {
  reviewText.textContent = reviews[currentReview];
  currentReview = (currentReview + 1) % reviews.length;
}

cycleReviews();
setInterval(cycleReviews, 5000);
