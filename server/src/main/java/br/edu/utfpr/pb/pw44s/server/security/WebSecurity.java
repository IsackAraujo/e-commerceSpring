package br.edu.utfpr.pb.pw44s.server.security;

import br.edu.utfpr.pb.pw44s.server.services.AuthService;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@EnableWebSecurity
@Configuration
public class WebSecurity {
    private final AuthService authService;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    public WebSecurity(AuthService authService,
                       AuthenticationEntryPoint authenticationEntryPoint) {
        this.authService = authService;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Bean
    @SneakyThrows
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .userDetailsService(authService)
                .passwordEncoder(passwordEncoder());
        // authenticationManager -> responsável por gerenciar a autenticação dos usuários
        AuthenticationManager authenticationManager =
                authenticationManagerBuilder.build();

        //Configuração para funcionar o console do H2.
        http.headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));
        // desabilita o uso de csrf
        http.csrf(AbstractHttpConfigurer::disable);
        // Adiciona configuração de CORS
        http.cors(cors -> corsConfigurationSource());
        //define o objeto responsável pelo tratamento de exceção ao entrar com credenciais inválidas
        http.exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(authenticationEntryPoint));

        // configura a authorização das requisições
        http.authorizeHttpRequests((authorize) -> authorize
                .requestMatchers(antMatcher("/h2-console/**")).permitAll()
                .requestMatchers(antMatcher(HttpMethod.POST, "/user/**")).permitAll()
                .requestMatchers(antMatcher("/error/**")).permitAll()
                .requestMatchers(antMatcher(HttpMethod.POST, "/login/**")).permitAll()
                .requestMatchers(antMatcher("/product/**")).permitAll()
                .requestMatchers(antMatcher("/category/**")).permitAll()
                .anyRequest().authenticated());

        http.authenticationManager(authenticationManager)
                //Filtro da Autenticação - sobrescreve o método padrão do Spring Security para Autenticação.
                .addFilter(new JWTAuthenticationFilter(authenticationManager, authService))
                //Filtro da Autorização - - sobrescreve o método padrão do Spring Security para Autorização.
                .addFilter(new JWTAuthorizationFilter(authenticationManager, authService))
                //Como será criada uma API REST e todas as requisições que necessitam de autenticação/autorização serão realizadas com o envio do token JWT do usuário, não será necessário fazer controle de sessão no *back-end*.
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    // Criação do objeto utilizado na criptografia da senha, ele é usado no UserService ao cadastrar um usuário e pelo authenticationManagerBean para autenticar um usuário no sistema.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
        O compartilhamento de recursos de origem cruzada (CORS) é um mecanismo para integração de aplicativos.
        O CORS define uma maneira de os aplicativos Web clientes carregados em um domínio interagirem com recursos em um domínio diferente.
    */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Lista das origens autorizadas, no nosso caso que iremos rodar a aplicação localmente o * poderia ser trocado
        // por: http://localhost:porta, em que :porta será a porta em que a aplicação cliente será executada
        configuration.setAllowedOrigins(List.of("*"));
        // Lista dos métodos HTTP autorizados
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT"));
        // Lista dos Headers autorizados, o Authorization será o header que iremos utilizar para transferir o Token
        configuration.setAllowedHeaders(List.of("Authorization", "x-xsrf-token",
                "Access-Control-Allow-Headers", "Origin",
                "Accept", "X-Requested-With", "Content-Type",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers", "Auth-Id-Token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}