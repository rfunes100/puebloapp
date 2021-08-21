import React from 'react'

const Element = ({ data }) => {

    console.log('elemento', data)
    const { label, value, icon } = data

    return (
        <>
            <td> icono:{icon}</td>
            <td> {value}</td>
            <td>
                {label}
            </td>


        </>

    )
}

export default Element
