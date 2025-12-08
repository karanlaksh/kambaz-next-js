"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form, Alert } from "react-bootstrap";
import * as client from "../../client";
import { Quiz, Question } from "../../client";

interface Answer {
  questionId: string;
  answer: string | boolean | null;
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
      setAnswers(data.questions.map((q: Question) => ({ questionId: q._id, answer: null })));
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
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

  const calculateScore = () => {
    if (!quiz) return 0;
    let total = 0;
    quiz.questions.forEach((q: Question) => {
      const userAnswer = getAnswer(q._id);
      if (q.type === "MULTIPLE_CHOICE") {
        const correctChoice = q.choices.find((c) => c.isCorrect);
        if (correctChoice && userAnswer === correctChoice._id) {
          total += q.points;
        }
      } else if (q.type === "TRUE_FALSE") {
        if (userAnswer === q.correctAnswer) {
          total += q.points;
        }
      } else if (q.type === "FILL_IN_BLANK") {
        const isCorrect = q.blankAnswers.some(
          (ans) => ans.toLowerCase().trim() === String(userAnswer).toLowerCase().trim()
        );
        if (isCorrect) {
          total += q.points;
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
      return question.blankAnswers.some(
        (ans) => ans.toLowerCase().trim() === String(userAnswer).toLowerCase().trim()
      );
    }
    return false;
  };

  const handleSubmit = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const handleRetake = () => {
    setSubmitted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    if (quiz) {
      setAnswers(quiz.questions.map((q: Question) => ({ questionId: q._id, answer: null })));
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="p-4">
      <Alert variant="warning">
        <strong>This is a preview of the published version of the quiz</strong>
      </Alert>

      <h2>{quiz.title}</h2>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}

      {submitted ? (
        <div>
          <Alert variant={score === quiz.points ? "success" : "info"}>
            <h4>Quiz Completed!</h4>
            <p>Your Score: {score} / {quiz.points} points</p>
          </Alert>

          {quiz.questions.map((question: Question, index: number) => (
            <Card 
              key={question._id} 
              className={`mb-3 ${isAnswerCorrect(question) ? "border-success" : "border-danger"}`}
            >
              <Card.Header className="d-flex justify-content-between">
                <span>Question {index + 1}</span>
                <span>{question.points} pts</span>
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
            <Button variant="secondary" onClick={handleRetake}>
              Retake Quiz
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
            >
              Keep Editing This Quiz
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {quiz.oneQuestionAtATime ? (
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

          <div className="mb-3">
            <h6>Questions</h6>
            <div className="d-flex flex-wrap gap-2">
              {quiz.questions.map((q: Question, index: number) => (
                <Button
                  key={q._id}
                  variant={currentQuestionIndex === index ? "danger" : "outline-secondary"}
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>

          <Button variant="danger" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </div>
      )}
    </div>
  );
}