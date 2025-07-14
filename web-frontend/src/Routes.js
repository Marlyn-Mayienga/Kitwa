import React from 'react'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import ResetPassword from './components/Auth/ResetPassword'

// Admin routes
import CreateEvent from './components/Admin/CreateEvent'
import EventList from './components/Events/EventList'
import CreateEventForm from './components/Admin/CreateEventForm'
import CreateEventActivityForm from './components/Admin/CreateEventActivityForm'
import TourCompanyDashboard from './components/Admin/TourCompanyDashboard'
import TourCompanyRegisterForm from './components/Admin/TourCompanyRegisterForm'
import ArtistRegisterForm from './components/Admin/ArtistRegisterForm'
import ArtistDashboard from './components/Admin/ArtistDashboard'
import ListEvents from './components/Admin/ListEvents'
import Organizerlist from './components/Admin/Organizerlist'
import DeleteEvent from './components/Dashboard/DeleteEvent'
import UpdateEvent from './components/Dashboard/UpdateEvent'


//  clients routes and Artists
import CulturalEventsDashboard from './components/Dashboard/CulturalEventsDashboard'
import Placetovisit from './components/Dashboard/Placetovisit'
import EventDetail from './components/Dashboard/EventView'
import Visit from './components/Dashboard/Visit'
import VisitDetails from './components/Dashboard/VisitDetails'
import VisitDocumentationForm from './components/Dashboard/VisitDocumentationForm'
import ArtfactView from './components/Dashboard/ArtfactView'
import ArtfactDetail from './components/Dashboard/ArtfactDetail'
import ArtfactLists from './components/Dashboard/ArtfactLists'
import ArtistOrder from './components/Dashboard/ArtistOrder'
import UpdateArtifact from './components/Dashboard/UpdateArtifact'
import DeleteArtifact from './components/Dashboard/DeleteArtifact'
import ArtfactPurchase from './components/Dashboard/ArtfactPurchase'
import BongaPoints from './components/Dashboard/BongaPoints'
import BongaPointDetail from './components/Dashboard/BongaPointDetail'
import Settings from './components/Dashboard/Settings'
import Profile from './components/Dashboard/Profile'
import PublicProfile from './components/Dashboard/PublicProfile'
import { Routes, Route } from "react-router-dom";
import PlaceCard from './components/PlaceCard';
import BuyArtifact from './components/Dashboard/BuyArtifact'
import ClientOrderLists from './components/Dashboard/ClientOrderLists'
import ClientArtifactView from './components/Dashboard/ClientArtifactView'

// payment
import WrappedPaymentForm from './components/Dashboard/WrappedPaymentForm'



function RoutesApp() {
    return (
			<Routes>
				<Route path="/" exact element={<CulturalEventsDashboard />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/resetpassword" element={<ResetPassword />} />
				{/* Admin routes */}
				<Route path="/createevent" element={<CreateEvent />} />
				<Route path="/eventlist" element={<EventList/>} />
				<Route path="/createeventform" element={<CreateEventForm />} />
				<Route path="/createeventactivityform"element={<CreateEventActivityForm />}
				/>
				<Route
					path="/tourcompanydashboard"
					element={<TourCompanyDashboard />}
				/>
				<Route
					path="/tourcompanyregisterform"
					element={<TourCompanyRegisterForm />}
				/>
				<Route path="/artistregisterform" element={<ArtistRegisterForm />} />
				<Route path="/artistdashboard" element={<ArtistDashboard />} />
				<Route path="/listevents" element={<ListEvents />} />
			<Route path="/desactivatedlists" element={<Organizerlist />} />
			<Route path="/delete-event" element={<DeleteEvent />} />
			<Route path="/update-event" element={<UpdateEvent/>} />

				{/* Client routes */}
				<Route path="/eventdetail" element={<EventDetail />} />
				<Route path="/placetovisit" element={<Placetovisit />} />
				<Route path="/visits" element={<Visit />} />
				<Route path="/visitdetails" element={<VisitDetails />} />
				<Route path="/visitdocumentation" element={<VisitDocumentationForm />} />
				<Route path="/artfactview" element={<ArtfactView />} />
				<Route path="/artistOrders" element={<ArtistOrder/>}/>

			
				<Route path="/orderlists" element={<ClientOrderLists/>} />

				<Route path="/artfactdetail" element={<ArtfactDetail />} />
				<Route path="/artfactlist" element={<ArtfactLists/>} />
				<Route path="/updateartfact" element={<UpdateArtifact />} />
				<Route path="/deleteartfact" element={<DeleteArtifact />} />
				<Route path="/artfactpurchase" element={<ArtfactPurchase />} />
				<Route path="/bongapoints" element={<BongaPoints />} />
				<Route path="/bongapointdetail" element={<BongaPointDetail />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/publicprofile" element={<PublicProfile />} />
				<Route path="/buyArtifact" element={<BuyArtifact />} />
			<Route path="/test" element={<PlaceCard />} />
			<Route path="/wrapper" element={< WrappedPaymentForm />} />
			
			<Route path="/client-artifact-view" element={<ClientArtifactView />} />
			</Routes>
		);
}

export default RoutesApp;
