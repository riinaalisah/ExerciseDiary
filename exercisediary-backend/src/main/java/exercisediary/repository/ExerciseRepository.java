package exercisediary.repository;

import exercisediary.model.Exercise;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {

}