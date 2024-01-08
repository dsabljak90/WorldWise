import CountryItem from './CountryItem';
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../context/CitiesContext';

function CountryList() {
  const {cities, isLoading} = useCities()

if(isLoading) return(<Spinner></Spinner>)

if(!cities?.length) return(
  <Message message={'Add your first city by clicking on the city on the map'}/>
)

  const countries = cities.reduce((arrayAccumulator, element) => {
    if (
      !arrayAccumulator?.map((el) => el.country).includes(element.country)
    ) {
      return [...arrayAccumulator, { country: element.country, emoji: element.emoji }]
    }
    else {
      return arrayAccumulator
    }
}, [])
  return(
    <ul className={styles.cityList }>
      {countries?.map(country => <CountryItem country={country} key={country.emoji} />)}
      </ul>
  )
}

export default CountryList;
