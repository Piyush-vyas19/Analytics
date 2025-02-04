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

const AnalyticsPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startMonth, setStartMonth] = useState("September");
  const [endMonth, setEndMonth] = useState("December");
  const [data1,setData1] = useState([]);

  
  const monthsList = [
    "January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", 
    "November", "December"
  ];
   
  useEffect(() => {
    const url = `http://localhost:3000/sales/total-sales?startMonth=${startMonth}&endMonth=${endMonth}`;
    console.log("Requesting URL:", url);
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log("Fetched data:", data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [startMonth, endMonth]);
  useEffect(() => {
    const filtered = data.filter(
      (item) => monthsList.indexOf(item.month) >= monthsList.indexOf(startMonth) &&
                monthsList.indexOf(item.month) <= monthsList.indexOf(endMonth)
    );
    setFilteredData(filtered);
  }, [data, startMonth, endMonth]);


  
  const months = filteredData.map((item) => item.month);
  const sales = filteredData.map((item) => item.total_sales);
  

  useEffect(() => {
    const url = `http://localhost:3000/sales/categorysales?startMonth=${startMonth}&endMonth=${endMonth}`;
    console.log("Requesting URL:", url);
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setData1(data);
        console.log("Fetched data:", data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [startMonth, endMonth]);

  const [categorys, setCategorys] = useState([]);
  const [sales1, setSales1] = useState([]);


  useEffect(() => {
    const categories = data1.map((item) => item.category);
    const filteredData1 = data1.map((item) => item.total_sales);
    
      setCategorys(categories);
      setSales1(filteredData1);

  }, [data1, startMonth, endMonth]);



  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          color: '#475569'
        }
      },
      title: {
        display: true,
        font: {
          size: 18,
          family: 'Inter, sans-serif',
          weight: 'bold'
        },
        color: '#334155'
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
    labels: categorys,
    datasets: [
      {
        label: "Sales Share",
        data: sales1,
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
    <div className="bg-gray-50 min-h-screen p-8 w-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Sales Analytics Dashboard
        </h1>

        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600 mb-1">Start Month</span>
                  <select  value ={startMonth} onChange={(e) => setStartMonth(e.target.value)} 
                  className="p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all" >
                    {monthsList.map((month) => (
                          <option key={month} value={month}>
                                {month}
                               </option>
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
                    {monthsList.map((month) => (
                          <option key={month} value={month}>
                                {month}
                               </option>
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
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )
            },
            {
              title: "Pie Chart: Sales by Category of the product",
              chart: <Pie data={pieChartData} options={chartOptions} />,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                </svg>
              )
            },
            {
              title: "Bar Chart: Total Sales",
              chart: <Bar data={barChartData} options={chartOptions} />,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )
            },
            {
              title: "Stacked Bar Chart: Sales Breakdown",
              chart: <Bar data={stackedBarData} options={{...chartOptions, scales: { x: { stacked: true }, y: { stacked: true } }}} />,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )
            }
          ].map(({ title, chart, icon }) => (
            <div key={title} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 border-b flex items-center gap-3">
                {icon}
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
};

export default AnalyticsPage;