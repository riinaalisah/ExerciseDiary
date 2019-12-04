package exercisediary.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import exercisediary.repository.RoleRepository;
import exercisediary.repository.UserRepository;
import exercisediary.service.CustomUserService;
import exercisediary.service.UserService;
import exercisediary.model.User;
import exercisediary.exception.UserNotFoundException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin
public class UserController {
  
  @Autowired
  private UserRepository userRepo;

  @Autowired
  private RoleRepository roleRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;


  public UserController() {
    this.passwordEncoder = new BCryptPasswordEncoder();
  }


  @GetMapping("/users")
  public List<User> allUsers() {
    return userRepo.findAll();
  }

  @PostMapping("/register")
  public User newUser(@RequestBody User newUser) {
    newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
    newUser.setRoles(new ArrayList<>());
    newUser.getRoles().add(roleRepo.findByRole("USER"));
    return userRepo.save(newUser);
  }

  @GetMapping("/users/{id}")
  public User oneUser(@PathVariable String id) {
    return userRepo.findById(id)
      .orElseThrow(() -> new UserNotFoundException(id));
  }

  @PutMapping("/users/{id}")
  public User replaceUser(@RequestBody User newUser, @PathVariable String id) {

    return userRepo.findById(id)
      .map(user -> {
        user.setUsername(newUser.getUsername());
        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setPassword(newUser.getPassword());
        return userRepo.save(user);
      })
      .orElseGet(() -> {
        newUser.setId(id);
        return userRepo.save(newUser);
      });
  }

  @DeleteMapping("/users/{id}")
  public void deleteUser(@PathVariable String id) {
    userRepo.deleteById(id);
  } 
}