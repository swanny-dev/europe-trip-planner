const STORAGE_KEY = "europe-trip-planner-v1";

const sampleTrip = {
  title: "Europe 2027",
  startDate: "2027-06-01",
  travelerA: "Ruairi",
  travelerB: "Maggie",
  theme: "coast",
  scenario: "balanced",
  bufferPercent: 12,
  whiteboardNotes: [],
  destinations: [
    {
      id: "ireland",
      name: "Ireland",
      region: "Family, coast, road trip",
      country: "Ireland",
      nights: 8,
      pace: "Anchor stop",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Slieve_League-cliffs.jpg",
      daily: { sleep: 90, food: 130, transport: 85, fun: 70 },
      ideas: [
        { id: "i1", title: "One full week based near family in Donegal", theme: "Family", cost: 150, votes: [true, true] },
        { id: "i2", title: "Rent a car for Wild Atlantic Way days", theme: "Logistics", cost: 720, votes: [true, false] },
        { id: "i3", title: "Dublin night before or after Donegal", theme: "Culture", cost: 360, votes: [false, true] }
      ]
    },
    {
      id: "london",
      name: "London",
      region: "Theatre, markets, museums",
      country: "United Kingdom",
      nights: 3,
      pace: "City hit",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=78",
      daily: { sleep: 310, food: 165, transport: 58, fun: 120 },
      ideas: [
        { id: "l1", title: "West End show night", theme: "Culture", cost: 320, votes: [true, true] },
        { id: "l3", title: "Day trip to Oxford or Brighton", theme: "Adventure", cost: 210, votes: [false, true] }
      ]
    },
    {
      id: "paris",
      name: "Paris",
      region: "Food, galleries, long walks",
      country: "France",
      nights: 2,
      pace: "Romance stop",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=78",
      daily: { sleep: 285, food: 165, transport: 45, fun: 115 },
      ideas: [
        { id: "p1", title: "Eurostar from London", theme: "Logistics", cost: 340, votes: [true, true] },
        { id: "p2", title: "One proper restaurant night", theme: "Food", cost: 260, votes: [true, true] },
        { id: "p3", title: "Louvre or Musee d'Orsay", theme: "Culture", cost: 90, votes: [true, false] }
      ]
    },
    {
      id: "italy",
      name: "Italy",
      region: "Rome, Florence, food",
      country: "Italy",
      nights: 4,
      pace: "Slow-ish finale",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=78",
      daily: { sleep: 230, food: 145, transport: 70, fun: 115 },
      ideas: [
        { id: "t1", title: "Rome plus Florence by train", theme: "Culture", cost: 420, votes: [true, true] },
        { id: "t2", title: "Cooking class or food tour", theme: "Food", cost: 290, votes: [true, true] },
        { id: "t3", title: "Add Venice if the trip stretches", theme: "Adventure", cost: 520, votes: [false, true] }
      ]
    }
  ],
  fixedCosts: [
    { id: "f1", name: "Auckland to Europe return flights", amount: 5200 },
    { id: "f2", name: "Europe connection flights and trains", amount: 1400 },
    { id: "f3", name: "Insurance, mobile, admin", amount: 650 }
  ],
  itinerary: [
    { id: "s1", destinationId: "ireland", note: "Arrive, family time, Donegal base, a few road-trip days" },
    { id: "s2", destinationId: "london", note: "Fly or ferry/train from Ireland, city days" },
    { id: "s3", destinationId: "paris", note: "Eurostar, galleries, food, neighbourhood walks" },
    { id: "s4", destinationId: "italy", note: "Rome and Florence, with one bigger food experience" }
  ]
};

const destinationImages = {
  "Austria": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Innsbruck_Goldenes_Dachl_1.jpg/1280px-Innsbruck_Goldenes_Dachl_1.jpg",
  "Croatia": "https://images.unsplash.com/photo-1555990538-c48dbe0d1d95?auto=format&fit=crop&w=1000&q=78",
  "Greece": "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=1000&q=78",
  "Iceland": "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1000&q=78",
  "Norway": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=78",
  "Germany": "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1000&q=78",
  "Czechia": "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1000&q=78",
  "Hungary": "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=78",
  "Spain": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=78",
  "Portugal": "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1000&q=78",
  "Netherlands": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1000&q=78"
};

const imageLookups = new Set();
const europeMapImage = "assets/europe-route-map.png";
const genericEuropeImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Europe_satellite_orthographic.jpg/1280px-Europe_satellite_orthographic.jpg";

const recommendedIdeas = {
  "Ireland": [
    ["irl-family-week", "One full week based near family in Donegal", "Family", 150, [true, true]],
    ["irl-slieve", "Slieve League cliffs day", "Adventure", 80, [false, true]],
    ["irl-glenveagh", "Glenveagh National Park and castle", "Culture", 90, [false, false]],
    ["irl-pub", "Proper Donegal pub night", "Food", 130, [true, true]],
    ["irl-dublin", "Dublin night before or after Donegal", "Culture", 360, [false, true]],
    ["irl-car", "Rent a car for Wild Atlantic Way days", "Logistics", 720, [true, false]],
    ["irl-giants", "Giant's Causeway if routing through Belfast", "Adventure", 220, [false, false]]
  ],
  "London": [
    ["lon-west-end", "West End show night", "Culture", 320, [true, true]],
    ["lon-hp-studio", "Warner Bros. Studio Tour London: Harry Potter", "Culture", 360, [false, true]],
    ["lon-platform", "Platform 9 3/4 at King's Cross", "Culture", 40, [false, true]],
    ["lon-minalima", "House of MinaLima Harry Potter design shop", "Culture", 60, [false, true]],
    ["lon-leadenhall", "Leadenhall Market / Diagon Alley walk", "Culture", 40, [false, true]],
    ["lon-british", "British Museum or National Gallery", "Culture", 40, [false, false]],
    ["lon-oxford", "Day trip to Oxford or Brighton", "Adventure", 210, [false, true]]
  ],
  "Paris": [
    ["par-eurostar", "Eurostar from London", "Logistics", 340, [true, true]],
    ["par-restaurant", "One proper restaurant night", "Food", 260, [true, true]],
    ["par-orsay", "Louvre or Musee d'Orsay", "Culture", 90, [true, false]],
    ["par-montmartre", "Montmartre morning and Sacre-Coeur", "Culture", 70, [false, true]],
    ["par-seine", "Seine picnic or river cruise", "Food", 120, [false, true]],
    ["par-versailles", "Versailles day trip", "Culture", 180, [false, false]],
    ["par-pastry", "Pastry crawl and coffee morning", "Food", 90, [true, true]]
  ],
  "Italy": [
    ["ita-rome-florence", "Rome plus Florence by train", "Culture", 420, [true, true]],
    ["ita-cooking", "Cooking class or food tour", "Food", 290, [true, true]],
    ["ita-colosseum", "Colosseum and Roman Forum", "Culture", 130, [true, false]],
    ["ita-vatican", "Vatican Museums or St Peter's", "Culture", 140, [false, true]],
    ["ita-trastevere", "Trastevere dinner night", "Food", 170, [true, true]],
    ["ita-uffizi", "Uffizi or Accademia in Florence", "Culture", 110, [false, false]],
    ["ita-venice", "Add Venice if the trip stretches", "Adventure", 520, [false, true]]
  ],
  "Greece": [
    ["gr-athens", "Athens ruins and rooftop dinner", "Culture", 210, [false, false]],
    ["gr-island", "One island hop: Naxos, Paros, or Santorini", "Adventure", 520, [false, false]],
    ["gr-food", "Greek food tour or cooking class", "Food", 190, [false, false]],
    ["gr-beach", "Slow beach day", "Adventure", 80, [false, false]]
  ],
  "Iceland": [
    ["ice-lagoon", "Blue Lagoon or Sky Lagoon", "Adventure", 260, [false, false]],
    ["ice-golden", "Golden Circle day", "Adventure", 280, [false, false]],
    ["ice-road", "South Coast waterfalls road trip", "Adventure", 420, [false, false]]
  ],
  "Austria": [
    ["aut-vienna", "Vienna cafes, palaces, and old town", "Culture", 180, [false, false]],
    ["aut-alps", "Austrian Alps day or overnight", "Adventure", 320, [false, false]],
    ["aut-salzburg", "Salzburg old town and Sound of Music scenery", "Culture", 220, [false, false]],
    ["aut-food", "Schnitzel, cake, and wine tavern night", "Food", 170, [false, false]]
  ],
  "Croatia": [
    ["cro-dubrovnik", "Dubrovnik walls and old town", "Culture", 170, [false, false]],
    ["cro-split", "Split and Diocletian's Palace", "Culture", 140, [false, false]],
    ["cro-island", "Island day trip or ferry hop", "Adventure", 260, [false, false]]
  ],
  "Norway": [
    ["nor-fjord", "Fjord cruise or scenic rail day", "Adventure", 360, [false, false]],
    ["nor-bergen", "Bergen harbour and mountain viewpoint", "Culture", 180, [false, false]],
    ["nor-train", "Norway in a Nutshell-style route research", "Logistics", 0, [false, false]]
  ],
  "Germany": [
    ["ger-berlin", "Berlin history and neighbourhood day", "Culture", 130, [false, false]],
    ["ger-beer", "Beer hall or food market night", "Food", 150, [false, false]],
    ["ger-train", "Use Germany as a rail hub", "Logistics", 0, [false, false]]
  ],
  "Czechia": [
    ["cze-prague", "Prague castle and old town", "Culture", 120, [false, false]],
    ["cze-beer", "Beer hall dinner", "Food", 90, [false, false]],
    ["cze-daytrip", "Cesky Krumlov or Kutna Hora day trip", "Adventure", 180, [false, false]]
  ],
  "Hungary": [
    ["hun-baths", "Budapest thermal baths", "Adventure", 110, [false, false]],
    ["hun-ruinbar", "Ruin bar and food night", "Food", 120, [false, false]],
    ["hun-danube", "Danube evening walk or cruise", "Culture", 90, [false, false]]
  ]
};

