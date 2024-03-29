import React, { useState } from "react";
import "./ReportsLayout.css";
const ReportsLayout = () => {
 
  const reportsData = [
    { id: 1, doctorName: "Dr. Smith", doctorSpeciality: "Cardiologist", report: "CardiologistReport-DrSmith" },
    { id: 2, doctorName: "Dr. Johnson", doctorSpeciality: "Dermatologist", report: "DermatologistReport-DrJohnson" },
    { id: 3, doctorName: "Dr. Elizabeth Clark", doctorSpeciality: "Gynecologist/Obstetrician", report: "GynecologistObstetricianReport-DrElizabethClark"}
    
    
  ];

  const handleViewReport = (reportId) => {
    const url = reportsData.find(el => el.id === reportId).report
    window.open(`/${url}.pdf`, '_blank');
  };

  const handleDownloadReport = async (reportId) => {
    const file = reportsData.find(el => el.id === reportId).report
    try {
        const response = await fetch(`/${file}.pdf`);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${file}.pdf`); 
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } catch (error) {
        console.error('Error:', error);
      }
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