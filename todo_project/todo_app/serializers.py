from rest_framework import serializers
from .models import Task, SubTask


from rest_framework import serializers
from .models import Task, SubTask

class SubTaskSerializer(serializers.ModelSerializer):
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all(), write_only=True)
    task_id = serializers.ReadOnlyField(source="task.id")

    class Meta:
        model = SubTask
        fields = ['id', 'title', 'completed', 'task', 'task_id']

class TaskSerializer(serializers.ModelSerializer):
    sub_tasks = SubTaskSerializer(many=True, read_only=True,source='subtasks')

    class Meta:
        model = Task
        fields = ['id', 'title', 'completed', 'deadline', 'sub_tasks']
