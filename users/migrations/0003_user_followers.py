# Generated by Django 3.1.1 on 2020-10-15 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='followers',
            field=models.ManyToManyField(blank=True, null=True, related_name='_user_followers_+', to='users.User'),
        ),
    ]