from rest_framework import serializers 
from .models import *
# from posts.serializers import PostUserSerializer

#user for normal crud api
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User 
        fields=['id','username','email','firstname','lastname','profilepic','bio']

#used for adding user serializer to comments
class UserCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=User 
        fields=['id','username','profilepic']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model=Follow
        fields='__all__'
        depth=1

