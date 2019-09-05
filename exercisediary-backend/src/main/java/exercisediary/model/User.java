package exercisediary.model;

import lombok.Data;

import java.util.Set;

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
  private Set<Role> roles;

  User() {}

  User(String username, String firstName, String lastName, String password) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}