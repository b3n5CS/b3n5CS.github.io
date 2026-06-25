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
// REVIEWS  —  single source of truth.
// This one list powers BOTH your rotating review line (#reviewText) and
// the new vouches feed cards, so you only edit reviews in one place.
//
// Fields:
//   author    the name shown on the card / line
//   platform  "csgorep" | "trustpilot"  (controls the badge + filter tab)
//   rating    1–5  (defaults to 5 if left out)
//   text      the review itself
//
// NOTE: I tagged your existing reviews as "csgorep" because the usernames
// look like Steam profiles. Change any that came from Trustpilot, and add
// new Trustpilot reviews using the commented example at the bottom.
// =====================================================================
const VF_REVIEWS = [
  { author: "Hygienic", platform: "csgorep", rating: 5,
    text: "Trade went super smooth, quick replies, honest guy! I recommend him to everyone!" },

  { author: "Kieu", platform: "csgorep", rating: 5,
    text: "Sold my ST Huntsman Knife lore MW 100% would recommend to anyone in need of clear communication quick transaction and safe trading!" },

  { author: "🗿⃤⃢ KING NOTHINGG", platform: "csgorep", rating: 5,
    text: "Super fast and responsive, great service" },

  { author: "leddy_counterstrike_gamer_69", platform: "csgorep", rating: 5,
    text: "Ben is one of my go to traders, always fast & reliable! Very grateful" },

  { author: "🗿⃤⃢ KING NOTHINGG", platform: "csgorep", rating: 5,
    text: "Sold an item and had the money within 15 minutes of first message. GOAT." },

  { author: "C0mplex", platform: "csgorep", rating: 5,
    text: "10/10 trader and very trustworthy" },

  { author: "Thorben", platform: "csgorep", rating: 5,
    text: "I sold him a few items from my collection, a super efficient and competent guy. One of the best traders I ever had the pleasure of dealing with." },

  { author: "Mo", platform: "csgorep", rating: 5,
    text: "Bought my mw smokeout gloves, the whole transaction was quick, safe and would 100% do it again." },

  // ----- Trustpilot reviews (from your Trustpilot page) -----
  { author: "EggleIsSmexy", platform: "trustpilot", rating: 5,
    text: "Great price, and absolutely fantastic experience all round. No faffing about and was happy to cash me out instantly. Highly rate how personable he was too, was more than happy to chat and never made me feel like I was a bother. Would 100% sell to Ben again :)" },

  { author: "Liam", platform: "trustpilot", rating: 5,
    text: "Fast response and very trustworthy. 0 problems and smooth service would recommend." },

  { author: "Connor McKean", platform: "trustpilot", rating: 5,
    text: "I sold alot of my skins to ben! he gave me a really good price for them all and I will 100% be coming back to him if i ever need to buy or sell any more!" },

  { author: "Darren Bishop", platform: "trustpilot", rating: 5,
    text: "Always fast and good rates for instant cash. Would highly recommend!" },

  { author: "Ian", platform: "trustpilot", rating: 5,
    text: "Quick, easy, fair. Best cashout I've experienced so far in CS" },

  { author: "Gabriel", platform: "trustpilot", rating: 5,
    text: "Always pleasure working with b3n5, very upfront and active Trader. Everything goes smooth and with 0 problems. Highly recommend for everyone whos willing to trade or sell, I've been customer for quite a bit and have 0 regrets." },

  { author: "Xiao", platform: "trustpilot", rating: 5,
    text: "Ben answered all my questions and was patient with me along our trade. He is responsive & will finish trades faster than online marketplaces!" },

  { author: "Daniel", platform: "trustpilot", rating: 5,
    text: "Wanted a skin from Youpin, got it in one minute, quick and easy as always. Can only recommend!!!" },

  { author: "Not Here", platform: "trustpilot", rating: 5,
    text: "He was super fast and very understanding with everything, I sold him both my knives and got paid like 1-2 minutes after I sent the trade. And very cool guy as well" },
];

// Headline numbers shown above the feed — set these to your real totals.
const VF_OVERALL = "4.9";                               // big rating number
const VF_TOTAL   = "80+";                               // shown in the subtitle line
const VF_COUNTS  = { csgorep: null, trustpilot: 80 };   // set csgorep to your real rep count (null shows "—")

