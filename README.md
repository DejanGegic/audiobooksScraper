# Audiobook Scraper

## Disclaimer ⚠️

I do not support or encourage digital piracy or illegal acquisition of software, media or any other digital goods. This project exists for educational and demonstrational purposes.

## About 📔

This software was made if a few minutes as a response to bookaudiobooks.com allowing users to listen to audiobooks on the site but giving them no option to change the speed, remember last position or download the audio.
This is not intended to be a tool to download books which should be bought to support the artist, but as a demonstration of how flawed their DRM is.

## How to use 🚗

1. Clone the repository
2. cd into the repository and install modules with `npm install`
3. Run the app and pass the url as the argument  

Example: `npm run https://bookaudiobooks.com/book-to-download`

It will create `books` directory and organize the files in structure `books/author/bookTitle` downloading the cover art first and proceeding with the audio.
