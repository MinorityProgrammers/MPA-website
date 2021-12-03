import { useMemo } from "react";

export function useDefaultValue(questions, step, index) {
  return useMemo(() => {
    try {
      console.log("set");
      return questions[`question${step - 1}`][index].answer;
    } catch (e) {
      console.log(e);
      return "";
    }
  }, [questions, step]);
}
