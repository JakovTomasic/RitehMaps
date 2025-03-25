// import axios from "axios";
// import { CheerioAPI, load } from 'cheerio';
// import { ProfessorData } from "../data/ServerData";

// /*
// run for this project: "npm install axios cheerio"
// - delete these after scraping

// To avoid cors run your proxy:
// - copy cors_server.js in a separate temporary directory, locally on your machine
// - in that directory run "npm install express cors axios"
// - then run "node cors_server.js"

// After that, call the getProfessorData() function from somewhere inside the App.tsx file 
// and run the application (npm run dev). Once the home page loads on localhost:5173, the new list of 
// professors should be printed in the console in the JSON fromat. Copy that JSON object and replace the
// old professor data in the example json file. To format the document, use the Prettier extension 
// (esbenp.prettier-vscode). Right-click somewhere in the ProfessorData.ts file and choose 
// "Format Document With..." -> "Prettier - Code formatter".
// Or just vscode right-click on the json code - format Document.
// */

// // See the number of pages at the bottom of https://riteh.uniri.hr/kontakti/
// const NUMBER_OF_PAGES = 11

// function getAllChildParagraphText($: CheerioAPI, element: any): string {
//     let result = ""
//     const paragraphs = $(element).find('p')
//     paragraphs.each((i, e) => {
//         result += $(e).text().trim()
//         if (i < paragraphs.length - 1) {
//             result += ' ';
//         }
//     });
//     return result;
// }

// export async function getProfessorData() { 
//     const contacts: ProfessorData[] = [];
    
//     for(let i = 1; i <= NUMBER_OF_PAGES; i++) {
//         const contactsURL = `http://localhost:8080/proxy?url=https://www.riteh.uniri.hr/kontakti/${i}/`; //temporary solution
//         const axiosInstance = axios.create();

//         const response = await axiosInstance.get(contactsURL)
//         const $ = load(response.data);
//         const contactsTableRows = $(".djelatnik");

//         contactsTableRows.each((_, element) => {
//             const mainDivs = $(element).find("> a > div");
//             if (mainDivs.length != 5) {
//                 console.error('something went wrong. Main divs len =', mainDivs.length);
//             }
            
//             const name = getAllChildParagraphText($, mainDivs[0]);
//             const phoneNumber = getAllChildParagraphText($, mainDivs[1]);
//             const internalPhoneNumber = getAllChildParagraphText($, mainDivs[2]);
//             const email = getAllChildParagraphText($, mainDivs[3]);
//             const room = getAllChildParagraphText($, mainDivs[4]);
//             const entity = "" // no entity data
            
//             contacts.push({
//                 name, 
//                 phoneNumber, 
//                 internalPhoneNumber,
//                 email, 
//                 room, 
//                 entity
//             });
//         });
        
//         console.log('scraped ', i, 'of ', NUMBER_OF_PAGES);
//     }
    
//     console.log('contacts length:', contacts.length);

//     const contactsJSON = JSON.stringify(contacts);
//     console.log(contactsJSON);
// }