const ideaVisuals = {
  "irl-family-week": {
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Slieve_League-cliffs.jpg",
    caption: "The Donegal base is the anchor: family time, coast, and slower days."
  },
  "irl-slieve": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Slieve_League-cliffs.jpg",
    caption: "Clifftop Donegal scenery for a Wild Atlantic Way day."
  },
  "irl-glenveagh": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Glenveagh_Castle_-_Lough_Veagh.JPG",
    caption: "Castle, gardens, lake, and national-park scenery for a Donegal day."
  },
  "irl-giants": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Giant%27s_Causeway_(14).JPG",
    caption: "A bigger northern-coast add-on if the Ireland routing makes sense."
  },
  "lon-hp-studio": {
    image: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?auto=format&fit=crop&w=1000&q=78",
    caption: "A full Harry Potter studio day rather than just a quick city photo stop."
  },
  "lon-platform": {
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=78",
    caption: "A quick King's Cross Harry Potter stop, easy to fold into a London day."
  },
  "lon-leadenhall": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Leadenhall_Market,_London.jpg",
    caption: "Covered Victorian market streets with a Diagon Alley kind of feel."
  },
  "par-montmartre": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Montmartre_Paris.jpg",
    caption: "Hilly village-feel Paris: Sacre-Coeur, cafes, and wandering streets."
  },
  "ita-colosseum": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Colosseum_in_Rome,_Italy_-_April_2007.jpg",
    caption: "Classic ancient Rome: big, busy, and very worth booking ahead."
  },
  "ice-road": {
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1000&q=78",
    caption: "Waterfalls and road-trip scenery if Iceland becomes a serious wildcard."
  }
};

const countryPresets = [
  ["Albania", "Riviera, mountains, value", "Wildcard", 5, 150, 85, 55, 75],
  ["Andorra", "Pyrenees, spa, mountain roads", "Mountain add-on", 2, 210, 115, 55, 80],
  ["Austria", "Vienna, Alps, cafes", "City + mountains", 4, 245, 145, 55, 105],
  ["Belgium", "Brussels, Bruges, beer", "Easy add-on", 3, 225, 140, 45, 90],
  ["Bosnia and Herzegovina", "Mostar, Sarajevo, value", "Wildcard", 3, 145, 85, 45, 70],
  ["Bulgaria", "Sofia, mountains, Black Sea", "Value", 4, 150, 90, 45, 75],
  ["Croatia", "Coast, islands, old towns", "Sun break", 5, 220, 130, 65, 105],
  ["Cyprus", "Beaches, ruins, warm weather", "Sun break", 4, 210, 125, 70, 95],
  ["Czechia", "Prague, beer halls, architecture", "Value city", 3, 190, 115, 35, 85],
  ["Denmark", "Copenhagen, design, food", "Nordic city", 3, 310, 175, 55, 120],
  ["Estonia", "Tallinn, islands, saunas", "Nordic value", 3, 190, 110, 40, 80],
  ["Finland", "Helsinki, lakes, sauna", "Nordic calm", 4, 270, 155, 55, 105],
  ["France", "Paris, wine regions, Riviera", "Classic", 5, 285, 165, 55, 115],
  ["Germany", "Berlin, Munich, rail hubs", "Route glue", 4, 235, 145, 55, 100],
  ["Greece", "Islands, ruins, food", "Sun break", 5, 240, 145, 70, 110],
  ["Hungary", "Budapest, baths, nightlife", "Value city", 3, 175, 110, 35, 85],
  ["Iceland", "Lagoons, waterfalls, road trips", "Wildcard", 4, 330, 175, 140, 120],
  ["Ireland", "Family, coast, pubs", "Anchor stop", 7, 130, 130, 85, 70],
  ["Italy", "Rome, Florence, food", "Slow-ish", 6, 230, 145, 70, 115],
  ["Latvia", "Riga, coast, art nouveau", "Baltic add-on", 3, 175, 105, 40, 75],
  ["Lithuania", "Vilnius, castles, Baltic coast", "Baltic add-on", 3, 170, 100, 40, 75],
  ["Luxembourg", "Castles, old town, easy trains", "Tiny add-on", 2, 260, 145, 40, 80],
  ["Malta", "Warm islands, history, swimming", "Sun break", 4, 210, 125, 55, 95],
  ["Montenegro", "Bay of Kotor, mountains", "Wildcard", 4, 165, 95, 55, 80],
  ["Netherlands", "Amsterdam, canals, cycling", "City hit", 3, 270, 150, 45, 105],
  ["North Macedonia", "Ohrid, mountains, value", "Wildcard", 3, 130, 80, 45, 70],
  ["Norway", "Fjords, trains, scenery", "Big scenery", 4, 330, 170, 120, 120],
  ["Poland", "Krakow, Warsaw, value", "Value city", 4, 175, 105, 40, 80],
  ["Portugal", "Lisbon, Porto, beaches", "Good value", 5, 205, 125, 55, 95],
  ["Romania", "Transylvania, Bucharest, mountains", "Wildcard", 4, 155, 90, 50, 75],
  ["Serbia", "Belgrade, food, nightlife", "Wildcard", 3, 150, 90, 40, 75],
  ["Slovakia", "Bratislava, Tatras, castles", "Easy add-on", 3, 165, 95, 40, 75],
  ["Slovenia", "Lakes, Alps, Ljubljana", "Nature add-on", 4, 200, 115, 55, 90],
  ["Spain", "Barcelona, Madrid, tapas", "Warm city", 5, 220, 135, 55, 105],
  ["Sweden", "Stockholm, islands, design", "Nordic city", 3, 295, 165, 55, 110],
  ["Switzerland", "Alps, trains, lakes", "Splurge", 3, 360, 190, 110, 140],
  ["Turkey", "Istanbul, food, history", "Stopover plus", 4, 190, 115, 45, 85],
  ["United Kingdom", "London, theatre, rail trips", "City hit", 4, 310, 165, 58, 120]
];

const timingWindows = [
  { id: "may", name: "May 2027", startDate: "2027-05-10", cost: 82, weather: 72, crowds: 78, note: "Shoulder season, good for cities and Ireland before peak summer." },
  { id: "june", name: "June 2027", startDate: "2027-06-01", cost: 70, weather: 84, crowds: 62, note: "Best all-rounder: longer days, warmer Italy, not full July chaos." },
  { id: "july", name: "July 2027", startDate: "2027-07-05", cost: 55, weather: 90, crowds: 38, note: "Peak Europe summer. Warm and lively, but more expensive and busier." },
  { id: "august", name: "August 2027", startDate: "2027-08-02", cost: 50, weather: 88, crowds: 34, note: "Hot, busy, and holiday-heavy in Europe. Better for beaches than cities." },
  { id: "sept", name: "September 2027", startDate: "2027-09-06", cost: 76, weather: 80, crowds: 74, note: "Great Italy and Paris window; Ireland can still be lovely but less predictable." }
];

