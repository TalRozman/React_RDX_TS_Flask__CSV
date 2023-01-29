import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { DiamondClass } from '../../env';
import { getDiamondsAsync, getDimondsSumAsync, selectDiamonds, selectSumDiamonds, selectMaxDiamonds, getDimondsMaxPriceAsync, getCutAmountsAsync, getcolorAmountsAsync, selectCutsDiamonds, selectColorsDiamonds, selectMedianCaratPremium, getPremiumMedianCaratAsync, selectavgCaratPerCut, selectavgCPricePerColor, getavgCaratPerCutAsync, getavgPricePerColorAsync, addDiamondAsync, selectRefresh, delDiamondAsync, updDiamondAsync } from './diamondSlice';


export function Diamond() {
  const diamonds = useAppSelector(selectDiamonds);
  const sum = useAppSelector(selectSumDiamonds);
  const max = useAppSelector(selectMaxDiamonds);
  const cuts = useAppSelector(selectCutsDiamonds);
  const colors = useAppSelector(selectColorsDiamonds);
  const median = useAppSelector(selectMedianCaratPremium);
  const avgCaratPerCut = useAppSelector(selectavgCaratPerCut);
  const avgCPricePerColor = useAppSelector(selectavgCPricePerColor);
  const refresh = useAppSelector(selectRefresh);

  const dispatch = useAppDispatch();

  const [showDiamonds, setshowDiamonds] = useState(false)
  const [Upd, setUpd] = useState(false)
  const [msg, setmsg] = useState("")

  const [carat, setcarat] = useState(0)
  const [cut, setcut] = useState("")
  const [color, setcolor] = useState("")
  const [clarity, setclarity] = useState("")
  const [depth, setdepth] = useState(0)
  const [table, settable] = useState(0)
  const [price, setprice] = useState(0)
  const [x, setx] = useState(0)
  const [y, sety] = useState(0)
  const [z, setz] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  const showTable = () => {
    setshowDiamonds(!showDiamonds)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setmsg(diamonds["data"]?.length + " Diamonds in list")
  }

  useEffect(() => {
    dispatch(getDiamondsAsync());
    dispatch(getDimondsSumAsync());
    dispatch(getDimondsMaxPriceAsync());
    dispatch(getCutAmountsAsync());
    dispatch(getcolorAmountsAsync());
    dispatch(getPremiumMedianCaratAsync());
    dispatch(getavgCaratPerCutAsync());
    dispatch(getavgPricePerColorAsync());
  }, [dispatch, refresh])

  const handleAddDiamond = () => {
    if ((carat === 0 || depth === 0 || table === 0 || price === 0 || x === 0 || y === 0 || z === 0) || (cut === "" || color === "" || clarity === "")) {
      setmsg("ERROR - Please fill all fields");
    }
    else {
      const newDimond = new DiamondClass(carat, cut, color, clarity, depth, table, price, x, y, z);
      dispatch(addDiamondAsync(newDimond));
      setmsg("Diamond added successfully")
    }
  }

  const handleUpdateDiamond = (id:number) => {
    const newDimond = new DiamondClass(carat, cut, color, clarity, depth, table, price, x, y, z);
    dispatch(updDiamondAsync([id,newDimond]));
    setmsg("Diamond Updated successfully")
  }

  const [itemsPerPage, setitemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [goTo, setgoTo] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = diamonds["data"]?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
  }

  const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = [];
    const maxPageNumbers = 7;

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const startIndex = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 0);
    const endIndex = Math.min(startIndex + maxPageNumbers, pageNumbers.length);
    const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);

    return (
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <input type={'number'} min={1} onKeyUp={(e) => setgoTo(+e.currentTarget.value)} style={{ height: '40px', width: '100px' }} placeholder="Page #" defaultValue={currentPage} />
        <button onClick={() => setCurrentPage(+goTo)} style={{ height: '40px', width: '60px' }} className="btn btn-success">Go</button>
        <ul className='pagination'>
          {currentPage > 1 && (
            <li className='page-item'>
              <button onClick={() => paginate(1)} className='page-link'>
                First
              </button>
            </li>
          )}
          {currentPage > 1 && (
            <li className='page-item'>
              <button onClick={() => paginate(currentPage - 1)} className='page-link'>
                Previous
              </button>
            </li>
          )}
          {visiblePageNumbers.map((number) => (
            number === currentPage ?
              <li key={number} className='page-item'>
                <button onClick={() => paginate(number)} className='page-link' style={{ backgroundColor: 'Blue', color: 'white' }}>
                  {number}
                </button>
              </li> :
              <li key={number} className='page-item'>
                <button onClick={() => paginate(number)} className='page-link'>
                  {number}
                </button>
              </li>
          ))}
          {currentPage < pageNumbers.length && (
            <li className='page-item'>
              <button onClick={() => paginate(currentPage + 1)} className='page-link'>
                Next
              </button>
            </li>
          )}
          {currentPage < pageNumbers.length && (
            <li className='page-item'>
              <button onClick={() => paginate(pageNumbers.length)} className='page-link'>
                Last
              </button>
            </li>
          )}

        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Diamonds</h1>
      <button className="btn btn-secondary" onClick={() => { setmsg(String(max)) }}>The most expensive</button>
      <button className="btn btn-secondary" onClick={() => { setmsg(String(+sum / diamonds["data"]?.length)) }}>Avg price of diamond</button>
      <button className="btn btn-secondary" onClick={() => { setmsg(String(cuts?.["Ideal"]) + " ideal diamonds") }}>Amount of ideal diamonds</button>
      <button className="btn btn-secondary" onClick={() => { setmsg(`There are ${colors?.length} Colors: ${colors.join(', ')}`) }}>Diamonds color</button>
      <button className="btn btn-secondary" onClick={() => { setmsg(`The carat median for the premium diamonds is: ${String(median)}`) }}>Median of the premium diamonds</button>
      <button className="btn btn-secondary" onClick={() => {
        setmsg(`
          Fair - ${avgCaratPerCut["Fair"]},
          Good - ${avgCaratPerCut["Good"]},
          Ideal - ${avgCaratPerCut["Ideal"]},
          Premium - ${avgCaratPerCut["Premium"]},
          Very Good - ${avgCaratPerCut["VeryGood"]}`)
      }}>Avg of carat for every cut</button>
      <button className="btn btn-secondary" onClick={() => {
        setmsg(`
        D - ${avgCPricePerColor["D"]},
        E - ${avgCPricePerColor["E"]},
        F - ${avgCPricePerColor["F"]},
        G - ${avgCPricePerColor["G"]},
        H - ${avgCPricePerColor["H"]},
        I - ${avgCPricePerColor["I"]},
        J - ${avgCPricePerColor["J"]}`)
      }}>Avg price per color</button>

      <hr />{msg}<hr />

      <button onClick={() => { showTable() }} className="btn btn-primary">Show/Hide All Diamonds</button>
      <br /><br />
      {showDiamonds ?
        (isLoading ?
          <img src='../../loading.gif' alt='loader' /> :
          <>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={diamonds["data"]?.length}
              currentPage={currentPage}
              paginate={paginate}
            /><br />
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>carat</th>
                  <th>cut</th>
                  <th>color</th>
                  <th>clarity</th>
                  <th>depth</th>
                  <th>table</th>
                  <th>price</th>
                  <th>X</th>
                  <th>Y</th>
                  <th>Z</th>
                </tr>
              </thead>
              <tbody>
                {!Upd ?
                  currentData?.map((diamond: any, i: number) =>
                    <tr key={i}>
                      <td> <button className="btn btn-primary" onClick={() => setUpd(true)}>Update</button> <button  className="btn btn-danger" onClick={() => dispatch(delDiamondAsync(i + itemsPerPage*(currentPage-1)))}>Delete</button> </td>
                      <td>{diamond[0]}</td>
                      <td>{diamond[1]}</td>
                      <td>{diamond[2]}</td>
                      <td>{diamond[3]}</td>
                      <td>{diamond[4]}</td>
                      <td>{diamond[5]}</td>
                      <td>{diamond[6]}</td>
                      <td>{diamond[7]}</td>
                      <td>{diamond[8]}</td>
                      <td>{diamond[9]}</td>
                    </tr>) :
                  currentData?.map((diamond: any, i: number) =>
                    <tr key={i}>
                      <td> <button className="btn btn-success" onClick={() => { handleUpdateDiamond(i) }}>Update</button> <button  className="btn btn-danger" onClick={() => setUpd(false)}>Cancel</button> </td>
                      <td><input style={{ width: '100%' }} onChange={(e) => setcarat(+e.currentTarget.value)} defaultValue={diamond[0]} /></td>
                      <td><input style={{ width: '100%' }} onChange={(e) => setcut(e.currentTarget.value)} defaultValue={diamond[1]} /></td>
                      <td><input style={{ width: '100%' }} onChange={(e) => setcolor(e.currentTarget.value)} defaultValue={diamond[2]} /></td>
                      <td><input style={{ width: '100%' }} onChange={(e) => setclarity(e.currentTarget.value)} defaultValue={diamond[3]} /></td>
                      <td><input style={{ width: '100%' }} onChange={(e) => setdepth(+e.currentTarget.value)} defaultValue={diamond[4]} /></td>
                      <td><input style={{ width: '100%' }} onChange={(e) => settable(+e.currentTarget.value)} defaultValue={diamond[5]} /></td>
                      <td><input style={{ width: '100%' }} onChange={(e) => setprice(+e.currentTarget.value)} defaultValue={diamond[6]} /></td>
                      <td><input style={{ width: '100%' }} onChange={(e) => setx(+e.currentTarget.value)} defaultValue={diamond[7]} /></td>
                      <td><input style={{ width: '100%' }} onChange={(e) => sety(+e.currentTarget.value)} defaultValue={diamond[8]} /></td>
                      <td><input style={{ width: '100%' }} onChange={(e) => setz(+e.currentTarget.value)} defaultValue={diamond[9]} /></td>
                    </tr>)
                }
              </tbody>
            </table>
            <br /><Pagination
              itemsPerPage={itemsPerPage}
              totalItems={diamonds["data"]?.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        ) :
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Actions</th>
              <th>carat</th>
              <th>cut</th>
              <th>color</th>
              <th>clarity</th>
              <th>depth</th>
              <th>table</th>
              <th>price</th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button className='btn btn-success' style={{ width: '100%' }} onClick={() => handleAddDiamond()}>Add</button></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => setcarat(+e.currentTarget.value)} /></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => setcut(e.currentTarget.value)} /></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => setcolor(e.currentTarget.value)} /></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => setclarity(e.currentTarget.value)} /></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => setdepth(+e.currentTarget.value)} /></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => settable(+e.currentTarget.value)} /></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => setprice(+e.currentTarget.value)} /></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => setx(+e.currentTarget.value)} /></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => sety(+e.currentTarget.value)} /></td>
              <td><input style={{ width: '100%' }} onKeyUp={(e) => setz(+e.currentTarget.value)} /></td>
            </tr>
          </tbody>
        </table >
      }
    </div >
  );
}
