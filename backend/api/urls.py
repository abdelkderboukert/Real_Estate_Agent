from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *



urlpatterns = [
    path('api/auth/token', TokenView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)