package mk.ukim.finki.sharespace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;

import java.time.format.DateTimeFormatter;

@ServletComponentScan
@SpringBootApplication
public class ShareSpaceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShareSpaceApplication.class, args);
    }

    @Bean
    DateTimeFormatter dateTimeFormatter() {
        return DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
    }

}