const stopoverOptions = [
  { id: "singapore", city: "Singapore", country: "Singapore", airport: "SIN", score: 86, cost: 260, image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=78", note: "Easy, clean, great food, gentle first stop from Auckland.", bestFor: "Food, gardens, pool recovery", sample: "Hawker dinner, Gardens by the Bay, airport hotel sleep", caution: "Very low-friction, but humid if you leave the airport." },
  { id: "dubai", city: "Dubai", country: "United Arab Emirates", airport: "DXB", score: 78, cost: 230, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=78", note: "Very common Europe connector with Emirates; hot if you leave the airport.", bestFor: "Simple Emirates routing", sample: "Old Dubai creek, mall/food stop, hotel sleep", caution: "Can be brutally hot in July and August." },
  { id: "bangkok", city: "Bangkok", country: "Thailand", airport: "BKK", score: 76, cost: 220, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bangkok_skytrain_sunset.jpg", note: "Food-first stopover with a very different feel before Europe.", bestFor: "Street food, markets, value", sample: "Hotel sleep, Thai dinner, massage, short city wander", caution: "Can add routing complexity depending on airline pricing." },
  { id: "doha", city: "Doha", country: "Qatar", airport: "DOH", score: 74, cost: 220, image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1000&q=78", note: "Qatar routing, often efficient fares, compact stopover.", bestFor: "Efficient fares and short layovers", sample: "Souq Waqif, museum/corniche, airport hotel", caution: "Great logistics, less natural as a mini-holiday." }
];

const destinationClimate = {
  "Ireland": { may: 74, june: 78, july: 72, august: 70, sept: 76, note: "Shoulder months suit coast and road-trip days; peak summer is busier." },
  "United Kingdom": { may: 76, june: 80, july: 76, august: 72, sept: 78, note: "London works most months; June and September usually feel easiest." },
  "France": { may: 78, june: 82, july: 70, august: 64, sept: 84, note: "Paris is strong in May, June, and September; August can feel holiday-thinned." },
  "Italy": { may: 82, june: 86, july: 66, august: 58, sept: 88, note: "June and September are best for warmth without full heat and crowds." },
  "Greece": { may: 78, june: 88, july: 74, august: 68, sept: 90, note: "Islands shine in June and September; July and August are busy." },
  "Iceland": { may: 64, june: 84, july: 86, august: 80, sept: 68, note: "Summer gives long daylight; September has more weather tradeoff." },
  "Croatia": { may: 76, june: 88, july: 74, august: 68, sept: 86, note: "The coast is excellent in June and September; peak summer is crowded." },
  "Norway": { may: 68, june: 84, july: 88, august: 78, sept: 66, note: "Fjords are best in high summer, with September turning cooler." },
  "Austria": { may: 76, june: 84, july: 78, august: 74, sept: 82, note: "Cities and Alps are strong from May to September." },
  "Belgium": { may: 76, june: 80, july: 74, august: 72, sept: 78, note: "Easy add-on most months; shoulder months are calmer." },
  "Czechia": { may: 78, june: 82, july: 74, august: 72, sept: 82, note: "Prague is best before or after peak summer." },
  "Bulgaria": { may: 76, june: 84, july: 78, august: 76, sept: 84, note: "Mountains and cities work well in June/September; coast is better in summer." },
  "Germany": { may: 76, june: 82, july: 76, august: 74, sept: 80, note: "Reliable rail-hub weather from May through September." },
  "Hungary": { may: 78, june: 82, july: 70, august: 68, sept: 82, note: "Budapest is lovelier outside the hottest peak weeks." },
  "Netherlands": { may: 76, june: 80, july: 74, august: 72, sept: 78, note: "Amsterdam-style city time works best in shoulder-ish windows." },
  "Portugal": { may: 82, june: 86, july: 78, august: 76, sept: 88, note: "Portugal is excellent in June and September." },
  "Spain": { may: 82, june: 84, july: 66, august: 62, sept: 86, note: "September is a standout if Spain is added." },
  "Switzerland": { may: 70, june: 84, july: 86, august: 82, sept: 78, note: "Alpine scenery improves into summer; costs stay high." },
  "Turkey": { may: 82, june: 84, july: 70, august: 68, sept: 86, note: "Istanbul is great in May, June, and September." }
};

const airportCodes = {
  "Auckland": "AKL",
  "Ireland": "DUB",
  "United Kingdom": "LHR",
  "France": "CDG",
  "Italy": "FCO",
  "Greece": "ATH",
  "Iceland": "KEF",
  "Croatia": "SPU",
  "Germany": "BER",
  "Czechia": "PRG",
  "Hungary": "BUD",
  "Spain": "BCN",
  "Portugal": "LIS",
  "Netherlands": "AMS",
  "Norway": "OSL",
  "Switzerland": "ZRH",
  "Austria": "VIE",
  "Belgium": "BRU",
  "Denmark": "CPH",
  "Finland": "HEL",
  "Albania": "TIA",
  "Andorra": "BCN",
  "Bosnia and Herzegovina": "SJJ",
  "Bulgaria": "SOF",
  "Cyprus": "LCA",
  "Estonia": "TLL",
  "Latvia": "RIX",
  "Lithuania": "VNO",
  "Luxembourg": "LUX",
  "Malta": "MLA",
  "Montenegro": "TIV",
  "North Macedonia": "SKP",
  "Poland": "KRK",
  "Romania": "OTP",
  "Serbia": "BEG",
  "Slovakia": "BTS",
  "Slovenia": "LJU",
  "Sweden": "ARN",
  "Turkey": "IST"
};

let trip = loadTrip();

const appShell = document.querySelector(".app-shell");
const tripTitle = document.querySelector("#tripTitle");
const themeSelect = document.querySelector("#themeSelect");
const viewerRoleSelect = document.querySelector("#viewerRoleSelect");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const tripSettings = document.querySelector("#tripSettings");
const mapOverview = document.querySelector("#mapOverview");
const destinationGrid = document.querySelector("#destinationGrid");
const destinationTemplate = document.querySelector("#destinationTemplate");
const budgetBars = document.querySelector("#budgetBars");
const budgetTotal = document.querySelector("#budgetTotal");
const fixedCostList = document.querySelector("#fixedCostList");
const assumptionTable = document.querySelector("#assumptionTable");
const itineraryList = document.querySelector("#itineraryList");
const ideaDialog = document.querySelector("#ideaDialog");
const ideaForm = document.querySelector("#ideaForm");
const ideaDestination = document.querySelector("#ideaDestination");
const destinationDialog = document.querySelector("#destinationDialog");
const destinationForm = document.querySelector("#destinationForm");
const countryPresetSelect = document.querySelector("#countryPresetSelect");
const windowGrid = document.querySelector("#windowGrid");
const timingMatrix = document.querySelector("#timingMatrix");
const stopoverGrid = document.querySelector("#stopoverGrid");
const flightSearchGrid = document.querySelector("#flightSearchGrid");
const quoteList = document.querySelector("#quoteList");
const budgetSnapshot = document.querySelector("#budgetSnapshot");
const syncStatus = document.querySelector("#syncStatus");
const whiteboardForm = document.querySelector("#whiteboardForm");
const whiteboardBoard = document.querySelector("#whiteboardBoard");

let remoteReady = false;
let applyingRemoteTrip = false;
let remoteSaveTimer;
let lastRemotePayload = "";

function loadTrip() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return structuredClone(sampleTrip);
  try {
    return { ...structuredClone(sampleTrip), ...JSON.parse(stored) };
  } catch {
    return structuredClone(sampleTrip);
  }
}

function saveTrip() {
  const payload = JSON.stringify(trip);
  localStorage.setItem(STORAGE_KEY, payload);
  if (remoteReady && !applyingRemoteTrip) scheduleRemoteSave(payload);
}

async function syncRemoteTrip() {
  if (location.protocol === "file:") return;
  setSyncStatus("Checking shared save...");
  try {
    const response = await fetch("/api/trip", { cache: "no-store" });
    if (response.ok) {
      const remoteTrip = await response.json();
      if (remoteTrip?.destinations?.length) {
        applyingRemoteTrip = true;
        trip = { ...structuredClone(sampleTrip), ...remoteTrip };
        render();
        applyingRemoteTrip = false;
      }
    }
    remoteReady = true;
    setSyncStatus("Shared save on");
    saveTrip();
  } catch {
    remoteReady = false;
    setSyncStatus("Local save only");
  }
}

function scheduleRemoteSave(payload) {
  if (payload === lastRemotePayload) return;
  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(() => {
    lastRemotePayload = payload;
    fetch("/api/trip", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: payload
    })
      .then((response) => {
        if (!response.ok) throw new Error("Save failed");
        setSyncStatus("Saved online");
      })
      .catch(() => {
        lastRemotePayload = "";
        setSyncStatus("Save retry needed");
      });
  }, 350);
}

function setSyncStatus(message) {
  if (syncStatus) syncStatus.textContent = message;
}

function money(value) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

function scenarioMultiplier() {
  return { lean: 0.86, balanced: 1, comfort: 1.22 }[trip.scenario] || 1;
}

function destinationCost(destination) {
  const dailyTotal = Object.values(destination.daily).reduce((sum, value) => sum + Number(value || 0), 0);
  return dailyTotal * Number(destination.nights || 0) * scenarioMultiplier();
}

function ideasCost() {
  return trip.destinations.flatMap((destination) => destination.ideas).reduce((sum, idea) => {
    const voteCount = idea.votes.filter(Boolean).length;
    return sum + (voteCount === 2 ? Number(idea.cost || 0) : 0);
  }, 0);
}

function quoteTotal() {
  return (trip.flightQuotes || []).reduce((sum, quote) => sum + Number(quote.amount || 0), 0);
}

function isTravelAllowance(cost) {
  return /flight|train|rail|connection/i.test(`${cost.id || ""} ${cost.name || ""}`);
}

function calculateBudget() {
  const stays = trip.destinations.reduce((sum, destination) => sum + destinationCost(destination), 0);
  const fixedCosts = trip.fixedCosts.filter((item) => item.id !== "flight-live");
  const travelAllowance = fixedCosts
    .filter(isTravelAllowance)
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const fixed = fixedCosts
    .filter((item) => !isTravelAllowance(item))
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const quotes = quoteTotal();
  const travel = quotes || travelAllowance;
  const ideas = ideasCost();
  const subtotal = stays + fixed + travel + ideas;
  const buffer = subtotal * (Number(trip.bufferPercent || 0) / 100);
  return {
    fixed,
    travel,
    travelAllowance,
    quotes,
    stays,
    ideas,
    buffer,
    total: subtotal + buffer
  };
}

function render() {
  normalizeTrip();
  deriveStopDates();
  syncStartDateFromFirstStop();
  syncQuoteRows(buildFlightSearches());
  saveTrip();
  const lockedRole = roleFromUrl();
  appShell.dataset.theme = trip.theme;
  themeSelect.value = trip.theme;
  viewerRoleSelect.value = viewerRole();
  viewerRoleSelect.disabled = Boolean(lockedRole);
  viewerRoleSelect.title = lockedRole ? "This role is set by the share link" : "";
  tripTitle.textContent = trip.title;
  renderSummary();
  renderSettings();
  renderMap();
  renderDestinations();
  renderBudget();
  renderItinerary();
  renderIdeaDestinations();
  renderCountryPresets();
  renderTiming();
  renderFlights();
  renderWhiteboard();
  resolveMissingDestinationImages();
}

function renderSummary() {
  document.querySelector("#summaryDays").textContent = trip.destinations.reduce((sum, destination) => sum + Number(destination.nights || 0), 0);
  document.querySelector("#summaryCost").textContent = money(calculateBudget().total);
  document.querySelector("#summaryVotes").textContent = trip.destinations.flatMap((destination) => destination.ideas).reduce((sum, idea) => sum + idea.votes.filter(Boolean).length, 0);
}

function renderSettings() {
  field(tripSettings, "title").value = trip.title;
  field(tripSettings, "startDate").value = trip.startDate;
  field(tripSettings, "travelerA").value = trip.travelerA;
  field(tripSettings, "travelerB").value = trip.travelerB;
  field(tripSettings, "scenario").value = trip.scenario;
  field(tripSettings, "bufferPercent").value = trip.bufferPercent;
}

function renderMap() {
  mapOverview.innerHTML = `
    <div>
      <p class="eyebrow">Map overview</p>
      <h3>The route we already know we want</h3>
    </div>
    <figure class="map-canvas">
      <img src="${europeMapImage}" alt="Illustrated map focused on Ireland, London, Paris, and Italy" />
      <div class="map-labels" aria-hidden="true">
        <span class="map-label map-label-ireland">Ireland</span>
        <span class="map-label map-label-london">London</span>
        <span class="map-label map-label-paris">Paris</span>
        <span class="map-label map-label-italy">Italy</span>
      </div>
      <figcaption>Focused on the confirmed spine of the trip: family in Ireland, then London, Paris, and Italy.</figcaption>
    </figure>
  `;
}

function renderDestinations() {
  destinationGrid.innerHTML = "";
  trip.destinations.forEach((destination) => {
    const node = destinationTemplate.content.cloneNode(true);
    const card = node.querySelector(".destination-card");
    card.dataset.id = destination.id;
    card.classList.toggle("is-stopover", Boolean(destination.isStopover));
    const media = node.querySelector(".destination-media");
    if (destination.image) {
      media.style.backgroundImage = `linear-gradient(135deg, rgba(18, 24, 22, 0.06), rgba(18, 24, 22, 0.24)), url("${destination.image}")`;
    } else {
      media.classList.add("destination-media-empty");
      media.textContent = destination.country || destination.name;
    }
    node.querySelector(".destination-region").textContent = destination.region;
    node.querySelector("h3").textContent = destination.name;
    node.querySelector(".pill").textContent = destination.pace;
    const yesCount = destination.ideas.filter((idea) => idea.votes.every(Boolean)).length;
    const progress = document.createElement("div");
    progress.className = "destination-progress";
    progress.innerHTML = `
      <span>${yesCount}/${destination.nights} day slots have mutual yes ideas</span>
      <div class="score-track"><div class="score-fill" style="width:${Math.min(100, (yesCount / Math.max(1, destination.nights)) * 100)}%"></div></div>
    `;
    const deleteButton = node.querySelector(".destination-delete");
    deleteButton.hidden = trip.destinations.length < 2 || destination.isStopover;
    deleteButton.addEventListener("click", () => {
      trip.destinations = trip.destinations.filter((entry) => entry.id !== destination.id);
      trip.itinerary = trip.itinerary.filter((entry) => entry.destinationId !== destination.id);
      render();
    });
    const nightsInput = node.querySelector(".destination-nights");
    nightsInput.value = destination.nights;
    nightsInput.addEventListener("input", (event) => {
      destination.nights = Number(event.target.value);
      render();
    });
    const ideaList = node.querySelector(".idea-list");
    ideaList.before(progress);
    destination.ideas.forEach((idea) => ideaList.append(createIdeaItem(destination, idea)));
    destinationGrid.append(node);
  });
}

function createIdeaItem(destination, idea) {
  const role = viewerRole();
  const item = document.createElement("div");
  item.className = "idea-item";
  const startDate = idea.startDate || idea.date || "";
  const endDate = idea.endDate || "";
  const visual = ideaVisualFor(idea, destination);
  item.innerHTML = `
    <div class="idea-copy">
      <strong>${idea.title}</strong>
      <p class="idea-meta">${idea.theme} - ${money(idea.cost)}</p>
    </div>
    <div class="idea-row-controls">
      ${scheduleDetails(`${idea.title} date range`, startDate, endDate, "Set dates", "idea-schedule")}
      <div class="vote-buttons">
        <button class="vote-button ${idea.votes[0] ? "is-active" : ""}" data-voter="0" title="${trip.travelerA} vote" ${role !== "ruairi" ? "disabled" : ""}>${initials(trip.travelerA)}</button>
        <button class="vote-button ${idea.votes[1] ? "is-active" : ""}" data-voter="1" title="${trip.travelerB} vote" ${role !== "maggie" ? "disabled" : ""}>${initials(trip.travelerB)}</button>
        <button class="delete-button" title="Delete idea">&times;</button>
      </div>
    </div>
    ${visual ? ideaVisualDetails(visual) : ""}
  `;
  attachScheduleControl(item.querySelector(".schedule-details"), ({ startDate: nextStartDate, endDate: nextEndDate }) => {
    idea.startDate = nextStartDate;
    idea.date = nextStartDate;
    idea.endDate = nextEndDate;
    saveTrip();
    renderTimingMatrix();
    renderFlights();
  });
  item.querySelectorAll(".vote-button").forEach((button) => {
    button.addEventListener("click", () => {
      idea.votes[Number(button.dataset.voter)] = !idea.votes[Number(button.dataset.voter)];
      render();
    });
  });
  item.querySelector(".delete-button").addEventListener("click", () => {
    destination.ideas = destination.ideas.filter((entry) => entry.id !== idea.id);
    render();
  });
  return item;
}

function ideaVisualFor(idea, destination) {
  const visual = idea.visual || ideaVisuals[idea.id];
  if (visual?.image) return visual;
  return null;
}

function ideaVisualDetails(visual) {
  return `
    <details class="idea-visual">
      <summary>Preview</summary>
      <div class="idea-visual-panel">
        <img src="${escapeAttribute(visual.image)}" alt="" loading="lazy" />
        <p>${escapeHtml(visual.caption || "A quick visual cue for this idea.")}</p>
      </div>
    </details>
  `;
}

function initials(name) {
  return String(name || "?").trim().slice(0, 1).toUpperCase();
}

function viewerRole() {
  const role = roleFromUrl() || normalizeRole(localStorage.getItem("europe-trip-viewer-role")) || "ruairi";
  return role === "maggie" ? "maggie" : "ruairi";
}

function viewerName() {
  return viewerRole() === "maggie" ? trip.travelerB : trip.travelerA;
}

function roleFromUrl() {
  return normalizeRole(new URLSearchParams(window.location.search).get("role"));
}

function normalizeRole(role) {
  if (role === "rory" || role === "ruairi") return "ruairi";
  if (role === "maggie") return "maggie";
  return "";
}

function renderBudget() {
  const budget = calculateBudget();
  budgetTotal.textContent = money(budget.total);
  const rows = [
    ["Admin and other fixed costs", budget.fixed],
    [budget.quotes ? "Flight and rail quotes" : "Flight and rail allowance", budget.travel],
    ["Stays and daily spend", budget.stays],
    ["Mutual yes ideas", budget.ideas],
    ["Buffer", budget.buffer]
  ];
  budgetBars.innerHTML = "";
  rows.forEach(([label, value]) => {
    const percent = budget.total ? Math.round((value / budget.total) * 100) : 0;
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <div class="bar-row-top"><span>${label}</span><span>${money(value)}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${percent}%"></div></div>
    `;
    budgetBars.append(row);
  });
  renderBudgetSnapshot(budget);
  renderFixedCosts();
  renderAssumptions();
}

function renderBudgetSnapshot(budget) {
  const nights = trip.destinations.reduce((sum, destination) => sum + Number(destination.nights || 0), 0);
  const perNight = nights ? Math.round(budget.total / nights) : 0;
  const quoteAmount = quoteTotal();
  const budgetWithoutBuffer = budget.total - budget.buffer;
  budgetSnapshot.innerHTML = `
    <div><span>Trip length</span><strong>${nights} nights</strong></div>
    <div><span>Avg per night</span><strong>${money(perNight)}</strong></div>
    <div><span>${quoteAmount ? "Quote total" : "Travel allowance"}</span><strong>${money(quoteAmount || budget.travelAllowance)}</strong></div>
    <div><span>Before buffer</span><strong>${money(budgetWithoutBuffer)}</strong></div>
    <div><span>Buffer</span><strong>${trip.bufferPercent}%</strong></div>
  `;
}

function renderFixedCosts() {
  fixedCostList.innerHTML = "";
  trip.fixedCosts.forEach((cost) => {
    const row = document.createElement("div");
    row.className = "cost-row";
    row.innerHTML = `
      <input value="${escapeAttribute(cost.name)}" aria-label="Cost name" />
      <input value="${cost.amount}" type="number" min="0" step="10" aria-label="Cost amount" />
      <button class="delete-button" title="Delete fixed cost">&times;</button>
    `;
    const [nameInput, amountInput] = row.querySelectorAll("input");
    nameInput.addEventListener("input", () => {
      cost.name = nameInput.value;
      render();
    });
    amountInput.addEventListener("input", () => {
      cost.amount = Number(amountInput.value);
      render();
    });
    row.querySelector("button").addEventListener("click", () => {
      trip.fixedCosts = trip.fixedCosts.filter((item) => item.id !== cost.id);
      render();
    });
    fixedCostList.append(row);
  });
}

function renderAssumptions() {
  assumptionTable.innerHTML = "";
  const heading = document.createElement("div");
  heading.className = "assumption-row";
  heading.innerHTML = "<strong>Place</strong><strong>Sleep</strong><strong>Food</strong><strong>Transport</strong><strong>Fun</strong>";
  assumptionTable.append(heading);
  trip.destinations.forEach((destination) => {
    const row = document.createElement("div");
    row.className = "assumption-row";
    row.innerHTML = `
      <strong>${destination.name}</strong>
      <input value="${destination.daily.sleep}" type="number" min="0" step="5" aria-label="${destination.name} sleep" />
      <input value="${destination.daily.food}" type="number" min="0" step="5" aria-label="${destination.name} food" />
      <input value="${destination.daily.transport}" type="number" min="0" step="5" aria-label="${destination.name} transport" />
      <input value="${destination.daily.fun}" type="number" min="0" step="5" aria-label="${destination.name} fun" />
    `;
    const [sleep, food, transport, fun] = row.querySelectorAll("input");
    sleep.addEventListener("input", () => updateDaily(destination, "sleep", sleep.value));
    food.addEventListener("input", () => updateDaily(destination, "food", food.value));
    transport.addEventListener("input", () => updateDaily(destination, "transport", transport.value));
    fun.addEventListener("input", () => updateDaily(destination, "fun", fun.value));
    assumptionTable.append(row);
  });
}

function renderWhiteboard() {
  if (!whiteboardBoard) return;
  whiteboardBoard.innerHTML = "";
  if (!trip.whiteboardNotes.length) {
    whiteboardBoard.innerHTML = `<div class="empty-board">No pins yet. Add the messy stuff here before it becomes a real destination or idea.</div>`;
    return;
  }
  trip.whiteboardNotes.forEach((note) => {
    const card = document.createElement("article");
    card.className = "whiteboard-note";
    card.innerHTML = `
      <p>${escapeHtml(note.text)}</p>
      <div class="whiteboard-note-footer">
        <span>${escapeHtml(note.author || "?")}</span>
        <time>${formatShortDate(note.createdAt?.slice(0, 10)) || ""}</time>
        <button class="delete-button" title="Delete note">&times;</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      trip.whiteboardNotes = trip.whiteboardNotes.filter((entry) => entry.id !== note.id);
      render();
    });
    whiteboardBoard.append(card);
  });
}

