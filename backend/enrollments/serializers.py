from rest_framework import serializers
from .models import Enrollment, LessonProgress
from courses.serializers import CourseSerializer

class EnrollmentSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True)
    course_title = serializers.ReadOnlyField(source='course.title')

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'course_title', 'course_details', 'enrolled_at']
        read_only_fields = ['student']

class LessonProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonProgress
        fields = ['id', 'student', 'lesson', 'completed']
        read_only_fields = ['student']