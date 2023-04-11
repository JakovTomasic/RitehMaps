import { Course } from "../../types/Course";
import { CustomRoomName } from "../../types/CustomRoomName";
import { Locale } from "../../types/Locale";
import { Theme } from "../../types/Theme";

export interface Settings {
    getTheme(): Theme
    setTheme(theme: Theme): void

    getLocale(): Locale
    setLocale(locale: Locale): void
    
    getUserCourses(): Course[]
    addUserCourse(course: Course): void
    removeUserCourse(course: Course): void
    
    getCustomRoomNames(): CustomRoomName[]
    addCustomRoomName(name: CustomRoomName): void
    removeCustomRoomName(name: CustomRoomName): void
}
