package com.example.task.mappers;

import com.example.task.models.tasks.Task;
import com.example.task.entities.TaskEntity;
import com.example.task.entities.UserEntity;

public class TaskMapper {

    public static Task toTask(TaskEntity entity) {
        return new Task(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getPriority(),
                entity.getStatus(),
                entity.getOwner().getId()
        );
    }

    public static TaskEntity toTaskEntity(Task task, UserEntity owner) {
        return new TaskEntity(
                task.ID(),
                task.title(),
                task.description(),
                task.priority(),
                task.status(),
                owner
        );
    }
}