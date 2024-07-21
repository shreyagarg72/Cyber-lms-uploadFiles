// import React from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const CpfUser = ({ universityData }) => {
//   // Prepare data for the chart
//   const labels = universityData.map((university) => university.universityName);
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Number of Users",
//         data: universityData.map((university) => university.userCount),
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Users by University with CyberPeace Foundation",
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="chart-section">
//       <div className="chart-container">
//         <h3>Users by University with CyberPeace Foundation</h3>
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default CpfUser;
// import React from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const CpfUser = ({ universityData }) => {
//   // Prepare data for the chart
//   const labels = universityData.map((university) => university.universityName);
//   const userCounts = universityData.map((university) => university.userCount);

//   // Generate a color for each bar
//   const generateColors = (count) => {
//     const colors = [];
//     for (let i = 0; i < count; i++) {
//       const r = Math.floor(Math.random() * 255);
//       const g = Math.floor(Math.random() * 255);
//       const b = Math.floor(Math.random() * 255);
//       colors.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
//     }
//     return colors;
//   };

//   const backgroundColors = generateColors(userCounts.length);
//   const borderColors = backgroundColors.map(color => color.replace('0.2', '1'));

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Number of Users",
//         data: userCounts,
//         backgroundColor: backgroundColors,
//         borderColor: borderColors,
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Users by University with CyberPeace Foundation",
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="chart-section">
//       <div className="chart-container">
//         <h3>Users by University with CyberPeace Foundation</h3>
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default CpfUser;
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CpfUser = ({ universityData }) => {
  // Prepare data for the chart
  const labels = universityData.map((university) => university.universityName);
  const userCounts = universityData.map((university) => university.userCount);

  // Define bold colors
  const boldColors = [
    "rgba(255, 99, 132, 0.8)", // Red
    "rgba(54, 162, 235, 0.8)", // Blue
    "rgba(255, 206, 86, 0.8)", // Yellow
    "rgba(75, 192, 192, 0.8)", // Green
    "rgba(153, 102, 255, 0.8)", // Purple
    "rgba(255, 159, 64, 0.8)"  // Orange
  ];

  // Create arrays for background and border colors
  const backgroundColors = [];
  const borderColors = [];

  for (let i = 0; i < userCounts.length; i++) {
    const color = boldColors[i % boldColors.length];
    backgroundColors.push(color);
    borderColors.push(color.replace('0.8', '1'));
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Users",
        data: userCounts,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Users by University with CyberPeace Foundation",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-section">
      <div className="chart-container">
        <h3>Users by University with CyberPeace Foundation</h3>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CpfUser;
