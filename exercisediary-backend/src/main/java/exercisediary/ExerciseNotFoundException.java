package exercisediary;

class ExerciseNotFoundException extends RuntimeException {

  ExerciseNotFoundException(String id) {
    super("Could not find exercise " + id);
  }
}