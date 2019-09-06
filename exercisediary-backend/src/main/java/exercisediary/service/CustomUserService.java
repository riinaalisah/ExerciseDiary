package exercisediary.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import exercisediary.model.Role;
import exercisediary.model.User;
import exercisediary.repository.RoleRepository;
import exercisediary.repository.UserRepository;
import exercisediary.service.UserService;

@Service
public class CustomUserService implements UserService, UserDetailsService {
  @Autowired
  private UserRepository userRepo;

  @Autowired
  private RoleRepository roleRepo;

  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public UserDetails loadUserByUsername(String username) {

    User user = userRepo.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException(username);
    }

    List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<>();
    for (Role role : user.getRoles()) {
      grantedAuthorities.add(new SimpleGrantedAuthority(role.getRole()));
    }

    return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorities);
  }

  @Override
  public void save(User user) {
    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    user.setRoles(new ArrayList<>(roleRepo.findAll()));
    userRepo.save(user);
  }

  @Override
  public User findByUsername(String username) {
    return userRepo.findByUsername(username);
  }
}