package com.thesurvey.api.service;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserDto;
import com.thesurvey.api.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto getUserByName(String name) {
        Optional<User> targetUser = userRepository.findByName(name);
        UserDto targetUserDto = UserDto.builder().name(targetUser.get().getName()).build();
        return targetUserDto;
    }

    public UserDto getUserByEmail(String email) {
        Optional<User> targetUser = userRepository.findByEmail(email);
        UserDto targetUserDto = new UserDto(targetUser.get());
        return targetUserDto;
    }

    public User join(UserDto userDto) {
        User newUser = userDto.toEntity();
        return userRepository.save(newUser);
    }

    public List<UserDto> getAllUsersWithAnsweredQuestion() {
        List<User> allUsersList = userRepository.findAll();
        List<UserDto> userDtoList = new ArrayList<>();
        for (User user : allUsersList) {
            userDtoList.add(
                new UserDto().builder().name(user.getName()).email(user.getEmail()).build());
        }
        return userDtoList;
    }
}
