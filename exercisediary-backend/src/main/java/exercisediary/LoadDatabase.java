package exercisediary;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
class LoadDatabase {

  @Bean
  CommandLineRunner initDatabase(ExerciseRepository repo) {
    return args -> {
      log.info("Preloading " + repo.save(new Exercise("Bodycombat", 14)));
      log.info("Preloading " + repo.save(new Exercise("Bodypump", 11)));
    };
  }
}