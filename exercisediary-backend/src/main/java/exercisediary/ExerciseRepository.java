package exercisediary;

//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

interface ExerciseRepository extends MongoRepository<Exercise, String> {

}