import React, { useRef } from 'react';

import { useSelector } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { RootState } from '../../reducers';
import { DeleteImage } from '../Button/ImageButtons';
import GifticonItem from '../GifticonItem';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  padding: 3vh 3vw 5vh 3vw;
  width: 80vw;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;

  @media screen and (max-width: 960px) {
    padding: 3vh 3vw 5vh 3vw;
    width: 80vw;
    height: 60vh;
  }
`;

const PointContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PointLabel = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
`;

const Point = styled.label`
  padding: 1.3vh;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;
interface Gifticon {
  name: string;
  price: number;
  imgUrl: string;
}

interface GifticonPurchaseModalProps {
  setPurchaseModalOpen: (arg: boolean) => void;
  theme: DefaultTheme;
}

export default function GifticonPurchaseModal({ setPurchaseModalOpen, theme }: GifticonPurchaseModalProps) {
  const userState = useSelector((state: RootState) => state.userInformation);
  const modalRef = useRef<HTMLDivElement>(null);
  const gifticons: Gifticon[] = [
    {
      name: '배스킨라빈스 파인트 아이스크림',
      price: 89,
      imgUrl:
        'https://www.biz-con.co.kr/upload/images/202208/400_20220817100052849_%ED%8C%8C%EC%9D%B8%ED%8A%B8-%EC%95%84%EC%9D%B4%EC%8A%A4%ED%81%AC%EB%A6%BC.jpg',
    },
    {
      name: '스타벅스 아이스 카페 아메리카노 T',
      price: 45,
      imgUrl: 'https://www.biz-con.co.kr/upload/images/202201/400_20220110114052876.jpg',
    },
    {
      name: 'BBQ 황금올리브치킨+콜라1.25L',
      price: 225,
      imgUrl: 'https://www.biz-con.co.kr/upload/images/202204/400_20220429212217700_bbq.jpg',
    },
    {
      name: '버거킹 콰트로치즈와퍼세트',
      price: 99,
      imgUrl: 'https://www.biz-con.co.kr/upload/images/202303/400_20230309132045096_3.jpg',
    },
  ];

  useOnClickOutside({
    ref: modalRef,
    handler: () => {
      setPurchaseModalOpen(false);
    },
  });

  return (
    <Container>
      <ModalContainer ref={modalRef} theme={theme}>
        <HeadContainer theme={theme}>
          <PointContainer theme={theme}>
            <PointLabel theme={theme}>보유 포인트</PointLabel>
            <Point theme={theme}>{userState.point}</Point>
          </PointContainer>
          <DeleteImage
            data-testid="closeModal"
            name="closeModal"
            onClick={() => setPurchaseModalOpen(false)}
            theme={theme}
          />
        </HeadContainer>

        {gifticons.map((gifticon: Gifticon) => (
          <div key={gifticon.name}>
            <GifticonItem
              name={gifticon.name}
              price={gifticon.price}
              imgUrl={gifticon.imgUrl}
              handleClick={() => setPurchaseModalOpen(false)}
              theme={theme}
              disabled={userState.point < gifticon.price}
            />
          </div>
        ))}
      </ModalContainer>
    </Container>
  );
}
