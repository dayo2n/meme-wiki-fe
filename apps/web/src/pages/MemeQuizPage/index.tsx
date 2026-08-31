import { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useFunnel } from '@/hooks/useFunnel';
import MemeQuizResult from './components/MemeQuizResult';
import { QuizStep } from './components';
import MemeQuizStart from './components/MemeQuizStart';
import { useMemeQuizQuery } from '@meme_wiki/apis';

export type QuizStatus = 'NOT_STARTED' | 'IN_PROGRESS';

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => reject();
  });
};

const MemeQuizPage = () => {
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('NOT_STARTED');
  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const { data: quizData, isLoading } = useMemeQuizQuery();

  // 퀴즈가 없는데 시작하면 렌더링할 스텝이 없어 빈 화면에 갇힌다.
  // 로딩 중에는 '준비 중'이 잠깐 스치지 않도록 판단을 미룬다.
  const hasQuiz = (quizData?.success?.length ?? 0) > 0;
  const isEmpty = !isLoading && !hasQuiz;

  // 이미지 프리로딩
  useEffect(() => {
    if (!quizData?.success) return;

    const loadImages = async () => {
      setIsImagesLoading(true);
      try {
        await Promise.all(
          quizData.success.map((quiz) => preloadImage(quiz.image)),
        );
      } catch (error) {
        console.error('Failed to preload images:', error);
      } finally {
        setIsImagesLoading(false);
      }
    };

    loadImages();
  }, [quizData]);

  const { quizSteps, stepsArray } = useMemo(() => {
    if (!quizData?.success?.length) {
      return {
        quizSteps: { quiz1: 'quiz1', result: 'result' },
        stepsArray: ['quiz1', 'result'],
      };
    }

    const stepsObj = quizData.success.reduce(
      (acc, _, index) => {
        acc[`quiz${index + 1}`] = `quiz${index + 1}`;
        return acc;
      },
      {} as Record<string, string>,
    );

    stepsObj.result = 'result';

    return {
      quizSteps: stepsObj as Record<string, string>,
      stepsArray: Object.values(stepsObj),
    };
  }, [quizData]);

  const { Funnel, setStep } = useFunnel<keyof typeof quizSteps>(
    quizSteps[stepsArray[0]],
  );

  const [stepAnswers, setStepAnswers] = useState<
    Record<keyof typeof quizSteps, boolean>
  >({});

  const onNext = (newStep: keyof typeof quizSteps) => {
    setStep(newStep);
  };

  return (
    <Layout>
      {quizStatus === 'NOT_STARTED' && (
        <MemeQuizStart
          isEmpty={isEmpty}
          onNext={() => {
            if (!hasQuiz) return;
            setQuizStatus('IN_PROGRESS');
          }}
        />
      )}
      {quizStatus === 'IN_PROGRESS' && hasQuiz && (
        <Funnel>
          {[
            ...(quizData?.success ?? []).map((quiz, index) => (
              <Funnel.Step key={`quiz${index + 1}`} step={`quiz${index + 1}`}>
                <QuizStep
                  quiz={quiz}
                  currentStep={`quiz${index + 1}`}
                  currentAnswer={stepAnswers[`quiz${index + 1}`]}
                  isLoading={isImagesLoading}
                  onAnswer={(currentStep, isRight) => {
                    setStepAnswers((prev) => ({
                      ...prev,
                      [currentStep]: isRight,
                    }));

                    const currentStepIndex = stepsArray.indexOf(currentStep);
                    onNext(stepsArray[currentStepIndex + 1]);
                  }}
                />
              </Funnel.Step>
            )),
            <Funnel.Step key="result" step={quizSteps.result}>
              <MemeQuizResult
                rightCount={Object.values(stepAnswers).filter(Boolean).length}
              />
            </Funnel.Step>,
          ]}
        </Funnel>
      )}
    </Layout>
  );
};

export default MemeQuizPage;
