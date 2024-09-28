// ListItem.js
import React from 'react';

const renderItem = (item, index) => (
    <div key={index} className="scroll-item">
      <img src={item.download_url} alt={`photo-${index}`} loading="lazy" className="img-item"/>
    </div>
);

const ListItem = ({ items }) => {
    debugger
    return (
       <>
            {items.length > 0 && items.map(renderItem)}
       </>
    );
}

export default ListItem;
