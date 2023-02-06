import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import ReactDOM from "react-dom";

export default function Modal(props){
    const [domStatus,setdomStatus] = useState(false)
    const [input,setInput] = useState();
    useEffect(()=>setdomStatus(true),[]);
    const handleFilter = (e)=>{
      console.log(props.modalDisplay);
      e.preventDefault();
      props.setmodalDisplay({type:'',col:''});
      props.setFilters([...props.filters,{col:props.modalDisplay.col,type:props.modalDisplay.type,val:input}]);
      console.log(props.filters);
      console.log(input);
    }
    return domStatus ? ReactDOM.createPortal(
    <>
    <div className={styles.over} style={{display: props.modalDisplay.type ? 'block' : 'none'}}> 
      <div className={styles.modal}>
        <p>{props.modalDisplay.col.toUpperCase()} {props.modalDisplay.type}</p>
        <form onSubmit={handleFilter} className={styles.filterForm}>

        {props.modalDisplay.col == 'doj'
        ? <label>Filter <input type="date" autoFocus={true} placeholder={`enter ${props.modalDisplay.col} pattern`} className={styles.filterInput}  onChange={(e)=>setInput(e.target.value)} ></input></label>
        : <label>Filter <input type="text" autoFocus={true} placeholder={`enter ${props.modalDisplay.col} pattern`} className={styles.filterInput}  onChange={(e)=>setInput(e.target.value)} ></input></label>
      }
          {/* <label>Filter <input type="text" autoFocus={true} placeholder={`enter ${props.modalDisplay.col} pattern`} className={styles.filterInput}  onChange={(e)=>setInput(e.target.value)} ></input>
          </label> */}
          <br/><br/>
          <input  className={styles.submit} type="submit" value="submit" />
          <input className={styles.cancel} type="reset" value = "cancel" onClick={()=>{props.setmodalDisplay({type:'',col:''})}}/> 
        </form>
      </div>
    </div>
    
    </>,document.getElementById('main')) : null
  }