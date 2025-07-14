from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
from django.db.models import Q

class EmailBackend(ModelBackend):
    def authenticate(self, request, email, password, username='', *args, **kwargs):
        try:
            # email = request.data.get('email')
            # password = request.data.get('password')
            user = User.objects.filter(Q(email=email) | Q(username=username)).first()
        except User.DoesNotExist:
            return None

        if user is not None and user.check_password(password) and self.user_can_authenticate(user):
            return user
        else:
            return None
            
            
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
