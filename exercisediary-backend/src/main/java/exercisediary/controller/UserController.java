package exercisediary.controller;

import java.util.List;

import exercisediary.repository.UserRepository;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin
class UserController {
  
  @Autowired
  private UserRepository repo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  UserController(UserRepository repo) {
    this.repo = repo;
    this.passwordEncoder = new BCryptPasswordEncoder();
  }

  // Aggregate root

  @GetMapping("/api/users")
  List<User> allUsers() {
    return repo.findAll();
  }

  @PostMapping("/api/users")
  User newUser(@RequestBody User newUser) {
    newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
    System.out.println(newUser);
    return repo.save(newUser);
  }

  // Single item

  @GetMapping("/api/users/{id}")
  User oneUser(@PathVariable String id) {
    return repo.findById(id)
      .orElseThrow(() -> new UserNotFoundException(id));
  }

  @PutMapping("/api/users/{id}")
  User replaceUser(@RequestBody User newUser, @PathVariable String id) {

    return repo.findById(id)
      .map(user -> {
        user.setUsername(newUser.getUsername());
        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setPassword(newUser.getPassword());
        return repo.save(user);
      })
      .orElseGet(() -> {
        newUser.setId(id);
        return repo.save(newUser);
      });
  }

  @DeleteMapping("/api/users/{id}")
  void deleteUser(@PathVariable String id) {
    repo.deleteById(id);
  } 
}