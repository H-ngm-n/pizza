# Roman's Pizza website

Static site (GitHub Pages). All editable info is in **`config.js`**.

## What to fill in (config.js)
- `name`: business name (currently "Roman's Pizza"; if you change it, also update `<title>`/meta in index.html and `manifest.webmanifest`)
- `phone`: your number for texts, e.g. "7345551234". Blank hides the "Text it" button.
- `email`: order email. Blank hides the "Email it" button.
- `pricing` / `pies` / `byoToppings`: price rules (base, pepperoni base, per extra topping) and what's on each pie.
- `options`: crust, cheese and sauce choices (first one in each list is the default and stays out of the message).
- `pickupTimes`: weekend pickup slots.
- `orderDeadline`: default "Thursday".
- `socials`: Instagram / Facebook / TikTok full URLs (blank = hidden).
- `area` / `tagline`: optional.

With no phone or email, customers can still use **Copy message**.

## Adding photos
1. Put your pizza photos in the `/photos` folder (square 1:1 on the off-white #f6f4ef background works best; WebP or JPG, under ~300 KB).
2. List them in `config.js` under `photos`, e.g.
   `photos: [{ src: "photos/pepperoni.jpg", caption: "Pepperoni" }, { src: "photos/margherita.jpg" }]`
   Caption is optional. While the list is empty, the "From the oven" section stays hidden.

## Online order form (FormSubmit.co)
Orders post to `formEndpoint` in config.js (`https://formsubmit.co/ajax/rplichota51@gmail.com`), no backend needed.
**The first real order triggers a one-time activation email from FormSubmit to rplichota51@gmail.com. Click the link in it, or orders won't be delivered.** Until then (or if the service fails) customers see an error with Copy message / Email it fallbacks.
`pickupNote` sets the pickup-only text.
