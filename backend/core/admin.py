from django.contrib import admin

from core.models import Artifact, Artist, BookedEvent, Client, ClientContent, Event, EventActivity, EventFile, Organization, SystemAdmin, Ticket, TourCompany

# Register your models here.

admin.site.register(Organization)

admin.site.register(Client)

admin.site.register(Artist)

admin.site.register(Artifact)


admin.site.register(TourCompany)

admin.site.register(SystemAdmin)

admin.site.register(Event)

admin.site.register(EventActivity)

admin.site.register(EventFile)

admin.site.register(Ticket)

admin.site.register(BookedEvent)

admin.site.register(ClientContent)