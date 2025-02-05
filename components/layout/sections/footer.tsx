import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32 mx-auto">
      <div className="p-10 bg-card rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-8 content-between">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex font-bold items-center">
              <h3 className="text-2xl text-primary">NUBI ACADEMY</h3>
            </Link>
            <p>PT. KECERDASAN TEKNOLOGI INDONESIA</p>
            <p>Lima Puluh Kota, Sumatera Barat</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Sosial Media</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Instagram
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                LinkedIn
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitter
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Layanan Kami</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Kursus Online
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                In-House Workshop
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Konsultasi
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Dukungan</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Umpan Balik
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">&copy; 2024 Developed by NUBI ACADEMY</h3>
        </section>
      </div>
    </footer>
  );
};
