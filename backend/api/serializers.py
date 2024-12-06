from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']

class HouseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseImage
        fields = ['id', 'image']  # Include 'id' if you want to allow updates

class HouseSerializer(serializers.ModelSerializer):
    images = HouseImageSerializer(many=True, required=False)

    class Meta:
        model = House
        fields = ['id', 'title', 'price', 'address', 'towne', 'type', 'images']  # Include 'id' if needed

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        house = House.objects.create(**validated_data)
        for image_data in images_data:
            HouseImage.objects.create(product=house, **image_data)
        return house

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', [])
        instance.title = validated_data.get('title', instance.title)
        instance.price = validated_data.get('price', instance.price)
        instance.address = validated_data.get('address', instance.address)
        instance.towne = validated_data.get('towne', instance.towne)
        instance.type = validated_data.get('type', instance.type)
        instance.save()

        # Handle images
        if images_data:
            instance.images.all().delete()  # Optional: delete existing images
            for image_data in images_data:
                HouseImage.objects.create(product=instance, **image_data)
        
        return instance