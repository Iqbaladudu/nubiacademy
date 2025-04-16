import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/sections/footer";
import axios from "axios";
// Pastikan path import CourseDetails sudah benar sesuai struktur folder Anda
import CourseDetails from "@/components/kelas/course-details"; // <-- Impor Client Component

export const dynamicParams = true; // Optional: Sesuaikan jika perlu

// Fungsi untuk generate static paths jika menggunakan SSG
export async function generateStaticParams() {
  try {
    const response = await axios.get(`${process.env.LOCAL_ENDPOINT}/course`);
    const courses = response.data.docs || []; // Pastikan docs ada
    return courses.map((course: any) => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error("Failed to fetch courses for static params:", error);
    return []; // Return empty array on error
  }
}

// Tipe props untuk Page component
interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params; // Akses slug langsung

  try {
    const fetchKelas = await axios.get(
      `${process.env.LOCAL_ENDPOINT}/course?where[slug][equals]=${slug}`,
    );

    // Handle jika kursus tidak ditemukan
    if (!fetchKelas.data.docs || fetchKelas.data.docs.length === 0) {
      // Anda bisa redirect atau menampilkan halaman 404 di sini
      // import { notFound } from 'next/navigation';
      // notFound();
      console.error(`Course with slug "${slug}" not found.`);
      // Tampilkan pesan error atau fallback UI
      return (
        <main>
          <Navbar />
          <section className="flex flex-col items-center justify-center mx-auto mt-10 max-w-5xl px-5 h-[calc(100vh-200px)]">
            <h1 className="text-2xl font-semibold">Kursus Tidak Ditemukan</h1>
            <p className="text-muted-foreground mt-2">
              Kursus yang Anda cari tidak dapat ditemukan.
            </p>
          </section>
          <Footer />
        </main>
      );
    }

    const kelasOne = fetchKelas.data.docs[0];

    return (
      <main className="bg-background text-foreground">
        {" "}
        {/* Background color for consistency */}
        <Navbar />
        {/* Padding atas dan bawah untuk section */}
        <section className="flex flex-col justify-center mx-auto max-w-5xl px-5 py-8 md:py-12">
          {/* Render Client Component dengan props */}
          <CourseDetails course={kelasOne} slug={slug} />
        </section>
        <Footer />
      </main>
    );
  } catch (error) {
    console.error(`Failed to fetch course data for slug "${slug}":`, error);
    // Handle error fetching data
    return (
      <main>
        <Navbar />
        <section className="flex flex-col items-center justify-center mx-auto mt-10 max-w-5xl px-5 h-[calc(100vh-200px)]">
          <h1 className="text-2xl font-semibold text-destructive">
            Gagal Memuat Data
          </h1>
          <p className="text-muted-foreground mt-2">
            Terjadi kesalahan saat mengambil data kursus.
          </p>
        </section>
        <Footer />
      </main>
    );
  }
}
