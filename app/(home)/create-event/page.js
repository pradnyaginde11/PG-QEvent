"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/events"); // redirect if not logged in
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return (
    <div className="h-full px-6 py-10">
      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mb-8">
        Create Event
      </h1>
      <p>Welcome, {session?.user?.name}! You can now create a new event here.</p>
      {/* Add your event creation form here */}
    </div>
  );
}