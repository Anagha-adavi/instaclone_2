from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *
from django.contrib.auth.models import User as SysUser

@receiver(post_save,sender=SysUser)
def user_profile(sender,instance,created,**kwargs):
    if created:
        User.objects.create(
            username=instance.username,
            email=instance.email,
            user=instance
        )