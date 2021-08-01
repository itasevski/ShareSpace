package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Destination;
import mk.ukim.finki.sharespace.model.dto.DestinationDto;
import mk.ukim.finki.sharespace.service.DestinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/destinations")
public class DestinationRestController {

    private final DestinationService destinationService;

    @PostMapping("/create")
    public ResponseEntity<Destination> create(@RequestBody DestinationDto destinationDto) {
        return this.destinationService.create(destinationDto)
                .map(destination -> ResponseEntity.ok().body(destination))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Destination> findById(@PathVariable String id) {
        Destination destination = this.destinationService.findById(id);
        return ResponseEntity.ok(destination);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Destination> update(@PathVariable String id, @RequestBody DestinationDto destinationDto) {
        return this.destinationService.update(id, destinationDto)
                .map(destination -> ResponseEntity.ok().body(destination))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        this.destinationService.delete(id);
        return ResponseEntity.ok("Successfully deleted destination with id " + id);
    }

}
