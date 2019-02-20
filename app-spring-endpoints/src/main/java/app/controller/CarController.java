package app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import app.model.AppResponse;
import app.model.Car;
import app.service.AuthenticationService;
import app.service.CarService;

@Controller
public class CarController {

	@Autowired
	private CarService carService;
	
	@Autowired
	private AuthenticationService authenticationService;

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/api/cars", method = RequestMethod.GET)
	public ResponseEntity<AppResponse> carDetails(@RequestHeader("Authorization") String authorization) {

		if (!authenticationService.isSessionValid(authorization)) {
			return new ResponseEntity<AppResponse>(new AppResponse(401, "unauthorized", null), HttpStatus.UNAUTHORIZED);
		}
		
		List<Car> carDetails = carService.getCarDetails();
		return new ResponseEntity<AppResponse>(new AppResponse(200, "OK", carDetails), HttpStatus.OK);
	}
	
}
