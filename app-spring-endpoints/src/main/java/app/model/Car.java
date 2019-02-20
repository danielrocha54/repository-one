package app.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "car")
public class Car implements Serializable {

	@Id
	@Column
	private int year;
	
	@Id
	@Column
	private String manufacturer;
	
	@Id
	@Column
	private String model;
	
	
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}

	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	
	public String toString() {
		return "[year = " + this.year + "]" + 
				", [manufacturer = " + this.manufacturer + "]" +
				", [model = " + this.model + "]";
	}

}
