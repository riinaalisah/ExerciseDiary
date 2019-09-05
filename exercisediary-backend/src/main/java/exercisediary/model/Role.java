package exercisediary.model;

import lombok.Data;

import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.annotation.Id;

@Data
@Document(collection = "roles")
public class Role {
  @Id
  private String id;
  private String name;
  @DBRef
  private Set<User> users;

  Role() {}

  Role(String name) {
    this.name = name;
  }
}