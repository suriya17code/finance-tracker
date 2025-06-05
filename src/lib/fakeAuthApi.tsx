export interface User {
  username: string;
  email?: string;
  password: string;
  role?: {
    user: boolean;
  };
}

// const STOREAGE_KEY = "fake-user-data";
const AUTH_TOKEN ="login-token"

export const getUser = (): User[] => {
  const data = sessionStorage.getItem(AUTH_TOKEN);
  return data ? JSON.parse(data) : [];
};

export const saveUserdata = (data: User[]) => {
  sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(data));
};

export const SignUp = (username: string,email: string,password: string): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const userData = getUser() || [];

      const existing = userData.find((user) => user.username === username);
      if (existing) throw new Error("already exist");

      const newUser: User = { username, email, password };

      userData.push(newUser);
      saveUserdata(userData);

     //  with token step
      const token = btoa(`${username}:${Date.now()}`);

      const sessionData = { user: newUser, token };

      sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(sessionData));

      resolve(sessionData);
    } catch (error) {
      reject(error);
    }
  });
};

export const login = (email:string,password:string):Promise<{ user: User; token: string }>  => {
    return new Promise((resolve,reject)=>{
       try {
         const userData = getUser()|| [];
         const user = userData.find((user)=>user.email===email && user.password===password)
      
         if(email!=="guest123@gmail.com" && password!=="guest123" && !user) throw new Error("invlaid credential");
         if (!user && !(email === "guest123@gmail.com" && password === "guest123")) throw new Error("invlaid credential");

         // For guest login, create a guest user object
         const resolvedUser = user ?? { username: "guest", email: "guest123@gmail.com", password: "guest123" };

         const token = btoa(`${email}:${Date.now()}`); // base64 encoding
          
         const sessionData = { user: resolvedUser, token };
           userData.push(sessionData?.user);
      saveUserdata(userData);
      sessionStorage.setItem(AUTH_TOKEN,JSON.stringify(sessionData));

      resolve(sessionData);

       } catch (error) {

        reject(error)
       }
    })
};
export function logout() {
  sessionStorage.removeItem(AUTH_TOKEN);
}

export function getSession():  { user: User; token: string }|null {
  const user = sessionStorage.getItem(AUTH_TOKEN);
  return user ? JSON.parse(user) : null;
}
