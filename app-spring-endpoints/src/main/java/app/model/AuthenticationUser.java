package app.model;


public class AuthenticationUser {
	
	private String token;
	private User user;
	
	public User getUser() {
		return this.user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public String getToken() {
		return this.token;
	}
	public void setToken(String token) {
		this.token = token;
	}

}
