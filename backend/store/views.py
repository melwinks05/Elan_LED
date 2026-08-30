from django.http import JsonResponse

def home(request):
  data = {
    'message': "Welcome to ELAN LED store!"
  }
  return JsonResponse(data)