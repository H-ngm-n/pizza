# Roman's Pizza website

Static site (GitHub Pages). All editable info is in **`config.js`**.

## What to fill in (config.js)
- `name`: business name (currently "Roman's Pizza"; if you change it, also update `<title>`/meta in index.html and `manifest.webmanifest`)
- `phone`: your number for texts, e.g. "7345551234". Blank hides the "Text it" button.
- `email`: order email. Blank hides the "Email it" button.
- `prices`: dollars per 12" pie for each of the five pizzas. `null` hides prices.
- `options`: crust, cheese and sauce choices (first one in each list is the default and stays out of the message).
- `pickupTimes`: weekend pickup slots.
- `orderDeadline`: default "Thursday".
- `socials`: Instagram / Facebook / TikTok full URLs (blank = hidden).
- `area` / `tagline`: optional.

With no phone or email, customers can still use **Copy message**.
