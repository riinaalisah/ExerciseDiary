package exercisediary.repository;

import exercisediary.model.GymSet;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GymSetRepository extends MongoRepository<GymSet, String> {

}