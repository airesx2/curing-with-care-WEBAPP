import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import './AuthContext.css';
import bunnyImg from './animal-bunny-domestic-svgrepo-com.svg';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Artificial delay: 2 seconds
    setTimeout(() => {
      setUser(currentUser);
      setLoading(false);
    }, 2700);
    });

    return () => unsubscribe();
  }, []);

  if(loading){
  return (
    <div className="auth-loading-screen !bg-[#F4FFE1]">
      <div className="hopping-loader">
      <img src={bunnyImg} className="bunny" alt="bunny" />
      <span style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'light', 
        marginTop: "40px" }}>
          
          Loading your account…</span>
      </div>
    </div>
  );
}

  return(
    <AuthContext.Provider value = {{user}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}