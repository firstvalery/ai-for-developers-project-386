package com.example.backend;

import com.example.backend.api.HelloController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@WebFluxTest(HelloController.class)
class HelloControllerTest {

    @Autowired
    private WebTestClient client;

    @Test
    void helloReturnsMessage() {
        client.get().uri("/api/hello")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.message").isEqualTo("Hello from Spring Boot WebFlux!");
    }
}
