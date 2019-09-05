/*
package exercisediary.service;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import exercisediary.model.User;
import exercisediary.repository.RoleRepository;
import exercisediary.repository.UserRepository;
import exercisediary.service.UserService;

@Service
public class CustomUserService implements UserService {
  @Autowired
  private UserRepository userRepo;

  @Autowired
  private RoleRepository roleRepo;

  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public void save(User user) {
    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    user.setRoles(new HashSet<>(roleRepo.findAll()));
    userRepo.save(user);
  }

  @Override
  public User findByUsername(String username) {
    return userRepo.findByUsername(username);
  }
}
*/