import { MapNode } from "../../../types/graph/MapNode";
import { MapNodeFilter } from "../../../types/roomsearch/MapNodeFilter";
import { NavigationDirections } from "../../../types/navigation/NavigationDirections";
import { NavigationNode } from "../../../types/navigation/NavigationNode";
import { MapNavigator } from "../../interfaces/MapNavigator";
import { Graph } from "../../interfaces/Graph";
import { findPathWithDijkstra } from "./findPathWithDijkstra";
import { NavigationStep } from "../../../types/navigation/NavigationStep";
import { getNodeBounds, navNodeToAbsoluteDot } from "../graph/Utils";
import { eucledianDistance } from "../../../utils/Geometry";
import { SubmapProvider } from "../../interfaces/SubmapProvider";

const ABSOLUTE_THRESHOLD_FOR_COMBINING_NEAR_NODES = 35;

export class MapNavigatorImpl implements MapNavigator {

    private graph: Graph;
    private submapProvider: SubmapProvider;

    constructor(graph: Graph, submapProvider: SubmapProvider) {
        this.graph = graph;
        this.submapProvider = submapProvider;
    }

    findShortestPath(startNodeId: string, endNodeFilter: MapNodeFilter): NavigationDirections {
        const path = this.findPathToNearestNode(startNodeId, endNodeFilter);
        const navNodes = this.convertPathToNavigationNodes(path);
        const standaloneNodes = this.removeNodesThatAreTooNear(navNodes);
        return this.splitNavigationPathIntoSteps(standaloneNodes);
    }

    findShortestPathForCompassMode(startNodeId: string, endNodeFilter: MapNodeFilter): NavigationDirections {
        const path = this.findPathToNearestNode(startNodeId, endNodeFilter);
        const navNodes = this.convertPathToNavigationNodes(path);
        const standaloneNodes = this.removeNodesThatAreTooNear(navNodes);
        return this.splitNavigationPathIntoStepsOfTwoNodesEach(standaloneNodes);
    }

    findShortestPathForFloorByFloor(startNodeId: string, endNodeFilter: MapNodeFilter): NavigationDirections {
        const path = this.findPathToNearestNode(startNodeId, endNodeFilter);
        const navNodes = this.convertPathToNavigationNodes(path);
        const standaloneNodes = this.removeNodesThatAreTooNear(navNodes);
        return this.splitNavigationPathIntoStepsWholeFloorOneStep(standaloneNodes);
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

    private splitNavigationPathIntoStepsOfTwoNodesEach(path: NavigationNode[]): NavigationDirections {

        const STEP_MAX_WIDTH = 30;
        const STEP_MAX_HEIGHT = 30;

        const usablePath = this.makeAllEdgesSmallEnough(path, STEP_MAX_WIDTH, STEP_MAX_HEIGHT);

        if (usablePath.length < 2) {
            return new NavigationDirections([new NavigationStep(usablePath)])
        }

        const steps: NavigationStep[] = [];

        let previousNode: NavigationNode = usablePath[0];
        for (let i = 1; i < usablePath.length; i++) {
            let currentNode = usablePath[i];
            if (previousNode.submapId == currentNode.submapId) {
                steps.push(new NavigationStep([previousNode, currentNode]));
            }
            previousNode = currentNode;
        }

        return new NavigationDirections(steps);
    }

    private splitNavigationPathIntoStepsWholeFloorOneStep(path: NavigationNode[]): NavigationDirections {

        const steps: NavigationStep[] = [];

        let previousNode: NavigationNode = path[0];
        let currentStepNodes: NavigationNode[] = [previousNode];
        for (let i = 1; i < path.length; i++) {
            let currentNode = path[i];
            if (previousNode.submapId != currentNode.submapId) {
                steps.push(new NavigationStep([...currentStepNodes]));
                currentStepNodes = [];
            }
            currentStepNodes.push(currentNode)
            previousNode = currentNode;
        }

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

            const notTheSameSubmap = currentNode.submapId !== nextNode.submapId;
            const doesNotFitIntoBounds = Math.abs(edgeWidth) <= maxWidth && Math.abs(edgeHeight) <= maxHeight;

            if (notTheSameSubmap || doesNotFitIntoBounds) {
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

    private removeNodesThatAreTooNear(path: NavigationNode[]): NavigationNode[] {

        if (path.length < 2) {
            return path;
        }

        let resultPath: NavigationNode[] = [];

        let index = 1;
        let allNodesAdded = false;

        while (index < path.length) {

            let firstNode: NavigationNode = path[index - 1];

            let xSumRelative = firstNode.xCoordinate;
            let ySumRelative = firstNode.yCoordinate;
            let nearNodesCount = 1;

            let previousNode: NavigationNode = firstNode;
            let currentNode: NavigationNode = path[index];
            let absDotPrevious = navNodeToAbsoluteDot(previousNode, this.submapProvider);
            let absDotCurrent = navNodeToAbsoluteDot(currentNode, this.submapProvider);

            while(previousNode.submapId == currentNode.submapId
                    && eucledianDistance(absDotPrevious, absDotCurrent) < ABSOLUTE_THRESHOLD_FOR_COMBINING_NEAR_NODES) {
                    
                xSumRelative += currentNode.xCoordinate;
                ySumRelative += currentNode.yCoordinate;
                nearNodesCount++;
                index++;
                
                if (index == path.length) {
                    allNodesAdded = true;
                    break;
                }

                previousNode = path[index - 1];
                currentNode = path[index];
                absDotPrevious = navNodeToAbsoluteDot(previousNode, this.submapProvider);
                absDotCurrent = navNodeToAbsoluteDot(currentNode, this.submapProvider);
            }

            const x = (xSumRelative) / nearNodesCount;
            const y = (ySumRelative) / nearNodesCount;
            resultPath.push(new NavigationNode(firstNode.submapId, x, y));

            index++;
        }

        if (!allNodesAdded) {
            resultPath.push(path[path.length - 1]);
        }

        return resultPath;
    }
}
