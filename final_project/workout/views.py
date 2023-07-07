from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import User
from django.db import IntegrityError

def index(request):
    return render(request, 'workout/index.html')

def ratio(request, work, rest):
    return render(request, 'workout/time.html')

def time(request, time):
    return render(request, "workout/music.html")

def player(request, music_id, music_type):
    return render(request, 'workout/player.html', {'id':music_id, 'type':music_type})

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "workout/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "workout/login.html")
    
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        if not request.POST["username"] or not request.POST["password"] or not request.POST["confirmation"]:
             return render(request, "workout/register.html", {
                "message": "All the required information must be provided."
            })
        username = request.POST["username"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "workout/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username,password)
            user.save()
        except IntegrityError:
            return render(request, "workout/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "workout/register.html")