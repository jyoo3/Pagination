import { useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import Pagination from '../components/pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter} from "@fortawesome/free-solid-svg-icons";
import TextFilters from '../components/text-filters';
import NumericFilters from '../components/numeric-filters';
import Modal from '../components/modal';
import Head from 'next/head';
export default function Home() {

  const [users,setUsers] = useState([]);
  const [count,setCount] = useState([]);
  const [filters,setFilters] = useState([]);
  const [modalDisplay,setmodalDisplay] = useState({type:'',col:''});
  const [filterDisplay,setfilterDisplay] = useState({col:'',show:false});
  const [options,setOptions] = useState({currentPage:1,col:'emp_id',order:true,limit:5});
  const [searchText,setTextSearch] = useState('');
  const [globalFilter,setGlobalFilter] = useState(false);
  const onPageChange = (page)=>{
  setOptions({...options,currentPage:page});
  }
  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await fetch(`/api/${options.currentPage}`,
                                  {
                                    headers:{
                                      "limit" :`${options.limit}`,
                                      "order" : `${options.order}`,
                                      "col" : `${options.col}`,
                                      "filters" : JSON.stringify(filters),
                                      "gfilter":`${globalFilter}`,
                                    }
                                  });
      const resJson = await res.json();
      setUsers(resJson.data);
      setCount(resJson.count);
    } 
    fetchData();
  },[options,filters,searchText]);

  const handleSearch = () => {
    const search_parameters = Object.keys(Object.assign({}, ...users));
    console.log(search_parameters);
    setGlobalFilter(true);
    const f=[];
    search_parameters.map((col,i)=> f[i] = {col:col,type:'Contains',val:searchText})
    setFilters([...filters,...f])
    }
    const Highlighted = ({text = '', highlight = ''}) => {
      if (!highlight.trim()) {
        return <span>{text}</span>
      }
      const regex = new RegExp(`(${highlight})`, 'i')
      const parts = text.split(regex)
      return (
        <span>
           {parts.map((part, i) => (
               regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
           ))}
       </span>
      )
   }
  console.log(filters);
  return (<>
        <Head>
        <title>Employees</title>
      </Head>
        <center><h1>Employees List</h1> 
        </center> 
        <div className={styles.tableclass} id="main">

        <div className={styles.searchDiv}> 
          <input type="search" className={styles.searchBox}  placeholder='enter text to find...' onInput={(e)=> setTextSearch(e.target.value )} ></input>
          <button onClick={handleSearch} className={styles.search}>search</button>
          <button onClick={()=>{setFilters([]);setGlobalFilter(false);setTextSearch('')}}>Reset Filters</button>
        </div>
        <h4 style={{display: (searchText!='' && globalFilter) ? "block": "none"}}>Search results for {searchText}</h4>

        <div style={{textAlign:"end",marginTop:"5px"}}>
          <label >Enter Page Size:
          <input type="number"  value={options.limit} className={styles.limit} onChange={(e)=>{setOptions({...options,limit:e.target.value})}}></input>
          </label>
        </div>

          <table className={styles.table}>
          <thead>
            <tr key={-1}>
              <th className={styles.th}>
              <div className={styles.colHead}> EmpId 
              <div className={styles.iconHead} >   
                  <div className={styles.sortUp} style={(options.col=='emp_id' && options.order==true ) ? {borderBottom: "5px solid rgb(22, 152, 222)",pointerEvents:"none"}  :{borderBottom: "5px solid black"} } onClick={()=>{ setOptions({...options,order:true,col:"emp_id"})}}> </div>
                  <div className={styles.sortDown} style={(options.col=='emp_id' &&  options.order==false ) ? {borderTop: "5px solid rgb(22, 152, 222)",pointerEvents:"none"} : {borderTop: "5px solid black"} } onClick={()=>{ setOptions({...options,order:false,col:"emp_id"})}}>  </div> 
                </div>
                <div className={styles.filters} id="filters">
                  <FontAwesomeIcon icon={faFilter} style={{color: (!globalFilter && filters.find((obj)=>obj.col=='emp_id') ) ? 'rgb(22, 152, 222)':'rgb(132, 132, 132)'}} onClick={()=>setfilterDisplay({col:'emp_id',show:!filterDisplay.show})}></FontAwesomeIcon>
                  <NumericFilters filterDisplay={filterDisplay} col='emp_id' setfilterDisplay={setfilterDisplay} filters={filters} setFilters={setFilters} setmodalDisplay={setmodalDisplay} />
                </div>
              </div>
              </th>

              <th className={styles.th}>
              <div className={styles.colHead}> Name 
                <div className={styles.iconHead} >   
                  <div className={styles.sortUp} style={(options.col=='name' && options.order==true ) ? {borderBottom: "5px solid rgb(22, 152, 222)",pointerEvents:"none"}  :{borderBottom: "5px solid black"} } onClick={()=>{ setOptions({...options,order:true,col:"name"})}}> </div>
                  <div className={styles.sortDown} style={(options.col=='name' &&  options.order==false ) ? {borderTop: "5px solid rgb(22, 152, 222)",pointerEvents:"none"} : {borderTop: "5px solid black"} } onClick={()=>{ setOptions({...options,order:false,col:"name"})}}>  </div> 
                </div>
                <div className={styles.filters} id="filters">
                  <FontAwesomeIcon icon={faFilter} style={{color: ( !globalFilter && filters.some((obj)=>obj.col=='name')) ? 'rgb(22, 152, 222)' : 'rgb(132, 132, 132)'}} onClick={()=>setfilterDisplay({col:'name',show:!filterDisplay.show})}></FontAwesomeIcon>
                  <TextFilters filterDisplay={filterDisplay} col='name' filters={filters} setFilters={setFilters} setfilterDisplay={setfilterDisplay} setmodalDisplay={setmodalDisplay} />
                </div>
              </div>
              </th>
              
              <th className={styles.th}>
              <div className={styles.colHead}> Age 
              <div className={styles.iconHead} >   
                <div className={styles.sortUp} style={(options.col=='age' && options.order==true ) ? {borderBottom: "5px solid rgb(22, 152, 222)",pointerEvents:"none"}  :{borderBottom: "5px solid black"} } onClick={()=>{ setOptions({...options,order:true,col:"age"})}}> </div>
                <div className={styles.sortDown} style={(options.col=='age' &&  options.order==false ) ? {borderTop: "5px solid rgb(22, 152, 222)",pointerEvents:"none"} : {borderTop: "5px solid black"} } onClick={()=>{ setOptions({...options,order:false,col:"age"})}}>  </div> 
              </div>
              <div className={styles.filters} id="filters">
                  <FontAwesomeIcon icon={faFilter} style={{color: ( !globalFilter && filters.find((obj)=>obj.col=='age')) ? 'rgb(22, 152, 222)' : 'rgb(132, 132, 132)'}} onClick={()=>setfilterDisplay({col:'age',show:!filterDisplay.show})}></FontAwesomeIcon>
                  <NumericFilters filterDisplay={filterDisplay} col='age' setfilterDisplay={setfilterDisplay} filters={filters} setFilters={setFilters} setmodalDisplay={setmodalDisplay} />
                </div>
              </div>
              </th>

              <th className={styles.th}>
              <div className={styles.colHead}> Email
              <div className={styles.iconHead} >   
                <div className={styles.sortUp} style={(options.col=='email' && options.order==true ) ? {borderBottom: "5px solid rgb(22, 152, 222)",pointerEvents:"none"}  :{borderBottom: "5px solid black"} } onClick={()=>{ setOptions({...options,order:true,col:"email"})}}> </div>
                <div className={styles.sortDown} style={(options.col=='email' &&  options.order==false ) ? {borderTop: "5px solid rgb(22, 152, 222)",pointerEvents:"none"} : {borderTop: "5px solid black"} } onClick={()=>{ setOptions({...options,order:false,col:"email"})}}>  </div> 
              </div>
              <div className={styles.filters} id="filters">
                  <FontAwesomeIcon icon={faFilter} style={{color: ( !globalFilter && filters.find((obj)=>obj.col=='email')) ? 'rgb(22, 152, 222)' : 'rgb(132, 132, 132)'}} onClick={()=>setfilterDisplay({col:'email',show:!filterDisplay.show})}></FontAwesomeIcon>
                  <TextFilters filterDisplay={filterDisplay} col='email' filters={filters} setFilters={setFilters} setfilterDisplay={setfilterDisplay} setmodalDisplay={setmodalDisplay} />
                </div>
              </div>
              </th>

              <th className={styles.th}>
              <div className={styles.colHead}> City 
              <div className={styles.iconHead} >   
                <div className={styles.sortUp} style={(options.col=='city' && options.order==true ) ? {borderBottom: "5px solid rgb(22, 152, 222)",pointerEvents:"none"}  :{borderBottom: "5px solid black"} } onClick={()=>{ setOptions({...options,order:true,col:"city"})}}> </div>
                <div className={styles.sortDown} style={(options.col=='city' &&  options.order==false ) ? {borderTop: "5px solid rgb(22, 152, 222)",pointerEvents:"none"} : {borderTop: "5px solid black"} } onClick={()=>{ setOptions({...options,order:false,col:"city"})}}>  </div> 
              </div>
              <div className={styles.filters} id="filters">
                  <FontAwesomeIcon icon={faFilter} style={{color: (!globalFilter && filters.find((obj)=>obj.col=='city')) ? 'rgb(22, 152, 222)' : 'rgb(132, 132, 132)'}} onClick={()=>setfilterDisplay({col:'city',show:!filterDisplay.show})}></FontAwesomeIcon>
                  <TextFilters filterDisplay={filterDisplay} col='city' filters={filters} setFilters={setFilters} setfilterDisplay={setfilterDisplay} setmodalDisplay={setmodalDisplay} />
                </div>
              </div>
              </th>

              <th className={styles.th}>
              <div className={styles.colHead}> DOJ
              <div className={styles.iconHead} >   
                <div className={styles.sortUp} style={(options.col=='doj' && options.order==true ) ? {borderBottom: "5px solid rgb(22, 152, 222)",pointerEvents:"none"}  :{borderBottom: "5px solid black"} } onClick={()=>{ setOptions({...options,order:true,col:"doj"})}}> </div>
                <div className={styles.sortDown} style={(options.col=='doj' &&  options.order==false ) ? {borderTop: "5px solid rgb(22, 152, 222)",pointerEvents:"none"} : {borderTop: "5px solid black"} } onClick={()=>{ setOptions({...options,order:false,col:"doj"})}}>  </div> 
              </div>
              <div className={styles.filters} id="filters">
                  <FontAwesomeIcon icon={faFilter} style={{color: ( !globalFilter && filters.find((obj)=>obj.col=='doj')) ? 'rgb(22, 152, 222)' : 'rgb(132, 132, 132)'}} onClick={()=>setfilterDisplay({col:'doj',show:!filterDisplay.show})}></FontAwesomeIcon>
                  <NumericFilters filterDisplay={filterDisplay} col='doj' filters={filters} setFilters={setFilters} setfilterDisplay={setfilterDisplay} setmodalDisplay={setmodalDisplay} />
                </div>
              </div>
              </th>

            </tr>
            <Modal modalDisplay={modalDisplay} setmodalDisplay={setmodalDisplay} filters={filters} setFilters={setFilters} />

            </thead>
            
            <tbody>
            {
              
              users.map((user) => {
                return(
                      <tr className={styles.tr} key={user.emp_id}>
                        <td className={styles.td}> {user.emp_id}</td>
                        <td className={styles.td}>
                          <Highlighted text={user.name} highlight={searchText}/>
                        </td>
                        <td className={styles.td}>
                        <Highlighted text={`${user.age}`} highlight={searchText}/>
                        </td>
                        <td className={styles.td}>
                          <Highlighted text={user.email} highlight={searchText}/>
                        </td>
                        <td className={styles.td}>                          
                          <Highlighted text={user.city} highlight={searchText}/>
                        </td>
                        <td className={styles.td}>
                          <Highlighted text={`${user.doj.toString().substring(0,10)}`} highlight={searchText}/>
                        </td>
                      </tr>
                );  
              })
          }
          </tbody>
          
          </table>
      <p className={styles.show}> Showing {users.length} out of {count} results</p>
      <Pagination items={count} currentPage={options.currentPage} pageSize={options.limit > 0 ? options.limit : 5} onPageChange={onPageChange} globalFilter={globalFilter} handleSearch={handleSearch}/>

      </div>
  </>)
}

