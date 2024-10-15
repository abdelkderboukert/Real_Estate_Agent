from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from django.contrib.auth.models import User

class TokenView(APIView):
    def post(self, request):
        access_token = request.data.get('access_token')
        # Validate the access token with Google's tokeninfo endpoint
        token_info_response = request.get(
            f'https://oauth2.googleapis.com/tokeninfo?id_token={access_token}'
        )
        if token_info_response.status_code != 200:
            return JsonResponse({'error': 'Invalid access token'}, status=401)

        # Generate a JWT token using the access token
        user_data = token_info_response.json()
        user, created = User.objects.get_or_create(email=user_data['email'])
        refresh_token = RefreshToken.for_user(user)
        return JsonResponse({'token': str(refresh_token.access_token)})