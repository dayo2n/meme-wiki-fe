import styled from '@emotion/styled';
import { motion } from 'motion/react';

const Container = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 100px;
`;

const ImageContainer = styled(motion.div)`
  /* position: sticky;
  top: 0; */
  padding: 14px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

interface ButtonContainerProps {
  isWebview: boolean;
}

const ButtonContainer = styled.div<ButtonContainerProps>`
  position: fixed;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  padding: 12px 14px 40px;
  background-color: ${({ theme }) => theme.palette.gray['gray-10']};
  border-top: 1px solid ${({ theme }) => theme.palette.gray['gray-9']};
  display: grid;
  grid-template-columns: ${({ isWebview }) =>
    isWebview ? '1fr 2fr' : '1fr 1fr'};
  gap: 8px;
  z-index: 10;
`;

interface ActionButtonProps {
  isPrimary?: boolean;
  isWebview?: boolean;
  variant?: 'share' | 'download';
}

const ActionButton = styled.button<ActionButtonProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${({ theme, isPrimary, variant }) => {
    if (!variant) {
      return isPrimary
        ? theme.palette.gray['gray-9']
        : theme.palette.main.pink[50];
    }
    return variant === 'share'
      ? theme.palette.main.pink[95]
      : theme.palette.main.pink[50];
  }};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 14px;
  ${({ theme }) => theme.typography.title.subhead2};
  color: ${({ theme, variant }) => {
    if (!variant) {
      return theme.palette.common.white;
    }
    return variant === 'share'
      ? theme.palette.gray['gray-9']
      : theme.palette.common.white;
  }};

  &:hover {
    opacity: 0.9;
  }
`;

const ContentContainer = styled.div`
  padding: 20px 14px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.title.display3};
  color: ${({ theme }) => theme.palette.common.white};
  margin-bottom: 4px;
`;

const HashTags = styled.div`
  ${({ theme }) => theme.typography.body.body2};
  color: ${({ theme }) => theme.palette.common.white};
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.typography.title.subhead2};
  background-color: ${({ theme }) => theme.palette.gray['gray-8']};
  color: ${({ theme }) => theme.palette.gray['gray-1']};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  width: max-content;
  padding: 6px 10px;
  border-radius: 6px;
`;

const SectionText = styled.p`
  ${({ theme }) => theme.typography.body['body-long2']};
  color: ${({ theme }) => theme.palette.gray['gray-4']};
  margin-bottom: 30px;
`;

export {
  Container,
  ImageContainer,
  Image,
  ContentContainer,
  ButtonContainer,
  ActionButton,
  Title,
  HashTags,
  SectionTitle,
  SectionText,
};
