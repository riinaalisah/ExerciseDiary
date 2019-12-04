package exercisediary.model;

import lombok.Data;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@Document(collection = "users")

public class User {
  private @Id String id;
  private String username;
  private String firstName;
  private String lastName;
  private String password;
  @DBRef
  private List<Role> roles;

  public User() {}

  public User(String username, String firstName, String lastName, String password) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.roles = new ArrayList<>();
  }
}