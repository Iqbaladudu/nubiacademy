import EventsCTA from "@/components/events/events-cta";
import EventsFeatured from "@/components/events/events-featured";
import EventsHero from "@/components/events/events-hero";
import EventsRounds from "@/components/events/events-rounds";
import { Navbar } from "@/components/layout/navbar";
import axios from "axios";

export const dynamicParams = true;

export async function generateStaticParams() {
  const events = await axios
    .get(`${process.env.LOCAL_ENDPOINT}/events`)
    .then((res) => res.data.docs);

  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const fetchEvent = await axios.get(
    `${process.env.LOCAL_ENDPOINT}/events?where[slug][equals]=${slug}`
  );

  const eventOne = await fetchEvent.data.docs[0];

  return (
    <>
      <Navbar />
      <main className="flex flex-col mb-5">
        <EventsHero
          title={eventOne.title}
          description={eventOne.description}
          category={eventOne.category}
        />
        {eventOne.highlights && (
          <EventsFeatured highlights={eventOne.highlights} />
        )}
        {eventOne.rounds && <EventsRounds rounds={eventOne.rounds} />}
        <EventsCTA />
      </main>
    </>
  );
}
