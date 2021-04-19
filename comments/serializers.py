from rest_framework import serializers
from .models import Comment
from posts.models import Post
from users.serializers import UserCommentSerializer

#used for crud api
class CommentSerializer(serializers.ModelSerializer):
    post_id=serializers.IntegerField(write_only=True)
    user=UserCommentSerializer(many=False,read_only=True)

    class Meta:
        model=Comment
        fields='__all__'
        

    def create(self,validated_data):
        postid=validated_data.pop('post_id')
        post=Post.objects.get(id=postid)
        return Comment.objects.create(**validated_data,post=post)

#used for showing comments in post
class CommentPostSerializer(serializers.ModelSerializer):
    user=UserCommentSerializer(many=False,read_only=True)

    class Meta:
        model=Comment
        fields=['id','comment_text','created_at','user']
        
