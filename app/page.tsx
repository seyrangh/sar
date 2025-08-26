// app/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import WorldClassSidebar from "@/components/WorldClassSidebar";
import WorldClassDashboard from "@/components/WorldClassDashboard";
import BeautifulLanding from "@/components/BeautifulLanding";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SarMentor...</p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <WorldClassSidebar>
        <WorldClassDashboard />
      </WorldClassSidebar>
    );
  }

  return <BeautifulLanding />;
}
