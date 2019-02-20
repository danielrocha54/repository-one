package app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.util.UriComponentsBuilder;

import app.model.AppResponse;
import app.model.User;
import app.service.AuthenticationService;
import app.service.UserService;

@Controller
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticationService authenticationService;

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/api/users", method = RequestMethod.GET)
	public ResponseEntity<AppResponse> userDetails(@RequestHeader("Authorization") String authorization) {
		
		if (!authenticationService.isSessionValid(authorization)) {
			return new ResponseEntity<AppResponse>(new AppResponse(401, "unauthorized", null), HttpStatus.UNAUTHORIZED);
		}

		List<User> userDetails = userService.getUserDetails();
		return new ResponseEntity<AppResponse>(new AppResponse(200, "OK", userDetails), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/api/user", method = RequestMethod.POST)
    public ResponseEntity<AppResponse> createUser(
    			@RequestBody User user,
    			UriComponentsBuilder ucBuilder) {
 
        if (userService.getUser(user.getUsername()) != null) {
            return new ResponseEntity<AppResponse>(new AppResponse(400, "an user with name " + user.getUsername() + " already exist" , null), HttpStatus.CONFLICT);
        }
 
        boolean userCreated = userService.saveUser(user);
        
        AppResponse appResponse = new AppResponse();
        
        if (userCreated) {
        	appResponse.setHTTPStatus(200);
        	appResponse.setErrorMessage("OK");
        } else {
        	appResponse.setHTTPStatus(400);
        	appResponse.setErrorMessage("user " + user.getUsername() + " not created");
        }
        
        return new ResponseEntity<AppResponse>(appResponse, (userCreated)? HttpStatus.CREATED : HttpStatus.CONFLICT);
    }
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/api/user/{username}", method = RequestMethod.DELETE)
    public ResponseEntity<AppResponse> deleteUser(
    		@RequestHeader("Authorization") String authorization,
    		@PathVariable("username") String username) {
		
		if (!authenticationService.isSessionValid(authorization)) {
			return new ResponseEntity<AppResponse>(new AppResponse(401, "unauthorized", null), HttpStatus.UNAUTHORIZED);
		}
 
        User user = userService.getUser(username);
        if (user == null) {
            return new ResponseEntity<AppResponse>(new AppResponse(400, "unable to delete. user with username " + username + " not found", null), HttpStatus.NOT_FOUND);
        }
 
        boolean userDeleted = userService.removeUser(user);
        
        AppResponse appResponse = new AppResponse();
        
        if (userDeleted) {
        	appResponse.setHTTPStatus(200);
        	appResponse.setErrorMessage("OK");
        } else {
        	appResponse.setHTTPStatus(400);
        	appResponse.setErrorMessage("unable to delete user " + user.getUsername());
        }
        
        return new ResponseEntity<AppResponse>(appResponse, (userDeleted)? HttpStatus.NO_CONTENT : HttpStatus.CONFLICT);
	}
}
