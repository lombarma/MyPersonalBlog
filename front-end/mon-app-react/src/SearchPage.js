import React, { useState } from "react";

function SearchPage(){
    const [title, setTitle] = useState('');
    const [article, setArticle] = useState(null);

    const handleSearch = () => {
        fetch(`/article/search?title=${title}`)
            .then(res => res.json())
            .then(data => setArticle(data))
            .catch(error => console.error('Error fetching data', error));
    };
    return (
        <div className="SearchPage">
            <h1>Search Page</h1>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            <button onClick={handleSearch}>Rechercher</button>
            {article ? (
                <div>
                    <h1>{article.title}</h1>
                    <p>{article.content}</p>
                </div>
            ) : (
                <p>Entrez un titre pour rechercher un article</p>
            )}
        </div>
    );
}

export default SearchPage;