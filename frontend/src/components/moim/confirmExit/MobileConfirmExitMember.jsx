import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { onDismissAtom } from '../../../atoms/bottomSheet';
import { declineGuest } from '../../../api/moim';
import { excludeFromChatRoom } from '../../../service/chat_service';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content-text {
    font-size: 1.1rem;
    margin: 1.5rem 0;
  }

  button {
    width: 18rem;
    height: 2.8rem;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    margin-bottom: 0.5rem;

    &.delete-btn {
      color: #fff;
      background-color: #fcb448;
    }

    &.cancel-btn {
      color: #000;
      background-color: #f2f2f2;
    }
  }
`;

function MobileConfirmExitMember({ mateId, userId, moimId, setNeedUpdate }) {
  const [, onDismiss] = useAtom(onDismissAtom);

  return (
    <Container>
      <p className="content-text">정말 내보내시겠습니까?</p>
      <button
        type="button"
        className="delete-btn"
        onClick={() => {
          declineGuest(mateId)
            .then(() => {
              setNeedUpdate(prev => prev + 1);
              onDismiss();
            })
            .catch(err => console.log(err));

          excludeFromChatRoom(`${moimId}`, `${userId}`);
        }}
      >
        확인
      </button>
      <button type="button" className="cancel-btn" onClick={() => onDismiss()}>
        취소
      </button>
    </Container>
  );
}

MobileConfirmExitMember.propTypes = {
  mateId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  moimId: PropTypes.string.isRequired,
  setNeedUpdate: PropTypes.func.isRequired,
};

export default MobileConfirmExitMember;
