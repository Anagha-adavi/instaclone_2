from rest_framework import serializers
from .models import *
from users.models import User 
from comments.serializers import CommentPostSerializer
from users.serializers import UserSerializer
from tags.serializers import TagSerializer

class LikeSerializer(serializers.ModelSerializer):
    user=UserSerializer(many=False,read_only=True)
    class Meta:
        model=Like
        fields='__all__'

class PostSerializer(serializers.ModelSerializer):
    comments = CommentPostSerializer(many=True,read_only=True,source='comment_set')
    likes=LikeSerializer(many=True,read_only=True,source='like_set')
    # tags=TagSerializer(many=True,read_only=True)

    class Meta:
        model=Post
        fields='__all__'
        depth=1

    def create(self,validated_data):
        return Post.objects.create(**validated_data)

#used to get all posts for a single user on their profile page
class PostUserSerializer(serializers.ModelSerializer):
    likes=LikeSerializer(many=True,read_only=True,source='like_set')
    class Meta:
        model=Post
        fields='__all__'

    def create(self,validated_data):
        return Post.objects.create(**validated_data)

