"""
URL configuration for ws project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from ws.views import (
    AbilityViewSet,
    AttributeViewSet,
    CardViewSet,
    ChangePasswordView,
    DeckViewSet,
    MyObtainTokenPairView,
    NeoViewSet,
    RegisterView,
    SetViewSet,
    UserViewSet,
)

router = DefaultRouter()

router.register(r"cards", CardViewSet, basename="cards")
router.register(r"abilities", AbilityViewSet, basename="abitlities")
router.register(r"attributes", AttributeViewSet, basename="attributes")
router.register(r"neos", NeoViewSet, basename="neos")
router.register(r"sets", SetViewSet, basename="sets")
router.register(r"decks", DeckViewSet, basename="decks")
router.register(r"users", UserViewSet, basename="users")

login_urls = [
    path("login/", MyObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="auth_register"),
    path(
        "change_password/<int:pk>/",
        ChangePasswordView.as_view(),
        name="auth_change_password",
    ),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include(login_urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("", include(router.urls)),
]
