import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';
import styles from "./ExpenseSummaryPie.module.css"
import { useState } from 'react';

const COLORS = ['#A000FF', '#FF9304', '#FDE006'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  { name: 'Food', value: 100 },
  { name: 'Entertainment', value: 0 },
  { name: 'Travel', value: 0 },
//   { name: 'Group D', value: 200 },
];




export default function ExpenseSummaryPie({pieData}) {

    
    // console.log("pieData >>", pieData);


    return (<div className={styles.pieWindow}>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        </ResponsiveContainer>
        

    </div>)
}