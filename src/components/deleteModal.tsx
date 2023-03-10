const DeleteModal = (props: { onConfirm: Function }) => {
    const { onConfirm } = props;
    return <>
        <input type="checkbox" id="delete-modal" className="modal-toggle" />
        <div className="modal modal-middle ">
            <div className="modal-box bg-gray-300 dark:bg-gray-700">

                <p className="py-4 dark:text-white text-black ">Do you want to delete the record?</p>
                <div className="flex justify-between">
                    <div></div>
                    <div className="md:mx-0 flex mx-auto">
                        <div className="modal-action">
                            <label htmlFor="delete-modal" className=" mr-4 btn text-red-700 hover:bg-gray-200 dark:hover:bg-gray-800 border-red-700  hover:border-red-800  bg-transparent border focus:outline-none  font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center">Cancel</label>
                        </div>
                        <div className="modal-action">
                            <label htmlFor="delete-modal"
                                onClick={() => {
                                    onConfirm()
                                }}
                                className="flex-1 btn  text-white bg-red-700 hover:bg-red-800  border-0 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Confirm</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DeleteModal