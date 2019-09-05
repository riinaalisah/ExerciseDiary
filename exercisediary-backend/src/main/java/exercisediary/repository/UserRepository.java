package exercisediary.repository;

import exercisediary.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface UserRepository extends MongoRepository<User, String> {
  User findByUsername(String username);
}
