import { Navbar } from "@/components/layout/navbar";
import { instance, local } from "@/services/global";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Footer } from "@/components/layout/sections/footer";
import { Badge } from "@/components/ui/badge";
import { formatToK } from "@/util/numberToKFormatter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import axios from "axios";
import { toIDRFormat } from "@/lib/utils";

export const dynamicParams = true;

export async function generateStaticParams() {
  const course = await axios
    .get(`${process.env.LOCAL_ENDPOINT}/kelas`)
    .then((res) => res.data.docs);

  return course.map((course) => ({
    slug: course.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const fetchKelas = await axios.get(
    `${process.env.LOCAL_ENDPOINT}/kelas/${slug}`
  );

  const kelasOne = await fetchKelas.data.docs[0];

  return (
    <main>
      <Navbar />
      <section className="flex flex-col justify-center mx-auto mt-5 max-w-5xl px-5">
        {/* course image */}
        <div className="flex flex-col md:flex-row gap-3 sm:flex-row">
          <div className="">
            <Image
              height={kelasOne.thumbnail.height}
              width={kelasOne.thumbnail.width}
              src={`http://localhost:3001${kelasOne.thumbnail.url}`}
              alt={kelasOne.name}
              className="w-[250px] h-[250px] object-cover mx-auto md:mx-0"
            />
          </div>
          {/* course details */}
          <div className="prose dark:prose-invert">
            <div>
              {/* <Badge className="text-xs md:text-sm dark:text-white dark:bg-secondary">
                {toIDRFormat(kelasOne.price)}
              </Badge> */}
              <Badge
                variant="outline"
                className="text-gray-600 dark:text-gray-300 text-xs md:text-sm ml-1"
              >
                Kategori: {kelasOne.category_name}
              </Badge>
              <Badge
                className="ml-1 text-gray-600 text-xs md:text-sm dark:text-gray-300"
                variant="outline"
              >
                Level: {kelasOne.level}
              </Badge>
            </div>
            <p className="text-xl font-bold my-2">{kelasOne.name}</p>
            <p>{kelasOne.short_description}</p>
            <div className="p-0 flex text-secondary items-center justify-between">
              <p className="text-xl font-bold">{toIDRFormat(kelasOne.price)}</p>
              <Button
                size="default"
                className="dark:text-white dark:bg-secondary"
                asChild
              >
                <Link
                  href={`/kelas/${slug}/checkout`}
                  className=" no-underline"
                >
                  BELI SEKARANG
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="description"
          className="mt-5 prose prose-neutral dark:prose-invert"
        >
          <TabsList>
            <TabsTrigger value="description">Deskripsi</TabsTrigger>
            <TabsTrigger value="syllabus">Silabus</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <div className="max-w-5xl">
              <RichText className="" data={kelasOne.description} />
            </div>
          </TabsContent>
          <TabsContent value="syllabus">
            <Accordion type="single" collapsible>
              {kelasOne.modules &&
                kelasOne.modules.map((module, index) => (
                  <AccordionItem value={module.id} key={index}>
                    <AccordionTrigger className="py-0">
                      {module.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {module.contents.map((content, index) => (
                          <li key={index}>{content.title}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </section>
      <Footer />
    </main>
  );
}
