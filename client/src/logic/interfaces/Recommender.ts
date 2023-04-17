import { Course } from "../../types/settings/Course";

export interface Recommender {
    checkForCourseRecommendation(): Course[]
}
