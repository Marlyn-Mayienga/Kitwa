from http import client
import json
# from nis import cat
from shutil import ExecError
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from core.decorator import admin_required
from core.models import OTP, Artist, Client, Organization, SystemAdmin, TourCompany, UserAccount
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.utils.decorators import method_decorator
from django.core.serializers import serialize
from core.serializers import AccountDisplaySerializer, OrganizerDisplaySerializer
from core.utils import decrypt_email, email_sender, encrypt_email, generate_otp, generate_random_password, get_info_from_google, is_otp_valid
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

"""
We will improve validations after

"""

def create_default_user_client_account(request, to_activate=False):
    username = request.data.get('email')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    # do some validations here
    #  .....
    # 
    
    if confirm_password != password:
        raise ExecError("Password and password confirmation do not match")
     
    # 2. Create user
    # print(request.data)
    
    user = User.objects.create(username=username, email=email, last_name=last_name, first_name=first_name)

    if to_activate==False:
        otp = generate_otp()
        # print(otp)
        otp_model = OTP.objects.create(otp=otp, owner=user)
        email_sender('Confirm your account', f"{otp}", email, "email-templates.html")

    # print(password)
    user.set_password(password)

    user.is_active = False
    user.save()
    # 3. Create token
    return user


def log_user_in(request ,user, createToken=False):
    # Log the user in
    login(request, user)
    # Create or retrieve the token for the user
    if createToken:
        t = Token.objects.get(user=user)
        t.delete()
        token, _ = Token.objects.get_or_create(user=user)
        # t.delete()
        # token, _ = Token.objects.create(user=user)
    else:
        token, _ = Token.objects.get_or_create(user=user)
    
    # The user is an admin (dajngo admin not system admin)
    if user.is_staff:
        return Response({'token': token.key, "data":{"account":{"name":"admin", "account_type":"DJ_ADMIN"}}, "status":200})
        
    # Check if the logged in user is a client 
    client = Client.objects.filter(account=user).first()
    if client:
        return Response({'token': token.key, "data":{"account":{"name":client.account.first_name+" "+client.account.last_name, "email":client.account.email, "phone":client.phone, "address":client.address, "account_type":"CLIENT"}}, "status":200})
    # check if the logged in user is a Admin
    admin = SystemAdmin.objects.filter(account=user).first()
    if admin:
        return Response({'token': token.key, "data":{"account":{"name":admin.account.first_name, "account_type":"CADMIN"}}, "status":200})
    # check if the logged in user is a Organizer
    organizer = Organization.objects.filter(account=user).first()

    if organizer:
        # print("This is ok")
        return Response({'token': token.key, "data":{"account":{"name":organizer.account.first_name, "account_type":"ORGANIZER"}}, "status":200})
    
    # check if the logged in user is a Artist
    
    artist = Artist.objects.filter(account=user).first()

    if artist:
        return Response({'token': token.key, "data":{"account":{"name":artist.account.first_name, "account_type":"ARTIST"}}, "status":200})
    
    # check if the logged in user is a tour company
    
    company = TourCompany.objects.filter(account=user).first()
    
    if company:
        return Response({'token': token.key, "data":{"account":{"name":company.account.first_name, "account_type":"TOUR_COMPANY"}}, "status":200})


def create_default_user_pro_accounts(request, is_admin=False):
    username = request.data.get('email')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    # do some validations here
    #  .....
    # 
    password = generate_random_password(size=5)
    token = encrypt_email(email)
    # print(token)
    # 1. Send confirmation email
    # 2. Create user

    user = User.objects.create(username=username, email=email, first_name=first_name, last_name=last_name)
    if is_admin:
        email_sender('Welcome', password, email, "admin-account-created.html", token)
    else:
        email_sender('Confirm your account', password, email, "activate-account.html", token)
        
    # print(password)
    user.set_password(password)
    # if isClient is False:
    if is_admin is False:
        user.is_active = False
    user.save()
    # 3. Create token
    # token, _ = Token.objects.get_or_create(user=user)
    return  user



