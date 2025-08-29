"use client";
import { useEffect, useState } from "react";
import Isometricvisualizations from "../components/Isometricvisualizations";
import PNIDvisualizations from "../components/PNIDvisualizations";

export default function Page() {
  const [isoData, setIsoData] = useState<any>(null);
  const [pnidData, setPnidData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        
        console.log("Fetching PNID data...");
        const pnidResponse = await fetch("/api/pnid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            fileUrl: "https://testing.asets.io/docs/pnid_001.pdf" 
          }),
        });
        
        if (!pnidResponse.ok) {
          throw new Error(`PNID API error: ${pnidResponse.status}`);
        }
        
        const pnidResult = await pnidResponse.json();
        console.log("PNID data received:", pnidResult);
        setPnidData(pnidResult);
        
        // Now fetch the ISO data
        console.log("Fetching ISO data...");
        const isoResponse = await fetch("/api/isometric", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            fileUrl: "https://testing.asets.io/docs/iso_014.png" 
          }),
        });
        
        if (!isoResponse.ok) {
          throw new Error(`Isometric API error: ${isoResponse.status}`);
        }
        
        const isoResult = await isoResponse.json();
        console.log("ISO data received:", isoResult);
        setIsoData(isoResult);
      } catch (err: any) {
        console.error("Failed to fetch data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Asets Dashboard</h1>
      
      {loading && (
        <div className="text-gray-400 text-xl">Loading visualizations...</div>
      )}
      
      {error && (
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
      )}
      
      {!loading && !error && (
        <div className="w-full max-w-7xl space-y-16">
          {isoData && <Isometricvisualizations />}
          
          <div className="border-t-2 border-gray-700 pt-8 mt-8">
            {pnidData ? (
              <PNIDvisualizations />
            ) : (
              <div className="text-red-400">
                No PNID data available. Check console for details.
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}