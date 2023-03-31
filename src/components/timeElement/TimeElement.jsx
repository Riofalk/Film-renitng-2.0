function TimeElement({ searchIndex, tableData, setTableData }) {
  
    function increaseTime(searchIndex, tableData, setTableData) {
      let time = parseInt(tableData[searchIndex].time);
      if (time >= 168) return;
      tableData[searchIndex].time += 12;
      setTableData([...tableData]);
      let userData = JSON.parse(localStorage.getItem("currentUser"));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...userData, moviesInTheCart: tableData })
      );
    }
  
    function decreaseTime(searchIndex, tableData, setTableData) {
      let time = parseInt(tableData[searchIndex].time);
      if (time <= 12) return;
      tableData[searchIndex].time -= 12;
      setTableData([...tableData]);
    }

    let time = tableData[searchIndex].time;
    const timeString = `${time}h`;
    return (
      <span className="time-element">
        <button
          className="time-btn"
          onClick={() => decreaseTime(searchIndex, tableData, setTableData)}
        >
          &lt;
        </button>
        <input id="time-input" name="name" value={timeString} disabled></input>
        <button
          className="time-btn"
          onClick={() => increaseTime(searchIndex, tableData, setTableData)}
        >
          &gt;
        </button>
      </span>
    );
  }

  export default TimeElement;