// export default function ArtistsPage() {
//   return <h1>Artists Page</h1>;
// }
"use client";

import React, { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    async function fetchArtists() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/artists");
        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading artists...</p>;
  }

  return (
    <div className="h-full px-6 py-10">
      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mb-8">
        Explore Artists
      </h1>

      <div className="flex flex-wrap justify-around">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artistData={artist} />
        ))}
      </div>
    </div>
  );
}