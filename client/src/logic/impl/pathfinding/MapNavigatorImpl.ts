import { MapNode } from "../../../types/graph/MapNode";
import { MapNodeFilter } from "../../../types/roomsearch/MapNodeFilter";
import { NavigationDirections } from "../../../types/navigation/NavigationDirections";
import { NavigationNode } from "../../../types/navigation/NavigationNode";
import { MapNavigator } from "../../interfaces/MapNavigator";
import { Graph } from "../../interfaces/Graph";
import { findPathWithDijkstra } from "./findPathWithDijkstra";
import { NavigationStep } from "../../../types/navigation/NavigationStep";
import { getNodeBounds } from "../graph/Utils";

export class MapNavigatorImpl implements MapNavigator {
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    findShortestPath(startNodeId: string, endNodeFilter: MapNodeFilter): NavigationDirections {
        const path = this.findPathToNearestNode(startNodeId, endNodeFilter);
        const navNodes = this.convertPathToNavigationNodes(path);
        return this.splitNavigationPathIntoSteps(navNodes);
    }

    private findPathToNearestNode(startNodeId: string, endNodeFilter: MapNodeFilter): MapNode[] {
       return findPathWithDijkstra(startNodeId, endNodeFilter, this.graph);
    }

    private convertPathToNavigationNodes(path: MapNode[]): NavigationNode[] {
        return path.map(node => new NavigationNode(node.submapId, node.xCoordinate, node.yCoordinate));
    }

    private splitNavigationPathIntoSteps(path: NavigationNode[]): NavigationDirections {

        const STEP_MAX_WIDTH = 30;
        const STEP_MAX_HEIGHT = 30;

        const usablePath = this.makeAllEdgesSmallEnough(path, STEP_MAX_WIDTH, STEP_MAX_HEIGHT);

        const steps: NavigationStep[] = [];
        let currentStepNodes: NavigationNode[] = [];
        let previousNode: NavigationNode | null = null;
        usablePath.forEach(node => {
            const nextStep = [...currentStepNodes, node];

            if (previousNode == null) {
                currentStepNodes = nextStep;
            } else if (previousNode.submapId != node.submapId) {
                steps.push(new NavigationStep(currentStepNodes))
                currentStepNodes = [node]
            } else if (!this.fitsInRectangle(nextStep, STEP_MAX_WIDTH, STEP_MAX_HEIGHT)) {
                steps.push(new NavigationStep(currentStepNodes))
                currentStepNodes = [previousNode, node]
            } else {
                currentStepNodes = nextStep;
            }

            previousNode = node;
        });

        if (currentStepNodes.length > 0) {
            steps.push(new NavigationStep(currentStepNodes))
        }

        return new NavigationDirections(steps);
    }

    private fitsInRectangle(stepNodes: NavigationNode[], maxWidth: number, maxHeight: number): boolean {
        const {minX, minY, maxX, maxY} = getNodeBounds(stepNodes);

        const stepWidth = maxX - minX;
        const stepHeight = maxY - minY;
        
        return stepWidth <= maxWidth && stepHeight <= maxHeight;
    }

    private makeAllEdgesSmallEnough(pathNodes: NavigationNode[], maxWidth: number, maxHeight: number): NavigationNode[] {

        if (pathNodes.length == 0) {
            return [];
        }

        const result: NavigationNode[] = [];
        let currentNode = pathNodes[0];
        let nextNodeIndex: number = 1;
    
        let nextNode: NavigationNode = currentNode;

        while (nextNodeIndex < pathNodes.length) {
            nextNode = pathNodes[nextNodeIndex];

            const edgeWidth = nextNode.xCoordinate - currentNode.xCoordinate;
            const edgeHeight = nextNode.yCoordinate - currentNode.yCoordinate;

            result.push(currentNode);

            if (Math.abs(edgeWidth) <= maxWidth && Math.abs(edgeHeight) <= maxHeight) {
                currentNode = nextNode;
                nextNodeIndex++;
            } else {
                const ratio = Math.min(maxWidth / Math.abs(edgeWidth), maxHeight / Math.abs(edgeHeight));
                const segmentDx = edgeWidth * ratio;
                const segmentDy = edgeHeight * ratio;

                const midNode = new NavigationNode(
                    currentNode.submapId,
                    currentNode.xCoordinate + segmentDx,
                    currentNode.yCoordinate + segmentDy,
                );
                currentNode = midNode;
            }
        }

        result.push(nextNode);
    
        return result;
    }

}
