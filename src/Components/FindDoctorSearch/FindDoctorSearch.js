import React, { useState } from 'react';
import './FindDoctorSearch.css';
// Stelle sicher, dass Bootstrap in deinem Projekt eingebunden ist.
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/search/doctors?speciality=${speciality}`);
        window.location.reload();
    };

    return (
        <div className='container'>
    <h1>Find a doctor and Consult instantly</h1>
    <div className='hero-image'>
        <i style={{ color: '#2190FF', fontSize: '10rem' }} className="fa fa-user-md"></i>
    </div>
    <div className="search-container">
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Search doctors, clinics, hospitals etc."
                value={searchDoctor}
                onChange={(e) => setSearchDoctor(e.target.value)}
                onFocus={() => setDoctorResultHidden(false)}
                onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
            />
            <div className="input-group-append">
                <span className="input-group-text"><i className="fa fa-search"></i></span>
            </div>
        </div>
        {!doctorResultHidden && (
            <div className="search-results">
                {specialities.filter(speciality => speciality.toLowerCase().includes(searchDoctor.toLowerCase())).map((speciality, index) => (
                    <div
                        key={index}
                        className="search-result-item"
                        onClick={() => handleDoctorSelect(speciality)}
                    >
                        <div><span className='search-icon-in-a-box'><i className="fa fa-search" aria-hidden="true"></i></span> {speciality}</div> <span>SPECIALITY</span>
                    </div>
                ))}
            </div>
        )}
    </div>
</div>

    );
};

export default FindDoctorSearch;
