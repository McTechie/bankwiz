# Generated by Django 4.1.7 on 2023-02-25 20:16

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("user_api", "0004_rename_company_id_user_company"),
    ]

    operations = [
        migrations.RenameField(
            model_name="user",
            old_name="company",
            new_name="company_id",
        ),
    ]
