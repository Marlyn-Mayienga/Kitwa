
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from core.decorator import admin_required, client_or_admin_required, client_required
from django.utils.decorators import method_decorator
from rest_framework.response import Response

from core.models import Client, ClientContent, ContentFile, ContentText, Event
from core.serializers import ContentListDisplaySerializer
from core.utils import upload_files


class CreateContent(APIView):
    parser_classes = (MultiPartParser,)
    
    def get(self, request, *args, **kwargs):
        try:
            contents = []
            id = request.GET.get('id') 
            
            if id:
                contents = ClientContent.objects.filter(pk=id)
            else:
                # print(request.user.is_authenticated)
                if request.user.is_authenticated:
                    client = Client.objects.filter(account=request.user).first()
                    if client is None:
                        return Response({"status":401, "message":"Only clients are allowed."})

                    contents = ClientContent.objects.filter(client=client).order_by('-updated_at')
                else:
                    contents = ClientContent.objects.all().order_by('-updated_at')
                
            serialized = ContentListDisplaySerializer(contents, many=True).data
            return Response({"status":200, "data":serialized})
        except Exception as e:
            print(e)
            return Response({"status":500, "message":"Something went wrong."})
    
    @method_decorator(client_required)     
    def post(self, request, *args, **kwargs):
        try:
            event_id = request.data.get('id')
            text = request.data.get('text')
            files = request.FILES.getlist('file')
            # print(event_id)
            if event_id is None :
                return Response({"status":400, "message":"Event id is required."})
           
            client = Client.objects.filter(account=request.user).first()
            if client is None :
                return Response({"status":401, "message":"Only clients are allowed to post contents."})
            
            event = Event.objects.filter(pk=event_id).first()
            if event is None:
                return Response({"status":400, "message":"Event not found."})
            # 1. Create content
            content = ClientContent.objects.create(client=client, event=event)
            # 2. Add text to the content
            if text is not None and len(text) > 5:
                contentText = ContentText.objects.create(content=content, text=text)
            # 3. Add files (Videos, Images)
            file_paths = []
            
            response = upload_files(files)
            if response.get('status'):
                file_paths = file_paths + response['file_paths']  
            
            key = 0
            for url in file_paths:
                # print(url)
                key = key + 1
                ContentFile.objects.create(content=content, name=f'{event.name}-{client.account.first_name}-{key}', file=url)
            contents = ClientContent.objects.filter(client=client).order_by('-updated_at')
            serialized = ContentListDisplaySerializer(contents, many=True).data
            return Response({"status":200, "message":"Content created.", "data":serialized})
        except Exception as e:
            print(e)
            return Response({"status":500, "message":"Something went wrong."})