# Generated by Django 4.2.1 on 2023-07-09 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='history',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
