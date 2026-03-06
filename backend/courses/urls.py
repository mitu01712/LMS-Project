from django.urls import path
from .views import CourseListView, CourseDetailView, LessonListView

urlpatterns = [
    path('courses/', CourseListView.as_view(), name='course-list'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('lessons/', LessonListView.as_view(), name='lesson-list'),
]