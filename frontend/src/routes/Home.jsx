import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import ResponsiveNavbar from '../components/common/navbar/ResponsiveNavbar';
import FloatingActionBtn from '../components/common/FloatingActionBtn';
import MoimCard from '../components/moim/MoimCard';
import HomeCarousel from '../components/home/HomeCarousel';
import FilterSearchBar from '../components/home/FilterSearchBar';
import { categoryAtom, moimListAtom } from '../atoms/moim';
import { getMoimList } from '../api/moim';
import { snakeToCamel } from '../utils/formatKey';

const Container = styled.div`
  padding: 5rem 1rem 5rem 1rem;

  .inform-txt-container {
    width: 100%;
    text-align: center;
    margin: 3rem 0;
  }

  @media screen and (min-width: 1025px) {
    padding: 60px 3rem 0 calc(130px + 3rem);

    .moim-card-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      grid-auto-rows: minmax(100px, auto);
    }
  }

  @media screen and (min-width: 1440px) {
    .moim-card-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (min-width: 1800px) {
    .moim-card-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

const Hr = styled.hr`
  border: none;

  @media screen and (max-width: 1025px) {
    border-bottom: 1px solid #a9a9a9;
    margin: 1rem 0;
  }
`;

function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [, setSelectedCategory] = useAtom(categoryAtom);
  const [moimList, setMoimList] = useAtom(moimListAtom);

  useEffect(() => {
    setSelectedCategory(6);
    getMoimList(
      res => {
        const formattedData = res.data.map(item => ({
          ...snakeToCamel(item),
          time: new Date(item.time),
        }));
        setMoimList(formattedData);
      },
      () => {},
    );
  }, []);

  return (
    <Container>
      <ResponsiveNavbar />
      <FloatingActionBtn isForMoim />
      <HomeCarousel />
      <FilterSearchBar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <Hr />
      <div className="moim-card-container">
        {moimList.length > 0 ? (
          moimList.map(moimInfo => (
            <MoimCard
              key={moimInfo.id}
              moimInfo={moimInfo}
              showStatus={false}
            />
          ))
        ) : (
          <div className="inform-txt-container">
            <p>지금 모집 중인 모임이 없습니다.</p>
            <p>모임을 만들어보세요!</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Home;
