package exercisediary;

import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Data
@Document(collection = "users")
class User {
  private @Id String id;
  private String username;
  private String firstName;
  private String lastName;
  private String password;

  User() {}

  User(String username, String firstName, String lastName, String password) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}