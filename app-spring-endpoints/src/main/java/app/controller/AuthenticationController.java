package app.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import app.model.AuthenticationUser;
import app.model.AppResponse;
import app.service.AuthenticationService;

@Controller
public class AuthenticationController {

	@Autowired
	private AuthenticationService authenticationService;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/api/authenticate", method = RequestMethod.GET)
	public ResponseEntity<AppResponse> authenticate(@RequestHeader("Authorization") String authorization) {

		AuthenticationUser auth = null;
		
		if (authorization != null && authorization.toLowerCase().startsWith("basic")) {
		    // Authorization: Basic base64credentials
		    String base64Credentials = authorization.substring("Basic".length()).trim();
		    byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
		    String credentials = new String(credDecoded, StandardCharsets.UTF_8);
		    // credentials = username:password
		    final String[] values = credentials.split(":", 2);
		    
		    auth = authenticationService.authenticate(values[0], values[1]);
		}
		
        return new ResponseEntity<AppResponse>(new AppResponse(200, "OK", auth), HttpStatus.OK);
	}
}
