package exercisediary.model;

import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Data
@Document(collection = "exercises")
public class Exercise {

  private @Id String id;
  private String name;
  private int calsPerMinute;

  Exercise() {}

  Exercise(String name, int calsPerMinute) {
    this.name = name;
    this.calsPerMinute = calsPerMinute;
  }
}