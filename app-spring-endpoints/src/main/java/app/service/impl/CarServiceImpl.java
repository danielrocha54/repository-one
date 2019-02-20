package app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dao.CarDao;
import app.model.Car;
import app.service.CarService;

@Service
public class CarServiceImpl implements CarService {

	@Autowired
	private CarDao carDao;
	
	public List<Car> getCarDetails() {
		return carDao.getCarDetails();
	}

	
	
}
