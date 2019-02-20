package app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dao.AuthenticationDao;
import app.model.AuthenticationUser;
import app.service.AuthenticationService;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

	@Autowired
	private AuthenticationDao authenticationDao;
	
	public AuthenticationUser authenticate(String username, String password) {
		return authenticationDao.authenticate(username, password);
	}

	public boolean isSessionValid(String authorization) {
		return authenticationDao.isSessionValid(authorization);
	}
	
	
}
