// ===== EDIT ME: everything you need to fill in lives here =====
window.PIZZA_CONFIG = {
  name: "Roman's Pizza",
  tagline: "Hand-stretched 12\" pies, made to order for your weekend.",
  area: "Plymouth, MI",
  phone: "",        // e.g. "7345551234" — enables the "Text it" button
  email: "",        // e.g. "you@example.com" — enables the "Email it" button
  orderDeadline: "Thursday",
  pickupTimes: ["12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"],
  socials: { instagram: "", facebook: "", tiktok: "" }, // full URLs; blank = hidden
  // Pie options. The first item in each list is the default ("Regular") and is left out of the message.
  options: {
    crust:  ["Regular", "Sesame"],
    cheese: ["Regular", "Extra", "Light", "No cheese"],
    sauce:  ["Regular", "Extra", "Light", "No sauce"]
  },
  // Price per 12" pizza in dollars. null = prices hidden everywhere.
  prices: {
    "pepperoni": null,
    "pep-hot-honey": null,
    "pep-hot-honey-ricotta": null,
    "margherita": null,
    "cheese": null
  }
};
