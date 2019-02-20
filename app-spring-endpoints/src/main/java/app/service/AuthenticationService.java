package app.service;

import app.model.AuthenticationUser;

public interface AuthenticationService {

	AuthenticationUser authenticate(String username, String password);
	
	boolean isSessionValid(String authorization);
	
}
