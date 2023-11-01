import { EndNodesGraphMock } from "../src/logic/mock/EndNodesGraphMock";
import { recreatePath } from "../src/logic/impl/pathfinding/recreatePath";
import { mockMapNode } from "../src/utils/mockingUtils";

describe('testing recreatePath()', () => {

  var endNodesGraph = new EndNodesGraphMock;

  test('should return correct recreated path', () => {
    var destinationNodeId = "5";
    var parents = new Map<string, string>([["2", "1"], ["3", "2"], ["4", "3"], ["5", "4"]]);
    var expectedPath = [mockMapNode("1"), 
                        mockMapNode("2"),
                        mockMapNode("3"), 
                        mockMapNode("4"), 
                        mockMapNode("5")];

    var path = recreatePath(destinationNodeId, parents, endNodesGraph);
    expect(path).toEqual(expectedPath);
  });

  test('should return error due to incorrect destinationNodeId', () => {
    var destinationNodeId = "10";
    var parents = new Map<string, string>([["2", "1"], ["3", "2"], ["4", "3"], ["10", "4"]]);
    var errorMessage = "Node with id = 10 does not exist in the provided graph.";

    expect(() =>  recreatePath(destinationNodeId, parents, endNodesGraph)).toThrowError(errorMessage);
  });

  test('should return error due to incorrect parentId', () => {
    var destinationNodeId = "5";
    var parents = new Map<string, string>([["2", "1"], ["3", "2"], ["4", "-1"], ["5", "4"]]);
    var errorMessage = "Node with id = -1 does not exist in the provided graph.";

    expect(() =>  recreatePath(destinationNodeId, parents, endNodesGraph)).toThrowError(errorMessage);
  });
});