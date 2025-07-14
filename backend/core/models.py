from ast import mod
from asyncio import events
from email.policy import default
from turtle import mode
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
"""
To create a Parent model which holds the ModelConfigManager

"""
# Custom manager

class ModelConfigManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(active=False)

# Meta classes

"""
***ABSTRACT CLASS***
This is a configuration model (almost like a manager class) which can be used to configure
A model by adding restriction attributes like status (active or inactive).
  
"""
class ModelConfig(models.Model):
    active = models.BooleanField(default=True)
    class Meta:
        abstract = True
 
"""
***ABSTRACT CLASS***
This is a meta data model which contains attributes like the creation date, the date upfated 
and other fileds required by almost any model/Class.

"""    
class ModelMetaData(models.Model):
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)     
        
    class Meta:
        abstract = True
        
"""
***ABSTRACT CLASS***
This is a class that contains needed attributes for a file
Currently we are separeting the file upload process from django because in the future -
A cloud solution like AWS might be used.
"""
class MediaFile(ModelConfig, ModelMetaData, models.Model):
    name = models.TextField(max_length=100)
    file = models.URLField()
    
    class Meta:
        abstract = True
    
# Authentication classes

"""
***ABSTRACT CLASS***
This is an abstruct class it can not have an instance.
You can only use it throught inheritance.
"""   
class UserAccount(models.Model):
    account = models.OneToOneField(User, on_delete=models.CASCADE)
    class Meta:
        abstract = True
     

class OTP(ModelMetaData, models.Model):
    otp = models.IntegerField(null=False)
    owner = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    
    
class Organization(UserAccount, ModelConfig, ModelMetaData, models.Model):
    address = models.TimeField(null=True)
  
  
class SystemAdmin(UserAccount, ModelConfig, ModelMetaData, models.Model):
    # This can be used in the future to give privileges to some admins
    privilege = models.IntegerField(default=1)
  
  
class Client(UserAccount, ModelConfig, ModelMetaData, models.Model):
    profile_image = models.TextField(max_length=250, null=True)
    address = models.TextField(max_length=250, null=True, default="NaN")
    phone = models.CharField(max_length=20, null=False, default="+(000) 000 00 000")

class TourCompany(UserAccount, ModelConfig, ModelMetaData, models.Model):
    company_name = models.TextField(max_length=200, null=False)
    company_banner = models.TextField(max_length=250, null=True)
    company_logo = models.TextField(max_length=250, null=True)
    address = models.TextField(max_length=250, null=True)
    

class Artist(UserAccount, ModelConfig, ModelMetaData, models.Model):
    banner = models.TextField(max_length=250, null=True)
    profile_image = models.TextField(max_length=250, null=True)
    address = models.TextField(max_length=250, null=True)


    
# Business models

# Event models
    
class Event(ModelConfig, ModelMetaData, models.Model):
    creator = models.ForeignKey(SystemAdmin, on_delete=models.CASCADE)
    organizer = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True)
    name = models.TextField(null=False)
    description = models.TextField(null=False)
    event_address = models.TextField(max_length=250)
    event_address_link = models.URLField(null=True)
    date = models.DateTimeField(null=True)
    frequency = models.TextField(default="YEARLY")
    
    
class EventFile(MediaFile, models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    
    
class EventActivity(ModelConfig, ModelMetaData, models.Model):
    title = models.TextField(default="ACTIVITY")
    description = models.TextField()
    price = models.FloatField(default=0.0)
    time = models.DateTimeField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    

# This is not necessary  
class Ticket(ModelConfig, ModelMetaData, models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True)
    
    def get_price(self):
        booked_events = BookedEvent.objects.filter(ticket=self)
        total = 0
        for booked_event in booked_events:
            total = total + booked_event.activity.price
        return total
            
            
class BookedEvent(ModelConfig, ModelMetaData, models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    activity = models.ForeignKey(EventActivity, on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.SET_NULL, null=True)
    payed = models.BooleanField(default=False)
    payment_method = models.TextField(max_length=50)
    transaction = models.JSONField(null=True)
    
    
    
# Artifacts model
class Artifact(ModelConfig, ModelMetaData, models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    name = models.TextField(max_length=120)
    description = models.TextField(max_length=250)
    quantity = models.IntegerField(default=0)
    price = models.FloatField(default=0.0)
    event = models.ForeignKey(Event, null=True, on_delete=models.SET_NULL)    

class ArtifactFile(MediaFile, models.Model):
    artifact = models.ForeignKey(Artifact, on_delete=models.CASCADE)
    
# This is a model which may need more adjustments in the future because of different payment methods 
class SoldArtifact(ModelConfig, ModelMetaData, models.Model):
    # Thi is a field that contains a string that tells which payment method was used
    # Example MoMo/MPessa or Visa card/Master card 
    payment_method = models.TextField(max_length=50)
    # If the client has payed
    payed = models.BooleanField(default=False)
    # If the order was accepted by the artist for delivery
    recieved = models.BooleanField(default=False)
    # Estimation time for delivery
    time_to_deliver = models.DateTimeField(default=timezone.now() + timezone.timedelta(days=7))
    # delivery address text
    delivery_address = models.TextField(max_length=250)
    # delivery address link (Google map link) this is optional
    delivery_address_link = models.URLField(null=True)
    # If the order was delivared
    delivared = models.BooleanField(default=False)
    
    quantity = models.IntegerField(default=1)
    
    artifact = models.ForeignKey(Artifact, on_delete=models.CASCADE)

    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    # 0 For payed, 1 For in transit, 2 For delivered
    status = models.IntegerField(default=0)
    # client_notes = models.TextField(max_length=200)
    
    # objects = ModelConfigManager()
    
    

class ClientContent(ModelConfig, ModelMetaData, models.Model):
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)


class ContentFile(MediaFile, models.Model):
    content = models.ForeignKey(ClientContent, on_delete=models.CASCADE)
    
class ContentText(ModelConfig, ModelMetaData, models.Model):
    content = models.ForeignKey(ClientContent, on_delete=models.CASCADE)
    text = models.TextField(max_length=250)
