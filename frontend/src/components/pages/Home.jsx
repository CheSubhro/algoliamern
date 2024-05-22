import React, { useEffect } from 'react'
import { useSelector , useDispatch } from "react-redux"
import { addItem, removeItem, updateItem } from "../../redux/slice/itemsSlice"
import { fetchData } from "../../redux/slice/asynchronousCall"

const Home = () => {

    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items);
    const data = useSelector((state) => state.data.data);

    const handleAddItem = () => {
        
        const newItem = { id: Date.now(), name: "New Item" };
        dispatch(addItem(newItem));
    };

    const handleRemoveItem = (id) => {

        dispatch(removeItem(id));
    };
    
    const handleUpdateItem = (id) => {

        const updatedItem = { id, name: "Updated Item" }; 
        dispatch(updateItem(updatedItem));
    };

    useEffect(() => {

        dispatch(fetchData());
    }, [dispatch]);

    return (
        <>
            <div className="App">
                <header className="">
                    <h1>This is the tool kit Example</h1>
                    <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                        {item.title}
                        {item.price}
                        {item.description}
                        {item.category}
                        </li>
                    ))}
                    </ul>
                    <button onClick={handleAddItem}>Add Item</button>
                    <ul>
                    {items?.map((item) => (
                        <li key={item.id}>
                        {item.id}
                        {item.name}
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        <button onClick={() => handleUpdateItem(item.id)}>Update</button>
                        </li>
                    ))}
                    </ul>
                </header>
            </div>
        </>
    )
}

export default Home