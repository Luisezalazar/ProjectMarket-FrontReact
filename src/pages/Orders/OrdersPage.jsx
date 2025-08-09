
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export const OrdersPage = () => {

    const [orders, setOrders] = useState([])

    //GET
    const fectOrders = async () => {
        const response = await fetch("http://localhost:3000/api/order/getOrder")
        const data = await response.json()
        //console.log(data)
        setOrders(data)
    }
    //Delete
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/order/deleteOrder/${id}`, {
                method: 'DELETE',
            })
            const data = await response.json()
            //console.log("Order delete: ", data)

        } catch (error) {
            console.error("Error deleting order: ", error
            )
        }
    }

    //Patch
    const handleState = async (e, id) => {
        const newState = e.target.value
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === id ? { ...order, state: newState } : order
            )
        );

        try {
            const response = await fetch(`http://localhost:3000/api/order/patchState/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ state: newState })
            });
            const result = await response.json()
            //console.log("State uptaded: ", result)


        } catch (error) {
            console.error("Error update state: ", error)
            //Error in updated 
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === id ? { ...order, state: newState } : order
                )
            );
        }
    }


    useEffect(() => {
        fectOrders()
    }, [])

    return (
        <div className="showcase">
            <h1 className="intro">Welcome to interface for Order</h1>
            <h3>List Orders</h3>
            <div className="button-center">
                <NavLink to="/createOrder"><button className="button">Create Order</button></NavLink>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>State</th>
                            <th>Total</th>
                            <th>Options</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.customer.name}</td>
                                <td>{order.date}</td>
                                <td>

                                    <select className='select-state' value={order.state} onChange={(e) => handleState(e, order.id)}>
                                        <option value="pending">pending</option>
                                        <option value="inProgress">inProgress</option>
                                        <option value="completed">completed</option>
                                    </select>
                                </td>
                                <td>{order.total}</td>
                                <td>
                                    <button type='button' className='button-img' onClick={() => handleDelete(order.id)}><img className='img' src="/img/eliminar.png" /></button>
                                    <NavLink to={`/editOrder/${order.id}`} ><button type='button' className='button-img'><img className='img' src="/img/boton-editar.png" /></button></NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
