import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { riskDistribution } from "../../data/dashboard";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function RiskChart() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[260px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={riskDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
            >
              {riskDistribution.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4 w-full mt-4">
        {riskDistribution.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="font-medium text-slate-700">{item.name}</span>
            </div>

            <span className="font-bold text-slate-800">
              {item.value.toLocaleString("id-ID")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
