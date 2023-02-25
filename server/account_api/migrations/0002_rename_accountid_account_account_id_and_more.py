# Generated by Django 4.1.7 on 2023-02-25 18:52

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("account_api", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="account",
            old_name="accountid",
            new_name="account_id",
        ),
        migrations.RenameField(
            model_name="account",
            old_name="accountname",
            new_name="account_name",
        ),
        migrations.RenameField(
            model_name="account",
            old_name="accountnumber",
            new_name="account_number",
        ),
        migrations.RenameField(
            model_name="account",
            old_name="bankid",
            new_name="bank_id",
        ),
        migrations.RenameField(
            model_name="account",
            old_name="branchcode",
            new_name="branch_code",
        ),
        migrations.RenameField(
            model_name="account",
            old_name="companyid",
            new_name="company_id",
        ),
        migrations.RenameField(
            model_name="account",
            old_name="creditlimit",
            new_name="credit_limit",
        ),
    ]
