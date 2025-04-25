import {Navbar} from "@/components/layout/navbar";
import {Footer} from "@/components/layout/sections/footer";
import CourseDetails from "@/components/kelas/course-details";
import {getCourses} from "@/action/get-courses.action";
import {getCourseBySLug} from "@/action/get-course-by-slug.action";

// Define a proper Course interface
interface Course {
    id: string;
    slug: string;
    name: string;
    // Add other properties as needed
}

export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const response = await getCourses(1);

        if (!response.success || !response.docs) {
            return [];
        }

        return response.docs.map((course: Course) => ({
            slug: course.slug,
        }));
    } catch (error) {
        console.error("Failed to fetch courses for static params:", error);
        return [];
    }
}

interface PageProps {
    params: { slug: string };
}

export default async function Page({params}: PageProps) {
    const {slug} = params;

    try {
        const response = await getCourseBySLug(slug);

        if (!response.success || !response.docs || response.docs.length === 0) {
            return (
                <main>
                    <Navbar/>
                    <section
                        className="flex flex-col items-center justify-center mx-auto mt-10 max-w-5xl px-5 h-[calc(100vh-200px)]">
                        <h1 className="text-2xl font-semibold">Kursus Tidak Ditemukan</h1>
                        <p className="text-muted-foreground mt-2">
                            Kursus yang Anda cari tidak dapat ditemukan.
                        </p>
                    </section>
                    <Footer/>
                </main>
            );
        }

        const kelasOne = response.docs[0];

        return (
            <main className="bg-background text-foreground">
                <Navbar/>
                <section className="flex flex-col justify-center mx-auto max-w-5xl px-5 py-8 md:py-12">
                    <CourseDetails course={kelasOne} slug={slug}/>
                </section>
                <Footer/>
            </main>
        );
    } catch (error) {
        console.error(`Failed to fetch course data for slug "${slug}":`, error);
        return (
            <main>
                <Navbar/>
                <section
                    className="flex flex-col items-center justify-center mx-auto mt-10 max-w-5xl px-5 h-[calc(100vh-200px)]">
                    <h1 className="text-2xl font-semibold text-destructive">
                        Gagal Memuat Data
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Terjadi kesalahan saat mengambil data kursus.
                    </p>
                </section>
                <Footer/>
            </main>
        );
    }
}