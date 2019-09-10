package exercisediary.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
class SecurityController {
  @GetMapping("/loggedUser")
  public String currentUserName(Principal principal) {
    System.out.println("!!!!!!!!" + principal);
    return principal.getName();
  }
}