import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { openSheetAtom } from '../../atoms/bottomSheet';
import ConfirmLogout from './ConfirmLogout';
import CenteredModalBase from '../common/CenteredModalBase';
import { userInfoAtom } from '../../atoms/accounts';

const Ul = styled.ul`
  list-style: none;
  padding: 1rem 0;
  border: ${props => (props.isDesktop ? '1px solid #a9a9a9' : null)};
  border-radius: 5px;
`;
const Li = styled.li`
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f2;
`;
const LastLi = styled.li`
  padding: 0.8rem 1.5rem;
  cursor: pointer;
`;
const Div = styled.div`
  text-align: end;
  padding-top: 0.5rem;
  display: flex;
  justify-content: end;
`;
const P = styled.p`
  color: #a9a9a9;
  font-size: 12px;
  cursor: pointer;
`;

function SettingLst({ isDesktop, setPageStatus }) {
  const navigate = useNavigate();
  const [, setOpen] = useAtom(openSheetAtom);
  const [{ language }] = useAtom(userInfoAtom);
  const logoutFunc = () => {
    sessionStorage.clear();
    navigate('/intro');
  };
  return (
    <>
      <Ul isDesktop={isDesktop}>
        <Li onClick={() => setPageStatus('setNickname')}>
          {language === 0 ? '내 정보' : 'Account'}
        </Li>
        <Li onClick={() => setPageStatus('setLanguage')}>
          {language === 0 ? '언어설정' : 'Language'}
        </Li>
        <Li onClick={() => setPageStatus('registerNewRestau')}>
          {language === 0 ? '식당등록요청' : 'Send Feedback'}
        </Li>
        {isDesktop ? (
          <LastLi onClick={() => document.querySelector('#dialog').showModal()}>
            {language === 0 ? '로그아웃' : 'Logout'}
          </LastLi>
        ) : (
          <LastLi
            onClick={() => {
              setOpen({
                open: true,
                component: <ConfirmLogout />,
              });
            }}
          >
            {language === 0 ? '로그아웃' : 'Logout'}
          </LastLi>
        )}
      </Ul>
      <Div>
        <P onClick={() => setPageStatus('deleteUser')}>
          {language === 0 ? '탈퇴하기' : 'Delete account'}
        </P>
      </Div>
      <CenteredModalBase mainAction={logoutFunc}>
        <h1>정말 로그아웃하시겠습니까?</h1>
      </CenteredModalBase>
    </>
  );
}

SettingLst.propTypes = {
  setPageStatus: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
export default SettingLst;
