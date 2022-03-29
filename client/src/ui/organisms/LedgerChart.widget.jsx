import React from 'react';
import { useQuery } from 'react-query';
import { SummaryService } from 'api';
import { SUMMARY_QUERY } from 'queryKeys';
import { Loader } from 'ui/atoms/Loader';
import { Error } from 'ui/atoms/Error';
import { NoContent } from 'ui/atoms/NoContent';
import { CategoryCell, Money, Card } from 'ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const LedgerChartWidget = () => {
  const {
    isLoading,
    error,
    data: dataFetch,
  } = useQuery(
    SUMMARY_QUERY,
    async () => {
      const fetchData = await SummaryService.findAll();
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

  const validData = () =>
    dataFetch &&
    Object.values(dataFetch).every((el) => {
      if (typeof el === 'object') {
        return !!el.length;
      }

      return !!el;
    });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!validData()) {
    return <NoContent />;
  }

  const data = {
    datasets: [
      {
        label: '# of Votes',
        data: dataFetch?.spending.map((item, index) => item.amountInCents),
        backgroundColor: dataFetch?.spending.map(
          (item, index) => item.categoryColor,
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3 style={{ margin: '0', padding: '0' }}>Saldo</h3>
          <p style={{ fontSize: '16px', marginTop: '0' }}>Pozostała kwota</p>
        </div>
        <b>
          <Money inCents={dataFetch?.balance} />
        </b>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
        }}
      >
        <div style={{ width: '200px' }}>
          <Doughnut
            options={{ responsive: true, maintainAspectRatio: true }}
            data={data}
          />
        </div>
      </div>
      {dataFetch?.spending.map((item, index) => (
        <CategoryCell
          size={'12px'}
          key={index}
          color={item.categoryColor}
          name={item.categoryName}
        />
      ))}
    </Card>
  );
};
