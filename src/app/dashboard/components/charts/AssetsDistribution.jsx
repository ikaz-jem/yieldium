'use client';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#14b8a6'];

const AssetDistributionChart = ({ user }) => {
  const data = formatAssetData(user);

  if (!data.length) return null;

  return (
    <div className="w-full h-96 rounded-lg border border-primary/10 py-5">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            label={({ name, value }) => `${name}: $ ${value}`}
            fontSize={ '1rem'}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${value}`, 'Value']}
            contentStyle={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid #ffffff44',
              color: '#fff',
              backdropFilter: 'blur(6px)',
              fontSize: '0.75rem',
            }}
            labelStyle={{ color: '#fff', fontSize: '0.75rem' }}
            itemStyle={{ color: '#fff', fontSize: '0.75rem' }}
          />
          <Legend
            wrapperStyle={{
              color: '#fff',
              fontSize: '0.75rem',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// helper outside the component
function formatAssetData(user) {
  return user.balances
    .filter((b) => b.convertedAmount > 0)
    .map((b) => ({
      name: b.currency.toUpperCase(),
      value: parseFloat(Number(b.convertedAmount).toFixed(2)),
    }));
}

export default AssetDistributionChart;
