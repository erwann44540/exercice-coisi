package com.example.task.models.tasks;

public record Task(
    Long ID,
    String title,
    String description,
    String priority,
    String status,
    Long idOwner
) {}