function updateDaily(destination, key, value) {
  destination.daily[key] = Number(value);
  render();
}

function renderItinerary() {
  itineraryList.innerHTML = "";
  trip.itinerary.forEach((stop, index) => {
    const destination = trip.destinations.find((item) => item.id === stop.destinationId);
    const stopEndDate = stop.endDate || addDays(stop.startDate, Number(destination?.nights || 0));
    const item = document.createElement("div");
    item.className = "itinerary-item";
    item.innerHTML = `
      <span class="stop-index">${index + 1}</span>
      <select aria-label="Destination">${trip.destinations.map((entry) => `<option value="${entry.id}" ${entry.id === stop.destinationId ? "selected" : ""}>${entry.name}</option>`).join("")}</select>
      <strong>${destination?.nights || 0} nights</strong>
      ${scheduleDetails(`${destination?.name || "Stop"} date range`, stop.startDate || "", stopEndDate || "", "Set dates", "stop-schedule")}
      <input data-stop-note value="${escapeAttribute(stop.note || "")}" aria-label="Stop note" />
      <div class="itinerary-actions">
        <button class="move-button" title="Move up">&uarr;</button>
        <button class="move-button" title="Move down">&darr;</button>
        <button class="delete-button" title="Delete stop">&times;</button>
      </div>
    `;
    const select = item.querySelector("select");
    const note = item.querySelector("[data-stop-note]");
    const [upButton, downButton, deleteButton] = item.querySelectorAll(".itinerary-actions button");
    select.addEventListener("change", () => {
      stop.destinationId = select.value;
      stop.endDate = "";
      render();
    });
    attachScheduleControl(item.querySelector(".schedule-details"), ({ startDate: nextStartDate, endDate: nextEndDate }) => {
      stop.startDate = nextStartDate;
      stop.endDate = nextEndDate;
      if (index === 0) trip.startDate = nextStartDate;
      syncStartDateFromFirstStop();
      saveTrip();
      renderSettings();
      renderFlights();
    }, () => {
      render();
    });
    note.addEventListener("input", () => {
      stop.note = note.value;
      render();
    });
    upButton.disabled = index === 0;
    downButton.disabled = index === trip.itinerary.length - 1;
    upButton.addEventListener("click", () => moveStop(index, -1));
    downButton.addEventListener("click", () => moveStop(index, 1));
    deleteButton.addEventListener("click", () => {
      trip.itinerary = trip.itinerary.filter((entry) => entry.id !== stop.id);
      render();
    });
    itineraryList.append(item);
  });
}

