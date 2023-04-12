import { NavigationStep } from "./NavigationStep";

export class NavigationDirections {
    steps: NavigationStep[]

    constructor(steps: NavigationStep[]) {
        this.steps = steps;
    }
}
