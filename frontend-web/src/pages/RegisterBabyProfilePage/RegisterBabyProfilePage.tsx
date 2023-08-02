import { Background } from '@/components/atoms/Background/Background.styles';
import orangeBackground from '@/assets/images/background-orange-to-blue.png';
import { Text } from '@/components/atoms/Text/Text.styles';
import * as S from '@/pages/RegisterBabyProfilePage/RegisterBabyProfilePage.style';
import Back from '@/components/atoms/Back/Back';
import { useState } from 'react';
import RegisterBabyProfile from '@/components/organisms/RegisterBabyProfile/RegisterBabyProfile';
import AddBaby from '@/components/molecules/AddBaby/AddBaby';
import Button from '@/components/atoms/Button/Button';
import theme from '@/styles/theme';

const RegisterBabyProfilePage = () => {
  const [babyNum, setBabyNum] = useState(1);

  const regBaby = () => {
    const babies = [];
    for (let i = 0; i < babyNum; i++) {
      babies.push(<RegisterBabyProfile key={i} />);
    }
    return babies;
  };

  const handleBabyNum = () => setBabyNum(prevBabyNum => prevBabyNum + 1);

  return (
    <Background $background={orangeBackground}>
      <Back />
      <S.RegisterBabyProfilePageContainer>
        <S.RegisterBabyProfilePageWrapper>
          <Text>
            출생일과 성별, <br /> 이름을 입력해주세요
          </Text>
          <div className="scrollable">{regBaby()}</div>
          <div onClick={handleBabyNum}>
            <AddBaby />
          </div>
          <Button
            variant="register"
            size="large"
            $backgroundColor={theme.gradient.orangeBtn}
          >
            등록하기
          </Button>
        </S.RegisterBabyProfilePageWrapper>
      </S.RegisterBabyProfilePageContainer>
    </Background>
  );
};

export default RegisterBabyProfilePage;