function moveStop(index, offset) {
  const next = index + offset;
  if (next < 0 || next >= trip.itinerary.length) return;
  const [item] = trip.itinerary.splice(index, 1);
  trip.itinerary.splice(next, 0, item);
  render();
}

function renderIdeaDestinations() {
  ideaDestination.innerHTML = trip.destinations.map((destination) => `<option value="${destination.id}">${destination.name}</option>`).join("");
}

function renderCountryPresets() {
  countryPresetSelect.innerHTML = `<option value="">Choose from Europe</option>${countryPresets
    .map((preset) => `<option value="${preset[0]}">${preset[0]}</option>`)
    .join("")}`;
}

function renderTiming() {
  windowGrid.innerHTML = "";
  timingWindows.forEach((windowOption) => {
    const selected = trip.timingWindowId === windowOption.id;
    const fit = timingFitForWindow(windowOption.id);
    const card = document.createElement("article");
    card.className = `window-card ${selected ? "is-selected" : ""}`;
    const tag = timingWindowTag(windowOption);
    card.innerHTML = `
      <div class="window-card-top">
        <div>
          <h3>${windowOption.name}</h3>
          <span class="window-tag"><span>${tag.icon}</span>${tag.label}</span>
        </div>
        <span class="fit-score" title="Route fit score">${fit}</span>
      </div>
      <p>${windowOption.note}</p>
      <p class="window-metrics">Price ${windowOption.cost}/100 - Weather ${windowOption.weather}/100 - Crowd ease ${windowOption.crowds}/100</p>
      <button class="${selected ? "primary-button" : "secondary-button"}">${selected ? "Selected" : "Use this window"}</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      trip.timingWindowId = windowOption.id;
      trip.startDate = windowOption.startDate;
      if (trip.itinerary?.[0]) {
        trip.itinerary[0].startDate = windowOption.startDate;
        trip.itinerary[0].endDate = "";
      }
      render();
    });
    windowGrid.append(card);
  });

  renderTimingMatrix();
}

function timingWindowTag(windowOption) {
  const tags = {
    may: { icon: "&#9675;", label: "Calmer crowds" },
    june: { icon: "&#9680;", label: "Best balance" },
    july: { icon: "&#9728;", label: "Hottest weather" },
    august: { icon: "&#9650;", label: "Peak summer" },
    sept: { icon: "&#9682;", label: "Shoulder sweet spot" }
  };
  return tags[windowOption.id] || { icon: "&#9675;", label: "Timing option" };
}

function renderTimingMatrix() {
  const selectedWindow = timingWindows.find((windowOption) => windowOption.id === trip.timingWindowId) || timingWindows[1];
  const itineraryStops = itineraryStopsInOrder();
  timingMatrix.innerHTML = "";
  itineraryStops.forEach(({ stop, destination }) => {
    const climate = climateForDestination(destination);
    const score = climate[selectedWindow.id] || 76;
    const ideas = scheduledIdeasForDestination(destination);
    const stopEndDate = stop.endDate || addDays(stop.startDate, Number(destination.nights || 0));
    const row = document.createElement("article");
    row.className = "timing-fit-row";
    row.innerHTML = `
      <div class="timing-stop-main">
        <strong>${destination.name}</strong>
        <span>${destination.nights} nights - ${selectedWindow.name}</span>
      </div>
      <div class="fit-score">${score}</div>
      ${scheduleDetails(`${destination.name} date range`, stop.startDate || "", stopEndDate || "", "Set dates", "timing-schedule")}
      <p class="timing-note">${climate.note}</p>
      <details class="scheduled-ideas-block">
        <summary>${ideas.length ? `${ideas.length} idea${ideas.length === 1 ? "" : "s"} to place` : "No ideas yet"}</summary>
        <div class="scheduled-idea-list">
          ${ideas.length ? ideas.map((idea) => `
            <div class="scheduled-idea-row" data-idea-id="${idea.id}">
              <span>${idea.title}</span>
              ${scheduleDetails(`${idea.title} date range`, idea.startDate || idea.date || "", idea.endDate || "", "Set dates", "idea-schedule")}
            </div>
          `).join("") : `<span class="mini-meta">Ideas added on Destinations will appear here.</span>`}
        </div>
      </details>
    `;
    attachScheduleControl(row.querySelector(".timing-schedule"), ({ startDate: nextStartDate, endDate: nextEndDate }) => {
      stop.startDate = nextStartDate;
      stop.endDate = nextEndDate;
      if (stop === trip.itinerary[0]) trip.startDate = nextStartDate;
      saveTrip();
      renderSettings();
      renderFlights();
    }, () => {
      render();
    });
    row.querySelectorAll(".scheduled-idea-row").forEach((ideaRow) => {
      attachScheduleControl(ideaRow.querySelector(".schedule-details"), ({ startDate: nextStartDate, endDate: nextEndDate }) => {
          const idea = destination.ideas.find((entry) => entry.id === ideaRow.dataset.ideaId);
          if (!idea) return;
          idea.startDate = nextStartDate;
          idea.date = nextStartDate;
          idea.endDate = nextEndDate;
          saveTrip();
          renderDestinations();
      });
    });
    timingMatrix.append(row);
  });
}

function scheduledIdeasForDestination(destination) {
  return destination.ideas.slice(0, 8);
}

function timingFitForWindow(windowId) {
  const destinations = itineraryDestinationsInOrder();
  if (!destinations.length) return 75;
  const total = destinations.reduce((sum, destination) => {
    const climate = climateForDestination(destination);
    return sum + Number(climate[windowId] || 76);
  }, 0);
  return Math.round(total / destinations.length);
}

function climateForDestination(destination) {
  return destinationClimate[destination.country] || destinationClimate[destination.name] || {
    may: 74,
    june: 80,
    july: 72,
    august: 70,
    sept: 78,
    note: "Good enough for planning, but worth checking local weather once this stop becomes likely."
  };
}

function renderFlights() {
  const searches = buildFlightSearches();
  syncQuoteRows(searches);
  renderStopovers();
  flightSearchGrid.innerHTML = "";
  searches.forEach((search, index) => {
    const card = document.createElement("article");
    card.className = "flight-search-card";
    const quote = trip.flightQuotes.find((entry) => entry.id === search.id);
    card.innerHTML = `
      <div class="leg-topline">
        <span>${travelIcon(search.mode)}</span>
        <strong>${search.mode}</strong>
      </div>
      <h3>${index + 1}. ${search.label}</h3>
      <p>${search.from} to ${search.to}${search.date ? ` · target ${formatDate(search.date)}` : " · date to confirm"}</p>
      <div class="mini-meta">${search.hint}</div>
      <div class="link-row">
        ${search.mode === "Train" ? `<a class="link-button" href="https://www.eurostar.com/" target="_blank" rel="noreferrer">Eurostar</a>` : `<a class="link-button" href="${skyscannerUrl(search.from, search.to)}" target="_blank" rel="noreferrer">Skyscanner</a>`}
        <a class="link-button" href="${googleFlightsUrl(search)}" target="_blank" rel="noreferrer">${search.mode === "Train" ? "Google travel" : "Google Flights"}</a>
        ${search.mode === "Flight" ? `<a class="link-button" href="https://www.flightcentre.co.nz/flights" target="_blank" rel="noreferrer">Flight Centre</a>` : ""}
      </div>
      <label class="inline-quote">
        Found price NZD
        <input value="${quote?.amount || 0}" type="number" min="0" step="10" aria-label="${search.label} quote amount" />
      </label>
    `;
    const quoteInput = card.querySelector("input");
    quoteInput.addEventListener("input", () => {
      if (!quote) return;
      quote.amount = Number(quoteInput.value);
      saveTrip();
      renderSummary();
      renderBudget();
    });
    flightSearchGrid.append(card);
  });

  quoteList.innerHTML = "";
  trip.flightQuotes.forEach((quote) => {
    const row = document.createElement("div");
    row.className = "quote-row";
    row.innerHTML = `
      <strong>${quote.label}</strong>
      <input value="${quote.amount}" type="number" min="0" step="10" aria-label="${quote.label} quote amount" />
      <select aria-label="${quote.label} quote source">
        <option ${quote.source === "Skyscanner" ? "selected" : ""}>Skyscanner</option>
        <option ${quote.source === "Google Flights" ? "selected" : ""}>Google Flights</option>
        <option ${quote.source === "Flight Centre" ? "selected" : ""}>Flight Centre</option>
        <option ${quote.source === "Airline direct" ? "selected" : ""}>Airline direct</option>
        <option ${quote.source === "Rail operator" ? "selected" : ""}>Rail operator</option>
      </select>
      <button class="delete-button" title="Clear quote">&times;</button>
    `;
    const [amountInput] = row.querySelectorAll("input");
    const sourceSelect = row.querySelector("select");
    amountInput.addEventListener("input", () => {
      quote.amount = Number(amountInput.value);
      saveTrip();
      renderSummary();
      renderBudget();
    });
    sourceSelect.addEventListener("change", () => {
      quote.source = sourceSelect.value;
      saveTrip();
    });
    row.querySelector("button").addEventListener("click", () => {
      quote.amount = 0;
      render();
    });
    quoteList.append(row);
  });
}

function renderStopovers() {
  stopoverGrid.innerHTML = "";
  stopoverOptions.forEach((stopover) => {
    const selectedOutbound = trip.stopoverId === stopover.id;
    const selectedReturn = trip.returnStopoverId === stopover.id;
    const card = document.createElement("article");
    card.className = `stopover-card ${(selectedOutbound || selectedReturn) ? "is-selected" : ""}`;
    card.innerHTML = `
      <div class="stopover-image" style="background-image:url('${stopover.image}')"></div>
      <div class="stopover-body">
        <div class="stopover-title-row">
          <h3>${stopover.city} (${stopover.airport})</h3>
          <span class="fit-score">${stopover.score}</span>
        </div>
        <p>${stopover.note}</p>
        <div class="detail-stack">
          <span><strong>Best for</strong>${stopover.bestFor}</span>
          <span><strong>Mini-plan</strong>${stopover.sample}</span>
          <span><strong>Watch</strong>${stopover.caution}</span>
        </div>
        <span class="mini-meta">Suggested stopover allowance: ${money(stopover.cost)}</span>
        <div class="stopover-actions">
          <button class="${selectedOutbound ? "primary-button" : "secondary-button"}" data-stopover-leg="outbound">${selectedOutbound ? "Outbound stop" : "Use outbound"}</button>
          <button class="${selectedReturn ? "primary-button" : "secondary-button"}" data-stopover-leg="return">${selectedReturn ? "Return stop" : "Use return"}</button>
        </div>
      </div>
    `;
    card.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.stopoverLeg === "return" ? "returnStopoverId" : "stopoverId";
        trip[key] = trip[key] === stopover.id ? "" : stopover.id;
        syncStopoverDestinations();
        render();
      });
    });
    stopoverGrid.append(card);
  });
}

function syncStopoverDestinations() {
  const selectedIds = new Set([trip.stopoverId, trip.returnStopoverId].filter(Boolean).map((id) => `stopover-${id}`));
  trip.destinations = trip.destinations.filter((destination) => !destination.isStopover || selectedIds.has(destination.id));
  [trip.stopoverId, trip.returnStopoverId].filter(Boolean).forEach((stopoverId) => {
    const stopover = stopoverOptions.find((option) => option.id === stopoverId);
    if (!stopover || trip.destinations.some((destination) => destination.id === `stopover-${stopover.id}`)) return;
    trip.destinations.push({
      id: `stopover-${stopover.id}`,
      name: `${stopover.city} stopover`,
      region: stopover.bestFor,
      country: stopover.country,
      nights: 1,
      pace: "Stopover",
      image: stopover.image,
      isStopover: true,
      daily: { sleep: stopover.cost, food: 120, transport: 45, fun: 80 },
      ideas: [
        { id: `stopover-${stopover.id}-mini`, title: stopover.sample, theme: "Stopover", cost: stopover.cost, votes: [false, false] }
      ]
    });
  });
}

function travelIcon(mode) {
  const icons = { Train: "&#128646;", Flight: "&#9992;" };
  return icons[mode] || icons.Flight;
}

function scoreRow(label, score) {
  return `
    <div class="score-row">
      <div class="bar-row-top"><span>${label}</span><span>${score}/100</span></div>
      <div class="score-track"><div class="score-fill" style="width:${score}%"></div></div>
    </div>
  `;
}

function destinationFromPreset(country) {
  const preset = countryPresets.find((entry) => entry[0] === country) || [country, "Worth exploring", "Option", 4, 230, 140, 65, 100];
  const ideas = ideasForDestination(preset[0], preset[1]);
  return {
    id: newId(),
    name: preset[0],
    country: preset[0],
    region: preset[1],
    pace: preset[2],
    nights: preset[3],
    image: imageForCountry(preset[0]),
    daily: { sleep: preset[4], food: preset[5], transport: preset[6], fun: preset[7] },
    ideas: ideas.map(([id, title, theme, cost, votes]) => ({ id, title, theme, cost, votes: [...votes] }))
  };
}

function ideasForDestination(country, vibe = "Worth exploring") {
  if (recommendedIdeas[country]) return recommendedIdeas[country];
  const shortId = country.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return [
    [`${shortId}-signature`, `${country} signature sights day`, "Culture", 140, [false, false]],
    [`${shortId}-food`, `${country} food market or local dinner`, "Food", 140, [false, false]],
    [`${shortId}-wander`, `Slow wander: ${vibe}`, "Adventure", 80, [false, false]],
    [`${shortId}-logistics`, `Check travel time and best arrival city`, "Logistics", 0, [false, false]]
  ];
}

function imageForCountry(country) {
  return destinationImages[country] || "";
}

function needsImageLookup(image) {
  return !image || image.includes("source.unsplash.com");
}

function resolveMissingDestinationImages() {
  trip.destinations.forEach((destination) => {
    if (!needsImageLookup(destination.image) || imageLookups.has(destination.id)) return;
    imageLookups.add(destination.id);
    ensureImageForCountry(destination.country || destination.name).then((image) => {
      if (!image) return;
      destination.image = image;
      saveTrip();
      renderDestinations();
    }).catch(() => {
      imageLookups.delete(destination.id);
    });
  });
}

async function ensureImageForCountry(country) {
  try {
    return imageForCountry(country) || await lookupCommonsImage(country) || genericEuropeImage;
  } catch {
    return genericEuropeImage;
  }
}

async function lookupCommonsImage(country) {
  const cleanCountry = String(country || "Europe").trim();
  const queries = [
    `${cleanCountry} landmark`,
    `${cleanCountry} old town`,
    `${cleanCountry} city`,
    `${cleanCountry} landscape`,
    cleanCountry
  ];
  for (const queryText of queries) {
    const query = encodeURIComponent(queryText);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json&origin=*`;
    const response = await fetch(url);
    if (!response.ok) continue;
    const data = await response.json();
    const pages = Object.values(data.query?.pages || {}).sort((a, b) => (a.index || 0) - (b.index || 0));
    const image = pages
      .map((page) => page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url)
      .find(goodCommonsCandidate);
    if (image) return image;
  }
  return "";
}

function goodCommonsCandidate(candidate) {
  if (!candidate) return false;
  const lower = candidate.toLowerCase();
  return !["flag", "coat_of_arms", "locator", "map", ".pdf", ".svg"].some((badToken) => lower.includes(badToken));
}

function buildFlightSearches() {
  const stops = itineraryDestinationsInOrder().filter((destination) => !destination.isStopover);
  const first = stops[0] || trip.destinations[0];
  const last = stops[stops.length - 1] || trip.destinations[trip.destinations.length - 1];
  const outboundStopover = stopoverOptions.find((option) => option.id === trip.stopoverId);
  const returnStopover = stopoverOptions.find((option) => option.id === trip.returnStopoverId);
  const searches = [];

  if (outboundStopover) {
    searches.push({ id: "outbound-akl-stopover", label: `Auckland to ${outboundStopover.city}`, mode: "Flight", from: "AKL", to: outboundStopover.airport, date: trip.startDate, hint: "First long-haul leg. Compare fare, arrival time, and stopover hotel cost." });
    searches.push({ id: "outbound-stopover-dublin", label: `${outboundStopover.city} to Dublin`, mode: "Flight", from: outboundStopover.airport, to: "DUB", date: trip.startDate, hint: "Second long-haul leg into Ireland. Check whether a through-ticket is cheaper." });
  } else {
    searches.push({ id: "outbound-akl-dublin", label: "Auckland to Dublin", mode: "Flight", from: "AKL", to: "DUB", date: trip.startDate, hint: "Baseline no-stopover search for comparison." });
  }

  searches.push({ id: "dublin-london", label: "Dublin to London", mode: "Flight", from: "DUB", to: "LON", date: dateForDestination("london"), hint: "Likely a short flight. Compare airport choice with the London stay location." });
  searches.push({ id: "london-paris", label: "London to Paris", mode: "Train", from: "London", to: "Paris", date: dateForDestination("paris"), hint: "Eurostar is the natural first check." });
  searches.push({ id: "paris-italy", label: "Paris to Italy", mode: "Train", from: "Paris", to: "Italy", date: dateForDestination("italy"), hint: "Start with rail options, then compare against a flight if the timing is awkward." });

  if (returnStopover) {
    searches.push({ id: "italy-return-stopover", label: `Italy to ${returnStopover.city}`, mode: "Flight", from: airportFor(last), to: returnStopover.airport, date: returnDate(), hint: "First return leg. Check if flying from Rome, Milan, or Venice changes the price." });
    searches.push({ id: "return-stopover-akl", label: `${returnStopover.city} to Auckland`, mode: "Flight", from: returnStopover.airport, to: "AKL", date: returnDate(), hint: "Final long-haul leg home." });
  } else {
    searches.push({ id: "italy-akl", label: "Italy to Auckland", mode: "Flight", from: airportFor(last), to: "AKL", date: returnDate(), hint: "Baseline no-stopover return search." });
  }

  return searches;
}

function dateForDestination(destinationId) {
  const stop = trip.itinerary.find((entry) => entry.destinationId === destinationId);
  return stop?.startDate || "";
}

function itineraryDestinationsInOrder() {
  return itineraryStopsInOrder().map(({ destination }) => destination);
}

function itineraryStopsInOrder() {
  return trip.itinerary
    .map((stop) => ({ stop, destination: trip.destinations.find((destination) => destination.id === stop.destinationId) }))
    .filter((entry) => entry.destination);
}

function deriveStopDates() {
  if (!trip.startDate || !trip.itinerary?.length) return;
  let cursor = trip.startDate;
  trip.itinerary.forEach((stop) => {
    const destination = trip.destinations.find((entry) => entry.id === stop.destinationId);
    if (!destination) return;
    if (!stop.startDate) stop.startDate = cursor;
    if (!stop.endDate) stop.endDate = addDays(stop.startDate || cursor, Number(destination.nights || 0));
    cursor = stop.endDate || addDays(stop.startDate || cursor, Number(destination.nights || 0));
  });
}

function syncStartDateFromFirstStop() {
  const firstStopDate = trip.itinerary?.[0]?.startDate;
  if (firstStopDate) trip.startDate = firstStopDate;
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-NZ", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(dateFromDateInput(value));
}

function formatShortDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-NZ", { day: "numeric", month: "short", timeZone: "UTC" }).format(dateFromDateInput(value));
}

