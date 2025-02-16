package br.edu.utfpr.pb.pw44s.server.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressesDTO {

    private Long userId;

    private String street;
    private String number;
    private String neighborhood;
    private String city;
    private String country;
    private String state;
    private String postalCode;

}
