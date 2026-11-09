package com.handler;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.entity.Users;

import com.repo.UserRepo;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepo repo;

    @Autowired
    private com.jwt.JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
                                        throws IOException {

        var oauthUser = (org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        // 🔹 Save user if not exists
        Users u = repo.findByEmail(email);

        if (u == null) {
            u = new Users();
            u.setEmail(email);
            u.setName(name);
            u.setOldPwd("GOOGLE_USER");  // required field
            u.setResetPwd("NO");
            repo.save(u);

            System.out.println("Saved Google user: " + email); // debug
        }

        // 🔹 Generate JWT
        String token = jwtUtil.generateToken(email);

        // 🔹 Redirect to Angular
        response.sendRedirect("http://localhost:4200/oauth-success?token=" + token + "&email=" + email + "&role=" + u.getRole() +"&name"+name);
    }
}