import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const EventGenre = ({ events }) => {

  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
      const data = genres.map((genre) => {
        const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;
        return { name: genre, value };
      });
      return data;
    };
    setData(() => getData());
  }, [events]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF66B2'  ];

  return (
    <>
    <h6 className="text-muted">Distribution of event type</h6>
    <ResponsiveContainer height={300}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill='rgb(4, 67, 137)'
          datakey='value'
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >{
            data.map((entry, index) => (<Cell key={index} fill={COLORS[index]}/>
            ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    </>
  );

}

export default EventGenre