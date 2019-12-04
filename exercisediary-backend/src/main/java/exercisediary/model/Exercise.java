package exercisediary.model;

import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Data
@Document(collection = "exercises")
public class Exercise {

  @Id
  private String id;
  private String name;
  private int calsPerMinute;

  public Exercise() {}

  public Exercise(String name, int calsPerMinute) {
    this.name = name;
    this.calsPerMinute = calsPerMinute;
  }
}