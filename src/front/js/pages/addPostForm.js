import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";

const AddPostForm = () => {
    const { store, actions} = useContext(Context);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        actions.getCountries();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.addAPost(title,description,country,image)
        if (result.success) {
            alert("Post created successfully!");
        } else {
            alert("Error creating post: " + result.message);
        }
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    };
    const filteredCountries = store.countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className="m-5">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" value={title} class="form-control" onChange={(e) => setTitle(e.target.value)} required />                
            </div>
            <div className="mb-3">
                <label for="description" class="form-label">description</label>
                <input type="text" value={description} class="form-control" onChange={(e) => setDescription(e.target.value)} required />                
            </div>
            <div className="mb-3">
                <label for="imageUrl" class="form-label">Image url</label>
                <input type="text" value={image} class="form-control" onChange={(e) => setImage(e.target.value)} required />                
            </div>
            <div className="mb-3 d-flex justify-content-center">
            <label htmlFor="country" className="form-label"></label>
                    <div className="dropdown">
                        <button className="btn btn-form  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {country || 'Select a country'}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </li>
                            {filteredCountries.map((country, index) => (
                                <li key={index}>
                                    <a className="dropdown-item" href="#" onClick={() => handleCountryChange({ target: { value: country.name.common } })}>
                                        {country.name.common}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            <button type="submit" className="btn btn-form">Add Post</button>
        </form>
        </div>
    )
}

export default AddPostForm