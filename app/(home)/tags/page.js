"use client";

import React, { useEffect, useState } from "react";
import Tag from "@/components/Tag";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/tags");
        const data = await res.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading tags...</p>;
  }

  return (
    <div className="h-full px-6 py-10">
      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mb-8">
        Explore Tags
      </h1>

      <div className="flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <Tag key={tag.id} text={tag.name} />
        ))}
      </div>
    </div>
  );
}