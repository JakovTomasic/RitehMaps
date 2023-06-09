import axios from "axios";
import cheerio from "cheerio";
import { ProfessorData } from "../data/ProfessorData";

export function getProfessorData() : object { 
    const contactsURL = "https://cors-anywhere.herokuapp.com/http://www.riteh.uniri.hr/kontakti/"; //temporary solution
    const axiosInstance = axios.create();

    axiosInstance.get(contactsURL).then((response) => {
        const $ = cheerio.load(response.data);
        const contactsTableRows = $("#contacts > tbody > tr");
        const contacts: ProfessorData[] = [];
        var contactsJSON: string;

        contactsTableRows.each((i, element) => {
            const name: string = $(element).find("td:nth-child(1) > a").text();
            const phoneNumber: string = $(element).find("td:nth-child(2) > span").text();
            const internalPhoneNumber: string = $(element).find("td:nth-child(3)")
                                                          .text()
                                                          .replace(/(\r\n|\n|\r)/gm, "")
                                                          .trim();
            const email: string = $(element).find("td:nth-child(4) > a").text();
            const room: string = $(element).find("td:nth-child(5)").text();
            const entity: string = $(element).find("td:nth-child(6) > a").text();

            contacts.push({
                name, 
                phoneNumber, 
                internalPhoneNumber,
                email, 
                room, 
                entity
            });
        });

        contactsJSON = JSON.stringify(contacts);
        console.log(contactsJSON);
        return contactsJSON;

    }).catch(console.error);
    
    return [];
}
