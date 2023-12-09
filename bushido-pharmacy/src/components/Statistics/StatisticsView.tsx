import React from 'react';
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
  ResponsiveContainer, // Import ResponsiveContainer
} from 'recharts';

import styles from './StatisticsView.module.css';

const StatisticsView = () => {
  const [productData] = useAtom(productDataAtom);

  const sortedProductData = [...productData]
    .sort((a, b) => a.price - b.price)
    .slice(0.5);

  return (
    <React.Fragment>
      <div className={styles.chartsWrapper}>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            {/* Use ResponsiveContainer */}
            <BarChart
              data={sortedProductData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
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
          pie chart
          {/* https://recharts.org/en-US/examples/TwoSimplePieChart */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatisticsView;
