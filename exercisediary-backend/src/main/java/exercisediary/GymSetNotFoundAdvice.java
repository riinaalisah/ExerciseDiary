package exercisediary;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class GymSetNotFoundAdvice {

  @ResponseBody
  @ExceptionHandler(ExerciseNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  String gymSetNotFoundHandler(GymSetNotFoundException ex) {
    return ex.getMessage();
  }
}