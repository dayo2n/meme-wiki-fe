import { MemeQuizStartIcon } from '@/assets/icons';
import {
  Container,
  TextSection,
  Title,
  Subtitle,
  IconSection,
  ButtonWrapper,
  StartButton,
} from './MemeQuizStart.styles';
import { AnimatePresence } from 'motion/react';

interface MemeQuizStartProps {
  onNext: () => void;
  /** 풀 수 있는 퀴즈가 없으면 시작할 수 없다. 시작하면 빈 화면에 갇히기 때문이다. */
  isEmpty?: boolean;
}

const MemeQuizStart = ({ onNext, isEmpty = false }: MemeQuizStartProps) => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TextSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Title>{`나 어쩌면 \n밈잘알일지도?!`}</Title>
        <Subtitle>
          {isEmpty
            ? '아직 준비된 퀴즈가 없어요. 조금만 기다려주세요!'
            : '과연 나는 밈잘알일까? 밈퀴즈 풀고 알아보자!'}
        </Subtitle>
      </TextSection>

      <IconSection
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          type: 'spring',
          bounce: 0.4,
        }}
      >
        <MemeQuizStartIcon />
      </IconSection>

      <AnimatePresence>
        <ButtonWrapper
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            type: 'spring',
            stiffness: 100,
          }}
        >
          <StartButton
            disabled={isEmpty}
            onClick={onNext}
            style={{ position: 'relative', opacity: isEmpty ? 0.5 : 1 }}
            whileTap={isEmpty ? undefined : { scale: 0.95 }}
          >
            {isEmpty ? '퀴즈 준비 중' : '밈퀴즈 시작하기'}
          </StartButton>
        </ButtonWrapper>
      </AnimatePresence>
    </Container>
  );
};

export default MemeQuizStart;
