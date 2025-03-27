from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Task, SubTask
from .serializers import TaskSerializer, SubTaskSerializer

from rest_framework.decorators import action
from rest_framework.response import Response

from django.shortcuts import render

class SetCompletedMixin:
    @action(detail=True, methods=['post'])
    def set_completed(self, request, pk):
        obj = self.get_object()
        obj.completed = True
        obj.save()
        return Response({'status': f'{obj.__class__.__name__} completed'})



class TaskViewSet(SetCompletedMixin, viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('created_at')
    serializer_class = TaskSerializer
    

    def add_subtask(self, request, pk):
        task = self.get_object()
        serializer = SubTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(task=task)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubTaskViewSet(SetCompletedMixin, viewsets.ModelViewSet):
    queryset = SubTask.objects.all().order_by('id')
    serializer_class = SubTaskSerializer
