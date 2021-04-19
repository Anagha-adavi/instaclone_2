from django.db import models
from users.models import *
from tags.models import Tag

# Create your models here.
class Post(models.Model):
    photo=models.ImageField(null=True,blank=True)
    location=models.CharField(max_length=20,null=True,blank=True)
    caption=models.CharField(max_length=100,null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    tags=models.ManyToManyField(Tag,blank=True,related_name='posts')

    def __str__(self):
        return self.user.username

class Like(models.Model):
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('user', 'post'),)

    def __str__(self):
        return '%s %s' % (self.post.caption, self.user.username)
