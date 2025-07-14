from datetime import datetime
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from core.decorator import admin_required, client_or_admin_required, client_required
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from core.models import Artifact, BookedEvent, Client, Event, EventActivity, EventFile, Organization, SystemAdmin, Ticket
from core.serializers import ArtifactShortDisplaySerializer, BookedEventSerializer, EventActivitySerializer, EventFullDataSerializer, EventSerilaizer
from django.db.models import Q
from core.utils import extract_coordinates_from_google_maps_url, upload_files
from core.validations import update_event, validate_create_event
import requests
from datetime import timedelta
from django.conf import settings

# from django.db import models
from django.db.models import F
GOOGLE_TOKEN = settings.GOOGLE_TOKEN


class CreateEvent(APIView):
    parser_classes = (MultiPartParser,)
    
    @method_decorator(admin_required)
    def delete(self, request, *args, **kwargs):
        try:
            id = request.GET.get('id', None)
            if id is None:
                return Response({"message":"The event id is required.", "status":400})
            event = Event.objects.filter(pk=id).first()
            if event is  None:
                return Response({"message":"Event not found.", "status":404})
            if event.active:
                event.active = False
                event.save()
                return Response({"message":"Event deleted", "status":200})
            else:
                event.active = True
                event.save()
                return Response({"message":"Event restored", "status":200})
            
        except Exception as e:
            print(e)
            return Response({"message":"Somthing went wrong", "status":500})  
    
    
    @method_decorator(admin_required) 
    def put(self, request, *args, **kwargs):
        try:
            
            id = request.data.get('id')
            event = Event.objects.filter(pk=id).first()
            if event is  None:
                return Response({"message":"Event not found.", "status":404})
            else:
                response = update_event(request, event)
                if response.get('status') !=200:
                    return Response({"message":response['message'], "status":response['status']})
            
                event.save()
                return Response({"message":"Event updated successfully", "status":200})
                
        except Exception as e:
            print(e)
            return Response({"message":"Somthing went wrong", "status":500})            
 
    # Only the admin can create an event (This may change in the future just create another decorator)
    @method_decorator(admin_required) 
    def post(self, request, *args, **kwargs):
        try:
            print("Hey there")
            validation = validate_create_event(request)
            
            if validation['status'] != 200:
                return Response({"message":validation['message'], "status":validation['status']})
            
            auth_user = request.user
            creator = SystemAdmin.objects.get(account=auth_user)
            name = request.data.get('name')
            date_time = request.data.get('dateTime')
            frequency = request.data.get('frequency')
            location = request.data.get('location')
            description = request.data.get('description')
            location_url  = request.data.get('locationUrl')
            files = request.FILES.getlist('file')
            organizer_id = request.data.get('organizer')
            
            organizer = Organization.objects.filter(pk=organizer_id).first()
            
            if organizer is None:
                return Response({"message":"Organizer account not found.", "status":404})
            
            event = Event.objects.create(
                                            creator = creator, 
                                            name = name, 
                                            description = description,
                                            date = date_time,
                                            event_address=location,
                                            event_address_link=location_url,
                                            frequency=frequency,
                                            organizer=organizer
                                        )
            
            file_paths = []
            
            response = upload_files(files)
            if response.get('status'):
                file_paths = file_paths + response['file_paths']  
            
            key = 0
            for url in file_paths:
                # print(url)
                key = key + 1
                EventFile.objects.create(event=event, name=f'{name}-{key}', file=url)
            
            all_events = Event.objects.all()
            serialized_data = EventSerilaizer(all_events, many=True).data
            
            return Response({"message":"Event created successfully", "status":200})
        
        except Exception as e:
            print(e)
            return Response({"message":"Somthing went wrong", "status":500})            
    
    @method_decorator(client_or_admin_required) 
    def get(self, request, *args, **kwargs):
        try:
            # return Response({"message":request.is_cadmin})
            id = request.GET.get('id') 
            if id :
                event = Event.objects.filter(pk=id, active=True).first()
                
                if event is None:
                    return Response({"message":"Event not found.", "status":404})
                
                tickets_number = 0
                # print(request.is_cadmin)
                if request.other_users is False:
                    client = Client.objects.get(account=request.user)
                    tickets = Ticket.objects.filter(event=event, client = client)
                    tickets_number = tickets.count()
                if event :
                    # print(event.eventactivity_set.all()) # type: ignore
                    serialized = EventFullDataSerializer(event).data
                    status, latitude, longitude = extract_coordinates_from_google_maps_url(event.event_address_link)
                    hotels = []
                    # print(f"Hey there!!!{status}")
                    if status and request.other_users == False:
                        resp = requests.get(f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location={latitude}%2C{longitude}&radius=10000&type=lodging&key={GOOGLE_TOKEN}")
                        results = resp.json()
                        # print(results['status'])
                        if results['status'] == 'OK':
                            for h in results['results']:
                                # print(h.get('vicinity'))
                                if "hotel" in h['types'] or "lodging" in h['types']:
                                    # Default image from culturevaults google drive
                                    image = "https://drive.google.com/uc?export=view&id=1UjQSUF-bk7LBfnzu2YZaG2G2mP3G528s"
                                    if h.get('photos'):
                                        image = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={h['photos'][0]['height']}&photo_reference={h['photos'][0]['photo_reference']}&key={GOOGLE_TOKEN}"
                                    hotels.append({"name":h['name'], "image":image, "link":f"https://www.booking.com/searchresults.en-gb.html?ss={h['name']}"})
                    artifacts = Artifact.objects.filter(event=event, quantity__gt=0)
                    return Response({"data":{"event":serialized, "tickets":tickets_number, "hotels":hotels, "artifacts":ArtifactShortDisplaySerializer(artifacts, many=True).data},  "status":200})
                else:
                    return Response({"message": "Event not found.", "status":404})        
            # By default you get every thing
            if len(Event.objects.filter(frequency="YEARLY", date__lt=datetime.now())) > 0:
                Event.objects.filter(frequency="YEARLY").update(date=F('date') + timedelta(365))
                
            events = Event.objects.all().filter(date__gt=datetime.now(), active=True).order_by('-updated_at')
            serialized_data = EventSerilaizer(events, many=True).data
            return Response({"data":{"events":serialized_data}, "status":200})
        except Exception as e :
            print(e)
            return Response({"message":"Something went wrong.", "status":500})
        
  
class EventActivityAPI(APIView):
    
    def post(self, request, *args, **kwargs):
        # Some validations here
        try:
            event_id = request.data.get('eventId')
            event = Event.objects.filter(pk=event_id).first()
            
            if event is None:
                return Response({"message":"The selected event was not found.", "status":404})
            
            for data in request.data.get('activities'):
                # print(data)
                title = data.get('title')
                description = data.get('description')
                price = data.get('price')
                time = data.get('dateTime')
                EventActivity.objects.create(event=event, description=description, price=float(price), time=time, title=title)
            
            serialized_data = EventActivitySerializer(event.eventactivity_set.all(), many=True).data # type: ignore
            
            # serialized_data = EventFullDataSerializer(event).data
            return Response({"data":{"activities":serialized_data}, "message":"Activities added successfully.", "status":200}) 
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong", "status":500})
        
        
class SaveTransaction(APIView):
    
    @method_decorator(client_required)
    def post(self, request):
        # use the transaction id to check if the client has payed the required amount
        
        try:
            # do some validations here
            transaction = request.data.get('transaction')
            # an array of activity ids [1,2,4,...]
            activities = request.data.get('activities')
            # event_id = request.data.get('event')
            # this should be MOBILE or CARD
            # payment_method = request.data.get('method')
            client = Client.objects.filter(account=request.user).first()
            # event = Event.objects.get(pk=event_id)
            # This should be a retrival not a create query 
            # ticket = Ticket.objects.create(client = client, event=event)
            # This should be a retrival not a create query 
            if client:
                for activity_id in activities:
                    activity = EventActivity.objects.get(pk=activity_id)
                    bookings = BookedEvent.objects.filter(client=client, activity=activity,  payed=False)
                    for b in bookings:
                        b.payed = True
                        b.transaction = transaction
                        b.save()
                return Response({"message":"Event booked.", "status":200})
            else:
                return Response({"message":"You do not have access to this page.", "status":401})
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong", "statue":500})
        

class GetReservations(APIView):
    def get(self, request, *args, **kwargs):
        # client = Client.objects.get(account=request.user)
        # booked_events = BookedEvent.objects.filter(Q(update_at__gte=datetime.now()))
        booked_events = BookedEvent.objects.filter(Q(activity__time__gte=datetime.now()) and Q(payed=True))
        # for booking in booked_events:
        #     event = booking.activity.event
        serialized_data = BookedEventSerializer(booked_events, many=True).data
        print(serialized_data)
        return Response({"data": serialized_data, "status":200})
        