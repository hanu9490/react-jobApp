import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getEmpDetailApi } from '../../redux/slices/getEmpSlice';
import { deleteEmp } from '../../service/apiUrls';
const EmployeesData = () => {

    const dispatch = useDispatch()
    const [empData, setEmpData] = useState([])
    const [loading, setLoading] = useState(false)

    const users = useSelector(state => state.getEmployees)


    useEffect(() => {
        dispatch(getEmpDetailApi())
    }, [])

    useEffect(() => {
        setEmpData(users.emp)
        setLoading(users.status)
    }, [users])

    function deleteUser(id) {
        try {
            axios.delete(deleteEmp.url + `/${id}`)
                .then((res) => {
                    dispatch(getEmpDetailApi())
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        catch (err) {
            console.log(err)
        }
    }




    if (loading === 'loading') {
        return (
            <center><p>Loading...</p></center>
        )
    }
    else if (loading === 'failed') {
        return (
            <center><p>Failed to load data</p></center>
        )
    }


    return (
        <div className='container'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>EmpId</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>DOJ</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empData.map((item) => {
                            return (
                                <>
                                    <tr key={item._id}>
                                        <td>{item.EmpId}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Designation}</td>
                                        <td>{item.doj}</td>
                                        <td>{item.phone}</td>
                                        <h4 onClick={() => { deleteUser(item._id) }}><AiFillDelete /></h4>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default EmployeesData
