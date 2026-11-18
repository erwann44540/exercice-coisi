package com.example.task.controllers.tasks;

import com.example.task.models.tasks.Task;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TaskController {
    public ResponseEntity<Task> create(Task task);
    public ResponseEntity<List<Task>> getAll(String status);
    public ResponseEntity<Task> get(Long id);
    public ResponseEntity<Task> edit(Long id, Task task);
    public ResponseEntity<Void> delete(Long id);
}