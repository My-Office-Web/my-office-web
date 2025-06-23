import React, { createContext, useState, useEffect, useCallback } from 'react';

export const SalasContext = createContext();

export function SalasProvider({ children }) {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSalas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://my-office-web.onrender.com/salas');
      if (!res.ok) throw new Error('Erro ao buscar salas');
      const data = await res.json();
      setSalas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSalas();
  }, [fetchSalas]);

  return (
    <SalasContext.Provider value={{ salas, loading, refreshSalas: fetchSalas }}>
      {children}
    </SalasContext.Provider>
  );
}
