import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

const data = [
  {
    name: "SMPN 2 Depok",
    risk: 82,
  },
  {
    name: "SMPN 1 Mlati",
    risk: 76,
  },
  {
    name: "SMPN 3 Ngaglik",
    risk: 70,
  },
  {
    name: "SMPN 1 Sleman",
    risk: 64,
  },
  {
    name: "SMPN 1 Gamping",
    risk: 58,
  },
];

export default function TopSchoolsChart() {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />

          <YAxis type="category" dataKey="name" width={120} />

          <Tooltip />

          <Bar dataKey="risk" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
