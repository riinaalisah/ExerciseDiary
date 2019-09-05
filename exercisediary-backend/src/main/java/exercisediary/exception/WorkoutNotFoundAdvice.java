package exercisediary.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class WorkoutNotFoundAdvice {

  @ResponseBody
  @ExceptionHandler(WorkoutNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  String workoutNotFoundHandler(WorkoutNotFoundException ex) {
    return ex.getMessage();
  }
}