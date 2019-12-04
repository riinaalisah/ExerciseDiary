package exercisediary.model;

import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Data
//@Document(collection = "gymsets")
public class GymSet {
  //@Id
  //private String id;
  private String move;
  private int sets;
  private int reps;
  private int weights;

  public GymSet() {}

  public GymSet(String move, int sets, int reps, int weights) {
    this.move = move;
    this.sets = sets;
    this.reps = reps;
    this.weights = weights;
  }
}