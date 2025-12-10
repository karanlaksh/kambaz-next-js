"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form, Alert } from "react-bootstrap";
import * as client from "../../client";
import { Quiz, Question } from "../../client";

interface Answer {
  questionId: string;
  answer: string | boolean | string[] | null;
}

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const fetchQuiz = async () => {
    try {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
      setAnswers(data.questions.map((q: Question) => ({ 
        questionId: q._id, 
        answer: q.type === "FILL_IN_BLANK" && q.blanks && q.blanks.length > 0
          ? new Array(q.blanks.length).fill("")
          : null 
      })));
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuiz(); }, [qid]);

  const handleAnswerChange = (questionId: string, answer: string | boolean | string[]) => {
    setAnswers(answers.map((a) => a.questionId === questionId ? { ...a, answer } : a));
  };

  const handleBlankAnswerChange = (questionId: string, blankIndex: number, value: string) => {
    setAnswers(answers.map((a) => {
      if (a.questionId === questionId) {
        const currentAnswers = Array.isArray(a.answer) ? [...a.answer] : [];
        currentAnswers[blankIndex] = value;
        return { ...a, answer: currentAnswers };
      }
      return a;
    }));
  };

  const getAnswer = (questionId: string): string | boolean | string[] | null => {
    const found = answers.find((a) => a.questionId === questionId);
    return found ? found.answer : null;
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    let total = 0;
    quiz.questions.forEach((q: Question) => {
      const userAnswer = getAnswer(q._id);
      if (q.type === "MULTIPLE_CHOICE") {
        const correctChoice = q.choices.find((c) => c.isCorrect);
        if (correctChoice && userAnswer === correctChoice._id) total += q.points;
      } else if (q.type === "TRUE_FALSE") {
        if (userAnswer === q.correctAnswer) total += q.points;
      } else if (q.type === "FILL_IN_BLANK") {
        const blanks = q.blanks || [];
        if (blanks.length > 0 && Array.isArray(userAnswer)) {
          const allCorrect = blanks.every((blank, index) => {
            const studentAnswer = userAnswer[index] || "";
            return blank.answers.some(ans => ans.toLowerCase().trim() === studentAnswer.toLowerCase().trim());
          });
          if (allCorrect) total += q.points;
        } else if (q.blankAnswers && q.blankAnswers.length > 0) {
          if (q.blankAnswers.some(ans => ans.toLowerCase().trim() === String(userAnswer).toLowerCase().trim())) {
            total += q.points;
          }
        }
      }
    });
    return total;
  };

  const isAnswerCorrect = (question: Question) => {
    const userAnswer = getAnswer(question._id);
    if (question.type === "MULTIPLE_CHOICE") {
      const correctChoice = question.choices.find((c) => c.isCorrect);
      return correctChoice && userAnswer === correctChoice._id;
    } else if (question.type === "TRUE_FALSE") {
      return userAnswer === question.correctAnswer;
    } else if (question.type === "FILL_IN_BLANK") {
      const blanks = question.blanks || [];
      if (blanks.length > 0 && Array.isArray(userAnswer)) {
        return blanks.every((blank, index) => {
          const studentAnswer = userAnswer[index] || "";
          return blank.answers.some(ans => ans.toLowerCase().trim() === studentAnswer.toLowerCase().trim());
        });
      } else if (question.blankAnswers && question.blankAnswers.length > 0) {
        return question.blankAnswers.some(ans => ans.toLowerCase().trim() === String(userAnswer).toLowerCase().trim());
      }
    }
    return false;
  };

  const handleSubmit = () => { setScore(calculateScore()); setSubmitted(true); };

  const handleRetake = () => {
    setSubmitted(false); setScore(0); setCurrentQuestionIndex(0);
    if (quiz) {
      setAnswers(quiz.questions.map((q: Question) => ({ 
        questionId: q._id, 
        answer: q.type === "FILL_IN_BLANK" && q.blanks && q.blanks.length > 0 ? new Array(q.blanks.length).fill("") : null 
      })));
    }
  };

  const renderFillInBlankInputs = (question: Question) => {
    const blanks = question.blanks || [];
    const currentAnswer = getAnswer(question._id);
    const answerArray = Array.isArray(currentAnswer) ? currentAnswer : [];
    if (blanks.length === 0) {
      return <Form.Control type="text" value={String(currentAnswer || "")}
        onChange={(e) => handleAnswerChange(question._id, e.target.value)} placeholder="Type your answer" />;
    }
    return (
      <div>
        {blanks.map((blank, index) => (
          <div key={blank._id || index} className="mb-2">
            <Form.Label className="small text-muted">Blank {index + 1}:</Form.Label>
            <Form.Control type="text" value={answerArray[index] || ""}
              onChange={(e) => handleBlankAnswerChange(question._id, index, e.target.value)}
              placeholder={`Answer for blank ${index + 1}`} />
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const renderQuestionContent = (question: Question) => (
    <>
      <p>{question.question}</p>
      {question.type === "MULTIPLE_CHOICE" && (
        <div>
          {question.choices.map((choice) => (
            <Form.Check key={choice._id} type="radio" name={`question-${question._id}`} label={choice.text}
              checked={getAnswer(question._id) === choice._id}
              onChange={() => handleAnswerChange(question._id, choice._id)} className="mb-2" />
          ))}
        </div>
      )}
      {question.type === "TRUE_FALSE" && (
        <div>
          <Form.Check type="radio" name={`question-${question._id}`} label="True"
            checked={getAnswer(question._id) === true} onChange={() => handleAnswerChange(question._id, true)} className="mb-2" />
          <Form.Check type="radio" name={`question-${question._id}`} label="False"
            checked={getAnswer(question._id) === false} onChange={() => handleAnswerChange(question._id, false)} />
        </div>
      )}
      {question.type === "FILL_IN_BLANK" && renderFillInBlankInputs(question)}
    </>
  );

  return (
    <div className="p-4">
      <Alert variant="warning"><strong>This is a preview of the published version of the quiz</strong></Alert>
      <h2>{quiz.title}</h2>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}

      {submitted ? (
        <div>
          <Alert variant={score === quiz.points ? "success" : "info"}>
            <h4>Quiz Completed!</h4>
            <p>Your Score: {score} / {quiz.points} points</p>
          </Alert>
          {quiz.questions.map((question: Question, index: number) => (
            <Card key={question._id} className={`mb-3 ${isAnswerCorrect(question) ? "border-success" : "border-danger"}`}>
              <Card.Header className="d-flex justify-content-between">
                <span>Question {index + 1}</span><span>{question.points} pts</span>
              </Card.Header>
              <Card.Body>
                <p>{question.question}</p>
                <p className={isAnswerCorrect(question) ? "text-success" : "text-danger"}>
                  {isAnswerCorrect(question) ? "✓ Correct" : "✗ Incorrect"}
                </p>
              </Card.Body>
            </Card>
          ))}
          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={handleRetake}>Retake Quiz</Button>
            <Button variant="outline-secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}>Keep Editing This Quiz</Button>
          </div>
        </div>
      ) : (
        <div>
          {quiz.oneQuestionAtATime ? (
            <Card className="mb-3">
              <Card.Header className="d-flex justify-content-between">
                <span>Question {currentQuestionIndex + 1}</span><span>{currentQuestion?.points} pts</span>
              </Card.Header>
              <Card.Body>{currentQuestion && renderQuestionContent(currentQuestion)}</Card.Body>
            </Card>
          ) : (
            quiz.questions.map((question: Question, index: number) => (
              <Card key={question._id} className="mb-3">
                <Card.Header className="d-flex justify-content-between">
                  <span>Question {index + 1}</span><span>{question.points} pts</span>
                </Card.Header>
                <Card.Body>{renderQuestionContent(question)}</Card.Body>
              </Card>
            ))
          )}

          {quiz.oneQuestionAtATime && (
            <div className="d-flex justify-content-between mb-3">
              <Button variant="secondary" disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>Previous</Button>
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <Button variant="secondary" disabled={currentQuestionIndex === quiz.questions.length - 1}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</Button>
            </div>
          )}

          <div className="mb-3">
            <h6>Questions</h6>
            <div className="d-flex flex-wrap gap-2">
              {quiz.questions.map((q: Question, index: number) => (
                <Button key={q._id} variant={currentQuestionIndex === index ? "danger" : "outline-secondary"}
                  size="sm" onClick={() => setCurrentQuestionIndex(index)}>{index + 1}</Button>
              ))}
            </div>
          </div>
          <Button variant="danger" onClick={handleSubmit}>Submit Quiz</Button>
        </div>
      )}
    </div>
  );
}