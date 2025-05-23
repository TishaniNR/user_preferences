from rest_framework.routers import DefaultRouter
from .views import UserDetailViewSet
from django.urls import path
from .views import UserDetailViewSet,signup,login

router = DefaultRouter()
router.register(r'users', UserDetailViewSet)

urlpatterns = router.urls

urlpatterns+= [
    path('signup/', signup, name='signup'),
    path("login/", login, name="login")

]
