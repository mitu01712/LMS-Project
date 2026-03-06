# admin.py
from django.contrib import admin
from .models import Course, Lesson, Enrollment # এখন Enrollment খুঁজে পাবে

class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    # instructor এর জায়গায় instructor_name থাকলে সেটি models.py অনুযায়ী চেক করুন
    list_display = ('title', 'instructor', 'created_at') 
    search_fields = ('title',) 
    inlines = [LessonInline]

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'enrolled_at')
    list_filter = ('course', 'enrolled_at')

admin.site.register(Lesson)