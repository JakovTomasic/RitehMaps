import { buildings } from "../src/data/submaps";
import { createBuildings } from "../src/logic/impl/BuildingsFactory";
import { SubmapProviderImpl } from "../src/logic/impl/SubmapProviderImpl";
import { en } from "../src/i18n/en";

function serverSubmaps(ids: number[]) {
    return ids.map(id => ({ id: id, caption: `submap ${id}` }));
}

function allSubmapIds(): number[] {
    return buildings.flatMap(building => building.floors.map(floor => floor.submapId));
}

describe('testing createBuildings()', () => {

  test('gives every hardcoded building its floors, lowest first', () => {
    const ids = allSubmapIds();

    const result = createBuildings(serverSubmaps(ids), new SubmapProviderImpl(serverSubmaps(ids)), en);

    expect(result.map(building => building.name)).toEqual(buildings.map(building => building.name(en)));
    result.forEach((building, index) => {
        expect(building.floors.map(floor => floor.label)).toEqual(buildings[index].floors.map(floor => floor.label));
        expect(building.floors.map(floor => floor.submap.id)).toEqual(buildings[index].floors.map(floor => floor.submapId));
    });
  });

  test('leaves out a floor the server did not send', () => {
    const ids = allSubmapIds();
    const missingId = buildings[0].floors[0].submapId;
    const sent = ids.filter(id => id !== missingId);

    const result = createBuildings(serverSubmaps(sent), new SubmapProviderImpl(serverSubmaps(sent)), en);

    expect(result.flatMap(building => building.floors.map(floor => floor.submap.id))).toEqual(sent);
  });

  test('leaves out a building with no floor plans at all', () => {
    const ids = buildings[0].floors.map(floor => floor.submapId);

    const result = createBuildings(serverSubmaps(ids), new SubmapProviderImpl(serverSubmaps(ids)), en);

    expect(result.map(building => building.name)).toEqual([buildings[0].name(en)]);
  });
});
