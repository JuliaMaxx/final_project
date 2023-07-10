from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import User, Workout
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

def index(request):
    return render(request, 'workout/index.html')


def ratio(request, work, rest):
    return render(request, 'workout/time.html', {'work':work, 'rest':rest})


def time(request, work, rest, time):
    return render(request, "workout/music.html", {'work':work, 'rest':rest, 'time':time})


def player(request, work, rest, time, music_id):
    return render(request, 'workout/player.html', {'id':music_id, 'work':work, 'rest':rest, 'time':time})


@csrf_exempt
@login_required
def history(request):
    if request.method == "POST":
        # get the data via json
        data = json.loads(request.body)
        # get the workout from the data
        workout = data.get('workout', '')
        # get the user by id
        user = User.objects.get(pk = request.user.id)
        # create new workout
        workout = Workout(user=user, workout=workout)
        # save the workout
        workout.save()
        return JsonResponse({"message": "Workout added successfully."}, status=201)
    

@login_required
def history_display(request):
    # get the user by id
    user = User.objects.get(pk= request.user.id)
    # get all the workouts in user's history
    history = user.history.all()
    return render(request, 'workout/history.html', {'history':history})


def login_view(request):
    if request.method == "POST":

        # attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # check if authentication successful
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
    # log the user out
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        # display an error if form is submitted with one or more empty fields
        if not request.POST["username"] or not request.POST["password"] or not request.POST["confirmation"]:
             return render(request, "workout/register.html", {
                "message": "All the required information must be provided."
            })
        username = request.POST["username"]

        # ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "workout/register.html", {
                "message": "Passwords must match."
            })

        # attempt to create new user
        try:
            user = User.objects.create_user(username,password)
            user.save()
        except IntegrityError:
            return render(request, "workout/register.html", {
                "message": "Username already taken."
            })
        # log the user in
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "workout/register.html")