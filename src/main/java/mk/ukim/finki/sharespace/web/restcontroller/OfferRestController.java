package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Offer;
import mk.ukim.finki.sharespace.model.dto.FilterDto;
import mk.ukim.finki.sharespace.model.dto.OfferDto;
import mk.ukim.finki.sharespace.model.dto.SortDto;
import mk.ukim.finki.sharespace.service.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/offers")
public class OfferRestController {

    private final OfferService offerService;

    @GetMapping
    public List<Offer> getAll(@RequestParam(required = false) String queryString) {
        if(queryString != null && !queryString.isEmpty() && !queryString.isBlank()) {
            return this.offerService.getByQueryString(queryString);
        }
        return this.offerService.getAll();
    }

    @PostMapping("/sorted")
    public List<Offer> getSorted(@RequestBody SortDto sortDto) {
        return this.offerService.getBySortCriteria(sortDto);
    }

    @PostMapping("/filtered")
    public List<Offer> getFiltered(@RequestBody FilterDto filterDto) {
        return this.offerService.getByFilterCriteria(filterDto);
    }

    @PostMapping("/create")
    public ResponseEntity<Offer> create(@RequestBody OfferDto offerDto) {
        return this.offerService.create(offerDto)
                .map(offer -> ResponseEntity.ok().body(offer))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Offer> findById(@PathVariable String id) {
        Offer offer = this.offerService.findById(id);
        return ResponseEntity.ok(offer);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Offer> update(@PathVariable String id, @RequestBody OfferDto offerDto) {
        return this.offerService.update(id, offerDto)
                .map(offer -> ResponseEntity.ok().body(offer))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        this.offerService.delete(id);
        return ResponseEntity.ok("Successfully deleted offer with id " + id);
    }

}
