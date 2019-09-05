package exercisediary.exception;

public class GymSetNotFoundException extends RuntimeException {

  public GymSetNotFoundException(String id) {
    super("Could not find set " + id);
  }
}