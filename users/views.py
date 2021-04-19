from django.shortcuts import render
from rest_framework import viewsets,permissions
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser,FormParser,JSONParser
from rest_framework.exceptions import APIException
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from posts.models import Post
from posts.serializers import PostUserSerializer

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    permission_classes=[
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class=UserSerializer
    parser_classes=[MultiPartParser,FormParser,JSONParser]
    filter_backends=[DjangoFilterBackend,SearchFilter]
    search_fields=['username']

    #get posts and followers for a profile 
    @action(methods=['GET'], detail=True)
    def getprofilepostsandfollowers(self, request, pk=None):
        posts=Post.objects.filter(user=pk)
        postserializer=PostUserSerializer(posts,many=True)
        follow=Follow.objects.filter(followee=pk)
        followserializer=FollowSerializer(follow,many=True)
        return Response({'posts':postserializer.data,'followers':len(followserializer.data)})

    #get profile for the logged in user
    @action(methods=['GET'], detail=False,permission_classes=[permissions.IsAuthenticated])
    def getloggedinprofile(self, request, pk=None):
        user=request.user.user
        userserializer=UserSerializer(user,many=False)
        posts=Post.objects.filter(user=user)
        postserializer=PostUserSerializer(posts,many=True)
        follow=Follow.objects.filter(followee=user)
        followserializer=FollowSerializer(follow,many=True)
        return Response({'user':userserializer.data,'posts':postserializer.data,'followers':len(followserializer.data)})

    #used to update profile data of logged in user
    def perform_update(self,serializer):
        createduserid=self.get_object().id
        updatinguserid=self.request.user.user.id
        if createduserid==updatinguserid:
            instance=serializer.save()
        else: 
            raise APIException("Your are not authorized")

    #used to follow a profile
    @action(methods=['POST'], detail=True,permission_classes=[permissions.IsAuthenticated])
    def follow(self, request, pk=None):
        userfollowee=User.objects.get(id=pk)
        follow=Follow.objects.create(follower=request.user.user,followee=userfollowee)
        followserializer=FollowSerializer(follow,many=False)
        return Response(followserializer.data)

    #used to unfollow a profile
    @action(methods=['POST'], detail=True,permission_classes=[permissions.IsAuthenticated])
    def unfollow(self, request, pk=None):
        userfollowee=User.objects.get(id=pk)
        follow=Follow.objects.get(follower=request.user.user,followee=userfollowee)
        follow.delete()
        return Response('unfollowed')

    # used to get all followers of a logged in user
    @action(methods=['GET'], detail=False,permission_classes=[permissions.IsAuthenticated])
    def getfollowers(self,request,pk=None):
        userid=self.request.user.user.id
        followee=Follow.objects.filter(followee=userid)
        followserializer=FollowSerializer(followee,many=True)
        return Response(followserializer.data)

    #used to get all followers of other user

    @action(methods=['GET'], detail=True,permission_classes=[permissions.IsAuthenticated])
    def getotheruserfollowers(self,request,pk=None):
        userid=pk
        followee=Follow.objects.filter(followee=userid)
        followserializer=FollowSerializer(followee,many=True)
        return Response(followserializer.data)