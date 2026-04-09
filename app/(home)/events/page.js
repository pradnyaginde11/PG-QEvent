// export default function EventsPage() {
//   return <h1>Events Page</h1>;
// }
"use client";

import React, { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const artistName = searchParams.get("artist");
  const tagName = searchParams.get("tag");



  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events");
        const data = await res.json();

        let filteredEvents = data;

      
        // Filter by artist if present
        if (artistName) {
          filteredEvents = filteredEvents.filter(
            (event) => event.artist.toLowerCase() === artistName.toLowerCase()
          );
        }

        // Filter by tag if present
        if (tagName) {
          filteredEvents = filteredEvents.filter((event) =>
            event.tags.some(
              (tag) => tag.toLowerCase() === tagName.toLowerCase()
            )
          );
        }

        setEvents(filteredEvents);

      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [artistName, tagName]);


  if (loading) {
    return <p className="text-center mt-10">Loading events...</p>;
  }

  return (
    <div className="h-full px-6 py-10">
      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mb-8">
        {artistName
          ? `Events by ${artistName}`
          : tagName
          ? `Events tagged with #${tagName}`
          : "Explore Events"}


      </h1>

      <div className="flex flex-wrap justify-around">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} eventData={event} />)
        ) : (
          <p className="text-center mt-10">
            No events found {artistName ? `for ${artistName}` : `with #${tagName}`}
          </p>
        )}

      </div>

    </div>
  );
}