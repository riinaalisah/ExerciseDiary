package exercisediary.controller;

import exercisediary.repository.WorkoutRepository;
import exercisediary.model.Workout;
import exercisediary.exception.WorkoutNotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin
public class WorkoutController {

  @Autowired
  private WorkoutRepository repo;

  @GetMapping("/workouts")
  public List<Workout> allWorkouts() {
    return repo.findAll();
  }

  @PostMapping("/workouts")
  public Workout newWorkout(@RequestBody Workout newWorkout) {
    return repo.save(newWorkout);
  }

  @GetMapping("/workouts/{id}")
  public Workout oneWorkout(@PathVariable String id) {
    return repo.findById(id)
      .orElseThrow(() -> new WorkoutNotFoundException(id));
  }

  @PutMapping("/workouts/{id}")
  public Workout replaceWorkout(@RequestBody Workout newWorkout, @PathVariable String id) {
    return repo.findById(id) 
      .map(workout -> {
        workout.setType(newWorkout.getType());
        workout.setDate(newWorkout.getDate());
        return repo.save(workout);
      })
      .orElseGet(() -> {
        newWorkout.setId(id);
        return repo.save(newWorkout);
      });
  }

  @DeleteMapping("/workouts/{id}")
  public void deleteWorkout(@PathVariable String id) {
    repo.deleteById(id);
  }

}