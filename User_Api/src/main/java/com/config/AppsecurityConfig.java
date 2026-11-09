////
////package com.config;
////
////import java.util.List;
////
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.http.HttpMethod;
////import org.springframework.security.authentication.AuthenticationManager;
////import org.springframework.security.authentication.AuthenticationProvider;
////import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
////import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.web.SecurityFilterChain;
////import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
////import org.springframework.web.cors.CorsConfiguration;
////import org.springframework.web.cors.CorsConfigurationSource;
////import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
////
////import com.jwtfilter.JwtFilter;
////
////@Configuration
////@EnableWebSecurity
////public class AppsecurityConfig {
////
////    @Autowired
////    private com.handler.OAuthSuccessHandler successHandler;
////
////    @Autowired
////    private UserDetailsService userDetailsService;
////
////    @Autowired
////    private JwtFilter jwtFilter;
////
////    @Bean
////    public BCryptPasswordEncoder pwdencode() {
////        return new BCryptPasswordEncoder();
////    }
////
////    @Bean
////    public AuthenticationProvider authprovider() {
////
////        DaoAuthenticationProvider provider =
////                new DaoAuthenticationProvider();
////
////        provider.setUserDetailsService(userDetailsService);
////        provider.setPasswordEncoder(pwdencode());
////
////        return provider;
////    }
////
////    @Bean
////    public AuthenticationManager authManager(
////            AuthenticationConfiguration config) throws Exception {
////
////        return config.getAuthenticationManager();
////    }
////
////    @Bean
////    public SecurityFilterChain security(HttpSecurity http) throws Exception {
////
////        http
////            .csrf(csrf -> csrf.disable())
////
//////            .cors(cors ->
//////                cors.configurationSource(corsConfigurationSource())
//////            )
////            
////            .cors(org.springframework.security.config.Customizer.withDefaults())
////
////            .authenticationProvider(authprovider())
////
////            .authorizeHttpRequests(req -> req
////
////                // Allow CORS preflight requests
////                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
////
////                // Public APIs
////                .requestMatchers(
////                    "/login",
////                    "/register",
////                    "/resetpwd",
////                    "/forgotpwd",
////                    "/oauth2/**",
////                    "/login/oauth2/**",
////
////                    "/AddToWishList",
////                    "/RemoveFromWishList",
////                    "/GetWishlist",
////                     "/deleteadr",
////                    "/getdetails"
////                ).permitAll()
////
////                // All other APIs require authentication
////                .anyRequest().authenticated()
////            )
////
////            .oauth2Login(oauth ->
////                oauth.successHandler(successHandler)
////            )
////
////            .addFilterBefore(
////                jwtFilter,
////                UsernamePasswordAuthenticationFilter.class
////            );
////
////        return http.build();
////    }
////
////    @Bean
////    public CorsConfigurationSource corsConfigurationSource() {
////
////        CorsConfiguration config = new CorsConfiguration();
////
////        // Angular frontend
////        config.setAllowedOrigins(
////            List.of("http://localhost:4200")
////        );
////
////        // Allowed HTTP methods
////        config.setAllowedMethods(
////            List.of(
////                "GET",
////                "POST",
////                "PUT",
////                "DELETE",
////                "OPTIONS"
////            )
////        );
////
////        // Allow request headers such as Authorization and Content-Type
////        config.setAllowedHeaders(
////            List.of("*")
////        );
////
////        // Allow cookies/authentication information
////        config.setAllowCredentials(true);
////
////        UrlBasedCorsConfigurationSource source =
////                new UrlBasedCorsConfigurationSource();
////
////        source.registerCorsConfiguration(
////            "/**",
////            config
////        );
////
////        return source;
////    }
////}
//
//
//
//
//
//
//package com.config;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import com.jwtfilter.JwtFilter;
//
//@Configuration
//@EnableWebSecurity
//public class AppsecurityConfig {
//
//    @Autowired
//    private com.handler.OAuthSuccessHandler successHandler;
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @Autowired
//    private JwtFilter jwtFilter;
//
//    @Bean
//    public BCryptPasswordEncoder pwdencode() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationProvider authprovider() {
//        DaoAuthenticationProvider provider =
//                new DaoAuthenticationProvider();
//
//        provider.setUserDetailsService(userDetailsService);
//        provider.setPasswordEncoder(pwdencode());
//
//        return provider;
//    }
//
//    @Bean
//    public AuthenticationManager authManager(
//            AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }
//
//    @Bean
//    public SecurityFilterChain security(HttpSecurity http)
//            throws Exception {
//
//        http
//            .csrf(csrf -> csrf.disable())
//
//            .cors(cors -> cors.configurationSource(
//                    corsConfigurationSource()))
//
//            .authenticationProvider(authprovider())
//
//            .authorizeHttpRequests(req -> req
//                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//
//                .requestMatchers(
//                    "/login",
//                    "/register",
//                    "/resetpwd",
//                    "/forgotpwd",
//                    "/oauth2/**",
//                    "/login/oauth2/**",
//                    "/AddToWishList",
//                    "/RemoveFromWishList",
//                    "/GetWishlist",
//                    "/deleteadr",
//                    "/getdetails"
//                ).permitAll()
//
//                .anyRequest().authenticated()
//            )
//
//            .oauth2Login(oauth ->
//                oauth.successHandler(successHandler)
//            )
//
//            .addFilterBefore(
//                jwtFilter,
//                UsernamePasswordAuthenticationFilter.class
//            );
//
//        return http.build();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//
//        config.setAllowedOrigins(
//            List.of("http://localhost:4200")
//        );
//
//        config.setAllowedMethods(
//            List.of(
//                "GET",
//                "POST",
//                "PUT",
//                "PATCH",
//                "DELETE",
//                "OPTIONS"
//            )
//        );
//
//        config.setAllowedHeaders(List.of("*"));
//        config.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source =
//                new UrlBasedCorsConfigurationSource();
//
//        source.registerCorsConfiguration("/**", config);
//
//        return source;
//    }
//
//    // Prevent duplicate servlet registration of JwtFilter.
//    // It remains in the Spring Security filter chain above.
//    @Bean
//    public FilterRegistrationBean<JwtFilter> jwtFilterRegistration() {
//        FilterRegistrationBean<JwtFilter> registration =
//                new FilterRegistrationBean<>(jwtFilter);
//
//        registration.setEnabled(false);
//        return registration;
//    }
//}



