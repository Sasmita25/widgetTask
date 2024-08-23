import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function DonutChart({ data }) {
  const [hiddenIndices, setHiddenIndices] = useState([]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        display: true,
        position: 'right',
        onClick: (e, legendItem) => {
          const index = legendItem.index;
          const meta = e.chart.getDatasetMeta(0);
          const currentHiddenIndices = [...hiddenIndices];

          meta.data[index].hidden = !meta.data[index].hidden;

          if (meta.data[index].hidden) {
            currentHiddenIndices.push(index);
          } else {
            const hiddenIndex = currentHiddenIndices.indexOf(index);
            if (hiddenIndex > -1) {
              currentHiddenIndices.splice(hiddenIndex, 1);
            }
          }

          setHiddenIndices(currentHiddenIndices);
          e.chart.update();
        },
        labels: {
          boxWidth: 12,
          generateLabels: (chart) => {
            const labels = chart.data.labels;
            const datasets = chart.data.datasets[0].data;
            return labels.map((label, i) => ({
              text: `${label} (${datasets[i]})`,
              fillStyle: chart.data.datasets[0].backgroundColor[i],
              hidden: chart.getDatasetMeta(0).data[i].hidden,
              fontColor: chart.getDatasetMeta(0).data[i].hidden ? 'gray' : 'black',
              textDecoration: chart.getDatasetMeta(0).data[i].hidden ? 'line-through' : 'none',
              index: i,
            }));
          },
        },
      },
      datalabels: {
        display: false,
        color: '#fff',
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
  };

  const textCenter = {
    id: 'textCenter',
    beforeDatasetDraw(chart, args, pluginOptions) {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();
      const total = chart.data.datasets[0].data.reduce((acc, value) => acc + value, 0);
      ctx.font = 'bold 25px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = (width / 2);
      const centerY = (height / 2);
    const textHeight = 25; 
    const lineHeight = textHeight * 1.2; 
      ctx.fillText(total, centerX, centerY - lineHeight / 2);
      ctx.fillText('Total', centerX, centerY + lineHeight / 2);
      ctx.restore();
    },
  };

  return (
    <div className="relative w-full h-auto max-w-md mx-auto">
      <Doughnut data={data} options={options} plugins={[textCenter]} />
    </div>
  );
}

export default DonutChart;
