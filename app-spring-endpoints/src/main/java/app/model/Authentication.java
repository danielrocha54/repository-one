package app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "authentication")
public class Authentication {
	
	@Id
	@Column
	private String token;

	@Column
	private int user_id;
	
	
	public int getUserId() {
		return this.user_id;
	}
	public void setUserId(int userId) {
		this.user_id = userId;
	}
	
	public String getToken() {
		return this.token;
	}
	public void setToken(String token) {
		this.token = token;
	}
}
