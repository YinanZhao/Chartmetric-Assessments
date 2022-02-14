import formatResponse from './functions/formatResponse'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

const response = [ // seed date for testing
  {
    id: 1293487,
    name: "KCRW",  // radio station callsign
    tracks: [{ timestp: "2021-04-08", trackName: "Peaches" }]
  },
  {
    id: 12923,
    name: "KQED",
    tracks: [
      { timestp: "2021-04-09", trackName: "Savage" },
      { timestp: "2021-04-09", trackName: "Savage (feat. Beyonce)" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" }
    ]
  },
  {
    id: 4,
    name: "WNYC",
    tracks: [
      { timestp: "2021-04-09", trackName: "Captain Hook" },
      { timestp: "2021-04-08", trackName: "Captain Hook" },
      { timestp: "2021-04-07", trackName: "Captain Hook" }
    ]
  }
];

function App() {
  const data = formatResponse(response);
  const tooltips = data.reduce(function(map, obj) { // for hover function
    map[obj.x] = obj.tooltip;
    return map;
  }, {});

  const labels = data.map(date => date.x.toString()) //labels for dates

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Data for each day",
        data: data.map(date => date.y),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Playcounts for each day',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return tooltips[context.label];
          }
        }
      }
    },
  };

  return (
    <div className="App">
        <Bar
          options={options}
          data={chartData}
        />
    </div>
  );
}

export default App;
