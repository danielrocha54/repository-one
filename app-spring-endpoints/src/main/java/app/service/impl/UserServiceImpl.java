/**
 * 
 */
package app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dao.UserDao;
import app.model.User;
import app.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao userDao;

	public List<User> getUserDetails() {
		return userDao.getUserDetails();
	}
	
	public User getUser(String username) {
		return userDao.getUser(username);
	}
	
	public boolean saveUser(User user) {
		return userDao.saveUser(user);
	}
	
	public boolean removeUser(User user) {
		return userDao.removeUser(user);
	}

}
