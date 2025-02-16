package br.edu.utfpr.pb.pw44s.server.services;

import br.edu.utfpr.pb.pw44s.server.dto.AddressesDTO;
import br.edu.utfpr.pb.pw44s.server.entity.AddressesEntity;
import br.edu.utfpr.pb.pw44s.server.entity.UserEntity;
import br.edu.utfpr.pb.pw44s.server.repository.AddressesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressesService {

    private final AddressesRepository addressesRepository;
    private final UserService userService;

    public AddressesEntity create(AddressesDTO addressesDTO) {
        UserEntity user = userService.getUserById(addressesDTO.getUserId());

        return addressesRepository.save(AddressesEntity.builder()
                .userEntity(user)
                .street(addressesDTO.getStreet())
                .number(addressesDTO.getNumber())
                .neighborhood(addressesDTO.getNeighborhood())
                .city(addressesDTO.getCity())
                .country(addressesDTO.getCountry())
                .state(addressesDTO.getState())
                .postalCode(addressesDTO.getPostalCode())
                .build());
    }

    public List<AddressesEntity> findAllByUserId(Long userId) {
        userService.getUserById(userId);
        return addressesRepository.findAllByUserEntityId(userId);
    }

}
