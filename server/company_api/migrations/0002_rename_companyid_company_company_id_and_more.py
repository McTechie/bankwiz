# Generated by Django 4.1.7 on 2023-02-25 18:52

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("company_api", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="company",
            old_name="companyid",
            new_name="company_id",
        ),
        migrations.RenameField(
            model_name="company",
            old_name="companyname",
            new_name="company_name",
        ),
    ]
