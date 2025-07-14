from dataclasses import field, fields
from rest_framework import serializers

from django.contrib.auth.models import User

from core.models import Artifact, ArtifactFile, Artist, BookedEvent, Client, ClientContent, ContentFile, Event, EventActivity, EventFile, Organization, SoldArtifact, SystemAdmin




class AccountDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active', 'date_joined']
    
    
class ShortAccountDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']
    

class ArtistDisplaySerializer(serializers.ModelSerializer):
    account = ShortAccountDisplaySerializer()
    class Meta:
        model = Artist
        fields = ['id', 'account']


class ClientDisplaySerializer(serializers.ModelSerializer):
    account = ShortAccountDisplaySerializer()
    class Meta:
        model = Client
        fields = ['id', 'account']
        
        
class OrganizerDisplaySerializer(serializers.Serializer):
    account = ShortAccountDisplaySerializer()
    # this to change pk to id for security purposes
    id = serializers.CharField(source='pk')
    class Meta:
        model = Organization
        fields = ['id', 'account']

  
class CAdminDisplaySerializer(serializers.ModelSerializer):
    account = ShortAccountDisplaySerializer()
    class Meta:
        model = SystemAdmin
        fields = ['id', 'account']

class ArtifactFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtifactFile
        fields = ['file']            
            


class EventFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventFile
        fields = ['file']
        

class EventActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventActivity
        fields = "__all__"
        
        
class EventShortSerializer(serializers.ModelSerializer):
    event_files = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ['id', 'event_files', 'name'] 
        
    def get_event_files(self, obj):
        files = EventFile.objects.filter(event=obj)
        serialized_files = EventFileSerializer(files, many=True).data
        return serialized_files  


class EventSerilaizer(serializers.ModelSerializer):
    creator = CAdminDisplaySerializer()
    event_files = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ['id', 'creator', 'event_files', 'event_address', 'event_address_link', 'updated_at', 'date','description', 'name']
    
    def get_event_files(self, obj):
        files = EventFile.objects.filter(event=obj)
        serialized_files = EventFileSerializer(files, many=True).data
        return serialized_files


class EventFullDataSerializer(serializers.ModelSerializer):
    creator = CAdminDisplaySerializer()
    organizer = OrganizerDisplaySerializer()
    event_files = serializers.SerializerMethodField()
    event_activities  =  serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = "__all__"
    
    def get_event_files(self, obj):
        files = EventFile.objects.filter(event=obj)
        serialized_files = EventFileSerializer(files, many=True).data
        return serialized_files
    
    def get_event_activities(self, obj):
        activities = EventActivity.objects.filter(event=obj)
        serialized_activities = EventActivitySerializer(activities, many=True).data
        return serialized_activities


class BookedEventSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BookedEvent
        fields = "__all__"
        

        


class ArtifactDisplaySerializer(serializers.ModelSerializer):
    artist = ArtistDisplaySerializer()
    artifact_files = serializers.SerializerMethodField()
    event = EventShortSerializer()
    class Meta:
        model = Artifact
        fields = ['id', 'artist', 'artifact_files', 'name', 'quantity', 'updated_at', 'description', 'price', 'event']

    def get_artifact_files(self, obj):
        files = ArtifactFile.objects.filter(artifact=obj)
        serialized_files = ArtifactFileSerializer(files, many=True).data
        return serialized_files
    # Add more fields as neede
    
class ArtifactShortDisplaySerializer(serializers.ModelSerializer):
    artifact_files = serializers.SerializerMethodField()
    class Meta:
        model = Artifact
        fields = ['id', 'artifact_files', 'name', 'price']
        
    def get_artifact_files(self, obj):
        files = ArtifactFile.objects.filter(artifact=obj)
        serialized_files = ArtifactFileSerializer(files, many=True).data
        return serialized_files
    
  
class ArtifactSimpleDisplaySerializer(serializers.ModelSerializer):
    artifact_files = serializers.SerializerMethodField()
    artist = ArtistDisplaySerializer()
    class Meta:
        model = Artifact
        fields = ['id', 'artifact_files', 'artist', 'name', 'price']
        
    def get_artifact_files(self, obj):
        files = ArtifactFile.objects.filter(artifact=obj)
        serialized_files = ArtifactFileSerializer(files, many=True).data
        return serialized_files
          
          
class SoldArtifactsSerializer(serializers.ModelSerializer):
    artifact = ArtifactSimpleDisplaySerializer()
    client = ClientDisplaySerializer()
    class Meta:
        model = SoldArtifact
        fields = "__all__"


class ContentListDisplaySerializer(serializers.ModelSerializer):
    event = EventShortSerializer()
    media = serializers.SerializerMethodField()
    class Meta:
        model = ClientContent
        fields = ['id', 'event', 'updated_at', 'media']
    
    def get_media(self, obj):
        files = ContentFile.objects.filter(content=obj).count()
        return files
    