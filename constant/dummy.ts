interface CourseType {
  id: number;
  title: string;
  description: string;
  instructor: string;
  categoryId: number;
  price: number;
  rating: number;
  totalStudents: number;
  duration: string;
  level: string;
  imageUrl: string;
  slug: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const dummyCourses: CourseType[] = [
  {
    id: 1,
    title: "Pengenalan JavaScript Modern",
    description:
      "Pelajari JavaScript dari dasar hingga mahir dengan project praktis",
    instructor: "Ahmad Santoso",
    categoryId: 1,
    price: 299000,
    rating: 4.7,
    totalStudents: 5600,
    duration: "8 jam 30 menit",
    level: "Pemula",
    imageUrl: "https://placehold.co/600x400?text=JavaScript+Kursus",
    slug: generateSlug("Pengenalan JavaScript Modern"), // pengenalan-javascript-modern
  },
  {
    id: 2,
    title: "Pengembangan Aplikasi React Profesional",
    description: "Membangun aplikasi web kompleks menggunakan React dan Redux",
    instructor: "Siti Rahayu",
    categoryId: 1,
    price: 499000,
    rating: 4.9,
    totalStudents: 3200,
    duration: "16 jam",
    level: "Lanjutan",
    imageUrl: "https://placehold.co/600x400?text=React+Profesional",
    slug: generateSlug("Pengembangan Aplikasi React Profesional"), // pengembangan-aplikasi-react-profesional
  },
  {
    id: 3,
    title: "Desain UI/UX dengan Figma",
    description:
      "Kuasai desain antarmuka pengguna profesional menggunakan Figma",
    instructor: "Budi Pratama",
    categoryId: 2,
    price: 349000,
    rating: 4.6,
    totalStudents: 4500,
    duration: "10 jam",
    level: "Menengah",
    imageUrl: "https://placehold.co/600x400?text=UI/UX+Figma",
    slug: generateSlug("Desain UI/UX dengan Figma"), // desain-ui-ux-dengan-figma
  },
  {
    id: 4,
    title: "Ilustrasi Digital untuk Pemula",
    description:
      "Pelajari teknik ilustrasi digital dari dasar menggunakan Adobe Illustrator",
    instructor: "Dewi Kartika",
    categoryId: 2,
    price: 279000,
    rating: 4.5,
    totalStudents: 2800,
    duration: "6 jam 45 menit",
    level: "Pemula",
    imageUrl: "https://placehold.co/600x400?text=Ilustrasi+Digital",
    slug: generateSlug("Ilustrasi Digital untuk Pemula"), // ilustrasi-digital-untuk-pemula
  },
  {
    id: 5,
    title: "Manajemen Proyek Profesional",
    description: "Strategi dan teknik manajemen proyek modern",
    instructor: "Rudi Hartono",
    categoryId: 3,
    price: 399000,
    rating: 4.8,
    totalStudents: 3700,
    duration: "12 jam",
    level: "Menengah",
    imageUrl: "https://placehold.co/600x400?text=Manajemen+Proyek",
    slug: generateSlug("Manajemen Proyek Profesional"), // manajemen-proyek-profesional
  },
  {
    id: 6,
    title: "Kewirausahaan Digital",
    description: "Membangun dan mengelola bisnis online dari awal",
    instructor: "Rina Widiastuti",
    categoryId: 3,
    price: 449000,
    rating: 4.7,
    totalStudents: 4100,
    duration: "15 jam",
    level: "Lanjutan",
    imageUrl: "https://placehold.co/600x400?text=Kewirausahaan+Digital",
    slug: generateSlug("Kewirausahaan Digital"), // kewirausahaan-digital
  },
  {
    id: 7,
    title: "Strategi Pemasaran Media Sosial",
    description: "Kuasai teknik marketing di platform media sosial",
    instructor: "Agus Setiawan",
    categoryId: 4,
    price: 299000,
    rating: 4.6,
    totalStudents: 5200,
    duration: "9 jam",
    level: "Menengah",
    imageUrl: "https://placehold.co/600x400?text=Pemasaran+Sosial",
    slug: generateSlug("Strategi Pemasaran Media Sosial"), // strategi-pemasaran-media-sosial
  },
  {
    id: 8,
    title: "Google Ads Masterclass",
    description: "Panduan komprehensif menjalankan iklan Google yang efektif",
    instructor: "Fiona Andriani",
    categoryId: 4,
    price: 379000,
    rating: 4.9,
    totalStudents: 3600,
    duration: "11 jam 30 menit",
    level: "Lanjutan",
    imageUrl: "https://placehold.co/600x400?text=Google+Ads",
    slug: generateSlug("Google Ads Masterclass"), // google-ads-masterclass
  },
  {
    id: 9,
    title: "Pengantar Machine Learning dengan Python",
    description: "Memulai perjalanan di dunia machine learning dari nol",
    instructor: "Muhammad Ilham",
    categoryId: 5,
    price: 429000,
    rating: 4.8,
    totalStudents: 4800,
    duration: "14 jam",
    level: "Menengah",
    imageUrl: "https://placehold.co/1024x1024?text=Machine+Learning",
    slug: generateSlug("Pengantar Machine Learning dengan Python"), // pengantar-machine-learning-dengan-python
  },
  {
    id: 10,
    title: "Analisis Data dengan SQL dan Tableau",
    description: "Transformasikan data mentah menjadi wawasan bisnis",
    instructor: "Lisa Permata",
    categoryId: 5,
    price: 389000,
    rating: 4.7,
    totalStudents: 3900,
    duration: "10 jam 45 menit",
    level: "Lanjutan",
    imageUrl: "https://placehold.co/600x400?text=Analisis+Data",
    slug: generateSlug("Analisis Data dengan SQL dan Tableau"), // analisis-data-dengan-sql-dan-tableau
  },
];
