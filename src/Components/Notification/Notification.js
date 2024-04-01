import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./Notification.css"

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('email');
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.doctorName));

        if (storedUser) {
            setIsLoggedIn(true);
            
        }

        if (storedDoctorData) {
            setDoctorData(storedDoctorData);
        }

        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
        }

        console.log(appointmentData, isLoggedIn);
    }, []);
    return (
        <div>
            <Navbar ></Navbar>
            {children}
            {isLoggedIn && appointmentData && (
                <>
                    <div className="appointment-card">
                        <div className="appointment-card__content">
                            <h3 className="appointment-card__title">Appointment Details</h3>
                            <p className="appointment-card__message">
                                <strong>Doctor:</strong> {doctorData.doctorName}
                            </p>
                            <p className="appointment-card__message">
                                <strong>Speciality:</strong> {doctorData.doctorSpeciality}
                            </p>
                            {appointmentData.map(appointment => (
                                <div key={appointment.id}>
                                    <p className="appointment-card__message">
                                        <strong>Name:</strong> {appointment.name}
                                    </p>
                                    <p className="appointment-card__message">
                                        <strong>Phone Number:</strong> {appointment.phoneNumber}
                                    </p>
                                    <p className="appointment-card__message">
                                        <strong>Date of Appointment:</strong> {appointment.appointmentDate}
                                    </p>
                                    <p className="appointment-card__message">
                                        <strong>Time Slot:</strong> {appointment.timeSlot}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Notification;