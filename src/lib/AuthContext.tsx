import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  roles: {
    canEditNotices: boolean;
    canMonitorComplaints: boolean;
  };
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  isAdmin: false,
  roles: { canEditNotices: false, canMonitorComplaints: false }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roles, setRoles] = useState({ canEditNotices: false, canMonitorComplaints: false });

  const adminEmails = ['md.nafiul.ahmad.rafi@gmail.com', 'rafi011022@gmail.com'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const adminStatus = !!currentUser?.email && adminEmails.includes(currentUser.email);
      setIsAdmin(adminStatus);
      
      if (currentUser && currentUser.email) {
        try {
          const roleDoc = await getDoc(doc(db, 'roles', currentUser.email));
          if (roleDoc.exists()) {
            setRoles({
              canEditNotices: roleDoc.data().canEditNotices || false,
              canMonitorComplaints: roleDoc.data().canMonitorComplaints || false,
            });
          } else {
             setRoles({ canEditNotices: false, canMonitorComplaints: false });
          }
        } catch (error) {
          console.error("Failed to fetch roles", error);
          setRoles({ canEditNotices: false, canMonitorComplaints: false });
        }
      } else {
        setRoles({ canEditNotices: false, canMonitorComplaints: false });
      }
      
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, roles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
