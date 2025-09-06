import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  allUsers : [
   /* {
      id: 1,
      name: 'Darleen Quincel',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'Georgia',
      city: 'Atlanta',
      bgColor: 'bg-purple-500'
    },
    {
      id: 2,
      name: 'Barbara Gordon',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Haiti',
      city: 'Port-au-Prince',
      bgColor: 'bg-yellow-500'
    },
    {
      id: 3,
      name: 'Lois Lane',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'Palestine, State of',
      city: 'Ramallah',
      bgColor: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Paula Irving',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Central African Republic',
      city: 'Bangui',
      bgColor: 'bg-red-500'
    },
    {
      id: 5,
      name: 'Lois Lane',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Curaçao',
      city: 'Willemstad',
      bgColor: 'bg-gray-500'
    },
    {
      id: 6,
      name: 'Natasha Romanoff',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'Saint Vincent and the Grenadines',
      city: 'Kingstown',
      bgColor: 'bg-red-600'
    },
    {
      id: 7,
      name: 'Carol Danvers',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Brazil',
      city: 'São Paulo',
      bgColor: 'bg-blue-500'
    },
    {
      id: 8,
      name: 'Wanda Maximoff',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'Guinea',
      city: 'Conakry',
      bgColor: 'bg-pink-500'
    },
    {
      id: 9,
      name: 'Diana Prince',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Poland',
      city: 'Warsaw',
      bgColor: 'bg-indigo-500'
    },
    {
      id: 10,
      name: 'Carol Danvers',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'South Africa',
      city: 'Cape Town',
      bgColor: 'bg-teal-500'
    },
    {
      id: 11,
      name: 'Pepper Potts',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Åland Islands',
      city: 'Mariehamn',
      bgColor: 'bg-orange-500'
    },
    {
      id: 12,
      name: 'Karen Starr',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Bahrain',
      city: 'Manama',
      bgColor: 'bg-cyan-500'
    },
    // Add more mock users to test pagination
    {
      id: 13,
      name: 'John Doe',
      createdOn: '04 August, 2025',
      status: 'Active',
      country: 'USA',
      city: 'New York',
      bgColor: 'bg-blue-600'
    },
    {
      id: 14,
      name: 'Jane Smith',
      createdOn: '04 August, 2025',
      status: 'Pending',
      country: 'Canada',
      city: 'Toronto',
      bgColor: 'bg-red-700'
    },
    {
      id: 15,
      name: 'Robert Johnson',
      createdOn: '05 August, 2025',
      status: 'Active',
      country: 'UK',
      city: 'London',
      bgColor: 'bg-green-600'
    },
    {
      id: 16,
      name: 'Emily Davis',
      createdOn: '05 August, 2025',
      status: 'Pending',
      country: 'Australia',
      city: 'Sydney',
      bgColor: 'bg-purple-600'
    },
    {
      id: 17,
      name: 'Michael Wilson',
      createdOn: '06 August, 2025',
      status: 'Active',
      country: 'Germany',
      city: 'Berlin',
      bgColor: 'bg-yellow-600'
    },
    {
      id: 18,
      name: 'Sarah Brown',
      createdOn: '06 August, 2025',
      status: 'Pending',
      country: 'France',
      city: 'Paris',
      bgColor: 'bg-pink-600'
    },
    {
      id: 19,
      name: 'David Miller',
      createdOn: '07 August, 2025',
      status: 'Active',
      country: 'Japan',
      city: 'Tokyo',
      bgColor: 'bg-indigo-600'
    },
    {
      id: 20,
      name: 'Lisa Taylor',
      createdOn: '07 August, 2025',
      status: 'Pending',
      country: 'South Korea',
      city: 'Seoul',
      bgColor: 'bg-teal-600'
    },
    {
      id: 21,
      name: 'James Anderson',
      createdOn: '08 August, 2025',
      status: 'Active',
      country: 'Brazil',
      city: 'Rio de Janeiro',
      bgColor: 'bg-orange-600'
    },
    {
      id: 22,
      name: 'Jennifer Thomas',
      createdOn: '08 August, 2025',
      status: 'Pending',
      country: 'Mexico',
      city: 'Mexico City',
      bgColor: 'bg-cyan-600'
    },
    {
      id: 23,
      name: 'Christopher Martinez',
      createdOn: '09 August, 2025',
      status: 'Active',
      country: 'India',
      city: 'Mumbai',
      bgColor: 'bg-blue-700'
    },
    {
      id: 24,
      name: 'Amanda Garcia',
      createdOn: '09 August, 2025',
      status: 'Pending',
      country: 'China',
      city: 'Beijing',
      bgColor: 'bg-red-800'
    }*/
  ],
  stats:{
    total: 0,
    activeUsers: 0,
    newUsers: 0
  },
  currentUser:null
}

function reducer(state, action) {
  switch (action.type) {
    case "setUsers":
      return { ...state, allUsers: action.payload.users };
    case "setStats":
      return { ...state, stats: action.payload.stats };
    case "setCurrentUser":
      return { ...state, currentUser: action.payload.currentUser };
    default:
      throw new Error("Unknown action");
  }
}



function UserProvider({ children }) {
  const [{ allUsers,stats,currentUser},dispatch] = useReducer(
    reducer,
    initialState
  );

function setAllUsers(allUsers) 
{
  dispatch({ type: "setUsers",   payload: { users: [...allUsers] } } );
}
function setStats(stats) 
{
  dispatch({ type: "setStats", payload: {stats:stats} });
}
function setSelectedUser(currentUser) 
{
  dispatch({ type: "setCurrentUser", payload: {currentUser:currentUser} });
}

  return (
    <UserContext.Provider value={{ allUsers,stats,currentUser,setAllUsers,setStats ,setSelectedUser}}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { useUser, UserProvider };
