import cheerio from "cheerio";
import axios from "axios";
import fs from "fs";

// supports 
// https://bookaudiobooks.com/ 
// https://goldenaudiobook.com/

let bookLink
const html = await getHtmlFromCliParameter();

//init cheerio
const $ = cheerio.load(html);

//name of book and author
const { author, bookTitle } = getTitleAndAuthor();

//get source tags located in audio tags
const { sourceTagsArrayLength, sourceTagsArray } = getAudioTags();

//create folder if it doesn't exist
let bookPath = createDirs();

//get image with selector "#imgBlkFront"
downloadCoverImage();
    

//download audio files using axios and save to folder
await downloadAudioFiles();




async function downloadAudioFiles() {
    for (let i = 0; i < sourceTagsArrayLength; i++) {
        let currentSourceTag = sourceTagsArray[i];
        const audioLink = currentSourceTag.attribs.src;
        const audioFileName = bookTitle + " " + (i + 1) + ".mp3";
        const audioFilePath = bookPath + "/" + audioFileName;

        //download audio file using axios and save to audioFilePath
        console.log("Started writing file: " + (i + 1) + " of " + sourceTagsArrayLength);
        const audioResponse = await axios.get(audioLink, { responseType: 'stream' });
        const w = await audioResponse.data.pipe(fs.createWriteStream(audioFilePath));
        w.on('finish', () => {
            console.log("done writing file: " + (i + 1));
        }
        );

    }
}

function downloadCoverImage() {
    
    const coverImage = $('#imgBlkFront');
    const coverFileName = bookTitle + "_cover.jpg";
    const coverFilePath = bookPath + "/" + coverFileName;
    //get source from 'data-a-dynamic-image' attribute
    const coverLinkSrc = coverImage.attr()['data-a-dynamic-image'].split('"')[1];
    console.log(coverLinkSrc);
    const coverResponse = axios.get(coverLinkSrc, { responseType: 'stream' })
        .then(response => {
            response.data.pipe(fs.createWriteStream(coverFilePath)).then(() => {
                console.log("done writing cover file");
            });
        })
        .catch(err => {
            if (process.argv[2].split("/")[2] !== "bookaudiobooks.com") {
                //todo: add support for goldenaudiobook.com
                return null //only works for bookaudiobooks.com without error
            }else{
                console.log(err);
            }
        });
}

function createDirs() {
    if (!fs.existsSync("books")) {
        fs.mkdirSync("books");
    }
    if (!fs.existsSync("books/" + author)) {
        fs.mkdirSync("books/" + author);
    }
    let bookPath = "books/" + author + "/" + bookTitle;
    if (!fs.existsSync(bookPath)) {
        fs.mkdirSync(bookPath);
    }
    return bookPath;
}

function getAudioTags() {
    const audioTags = $('audio');
    const sourceTags = audioTags.find('source');
    const sourceTagsArray = sourceTags.toArray();
    const sourceTagsArrayLength = sourceTagsArray.length;
    return { sourceTagsArrayLength, sourceTagsArray };
}

function getTitleAndAuthor() {
    const title = $('h1').first().text();
    const titleSplit = title.split(" – ");
    const bookTitle = titleSplit[1];
    const author = titleSplit[0];
    console.log(bookTitle);
    console.log(author);
    return { author, bookTitle };
}

async function getHtmlFromCliParameter() {
    if (process.argv.length > 2) {
        bookLink = process.argv[2];
    } else {
        console.log("Please enter a book link as the first argument");
        process.exit(1);
    }
    const response = await axios.get(bookLink);
    const html = response.data;
    return html;
}

