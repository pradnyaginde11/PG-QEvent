"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Tag from "@/components/Tag";

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(
          `https://qevent-backend.labs.crio.do/events/${eventId}`
        );
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <p className="text-center mt-10">Loading event details...</p>;
  }

  if (!event) {
    return <p className="text-center mt-10">Event not found.</p>;
  }

  return (
    <div className="h-full px-6 py-10">
      <img
        src={event.image}
        alt={`${event.name} image`}
        className="w-full max-w-2xl mx-auto mb-6 rounded-lg shadow-lg"
      />
      <h1 className="text-5xl font-bold bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mb-1">
        {event.name}
      </h1>
      <p className="text-lg text-orange-400 font-semibold mb-1">{event.location}</p>
      <h2 className="text-lg text-orange-400 font-semibold mb-16">{event.artist}</h2>
      

      <div className="flex gap-2 mb-4 justify-start">
        {event.tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
      <p className="text-lg">{event.description}</p>
      <div className="flex justify-between">
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
            {" "}
            {event.price > 0 ? `$${event.price.toLocaleString()}` : "FREE"}
        </h3>
        <button
              onClick={() => {}}
              className=" bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
            >
              Buy Tickets
        </button>
      </div>
      
      
    </div>
  );
}