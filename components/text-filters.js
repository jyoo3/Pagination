import styles from '../styles/Home.module.css';
export default function TextFilters(props){
    const handleReset= ()=>{
      const f = props.filters.filter((obj)=>obj.col != props.col);
      props.setFilters(f);
      props.setfilterDisplay({...props.filterDisplay,show:false})
    }
    return <>
          
         <div className={styles.textFilters} style={{display : (props.filterDisplay.col == props.col && props.filterDisplay.show) ? "block" : "None"}}>
         <button onClick={handleReset} className={styles.search} style={{display:props.filters.find((obj)=>obj.col==props.col) ? "block" : "none"}}>reset</button>
          <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Equals',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Equals </p>
          <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Does Not Equal',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Does Not Equal </p>
          <hr className={styles.hr}  />
          <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Begins With',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Begins With </p>
          <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Ends With',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Ends With </p>
          <hr className={styles.hr}  />
          <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Contains',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Contains </p>
          <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Does Not Contain',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Does Not Contain </p>
        </div>
    </>
  
  }