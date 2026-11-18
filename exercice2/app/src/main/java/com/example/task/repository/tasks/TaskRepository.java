package com.example.task.repository.tasks;

import com.example.task.entities.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    List<TaskEntity> findByStatus(String status);

    List<TaskEntity> findByOwnerId(Long ownerId);
}