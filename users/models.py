from django.db import models
from django.contrib.auth.models import User as SysUser

# Create your models here.
class User(models.Model):
    username=models.CharField(max_length=100)
    email=models.EmailField(max_length=100)
    firstname=models.CharField(max_length=100,null=True,blank=True)
    lastname=models.CharField(max_length=100,null=True,blank=True)
    profilepic=models.ImageField(default='default.jpg')
    bio=models.TextField(null=True,blank=True)
    user=models.OneToOneField(SysUser,on_delete=models.CASCADE,null=True,blank=True)
    # followers=models.ManyToManyField('self',null=True,blank=True)

    def __str__(self):
        return self.username

class Follow(models.Model):
    follower=models.ForeignKey(User,on_delete=models.CASCADE,related_name='follower')
    followee=models.ForeignKey(User,on_delete=models.CASCADE,related_name='followee')

    class Meta:
        unique_together = (('follower', 'followee'),)
    
    def __str__(self):
        return '%s is followed by %s' % (self.followee.username, self.follower.username)