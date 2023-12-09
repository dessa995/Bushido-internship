import React, { useEffect } from 'react';
import { productDataAtom, manufacturersDataAtom } from '../../App';
import { useAtom } from 'jotai';

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell, // Import ResponsiveContainer
} from 'recharts';

import styles from './StatisticsView.module.css';

const StatisticsView = () => {
  const [productData] = useAtom(productDataAtom);

  const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#000'];

  const manufacturerData = [
    {
      name: 'hemofarm',
      value: 0,
    },
    {
      name: 'bayer',
      value: 0,
    },
    {
      name: 'ivancic',
      value: 0,
    },
    {
      name: 'noData',
      value: 0,
    },
  ];

  function manufacturerCounter() {
    productData.forEach((product) => {
      if (product.manufacturerDataId === '1') {
        (
          manufacturerData.find((manu) => manu.name === 'hemofarm') as any
        ).value += 1;
      } else if (product.manufacturerDataId === '2') {
        (
          manufacturerData.find((manu) => manu.name === 'bayer') as any
        ).value += 1;
      } else if (product.manufacturerDataId === '3') {
        (
          manufacturerData.find((manu) => manu.name === 'ivancic') as any
        ).value += 1;
      } else {
        (
          manufacturerData.find((manu) => manu.name === 'noData') as any
        ).value += 1;
      }
    });

    console.log(manufacturerData);
  }

  manufacturerCounter();

  const sortedProductDataExpensive = [...productData]
    .sort((a, b) => a.price - b.price)
    .slice(0.5);

  const sortedProductDataCheap = [...productData]
    .sort((a, b) => b.price - a.price)
    .slice(0.5);

  const maxPriceCheap = Math.max(
    ...sortedProductDataCheap.map((item) => item.price),
    0
  );

  return (
    <React.Fragment>
      <div className={styles.chartsWrapper}>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedProductDataExpensive}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={'name'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="price"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedProductDataCheap}>
              {' '}
              {/*this one */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={'name'} />
              <YAxis domain={[0, maxPriceCheap + 2]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="price"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={manufacturerData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {manufacturerData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {/* <Tooltip /> */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatisticsView;
