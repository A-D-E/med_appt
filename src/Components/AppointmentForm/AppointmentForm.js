import React, { useState, useEffect } from 'react';
import '../SignUp/SignUp.css'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const slots = generateTimeSlots('09:00', '17:00', 60);
        setTimeSlots(slots);
    }, []);

    const handleTimeSlotChange = (e) => {
        setTimeSlot(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        // Allow only digits and limit length to 10
        if (value === '' || (value.match(/^\d+$/) && value.length <= 10)) {
            setPhoneNumber(value);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        // Basic validation checks
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!phoneNumber.trim() || phoneNumber.length < 10) newErrors.phoneNumber = 'Phone number must be 10 digits';
        if (!appointmentDate.trim()) newErrors.appointmentDate = 'Appointment date is required';
        if (!timeSlot.trim()) newErrors.timeSlot = 'Time slot is required';

        setErrors(newErrors);
        // Form is valid if there are no properties in the errors object
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Prevent submission if validation fails

        onSubmit({
            name,
            phoneNumber,
            appointmentDate,
            timeSlot,
        });

        sessionStorage.setItem('doctorData', JSON.stringify({name,
            phoneNumber,
            appointmentDate,
            timeSlot,}))
        
        // Reset the form fields and errors
        setName('');
        setPhoneNumber('');
        setAppointmentDate('');
        setTimeSlot('');
        setErrors({});
    };

    const isFormValid = () => {
        // Check for absence of errors and presence of all required field values
        return (
            Object.keys(errors).length === 0 &&
            name.trim() &&
            phoneNumber.trim() &&
            appointmentDate.trim() &&
            timeSlot.trim()
        );
    };

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                />
                {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input
                    type="date"
                    id="appointmentDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                />
                {errors.appointmentDate && <div className="error">{errors.appointmentDate}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="timeSlot">Time Slot:</label>
                <select
                    id="timeSlot"
                    value={timeSlot}
                    onChange={handleTimeSlotChange}
                    required
                >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
                {errors.timeSlot && <div className="error">{errors.timeSlot}</div>}
            </div>
            <button type="submit" disabled={!isFormValid()} className={`btn mb-2 mr-1 waves-effect waves-light ${(!isFormValid()) ? 'btn-disabled' : 'btn-primary'}`} >Book Now</button>
        </form>
    );
};


function generateTimeSlots(startTime, endTime, durationInMinutes) {
    const slots = [];
    let start = convertTimeToMinutes(startTime);
    const end = convertTimeToMinutes(endTime);

    while (start + durationInMinutes <= end) {
        const endSlot = start + durationInMinutes;
        slots.push(`${convertMinutesToTime(start)}-${convertMinutesToTime(endSlot)}`);
        start += durationInMinutes;
    }

    return slots;
}

function convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(parseFloat);
    return hours * 60 + minutes;
}

function convertMinutesToTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export default AppointmentForm;
