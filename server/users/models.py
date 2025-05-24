from django.db import models

class UserDetail(models.Model):
    # Basic Details
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('M','Male'),('F','Female'),('N','Prefer not to say')], blank=True)
    nationality = models.CharField(max_length=50, blank=True)
    marital_status = models.CharField(max_length=20, choices=[('SI','Single'),('MA','Married')], blank=True)
    # profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    profile_picture_url = models.URLField(blank=True)


    # Contact Information
    email = models.EmailField()
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    

    # Identification
    national_id_passport = models.CharField(max_length=20, blank=True)
    tax_id_number = models.CharField(max_length=20, blank=True)
    drivers_license = models.CharField(max_length=20, blank=True)


    password_hash = models.CharField(max_length=128)
    def check_password(self, password):
        from django.contrib.auth.hashers import check_password
        return check_password(password, self.password_hash)


    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Education(models.Model):
    user = models.ForeignKey(UserDetail, on_delete=models.CASCADE, related_name='education')
    high_school_name = models.CharField(max_length=100, blank=True)
    high_school_year = models.IntegerField(null=True, blank=True)
    university_name = models.CharField(max_length=100, blank=True)
    degree = models.CharField(max_length=100, blank=True)
    start_year = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)

class ProfessionalInformation(models.Model):
    user = models.ForeignKey(UserDetail, on_delete=models.CASCADE, related_name='professional_info')
    current_job = models.CharField(max_length=100, blank=True)
    job_title = models.CharField(max_length=100, blank=True)
    company_name = models.CharField(max_length=100, blank=True)
    employment_type = models.CharField(max_length=20, choices=[('FT','Full-time'),('PT','Part-time'),('CT','Contract')], blank=True)
    start_date = models.DateField(null=True, blank=True)

class NotificationSettings(models.Model):
    user = models.OneToOneField(UserDetail, on_delete=models.CASCADE, related_name='notification_settings')
    email_alerts = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    notification_frequency = models.CharField(max_length=10, choices=[('IM', 'Immediately'), ('DA', 'Daily'), ('WE', 'Weekly')], default='IM')
    notification_sound = models.CharField(max_length=50, blank=True)
    sound_mode = models.CharField(max_length=10, choices=[('SO', 'Sound'), ('VI', 'Vibrate'), ('SI', 'Silent')], default='SO')
    text_preview = models.BooleanField(default=True)
    media_preview = models.BooleanField(default=True)
    mute_all = models.BooleanField(default=False)
    message_tone = models.CharField(max_length=50, default='Default')
    group_message_tone = models.CharField(max_length=50, default='Default')

class ThemeSettings(models.Model):
    user = models.OneToOneField(UserDetail, on_delete=models.CASCADE, related_name='theme_settings')
    mode = models.CharField(max_length=10, choices=[('LI', 'Light'), ('DA', 'Dark')], default='LI')
    accent_color = models.CharField(max_length=20, choices=[('BL', 'Blue'), ('GR', 'Green'), ('PU', 'Purple'), ('RE', 'Red')], default='BL')
    font_style = models.CharField(max_length=20, choices=[('DE', 'Default'), ('SE', 'Serif'), ('MO', 'Monospace')], default='DE')
    high_contrast_mode = models.BooleanField(default=False)
    reduced_motion = models.BooleanField(default=False)

class PrivacySettings(models.Model):
    user = models.OneToOneField(UserDetail, on_delete=models.CASCADE, related_name='privacy_settings')
    profile_visibility = models.CharField(max_length=10, choices=[('PU', 'Public'), ('FR', 'Friends'), ('PR', 'Private')], default='PR')
    data_sharing_preference = models.BooleanField(default=False) 
