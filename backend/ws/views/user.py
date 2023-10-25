from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ws.models import User
from ws.permissions import IsAdmin
from ws.serializers import UserSerializer
from .mixins import PermissionsByActionMixin


class UserViewSet(PermissionsByActionMixin, viewsets.ModelViewSet):
    permission_classes = [IsAdmin]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    permission_classes_by_action = {
        "list": [permissions.IsAuthenticated],
        "retrieve": [permissions.IsAuthenticated],
        "me": [permissions.IsAuthenticated],
    }

    @action(detail=False)
    def me(self, request, pk=None):
        return Response(
            UserSerializer(request.user, many=False).data, status=status.HTTP_200_OK
        )