function formatDateRange(start, end, fallback = "Schedule") {
  if (start && end && start !== end) return `${formatShortDate(start)} - ${formatShortDate(end)}`;
  if (start) return formatShortDate(start);
  if (end) return `By ${formatShortDate(end)}`;
  return fallback;
}

function scheduleDetails(ariaLabel, startDate, endDate, fallback, extraClass = "") {
  return `
    <details class="schedule-details ${extraClass}" data-fallback="${escapeAttribute(fallback)}">
      <summary class="schedule-summary" aria-label="${escapeAttribute(ariaLabel)}">
        <span class="schedule-chip-text">${formatDateRange(startDate, endDate, fallback)}</span>
      </summary>
      <div class="schedule-popover">
        <div class="schedule-popover-heading">
          <strong>Choose dates</strong>
          <span>Optional range</span>
        </div>
        <div class="date-range-fields">
          <label>
            Start
            <input type="date" data-date-field="start" value="${startDate || ""}" />
          </label>
          <label>
            End
            <input type="date" data-date-field="end" value="${endDate || ""}" />
          </label>
        </div>
        <div class="schedule-actions">
          <button type="button" class="secondary-button" data-schedule-clear>Clear</button>
          <button type="button" class="primary-button" data-schedule-done>Done</button>
        </div>
      </div>
    </details>
  `;
}

