// ===== EDIT ME: everything you need to fill in lives here =====
window.PIZZA_CONFIG = {
  name: "Roman's Pizza",
  tagline: "Hand-stretched 12\" pies, made to order for your weekend.",
  area: "Plymouth, MI",
  phone: "",        // e.g. "7345551234" — enables the "Text it" button
  email: "rplichota51@gmail.com",        // e.g. "you@example.com" — enables the "Email it" button
  // Online order form (FormSubmit.co, no backend). First real submission sends a one-time activation email to this address.
  formEndpoint: "https://formsubmit.co/ajax/rplichota51@gmail.com",
  pickupNote: "Pickup only · Plymouth, MI",
  orderDeadline: "Thursday",
  pickupTimes: ["12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"],
  socials: { instagram: "", facebook: "", tiktok: "" }, // full URLs; blank = hidden
  // Real pizza photos. Drop files into /photos and list them here; empty = section hidden.
  // e.g. { src: "photos/pepperoni.jpg", caption: "Pepperoni, fresh out" }
  photos: [
    { src: "photos/pepperoni-ricotta.webp", caption: "Pepperoni hot honey ricotta" },
    { src: "photos/pepperoni-charred.webp", caption: "Pepperoni" },
    { src: "photos/cheese-sesame.webp", caption: "Cheese, sesame crust" },
    { src: "photos/thin-pepperoni.webp", caption: "Thin pepperoni" },
    { src: "photos/pepperoni-2.webp", caption: "Pepperoni" },
    { src: "photos/pepperoni-banana-peppers.webp", caption: "Pepperoni and banana peppers" },
    { src: "photos/pepperoni-oblong.webp", caption: "Pepperoni" }
  ],
  // Pie options. The first item in each list is the default ("Regular") and is left out of the message.
  options: {
    crust:  ["Regular", "Sesame"],
    cheese: ["Regular", "Extra", "Light", "No cheese"],
    sauce:  ["Regular", "Extra", "Light", "No sauce"],
    pepperoni: ["Regular", "Extra", "Light"]   // only shown on pepperoni pies
  },
  // Pricing rules (dollars). Crust/cheese/sauce/pepperoni-amount choices never change the price.
  // Price = (has pepperoni ? pepperoniBase : base) + perTopping x (toppings other than pepperoni).
  pricing: { base: 14.99, pepperoniBase: 15.99, perTopping: 1.00 },
  // What's on each menu pie, for pricing. "toppings" = extra toppings besides pepperoni.
  pies: {
    "cheese":                { pepperoni: false, toppings: [] },
    "margherita":            { pepperoni: false, toppings: [] },
    "pepperoni":             { pepperoni: true,  toppings: [] },
    "pep-hot-honey":         { pepperoni: true,  toppings: ["hot honey"] },
    "pep-hot-honey-ricotta": { pepperoni: true,  toppings: ["hot honey", "ricotta"] }
  },
  // Build your own: pick any of these toppings. Pepperoni uses pepperoniBase; others add perTopping each.
  byoToppings: ["Pepperoni", "Banana peppers", "Onion"]
};
