const districts = [
  {
    name: 'Spawn Plaza',
    icon: '⛲',
    description: 'A landmark hub with maps, portals, banners, and a clear first impression.',
  },
  {
    name: 'Market Row',
    icon: '🛒',
    description: 'Villager trading halls, stalls, storage alleys, and color-coded awnings.',
  },
  {
    name: 'Harbor',
    icon: '⚓',
    description: 'Docks, cranes, cargo sheds, custom ships, and a waterfront promenade.',
  },
  {
    name: 'Residential Blocks',
    icon: '🏘️',
    description: 'Townhouses, gardens, lamp posts, mailboxes, and small interior stories.',
  },
  {
    name: 'Industrial Yard',
    icon: '🏭',
    description: 'Smelters, rail spurs, warehouses, chimneys, and safe redstone service rooms.',
  },
  {
    name: 'Civic Center',
    icon: '🏛️',
    description: 'City hall, courthouse, library, museum, and wide stair-lined avenues.',
  },
  {
    name: 'Skyline Core',
    icon: '🌆',
    description: 'Office towers, observation decks, rooftop gardens, and beacon accents.',
  },
  {
    name: 'Green Belt',
    icon: '🌳',
    description: 'Parks, trails, ponds, farms, custom trees, and transition space between zones.',
  },
];

const palette = [
  ['Roads', 'Deepslate, tuff, stone bricks, polished andesite'],
  ['Walls', 'Calcite, smooth stone, stripped birch, light gray concrete'],
  ['Roofs', 'Dark prismarine, warped planks, deepslate tiles, brick'],
  ['Trim', 'Spruce trapdoors, copper grates, chains, lanterns'],
];

const milestones = [
  'Sketch road grid and district borders',
  'Mark city scale with temporary wool outlines',
  'Build spawn plaza and main transit route',
  'Add one signature landmark per district',
  'Detail streets with lights, benches, signs, and greenery',
  'Connect storage, farms, villagers, and nether travel',
];

const selectedDistricts = new Set();

function renderDistricts() {
  const grid = document.querySelector('#districtGrid');
  grid.innerHTML = districts
    .map(
      (district, index) => `
        <button class="district-card" type="button" data-index="${index}" aria-pressed="false">
          <span class="district-icon" aria-hidden="true">${district.icon}</span>
          <span class="district-title">${district.name}</span>
          <span class="district-description">${district.description}</span>
        </button>
      `,
    )
    .join('');

  grid.addEventListener('click', (event) => {
    const card = event.target.closest('.district-card');
    if (!card) return;

    const index = Number(card.dataset.index);
    if (selectedDistricts.has(index)) {
      selectedDistricts.delete(index);
      card.setAttribute('aria-pressed', 'false');
    } else {
      selectedDistricts.add(index);
      card.setAttribute('aria-pressed', 'true');
    }
  });
}

function renderPalette() {
  const list = document.querySelector('#paletteList');
  list.innerHTML = palette
    .map(
      ([label, blocks]) => `
        <article class="palette-card">
          <h3>${label}</h3>
          <p>${blocks}</p>
        </article>
      `,
    )
    .join('');
}

function renderChecklist() {
  const form = document.querySelector('#checklistForm');
  form.innerHTML = milestones
    .map(
      (milestone, index) => `
        <label class="check-item">
          <input type="checkbox" name="milestone-${index}" />
          <span>${milestone}</span>
        </label>
      `,
    )
    .join('');
}

renderDistricts();
renderPalette();
renderChecklist();
