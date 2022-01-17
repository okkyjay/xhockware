import React, {useState} from "react";
import Time from "../Util/Time";

function List({status, lists, handleArticle, page, readFocus}) {
    const isLoading = status
    const articles = lists
    const startIndex = (page - 1) * 10;
    const listsSort = articles.slice(startIndex, startIndex + 10)
    const range = (start, end, delta) => {
        return Array.from(
            {length: (end - start) / delta}, (v, k) => (k * delta) + start
        )
    };
    const [listIndex, setListIndex] = useState('')

    let width = window.innerWidth;
    const decodeHTMLEntities = (str) => {
        let element = document.createElement('div');
        if (str && typeof str === 'string') {
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        return str;
    }
    return(
        <>
            {isLoading?(
                <>
                    {range(1, 10, 1).map((a, index) => (
                        <div key={index} className="article loading">
                            <a className="thumb"></a>
                            <div className="body">
                                <a className="title"></a>
                                <div className="content">

                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ):null}
            {!isLoading && lists.length > 0?(
                <>
                    {listsSort.map((list, index) => (
                        <div onClick={() => {
                            handleArticle(list)
                            setListIndex(index)
                            readFocus?.current?.focus()
                        }} key={index} className={listIndex === index?'article active':'article'}>
                            <a className="thumb">
                                <img src={list.urlToImage}/>
                            </a>
                            <div className="body">
                                <a className="title">{list.title}</a>
                                <div className="author">Author: {list.author}</div>
                                <div className="content">
                                    {decodeHTMLEntities(list.content.replace(/<\/?.*?>/gi, '')).substring(0, 140) + (decodeHTMLEntities(list.content.replace(/<\/?.*?>/gi, '')).length > 140 ? '...' : '')}
                                </div>
                                <div className="date">{Time.timeToFriendly(list.publishedAt,2)}</div>
                            </div>
                        </div>
                    ))}
                </>
            ):null}
            {!isLoading && !lists.length?(
                <div>
                    No Article Found
                </div>
            ):null}
        </>
    )
}
export default List
