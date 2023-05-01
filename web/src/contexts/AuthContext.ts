import React, { createContext } from 'react';

import { AuthContextType } from '../types/context';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
