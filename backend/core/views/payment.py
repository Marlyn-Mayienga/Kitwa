import json
import os
import stripe
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from django.utils.decorators import method_decorator
from core.decorator import client_required
from core.models import Artifact, BookedEvent, Client, EventActivity, SoldArtifact, Ticket, Event
from rest_framework.permissions import IsAuthenticated

from core.views import artifacts

# This is your test secret API key.
# stripe.api_key = 'sk_test_51O6ugFHIsqFuJF6GU2PJ4fTSs5vYqxWNHzFTwX1ahevz1WZwTJ5tnPRXBMKza5NfbGbSy2jVacYAecENbN6CxVvG00vgrfkgxS'
S_KEY = settings.STRIPE_SECRETE_KEY
stripe.api_key = S_KEY


def calculate_order_amount(items):
    total = 0
    for item in items:
        
        total = total + int(item['price'])
    return (total*100)


def calculate_artifact_amount(items):
    total = 0
    for item in items:
        artifact = Artifact.objects.filter(pk=item['id']).first()
        if artifact:
            total = total + int((artifact.price * item['quantity']))
    
    return (total * 100)
        
# {"items":[{"productId":"", "quantity":""}]}
class StripPayArtifact(APIView):
    def post(self, request):
        try:
            data = request.data
            print(data)
            client = Client.objects.filter(account=request.user).first()
            if client is None:
                return Response({"message":"Only clients can use this service", "status":401})
            
            if len (data["items"]) == 0:
                return Response({"message":"Selected activities are required", "status":401})
            
            intent = stripe.PaymentIntent.create(
                # payment_method="Card",
                amount=calculate_artifact_amount(data['items']),
                currency='usd',
                # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods={
                    'enabled': True,
                },
            )  
            
            # for item in 
            for item in data['items']:
                artifact = Artifact.objects.filter(pk=item['id']).first()
                if artifact:
                    artifact.quantity = artifact.quantity - int(item['quantity'])
                    artifact.save()
                    tranasaction = SoldArtifact.objects.create(artifact=artifact, client=client, payment_method="CARD", delivery_address=data['delivery_address'], payed=True, quantity=int(item['quantity']))
            
            return Response({"data":{"clientSecret":intent['client_secret']}, "status":200, "message":""})
            
        except Exception as e:
            print(e)
            return Response({"message":e, "status":500})
        
        
        
class StripePaymentAPI(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request):
        pass
    
    @method_decorator(client_required) 
    def post(self, request):
        try:
            data = request.data
            
            client = Client.objects.filter(account=request.user).first()
            if client is None:
                return Response({"message":"Only clients can use this service", "status":401})
            
            if len (data["items"]) == 0:
                return Response({"message":"Selected activities are required", "status":401})
                
            event_id = data["items"][0]["event"]
           
             # Store the transaction ID(???????)
            event = Event.objects.get(pk=event_id)
            # Check if the ticket already exist  
            ticket = Ticket.objects.filter(client = client, event=event).first()
            if ticket:
                pass
            else:
                
                ticket = Ticket.objects.create(client = client, event=event)
            
            # Create a PaymentIntent with the order amount and currency
            intent = stripe.PaymentIntent.create(
                # payment_method="Card",
                amount=calculate_order_amount(data['items']),
                currency='usd',
                # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods={
                    'enabled': True,
                },
            )
          
            
            for activity_id in data['items']:
                activity = EventActivity.objects.get(pk=activity_id['id'])
                # create or gate
                BookedEvent.objects.get_or_create(client=client, activity=activity, payed=False, payment_method="CARD", ticket=ticket, transaction=intent['client_secret'])
            # Create transactions here for security reasons and set the is payed value to false and add the trasaction id
            # print(intent)
            return Response({"data":{"clientSecret":intent['client_secret']}, "status":200})
        except Exception as e:
            print(e)
            return Response({"message":e, "status":500})


class StripeCallBack(APIView):
    def post(self, request):
        
        event = None
        payload = request.data
        print("===========================")
        print(payload)
        sig_header = request.headers['STRIPE_SIGNATURE']

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, S_KEY
            )
        except ValueError as e:
            # Invalid payload
            print(e)
            raise e
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            print(e)
            raise e

        if event['type'] == 'subscription_schedule.canceled':
            subscription_schedule = event['data']['object']
        elif event['type'] == 'subscription_schedule.succeeded':
            print(event['data']['object'])
            print("You need to update the transaction status to true")
        # ... handle other event types
        else:
            print('Unhandled event type {}'.format(event['type']))


        return Response({"message":"OK"}, status=200)


        
