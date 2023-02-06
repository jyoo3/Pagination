import styles from '../styles/Home.module.css';
export default function NumericFilters(props){
  const handleReset= ()=>{
    const f = props.filters.filter((obj)=>obj.col != props.col);
    props.setFilters(f);
    props.setfilterDisplay({...props.filterDisplay,show:false})
  }
  return <>
      <div className={styles.textFilters} style={{display : (props.filterDisplay.col==props.col && props.filterDisplay.show) ? "block" : "None"}}>
      <button onClick={handleReset} className={styles.search} style={{display:props.filters.find((obj)=>obj.col==props.col) ? "block" : "none"}}>reset</button>
        <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Equals',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Equals </p>
        <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Does Not Equal',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Does Not Equal </p>
        <hr className={styles.hr}  />
        <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Greater Than',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Greater Than </p>
        <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Less Than',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Less Than </p>
        <hr className={styles.hr}  />
        <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Greater Than Equal',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Greater Than Equal </p>
        <p className={styles.eachFilter} onClick={()=>{props.setmodalDisplay({type:'Less Than Equal',col:props.col});props.setfilterDisplay({...props.filterDisplay,show:false})}}>Less Than Equal </p>
      </div>
  </>

}