import { Translations } from "./en";

/** The setting is named in english in the browser itself, so the path through it is left alone. */
const SENSOR_SETTING_HINT = "u pregledniku Brave: Settings, Site settings, Motion sensors";

/**
 * Croatian. Typed as `Translations`, so a key added to `en.ts` and forgotten here is a compile
 * error rather than an english word turning up in the middle of a croatian screen.
 */
export const hr: Translations = {

    languageName: "HR",
    languageSwitcherLabel: "Jezik",

    notFound: "404: Stranica ne postoji!",

    navbar: {
        map: "Karta",
    },

    home: {
        about: "O projektu",
    },

    about: {
        title: "O Riteh maps projektu",
        subtitle: "Navigacija po zgradama Tehničkog fakulteta u Rijeci.",
        madeBy: (authors: string) => `Izradili: ${authors}. Uz pomoć ostalih na`,
        github: "GitHubu",
        disclaimer: "Karta se održava ručno, pa je moguće da je neka prostorija preimenovana ili "
            + "da se profesor preselio u drugi ured od zadnjeg ažuriranja. Također, stranica ne "
            + "prati gdje se nalazite.",
        close: "Zatvori",
    },

    search: {
        startLabel: "Gdje se sada nalazite?",
        destinationLabel: "Kamo želite ići?",
        startPlaceholder: "ulaz",
        startPreferredActualName: "ulaz",
        destinationPlaceholder: "Pretraži",
        swap: "Zamijeni polazište i odredište",
        clear: "Obriši",
        nearestToilet: "Najbliži WC",
        men: "Muški",
        women: "Ženski",
        nearestMenToilet: "Najbliži muški WC",
        nearestWomenToilet: "Najbliži ženski WC",
        quick: "Brzo",
        detailed: "Detaljno",
        copyLink: "Kopiraj poveznicu na ovu rutu",
        linkCopied: "Poveznica kopirana!",
    },

    navigation: {
        editSearch: "Uredi pretragu",
        back: "Natrag",
        next: "Dalje",
        finish: "Završi",
        stepLabel: "Korak",
        stepValue: (current: number, total: number) => `${current} od ${total}`,
        arrivedAt: "Stigli ste do",
        room: (room: string) => `Prostorija ${room}`,
        arrived: "Stigli ste na odredište",
        backToMap: "Natrag na kartu",
        newSearch: "Nova pretraga",
        error: "Greška",
        zoom: "povećaj",
    },

    map: {
        backToSearch: "Pretraga",
        floorDown: "Kat niže",
        floorUp: "Kat više",
        floor: (label: string) => `Kat ${label}`,
        floorCaption: (building: string, floor: string) => `${building}, kat ${floor}`,
        noFloorPlans: "Nema tlocrta za prikaz.",
        mainBuilding: "Glavna zgrada",
        labBuilding: "Zgrada laboratorija",
    },

    compass: {
        unavailable: "Način rada s kompasom - nije dostupan na ovom uređaju",
        turnOff: "Isključi način rada s kompasom",
        turnOn: "Uključi način rada s kompasom - karta prati smjer u koji ste okrenuti",
        facingThisWay: "Okrenuti ste u ovom smjeru",
        tapToStart: "Dodirnite kartu da pokrenete kompas",
        keepLevel: "Molimo držite uređaj paralelno s tlom",
        failureSilent: "Nema očitanja kompasa. Ovaj uređaj možda nema kompas ili preglednik "
            + `blokira senzore pokreta (${SENSOR_SETTING_HINT}).`,
        failureMissing: "Ovaj uređaj nema senzor kompasa.",
        failureNoNorth: "Ovaj preglednik javlja u kojem se smjeru uređaj okreće, ali ne i gdje je "
            + "sjever, pa način rada s kompasom u njemu ne može raditi.",
        failureBlocked: "Preglednik blokira senzore pokreta. Uključite ih u njegovim postavkama "
            + `(${SENSOR_SETTING_HINT}) i ponovno učitajte stranicu.`,
        insecure: "Kompas radi samo preko sigurne (https) veze.",
    },
};
