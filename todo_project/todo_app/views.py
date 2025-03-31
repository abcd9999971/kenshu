from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Task, SubTask
from .serializers import TaskSerializer, SubTaskSerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import render

"""
class SetCompletedMixin:
    @action(detail=True, methods=['patch'])
    def set_completed(obj):
        obj.completed = True
        obj.save()
        return Response({'status': f'{obj.__class__.__name__} completed'})
"""



class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('created_at')
    serializer_class = TaskSerializer
    

    def mark_as_completed(self, obj):
        obj.completed = not obj.completed
        obj.save()
        return Response({'status': f'{obj.__class__.__name__} completed'})

    @action(detail=True, methods=['patch'], url_path=r'completed(?:/(?P<subtask_pk>\d+))?')
    def completed(self, request, pk, subtask_pk=None):
        task = self.get_object()
        if subtask_pk:
            try:
                subtask = task.subtasks.get(pk=subtask_pk)
            except SubTask.DoesNotExist:
                return Response({'error': 'SubTask not found'}, status=404)
            return self.mark_as_completed(subtask)
        else:
            return self.mark_as_completed(task)

    @action(detail=True, methods=['post'])
    def add_subtask(self, request, pk):
        request.data['task'] = pk
        serializer = SubTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='delete_subtask/(?P<subtask_pk>\d+)')
    def delete_subtask(self, request, pk, subtask_pk):
        task = self.get_object()
        subtask = task.subtasks.get(pk=subtask_pk) 
        subtask.delete()
        return Response({'status': 'Subtask deleted'})

    @action(detail=False, methods=['get'])
    def search(self, request):
        key = request.query_params.get('key', '')
        tasks = Task.objects.filter(title__contains=key)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



""" TASKにまとめました
class SubTaskViewSet(SetCompletedMixin, viewsets.ModelViewSet):
    queryset = SubTask.objects.all().order_by('id')
    serializer_class = SubTaskSerializer

    def create(self, request):
        
        id = request.data['task_id']
        sub_task = SubTask.objects.create(
            title=request.data['title'],
            task=id
        )
        serializer = SubTaskSerializer(sub_task)
        return Response(serializer.data)
"""
