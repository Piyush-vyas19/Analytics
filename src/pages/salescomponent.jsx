import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalyticsPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startMonth, setStartMonth] = useState("September");
  const [endMonth, setEndMonth] = useState("December");

  fetch(`http://localhost:5173/sales/total-sales?startMonth=${startMonth}&endMonth=${endMonth}`)
  .then((response) => {
    if (!response.ok) {
      // If the server response is not OK (e.g., 404 or 500), log the error
      console.error('Error:', response.statusText);
      return response.text();  // Read the body as text to inspect the raw response
    }
    return response.json();  // Expecting JSON if the response is OK
  })
  .then((data) => {
    setData(data);
    setFilteredData(data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

  // Re-run when startMonth or endMonth changes

  useEffect(() => {
    const startIndex = data.findIndex(item => item.month === startMonth);
    const endIndex = data.findIndex(item => item.month === endMonth);
    if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
      setFilteredData(data.slice(startIndex, endIndex + 1));  // Filter based on selected months
    }
  }, [startMonth, endMonth, data]);  // Trigger when data or months change

  const months = filteredData.map(item => item.month);
  const sales = filteredData.map(item => item.total_sales);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      }
    }
  };

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Sales",
        data: sales,
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: months,
    datasets: [
      {
        label: "Sales Share",
        data: sales,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 10,
      },
    ],
  };

  const barChartData = {
    labels: months,
    datasets: [
      {
        label: "Total Sales",
        data: sales,
        backgroundColor: "#FF6384",
        borderRadius: 5,
      },
    ],
  };

  const stackedBarData = {
    labels: months,
    datasets: [
      {
        label: "Q1 Sales",
        data: sales.map(val => val * 0.3),
        backgroundColor: "#36A2EB",
        borderRadius: 5,
      },
      {
        label: "Q2 Sales",
        data: sales.map(val => val * 0.4),
        backgroundColor: "#FFCE56",
        borderRadius: 5,
      },
      {
        label: "Q3 Sales",
        data: sales.map(val => val * 0.3),
        backgroundColor: "#4BC0C0",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          📈 Sales Analytics Dashboard
        </h1>

        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              📅 
              <div className="flex gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600 mb-1">Start Month</span>
                  <select
                    value={startMonth}
                    onChange={(e) => setStartMonth(e.target.value)}
                    className="p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    {data.map(item => (
                      <option key={item.month} value={item.month}>{item.month}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600 mb-1">End Month</span>
                  <select
                    value={endMonth}
                    onChange={(e) => setEndMonth(e.target.value)}
                    className="p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    {data.map(item => (
                      <option key={item.month} value={item.month}>{item.month}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-2">
          {[ 
            { 
              title: "Line Chart: Monthly Sales", 
              chart: <Line data={lineChartData} options={chartOptions} />,
              icon: "📈"
            },
            { 
              title: "Pie Chart: Sales Distribution", 
              chart: <Pie data={pieChartData} options={chartOptions} />,
              icon: "🥧"
            },
            { 
              title: "Bar Chart: Total Sales", 
              chart: <Bar data={barChartData} options={chartOptions} />,
              icon: "📊"
            },
            { 
              title: "Stacked Bar Chart: Sales Breakdown", 
              chart: <Bar data={stackedBarData} options={{...chartOptions, scales: { x: { stacked: true }, y: { stacked: true } }}} />,
              icon: "📉"
            }
          ].map(({ title, chart, icon }) => (
            <div key={title} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 border-b flex items-center gap-3">
                <span>{icon}</span>
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              </div>
              <div className="p-4 h-96">
                {chart}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
