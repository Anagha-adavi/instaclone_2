from django.shortcuts import render
from .models import Comment
from .serializers import *
from rest_framework import viewsets,permissions
from rest_framework.exceptions import APIException
from rest_framework.response import Response

# Create your views here.
class CommentViewSet(viewsets.ModelViewSet):
    queryset=Comment.objects.all()
    serializer_class=CommentSerializer
    permission_classes=[
        permissions.IsAuthenticatedOrReadOnly
    ]

    def perform_create(self,serializer):
        user=self.request.user.user
        serializer.save(user=user)

    def destroy(self,request,*args,**kwargs):
        createduserid=self.get_object().user.id
        updatinguserid=self.request.user.user.id
        if createduserid==updatinguserid:
            instance=self.get_object()
            self.perform_destroy(instance)
            return Response({'status':'Deleted'})
        else:
            raise APIException("Your are not authorized")