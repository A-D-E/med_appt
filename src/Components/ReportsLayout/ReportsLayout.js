import React, { useState } from "react";
import "./ReportsLayout.css";
const ReportsLayout = () => {
 
  const reportsData = [
    { id: 1, doctorName: "Dr. Smith", doctorSpeciality: "Cardiologist" },
    { id: 2, doctorName: "Dr. Johnson", doctorSpeciality: "Dermatologist" },
    { id: 3, doctorName: "Dr. Elizabeth Clark", doctorSpeciality: "Gynecologist/Obstetrician"}
    
    
  ];

  const handleViewReport = (reportId) => {
    
  };

  const handleDownloadReport = (reportId) => {
    
  };

  return (
    <div className="reports">
    <div className="reports-card">
      <h2>Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.doctorName}</td>
              <td>{report.doctorSpeciality}</td>
              <td>
                <button onClick={() => handleViewReport(report.id)}>
                  View Report
                </button>
              </td>
              <td>
                <button onClick={() => handleDownloadReport(report.id)}>
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ReportsLayout;