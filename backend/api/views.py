from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics
import pandas as pd
from django.http import JsonResponse
from sklearn.linear_model import LinearRegression 
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import *

from .serializers import UserSerializer
import numpy as np


file_path = r"C:\Users\HP\Downloads\DataSets-02 (1).xlsx"
df = pd.read_excel(file_path)
df.dropna(inplace=True)

# Extract input and output values
list_x = df.iloc[:, 0].tolist()  # Output values
list_y1 = df.iloc[:, 1].tolist()  # Input feature 1 (numerical)
list_y2 = df.iloc[:, 2].tolist()  # Input feature 2 (string)

X1 = np.array(list_y1).reshape(-1, 1)
y = np.array(list_x)

label_encoder = LabelEncoder()
X2 = label_encoder.fit_transform(list_y2).reshape(-1, 1)  # Convert string to numerical

x = np.hstack((X1, X2))


x_mean = np.mean(x, axis=0)
x_std = np.std(x, axis=0)
x_normalized = (x - x_mean) / x_std

X_train, X_test, y_train, y_test = train_test_split(x_normalized, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Absolute Error: {mae:.2f}")
print(f"Mean Squared Error: {mse:.2f}")
print(f"R² Score: {r2:.2f}")

def predict_price(surface_area, Secteur):
    # Normalize input surface area before prediction
    position_encoded = label_encoder.transform([Secteur])[0]
    Input_normalized = (np.array([[surface_area, position_encoded]]) - x_mean) / x_std
    predicted_price = model.predict(Input_normalized)
    return predicted_price[0]

def predict_view(request):
    surface_area = request.GET.get('surface_area')
    Secteur_area = request.GET.get('Secteur')
    print(surface_area ,Secteur_area)
    
    if surface_area is not None:
        try:
            surface_area = float(surface_area)
            predicted_price1 = predict_price(surface_area, Secteur_area)
            formatted_price = "{:.2f}".format(predicted_price1)
            return JsonResponse({'predicted_price': formatted_price})
        except ValueError:
            return JsonResponse({'error': 'Invalid surface area. Please enter a valid number.'}, status=400)
    else:
        return JsonResponse({'error': 'No surface area provided.'}, status=400)

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(email=request.data['email'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, email=request.data['email'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response("Logged out successfully!", status=status.HTTP_200_OK)

class HouseListCreateView(generics.ListCreateAPIView):
    serializer_class = HouseSerializer

    def get_queryset(self,request):
        queryset = House.objects.all()
        house_type = request.data['type']
        address = request.data['address']
        min_price = request.data['min']
        max_price = request.data['max']

        if house_type:
            queryset = queryset.filter(type=house_type)
        if address:
            queryset = queryset.filter(address__icontains=address)  # Case-insensitive search
        if house_type:
            queryset = queryset.filter(type=house_type)
        if address:
            queryset = queryset.filter(address__icontains=address)  # Case-insensitive search
        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)  # Greater than or equal to min_price
        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)

        return queryset
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
class HouseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = House.objects.all()
    serializer_class = HouseSerializer