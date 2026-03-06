from rest_framework import generics
from .models import Course, Lesson
from .serializers import CourseSerializer, LessonSerializer

# সব কোর্সের লিস্ট পাঠানোর জন্য (ড্যাশবোর্ডের জন্য)
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# একটি নির্দিষ্ট কোর্সের সব তথ্য এবং তার লেসন পাঠানোর জন্য
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# সব লেসনের লিস্ট পাঠানোর জন্য
class LessonListView(generics.ListAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer