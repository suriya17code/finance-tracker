export interface User {
  username: string;
  email?: string;
  password: string;
  role?: {
    user: boolean;
  };
}

export const AUTH_TOKEN = "login-token";
export const USER_LIST = "user-details";
 
export const getUsers = (): User[] => {
  const data = localStorage.getItem(USER_LIST);
  if (!data) return [];
  
  try {
    const parsed = JSON.parse(data); 
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [];
  }
};
 
export const saveAllUsers = (users: User[]) => {
  localStorage.setItem(USER_LIST, JSON.stringify(users));
};
 
export const saveSession = (user: User, token: string) => {
  sessionStorage.setItem(AUTH_TOKEN, JSON.stringify({ user, token }));
};
export const SignUp = (
  username: string, 
  email: string, 
  password: string
): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const users = getUsers();
      
      const usernameExists = users.some(u => u.username === username);
      const emailExists = users.some(u => u.email === email);
      
      if (usernameExists) throw new Error("Username already exists");
      if (emailExists) throw new Error("Email already registered");

      const newUser: User = { 
        username, 
        email, 
        password,
        role: { user: true }
      };

      // Add new user and save to localStorage
      const updatedUsers = [...users, newUser];
      saveAllUsers(updatedUsers);

      // Create session
      const token = btoa(`${username}:${Date.now()}`);
      saveSession(newUser, token);

      resolve({ user: newUser, token });
    } catch (error) {
      reject(error);
    }
  });
};

export const login = (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  
  return new Promise((resolve, reject) => {
    try {
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === password);

      // Guest login fallback
      if (!user && !(email === "guest123@gmail.com" && password === "guest123")) {

        throw new Error("Invalid credentials");
      }

      const resolvedUser = user ?? { 
        username: "guest", 
        email: "guest123@gmail.com", 
        password: "guest123",
        role: { user: true }
      };

      // Create session
      const token = btoa(`${email}:${Date.now()}`);
      saveSession(resolvedUser, token);

      // Add guest user to storage if they don't exist
      if (!user && email === "guest123@gmail.com") {
        saveAllUsers([...users, resolvedUser]);
      }

      resolve({ user: resolvedUser, token });
    } catch (error) {
      reject(error);
    }
  });
};

// Other functions remain the same
export function logout() {
  sessionStorage.removeItem(AUTH_TOKEN);
}

export function getSession(): { user: User; token: string } | null {
  const session = sessionStorage.getItem(AUTH_TOKEN);
  return session ? JSON.parse(session) : null;
}