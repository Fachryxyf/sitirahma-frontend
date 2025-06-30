// src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js'; // Path impor diperbarui

export const useAuth = () => {
  return useContext(AuthContext);
};