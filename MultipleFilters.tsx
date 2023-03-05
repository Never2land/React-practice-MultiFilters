import React, { useEffect, useState } from 'react';
import { items as defaultItems } from './items';
import './style.css';

export default function MultipleFilters() {
  const [items, setItems] = useState(defaultItems);
  const [filteredItems, setFilteredItems] = useState(items);

  let filters = ['Bags', 'Watches', 'Sports', 'Sunglasses'];

  const [appliedFilters, setAppliedFilters] = useState(
    filters.map((filter) => ({
      name: filter,
      isSelected: false,
    }))
  );

  useEffect(() => {
    const curretFilters = appliedFilters
      .filter((filter) => filter.isSelected)
      .map((filter) => filter.name);
    const updatedItems = items.filter((item) =>
      curretFilters.every((filter) => item.category !== filter)
    );
    setFilteredItems(updatedItems);
  }, [appliedFilters]);

  const handleFilter = (name) => {
    const updatedFilters = appliedFilters.map((filter) =>
      filter.name === name
        ? {
            ...filter,
            isSelected: !filter.isSelected,
          }
        : filter
    );
    setAppliedFilters(updatedFilters);
  };
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Algochurn Filters</h2>
      <div className="buttons-container">
        {appliedFilters.map((el, idx) => (
          <button
            className={`button ${el.isSelected ? 'active' : ''}`}
            key={`filters-${idx}`}
            onClick={() => handleFilter(el.name)}
          >
            {el.name}
          </button>
        ))}
      </div>
      <div className="items-container">
        {filteredItems.map((item, idx) => (
          <div key={`items-${idx}`} className="item">
            <p>{item.name}</p>
            <p className="category">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
