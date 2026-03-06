from django.urls import path
from .views import EnrollView, MyCoursesView, MarkLessonCompleteView

urlpatterns = [
    path('enroll/', EnrollView.as_view()),
    path('my-courses/', MyCoursesView.as_view()),
    path('progress/', MarkLessonCompleteView.as_view()),
]
