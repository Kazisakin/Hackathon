import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import isoData from "./data.json";

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042",
  "#a4de6c", "#d0ed57", "#8dd1e1", "#83a6ed"
];



// --------- PNID Visualization
const samplePNIDTableData = [
  { equipment: "Pump", count: 3 },
  { equipment: "Valve", count: 4 },
  { equipment: "Compressor", count: 2 },
];
const samplePNIDBarData = [
  { name: "Pump", Count: 3 },
  { name: "Valve", Count: 4 },
  { name: "Compressor", Count: 2 },
];


const typePieData = Object.entries(isoData.summary.by_type).map(([name, value]) => ({
  name,
  value: Number(value),
}));
const materialBarData = Object.entries(isoData.summary.by_material).map(([material, value]) => ({
  material,
  value: Number(value),
}));

// --------- Filters ----------
const allTypes = isoData.summary.unique_types;
const allMaterials = isoData.summary.unique_materials;

const filterRows = (rows: typeof isoData.rows, type: string, material: string) => {
  return rows.filter(row =>
    (type ? row.type === type : true) &&
    (material ? row.material === material : true)
  );
};

// --------- Export
function exportCSV(rows: any[]) {
  const cols = Object.keys(rows[0]);
  const csv = [
    cols.join(","),
    ...rows.map(row => cols.map(col => `"${row[col] ?? ""}"`).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "filtered_data.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// --------- Dashboard Component ----------
const Dashboard: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");

  const filteredRows = filterRows(isoData.rows, typeFilter, materialFilter);

  return (
    <div className="space-y-12 text-gray-200">
      {/* PNID Visualizations */}
      <section>
        <h2 className="text-xl font-bold mb-2">PNID Visualizations</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-left text-gray-300 border-collapse">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-700">Equipment</th>
                <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-700">Count</th>
              </tr>
            </thead>
            <tbody>
              {samplePNIDTableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-700 transition-colors duration-200">
                  <td className="p-4 border-b border-gray-700">{row.equipment}</td>
                  <td className="p-4 border-b border-gray-700">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={samplePNIDBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#D1D5DB" />
              <YAxis stroke="#D1D5DB" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#D1D5DB' }} />
              <Legend wrapperStyle={{ color: '#D1D5DB' }} />
              <Bar dataKey="Count" fill={COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Filters + Export */}
      <section>
  <h2 className="text-xl font-bold mb-2">Filters & Export</h2>
  <div className="flex flex-wrap gap-4 items-end">
    <div>
      <label className="block mb-1">Filter by Type:</label>
      <select
        value={typeFilter}
        onChange={e => setTypeFilter(e.target.value)}
        className="bg-gray-700 text-gray-200 rounded px-2 py-1"
      >
        <option value="">All</option>
        {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
    <div>
      <label className="block mb-1">Filter by Material:</label>
      <select
        value={materialFilter}
        onChange={e => setMaterialFilter(e.target.value)}
        className="bg-gray-700 text-gray-200 rounded px-2 py-1"
      >
        <option value="">All</option>
        {allMaterials.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
    </div>
    <button
      onClick={() => exportCSV(filteredRows)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
    >Export Filtered Rows (CSV)</button>
  </div>
  <div className="overflow-x-auto mt-4">
    <table className="w-full text-xs text-gray-300 border-collapse">
      <thead className="bg-gray-800">
        <tr>
          {filteredRows.length > 0 &&
            Object.keys(filteredRows[0])
              .filter(col => !["description", "material", "original", "source_row", "catalog_code"].includes(col))
              .map(col => (
                <th key={col} className="p-2 border-b border-gray-700">{col}</th>
              ))}
        </tr>
      </thead>
      <tbody>
        {filteredRows.slice(0, 50).map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-700 transition-colors">
            {Object.entries(row)
            
              .filter(([col]) => !["description", "material", "original", "source_row", "catalog_code"].includes(col))
              .map(([col, val], i) =>
                <td key={i} className="p-2 border-b border-gray-700">{String(val)}</td>
              )}
          </tr>
        ))}
      </tbody>
    </table>
    {filteredRows.length > 50 && <p className="mt-2 text-gray-400">Showing first 50 rows...</p>}
  </div>
</section>
    </div>
  );
};

export default Dashboard;