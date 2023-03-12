package com.thesurvey.api.service;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserDto;
import com.thesurvey.api.repository.UserRepository;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByName(String name) {
        Optional<User> targetUser = userRepository.findByName(name);
        return targetUser.get();
    }

    public User save(UserDto userDto) {
        return userRepository.save(User.builder().
            name(userDto.getName()).
            build());
    }
}