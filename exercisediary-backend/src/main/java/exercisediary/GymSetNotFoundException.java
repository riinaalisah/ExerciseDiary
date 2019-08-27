package exercisediary;

class GymSetNotFoundException extends RuntimeException {

  GymSetNotFoundException(String id) {
    super("Could not find set " + id);
  }
}