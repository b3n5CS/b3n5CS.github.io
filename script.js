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

// =====================================================================
// REVIEWS — a mix of real CSGORep + Trustpilot reviews (no platform tag).
// The top card rotates through these, and a few more fan out when you
// hover (or tap) the stack. Edit / add / remove freely.
//   author — the name shown on the card
//   text   — the review itself
//   rating — optional, defaults to 5
// =====================================================================
const VF_REVIEWS = [
  { author: "Jay Baptist", text: "Honest and straightforward guy! Willing to answer questions and be transparent with new sellers. Appreciate the easy sale and zero hassle!" },
  { author: "Aidan Oconnor", text: "Have done many transactions with him totaling to over 5k, very trustworthy and chill dude" },
  { author: "Gus", text: "Cashed out gloves and knife, very smooth and easy — would recommend" },
  { author: "Geo", text: "Quick response, fast price up on a lot of items and very trustworthy." },
  { author: "Roy OZO", text: "Just sold my survival tiger tooth to this lad and trade went super smooth. Did not try to lowball or anything, fair prices only. Would 100% recommend to anyone selling skins, he's a lovely lad" },
  { author: "Andrew", text: "He was quick to answer and made the transaction smooth and fast. Makes selling CS2 skins an easy method for cashouts" },
  { author: "Alex", text: "One of the best CS2 traders out there. Fast and reliable. Can't go wrong with him" },
  { author: "SeveralSports", text: "Great communication, clear about pricing and reasoning for it. Even though it was cheaper items, still felt like I was a priority! Awesome guy! If you want to trade, go with this guy!!" },
  { author: "Samuel Gradel", text: "Instant cash and great response times! Good prices and a swift transaction let me secure a time-sensitive deal. Super convenient and trustworthy trader 🩶" },
  { author: "James Martin", text: "Wanted to cash out my whole inventory and my friend recommended Ben — I can say it was a seamless and easy process, will definitely be using again" },
  { author: ">.<", text: "Sold talon fade FN, my guy and my goat trader, always sorts out soon as he can. Thanks again brother" },
  { author: "KS2God", text: "$3,700 by bank wire. Absolute GOAT — fast and reliable. You can't go wrong with this guy" },
];

// ---- review deck: one card on top, a few fan out on hover/tap ----------
(function () {
  const deck = document.getElementById("vfDeck");
  if (!deck) return;

  const stackEl = deck.querySelector(".vf-deck-stack");
  const moreEl = deck.querySelector(".vf-deck-more");
  if (!stackEl || !moreEl) return;

  const MORE = 4;          // how many extra reviews fan out
  const ROTATE_MS = 5000;  // how often the top card changes

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initialsOf = name => {
    const w = String(name).replace(/[^A-Za-z\s]/g, " ").trim().split(/\s+/).filter(Boolean);
    if (w.length >= 2) return (w[0][0] + w[1][0]).toUpperCase();
    if (w.length === 1) return w[0].slice(0, 2).toUpperCase();
    return "★";
  };
  const stars = n => { let o = ""; for (let k = 0; k < 5; k++) o += `<span class="${k < n ? "on" : "off"}">★</span>`; return o; };
  const AVATARS = ["#00A3A3", "#00B67A", "#4B9CE2", "#8847FF", "#E4AE39", "#EB4B4B"];

  const cardHTML = (r, idx) => `
    <article class="vf-rev">
      <div class="vf-rev-top">
        <div class="vf-avatar" style="background:${AVATARS[idx % AVATARS.length]}">${esc(initialsOf(r.author))}</div>
        <div class="vf-who">
          <div class="vf-name">${esc(r.author)}</div>
          <div class="vf-card-stars" aria-label="${r.rating || 5} out of 5">${stars(r.rating || 5)}</div>
        </div>
      </div>
      <p class="vf-text">${esc(r.text)}</p>
    </article>`;

  let i = 0;
  const n = VF_REVIEWS.length;

  function render() {
    stackEl.innerHTML = cardHTML(VF_REVIEWS[i % n], i);
    let more = "";
    for (let k = 1; k <= Math.min(MORE, n - 1); k++) more += cardHTML(VF_REVIEWS[(i + k) % n], i + k);
    moreEl.innerHTML = more;
  }
  render();

  // rotate the top card, paused while hovering or expanded
  let hovering = false, open = false, paused = false;
  const sync = () => { paused = hovering || open; };
  setInterval(() => { if (!paused) { i = (i + 1) % n; render(); } }, ROTATE_MS);

  deck.addEventListener("mouseenter", () => { hovering = true; sync(); });
  deck.addEventListener("mouseleave", () => { hovering = false; sync(); });
  // tap to expand on touch devices
  deck.addEventListener("click", () => { open = !open; deck.classList.toggle("open", open); sync(); });
})();
