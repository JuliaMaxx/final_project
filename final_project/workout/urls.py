from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("ratio/<int:work>/<int:rest>", views.ratio, name="ratio"),
    path("<int:work>/<int:rest>/<int:time>", views.time, name="time"),
    path("<int:work>/<int:rest>/<int:time>/<str:type>/<path:music_id>", views.player, name='player'),
    path("history", views.history, name="history"),
    path("history_display", views.history_display, name="user_history"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
]