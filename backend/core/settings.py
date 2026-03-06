import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
from datetime import timedelta
from pathlib import Path

# ১. বেস ডিরেক্টরি এবং সিকিউরিটি সেটিংস
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-your-very-long-secret-key-here'
DEBUG = True
ALLOWED_HOSTS = ['*']

# ২. অ্যাপ এবং ইউজার মডেল সেটিংস
AUTH_USER_MODEL = 'accounts.User'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    
    # Your custom apps
    'accounts',
    'courses',
    'enrollments',
]

# ৩. মিডলওয়্যার (সঠিক ক্রমানুসারে)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # অবশ্যই সবার উপরে থাকবে
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

# ৪. টেম্পলেট কনফিগারেশন
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# ৫. ডাটাবেস সেটিংস
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ৬. পাসওয়ার্ড ভ্যালিডেশন
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# ৭. ভাষা এবং সময়
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ৮. এপিআই এবং সিকিউরিটি সেটিংস
# settings.py
CORS_ALLOW_ALL_ORIGINS = True  # ডেভেলপমেন্টের জন্য এটি সহজ সমাধান

# অথবা নির্দিষ্ট করে দিলে:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
# এখানে বড় পরিবর্তনটি করা হয়েছে:
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny', # এটি ইউজারকে সাইন-আপ করতে বাধা দিবে না
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
}

# ৯. স্ট্যাটিক এবং মিডিয়া ফাইল সেটিংস
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'