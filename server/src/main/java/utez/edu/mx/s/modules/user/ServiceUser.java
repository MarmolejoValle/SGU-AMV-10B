package utez.edu.mx.s.modules.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceUser {

    @Autowired
    private RepositoryUser repositoryUser;

    public List<BeanUser> getAllUsers() {
        return repositoryUser.findAll();
    }

    public Optional<BeanUser> getUserById(Long id) {
        return repositoryUser.findById(id);
    }

    public BeanUser createUser(BeanUser user) {
        return repositoryUser.save(user);
    }

    public BeanUser updateUser(Long id, BeanUser userDetails) {
        return repositoryUser.findById(id)
                .map(user -> {
                    user.setFullName(userDetails.getFullName());
                    user.setEmail(userDetails.getEmail());
                    user.setPhoneNumber(userDetails.getPhoneNumber());
                    return repositoryUser.save(user);
                })
                .orElse(null);
    }

    public boolean deleteUser(Long id) {
        if (repositoryUser.existsById(id)) {
            repositoryUser.deleteById(id);
            return true;
        }
        return false;
    }
}
