package net.sohail.ems_backend.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import net.sohail.ems_backend.service.GoogleTokenVerifier;
import net.sohail.ems_backend.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final GoogleTokenVerifier googleTokenVerifier;
    private final JwtService jwtService;

    public AuthController(GoogleTokenVerifier googleTokenVerifier,
                          JwtService jwtService) {
        this.googleTokenVerifier = googleTokenVerifier;
        this.jwtService = jwtService;
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body)
            throws Exception {

        String token = body.get("token");

        GoogleIdToken.Payload payload = googleTokenVerifier.verify(token);

        String email = payload.getEmail();
        String name = (String) payload.get("name");

        String jwt = jwtService.generateToken(email);

        return ResponseEntity.ok(Map.of(
                "token", jwt,
                "email", email,
                "name", name
        ));
    }
}
