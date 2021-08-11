package mk.ukim.finki.sharespace.model.exception;

import mk.ukim.finki.sharespace.model.exception.parent.ResourceNotFoundException;

public class RendezvousPointNotFoundException extends ResourceNotFoundException {

    public RendezvousPointNotFoundException(String message) {
        super(message);
    }

}
