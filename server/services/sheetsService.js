const axios = require("axios");

const fetchStatusFromSheet = async (studentData) => {
  try {
    const response = await axios.post(process.env.GOOGLE_SCRIPT_URL, {
      uid: studentData.uid,
      email: studentData.email,
      phone: studentData.phone,
    });

    // Transform to { companyName: status } format
    return response.data.data.reduce((acc, curr) => {
      acc[curr.company] = curr.status;
      return acc;
    }, {});
  } catch (error) {
    console.error("Sheet service error:", error.message);
    return {}; // Return empty object on failure
  }
};

const getStudentStatus = async (studentData) => {
  try {
    const response = await axios.post(process.env.GOOGLE_SCRIPT_URL, {
      uid: studentData.uid,
      email: studentData.email,
      phone: studentData.phone,
    });

    return response.data.data.reduce((statusMap, entry) => {
      statusMap[entry.company] = entry.status;
      return statusMap;
    }, {});
  } catch (error) {
    console.error("Google Sheets API Error:", error);
    return {}; // Return empty if API fails
  }
};

module.exports = { fetchStatusFromSheet, getStudentStatus };
