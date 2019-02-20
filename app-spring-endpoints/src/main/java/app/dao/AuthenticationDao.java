package app.dao;

import app.model.AuthenticationUser;

public interface AuthenticationDao {

	AuthenticationUser authenticate(String username, String password);
	
	boolean isSessionValid(String authorization);
}
