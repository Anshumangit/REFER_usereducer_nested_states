import React, { useReducer } from 'react';

const App = () => {

    const istate = {
        customer: [
            {
                name: "Bob",
                address: "1234 Main Street",
                email: "bob@mail.com",
                phone: [
                    {
                        mobile: "555-5555",
                        home: "555-5555"
                    }
                ]
            },
            {
                name: "Reggie",
                address: "5555 Pineapple Lane",
                email: "reggie@mail.com",
                phone: [
                    {
                        mobile: "123-4567",
                        home: {
                            fax: "444-4444",
                            evening: "222-2222"
                        }
                    }
                ]
            }
        ]
    }

    const reducer = (state, action) => {
        console.log(state.customer[0]);

        switch (action.type) {
            case 'CUST0_NAME':
                return {
                    ...state,
                    customer: [
                        {
                            ...state.customer[0],
                            name: action.payload

                        }
                    ]
                }

            case 'CUST0_EMAIL':
                return {
                    ...state,
                    customer: [
                        {
                            ...state.customer[0],
                            email: action.payload
                        }
                    ]

                }
            case 'CUST0_PHONE_MOBNO':
                return {
                    ...state,
                    customer: [
                        {
                            ...state.customer[0],
                            phone: [
                                {
                                    ...state.customer[0].phone[0],
                                    mobile: action.payload
                                }

                            ]

                        }
                    ]

                }

            case 'CUST1_PHONE_EVE_NO':
                return {
                    ...state,
                    customer: [
                        {
                            ...state.customer[0]
                        },
                        {
                            ...state.customer[1],
                            phone: [
                                {
                                    ...state.customer[1].phone[0],
                                    home: {
                                        ...state.customer[1].phone[0].home,
                                        evening: action.payload
                                    }
                                }
                            ]
                        }
                    ]

                }


            default:
                return state;
        }

    }



    const [newstate, dispatcher] = useReducer(reducer, istate);

        // below we're making dispatcher2 and newstate2 to avoid the conflict, earlier we were not 
        // able to change the state for customer[1].phone[0].home.evening with the old dispatcher,
        // so to avoid the conflict, we've made new state and dispatcher, Note: the reducer() will be 
        // same for both newstates and dispatchers

    const [newstate2, dispatcher2] = useReducer(reducer, istate);


    return (
        <>
            <h1>From Customer[0] index : {newstate.customer[0].name}</h1>
            <button onClick={() => { dispatcher({ type: 'CUST0_NAME', payload: 'Steve' }) }}>Change customer[0].name</button>

            <h1>From Customer[0] index : {newstate.customer[0].email}</h1>
            <button onClick={() => { dispatcher({ type: 'CUST0_EMAIL', payload: 'steve@gmail.com' }) }}>Change customer[0].email</button>

            <h1>From Customer[0] index : {newstate.customer[0].phone[0].mobile}</h1>
            <button onClick={() => { dispatcher({ type: 'CUST0_PHONE_MOBNO', payload: '666-888-333' }) }}>Change customer[0].phone[0].mobile</button>

            <h1>From Customer[1] index : {newstate2.customer[1].phone[0].home.evening}</h1>
            <button onClick={() => { dispatcher2({ type: 'CUST1_PHONE_EVE_NO', payload: '222-333-444' }) }}>Change customer[1].phone[0].home.evening </button>

        </>
    )
}

export default App;