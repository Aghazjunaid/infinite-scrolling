import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from '../Component/ListItem';
import './LargeList.css';

const InfiniteScrollList = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
  
    const fetchMoreItems = async () => {
      setLoading(true);
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      setItems(prevItems => [...prevItems, ...response.data]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    };

  useEffect(() => {
    fetchMoreItems();
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 50) return;
        fetchMoreItems();
      }, 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), delay);
    };
};

  return (
    <div>
        <ListItem items={items}/>
        {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default InfiniteScrollList;
