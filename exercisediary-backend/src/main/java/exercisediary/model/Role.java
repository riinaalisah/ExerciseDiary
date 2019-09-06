package exercisediary.model;

import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Data
@Document(collection = "roles")
public class Role {
  @Id
  private String id;
  private String role;

  Role() {}

  Role(String role) {
    this.role = role;
  }
}