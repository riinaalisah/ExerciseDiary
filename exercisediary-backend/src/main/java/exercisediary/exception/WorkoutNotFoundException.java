package exercisediary.exception;

public class WorkoutNotFoundException extends RuntimeException {

  public WorkoutNotFoundException(String id) {
    super("Could not find workout " + id);
  }
}