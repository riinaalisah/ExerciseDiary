package exercisediary.controller;

import java.util.List;

import exercisediary.repository.GymSetRepository;
import exercisediary.model.GymSet;
import exercisediary.exception.GymSetNotFoundException;

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
class GymSetController {

  private final GymSetRepository repo;

  GymSetController(GymSetRepository repo) {
    this.repo = repo;
  }

  @GetMapping("/gymsets")
  List<GymSet> allGymSets() {
    return repo.findAll();
  }

  @PostMapping("/gymsets")
  GymSet newGymSet(@RequestBody GymSet newGymSet) {
    return repo.save(newGymSet);
  }

  @GetMapping("/gymsets/{id}")
  GymSet oneGymSet(@PathVariable String id) {
    return repo.findById(id)
      .orElseThrow(() -> new GymSetNotFoundException(id));
  }

  @PutMapping("/gymsets/{id}")
  GymSet replaceGymSet(@RequestBody GymSet newGymSet, @PathVariable String id) {

    return repo.findById(id) 
      .map(gymset -> {
        gymset.setMove(newGymSet.getMove());
        gymset.setSets(newGymSet.getSets());
        gymset.setReps(newGymSet.getReps());
        gymset.setWeights(newGymSet.getWeights());
        return repo.save(gymset);
      })
      .orElseGet(() -> {
        newGymSet.setId(id);
        return repo.save(newGymSet);
      });
  }

  @DeleteMapping("/gymsets/{id}")
  void deleteGymSet(@PathVariable String id) {
    repo.deleteById(id);
  }

}