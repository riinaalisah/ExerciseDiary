package exercisediary;

class WorkoutNotFoundException extends RuntimeException {

  WorkoutNotFoundException(String id) {
    super("Could not find workout " + id);
  }
}