package com.config; // Change this to your actual package name

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.handler.OAuthSuccessHandler;
// Import JwtFilter from its actual package
import com.jwtfilter.JwtFilter;

@Configuration
@EnableWebSecurity
public class AppsecurityConfig {

    @Autowired
    private OAuthSuccessHandler successHandler;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public BCryptPasswordEncoder pwdencode() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authprovider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(pwdencode());
        return provider;
    }

    @Bean
    public AuthenticationManager authManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // CORS configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(
                List.of("http://localhost:4200"));

        config.setAllowedMethods(
                List.of("GET", "POST", "PUT", "PATCH",
                        "DELETE", "OPTIONS"));

        config.setAllowedHeaders(List.of("*"));

        config.setAllowCredentials(true);

        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }

    // Prevent JwtFilter from running twice as a servlet filter
    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilterRegistration() {

        FilterRegistrationBean<JwtFilter> registration =
                new FilterRegistrationBean<>(jwtFilter);

        registration.setEnabled(false);

        return registration;
    }

    // Spring Security configuration
    @Bean
    public SecurityFilterChain security(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .cors(cors ->
                cors.configurationSource(corsConfigurationSource()))

            .authenticationProvider(authprovider())

            .authorizeHttpRequests(req -> req

                // Allow browser CORS preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public endpoints
                .requestMatchers(
                    "/login",
                    "/register",
                    "/resetpwd",
                    "/forgotpwd",
                    "/oauth2/**",
                    "/login/oauth2/**",
                    "/AddToWishList",
                    "/RemoveFromWishList",
                    "/GetWishlist",
                    "/deleteadr",
                    "/getdetails",
                    "/updateQuantity"
                ).permitAll()

                // All other endpoints require authentication
                .anyRequest().authenticated()
            )

            .oauth2Login(oauth ->
                oauth.successHandler(successHandler))

            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
