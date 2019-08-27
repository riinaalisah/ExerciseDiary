package exercisediary;

import org.springframework.data.mongodb.repository.MongoRepository;

interface GymSetRepository extends MongoRepository<GymSet, String> {

}