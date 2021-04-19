from django.shortcuts import render
from rest_framework import viewsets,permissions
from .serializers import TagSerializer
from .models import Tag
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

# Create your views here.
class TagViewSet(viewsets.ModelViewSet):
    queryset=Tag.objects.all()
    permission_classes=[
        permissions.IsAuthenticatedOrReadOnly
    ] 
    serializer_class=TagSerializer
    filter_backends=[DjangoFilterBackend,SearchFilter]
    filter_fields=['tagname']
    search_fields=['tagname']
