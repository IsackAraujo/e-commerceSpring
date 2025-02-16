package br.edu.utfpr.pb.pw44s.server.security;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponseDto {

    private String token;

    private String displayName;

}
