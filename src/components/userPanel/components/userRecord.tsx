import Chip from "../../chip";
import DeleteModal from "../../deleteModal";
import Accordion from "../../accordion";
import { IRecord } from "../../../interface/record";
import useIsMobile from "../../../hook/useIsMobile";
import { ResponseAPI } from "../../../interface/pokemon";
import { getAvatarFromPokemon } from "../../pokemonForm/utils/pokemon";

const UserRecord = (props: { updateRecordRef: (record: IRecord) => void, record: IRecord, onDelete: (record: IRecord) => void }) => {
    const { record, onDelete, updateRecordRef } = props;
    const { isMobile } = useIsMobile()
    const { firstName, lastName, address, phoneNumber, selectedPokemon } = record
    return <>
        <Accordion
            header={<>{firstName} {lastName}</>}
            content={<>
                <div className="dark:text-gray-400 font-normal text-gray-700">
                    <div>
                        Address: {address}
                    </div>
                    <div>Phone Number: {phoneNumber}</div>
                    <div className="mb-2">Selected Pokemons : </div>
                    <div className=" flex flex-wrap w-full">
                        {
                            selectedPokemon?.map((pokemon: ResponseAPI, index: number) => {
                                const avatar = getAvatarFromPokemon(pokemon)
                                return <Chip
                                    key={index}
                                    name={pokemon.name}
                                    imgUrl={avatar}
                                />
                            })
                        }
                    </div>
                </div>
            </>}
            suffix={
                <label
                    onClick={() => {
                        updateRecordRef(record)
                    }}
                    htmlFor="delete-modal"
                    className="cursor-pointer mr-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-0.5 text-center"
                >
                    Delete
                </label>
            }
        />
        {isMobile === false && <DeleteModal
            onConfirm={() => {
                onDelete(record)
            }}
        />}
    </>


}
export default UserRecord