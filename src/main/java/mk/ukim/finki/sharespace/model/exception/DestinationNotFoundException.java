package mk.ukim.finki.sharespace.model.exception;

import mk.ukim.finki.sharespace.model.exception.parent.ResourceNotFoundException;

public class DestinationNotFoundException extends ResourceNotFoundException {

    public DestinationNotFoundException(String message) {
        super(message);
    }

}
