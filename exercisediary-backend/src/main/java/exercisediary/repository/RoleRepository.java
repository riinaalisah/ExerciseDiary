package exercisediary.repository;

import exercisediary.model.Role;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {

}