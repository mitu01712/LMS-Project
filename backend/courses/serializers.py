from rest_framework import serializers
from .models import Course, Lesson

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    # 'lessons' নামটি আপনার Lesson মডেলের ForeignKey-এর related_name এর সাথে মিল থাকতে হবে
    lessons = LessonSerializer(many=True, read_only=True)
    
    # ইনস্ট্রাক্টরের আইডি না দেখিয়ে নাম দেখানোর জন্য
    instructor_name = serializers.ReadOnlyField(source='instructor.username')

    class Meta:
        model = Course
        fields = [
            'id', 
            'title', 
            'description', 
            'thumbnail', 
            'instructor', 
            'instructor_name', 
            'lessons', 
            'created_at'
        ]