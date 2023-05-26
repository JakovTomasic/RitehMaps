import { Course } from "../../types/settings/Course";
import { CustomRoomName } from "../../types/settings/CustomRoomName";
import { Locale } from "../../types/settings/Locale";
import { Theme } from "../../types/settings/Theme";

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
