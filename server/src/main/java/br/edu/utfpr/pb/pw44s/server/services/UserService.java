package br.edu.utfpr.pb.pw44s.server.services;


import br.edu.utfpr.pb.pw44s.server.dto.UserDTO;
import br.edu.utfpr.pb.pw44s.server.entity.UserEntity;
import br.edu.utfpr.pb.pw44s.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void create(UserDTO userDTO) {
        parameterValidation(userDTO);
        userRepository.save(UserEntity.builder()
                .username(userDTO.getUsername())
                .displayName(userDTO.getDisplayName())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .build());
    }

    private void parameterValidation(UserDTO userDTO) {
        emailValidation(userDTO.getEmail());
        userNameValidation(userDTO.getUsername());
    }

    private void emailValidation(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            throw new IllegalArgumentException("E-mail já está em uso: " + email);
        });
    }

    private void userNameValidation(String username) {
        userRepository.findByUsername(username).ifPresent(user -> {
            throw new IllegalArgumentException("Nome de usuário já está em uso: " + username);
        });
    }

    public UserEntity getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário com ID " + userId + " não encontrado."));
    }


}
