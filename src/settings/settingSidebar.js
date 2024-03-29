import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Menu, MenuItem } from "semantic-ui-react";



const SettingSidebarPage = ({ activeItem }) => {
    // const  [activeItem,setActiveItem] = useState('')
    const history = useHistory()

    const handleItemClick = (id) => {
        history.push(`/${id}`)
    }


    return (<Menu stackable={true}>
        <Menu.Item
            name='Colors'
            color="red"
            active={activeItem === 'color'}
            onClick={() => handleItemClick('colors')}
        />
        <Menu.Item
            name='Types'
            color="red"
            as="a"
            active={activeItem === 'types'}
            onClick={() => handleItemClick('types')}
        />
        <Menu.Item
            name='Sizes'
            color="red"
            active={activeItem === 'sizes'}
            onClick={() => handleItemClick('sizes')}
        />
        <Menu.Item
            name='Length'
            color="red"
            active={activeItem === 'length'}
            onClick={() => handleItemClick('length')}
        />
         <Menu.Item
            name='Others'
            color="red"
            active={activeItem === 'others'}
            onClick={() => handleItemClick('others')}
        />

    </Menu>)
}


export default SettingSidebarPage