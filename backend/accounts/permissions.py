from rest_framework import permissions

class IsInstructor(permissions.BasePermission):
    """
    শুধুমাত্র ইন্সট্রাক্টরদের জন্য অনুমতি প্রদান করে।
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_instructor)