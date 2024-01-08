import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'


const CityContext = createContext()

function reducer(state, action) {
  switch(action.type) {
    case 'loading':
      return{
        ...state,
        isLoading: true
      }
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      }
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !==action.payload),
        currentCity: {}
      }

    case 'rejected':
      return{
        ...state,
        isLoading: true,
        error:action.payload
      }

    default:
      throw new Error('Unknown action')
  }

}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}



function CitiesProvider({ children }) {

  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer,  initialState)

/*   const [cities, setCities] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState()
 */

  const BASE_URL = 'http://localhost:3000'

  useEffect(() => {

    dispatch({type: 'loading'})
    const fetchCities = async () => {
      dispatch({type: 'loading'})
      try {
        const rawData = await fetch(`${BASE_URL}/cities`)
        const data = await rawData.json()
        dispatch({type: 'cities/loaded', payload:data} )
      }
      catch {
        dispatch({type:'rejected', payload:'Problem with data loading'})
      }
    }
    fetchCities();

  },[])

 const getCity = useCallback( async function getCity(id) {

    if(Number(id) === currentCity.id) return

    dispatch({type: 'loading'})
    try {
      const rawData = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await rawData.json()
      dispatch({type: 'city/loaded', payload:data})
    }
    catch {
      dispatch({type:'rejected', payload:'Problem with city loading'})
    }
  },[currentCity.id])

  async function createCity(newCity) {

    dispatch({type: 'loading'})
    try {
      const rawData = await fetch(`${BASE_URL}/cities/`,
      {
        method:'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json'
        }
    })
      const data = await rawData.json()
      dispatch({type:'city/created', payload:data})
    }
    catch {
      console.log('Error in creating city')
    }
  }

  async function deleteCity(id) {
    dispatch({type: 'loading'})
    try {
      await fetch(`${BASE_URL}/cities/${id}`,
      {
        method:'Delete'
        }
    )
      dispatch({type:'city/deleted', payload:id})
    }
    catch {
      console.log('Error in deleting city')
    }
  }

return (
  <CityContext.Provider
    value={{
      cities,
      isLoading,
      currentCity,
      error,
      getCity,
      createCity,
      deleteCity
    }}
  >
    {children}
  </CityContext.Provider>
)
}

function useCities() {
  const context = useContext(CityContext)
  if (context === undefined) throw new Error('CitiesContext is used outside of CityContext.Provider')
  return context
}

export { CitiesProvider, useCities }
