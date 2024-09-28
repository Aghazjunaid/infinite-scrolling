// ListItem.js
import React from 'react';

const renderItem = (item, index) => (
    <div key={index} className="scroll-item">
      <img src={item} alt={`photo-${index}`} loading="lazy" />
    </div>
);

const ListItem = ({ items }) => {
    return (
       <>
            {items.length > 0 && items.map(renderItem)}
       </>
    );
}

export default ListItem;
