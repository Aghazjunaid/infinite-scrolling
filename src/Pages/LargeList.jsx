import React, { useState, useEffect, useRef } from 'react';
import './LargeList.css';
import ListItem from '../Component/ListItem';

const LargeList = () => {
    const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchData();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchData = () => {
    setLoading(true);
    setError(null);
  
    // Wrap setTimeout in a Promise
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newItems = Array.from({ length: 10 }, (_, index) => `https://picsum.photos/200/300?random=${index+1}`);
          setItems(prevItems => [...prevItems, ...newItems]);
          setLoading(false);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1000);
    })
    .catch(error => {
      setError('Failed to fetch data');
      setLoading(false);
    });
  };

  const handleResize = () => {
    // Trigger a re-render when the window size changes
    setItems([...items]);
  };

    const debounce = (func, delay) => {
        let timer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const handleScroll = debounce(() => {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

        if (scrollHeight - scrollTop === clientHeight && !loading) {
            fetchData();
        }
    }, 200); // Adjust debounce delay as needed

    return (
        <div
          ref={containerRef}
          className="scroll-container"
          onScroll={handleScroll}
        >
          {/* {items.map(renderItem)} */}
          <ListItem items={items}/>
          {loading && <div className="loading">Loading...</div>}
        </div>
    );
};

export default LargeList;
