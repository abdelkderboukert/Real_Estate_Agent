from django.db import models

class House(models.Model):
    title = models.CharField(max_length=30)
    price = models.IntegerField(default=0)
    address = models.CharField(max_length=100)
    towne = models.CharField(max_length=100)
    type = models.CharField(max_length=25)


class HouseImage(models.Model):
    product = models.ForeignKey(House, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='house_images/', blank=True, null=True)  # Field for images

    def __str__(self):
        return f"Image for {self.product.address}"