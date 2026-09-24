import { RoomSearchImpl } from "../src/logic/impl/RoomSearchImpl";
import { NodesContainerImpl } from "../src/logic/impl/NodesContainerImpl";
import { specialSearchResults } from "../src/data/SpecialSearchResults";
import { Node, ProfessorData } from "../src/data/ServerData";

const OFFICE: Node = { nodeId: "2-56", names: ["2-56", "cabinet"], submapId: 3, x: 0, y: 0, type: 2 };
const LAB: Node = { nodeId: "2-160", names: ["L18", "2-160"], submapId: 3, x: 0, y: 0, type: 0 };

const PROFESSOR: ProfessorData = {
    name: "izv. prof. dr. sc. Nikola Anđelić",
    phoneNumber: "",
    internalPhoneNumber: "",
    email: "",
    room: "2-56",
    entity: "",
};
const OFFICE_MATE: ProfessorData = { ...PROFESSOR, name: "v. asist. dr. sc. Marta Alvir" };

function roomSearch(): RoomSearchImpl {
    const nodes = [OFFICE, LAB];
    return new RoomSearchImpl(new NodesContainerImpl(nodes), [PROFESSOR, OFFICE_MATE], nodes);
}

describe('testing findSuggestionById()', () => {

  test('keeps the name the url asked for when the data lists it for that id', () => {
    const found = roomSearch().findSuggestionById("2-56", `${OFFICE_MATE.name} (2-56)`);

    expect(found?.roomName).toBe(`${OFFICE_MATE.name} (2-56)`);
    expect(found?.person).toEqual({ name: OFFICE_MATE.name, room: "2-56" });
  });

  test('matches a name ignoring case and spacing, and answers with the data\'s own spelling', () => {
    const found = roomSearch().findSuggestionById("2-160", "l18");

    expect(found?.roomName).toBe("L18");
  });

  test('drops a name the data does not list for that id', () => {
    const found = roomSearch().findSuggestionById("2-160", "<img src=x onerror=alert(1)>");

    expect(found?.roomName).toBe("L18");
    expect(found?.person).toBeUndefined();
  });

  test('drops a name that belongs to another room', () => {
    const found = roomSearch().findSuggestionById("2-160", `${PROFESSOR.name} (2-56)`);

    expect(found?.roomName).toBe("L18");
  });

  test('falls back to the room rather than to one of the several people in it', () => {
    const found = roomSearch().findSuggestionById("2-56");

    expect(found?.roomName).toBe("2-56");
    expect(found?.person).toBeUndefined();
  });

  test('resolves the special searches, which are ids without a node', () => {
    const special = specialSearchResults[0];

    expect(roomSearch().findSuggestionById(special.id)?.roomName).toBe(special.name);
  });

  test('gives nothing for an id the data does not know', () => {
    expect(roomSearch().findSuggestionById("not_a_room")).toBeUndefined();
  });
});
