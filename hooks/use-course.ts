import {CourseContext} from "../context/courseContext";
import {useContext} from "react";

export default function useCourse() {
    const context = useContext(CourseContext);

    if (!context) {
        throw new Error("Terjadi kesalaham")
    }
    
    return context
}