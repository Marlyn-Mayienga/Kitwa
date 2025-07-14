from rest_framework.response import Response

from core.models import Event, Organization

# We will create a custom exception for this validations
def validate_create_event(request):
    name = request.data.get('name')
    date_time = request.data.get('dateTime')
    frequency = request.data.get('frequency')
    location = request.data.get('location')
    description = request.data.get('description')
    location_url  = request.data.get('locationUrl')
    organizer_id = request.data.get('organizer')
    if name is None:
        return {"message":"Event name required.", "status":400}
    
    if date_time is None:
        return {"message":"Event date required.", "status":400}
    
    if frequency not in ["YEARLY", "MONTHLY"]:
        return {"message":"Monthly and Yearly events are supported.", "status":400}
        
    if location_url is None or len(location)<3:
        return {"message":"Location url should be a link from google map.", "status":400}
    
    if description is None:
        return {"message":"The description is required.", "status":400}
    
    if location is None :
        return {"message":"The location address is required.", "status":400}
    
    if organizer_id is None or isinstance(int(organizer_id), int) is False:
        return {"message":"Required to select the event organizer.", "status":400}
    
    return {"status":200}


def update_event(request, event:Event):
    name = request.data.get('name')
    date_time = request.data.get('dateTime')
    frequency = request.data.get('frequency')
    location = request.data.get('location')
    description = request.data.get('description')
    location_url  = request.data.get('locationUrl')
    organizer_id = request.data.get('organizer')
    if name:
        event.name = name
    if date_time:
        event.date = date_time  
    if frequency in ["YEARLY", "MONTHLY"]:
        event.frequency = frequency
    if location_url  and len(location)>=3:
        event.event_address_link = location_url
    if description:
        event.description = description
    if location :
        event.event_address = location
    if organizer_id and isinstance(int(organizer_id), int):
        organizer = Organization.objects.filter(pk=organizer_id).first()
        if organizer is None:
            return {"message":"Organizer account not found.", "status":404}
    return {"status":200}