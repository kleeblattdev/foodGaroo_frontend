/* library import */
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
/* SCSS import */
import "./GamesList.scss"
/* component import */
import GameItem from "../gameItem/GameItem"
const GamesList = () => {
    const [games, setGames] = useState([])
    useEffect(() => {
        fetch("https://www.freetogame.com/api/games")
            .then(respone => respone.json())
            .then(data => {
                console.log(data)
                setGames(data)
            })
    }, [])
    const [searchTerm, setSearchTerm] = useState("")
    let [gameSearch, setGameSearch] = useState(0)
    function searchGame(event) {
        setSearchTerm(event.target.value)
        setGameSearch(true)
        console.log(gameSearch)
        console.log(event.target.value)
    }
    console.log("2Search")
    console.log(gameSearch)



    const [getPageErweitern, setPageErweitern] = useState(1)
    useEffect(() => {
        const mehrGames = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                setPageErweitern(getPageErweitern + 1);
            }
        };
        window.addEventListener("scroll", mehrGames);
        return () => { window.removeEventListener("scroll", mehrGames) } 
    } , [getPageErweitern])

    const gamesAllSearch = [...games]
    const gamesMax10 = [...games]
    const gamesMax10St = gamesMax10.slice(0, getPageErweitern * 10)
    console.log(gamesMax10St)

    return (
        <>
            <input type="search" name="search" id="search" onChange={searchGame} />
            <section className="gamesList">
                {gameSearch === true
                    ?
                    (gamesAllSearch && gamesAllSearch.map((games) => {
                        console.log("suche")
                        if (games.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                            return (<GameItem
                                key={uuidv4()}
                                title={games.title}
                                img={games.thumbnail}
                                id={games.id}
                                genre={games.genre}
                            />)
                        } else {
                            return /* setGameSearch(false); */
                            /* (<h1>kein Ergebnis</h1>) */
                        }
                    }
                    ))
                    :
                    (gamesMax10St && gamesMax10St.map((games) => {
                        console.log("max10St")
                        return < GameItem
                            key={uuidv4()}
                            title={games.title}
                            img={games.thumbnail}
                            id={games.id}
                            genre={games.genre}
                        />
                    }))
                }








            </section>
        </>
    );
}
export default GamesList;