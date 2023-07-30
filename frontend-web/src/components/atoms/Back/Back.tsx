import { useCallback } from 'react';
import backArrow from '@/assets/images/icon-arrow-left-grey.png';
import { Image } from '@/components/atoms/Image/Image';
import { useNavigate } from 'react-router-dom';
import { Text } from '@/components/atoms/Text/Text.styles';
import * as S from '@/components/atoms/Back/Back.styles';
import type { ComponentPropsWithRef } from 'react';

interface BackProps extends ComponentPropsWithRef<'div'> {
  children?: string;
}

const Back = ({ children = '뒤로가기' }: BackProps) => {
  const navigate = useNavigate();

  const RouteHandler = useCallback(() => navigate(-1), [navigate]);

  return (
    <S.Back>
      <Image src={backArrow} width={1} onClick={RouteHandler} />
      <Text color={'black3'} size={'medium1'} style={{ marginLeft: '0.5rem' }}>
        {children}
      </Text>
    </S.Back>
  );
};

export default Back;
