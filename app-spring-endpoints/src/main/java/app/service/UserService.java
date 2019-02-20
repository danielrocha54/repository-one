/**
 * 
 */
package app.service;

import java.util.List;

import app.model.User;

public interface UserService {

	List<User> getUserDetails();
	
	User getUser(String username);
	
	boolean saveUser(User user);
	
	public boolean removeUser(User user);
	
}
