"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { RootState } from "../../../../../store";
import * as client from "../../client";
import { Quiz, Question, Attempt } from "../../client";

interface AnswerState {
  questionId: string;
  answer: string | boolean | null;
}

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastAttempt, setLastAttempt] = useState<Attempt | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<Attempt | null>(null);
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);

  const fetchQuizAndAttempts = async () => {
    try {
      const quizData = await client.findQuizById(qid as string);
      setQuiz(quizData);
      
      // Initialize answers
      setAnswers(quizData.questions.map((q: Question) => ({ 
        questionId: q._id, 
        answer: null 
      })));

      // Get attempt info
      const count = await client.countAttempts(qid as string);
      setAttemptCount(count);

      const latest = await client.findLatestAttempt(qid as string);
      setLastAttempt(latest);

      // Check if can take quiz
      if (!quizData.multipleAttempts && count > 0) {
        setCanTakeQuiz(false);
      } else if (quizData.multipleAttempts && count >= quizData.howManyAttempts) {
        setCanTakeQuiz(false);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizAndAttempts();
  }, [qid]);

  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    setAnswers(answers.map((a) => 
      a.questionId === questionId ? { ...a, answer } : a
    ));
  };

  const getAnswer = (questionId: string): string | boolean | null => {
    const found = answers.find((a) => a.questionId === questionId);
    return found ? found.answer : null;
  };

  const handleSubmit = async () => {
    try {
      const attempt = await client.submitAttempt(qid as string, answers);
      setResult(attempt);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  const getAnswerFromAttempt = (questionId: string) => {
    if (!result) return null;
    return result.answers.find((a) => a.questionId === questionId);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found</div>;

  // Show last attempt results if can't take quiz
  if (!canTakeQuiz && lastAttempt) {
    return (
      <div className="p-4">
        <Alert variant="info">
          <h4>Quiz Already Completed</h4>
          <p>You have used all your attempts for this quiz.</p>
          <p>Your last score: <strong>{lastAttempt.score} / {lastAttempt.totalPoints}</strong></p>
        </Alert>

        <h3>{quiz.title} - Results</h3>

        {quiz.questions.map((question: Question, index: number) => {
          const attemptAnswer = lastAttempt.answers.find((a) => a.questionId === question._id);
          const isCorrect = attemptAnswer?.isCorrect;

          return (
            <Card key={question._id} className={`mb-3 ${isCorrect ? "border-success" : "border-danger"}`}>
              <Card.Header className="d-flex justify-content-between">
                <span>Question {index + 1}</span>
                <span className={isCorrect ? "text-success" : "text-danger"}>
                  {attemptAnswer?.pointsEarned || 0} / {question.points} pts
                </span>
              </Card.Header>
              <Card.Body>
                <p>{question.question}</p>
                <p className={isCorrect ? "text-success" : "text-danger"}>
                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </p>
              </Card.Body>
            </Card>
          );
        })}

        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  // Show results after submission
  if (submitted && result) {
    return (
      <div className="p-4">
        <Alert variant={result.score === result.totalPoints ? "success" : "info"}>
          <h4>Quiz Submitted!</h4>
          <p>Your Score: <strong>{result.score} / {result.totalPoints}</strong></p>
          <p>Attempt {result.attemptNumber} of {quiz.multipleAttempts ? quiz.howManyAttempts : 1}</p>
        </Alert>

        <h3>{quiz.title} - Results</h3>

        {quiz.questions.map((question: Question, index: number) => {
          const attemptAnswer = getAnswerFromAttempt(question._id);
          const isCorrect = attemptAnswer?.isCorrect;

          return (
            <Card key={question._id} className={`mb-3 ${isCorrect ? "border-success" : "border-danger"}`}>
              <Card.Header className="d-flex justify-content-between">
                <span>Question {index + 1}</span>
                <span className={isCorrect ? "text-success" : "text-danger"}>
                  {attemptAnswer?.pointsEarned || 0} / {question.points} pts
                </span>
              </Card.Header>
              <Card.Body>
                <p>{question.question}</p>
                <p className={isCorrect ? "text-success" : "text-danger"}>
                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </p>
              </Card.Body>
            </Card>
          );
        })}

        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  // Quiz taking UI
  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}
      
      <Alert variant="secondary">
        Attempt {attemptCount + 1} of {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
      </Alert>

      {quiz.oneQuestionAtATime ? (
        // One question at a time
        <Card className="mb-3">
          <Card.Header className="d-flex justify-content-between">
            <span>Question {currentQuestionIndex + 1}</span>
            <span>{currentQuestion?.points} pts</span>
          </Card.Header>
          <Card.Body>
            <p>{currentQuestion?.question}</p>

            {currentQuestion?.type === "MULTIPLE_CHOICE" && (
              <div>
                {currentQuestion.choices.map((choice) => (
                  <Form.Check
                    key={choice._id}
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    label={choice.text}
                    checked={getAnswer(currentQuestion._id) === choice._id}
                    onChange={() => handleAnswerChange(currentQuestion._id, choice._id)}
                    className="mb-2"
                  />
                ))}
              </div>
            )}

            {currentQuestion?.type === "TRUE_FALSE" && (
              <div>
                <Form.Check
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  label="True"
                  checked={getAnswer(currentQuestion._id) === true}
                  onChange={() => handleAnswerChange(currentQuestion._id, true)}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  label="False"
                  checked={getAnswer(currentQuestion._id) === false}
                  onChange={() => handleAnswerChange(currentQuestion._id, false)}
                />
              </div>
            )}

            {currentQuestion?.type === "FILL_IN_BLANK" && (
              <Form.Control
                type="text"
                value={String(getAnswer(currentQuestion._id) || "")}
                onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                placeholder="Type your answer"
              />
            )}
          </Card.Body>
        </Card>
      ) : (
        // All questions at once
        quiz.questions.map((question: Question, index: number) => (
          <Card key={question._id} className="mb-3">
            <Card.Header className="d-flex justify-content-between">
              <span>Question {index + 1}</span>
              <span>{question.points} pts</span>
            </Card.Header>
            <Card.Body>
              <p>{question.question}</p>

              {question.type === "MULTIPLE_CHOICE" && (
                <div>
                  {question.choices.map((choice) => (
                    <Form.Check
                      key={choice._id}
                      type="radio"
                      name={`question-${question._id}`}
                      label={choice.text}
                      checked={getAnswer(question._id) === choice._id}
                      onChange={() => handleAnswerChange(question._id, choice._id)}
                      className="mb-2"
                    />
                  ))}
                </div>
              )}

              {question.type === "TRUE_FALSE" && (
                <div>
                  <Form.Check
                    type="radio"
                    name={`question-${question._id}`}
                    label="True"
                    checked={getAnswer(question._id) === true}
                    onChange={() => handleAnswerChange(question._id, true)}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    name={`question-${question._id}`}
                    label="False"
                    checked={getAnswer(question._id) === false}
                    onChange={() => handleAnswerChange(question._id, false)}
                  />
                </div>
              )}

              {question.type === "FILL_IN_BLANK" && (
                <Form.Control
                  type="text"
                  value={String(getAnswer(question._id) || "")}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  placeholder="Type your answer"
                />
              )}
            </Card.Body>
          </Card>
        ))
      )}

      {/* Navigation for one question at a time */}
      {quiz.oneQuestionAtATime && (
        <div className="d-flex justify-content-between mb-3">
          <Button
            variant="secondary"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          >
            Previous
          </Button>
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <Button
            variant="secondary"
            disabled={currentQuestionIndex === quiz.questions.length - 1}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Question Navigation */}
      <div className="mb-3">
        <h6>Questions</h6>
        <div className="d-flex flex-wrap gap-2">
          {quiz.questions.map((q: Question, index: number) => (
            <Button
              key={q._id}
              variant={currentQuestionIndex === index ? "danger" : getAnswer(q._id) ? "success" : "outline-secondary"}
              size="sm"
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      <hr />

      <Button variant="danger" size="lg" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </div>
  );
}