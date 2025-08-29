"use client"
import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import PNIDvisualizations from "@/components/PNIDvisualizations"
import Isometricvisualizations from "@/components/Isometricvisualizations"
const BASE_URL = "https://testing.asets.io/v1" 
const API_KEY = process.env.NEXT_PUBLIC_ASETS_API_KEY
const ASSET_ID = "bitcoin" 
const CURRENCY = "usd"
const TIMEFRAME = "1d"
const LIMIT = 60
const INTERVAL = "10min"
const DATA_TYPE = "price"
const CHART_TYPE = "line"
const CHART_COLOR = "rgba(75, 192, 192, 1)"
const BACKGROUND_COLOR = "rgba(75, 192, 192, 0.2)"
const BORDER_COLOR = "rgba(75, 192, 192, 1)" 
const POINT_RADIUS = 2
const POINT_HOVER_RADIUS = 5 


export default function Dashboard() {
 
 
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Asset Dashboard</h1>
      <div className="w-full max-w-4xl">
        <PNIDvisualizations />
        <Isometricvisualizations />
      </div>
    </main>
  )
}