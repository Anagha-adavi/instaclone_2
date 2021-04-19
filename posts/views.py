from django.shortcuts import render
from .models import Post,Like
from .serializers import PostSerializer
from rest_framework import viewsets,permissions
from rest_framework.parsers import MultiPartParser,FormParser,JSONParser
from users.models import *
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.decorators import action
from tags.models import Tag

# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
    queryset=Post.objects.all()
    serializer_class=PostSerializer
    permission_classes=[
        permissions.IsAuthenticatedOrReadOnly
    ]
    parser_classes=[MultiPartParser,FormParser,JSONParser]

    #Used to rewrite the create method to add tags
    def create(self,request,*args,**kwargs):
        data=request.data
        userid=self.request.user.user.id
        user=User.objects.get(id=userid)
        post=Post.objects.create(photo=data["photo"],location=data["location"],caption=data["caption"],user=user)
        post.save()
        if data['tags']!='':
            tagid=int(data['tags'])
            tagobj=Tag.objects.get(id=tagid)
            post.tags.add(tagobj)
        serializer=PostSerializer(post,many=False)
        return Response(serializer.data)
    

    #Like a post
    @action(methods=['POST'], detail=True, permission_classes=[permissions.IsAuthenticatedOrReadOnly])
    def likepost(self,request,pk=None):
        postid=pk
        post=Post.objects.get(id=postid)
        Like.objects.create(user=request.user.user,post=post)
        return Response({'status':'success'})
    
    #Unlike a post
    @action(methods=['POST'], detail=True, permission_classes=[permissions.IsAuthenticatedOrReadOnly])
    def unlikepost(self,request,pk=None):
        postid=pk
        post=Post.objects.get(id=postid)
        like=Like.objects.get(user=request.user.user,post=post)
        print(like)
        like.delete()
        return Response({'status':'success'})

    def perform_create(self,serializer): 
        userid=self.request.user.user.id
        user=User.objects.get(id=userid)
        serializer.save(user=user)

    #Update a post
    def perform_update(self,serializer):
        createduserid=self.get_object().user.id
        updatinguserid=self.request.user.user.id
        if createduserid==updatinguserid:
            instance=serializer.save()
        else: 
            raise APIException("Your are not authorized")
        
    #Delete a post
    def destroy(self,request,*args,**kwargs):
        createduserid=self.get_object().user.id
        updatinguserid=self.request.user.user.id
        if createduserid==updatinguserid:
            instance=self.get_object()
            self.perform_destroy(instance)
            return Response({'status':'Deleted'})
        else:
            raise APIException("Your are not authorized")

    @action(methods=['GET'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def userfollowingposts(self,request):
        followeruser=request.user.user
        followeeusers=Follow.objects.filter(follower=followeruser)
        followeelist=[]
        for followee in followeeusers:
            followeelist.append(followee.followee)
        posts=Post.objects.filter(user__in=followeelist)
        postserializer=PostSerializer(posts,many=True)
        return Response({'length':len(postserializer.data),'data':postserializer.data})