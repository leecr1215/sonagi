import { useChangeBabyState } from '@/apis/Baby/Mutations/useChangeBabyState';
import Button from '@/components/atoms/Button/Button';
import { Text } from '@/components/atoms/Text/Text.styles';
import {
  BabyStateChangeButtonContainer,
  BabyStateChangeModalContainer,
  BabyStateChangeModalContentWrapper,
  BabyStateChangeModalTitleWrapper,
} from '@/components/organisms/BabyStateChangeModal/BabyStateChangeModal.styles';
import Modal from '@/components/organisms/Modal/Modal';
import { Toast } from '@/components/organisms/Toast/Toast';
import { babiesOfUserState, selectedBabyState } from '@/states/babyState';
import theme from '@/styles/theme';
import { BabiesOfUser, CustomModal, User } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import OurBabyPage from '../../../pages/OurBabyPage/OurBabyPage';
import { PATH } from '@/constants/path';
import { userInfoState } from '@/states/userState';

interface Props extends CustomModal {
  babyInfo: BabiesOfUser;
}

const BabyStateChangeModal = ({ onModalClose, modalOpen, babyInfo }: Props) => {
  const useChangeBabyStateMutation = useChangeBabyState();
  const [showToast, setShowToast] = useState<boolean>(false);
  const babiesOfUser = useRecoilValue(babiesOfUserState);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const userInfo = useRecoilValue(userInfoState);

  const changeBabyState = (selectedBabyId: number) => {
    useChangeBabyStateMutation.mutate(selectedBabyId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['baby', userInfo.userId]);
        console.log('----------changed', babiesOfUser);
        setShowToast(true);
        onModalClose();
        navigate(PATH.OURBABY);
      },
      onError: () => {
        console.log('삭제 실패');
      },
    });

    // }
  };

  return (
    <BabyStateChangeModalContainer>
      {showToast && (
        <Toast
          message={`${babyInfo.name}님을 삭제하였습니다`}
          setToast={setShowToast}
        />
      )}
      <Modal isOpen={modalOpen} onClose={onModalClose}>
        <>
          <BabyStateChangeModalTitleWrapper>
            <Text size="large" className="title">
              <b>{babyInfo.name}</b> 아이의 데이터를 {'\n'}
              삭제하시겠습니까?
            </Text>
          </BabyStateChangeModalTitleWrapper>
          <BabyStateChangeModalContentWrapper>
            <Text size="medium3" color={theme.color.danger}>
              {babyInfo.name} 아이에 대한 모든 정보가 삭제됩니다.
            </Text>
            <Text size="medium3" color={theme.color.danger}>
              이 작업은 되돌릴 수 없습니다.
            </Text>
          </BabyStateChangeModalContentWrapper>
          <BabyStateChangeButtonContainer>
            <Button option="primary" onClick={onModalClose}>
              취소
            </Button>
            <Button
              option="danger"
              onClick={() => changeBabyState(babyInfo.babyId)}
            >
              삭제
            </Button>
          </BabyStateChangeButtonContainer>
        </>
      </Modal>
    </BabyStateChangeModalContainer>
  );
};

export { BabyStateChangeModal };
