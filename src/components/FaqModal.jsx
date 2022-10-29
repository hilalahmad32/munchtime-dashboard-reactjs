import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import HEADER, { BASE_URL, CATEGORY_URL, FAQ_URL } from '../urls'

const FaqModal = ({ setModal, modal, getFaq }) => {

    /* A hook that is used to set the state of the categories. */
    const [categories, setCategories] = useState([])
    /* Used to set the state of the faqs. */
    const [faqs, setFaqs] = useState([])
    /* Used to set the state of the faq. */
    const [faq, setFaq] = useState({
        cat_id: '',
        answer: '',
        question: '',
    })

    /**
     * The above function is a function that is used to get the category from the API.
     */
    const getCategory = async () => {
        /* Fetching the data from the API. */
        const res = await (await fetch(`${BASE_URL}${CATEGORY_URL}`, {
            method: 'GET',
            headers: HEADER
        })).json();
        /* Setting the state of the categories. */
        if (res.success) {
            setCategories(res.categories)
        }
    }
    /**
     * The inputHandler function takes an event as an argument, and then sets the state of the faq
     * object to the value of the input field
     */
    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setFaq({ ...faq, [name]: value });
    }

    /**
     * It takes the form data, sends it to the server, and if the server responds with a success
     * message, it displays a success message, closes the modal, and fetches the FAQs
     */
    const store = async (e) => {
        /* It prevents the default action of the form from happening. */
        e.preventDefault();

        /* Creating an object that will be sent to the server. */
        const data = {
            cat_id: faq.cat_id,
            question: faq.question,
            answer: faq.answer,
        }

        /* Sending the data to the server. */
        const res = await (await fetch(`${BASE_URL}${FAQ_URL}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: HEADER
        })).json();
        /* Checking if the response from the server is a success, if it is, it displays a success
        message, closes the modal, and fetches the FAQs. If it is not, it displays an error message. */
        if (res.success) {
            /* Displaying a success message. */
            toast(res.message, {
                type: 'success'
            })
            /* Closing the modal. */
            setModal(false)
            /* A function that is used to get the FAQs from the API. */
            getFaq()
        } else {
           /* Displaying an error message. */
            toast(res.message, {
                type: 'error'
            })
        }
    }

    /* A hook that is used to get the categories from the API. */
    useEffect(() => {
      /* A function that is used to get the category from the API. */
        getCategory();
    }, [])

    return (
        <div className={`bg-black/70 absolute h-screen w-full top-0 left-0 ${modal ? 'block' : 'hidden'} translate-x`}>
            <div id="defaultModal" className=" items-center justify-center overflow-y-auto h-screen  overflow-x-hidden flex top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add Faq
                            </h3>
                            <button onClick={() => setModal(!modal)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className='grid grid-cols-2'>
                                <div className=''>
                                    <div>
                                        <label htmlFor="" className='text-[#1F2937]'>Select Category</label>
                                        <select name="cat_id" onChange={inputHandler} id="" className='py-5 px-2 w-full border my-3 rounded-lg outline-none'>
                                           /* A ternary operator that checks if the categories array is
                                           empty, if it is not, it loops through the array and
                                           returns the category name and id. */
                                            {categories && categories.map(val => {
                                                return (
                                                    <option value={val.id}>{val.category_name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor="" className='text-[#1F2937]'>Enter Question</label>
                                    <input type="text" name="question" onChange={inputHandler} id="" className='py-5 px-2 w-full border my-3 rounded-lg outline-none ' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-[#1F2937]'>Enter Answer</label>
                                    <input type="text" name="answer" onChange={inputHandler} id="" className='py-5 px-2 w-full border my-3 rounded-lg outline-none ' />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="submit" onClick={store} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Add</button>
                            <button onClick={() => setModal(!modal)} data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqModal