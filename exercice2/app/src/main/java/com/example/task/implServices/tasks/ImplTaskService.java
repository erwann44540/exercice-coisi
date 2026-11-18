package com.example.task.implServices.tasks;

import com.example.task.entities.TaskEntity;
import com.example.task.entities.UserEntity;
import com.example.task.mappers.TaskMapper;
import com.example.task.models.tasks.Task;
import com.example.task.repository.tasks.TaskRepository;
import com.example.task.repository.users.UserRepository;
import com.example.task.services.tasks.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplTaskService implements TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public ImplTaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Task createTask(Task task) {

        if(isEmptyFields(task)){
            throw new IllegalArgumentException("All required fields must be not empty");
        }

        if(!isValidPriority(task.priority())){
            throw new IllegalArgumentException("Invalid priority");
        }

        if(task.idOwner() == null){
            throw new IllegalArgumentException("Owner ID must be not empty");
        }

        if(!userRepository.existsById(task.idOwner())){
            throw new IllegalArgumentException("User not found");
        }

        UserEntity owner = userRepository.findById(task.idOwner()).get();

        Task newTask = new Task(
                null,
                task.title(),
                task.description(),
                task.priority(),
                "IN_PROGRESS",
                task.idOwner()
        );

        TaskEntity taskEntity = TaskMapper.toTaskEntity(newTask, owner);

        return TaskMapper.toTask(taskRepository.save(taskEntity));
    }

    private static boolean isEmptyFields(Task task) {
        return task == null || task.title() == null || task.title().isBlank()
                || task.priority() == null || task.priority().isBlank();
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toTask)
                .toList();
    }

    @Override
    public Task getTaskById(Long id) {
        if(id == null){
            throw new IllegalArgumentException("ID must be not empty");
        }

        if(!taskRepository.existsById(id)){
            throw new IllegalArgumentException("Task not found");
        }

        return TaskMapper.toTask(taskRepository.findById(id).get());
    }

    @Override
    public List<Task> getTasksByStatus(String status) {
        if(status == null || status.isBlank()){
            throw new IllegalArgumentException("Status must be not empty");
        }

        if(!isValidStatus(status)){
            throw new IllegalArgumentException("Invalid status");
        }

        return taskRepository.findByStatus(status)
                .stream()
                .map(TaskMapper::toTask)
                .toList();
    }

    @Override
    public Task updateTask(Long id, Task task) {
        if(id == null || task == null){
            throw new IllegalArgumentException("ID and task must be not empty");
        }

        if(!taskRepository.existsById(id)){
            throw new IllegalArgumentException("Task not found");
        }

        TaskEntity existingTask = taskRepository.findById(id).get();

        if(task.title() != null){
            if(task.title().isBlank()){
                throw new IllegalArgumentException("Title must be not empty");
            }

            existingTask.setTitle(task.title());
        }

        if(task.description() != null){
            existingTask.setDescription(task.description());
        }

        if(task.priority() != null){
            if(!isValidPriority(task.priority())){
                throw new IllegalArgumentException("Invalid priority");
            }

            existingTask.setPriority(task.priority());
        }

        if(task.status() != null){
            if(!isValidStatus(task.status())){
                throw new IllegalArgumentException("Invalid status");
            }

            existingTask.setStatus(task.status());
        }

        if(task.idOwner() != null){
            if(!userRepository.existsById(task.idOwner())){
                throw new IllegalArgumentException("User not found");
            }

            UserEntity owner = userRepository.findById(task.idOwner()).get();
            existingTask.setOwner(owner);
        }

        return TaskMapper.toTask(taskRepository.save(existingTask));
    }

    @Override
    public void deleteTask(Long id) {
        if(id == null){
            throw new IllegalArgumentException("ID must be not empty");
        }

        if(!taskRepository.existsById(id)){
            throw new IllegalArgumentException("Task not found");
        }

        taskRepository.deleteById(id);
    }

    private static boolean isValidPriority(String priority) {
        return "LOW".equals(priority) || "MEDIUM".equals(priority) || "HIGH".equals(priority);
    }

    private static boolean isValidStatus(String status) {
        return "IN_PROGRESS".equals(status) || "DONE".equals(status);
    }
}