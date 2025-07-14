from functools import wraps
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
# from stripe import Account

from core.models import Artist, Client, Organization, SystemAdmin, TourCompany


"""
 To use a decorator on an API View2
 
 @method_decorator(<decorator_function>, name='<method>')        
 class YourAPI(APIView):
       def post(self, request):
           .......
You can also put it on the top of the method

 class YourAPI(APIView):
       @method_decorator(<decorator_function>)
       def post(self, request):
           .......

"""

def admin_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated :
            user = request.user
            admin = SystemAdmin.objects.filter(account=user).first()
            if admin or user.is_staff:    
                # User is authenticated and is a system admin
                return view_func(request, *args, **kwargs)
            else:
                
                return Response({"message": "You do not have permission to access this page.", "status":401})
        else:
            return Response({"message": "You do not have permission to access this page.", "status":401})
    
    return _wrapped_view


# Only clients can access views protected by this decorator
def client_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # print(f"Ok........{request.headers}")
        
        if request.user.is_authenticated :
            
            user = request.user
            client = Client.objects.filter(account=user).first()
            if client or user.is_staff:    
                # User is authenticated and is a client
                return view_func(request, *args, **kwargs)
            else:
                
                return Response({"message": "You do not have permission to access this page.", "status":401})
        else:
            return Response({"message": "You do not have permission to access this page.", "status":401})
    
    return _wrapped_view


def client_or_admin_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # print(f"Ok........{request.headers}")
        
        if request.user.is_authenticated :
            
            user = request.user
            client = Client.objects.filter(account=user).first()
            if client or user.is_staff:    
                request.other_users = False
                
                # User is authenticated and is a client
                return view_func(request, *args, **kwargs)
            else:
                # print("This is ok ...")
                request.other_users = True
                return view_func(request, *args, **kwargs)
            # else:    
            #     return Response({"message": "You do not have permission to access this page.", "status":401})
        else:
            return Response({"message": "You do not have permission to access this page.", "status":401})
    
    return _wrapped_view

def tour_company_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated :
            user = request.user
            company = TourCompany.objects.filter(account=user).first()
            if company or user.is_staff:    
                # User is authenticated and is a company
                return view_func(request, *args, **kwargs)
            else:
                
                return Response({"message": "You do not have permission to access this page.", "status":401})
        else:
            return Response({"message": "You do not have permission to access this page.", "status":401})
    
    return _wrapped_view


def artist_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated :
            user = request.user
            artist = Artist.objects.filter(account=user).first()
            if artist or user.is_staff:    
                # User is authenticated and is an artist
                return view_func(request, *args, **kwargs)
            else:
                
                return Response({"message": "You do not have permission to access this page.", "status":401})
        else:
            return Response({"message": "You do not have permission to access this page.", "status":401})
    
    return _wrapped_view



def artist_or_admin_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated :
            user = request.user
            artist = Artist.objects.filter(account=user).first()
            admin = SystemAdmin.objects.filter(account=user).first()
            if artist or admin:    
                # User is authenticated and is an artist
                return view_func(request, *args, **kwargs)
            else:
                
                return Response({"message": "You do not have permission to access this page.", "status":401})
        else:
            return Response({"message": "You do not have permission to access this page.", "status":401})
    
    return _wrapped_view

def organizer_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated :
            user = request.user
            organizer = Organization.objects.filter(account=user).first()
            if organizer or user.is_staff:    
                # User is authenticated and is an organizer
                return view_func(request, *args, **kwargs)
            else:
                
                return Response({"message": "You do not have permission to access this page.", "status":401})
        else:
            return Response({"message": "You do not have permission to access this page.", "status":401})
    
    return _wrapped_view


def client_artist_or_admin(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated :
            user = request.user
            artist = Artist.objects.filter(account=user).first()
            client = Client.objects.filter(account=user).first()
            
            if client :    
                # User is authenticated and is an organizer
                request.is_client = True
                request.is_artist = False
                return view_func(request, *args, **kwargs)
            elif artist:
                request.is_artist = True
                request.is_client = False
                return view_func(request, *args, **kwargs)
            else:            
                return Response({"message": "You do not have permission to access this page.", "status":401})
        else:
            return Response({"message": "You do not have permission to access this page.", "status":401})
    
    return _wrapped_view