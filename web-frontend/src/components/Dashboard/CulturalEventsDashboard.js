import React,{useState} from 'react'
import '../css/dashboard.css'
import Navbar from '../Navigation/Nav'
import EventWrapper from '../Events/eventWrapper'
import AdminNav from '../Navigation/AdminNav';

function CulturalEventsDashboard() {
	const user_type = localStorage.getItem("account_type");
  return (
		<div className="DashboardContainer">
			{user_type==="CADMIN" ? <AdminNav/>:<Navbar/>}
			<EventWrapper />
		</div>
	);
}

export default CulturalEventsDashboard
