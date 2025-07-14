from os import name
from urllib import request
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from core.decorator import artist_or_admin_required, artist_required, client_artist_or_admin, client_or_admin_required, client_required
from django.utils.decorators import method_decorator
from rest_framework.parsers import MultiPartParser
from core.models import Artifact, ArtifactFile, Artist, Client, Event, SoldArtifact
from core.serializers import ArtifactDisplaySerializer, SoldArtifactsSerializer
from core.utils import upload_files


class ArtifactAPI(APIView):
    parser_classes = (MultiPartParser,)
    
    @method_decorator(artist_or_admin_required)  
    def delete(self, request, *args, **kwargs):
        try:
            id = request.GET.get('id', None)
            if id is None:
                return Response({"message":"Artifact id is required.", "status":400})
            artifact = Artifact.objects.filter(pk = id).first()
            if artifact:
                if artifact.active:
                    artifact.active = False
                    artifact.save()
                    return Response({"message":"Artifact deleted.", "status":200})
                else:
                    artifact.active = True
                    artifact.save()
                    return Response({"message":"Artifact restored.", "status":200})

            return Response({"message":"Artifact not found.","status":404})
            
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong", "status":500})

    
    def get(self, request, *args, **kwargs):
        try:
            query = request.GET.get('q', None)
            event_id = request.GET.get('event_id', None)
            id = request.GET.get('id', None)
            
            if query:
                artifacts = Artifact.objects.filter(name__icontains=query, quantity__gt=0, active=True).order_by('-updated_at')
            elif event_id:
                event = Event.objects.filter(pk=event_id, quantity__gt=0, active=True).first()
                if event:
                    artifacts = Artifact.objects.filter(event = event, quantity__gt=0, active=True)
                else:
                    return Response ({"message":"Event not found", "status":404})
            elif id:
                artifact = Artifact.objects.filter(pk=id, quantity__gt=0, active=True).first()
                if artifact:
                    artifacts = [artifact,]
                else:
                    return Response ({"message":"Artifact not found", "status":404})
            else:
                artifacts = Artifact.objects.filter(quantity__gt=0, active=True).order_by('-updated_at')
            serialized_artifact = ArtifactDisplaySerializer(artifacts, many = True)
            return Response({"data": serialized_artifact.data, "status":200})
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong", "status":500})
    
    @method_decorator(artist_required)  
    def put(self, request, *args, **kwargs):
        try:
            id = request.data.get('id')
            name = request.data.get('name')
            description = request.data.get('description')
            quantity = request.data.get('quantity')
            
            if id is None:
                return Response({"message":"Artifact id is required", "status":400})
            artifact = Artifact.objects.filter(pk=id, active=True).first()
            if artifact:
                if name and len(name) > 2:
                    artifact.name = name
                if description and len(description) > 5:
                    artifact.description = description
                if quantity and int(quantity)>=0:
                    artifact.quantity = int(quantity)
                                
                artifact.save()
                return Response({"message":"Artifact updated successfuly.", "status":200})  
            return Response({"message":"Artifact not found.", "status":404})           
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong.", "status":500})
        
    @method_decorator(artist_required)  
    def post(self, request, *args, **kwargs):
        try:
            # print(request)
            files = request.FILES.getlist('file')
            response = upload_files(files)
            # print(response)
            file_paths = []
            if response.get('status'):
                file_paths = file_paths + response['file_paths']
                # file_paths.append(response.get('file_paths'))
                name = request.data.get('name')
                description = request.data.get('description')
                quantity = request.data.get('quantity')
                price = request.data.get('price')
                event_id = request.data.get('event_id')
                # do some validations here
                #  .....
                # 
                user = request.user
                artist = Artist.objects.filter(account=user).first()
                if artist:
                    artifact = Artifact.objects.create(artist=artist, name=name, description=description, quantity=quantity, price=price)
                    event = Event.objects.filter(pk=event_id).first()
                    if event:
                        artifact.event = event
                        artifact.save()
                    # This will not happen if file_paths len = 0 
                    for file_path in file_paths:
                        artifact_file = ArtifactFile.objects.create(artifact=artifact, name=artifact.name, file=file_path)
                    serialized_artifact = ArtifactDisplaySerializer(instance=artifact)
                    return Response({"message":"Product added successfully", "data":serialized_artifact.data, "status":200})
                else:
                    return Response({"message":"You do not have permission to access this page.", "status":401})
            else:
                return Response({"message": response.get('message'), "status":400})
        except Exception as e:
            #print(e)
            return Response({"message":"Something went wrong", "status":500})
        
        
class SoldArtifactsAPI(APIView):
    
    @method_decorator(client_required)
    def delete(self, request, *args, **kwargs):
        try:
            id = request.GET.get('id', None)
            if id is None:
                return Response({"message":"Order id is required.", "status":400})
            transaction = SoldArtifact.objects.filter(pk=id).first()
            if transaction:
                
                if transaction.status >= 2:
                    return Response({"message":"The order has alredy been shiped.","status":401})
                
                if transaction.active:
                    transaction.active = False
                    transaction.save()
                    return Response({"message":"Order/ transaction deleted.", "status":200})            

                else:
                    transaction.active = True
                    transaction.save()
                    return Response({"message":"Order/ transaction restored.", "status":200})            
            else:
                return Response({"message":"Transaction/order not found.", "status":404})
            
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong", "status":500})
    
    @method_decorator(artist_required)
    def put(self, request , *args, **kwargs):
        try:
            id = request.data.get('id')
            received = request.data.get('received')
            delivered = request.data.get('delivered')
            # rejected = request.data.get('rejected')
            if id is None:
                return Response({"message":"id is required.", "status":400})
            transaction = SoldArtifact.objects.filter(pk=id).first()
            if transaction:
                if received:
                    if received == True:
                        transaction.status = 1
                    else:
                        transaction.status = 0
                    transaction.recieved = received
                    
                if delivered:
                    if delivered == True:
                        transaction.status = 2
                    else:
                        transaction.status = 1
                    transaction.delivared = delivered
                # if rejected:
                #     if rejected == True:
                #         transaction.recieved = False
                #         transaction.delivared = False
                #     transaction.status = 0
                    
                transaction.save()
                # print(transaction.status)
                return Response({"message":"Transaction updated successfuly", "status":200})
            else:
                return Response({"message":"Transaction not found", "status":404})
        except Exception as e:
            return Response({"message":"Something went wrong", "status":500})
            
    
    @method_decorator(client_artist_or_admin) 
    def get(self, request, * args, **kwargs):
        try:
            transactions = []
            if request.is_client:
                client = Client.objects.get(account = request.user)
                transactions = SoldArtifact.objects.filter(client=client, active=True)
            elif request.is_artist:
                artist = Artist.objects.get(account=request.user)
                transactions = SoldArtifact.objects.filter(artifact__artist=artist, active=True)
            
            return Response({"message":"", "data":SoldArtifactsSerializer(transactions, many=True).data, "status":200})
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong", "status":500})
        