package mk.ukim.finki.sharespace.repository;

import mk.ukim.finki.sharespace.model.abstraction.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
