package exercisediary;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
class Exercise {

  private @Id @GeneratedValue Long id;
  private String name;
  private int calsPerMinute;

  Exercise() {}

  Exercise(String name, int calsPerMinute) {
    this.name = name;
    this.calsPerMinute = calsPerMinute;
  }
}