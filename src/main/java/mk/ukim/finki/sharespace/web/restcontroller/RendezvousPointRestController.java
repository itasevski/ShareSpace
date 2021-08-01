package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.RendezvousPoint;
import mk.ukim.finki.sharespace.model.dto.RendezvousPointDto;
import mk.ukim.finki.sharespace.service.RendezvousPointService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/rendezvouspoints")
public class RendezvousPointRestController {

    private final RendezvousPointService rendezvousPointService;

    @PostMapping("/create")
    public ResponseEntity<RendezvousPoint> create(@RequestBody RendezvousPointDto rendezvousPointDto) {
        return this.rendezvousPointService.create(rendezvousPointDto)
                .map(rendezvousPoint -> ResponseEntity.ok().body(rendezvousPoint))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<RendezvousPoint> findById(@PathVariable String id) {
        RendezvousPoint rendezvousPoint = this.rendezvousPointService.findById(id);
        return ResponseEntity.ok(rendezvousPoint);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RendezvousPoint> update(@PathVariable String id, @RequestBody RendezvousPointDto rendezvousPointDto) {
        return this.rendezvousPointService.update(id, rendezvousPointDto)
                .map(rendezvousPoint -> ResponseEntity.ok().body(rendezvousPoint))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        this.rendezvousPointService.delete(id);
        return ResponseEntity.ok("Successfully deleted rendezvous point with id " + id);
    }

}
