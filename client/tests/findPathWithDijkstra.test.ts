import { findPathWithDijkstra, findPathWithDijkstraDebug } from "../src/logic/impl/pathfinding/findPathWithDijkstra";
import { EndNodesGraphMock } from "../src/logic/mock/EndNodesGraphMock";
import { HallwaysGraphMock } from "../src/logic/mock/HallwaysGraphMock";
import { MapNodeFilterById } from "../src/types/roomsearch/MapNodeFilterById";
import { mockMapNode } from "../src/utils/mockingUtils";

describe('testing findPathWithDijkstra() with a 6-node graph', () => {

  var endNodesGraph = new EndNodesGraphMock;

  test('should return correct path from 5 to 2', () => {
    var startNodeId = "5";
    var mapNodeFilter = new MapNodeFilterById("2");
    var expectedPath = [mockMapNode("5"), 
                        mockMapNode("3"),
                        mockMapNode("0"), 
                        mockMapNode("1"), 
                        mockMapNode("2")];

    var path = findPathWithDijkstra(startNodeId, mapNodeFilter, endNodesGraph)
    expect(path).toEqual(expectedPath);
  });

  test('should return only one node', () => {
    var startNodeId = "0";
    var mapNodeFilter = new MapNodeFilterById("0");
    var expectedPath = [mockMapNode("0")];

    var path = findPathWithDijkstra(startNodeId, mapNodeFilter, endNodesGraph)
    expect(path).toEqual(expectedPath);
  });

  test('should throw destination error', () => {
    var startNodeId = "5";
    var mapNodeFilter = new MapNodeFilterById("100");
    var errorMessage = "Destination cannot be reached.";

    expect(() => findPathWithDijkstra(startNodeId, mapNodeFilter, endNodesGraph)).toThrowError(errorMessage);
  });

  test('should throw start location error', () => {
    var startNodeId = "-6";
    var mapNodeFilter = new MapNodeFilterById("3");
    var errorMessage = "Start location not valid: -6";

    expect(() => findPathWithDijkstra(startNodeId, mapNodeFilter, endNodesGraph)).toThrowError(errorMessage);
  });
});

describe('testing findPathWithDijkstra() with a 9-node graph', () => {

  var hallwaysGraph = new HallwaysGraphMock;

  test('should return correct path from 0 to 8', () => {
    var startNodeId = "0";
    var mapNodeFilter = new MapNodeFilterById("8");
    var expectedPath = [mockMapNode("0"), 
                        mockMapNode("1"), 
                        mockMapNode("2"), 
                        mockMapNode("8")];
  
    var path = findPathWithDijkstraDebug(startNodeId, mapNodeFilter, hallwaysGraph, 0);
    expect(path).toEqual(expectedPath);
  });

  test('should return correct path from 0 to 4', () => {
    var startNodeId = "0";
    var mapNodeFilter = new MapNodeFilterById("4");
    var expectedPath = [mockMapNode("0"), 
                        mockMapNode("7"), 
                        mockMapNode("6"), 
                        mockMapNode("5"),
                        mockMapNode("4")];
  
    var path = findPathWithDijkstraDebug(startNodeId, mapNodeFilter, hallwaysGraph, 0);
    expect(path).toEqual(expectedPath);
  });

  test('should return correct path from 4 to 1', () => {
    var startNodeId = "4";
    var mapNodeFilter = new MapNodeFilterById("1");
    var expectedPath = [mockMapNode("4"), 
                        mockMapNode("5"), 
                        mockMapNode("2"), 
                        mockMapNode("1")];
  
    var path = findPathWithDijkstraDebug(startNodeId, mapNodeFilter, hallwaysGraph, 0);
    expect(path).toEqual(expectedPath);
  });

  test('should return only one node', () => {
    var startNodeId = "8";
    var mapNodeFilter = new MapNodeFilterById("8");
    var expectedPath = [mockMapNode("8")];
  
    var path = findPathWithDijkstraDebug(startNodeId, mapNodeFilter, hallwaysGraph, 0);
    expect(path).toEqual(expectedPath);
  });

  test('should throw destination error', () => {
    var startNodeId = "7";
    var mapNodeFilter = new MapNodeFilterById("9");
    var errorMessage = "Destination cannot be reached.";

    expect(() => findPathWithDijkstraDebug(startNodeId, mapNodeFilter, hallwaysGraph, 0)).toThrowError(errorMessage);
  });

  test('should throw start location error', () => {
    var startNodeId = "10";
    var mapNodeFilter = new MapNodeFilterById("10");
    var errorMessage = "Start location not valid: 10";

    expect(() => findPathWithDijkstraDebug(startNodeId, mapNodeFilter, hallwaysGraph, 0)).toThrowError(errorMessage);
  });
});