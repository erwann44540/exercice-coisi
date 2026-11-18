package com.example.task.config;

import com.example.task.entities.UserEntity;
import com.example.task.repository.users.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {

            if(userRepository.findByName("TestUser").isEmpty()){
                UserEntity user = new UserEntity(
                        null,
                        "TestUser",
                        "test123"
                );

                userRepository.save(user);
            }
        };
    }
}