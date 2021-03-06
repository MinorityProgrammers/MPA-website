import { useMemo } from 'react';

export default function useDefaultValue(questions, step, index) {
  return useMemo(() => {
    try {
      return questions[`question${step - 1}`][index].answer;
    } catch (e) {
      console.log(e);
      return '';
    }
  }, [questions, step]);
}