# Google OAuth create user
def create_google_user(request):
    username = request.data.get('email')
    email = request.data.get('email')
    name = request.data.get('name')
    password = request.data.get('password')
    # do some validations here
    #  .....
    # 
       
    # 2. Create user
    user = User.objects.create(username=username, email=email, first_name=name)
    
    # print(password)
    user.set_password(password)

    user.save()
    # 3. Create token
    token, _ = Token.objects.get_or_create(user=user)
    return token, user
            


        
        
# Only admins or syste admins have access 
@method_decorator(admin_required, name='post')        
class CreateArtistAPI(APIView):
    
    def post(self, request):
        try:
            user = create_default_user_pro_accounts(request)
            artist = Artist.objects.create(account=user)
            return Response({"data":{"account":{"name":artist.account.first_name}, "status":200}})
        except IntegrityError as e:
            return Response({"error": "User with the provided email already exist."}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# This one any one can use it but needs approval from the admin for their account to work
class ArtistAPI(APIView):
    
    def post(self, request):
        try:
            user = create_default_user_client_account(request, True)
            artist = Artist.objects.create(account=user)
            return Response({"data":{"account":{"name":artist.account.first_name}}, "message":"Account created, please wait for the admin to activate your account.", "status":200})
        except IntegrityError as e:
            return Response({"error": "User with the provided email already exist.", "status":400})
            
        except Exception as e:
            return Response({"error": str(e), "status":500})


# Only admins or syste admins have access 
@method_decorator(admin_required, name='post')
class CreateOrganizationAPI(APIView):
    
    def post(self, request):
        try:
            user = create_default_user_pro_accounts(request)            
            organization = Organization.objects.create(account=user)
            return Response({"data":{"account":{"name":organization.account.first_name}, "message":"Confirmation url sent to the account holder's email box."},  "status":200})
        except IntegrityError as e:
            return Response({"error": "User with the provided email already exist.", "status":400})
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OrganizationAPI(APIView):
    
    def get(self, request, *args, **kwargs):
        try:
            organizers = Organization.objects.all()
            # print(organizers[0])
            serialized_data = OrganizerDisplaySerializer(organizers, many=True).data
            return Response({"message":"", "data":{"organizers":serialized_data}, "status":200})
        except Exception as e:
            print(e)
            return Response({"message":"Somthing went wrong", "status":500})
    
    def post(self, request):
        try:
            user = create_default_user_client_account(request, True)          
            organization = Organization.objects.create(account=user)
            return Response({"data":{"account":{"name":organization.account.first_name}, "message":"Account created, please wait for the admin to activate your account."}, "status":200})
        except IntegrityError as e:
            return Response({"error": "User with the provided email already exist.", "status":400})
            
        except Exception as e:
            return Response({"error": str(e), "status":500})
        

# Only admins or syste admins have access 
@method_decorator(admin_required, name='post')  
class CreateTourCompanyAPI(APIView):
    
    def post(self, request):
        try:
            user = create_default_user_pro_accounts(request)            
            company = TourCompany.objects.create(account=user)
            return Response({"data":{"account":{"name":company.account.first_name}, "message":"Confirmation url sent to the account holder's email box."}, "status":200})
        
        except IntegrityError as e:
            return Response({"error": "User with the provided email already exist.", "status":400})
            
        except Exception as e:
            return Response({"error": str(e), "status":500})


class TourCompanyAPI(APIView):
    
    def post(self, request):
        try:
            user = create_default_user_client_account(request, True)              
            company = TourCompany.objects.create(account=user)
            return Response({"data":{"account":{"name":company.account.first_name}, "message":"Account created, please wait for the admin to activate your account."}, "status":200})
        
        except IntegrityError as e:
            return Response({"error": "User with the provided email already exist.", "status":400})
            
        except Exception as e:
            return Response({"error": str(e), "status":500})
        

class CreateClientAPI(APIView):
    
    def post(self, request):
        try:
            
            # This is a client, there for no need to create a default password
            user = create_default_user_client_account(request)  
            address = request.data.get('address')
            if address :
                client = Client.objects.create(account=user, address=address)
            else:
                client = Client.objects.create(account=user)
            return Response({"data":{"account":{"name":client.account.first_name}}, "message":"Your account has been created. Please log in to your email inbox and confirm your account.", "status":200})
        
        except IntegrityError as e:
            print(e)
            return Response({"error": "User with the provided email already exist.", "status":400})
            
        except Exception as e:
            return Response({"error": f"{e}", "status":500},)
        
    @permission_classes([IsAuthenticated])
    def put(self, request, *args, **kwargs):
        try:
            print(request.user)
            user = request.user
            phone = request.data.get('phone')
            address = request.data.get('address')
            client = Client.objects.filter(account=user).first()
            if client is None:
                return Response({"message":"Account not found", "status":404})
                
            if phone:
                client.phone = phone
            if address:
                client.address = address
            client.save()
            return Response({"message":"Updated successfully", "status":200, "data":{"account":{"name":client.account.first_name+" "+client.account.last_name, "email":client.account.email, "phone":client.phone, "account_type":"CLIENT", "address":client.address}}})
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong!", "status":500})


class CreateClientGoogleAPI(APIView):
    
    def post(self, request):
        try:
            print(request)
            user = get_info_from_google(request.data.get('token'))
            print(user)
            # we are for now using the googleid as the password
            # This needs to be changed in the future and make double auth both on the client and the server 
            # password = request.data.get('password')
            # email = request.data.get('email')
            #  # do some validations here
            # #  .....
            # # 
            # user = authenticate(request, email=email, password=password)
            # if user:
            #     login(request, user)
            #     # Create or retrieve the token for the user
            #     token, _ = Token.objects.get_or_create(user=user)
            #     # Check if the logged in user is a client 
            #     client = Client.objects.filter(account=user).first()
            #     if client:
            #         return Response({"data":{"account":{"name":client.account.first_name,  "account_type":"CLIENT"}},"token": token.key, "status":200})
            # else:
            #     token, user = create_google_user(request)     
            #     profile = request.data.get('profile')
            #     # do some validations here
            #     #  .....
            #     #        
            #     client = Client.objects.create(account=user, profile_image=profile)
            #     return Response({"data":{"account":{"name":client.account.first_name, "account_type":"CLIENT"}}, "token":token.key, "status":200})
            return Response({"message": "User with the provided email already exist.", "status":400})
        except IntegrityError as e:
            return Response({"message": "User with the provided email already exist.", "status":400})
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
# Only admins or syste admins have access 
@method_decorator(admin_required, name='post')
class CreateAdminAPI(APIView):
    
    def post(self, request):
        try:
            user = create_default_user_pro_accounts(request, is_admin=True)            
            admin = SystemAdmin.objects.create(account=user)
            
            return Response({"data":{"account":{"name":admin.account.first_name}, "message":"Account created successfully, and credentials sent to the account holder's email inbox."}, "status":200})
        
        except IntegrityError as e:
            return Response({"error": "User with the provided email already exist.", "status":400})
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginAPI(APIView):
    
    def post(self, request):
        try:
            # print(request.data)
            email = request.data.get('email')
            password = request.data.get('password')
            autoLogin = request.data.get('auto')
             # do some validations here
            #  .....
            # 
            
            if autoLogin :
                pass
            else:      
                # print(email, password)  
                user = authenticate(request, username=email, password=password)
                # print(user)
                if user is not None:
                    return log_user_in(request, user)
                else:
                    # check if the account is desactivated by default
                    user = User.objects.filter(email=email).first()         
                    if user is not None and user.is_active is False:
                        return Response({'message': 'Your account was desactivated', "status":401}) 
                    return Response({'message': 'Invalid email or password', "status":400})
                
        except Exception as e:
            # print(e)
            return Response({'message': f'{e}', "status":500})
    
        
class ConfirmClientAccountAPI(APIView):

    def post(self, request):
        try:
            otp = request.data.get('otp')
            email = request.data.get('email')
            # do some validations here
            #  .....
            # 
            # check if the user exist
            user = User.objects.filter(email=email).first()
            if user:
                # check if the client exist
                client = Client.objects.filter(account=user).first()
                if client:
                    # find the otp
                    otp_model = OTP.objects.filter(owner=user).first()
                    if otp_model:
                        if int(otp_model.otp) == int(otp):
                            if is_otp_valid(otp_model):
                                user.is_active = True
                                user.save()
                                return Response({'message': 'Account activated, you can now login.', "status":200}) 
                            else:
                                return Response({'message': 'The otp has timed out, please request a new one.', "status":401}) 
                        else:
                            return Response({'message': 'Invalid otp.', "status":401}) 
                    else:
                        return Response({'message': 'The otp has timed out, please request a new one.', "status":401}) 
                else:
                    return Response({'message': f'Account with email address {email} not found', "status":401}) 
            else:
                return Response({'message': f'Account with email address {email} not found', "status":401}) 
        except Exception as e:
            return Response({"message": f"{e}", "status":500}) 
            
    def get(self, request, email):
        try:
            # email = self.kwargs.get('param_id')
            user = User.objects.filter(email=email).first()
            # print(user)
            if user:
                otp = generate_otp()
                otp_model = OTP.objects.filter(owner=user).first()
                if otp_model:
                    otp_model.otp = otp
                    otp_model.save()
                else:
                    otp_model = OTP.objects.create(owner=user, otp=otp)
                    
                email_sender("Confirm account", f"{otp}", email, "email-templates.html")
                return Response({"message":"A new OTP was generated and sent to your email box.", "status":200})
            else:
                return Response({"message": f'Account with email address {email} not found', "status":401}) 
        except Exception as e:
            return Response({"message": f"{e}", "status":500}) 
                            

"""
GET METHOD
This method gets all the deactivated account for the admin to activate them (We shall add the reasen for their status after) 
 
POST METHOD 
This  function allow those who got their account created by the admin to activate it by sending a new password and the token

PUT METHOD
This is a method for the admin to activate/deactivate deactivated accounts 
"""
class ActivateAccountAPI(APIView):
    
    @method_decorator(admin_required)         
    def get(self, request, *args, **kwargs):
        users_accounts = User.objects.filter(is_active=False)
        serialized_data = AccountDisplaySerializer(users_accounts, many=True).data
        # serialized_data = serialize("json", users_accounts)
        # serialized = json.loads(serialized_data)
        
        return Response({"message":"Deactivated accounts", "data": {"accounts":serialized_data}, "status":200})
        
    
    
    def post(self, request):
        try: 
            token = request.data.get('token')
            old_password = request.data.get('old_password')
            new_password = request.data.get('new_password')
            confirm_password = request.data.get('confirm_password')
             # do some validations here
            #  .....
            # 
            email = decrypt_email(token)
            user = User.objects.filter(email=email).first()
            if user:
                user.is_active = True
                user.save()
                # print(email)
                # Authenticate the user using the temp password now
                # -auth_user = authenticate(request, username=email, password=old_password)
                
                if user.check_password(old_password):
                    if new_password != confirm_password:
                        return Response({'message': 'Password do not match', "status":400})
                    user.set_password(new_password)
                    user.save()
                    #  This returns the coresponding account
                    return log_user_in(request, user)
                else:
                    # desactivate the account again
                    user.is_active = False
                    user.save()
                    return  Response({'message': 'Invalid email or password.', "status":400}) 
            else:
                return Response({'message': 'Account not found', "status":400})
        except Exception as e:
            return Response({"message": f"{e}", "status":400})
    
    @method_decorator(admin_required)         
    def put(self, request, *args, **kwargs):
        email = request.data.get('email')
        active = request.data.get('active')
        
        user = User.objects.filter(email=email).first()
        
        if user:
            user.is_active = active if active == True else False
            user.save()
            if user.is_active: 
                email_sender("Account activated", "", email, "account-activated.html")
            
            return Response({"message":f"Account status changed to active : {user.is_active}", "status":200})
               
        else:
            return  Response({'message': f'Account with email {email} is not found.', "status":404}) 

class RefreshProfile(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, *args, **kwargs):
        try:
            # user = User.objects.filter(pk=request.user.id)
            return log_user_in(request, request.user, createToken=True)
        except Exception as e:
            print(e)
            Response({'message': 'Something went wrong', "status":500}) 
            