// ---- vouches feed renderer (no need to edit below here) --------------
(function () {
  const grid = document.getElementById("vfGrid");

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function initialsOf(name) {
    const words = String(name).replace(/[^A-Za-z\s]/g, " ").trim().split(/\s+/).filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return "★";
  }

  function stars(n) {
    let out = "";
    for (let i = 1; i <= 5; i++) out += `<span class="${i <= n ? "on" : "off"}">★</span>`;
    return out;
  }

  const AVATARS = ["#00A3A3", "#00B67A", "#4B9CE2", "#8847FF", "#E4AE39", "#EB4B4B"];

  function card(r, i) {
    const av = AVATARS[i % AVATARS.length];
    const rating = r.rating || 5;
    const isTp = r.platform === "trustpilot";
    const label = isTp ? "Trustpilot" : "CSGORep";
    const badgeClass = isTp ? "trustpilot" : "csgorep";
    return `
      <article class="vf-card" data-platform="${esc(r.platform || "csgorep")}">
        <div class="vf-card-top">
          <div class="vf-avatar" style="background:${av}">${esc(initialsOf(r.author))}</div>
          <div class="vf-who">
            <div class="vf-name">${esc(r.author)}</div>
            <div class="vf-card-stars" aria-label="${rating} out of 5">${stars(rating)}</div>
          </div>
          <span class="vf-badge ${badgeClass}">${label}</span>
        </div>
        <p class="vf-text">${esc(r.text)}</p>
      </article>`;
  }

  // headline numbers
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("vfOverall", VF_OVERALL);
  set("vfTotal", VF_TOTAL);
  set("vfCrN", VF_COUNTS.csgorep == null ? "—" : VF_COUNTS.csgorep.toLocaleString());
  set("vfTpN", VF_COUNTS.trustpilot == null ? "—" : VF_COUNTS.trustpilot.toLocaleString());

  // "see all" link target per tab (CSGORep tab points at your profile)
  const SEE_ALL = {
    all:        { href: "https://www.trustpilot.com/review/b3n5.uk",      text: "View all reviews" },
    csgorep:    { href: "https://csgo-rep.com/profile/76561198817596493", text: "See all on CSGORep" },
    trustpilot: { href: "https://www.trustpilot.com/review/b3n5.uk",      text: "See all on Trustpilot" },
  };
  const seeAll = document.getElementById("vfSeeAll");
  const seeAllText = document.getElementById("vfSeeAllText");
  const EMPTY = {
    csgorep:    "No CSGORep reviews added yet.",
    trustpilot: "No Trustpilot reviews added yet — paste yours into script.js, or use the button above to leave one.",
    all:        "No reviews yet.",
  };

  // cards + filter
  if (grid) {
    // alternate platforms on the All tab so it's a mix, not grouped
    const interleave = arr => {
      const cr = arr.filter(r => (r.platform || "csgorep") === "csgorep");
      const tp = arr.filter(r => r.platform === "trustpilot");
      const out = []; let i = 0, j = 0;
      while (i < cr.length || j < tp.length) {
        if (i < cr.length) out.push(cr[i++]);
        if (j < tp.length) out.push(tp[j++]);
      }
      return out;
    };
    const render = filter => {
      const list = filter === "all" ? interleave(VF_REVIEWS) : VF_REVIEWS.filter(r => (r.platform || "csgorep") === filter);
      grid.innerHTML = list.length
        ? list.map(card).join("")
        : `<p style="grid-column:1/-1;color:var(--vf-text-mute);font-size:.9rem;margin:4px 2px;">${EMPTY[filter] || EMPTY.all}</p>`;
      if (seeAll && SEE_ALL[filter]) {
        seeAll.href = SEE_ALL[filter].href;
        if (seeAllText) seeAllText.textContent = SEE_ALL[filter].text;
      }
    };
    const chips = document.querySelectorAll("#vfFilters .vf-chip");
    chips.forEach(chip => chip.addEventListener("click", () => {
      chips.forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
      render(chip.dataset.filter);
    }));
    render("all");
  }
})();
