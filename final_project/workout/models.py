from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


class Workout(models.Model):
    user =  models.ForeignKey(User, on_delete=models.CASCADE, related_name='history')
    date =  models.DateField(auto_now_add=True)
    workout = models.CharField(max_length=200)
    def __str__(self):
        return f"Did {self.workout} on {self.date}"
