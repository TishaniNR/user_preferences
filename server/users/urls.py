from rest_framework.routers import DefaultRouter
from .views import UserDetailViewSet

router = DefaultRouter()
router.register(r'users', UserDetailViewSet)

urlpatterns = router.urls
