from rest_framework import generics
from .models import Enrollment, LessonProgress
from .serializers import EnrollmentSerializer, LessonProgressSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from courses.models import Lesson

class EnrollView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]


class MyCoursesView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user)


class MarkLessonCompleteView(generics.CreateAPIView):
    serializer_class = LessonProgressSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        lesson_id = request.data.get('lesson')
        lesson = Lesson.objects.get(id=lesson_id)

        progress, created = LessonProgress.objects.get_or_create(
            student=request.user,
            lesson=lesson
        )
        progress.completed = True
        progress.save()

        return Response({"message": "Lesson marked as complete"})
