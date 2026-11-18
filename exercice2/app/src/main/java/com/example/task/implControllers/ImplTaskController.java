package com.example.task.implControllers.tasks;

import com.example.task.controllers.tasks.TaskController;
import com.example.task.models.tasks.Task;
import com.example.task.services.tasks.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ImplTaskController implements TaskController {

    private final TaskService taskService;

    public ImplTaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @Override
    public ResponseEntity<Task> create(@RequestBody Task task) {
        Task taskCreated = taskService.createTask(task);

        return ResponseEntity.status(HttpStatus.CREATED).body(taskCreated);
    }

    @GetMapping
    @Override
    public ResponseEntity<List<Task>> getAll(@RequestParam(value = "status", required = false) String status) {
        if(status != null){
            return ResponseEntity.ok(taskService.getTasksByStatus(status));
        }

        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Task> get(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PatchMapping("/{id}")
    @Override
    public ResponseEntity<Task> edit(@PathVariable Long id, @RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(id, task));
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.deleteTask(id);

        return ResponseEntity.noContent().build();
    }
}