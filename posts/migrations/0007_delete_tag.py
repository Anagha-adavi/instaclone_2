# Generated by Django 3.1.1 on 2020-10-16 05:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_tag'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Tag',
        ),
    ]