# Generated by Django 4.2.21 on 2025-05-22 10:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=10)),
                ('nationality', models.CharField(blank=True, max_length=50)),
                ('marital_status', models.CharField(blank=True, max_length=20)),
                ('profile_picture_url', models.URLField(blank=True)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(blank=True, max_length=20)),
                ('alternate_phone', models.CharField(blank=True, max_length=20)),
                ('permanent_address', models.TextField(blank=True)),
                ('current_address', models.TextField(blank=True)),
                ('same_as_permanent', models.BooleanField(default=False)),
                ('emergency_contact', models.CharField(blank=True, max_length=100)),
                ('national_id_passport', models.CharField(blank=True, max_length=100)),
                ('tax_id_number', models.CharField(blank=True, max_length=100)),
                ('drivers_license', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ThemeSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mode', models.CharField(choices=[('LI', 'Light'), ('DA', 'Dark')], default='LI', max_length=10)),
                ('accent_color', models.CharField(choices=[('BL', 'Blue'), ('GR', 'Green'), ('PU', 'Purple'), ('RE', 'Red')], default='BL', max_length=20)),
                ('font_style', models.CharField(choices=[('DE', 'Default'), ('SE', 'Serif'), ('MO', 'Monospace')], default='DE', max_length=20)),
                ('high_contrast_mode', models.BooleanField(default=False)),
                ('reduced_motion', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='theme_settings', to='users.userdetail')),
            ],
        ),
        migrations.CreateModel(
            name='ProfessionalInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current_job', models.CharField(blank=True, max_length=100)),
                ('job_title', models.CharField(blank=True, max_length=100)),
                ('company_name', models.CharField(blank=True, max_length=100)),
                ('employment_type', models.CharField(blank=True, choices=[('FT', 'Full-time'), ('PT', 'Part-time'), ('CT', 'Contract')], max_length=20)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=100)),
                ('previous_job', models.CharField(blank=True, max_length=100)),
                ('previous_job_title', models.CharField(blank=True, max_length=100)),
                ('previous_company_name', models.CharField(blank=True, max_length=100)),
                ('duration', models.CharField(blank=True, max_length=50)),
                ('reason_for_leaving', models.TextField(blank=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='professional_info', to='users.userdetail')),
            ],
        ),
        migrations.CreateModel(
            name='PrivacySettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_visibility', models.CharField(choices=[('PU', 'Public'), ('FR', 'Friends'), ('PR', 'Private')], default='PR', max_length=10)),
                ('data_sharing_preference', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='privacy_settings', to='users.userdetail')),
            ],
        ),
        migrations.CreateModel(
            name='NotificationSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email_alerts', models.BooleanField(default=True)),
                ('push_notifications', models.BooleanField(default=True)),
                ('notification_frequency', models.CharField(choices=[('IM', 'Immediately'), ('DA', 'Daily'), ('WE', 'Weekly')], default='IM', max_length=10)),
                ('notification_sound', models.CharField(blank=True, max_length=50)),
                ('sound_mode', models.CharField(choices=[('SO', 'Sound'), ('VI', 'Vibrate'), ('SI', 'Silent')], default='SO', max_length=10)),
                ('text_preview', models.BooleanField(default=True)),
                ('media_preview', models.BooleanField(default=True)),
                ('mute_all', models.BooleanField(default=False)),
                ('message_tone', models.CharField(default='Default', max_length=50)),
                ('group_message_tone', models.CharField(default='Default', max_length=50)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='notification_settings', to='users.userdetail')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('high_school_name', models.CharField(blank=True, max_length=100)),
                ('high_school_year', models.IntegerField(blank=True, null=True)),
                ('university_name', models.CharField(blank=True, max_length=100)),
                ('degree', models.CharField(blank=True, max_length=100)),
                ('major', models.CharField(blank=True, max_length=100)),
                ('gpa', models.CharField(blank=True, max_length=10)),
                ('start_year', models.IntegerField(blank=True, null=True)),
                ('end_year', models.IntegerField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='education', to='users.userdetail')),
            ],
        ),
    ]
