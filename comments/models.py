from django.db import models
from users.models import User 
from posts.models import Post

# Create your models here.
class Comment(models.Model):
    comment_text=models.TextField()
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    post=models.ForeignKey(Post,on_delete=models.CASCADE,null=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username