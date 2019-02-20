package app.dao;

import java.util.List;

import app.model.User;

public interface UserDao {
	
	List<User> getUserDetails();
	
	User getUser(String username);
	
	boolean saveUser(User user);
	
	boolean removeUser(User user);

}
