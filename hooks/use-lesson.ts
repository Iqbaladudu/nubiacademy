import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";
import {useEffect, useState} from "react";

export function useLesson(lesson_id?: string) {
    const [lesson, setLesson] = useState< UseQueryResult<AxiosResponse<any, any>, unknown>
    >();
    
    const get_lesson =  useQuery({
        queryKey: ["kelas-saya-detail", lesson_id || ""],
        queryFn: async () => {
            return axios.get(`/api/lesson/${lesson_id}`);
        },
        enabled: Boolean(lesson_id),
    });

    useEffect(() => {
        if (get_lesson.isSuccess) {
            setLesson(get_lesson);
        }
    }, [get_lesson.isSuccess]);

    return lesson;
}
