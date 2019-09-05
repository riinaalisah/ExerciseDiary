package exercisediary.exception;

public class ExerciseNotFoundException extends RuntimeException {

  public ExerciseNotFoundException(String id) {
    super("Could not find exercise " + id);
  }
}