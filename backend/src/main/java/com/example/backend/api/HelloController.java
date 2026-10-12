package com.example.backend.api;

import java.time.Instant;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public Mono<Map<String, String>> hello() {
        return Mono.just(Map.of(
                "message", "Hello from Spring Boot WebFlux!",
                "timestamp", Instant.now().toString()
        ));
    }
}
