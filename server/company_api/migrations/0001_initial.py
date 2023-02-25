# Generated by Django 4.1.7 on 2023-02-25 11:01

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Company",
            fields=[
                (
                    "compid",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("compname", models.CharField(max_length=200)),
                ("hqlocation", models.CharField(blank=True, max_length=500, null=True)),
                ("pan", models.CharField(max_length=10, unique=True)),
                ("gstin", models.CharField(max_length=15, unique=True)),
                ("hqpincode", models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]
