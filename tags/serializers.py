from rest_framework import serializers
from .models import Tag
from posts.models import Post

# Used for adding posts for a particular tag
class PostTagSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields=['id','photo','location','caption','user']

class TagSerializer(serializers.ModelSerializer):

    posts=PostTagSerializer(many=True,read_only=True)

    class Meta:

        model=Tag 

        fields='__all__'

        