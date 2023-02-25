# Generated by Django 4.1.7 on 2023-02-25 20:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("transaction_api", "0002_rename_accountid_transaction_account_id_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="transaction",
            old_name="account_id",
            new_name="account",
        ),
        migrations.RenameField(
            model_name="transaction",
            old_name="bank_id",
            new_name="bank",
        ),
        migrations.RenameField(
            model_name="transaction",
            old_name="company_id",
            new_name="company",
        ),
        migrations.RenameField(
            model_name="transaction",
            old_name="user_id",
            new_name="user",
        ),
        migrations.RemoveField(
            model_name="transaction",
            name="timestamp",
        ),
        migrations.AddField(
            model_name="transaction",
            name="date",
            field=models.DateField(auto_now_add=True, default=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="transaction",
            name="time",
            field=models.TimeField(auto_now_add=True, default=None),
            preserve_default=False,
        ),
    ]