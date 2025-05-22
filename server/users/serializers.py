from rest_framework import serializers
from .models import (
    UserDetail, Education, ProfessionalInformation,
    NotificationSettings, ThemeSettings, PrivacySettings
)

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}

class ProfessionalInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalInformation
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}

class NotificationSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationSettings
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}

class ThemeSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemeSettings
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}

class PrivacySettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacySettings
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}


class UserDetailSerializer(serializers.ModelSerializer):
    education = EducationSerializer(many=True, required=False)
    professional_info = ProfessionalInformationSerializer(many=True, required=False)
    notification_settings = NotificationSettingsSerializer(required=False)
    theme_settings = ThemeSettingsSerializer(required=False)
    privacy_settings = PrivacySettingsSerializer(required=False)

    class Meta:
        model = UserDetail
        fields = '__all__'

    def create(self, validated_data):
        education_data = validated_data.pop('education', [])
        professional_info_data = validated_data.pop('professional_info', [])
        notification_settings_data = validated_data.pop('notification_settings', None)
        theme_settings_data = validated_data.pop('theme_settings', None)
        privacy_settings_data = validated_data.pop('privacy_settings', None)

        user = UserDetail.objects.create(**validated_data)

        for edu in education_data:
            Education.objects.create(user=user, **edu)
        for prof in professional_info_data:
            ProfessionalInformation.objects.create(user=user, **prof)

        if notification_settings_data:
            NotificationSettings.objects.create(user=user, **notification_settings_data)
        if theme_settings_data:
            ThemeSettings.objects.create(user=user, **theme_settings_data)
        if privacy_settings_data:
            PrivacySettings.objects.create(user=user, **privacy_settings_data)

        return user

    def update(self, instance, validated_data):
        education_data = validated_data.pop('education', [])
        professional_info_data = validated_data.pop('professional_info', [])
        notification_settings_data = validated_data.pop('notification_settings', None)
        theme_settings_data = validated_data.pop('theme_settings', None)
        privacy_settings_data = validated_data.pop('privacy_settings', None)

        # Update UserDetail fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if education_data:
            instance.education.all().delete()
            for edu in education_data:
                Education.objects.create(user=instance, **edu)

        if professional_info_data:
            instance.professional_info.all().delete()
            for prof in professional_info_data:
                ProfessionalInformation.objects.create(user=instance, **prof)

        if notification_settings_data:
            notif, created = NotificationSettings.objects.get_or_create(user=instance)
            for attr, value in notification_settings_data.items():
                setattr(notif, attr, value)
            notif.save()

        if theme_settings_data:
            theme, created = ThemeSettings.objects.get_or_create(user=instance)
            for attr, value in theme_settings_data.items():
                setattr(theme, attr, value)
            theme.save()

        if privacy_settings_data:
            privacy, created = PrivacySettings.objects.get_or_create(user=instance)
            for attr, value in privacy_settings_data.items():
                setattr(privacy, attr, value)
            privacy.save()

        return instance
