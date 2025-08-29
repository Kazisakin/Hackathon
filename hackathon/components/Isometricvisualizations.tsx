import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042"
];

const DEFAULT_FILE_URL = "https://testing.asets.io/docs/iso_014.png";

function filterRows(
  rows: any[],
  type: string,
  material: string
) {
  return rows.filter(
    (row) =>
      (type ? row.type === type : true) &&
      (material ? row.material === material : true)
  );
}

function exportCSV(rows: any[]) {
  if (!rows.length) {
    alert("No rows to export.");
    return;
  }
  const cols = Object.keys(rows[0]);
  const csv = [
    cols.join(","),
    ...rows.map((row) => cols.map((col) => `"${row[col] ?? ""}"`).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Sanitized_data.csv";
  a.click();
  URL.revokeObjectURL(url);
}

const Isometricvisualizations: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/isometric", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileUrl: DEFAULT_FILE_URL }),
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        setData(null);
        alert("Failed to load isometric data: " + err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-200">Loading...</div>;
  if (!data || !data.summary || !data.rows) return <div className="text-red-400">No data loaded.</div>;

  const typePieData = Object.entries(data.summary.by_type ?? {}).map(([name, value]) => ({
    name,
    value: Number(value),
  }));
  const materialBarData = Object.entries(data.summary.by_material ?? {}).map(([material, value]) => ({
    material,
    value: Number(value),
  }));

  const allTypes = data.summary.unique_types ?? [];
  const allMaterials = data.summary.unique_materials ?? [];
  const filteredRows = filterRows(data.rows, typeFilter, materialFilter);

  return (
    <div className="space-y-12 text-gray-200">
   
      <section>
        <h2 className="text-xl font-bold mb-2">Isometric Visualizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-200">
              Materials Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={materialBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="material" stroke="#D1D5DB" />
                <YAxis stroke="#D1D5DB" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    color: "#D1D5DB",
                  }}
                />
                <Legend wrapperStyle={{ color: "#D1D5DB" }} />
                <Bar dataKey="value" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart*/}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-200">
              Types Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill={COLORS[2]}
                  label
                >
                  {typePieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    color: "#D1D5DB",
                  }}
                />
                <Legend wrapperStyle={{ color: "#D1D5DB" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Isometricvisualizations;