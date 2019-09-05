package exercisediary.controller;

import exercisediary.repository.WorkoutRepository;
import exercisediary.model.Workout;
import exercisediary.exception.WorkoutNotFoundException;

import java.util.List;

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
class WorkoutController {

  private final WorkoutRepository repo;

  WorkoutController(WorkoutRepository repo) {
    this.repo = repo;
  }

  @GetMapping("/api/workouts")
  List<Workout> allWorkouts() {
    return repo.findAll();
  }

  @PostMapping("/api/workouts")
  Workout newWorkout(@RequestBody Workout newWorkout) {
    return repo.save(newWorkout);
  }

  @GetMapping("/api/workouts/{id}")
  Workout oneWorkout(@PathVariable String id) {
    return repo.findById(id)
      .orElseThrow(() -> new WorkoutNotFoundException(id));
  }

  @PutMapping("/api/workouts/{id}")
  Workout replaceWorkout(@RequestBody Workout newWorkout, @PathVariable String id) {

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

  @DeleteMapping("/api/workouts/{id}")
  void deleteWorkout(@PathVariable String id) {
    repo.deleteById(id);
  }
  

}