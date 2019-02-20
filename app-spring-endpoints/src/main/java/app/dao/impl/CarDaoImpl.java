package app.dao.impl;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.dao.CarDao;
import app.model.Car;

@Component
public class CarDaoImpl implements CarDao {

	@Autowired
	private EntityManagerFactory entityManagerFactory;
	
	public List getCarDetails() {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		CriteriaBuilder builder = session.getCriteriaBuilder();
		CriteriaQuery criteria = builder.createQuery(Car.class);
		Root contactRoot = criteria.from(Car.class);
		criteria.select(contactRoot);
		return session.createQuery(criteria).getResultList();
	}
	
}
