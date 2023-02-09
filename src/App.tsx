import React, { ChangeEvent, useState } from "react";
import logo from './logo.svg';


const App = () => {
  interface SearchResult {
    itemNumber: string;
    orderNumber: string;
    type: string;
  }
  const [itemNumber, setItemNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [type, setType] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleItemNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemNumber(event.target.value);
  };

  const handleOrderNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrderNumber(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(Array.from(event.target.selectedOptions, (item: HTMLOptionElement) => item.value));
  };

  const handleSearch = () => {
    // Perform the search based on the entered item number and order number, and selected type
    const newSearchResults = searchData(itemNumber, orderNumber, type);
    setSearchResults(newSearchResults);
  };

  const handleReset = () => {
    setItemNumber("");
    setOrderNumber("");
    setType([]);
    setSearchResults([]);
  };

  const searchData = (itemNumber: string, orderNumber: string, type: string[]) => {
    // This is a dummy implementation. In a real scenario, you would call an API here
    // to fetch the data from a database or another source.

    // Dummy data
    const data = [
      { itemNumber: "123", orderNumber: "456", type: "EDF" },
      { itemNumber: "124", orderNumber: "457", type: "CAO" },
      { itemNumber: "125", orderNumber: "458", type: "SFO" },
      { itemNumber: "126", orderNumber: "459", type: "EDF" },
    ];

    // Split the comma separated values into arrays
    const itemNumbers = itemNumber.split(",");
    const orderNumbers = orderNumber.split(",");

    // Filter the data based on the input
    return data.filter(
      (item) =>
        (itemNumber === "" || itemNumbers.includes(item.itemNumber)) &&
        (orderNumber === "" || orderNumbers.includes(item.orderNumber)) &&
        (type.length === 0 || type.includes(item.type))
    );
  };


  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between">
        <div className="w-1/2 mr-6">
          <input
            className="w-full py-2 px-3 bg-gray-200 rounded-lg"
            type="text"
            placeholder="Item Number"
            value={itemNumber}
            onChange={handleItemNumberChange}
          />
        </div>
        <div className="w-1/2 mr-6">
          <input
            className="w-full py-2 px-3 bg-gray-200 rounded-lg"
            type="text"
            placeholder="Order Number"
            value={orderNumber}
            onChange={handleOrderNumberChange}
          />
        </div>
        <div className="w-1/4">
          <select
            className="w-full py-2 px-3 bg-gray-200 rounded-lg"
            multiple
            onChange={handleTypeChange}
          >
            <option value="EDF">EDF</option>
            <option value="CAO">CAO</option>
            <option value="SFO">SFO</option>
          </select>
        </div>
        <div className="w-1/4">
          <button
            className="w-full py-2 px-3 bg-blue-500 rounded-lg text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {searchResults.length > 0 && (
        <table className="mt-10 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Item Number</th>
              <th className="px-4 py-2">Order Number</th>
              <th className="px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => (
              <tr key={result.itemNumber} className="hover:bg-gray-200">
                <td className="px-4 py-2">{result.itemNumber}</td>
                <td className="px-4 py-2">{result.orderNumber}</td>
                <td className="px-4 py-2">{result.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};



export default App;
