package app.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.dao.UserDao;
import app.model.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

@Component
public class UserDaoImpl implements UserDao {

	@Autowired
	private EntityManagerFactory entityManagerFactory;

	public List getUserDetails() {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		CriteriaBuilder builder = session.getCriteriaBuilder();
		CriteriaQuery criteria = builder.createQuery(User.class);
		Root contactRoot = criteria.from(User.class);
		criteria.select(contactRoot);
		return session.createQuery(criteria).getResultList();
	}

	public User getUser(String username) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		CriteriaBuilder builder = session.getCriteriaBuilder();
		CriteriaQuery criteria = builder.createQuery(User.class);
		Root contactRoot = criteria.from(User.class);
		criteria.select(contactRoot).where(builder.equal(contactRoot.get("username"), username));
		
		List users = session.createQuery(criteria).getResultList();
		
		return (User) ((users.size() == 0)? null : users.get(0));
	}

	public boolean saveUser(User user) {

		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		em.persist(user);
		et.commit();

		return getUser(user.getUsername()) != null;
	}

	public boolean removeUser(User user) {

		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		em.remove(em.contains(user) ? user : em.merge(user));
		et.commit();

		return getUser(user.getUsername()) == null;
	}

}
