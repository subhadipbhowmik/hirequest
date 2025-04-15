import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Pie, Line, PolarArea, Radar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

const PlacementGraph = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyb_orPNiyC9AAFLAiEQLonGblwnjg1kHGJXdHycmhte2NoZ5LNz5BcP4_lTHd1ERV_/exec"
        );
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load placement data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get chart colors
  const getChartColors = (count) => {
    const colors = [
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 99, 132, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
      "rgba(199, 199, 199, 0.6)",
      "rgba(83, 102, 255, 0.6)",
      "rgba(40, 199, 111, 0.6)",
      "rgba(255, 99, 71, 0.6)",
    ];

    const borderColors = colors.map((color) => color.replace("0.6", "1"));

    // If we need more colors than available, repeat the colors
    const extendedColors = [];
    const extendedBorders = [];

    for (let i = 0; i < count; i++) {
      extendedColors.push(colors[i % colors.length]);
      extendedBorders.push(borderColors[i % borderColors.length]);
    }

    return { backgroundColor: extendedColors, borderColor: extendedBorders };
  };

  // 1. Placement Status Distribution Chart (Doughnut)
  const getPlacementStatusChart = () => {
    const statusCounts = students.reduce((acc, student) => {
      const status = student.Placement_Status || "Unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);
    const { backgroundColor, borderColor } = getChartColors(labels.length);

    return {
      labels,
      datasets: [
        {
          label: "Number of Students",
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  };

  // 2. Company-wise Placement Distribution (Pie)
  const getCompanyDistributionChart = () => {
    const companyData = students.reduce((acc, student) => {
      if (student.Company_Name && student.Placement_Status === "PLACED") {
        acc[student.Company_Name] = (acc[student.Company_Name] || 0) + 1;
      }
      return acc;
    }, {});

    // Sort companies by number of placements (descending)
    const sortedCompanies = Object.entries(companyData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Take top 10

    const labels = sortedCompanies.map((item) => item[0]);
    const data = sortedCompanies.map((item) => item[1]);
    const { backgroundColor, borderColor } = getChartColors(labels.length);

    return {
      labels,
      datasets: [
        {
          label: "Number of Students",
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  };

  // 3. Batch-wise Placement Rate (Bar)
  const getBatchPlacementRateChart = () => {
    const batchData = students.reduce((acc, student) => {
      const batch = student.Batch?.toString() || "Unknown";
      if (!acc[batch]) {
        acc[batch] = { total: 0, placed: 0 };
      }
      acc[batch].total += 1;
      if (student.Placement_Status === "PLACED") {
        acc[batch].placed += 1;
      }
      return acc;
    }, {});

    const labels = Object.keys(batchData).sort();
    const totalData = labels.map((batch) => batchData[batch].total);
    const placedData = labels.map((batch) => batchData[batch].placed);
    const percentData = labels.map(
      (batch) => (batchData[batch].placed / batchData[batch].total) * 100
    );

    return {
      labels,
      datasets: [
        {
          label: "Placement Rate (%)",
          data: percentData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          yAxisID: "y-percentage",
        },
        {
          label: "Total Students",
          data: totalData,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          yAxisID: "y-count",
        },
        {
          label: "Placed Students",
          data: placedData,
          backgroundColor: "rgba(255, 206, 86, 0.6)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
          yAxisID: "y-count",
        },
      ],
    };
  };

  // 4. Role Distribution (Horizontal Bar)
  const getRoleDistributionChart = () => {
    const roleData = students.reduce((acc, student) => {
      if (student.Role && student.Placement_Status === "PLACED") {
        acc[student.Role] = (acc[student.Role] || 0) + 1;
      }
      return acc;
    }, {});

    // Sort roles by count
    const sortedRoles = Object.entries(roleData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Top 10 roles

    const labels = sortedRoles.map((item) => item[0]);
    const data = sortedRoles.map((item) => item[1]);
    const { backgroundColor, borderColor } = getChartColors(labels.length);

    return {
      labels,
      datasets: [
        {
          axis: "y",
          label: "Number of Students",
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  };

  // 5. Placement Type Distribution (PolarArea)
  const getPlacementTypeChart = () => {
    const typeData = students.reduce((acc, student) => {
      if (student.Type_Of_Placement && student.Placement_Status === "PLACED") {
        acc[student.Type_Of_Placement] =
          (acc[student.Type_Of_Placement] || 0) + 1;
      }
      return acc;
    }, {});

    const labels = Object.keys(typeData);
    const data = Object.values(typeData);
    const { backgroundColor, borderColor } = getChartColors(labels.length);

    return {
      labels,
      datasets: [
        {
          label: "Number of Students",
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  };

  // 6. Batch Trends Over Years (Line)
  const getBatchTrendsChart = () => {
    const batchYears = [...new Set(students.map((s) => s.Batch))].sort();

    const placedByBatch = batchYears.map((year) => {
      return students.filter(
        (s) => s.Batch === year && s.Placement_Status === "PLACED"
      ).length;
    });

    const unplacedByBatch = batchYears.map((year) => {
      return students.filter(
        (s) => s.Batch === year && s.Placement_Status !== "PLACED"
      ).length;
    });

    return {
      labels: batchYears,
      datasets: [
        {
          label: "Placed Students",
          data: placedByBatch,
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
        {
          label: "Unplaced Students",
          data: unplacedByBatch,
          fill: false,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.1,
        },
      ],
    };
  };

  // 7. Top Companies Radar Chart
  const getTopCompaniesRadarChart = () => {
    const companyRoleMatrix = {};

    // Create matrix of companies and roles
    students.forEach((student) => {
      if (
        student.Company_Name &&
        student.Role &&
        student.Placement_Status === "PLACED"
      ) {
        if (!companyRoleMatrix[student.Company_Name]) {
          companyRoleMatrix[student.Company_Name] = {};
        }
        companyRoleMatrix[student.Company_Name][student.Role] =
          (companyRoleMatrix[student.Company_Name][student.Role] || 0) + 1;
      }
    });

    // Get top companies by total placements
    const topCompanies = Object.entries(companyRoleMatrix)
      .map(([company, roles]) => ({
        company,
        total: Object.values(roles).reduce((sum, count) => sum + count, 0),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
      .map((item) => item.company);

    // Get all unique roles across these companies
    const allRoles = new Set();
    topCompanies.forEach((company) => {
      Object.keys(companyRoleMatrix[company]).forEach((role) =>
        allRoles.add(role)
      );
    });
    const rolesList = Array.from(allRoles);

    // Create datasets
    const datasets = topCompanies.map((company, index) => {
      const { backgroundColor, borderColor } = getChartColors(
        topCompanies.length
      );
      return {
        label: company,
        data: rolesList.map((role) => companyRoleMatrix[company][role] || 0),
        backgroundColor: backgroundColor[index].replace("0.6", "0.2"),
        borderColor: borderColor[index],
        borderWidth: 2,
        pointBackgroundColor: borderColor[index],
        pointRadius: 4,
      };
    });

    return {
      labels: rolesList,
      datasets,
    };
  };

  // 8. Monthly Placement Trend (Assuming SL_NO represents chronological order)
  const getMonthlyTrendChart = () => {
    // Generate mock months based on index (since we don't have actual dates)
    // In a real application, you would use actual dates from your API
    const currentYear = new Date().getFullYear();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const placedStudents = students.filter(
      (s) => s.Placement_Status === "PLACED"
    );

    // Create mock monthly data (in a real app, you'd group by actual months)
    const mockMonthlyData = [];
    const chunkSize = Math.ceil(placedStudents.length / 12);

    for (let i = 0; i < 12; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, placedStudents.length);
      const count = end - start;
      mockMonthlyData.push(count);
    }

    return {
      labels: months,
      datasets: [
        {
          label: "Placements",
          data: mockMonthlyData,
          fill: true,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.4,
        },
      ],
    };
  };

  // 9. Placement Rate by Role
  const getPlacementRateByRoleChart = () => {
    const roleStats = {};

    students.forEach((student) => {
      if (student.Role) {
        if (!roleStats[student.Role]) {
          roleStats[student.Role] = { total: 0, placed: 0 };
        }
        roleStats[student.Role].total += 1;
        if (student.Placement_Status === "PLACED") {
          roleStats[student.Role].placed += 1;
        }
      }
    });

    // Calculate placement rate and filter roles with at least 2 students
    const filteredRoles = Object.entries(roleStats)
      .filter(([_, stats]) => stats.total >= 2)
      .map(([role, stats]) => ({
        role,
        rate: (stats.placed / stats.total) * 100,
        total: stats.total,
      }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 10); // Top 10 roles by placement rate

    const labels = filteredRoles.map((item) => item.role);
    const rateData = filteredRoles.map((item) => item.rate);
    const countData = filteredRoles.map((item) => item.total);

    return {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Placement Rate (%)",
          data: rateData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          yAxisID: "y-percentage",
        },
        {
          type: "line",
          label: "Total Students",
          data: countData,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointRadius: 4,
          yAxisID: "y-count",
        },
      ],
    };
  };

  // Chart options
  const batchRateOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Batch-wise Placement Statistics",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      "y-percentage": {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Percentage (%)",
        },
        min: 0,
        max: 100,
      },
      "y-count": {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Count",
        },
        min: 0,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Company-wise Placement Distribution",
        font: {
          size: 16,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Placement Status Distribution",
        font: {
          size: 16,
        },
      },
    },
  };

  const horizontalBarOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Role Distribution",
        font: {
          size: 16,
        },
      },
    },
  };

  const polarAreaOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Placement Type Distribution",
        font: {
          size: 16,
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Batch Trends Over Years",
        font: {
          size: 16,
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Companies by Role Distribution",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
      },
    },
  };

  const monthlyTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Placement Trend",
        font: {
          size: 16,
        },
      },
    },
  };

  const roleRateOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Placement Rate by Role",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      "y-percentage": {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Percentage (%)",
        },
        min: 0,
        max: 100,
      },
      "y-count": {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Count",
        },
        min: 0,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Loading placement data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-xl font-semibold">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Placement Statistics Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chart 1: Placement Status Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-64">
              {students.length > 0 && (
                <Doughnut
                  data={getPlacementStatusChart()}
                  options={doughnutOptions}
                />
              )}
            </div>
          </div>

          {/* Chart 2: Company Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-64">
              {students.length > 0 && (
                <Pie
                  data={getCompanyDistributionChart()}
                  options={pieOptions}
                />
              )}
            </div>
          </div>

          {/* Chart 3: Placement Type */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-64">
              {students.length > 0 && (
                <PolarArea
                  data={getPlacementTypeChart()}
                  options={polarAreaOptions}
                />
              )}
            </div>
          </div>

          {/* Chart 4: Batch-wise Placement Rate */}
          <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
            <div className="h-64">
              {students.length > 0 && (
                <Bar
                  data={getBatchPlacementRateChart()}
                  options={batchRateOptions}
                />
              )}
            </div>
          </div>

          {/* Chart 5: Role Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-64">
              {students.length > 0 && (
                <Bar
                  data={getRoleDistributionChart()}
                  options={horizontalBarOptions}
                />
              )}
            </div>
          </div>

          {/* Chart 7: Top Companies Radar */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-64">
              {students.length > 0 && (
                <Radar
                  data={getTopCompaniesRadarChart()}
                  options={radarOptions}
                />
              )}
            </div>
          </div>

          {/* Chart 8: Monthly Trend */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-64">
              {students.length > 0 && (
                <Line
                  data={getMonthlyTrendChart()}
                  options={monthlyTrendOptions}
                />
              )}
            </div>
          </div>

          {/* Chart 9: Placement Rate by Role */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-64">
              {students.length > 0 && (
                <Bar
                  data={getPlacementRateByRoleChart()}
                  options={roleRateOptions}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementGraph;
