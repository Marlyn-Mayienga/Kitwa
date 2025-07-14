
from django.urls import path
from core.models import EventActivity

from core.views import artifacts, auth, events, payment, content

urlpatterns = [
    # Core Auth API 
    path('login/', auth.LoginAPI.as_view()),
    path('client/', auth.CreateClientAPI.as_view()),
    path('admin/artists/', auth.CreateArtistAPI.as_view()),
    path('artist/', auth.ArtistAPI.as_view()),
    path('admin/tour-company/', auth.CreateTourCompanyAPI.as_view()),
    path('refresh/', auth.RefreshProfile.as_view()),
    # For the admin to activate/desactivate an account
    path('admin/activate/', auth.ActivateAccountAPI.as_view()),
    path('tour-company/', auth.TourCompanyAPI.as_view()),
    path('admin/organization/', auth.CreateOrganizationAPI.as_view()),
    path('organizer/', auth.OrganizationAPI.as_view()),
    path('cvault-admin/', auth.CreateAdminAPI.as_view()),
    path('activate/', auth.ActivateAccountAPI.as_view()),
    path('client/confirm/', auth.ConfirmClientAccountAPI.as_view()),
    path('client/confirm/<str:email>', auth.ConfirmClientAccountAPI.as_view()),
    
    
    # Google OAuth
    path('client/google/', auth.CreateClientGoogleAPI.as_view()),
    
        
    # Artifacts
    path('artifact/', artifacts.ArtifactAPI.as_view()),
    path('sales/', artifacts.SoldArtifactsAPI.as_view()),
    
    # Events
    path('event/', events.CreateEvent.as_view()),
    path('activities/', events.EventActivityAPI.as_view()),
    path('booking/', events.SaveTransaction.as_view()),
    path('reservations/', events.GetReservations.as_view()),
    
    # Content
    path('content/', content.CreateContent.as_view()),
    # Payment
    path('pay/', payment.StripePaymentAPI.as_view()),
    path('webhook/', payment.StripeCallBack.as_view()),
    path('buy-artifact/', payment.StripPayArtifact.as_view())
    
]
