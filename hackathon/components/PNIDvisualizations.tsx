import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
const sampleData = [
  {
    equipments: "Equipment 1",
    counts: [
      { count: 5 },
    ],
  },
  {
    instruments: "Instrument 2",
    counts: [
      { count: 2 },
    ],
  },
];

const barData = [
  { position: "A", Equipments: 5, Instruments: 3 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];



const PNIDvisualizations: React.FC = () => {

  return <div>
<h3 className="text-lg font-semibold mb-2 text-gray-200">PNID visualizations</h3>
<div className="overflow-x-auto">
      <table className="w-full text-left text-gray-300 border-collapse">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-700">equipments</th>
            <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-700">instruments</th>
           
          </tr>
        </thead>
        <tbody>
          {sampleData.map((type, index) => (
            <tr key={index} className="hover:bg-gray-700 transition-colors duration-200">
              <td className="p-4 border-b border-gray-700">{type.equipments}</td>
              <td className="p-4 border-b border-gray-700">
                {type.instruments}
                <div className="space-y-1">
                  {type.counts.map((type, i) => (
                    <div key={i} className="text-sm text-gray-400">{`${type.count}: ${type.count}`}</div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-gray-200">Materials</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="position" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#D1D5DB' }} />
            <Legend wrapperStyle={{ color: '#D1D5DB' }} />
            {Object.keys(barData[0] || {}).filter(key => key !== 'position').map((key, index) => (
              <Bar key={key} dataKey={key} fill={COLORS[index % 4]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
  </div>;

};



export default PNIDvisualizations;
