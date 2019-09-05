package exercisediary.repository;

import exercisediary.model.Workout;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutRepository extends MongoRepository<Workout, String> {

}