import { Course } from "../../types/Course";

export interface Recommender {
    checkForCourseRecommendation(): Course | undefined
}
