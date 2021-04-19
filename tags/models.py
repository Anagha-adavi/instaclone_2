from django.db import models

# Create your models here.
class Tag(models.Model):
    tagname=models.CharField(max_length=100)

    def __str__(self):
        return self.tagname
    
    class Meta:
        unique_together = (('tagname'),)