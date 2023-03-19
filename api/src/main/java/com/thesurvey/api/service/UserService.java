package com.thesurvey.api.service;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserDto;
import com.thesurvey.api.dto.UserInfoDto;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.UserMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserInfoDto getUserByName(String name) {
        // FIXME: exception handling
        return userMapper.toUserInfoDto(userRepository.findByName(name))
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public UserInfoDto getUserByEmail(String email) {
        // FIXME: exception handling
        return userMapper.toUserInfoDto(userRepository.findByEmail(email))
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Transactional
    public List<UserDto> getAllUsersWithAnsweredQuestion() {
        List<User> allUsersList = userRepository.findAll();

        // FIXME: ArrayList to stream or something else
        List<UserDto> userDtoList = new ArrayList<>();
        for (User user : allUsersList) {
            UserDto userDto = userMapper.toUserDto(user);
            userDtoList.add(userDto);
        }
        return userDtoList;
    }
}
