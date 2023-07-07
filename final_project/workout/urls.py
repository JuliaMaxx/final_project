from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("ratio/<int:work>/<int:rest>", views.ratio, name="ratio"),
    path("time/<int:time>", views.time, name="time"),
    path("player/<str:video_id>", views.player, name='player'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
]