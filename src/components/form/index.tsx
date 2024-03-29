import { PersonalInfoForm,  Review } from "./components";
import PokemonForm from "../pokemonForm"
const Form = (props: { page: number; setPage: React.Dispatch<React.SetStateAction<number>> }) => {
  const { page, setPage } = props;
  if (page === 1) return <PersonalInfoForm setPage={setPage} />;
  if (page === 2) return <PokemonForm setPage={setPage} />;
  if (page === 3) return <Review setPage={setPage} />;
  return <></>;
};

export default Form;
