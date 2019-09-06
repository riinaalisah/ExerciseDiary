package exercisediary.controller;

import java.util.ArrayList;
import java.util.List;

import exercisediary.repository.RoleRepository;
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
  private UserRepository userRepo;

  @Autowired
  private RoleRepository roleRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  UserController(UserRepository userRepo) {
    this.userRepo = userRepo;
    this.passwordEncoder = new BCryptPasswordEncoder();
  }

  // Aggregate root

  @GetMapping("/api/users")
  List<User> allUsers() {
    return userRepo.findAll();
  }

  @PostMapping("/api/users")
  User newUser(@RequestBody User newUser) {
    newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
    newUser.setRoles(new ArrayList<>());
    newUser.getRoles().add(roleRepo.findByRole("USER"));
    return userRepo.save(newUser);
  }

  // Single item

  @GetMapping("/api/users/{id}")
  User oneUser(@PathVariable String id) {
    return userRepo.findById(id)
      .orElseThrow(() -> new UserNotFoundException(id));
  }

  @PutMapping("/api/users/{id}")
  User replaceUser(@RequestBody User newUser, @PathVariable String id) {

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

  @DeleteMapping("/api/users/{id}")
  void deleteUser(@PathVariable String id) {
    userRepo.deleteById(id);
  } 
}