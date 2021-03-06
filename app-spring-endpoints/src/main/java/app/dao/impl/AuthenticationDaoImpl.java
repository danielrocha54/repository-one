package app.dao.impl;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.dao.AuthenticationDao;
import app.model.Authentication;
import app.model.AuthenticationUser;
import app.model.User;

@Component
public class AuthenticationDaoImpl implements AuthenticationDao {
	
	@Autowired
	private EntityManagerFactory entityManagerFactory;

	public AuthenticationUser authenticate(String username, String password) {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery criteria = builder.createQuery(User.class);
		Root contactRoot = criteria.from(User.class);
		criteria.select(contactRoot).where(builder.equal(contactRoot.get("username"), username));
		criteria.select(contactRoot).where(builder.equal(contactRoot.get("password"), password));
		
		List users = em.createQuery(criteria).getResultList();
		
		User user = ((users.size() == 0)? null : (User)users.get(0));
		
		if (user == null) return null;
		
		Authentication auth = new Authentication();
		auth.setUserId(user.getId());
		auth.setToken(UUID.randomUUID().toString());
		
		em.persist(auth);
		et.commit();
		em.close();
		
		User auser = new User();
		auser.setFirstName(user.getFirstName());
		auser.setLastName(user.getLastName());
		auser.setUsername(user.getUsername());
		
		AuthenticationUser authUser = new AuthenticationUser();
		authUser.setToken(auth.getToken());
		authUser.setUser(auser);
		
		return authUser;
	}

	public boolean isSessionValid(String authorization) {
		
		if (authorization != null && authorization.toLowerCase().startsWith("bearer")) {
			
			String token = authorization.substring("bearer".length()).trim();
			
			EntityManager em = entityManagerFactory.createEntityManager();
			EntityTransaction et = em.getTransaction();
			et.begin();
			CriteriaBuilder builder = em.getCriteriaBuilder();
			CriteriaQuery criteria = builder.createQuery(Authentication.class);
			Root contactRoot = criteria.from(Authentication.class);
			criteria.select(contactRoot).where(builder.equal(contactRoot.get("token"), token));
			List authentications = em.createQuery(criteria).getResultList();
			et.commit();
			em.close();
			return (authentications.size() == 0)? false : true;
		}
		
		return false;
	}
	
}
