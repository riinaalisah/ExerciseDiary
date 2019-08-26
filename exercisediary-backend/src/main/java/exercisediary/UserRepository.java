package exercisediary;

import org.springframework.data.mongodb.repository.MongoRepository;

interface UserRepository extends MongoRepository<User, String> {

}