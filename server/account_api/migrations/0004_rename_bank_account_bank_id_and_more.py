# Generated by Django 4.1.7 on 2023-02-25 20:16

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("account_api", "0003_rename_bank_id_account_bank_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="account",
            old_name="bank",
            new_name="bank_id",
        ),
        migrations.RenameField(
            model_name="account",
            old_name="company",
            new_name="company_id",
        ),
    ]