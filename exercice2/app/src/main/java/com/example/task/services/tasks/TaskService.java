package com.example.task.services.tasks;

import com.example.task.models.tasks.Task;
import java.util.List;

public interface TaskService {
    Task createTask(Task task);

    List<Task> getAllTasks();
    Task getTaskById(Long id);
    List<Task> getTasksByStatus(String status);

    Task updateTask(Long id, Task task);

    void deleteTask(Long id);
}