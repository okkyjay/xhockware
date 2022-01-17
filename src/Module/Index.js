import React, {useState, useEffect, useRef} from 'react'
import List from "./Components/List";
import Header from "./Components/Header";
import axios from "axios";
import Pagination from "./Components/pagination";
import Time from "./Util/Time";


function Framework() {

    const [loadingList, setLoadingList] = useState(true);
    const [loadingView, setLoadingView] = useState(true);
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [query, setQuery] = useState('');

    const [show, setShow] = useState(true);

    const readFocus = useRef(null);
    let width = window.innerWidth;

    const loadArticles = async () => {
        try {
            let url = 'http://127.0.0.1:8000/v1/news'
            if (query){
                url = url + '?q='+query
                setLoadingView(true)
                setArticle([])
            }
            const response = await axios.get(url);
            if (response && response.status === 200){
                setArticles(response.data.articles)
                setTotal(response.data.articles.length)
                setTotalPages(Math.ceil(response.data.articles.length / 10));
            }
        } catch (e) {

        }
    }

    const handleClick = number => {
        setPage(number);
    };

    const handleSingleArticle = article => {
        setLoadingView(true)
        setArticle(article);
        setLoadingView(false)
        if (width <= 1024){
          setShow(true)
        }
    };

    useEffect(() => {
        loadArticles().then(() => {
            setLoadingList(false)
        })
    }, [query])
    return(
        <>
            <Header />
            <main id="main">
                <section>
                    <div className="article-row">
                        <div className="article-list">
                            <div className="list-item articles">
                                <div>
                                    <input placeholder="Search article" type="text" onChange={(e) => {setQuery(e.target.value)}}/>
                                </div>
                                <div className="article-lists">Articles</div>
                                <List lists={articles} status={loadingList} page={page} handleArticle={handleSingleArticle} readFocus={readFocus}/>
                                <Pagination
                                    totalPages={totalPages}
                                    handleClick={handleClick}
                                    page={page}
                                />
                            </div>
                        </div>
                        <div className="article-view" ref={readFocus}>
                            <div className="list-item articles">
                                <div className={loadingView?'article loading':'article'}>
                                    <a className="thumb">
                                        {!loadingView?(
                                            <img src={!loadingView && article && article.urlToImage}/>
                                        ):null}
                                    </a>
                                    <div className="body">
                                        <a className="title">{!loadingView && article && article.title}</a>
                                        {!loadingView?(
                                            <>
                                                <div className="author">Author: {!loadingView && article && article.author}</div>
                                                <div className="source">Source: <a href={article && article.url} target="_blank">{!loadingView && article && article.author}</a></div>
                                                <div className="date">{!loadingView && article && Time.timeToFriendly(article.publishedAt,2)}</div>
                                            </>
                                        ):null}
                                        {loadingView?(
                                                <div>
                                                    <div style={{marginBottom:'10px'}} className="content">

                                                    </div>
                                                    <a className="title">{!loadingView && article && article.title}</a>
                                                    <div style={{marginBottom:'10px'}} className="content">

                                                    </div>
                                                    <a className="title">{!loadingView && article && article.title}</a>
                                                    <div style={{marginBottom:'10px'}} className="content">

                                                    </div>
                                                    <a className="title">{!loadingView && article && article.title}</a>
                                                    <div style={{marginBottom:'10px'}} className="content">

                                                    </div>
                                                    <a className="title">{!loadingView && article && article.title}</a>
                                                    <div style={{marginBottom:'10px'}} className="content">

                                                    </div>
                                                    <a className="title">{!loadingView && article && article.title}</a>
                                                    <div style={{marginBottom:'10px'}} className="content">

                                                    </div>
                                                    <a className="title">{!loadingView && article && article.title}</a>
                                                    <div style={{marginBottom:'10px'}} className="content">

                                                    </div>
                                                    <a className="title">{!loadingView && article && article.title}</a>
                                                </div>
                                        ):null}
                                    </div>
                                </div>
                                <div className="content">
                                    {!loadingView && article && article.content}
                                </div>
                            </div>
                        </div>
                    </div>
{/*                    <Modal show={show} onClose={() => setShow(false)}>
                        <div className="modal">
                            <div className="content">

                            </div>
                        </div>
                    </Modal>*/}
                </section>
            </main>
        </>
    )
}
export default Framework
