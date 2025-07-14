import React,{useEffect, useState} from 'react'
import "../css/dashboard.css";
import AdminNav from "../Navigation/AdminNav";
import swal from 'sweetalert';
import EventWrapper from '../Events/eventWrapper';

function CreateEvent() {
 return (
		<div className="DashboardContainer">
			{/* nav component */}
			<AdminNav />
			<EventWrapper />
		</div>
 );
}

export default CreateEvent
