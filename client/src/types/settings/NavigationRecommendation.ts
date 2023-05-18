import { Course } from "./Course";
import { RoomReservation } from "./RoomReservation";

export class NavigationRecommendation {
    course: Course;
    timeAndPlace: RoomReservation;

    constructor(course: Course, timeAndPlace: RoomReservation) {
        this.course = course;
        this.timeAndPlace = timeAndPlace;
    }
}
