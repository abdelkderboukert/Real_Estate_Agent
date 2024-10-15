from django.urls import path, re_path
from django.conf import settings
from django.conf.urls.static import static
from .views import *



urlpatterns = [
    re_path('login', login),
    re_path('signup', signup),
    re_path('test_token', test_token),
    path('logout', logout, name='logout'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)