// import axios from "axios";
// import cheerio from "cheerio";
// import { ProfessorData } from "../data/ProfessorData";

// /*
// To run this script, go to https://cors-anywhere.herokuapp.com/corsdemo and request temporary access to
// the server. After that, call the getProfessorData() function from somewhere inside the index.tsx file 
// and run the application (yarn run dev). Once the home page loads on localhost:3000, the new list of 
// professors should be printed in the console in the JSON fromat. Copy that JSON object and replace the
// old professor data in ProfessorData.ts. To format the document, use the Prettier extension 
// (esbenp.prettier-vscode). Right-click somewhere in the ProfessorData.ts file and choose 
// "Format Document With..." -> "Prettier - Code formatter".
// */

// export function getProfessorData() : object { 
//     const contactsURL = "https://cors-anywhere.herokuapp.com/http://www.riteh.uniri.hr/kontakti/"; //temporary solution
//     const axiosInstance = axios.create();

//     axiosInstance.get(contactsURL).then((response) => {
//         const $ = cheerio.load(response.data);
//         const contactsTableRows = $("#contacts > tbody > tr");
//         const contacts: ProfessorData[] = [];
//         var contactsJSON: string;

//         contactsTableRows.each((i, element) => {
//             const name: string = $(element).find("td:nth-child(1) > a").text();
//             const phoneNumber: string = $(element).find("td:nth-child(2) > span").text();
//             const internalPhoneNumber: string = $(element).find("td:nth-child(3)")
//                                                           .text()
//                                                           .replace(/(\r\n|\n|\r)/gm, "")
//                                                           .trim();
//             const email: string = $(element).find("td:nth-child(4) > a").text();
//             const room: string = $(element).find("td:nth-child(5)").text();
//             const entity: string = $(element).find("td:nth-child(6) > a").text();

//             contacts.push({
//                 name, 
//                 phoneNumber, 
//                 internalPhoneNumber,
//                 email, 
//                 room, 
//                 entity
//             });
//         });

//         contactsJSON = JSON.stringify(contacts);
//         console.log(contactsJSON);
//         return contactsJSON;

//     }).catch(console.error);
    
//     return [];
// }
