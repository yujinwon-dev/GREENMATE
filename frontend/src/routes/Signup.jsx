import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userInfoAtom } from '../atoms/accounts';
import { apiCheckNickname, apiPutUserInfo } from '../api/accounts';
import logo from '../assets/logo.png';
import { signInFirebase } from '../service/chat_service';

const VegeTypes = styled.div`
  display: flex;
`;
const VegeType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-box {
    width: 4rem;
  }
  .vege-img {
    width: 100%;
  }
  p {
    color: ${props => (props.selected ? 'green' : 'black')};
  }
`;

function Signup() {
  const navigate = useNavigate();
  const [userInfo] = useAtom(userInfoAtom);
  const [newNickname, setNewNickname] = useState(userInfo.nickname);
  const [nicknameStatus, SetNicknameStatus] = useState(false);
  const [newVegeType, setVegeType] = useState(null);
  const vegeTypes = [
    { vegeType: 0, title: '비건' },
    { vegeType: 1, title: '락토' },
    { vegeType: 2, title: '오보' },
    { vegeType: 3, title: '락토오보' },
    { vegeType: 4, title: '페스토' },
    { vegeType: 5, title: '폴로' },
    { vegeType: 6, title: '관심' },
  ];
  function checkNickname(putNickname) {
    apiCheckNickname(
      { nickname: putNickname },
      () => {
        SetNicknameStatus(true);
        setNewNickname(putNickname);
      },
      () => {
        SetNicknameStatus(false);
      },
    );
  }
  useEffect(() => {
    checkNickname(newNickname);
  }, []);
  return (
    <>
      <h1>회원가입</h1>
      <div>
        <input
          value={newNickname}
          onChange={event => {
            checkNickname(event.target.value.trim());
          }}
        />
        {nicknameStatus ? (
          <p>사용 가능한 닉네임입니다.</p>
        ) : (
          <p>사용중인 닉네임입니다. 다른 닉네임을 입력해 주세요.</p>
        )}
      </div>
      <h1>채식타입</h1>
      <VegeTypes>
        {vegeTypes.map(type => (
          <VegeType
            key={type.vegeType}
            onClick={() => setVegeType(type.vegeType)}
            selected={newVegeType === type.vegeType}
          >
            <div className="img-box">
              <img className="vege-img" src={logo} alt="vege-img" />
            </div>
            <p>{type.title}</p>
          </VegeType>
        ))}
      </VegeTypes>
      <button
        type="button"
        disabled={!(nicknameStatus && newVegeType !== null)}
        onClick={() => {
          apiPutUserInfo(
            {
              nickname: newNickname,
              vege_type: newVegeType,
            },
            () => navigate('/'),
          );
          signInFirebase({
            id: `${userInfo.id}`,
            nickname: newNickname,
            vegeType: newVegeType,
          });
        }}
      >
        가입완료
      </button>
    </>
  );
}

export default Signup;
