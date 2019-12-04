package exercisediary.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.annotation.Id;

@Data
@Document(collection =  "workouts")
public class Workout {
  
  @Id
  private String id;
  private String type;
  private Date date;
  private int duration;
  private List<GymSet> sets;
  @DBRef
  private User user;

  public Workout() {}

  public Workout(String type, Date date, int duration) {
    this.type = type;
    this.date = date;
    this.duration = duration;
  }
}