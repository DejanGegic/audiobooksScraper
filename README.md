# Audiobook Scraper

- [Audiobook Scraper](#audiobook-scraper)
  - [Supported sites 🌐](#supported-sites-)
  - [Disclaimer ⚠️](#disclaimer-️)
  - [About 📔](#about-)
  - [How to use 🚗](#how-to-use-)
    - [Prerequisites](#prerequisites)
    - [Run instructions](#run-instructions)
  - [To Do ✅](#to-do-)

## Supported sites 🌐

1. [bookaudiobooks.com](https://bookaudiobooks.com/)
2. [goldenaudiobook.com](https://goldenaudiobook.com/)

## Disclaimer ⚠️

I do not support or encourage digital piracy or illegal acquisition of software, media or any other digital goods. This project exists for educational and demonstrational purposes.

## About 📔

This software was made if a few minutes as a response to bookaudiobooks.com allowing users to listen to audiobooks on the site but giving them no option to change the speed, remember last position or download the audio.
This is not intended to be a tool to download books which should be bought to support the artist, but as a demonstration of how flawed their DRM is.

## How to use 🚗

### Prerequisites

1. npm
2. node (tested on v18.0.0)

### Run instructions

1. Clone the repository
2. cd into the repository and install modules with `npm install`
3. Run the app and pass the url as the argument  

Example: `node run https://bookaudiobooks.com/book-to-download`

It will create `books` directory and organize the files in structure `books/author/bookTitle` downloading the cover art first and proceeding with the audio.

## To Do ✅

- [ ] Add support for additional sites.
- [ ] Fix cover art downloading error on goldenbooks
- [ ] Rewrite the app in Go to avoid the need for node install
