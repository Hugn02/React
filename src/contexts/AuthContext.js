import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

const checkStatusLogin = (query) => {
	let user = localStorage.getItem('user');
	user = JSON.parse(user);

	if (user) {
		if (query === 'isAuthenticated') {
			return true;
		}
		if (query === 'userCurrent') {
			return user;
		}
	} else {
		if (query === 'isAuthenticated') {
			return false;
		}
		if (query === 'userCurrent') {
			return null;
		}
	}
};


export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		checkStatusLogin('isAuthenticated')
	);
	const [userCurrent, setUserCurrent] = useState(
		checkStatusLogin('userCurrent')
	);

	const login = (user) => {
		setUserCurrent(user);
		setIsAuthenticated(true);

		localStorage.setItem('user', JSON.stringify(user));
	};

	const logout = () => {
		setUserCurrent(null);
		setIsAuthenticated(false);

		localStorage.removeItem('user');
	};

	const [user, setUser] = useState(null);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, logout, userCurrent, setUserCurrent, user, updateUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
