import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getUsers } from '../apis/tools'  // Adjust import path as needed
import { UsersData } from '../../models/tools'  // Adjust import path as needed

// Create a Context for the user
const UserContext = createContext<UsersData | null>(null)

export const useUser = () => useContext(UserContext)  // Custom hook to access user context

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth0()
  const [currentUser, setCurrentUser] = useState<UsersData | null>(null)

  useEffect(() => {
    if (isAuthenticated && user) {
      const auth_id = user.sub?.split('|')[1]  // Get the Auth0 'auth_id' (sub)

      getUsers()
        .then((allUsers) => {
          const matchedUser = allUsers.find((u) => u.auth_id === auth_id)
          if (matchedUser) {
            setCurrentUser(matchedUser)
          } else {
            console.warn('No matching user found for auth_id:', auth_id)
          }
        })
        .catch((error) => {
          console.error('Error fetching users from DB:', error)
        })
    }
  }, [isAuthenticated, user])

  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  )
}
