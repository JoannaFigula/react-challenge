import React from 'react';
import { Card } from 'ui';
import { useQuery } from 'react-query';
import { BUDGET_QUERY } from 'queryKeys';
import { BudgetService } from 'api';
import { Loader } from 'ui/atoms/Loader';
import { Error } from 'ui/atoms/Error';
import { NoContent } from 'ui/atoms/NoContent';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const BudgetChartWidget = () => {
  const {
    isLoading,
    error,
    data: dataFetch,
  } = useQuery(
    BUDGET_QUERY,
    async () => {
      const fetchData = await BudgetService.findAll();
      return fetchData;
    },
    {
      onSuccess: (dataFetch) => {
        console.log('success');
        console.log(dataFetch);
      },
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!dataFetch.length) {
    return <NoContent />;
  }

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const labels = dataFetch.map((el) => el.category?.name + ' %');
  let bgColors = dataFetch.map((el) => el.category?.color);
  let currentSpendingPercent = dataFetch.map((el) => el.currentSpendingPercent);

  const data = {
    labels,
    datasets: [
      {
        data: currentSpendingPercent,
        backgroundColor: bgColors,
      },
    ],
  };

  return (
    <Card>
      <h3 style={{ margin: '0', padding: '0' }}>Budżet</h3>
      <p style={{ fontSize: '16px', marginTop: '0' }}>Podsumowanie wyników</p>
      <Bar options={options} data={data} />
    </Card>
  );
};
