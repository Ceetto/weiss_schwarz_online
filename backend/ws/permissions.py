from typing import Union

from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions

from ws.models import User


def user_is_admin(user: Union[AnonymousUser, User]) -> bool:
    return hasattr(user, "is_admin") and user.is_admin


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return user_is_admin(request.user)
