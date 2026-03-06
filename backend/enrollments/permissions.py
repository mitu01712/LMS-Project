from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    অবজেক্টের মালিককে (Student) এডিট করার অনুমতি দেয়, অন্যদের শুধু দেখার।
    """
    def has_object_permission(self, request, view, obj):
        # GET, HEAD, OPTIONS রিকোয়েস্ট সবার জন্য
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # এনরোলমেন্ট বা প্রগ্রেসের ক্ষেত্রে স্টুডেন্ট নিজেই মালিক কি না চেক করা
        return obj.student == request.user