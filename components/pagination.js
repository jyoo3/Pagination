import { useState } from 'react';
import styles from '../styles/Home.module.css';
export default function Pagination({items,pageSize,currentPage,onPageChange,globalFilter,handleSearch}){
    // console.log("pageSize",pageSize);
    const pagesCount = Math.ceil(items/pageSize);
    // console.log("pagesCount",pagesCount);
    const slideLength=3;
    const slides = Math.ceil(pagesCount/slideLength);
    // console.log("Slides",slides);
    const [slide,setSlide] = useState(0); 
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    // console.log("Pages",pages);
    const prev = ()=>{
        if(slide == 0)
            setSlide(0)
        else
            setSlide(slide-slideLength) 
        
        // onPageChange(slide)
        
        // console.log("slideNo:",slide); 
    }
    const next = ()=>{
        if(slide >= pagesCount-slideLength)
            setSlide(slide);
        else
            setSlide(slide+slideLength);
        // onPageChange(slide);
        
        // console.log("slide NO:",slide);
    }
    const handlePage = (page)=>{
        onPageChange(page);
        if(globalFilter)    handleSearch();
    }
    return <>    
    <div className={styles.pagination}>
        <ul className={styles.ul}>
        <li className={slide==0 ? styles.liInActive : styles.li} key={-1} onClick={()=>{prev()}} >
                        <a  className={styles.a} >Prev</a>
        </li>
            {
                pages.slice(slide,slide+slideLength).map((page)=>(
                    <li className={page == currentPage ? styles.liActive : styles.li} key={page} onClick={()=>{handlePage(page); }}>
                        <a className={styles.a} >{page}</a>
                    </li>
                ))
            }
        <li className={slide >= pagesCount-slideLength ? styles.liInActive : styles.li} key={-2} onClick={()=>{next();}}>
                        <a className={styles.a} >Next</a>
        </li>
        </ul>
    </div>
    </>
}