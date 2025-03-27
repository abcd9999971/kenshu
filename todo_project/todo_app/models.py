from django.db import models

# Create your models here.


class Task(models.Model):

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, blank=False)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['created_at']


class SubTask(models.Model):

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, blank=False)
    completed = models.BooleanField(default=False)
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name='subtasks'
    )
    # add related name

    class Meta:
        ordering = ['id']
