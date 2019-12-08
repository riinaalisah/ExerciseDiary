package exercisediary.controller;

import java.util.List;

import exercisediary.repository.ExerciseRepository;
import exercisediary.model.Exercise;
import exercisediary.exception.ExerciseNotFoundException;

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
public class ExerciseController {

  @Autowired
  private ExerciseRepository repo;

  @GetMapping("/exercises")
  public List<Exercise> allExercises() {
    return repo.findAll();
  }

  @PostMapping("/exercises")
  public Exercise newExercise(@RequestBody Exercise newExercise) {
    return repo.save(newExercise);
  }

  @GetMapping("/exercises/{id}")
  public Exercise oneExercise(@PathVariable String id) {
    return repo.findById(id)
      .orElseThrow(() -> new ExerciseNotFoundException(id));
  }

  @PutMapping("/exercises/{id}")
  public Exercise replaceExercise(@RequestBody Exercise newExercise, @PathVariable String id) {
    return repo.findById(id)
      .map(exercise -> {
        exercise.setName(newExercise.getName());
        exercise.setCalsPerMinute(newExercise.getCalsPerMinute());
        return repo.save(exercise);
      })
      .orElseGet(() -> {
        newExercise.setId(id);
        return repo.save(newExercise);
      });
  }

  @DeleteMapping("/exercises/{id}")
  public void deleteExercise(@PathVariable String id) {
    repo.deleteById(id);
  }  
}