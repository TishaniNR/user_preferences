from rest_framework import viewsets
from .models import UserDetail
from .serializers import UserDetailSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
import json

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            if UserDetail.objects.filter(email=data['email']).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)  
            user = UserDetail.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                password_hash=make_password(data['password'])
            )
            return JsonResponse({'message': 'User created successfully', 'user_id': user.id}, status=201)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = UserDetail.objects.get(email=data['email'])
            if user.check_password(data['password']):
                return JsonResponse({'message': 'Login successful', 'user_id': user.id}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        except UserDetail.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

class UserDetailViewSet(viewsets.ModelViewSet):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailSerializer
