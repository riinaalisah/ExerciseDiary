package exercisediary;

import org.springframework.data.mongodb.repository.MongoRepository;

interface WorkoutRepository extends MongoRepository<Workout, String> {

}