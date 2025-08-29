import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface GraphData {
    barData: {  Material : string; [key: string]: number | string }[];
    pieData: { type: string; data: { name: string; value: number }[] }[];
  }

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const Isometricvisualizations: React.FC = () => {
  const data: GraphData = {
    barData: [],
    pieData: [
      {
        type: "example",
        data: [
          { name: "Materials A", value: 40 },
          { name: "Materials B", value: 60 },
        ],
      },
    ],
  };

  return <div>

 {/* Pie Chart */}
 <div className="bg-gray-800 p-4 rounded-lg shadow-md">
 <h3 className="text-lg font-semibold mb-2 text-gray-200">Most common Instrument</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            {data.pieData.map((pie, index) => (
              <Pie
                key={index}
                data={pie.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`}
                labelLine={false}
              >
                {pie.data.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % 4]} />
                ))}
              </Pie>
            ))}
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#D1D5DB' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
  </div>;
  

};

export default Isometricvisualizations;
