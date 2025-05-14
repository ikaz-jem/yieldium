import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { day: 'Day 1', value: 1000 },
  { day: 'Day 2', value: 1020 },
  { day: 'Day 3', value: 1040.4 },
  { day: 'Day 4', value: 1061.21 },
  { day: 'Day 5', value: 1082.43 },
  { day: 'Day 6', value: 1104.08 },
  { day: 'Day 7', value: 1126.16 },
  { day: 'Day 8', value: 1148.68 },
  { day: 'Day 9', value: 1171.65 },
  { day: 'Day 10', value: 1195.08 },
  { day: 'Day 11', value: 1218.98 },
  { day: 'Day 12', value: 1243.36 },
  { day: 'Day 13', value: 1268.23 },
  { day: 'Day 14', value: 1293.6 },
  { day: 'Day 15', value: 1319.47 },
];

const GrowthChart = () => (
  <div className="w-full h-96 p-4 rounded-lg">
    <h2 className="text-xl font-semibold mb-4 text-white">Compounded Investment Growth</h2>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} >
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" stroke="#ffffffaa" className='text-xs'/>
        {/* YAxis removed */}
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid #ffffff44',
            color: '#fff',
            backdropFilter: 'blur(6px)',
          }}
          labelStyle={{ color: '#fff' }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend wrapperStyle={{ color: '#fff' }} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--accent)"
          fill="url(#growthFill)"
          name="Compounded Value"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default GrowthChart;
