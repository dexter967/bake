const menuCategories = [
  ["Fresh Cream Cakes", [["Black Forest",350,590],["White Forest",360,620],["Choco Chip",370,640],["Milk Chip",380,650],["Butter Scotch",380,650],["Royal Butter Scotch",400,700],["Choco Butter Scotch",430,750],["Red Velvet",550,950],["Choco Red Velvet",550,950],["German Black Forest",400,700],["Caramello Truffle",550,950],["Fresh Fruit Cake",600,1100],["Irish Coffee",500,850],["Honey Almond",400,700],["Classic Vanilla",400,700],["White Truffle",550,950]]],
  ["Chocolate Cakes", [["Choco Velvet",600,1100],["German Chocolate",550,1000],["Choco Strawberry",480,850],["Choco Orange",480,850],["Choco Caramel",550,950],["Choco Cashew",650,980],["Choco Forest",550,950],["Choco Delight",450,850],["Choco Walnut",550,980],["Choco Almond",550,980],["Choco Oreo",480,850],["Choco Dragon Truffle",480,850],["Swiss Chocolate",480,850],["Magic Chocolate",550,980],["Galaxy Chocolate",550,950],["Chocolate Truffle",480,850],["Rich Chocolate",600,1100],["Choco malai",550,980],["Milk Chocolate Truffle",550,980]]],
  ["Fruit Cakes", [["Mango",450,800],["Pineapple",450,800],["Kiwi",450,800],["Green Apple",450,800],["Fig & Honey",450,800],["Litchi",450,800],["Blue Berry",480,850],["Passion Fruit",450,800],["Orange",450,800],["Strawberry",450,800],["Black Berry",450,800]]],
  ["Special Cakes", [["Vancho",480,850],["Nutty Bubbly",550,950],["Red Bee",550,950],["Fudgenet",550,950],["Banana Exotica",550,980],["Boost & Honey",550,950],["Dates & Almond",480,850],["Kifaya",550,980],["Australian Chocolate",600,1100],["Gulab Jamun",650,1200],["Rasagulla",650,1200],["Tiramisu",550,950],["Crunchy Eclairs",600,1100],["Carrot Magio",600,1100],["Tender Coconut",550,950],["Milkynut",550,950],["Malabar Kulfi",550,950],["Nutty Fantasy",550,950],["Ghee Butternut Crunchy",550,980],["Butterscotch Crunchy",450,850]]],
  ["Premium Cakes", [["Choco Mousse Cake",null,1300],["Ferrero Rocher",700,1350],["Raffaellow",700,1350],["Lotus Biscoff",700,1350],["Peanut Butter",700,1350],["Red Velvet with Orange Ganache",600,1100],["Ice-cream cake",null,1400],["Snicker Cake",600,1150],["Spanish Delight",600,1150],["French Nut",600,1150],["Belgium Chocolate",null,1300],["Nutty Kifaya",600,1150],["Pista Nutty",550,980],["Honey Cake",null,1100],["Choco Pista Nutty",600,1100],["Rainbow Cake",null,1100],["Rich Almond Cake",550,980],["Hazelnut Crunchy",650,1200]]],
  ["Cheese Cakes", [["Mango",null,900],["Oreo",null,900],["Pineapple",null,900],["Cherry",null,900],["Strawberry",null,900],["Blueberry",null,1000],["Chocolate",null,1000],["Orange",null,900],["Vanilla",null,850]]],
  ["French Pastries", [["Pistachio Nutella",null,2000],["Moist Nutella",null,2000],["Chocolate Pistachio Kiffaya",null,2000],["French Opera",null,1950],["Milky Galaxy Chocolate",null,2000],["French Hazelnut Crunchy",null,2200],["French Tiramisu",null,1900],["Dates Travelling",null,1900],["Monte Cristou",null,2000],["Russian Honey",null,2000]]],
  ["Wraps", [["Chicken Spicy Wrap",140,null],["Chicken Cheese Wrap",150,null]]],
  ["Burgers & Snacks", [["Chicken Burger",140,null],["Chicken Zinger Burger",150,null],["Chicken Double Cheese",160,null],["Chicken Sandwich",140,null],["Chicken Sausage",90,null]]],
];

const formatPrice = (price) => price === null ? "Not listed" : `₹${price.toLocaleString("en-IN")}`;
const whatsappNumber = "919048222977";
const menuGrid = document.querySelector("#menu-grid");
const menuFilters = document.querySelector("#menu-filters");
const menuSearch = document.querySelector("#menu-search");
const menuEmpty = document.querySelector("#menu-empty");
let activeCategory = "All";

if (menuGrid && menuFilters && menuSearch && menuEmpty) {
  const categories = ["All", ...menuCategories.map(([name]) => name)];
  menuFilters.innerHTML = categories.map((category) => `<button type="button" class="${category === activeCategory ? "is-active" : ""}" data-category="${category}">${category}</button>`).join("");

  const products = menuCategories.flatMap(([category, items]) => items.map(([name, half, full]) => ({ category, name, half, full })));
  const renderMenu = () => {
    const query = menuSearch.value.trim().toLowerCase();
    const visible = products.filter((product) => (activeCategory === "All" || product.category === activeCategory) && product.name.toLowerCase().includes(query));
    menuGrid.innerHTML = visible.map((product) => {
      const sizeText = product.half === null ? "1 kg" : product.full === null ? "Single item" : "500 gm · 1 kg";
      const prices = product.full === null ? formatPrice(product.half) : product.half === null ? formatPrice(product.full) : `${formatPrice(product.half)} · ${formatPrice(product.full)}`;
      const message = encodeURIComponent(`Hi! I'd like to order a ${product.name} from The Cake's World. Please share the available sizes and details.`);
      const halfPrice = product.half === null ? "—" : formatPrice(product.half);
      const fullPrice = product.full === null ? "—" : formatPrice(product.full);
      const itemPrice = product.half !== null && product.full !== null ? "—" : prices;
      return `<tr><td>${product.name}<small>${product.category}</small></td><td>${sizeText}</td><td>${halfPrice}</td><td>${fullPrice}</td><td>${itemPrice}</td><td><a href="https://wa.me/${whatsappNumber}?text=${message}" target="_blank" rel="noopener">WhatsApp ↗</a></td></tr>`;
    }).join("");
    menuEmpty.hidden = visible.length > 0;
  };

  menuFilters.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    activeCategory = button.dataset.category;
    menuFilters.querySelectorAll("button").forEach((item) => item.classList.toggle("is-active", item === button));
    renderMenu();
  });
  menuSearch.addEventListener("input", renderMenu);
  renderMenu();
}
