package exercisediary;

import org.springframework.data.jpa.repository.JpaRepository;

interface ExerciseRepository extends JpaRepository<Exercise, Long> {

}