function attachScheduleControl(details, onChange, onDone = () => {}) {
  if (!details) return;
  const startInput = details.querySelector('[data-date-field="start"]');
  const endInput = details.querySelector('[data-date-field="end"]');
  const clearButton = details.querySelector("[data-schedule-clear]");
  const doneButton = details.querySelector("[data-schedule-done]");
  const update = () => {
    updateScheduleSummary(details);
    onChange({ startDate: startInput?.value || "", endDate: endInput?.value || "" });
  };
  startInput?.addEventListener("input", update);
  endInput?.addEventListener("input", update);
  clearButton?.addEventListener("click", () => {
    if (startInput) startInput.value = "";
    if (endInput) endInput.value = "";
    update();
  });
  doneButton?.addEventListener("click", () => {
    update();
    details.open = false;
    onDone();
  });
}

function updateScheduleSummary(details) {
  const startDate = details.querySelector('[data-date-field="start"]')?.value || "";
  const endDate = details.querySelector('[data-date-field="end"]')?.value || "";
  const label = details.querySelector(".schedule-chip-text");
  if (label) label.textContent = formatDateRange(startDate, endDate, details.dataset.fallback || "Set dates");
}

function dateFromDateInput(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(value, days) {
  if (!value) return "";
  const date = dateFromDateInput(value);
  date.setUTCDate(date.getUTCDate() + Number(days || 0));
  return date.toISOString().slice(0, 10);
}

function transferMode(fromDestination, toDestination) {
  const pair = [fromDestination.country, toDestination.country].join(">");
  if (pair === "United Kingdom>France" || pair === "France>United Kingdom") return "Train";
  if (["France>Italy", "Italy>France", "Germany>Czechia", "Czechia>Hungary", "France>Germany"].includes(pair)) return "Train";
  return "Flight";
}

function syncQuoteRows(searches) {
  trip.flightQuotes = trip.flightQuotes || [];
  const searchIds = new Set(searches.map((search) => search.id));
  trip.flightQuotes = trip.flightQuotes.filter((quote) => searchIds.has(quote.id));
  searches.forEach((search) => {
    if (!trip.flightQuotes.some((quote) => quote.id === search.id)) {
      trip.flightQuotes.push({ id: search.id, label: search.label, amount: 0, source: search.mode === "Train" ? "Rail operator" : "Skyscanner" });
    }
  });
  trip.flightQuotes.forEach((quote) => {
    const search = searches.find((entry) => entry.id === quote.id);
    if (search) quote.label = search.label;
  });
}

function airportFor(destination) {
  return airportCodes[destination?.country] || airportCodes[destination?.name] || "EUR";
}

function returnDate() {
  if (!trip.startDate) return "";
  const nights = trip.destinations.reduce((sum, destination) => sum + Number(destination.nights || 0), 0);
  return addDays(trip.startDate, nights);
}

function skyscannerUrl(from, to) {
  return `https://www.skyscanner.com/routes/${from.toLowerCase()}/${to.toLowerCase()}/`;
}

function googleFlightsUrl(search) {
  const query = `Flights from ${search.from} to ${search.to}${search.date ? ` around ${search.date}` : ""}`;
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}`;
}

function normalizeTrip() {
  if (!trip.travelerA || trip.travelerA === "You" || trip.travelerA === "Rory") trip.travelerA = "Ruairi";
  if (!trip.travelerB || trip.travelerB === "Her") trip.travelerB = "Maggie";
  const removedIdeaIds = new Set(["lon-borough", "lon-camden", "lon-skygarden"]);
  const removedIdeaTitles = new Set(["Borough Market and Southbank wander", "Camden or Shoreditch food crawl", "Sky Garden or river view drinks"]);
  trip.destinations = (trip.destinations || []).map((destination) => ({
    id: destination.id || newId(),
    name: destination.name === "Donegal + Ireland" ? "Ireland" : destination.name || "New destination",
    region: destination.region || "Worth exploring",
    country: destination.country || destination.name || "Europe",
    nights: Number(destination.nights || 1),
    pace: destination.pace || "Option",
    image: needsImageLookup(destination.image) ? imageForCountry(destination.country || destination.name) : destination.image,
    isStopover: Boolean(destination.isStopover),
    daily: {
      sleep: Number(destination.daily?.sleep || 0),
      food: Number(destination.daily?.food || 0),
      transport: Number(destination.daily?.transport || 0),
      fun: Number(destination.daily?.fun || 0)
    },
    ideas: (destination.ideas || []).filter((idea) => !removedIdeaIds.has(idea.id) && !removedIdeaTitles.has(idea.title)).map((idea) => ({
      id: idea.id || newId(),
      title: idea.title || "New idea",
      theme: idea.theme || "Adventure",
      cost: Number(idea.cost || 0),
      date: idea.date || idea.startDate || "",
      startDate: idea.startDate || idea.date || "",
      endDate: idea.endDate || "",
      visual: idea.visual || null,
      votes: Array.isArray(idea.votes) ? [Boolean(idea.votes[0]), Boolean(idea.votes[1])] : [false, false]
    }))
  }));
  trip.fixedCosts = (trip.fixedCosts || []).filter((cost) => cost.id !== "flight-live");
  trip.timingWindowId = trip.timingWindowId || "june";
  if (!trip.stopoverChoiceVersion) {
    trip.stopoverId = "";
    trip.returnStopoverId = "";
    trip.stopoverChoiceVersion = 1;
  }
  trip.stopoverId = stopoverOptions.some((option) => option.id === trip.stopoverId) ? trip.stopoverId : "";
  trip.returnStopoverId = stopoverOptions.some((option) => option.id === trip.returnStopoverId) ? trip.returnStopoverId : "";
  trip.flightQuotes = trip.flightQuotes || [];
  trip.whiteboardNotes = (trip.whiteboardNotes || []).map((note) => ({
    id: note.id || newId(),
    text: note.text || "",
    author: note.author || initials(viewerName()),
    createdAt: note.createdAt || new Date().toISOString()
  })).filter((note) => note.text.trim());
  syncStopoverDestinations();
  trip.itinerary = (trip.itinerary || [])
    .filter((stop) => trip.destinations.some((destination) => destination.id === stop.destinationId))
    .map((stop) => ({
      id: stop.id || newId(),
      destinationId: stop.destinationId,
      note: stop.note || "",
      startDate: stop.startDate || "",
      endDate: stop.endDate || ""
    }));
  if ((trip.ideaSeedVersion || 0) < 2) {
    mergeRecommendedIdeas();
    trip.ideaSeedVersion = 2;
  }
  mergeGenericIdeas();
}

function mergeRecommendedIdeas() {
  trip.destinations.forEach((destination) => {
    const ideas = recommendedIdeas[destination.name] || recommendedIdeas[destination.country] || [];
    const existingIds = new Set(destination.ideas.map((idea) => idea.id));
    const existingTitles = new Set(destination.ideas.map((idea) => idea.title));
    ideas.forEach(([id, title, theme, cost, votes]) => {
      if (existingIds.has(id) || existingTitles.has(title)) return;
      destination.ideas.push({ id, title, theme, cost, votes });
    });
  });
}

function mergeGenericIdeas() {
  trip.destinations.forEach((destination) => {
    if (destination.ideas.length >= 4) return;
    const ideas = ideasForDestination(destination.country || destination.name, destination.region);
    const existingIds = new Set(destination.ideas.map((idea) => idea.id));
    const existingTitles = new Set(destination.ideas.map((idea) => idea.title));
    ideas.forEach(([id, title, theme, cost, votes]) => {
      if (existingIds.has(id) || existingTitles.has(title)) return;
      destination.ideas.push({ id, title, theme, cost, votes: [...votes] });
    });
  });
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((entry) => entry.classList.toggle("is-active", entry === tab));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.id === tab.dataset.tab));
  });
});

themeSelect.addEventListener("change", () => {
  trip.theme = themeSelect.value;
  render();
});

viewerRoleSelect.addEventListener("change", () => {
  localStorage.setItem("europe-trip-viewer-role", viewerRoleSelect.value);
  renderDestinations();
});

tripSettings.addEventListener("input", () => {
  const previousStartDate = trip.startDate;
  trip.title = field(tripSettings, "title").value;
  trip.startDate = field(tripSettings, "startDate").value;
  trip.travelerA = field(tripSettings, "travelerA").value;
  trip.travelerB = field(tripSettings, "travelerB").value;
  trip.scenario = field(tripSettings, "scenario").value;
  trip.bufferPercent = Number(field(tripSettings, "bufferPercent").value);
  if (previousStartDate !== trip.startDate && trip.itinerary?.[0]) {
    trip.itinerary[0].startDate = trip.startDate;
    trip.itinerary[0].endDate = "";
  }
  render();
});

document.querySelector("#addIdeaBtn").addEventListener("click", () => {
  ideaForm.reset();
  renderIdeaDestinations();
  openPlannerDialog(ideaDialog);
});

document.querySelector("#cancelIdeaBtn").addEventListener("click", () => {
  closePlannerDialog(ideaDialog);
});

ideaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.submitter?.value === "cancel") {
    closePlannerDialog(ideaDialog);
    return;
  }
  saveIdea();
});

document.querySelector("#saveIdeaBtn").addEventListener("click", saveIdea);

function saveIdea() {
  if (!formIsReady(ideaForm, ["title"])) return;
  const destination = trip.destinations.find((entry) => entry.id === field(ideaForm, "destinationId").value);
  destination.ideas.push({
    id: newId(),
    title: field(ideaForm, "title").value,
    theme: field(ideaForm, "theme").value,
    cost: Number(field(ideaForm, "cost").value),
    votes: [false, false]
  });
  closePlannerDialog(ideaDialog);
  render();
}

document.querySelector("#addDestinationBtn").addEventListener("click", () => {
  destinationForm.reset();
  countryPresetSelect.value = "";
  field(destinationForm, "pace").value = "Wildcard";
  field(destinationForm, "nights").value = 4;
  field(destinationForm, "sleep").value = 240;
  field(destinationForm, "food").value = 145;
  field(destinationForm, "transport").value = 70;
  field(destinationForm, "fun").value = 110;
  field(destinationForm, "addToItinerary").checked = true;
  openPlannerDialog(destinationDialog);
});

countryPresetSelect.addEventListener("change", () => {
  if (!countryPresetSelect.value) return;
  const presetDestination = destinationFromPreset(countryPresetSelect.value);
  field(destinationForm, "name").value = presetDestination.name;
  field(destinationForm, "country").value = presetDestination.country;
  field(destinationForm, "region").value = presetDestination.region;
  field(destinationForm, "pace").value = presetDestination.pace;
  field(destinationForm, "nights").value = presetDestination.nights;
  field(destinationForm, "image").value = presetDestination.image || "";
  field(destinationForm, "sleep").value = presetDestination.daily.sleep;
  field(destinationForm, "food").value = presetDestination.daily.food;
  field(destinationForm, "transport").value = presetDestination.daily.transport;
  field(destinationForm, "fun").value = presetDestination.daily.fun;
  if (!presetDestination.image) {
    const selectedCountry = presetDestination.country;
    ensureImageForCountry(selectedCountry).then((image) => {
      if (field(destinationForm, "country").value === selectedCountry && !field(destinationForm, "image").value) {
        field(destinationForm, "image").value = image;
      }
    });
  }
});

document.querySelector("#cancelDestinationBtn").addEventListener("click", () => {
  closePlannerDialog(destinationDialog);
});

destinationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.submitter?.value === "cancel") {
    closePlannerDialog(destinationDialog);
    return;
  }
  saveDestination();
});

document.querySelector("#saveDestinationBtn").addEventListener("click", saveDestination);

async function saveDestination() {
  if (!formIsReady(destinationForm, ["name", "country"])) return;
  const saveButton = document.querySelector("#saveDestinationBtn");
  const originalText = saveButton.textContent;
  saveButton.disabled = true;
  saveButton.textContent = "Finding image...";
  const country = field(destinationForm, "country").value.trim();
  const image = field(destinationForm, "image").value.trim() || await ensureImageForCountry(country);
  const destination = {
    id: newId(),
    name: field(destinationForm, "name").value.trim(),
    country,
    region: field(destinationForm, "region").value.trim() || "Worth exploring",
    pace: field(destinationForm, "pace").value.trim() || "Option",
    nights: Number(field(destinationForm, "nights").value || 1),
    image,
    daily: {
      sleep: Number(field(destinationForm, "sleep").value || 0),
      food: Number(field(destinationForm, "food").value || 0),
      transport: Number(field(destinationForm, "transport").value || 0),
      fun: Number(field(destinationForm, "fun").value || 0)
    },
    ideas: []
  };
  trip.destinations.push(destination);
  if (field(destinationForm, "addToItinerary").checked) {
    trip.itinerary.push({
      id: newId(),
      destinationId: destination.id,
      note: `Explore ${destination.name}`
    });
  }
  closePlannerDialog(destinationDialog);
  saveButton.disabled = false;
  saveButton.textContent = originalText;
  render();
}

document.querySelector("#addCostBtn").addEventListener("click", () => {
  trip.fixedCosts.push({ id: newId(), name: "New fixed cost", amount: 100 });
  render();
});

whiteboardForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const textarea = field(whiteboardForm, "note");
  const text = String(textarea.value || "").trim();
  if (!text) return;
  trip.whiteboardNotes.unshift({
    id: newId(),
    text,
    author: initials(viewerName()),
    createdAt: new Date().toISOString()
  });
  textarea.value = "";
  render();
});

document.querySelector("#addStopBtn").addEventListener("click", () => {
  const existingStops = new Set(trip.itinerary.map((stop) => stop.destinationId));
  const destination = trip.destinations.find((entry) => !existingStops.has(entry.id)) || trip.destinations[0];
  trip.itinerary.push({ id: newId(), destinationId: destination.id, note: `Explore ${destination.name}` });
  render();
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  trip = structuredClone(sampleTrip);
  render();
});

render();
syncRemoteTrip();

function newId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function field(form, name) {
  return form.elements.namedItem(name);
}

function formIsReady(form, names) {
  if (typeof form.reportValidity === "function" && !form.reportValidity()) return false;
  const missing = names.find((name) => !String(field(form, name).value || "").trim());
  if (missing) {
    field(form, missing).focus();
    return false;
  }
  return true;
}

function openPlannerDialog(dialog) {
  let usedFallback = false;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }
  if (!dialog.open) {
    dialog.setAttribute("open", "");
    usedFallback = true;
  }
  if (usedFallback || typeof dialog.showModal !== "function") {
    dialog.dataset.fallbackOpen = "true";
    document.body.classList.add("dialog-fallback-open");
  }
}

function closePlannerDialog(dialog) {
  if (typeof dialog.close === "function" && !dialog.dataset.fallbackOpen) {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
    delete dialog.dataset.fallbackOpen;
    if (!document.querySelector("dialog[data-fallback-open='true']")) {
      document.body.classList.remove("dialog-fallback-open");
    }
  }
}
