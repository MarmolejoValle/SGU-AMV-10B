package utez.edu.mx.s.modules.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*")
public class ControllerUser {

    @Autowired
    private ServiceUser serviceUser;

    @GetMapping
    public ResponseEntity<List<BeanUser>> getAllUsers() {
        return ResponseEntity.ok(serviceUser.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BeanUser> getUserById(@PathVariable Long id) {
        return serviceUser.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BeanUser> createUser(@RequestBody BeanUser user) {
        return ResponseEntity.ok(serviceUser.createUser(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BeanUser> updateUser(@PathVariable Long id, @RequestBody BeanUser user) {
        BeanUser updated = serviceUser.updateUser(id, user);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = serviceUser.deleteUser(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
