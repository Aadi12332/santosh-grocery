import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type RoleType = "customer" | "restaurant" | "restaurantbackend" | "retailer" | "supplier";

type RoleContextType = {
  role: RoleType | null;
  setRole: (role: RoleType | null) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<RoleType | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role") as RoleType | null;
    if (savedRole) setRoleState(savedRole);
  }, []);

  const setRole = (newRole: RoleType | null) => {
    setRoleState(newRole);

    if (newRole) {
      localStorage.setItem("role", newRole);
    } else {
      localStorage.removeItem("role");
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
};