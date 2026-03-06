from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # ইউজার রোল নির্ধারণের অপশন
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('instructor', 'Instructor'),
    )
    
    # ডাটাবেজে রোল সেভ করার ফিল্ড
    role = models.CharField(
        max_length=20, 
        choices=ROLE_CHOICES, 
        default='student'
    )
    
    @property
    def is_instructor(self):
        """ইউজার ইনস্ট্রাক্টর কি না তা চেক করার প্রপার্টি"""
        return self.role == 'instructor'

    def __str__(self):
        """অ্যাডমিন প্যানেলে ইউজারের নাম দেখানোর জন্য"""
        return self.username