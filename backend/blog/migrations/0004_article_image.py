# Generated by Django 5.0.1 on 2024-01-19 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_rename_description_article_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='image',
            field=models.URLField(default='image'),
            preserve_default=False,
        ),
    ]
