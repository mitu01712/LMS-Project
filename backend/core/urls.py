from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # এপিআই এন্ডপয়েন্টগুলো
    path('api/', include('accounts.urls')),
    path('api/', include('courses.urls')),
    path('api/', include('enrollments.urls')),

    # JWT টোকেন এন্ডপয়েন্ট
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# মিডিয়া এবং স্ট্যাটিক ফাইলগুলো সার্ভ করার জন্য এটি নিশ্চিত করুন
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)