import { findPathWithDijkstra } from "../src/logic/impl/pathfinding/findPathWithDijkstra";
import { EndNodesGraphMock } from "../src/logic/mock/EndNodesGraphMock";
import { HallwaysGraphMock } from "../src/logic/mock/HallwaysGraphMock";
import { MapNode } from "../src/types/graph/MapNode";
import { MapNodeFilterById } from "../src/types/roomsearch/MapNodeFilterById";

describe('testing findPathWithDijkstra() with a 6-node graph', () => {

  var endNodesGraph = new EndNodesGraphMock;

  test('should return correct path from 5 to 2', () => {
    var startNodeId = "5";
    var mapNodeFilter = new MapNodeFilterById("2");
    var expectedPath = [new MapNode("5", 1, 0, 0), 
                        new MapNode("3", 1, 0, 0),
                        new MapNode("0", 1, 0, 0), 
                        new MapNode("1", 1, 0, 0), 
                        new MapNode("2", 1, 0, 0)];

    var path = findPathWithDijkstra(startNodeId, mapNodeFilter, endNodesGraph)
    expect(path).toEqual(expectedPath);
  });

  test('should return only one node', () => {
    var startNodeId = "0";
    var mapNodeFilter = new MapNodeFilterById("0");
    var expectedPath = [new MapNode("0", 1, 0, 0)];

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
    var errorMessage = "Start location not valid.";

    expect(() => findPathWithDijkstra(startNodeId, mapNodeFilter, endNodesGraph)).toThrowError(errorMessage);
  });
});

describe('testing findPathWithDijkstra() with a 9-node graph', () => {

  var hallwaysGraph = new HallwaysGraphMock;

  test('should return correct path from 0 to 8', () => {
    var startNodeId = "0";
    var mapNodeFilter = new MapNodeFilterById("8");
    var expectedPath = [new MapNode("0", 1, 0, 0), 
                        new MapNode("1", 1, 0, 0), 
                        new MapNode("2", 1, 0, 0), 
                        new MapNode("8", 1, 0, 0)];
  
    var path = findPathWithDijkstra(startNodeId, mapNodeFilter, hallwaysGraph)
    expect(path).toEqual(expectedPath);
  });

  test('should return correct path from 0 to 4', () => {
    var startNodeId = "0";
    var mapNodeFilter = new MapNodeFilterById("4");
    var expectedPath = [new MapNode("0", 1, 0, 0), 
                        new MapNode("7", 1, 0, 0), 
                        new MapNode("6", 1, 0, 0), 
                        new MapNode("5", 1, 0, 0),
                        new MapNode("4", 1, 0, 0)];
  
    var path = findPathWithDijkstra(startNodeId, mapNodeFilter, hallwaysGraph)
    expect(path).toEqual(expectedPath);
  });

  test('should return correct path from 4 to 1', () => {
    var startNodeId = "4";
    var mapNodeFilter = new MapNodeFilterById("1");
    var expectedPath = [new MapNode("4", 1, 0, 0), 
                        new MapNode("5", 1, 0, 0), 
                        new MapNode("2", 1, 0, 0), 
                        new MapNode("1", 1, 0, 0)];
  
    var path = findPathWithDijkstra(startNodeId, mapNodeFilter, hallwaysGraph)
    expect(path).toEqual(expectedPath);
  });

  test('should return only one node', () => {
    var startNodeId = "8";
    var mapNodeFilter = new MapNodeFilterById("8");
    var expectedPath = [new MapNode("8", 1, 0, 0)];
  
    var path = findPathWithDijkstra(startNodeId, mapNodeFilter, hallwaysGraph)
    expect(path).toEqual(expectedPath);
  });

  test('should throw destination error', () => {
    var startNodeId = "7";
    var mapNodeFilter = new MapNodeFilterById("9");
    var errorMessage = "Destination cannot be reached.";

    expect(() => findPathWithDijkstra(startNodeId, mapNodeFilter, hallwaysGraph)).toThrowError(errorMessage);
  });

  test('should throw start location error', () => {
    var startNodeId = "10";
    var mapNodeFilter = new MapNodeFilterById("10");
    var errorMessage = "Start location not valid.";

    expect(() => findPathWithDijkstra(startNodeId, mapNodeFilter, hallwaysGraph)).toThrowError(errorMessage);
  });
});