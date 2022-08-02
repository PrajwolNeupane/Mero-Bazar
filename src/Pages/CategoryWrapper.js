import React,{useEffect} from 'react';
// import { useParams} from 'react-router-dom';
import CategoryBody from '../Components/CategoryBody';
import CategoryHeader from '../Components/CategoryHeader';

export default function CategoryWrapper() {

    // const {title} = useParams();

    useEffect(() => {
      window.scrollTo(0,0);
    }, []);

  return (
    <>
    <CategoryHeader />
    <CategoryBody />
    </>
  )
}
