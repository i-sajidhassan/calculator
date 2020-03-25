import React, { useEffect, createRef } from 'react';
import './History.css';

const isOverflowedX = element => {
  return element.scrollWidth > element.clientWidth;
};

const isOverflowedY = element => {
  return element.scrollHeight > element.clientHeight;
};

const addScrollbarIfNeeded = element => {
  if (isOverflowedY(element)) element.style.overflowY = 'scroll';
  else element.style.overflowY = 'initial';

  if (isOverflowedX(element)) element.style.overflowX = 'scroll';
  else element.style.overflowX = 'initial';
};

const History = ({
  isShowHistory,
  history,
  onHistoryItemClicked,
  onClearHistory,
  onEqual
}) => {
  const historyList = createRef();
  useEffect(() => {
    addScrollbarIfNeeded(historyList.current);
  }, []);

  const historyClassName = isShowHistory ? 'history' : 'history hidden';

  return (
    <div className={historyClassName}>
      <div className='history-list' ref={historyList}>
        {history.map((item, index) => {
          return (
            <div key={index} className='history-item'>
              <div className='history-item-formula'>
                {item.formula.join('')}
              </div>
              <div
                className='history-item-result'
                value={item.result}
                onClick={onHistoryItemClicked}
              >
                ={item.result}
              </div>
              <hr></hr>
            </div>
          );
        })}
      </div>
      <div className='bottom-btns'>
        <button id='clear-history' onClick={onClearHistory}>
          Clear
        </button>
        <button id='calculate' onClick={onEqual}>
          Equal
        </button>
      </div>
    </div>
  );
};

export default History;
