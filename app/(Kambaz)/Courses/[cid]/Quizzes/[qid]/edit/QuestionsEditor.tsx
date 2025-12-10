"use client";

import { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";
import { Quiz, Question, Choice, Blank } from "../../client";
import * as client from "../../client";
import { v4 as uuidv4 } from "uuid";

interface Props {
  quiz: Quiz;
  setQuiz: (quiz: Quiz) => void;
}

export default function QuestionsEditor({ quiz, setQuiz }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  if (!quiz || !quiz.questions) {
    return <div className="p-3">Loading questions...</div>;
  }

  const handleAddQuestion = async () => {
    const newQuestion: Partial<Question> = {
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: [
        { _id: uuidv4(), text: "Option 1", isCorrect: true },
        { _id: uuidv4(), text: "Option 2", isCorrect: false },
      ],
      correctAnswer: true,
      blanks: [],
      blankAnswers: [],
    };
    const created = await client.addQuestion(quiz._id, newQuestion);
    const updatedQuiz = {
      ...quiz,
      questions: [...quiz.questions, created],
      points: quiz.points + (created.points || 1),
    };
    setQuiz(updatedQuiz);
    setEditingId(created._id);
    setEditingQuestion(created);
  };

  const handleEditClick = (question: Question) => {
    setEditingId(question._id);
    let blanks = question.blanks || [];
    if (blanks.length === 0 && question.blankAnswers && question.blankAnswers.length > 0) {
      blanks = [{ _id: uuidv4(), answers: question.blankAnswers }];
    }
    setEditingQuestion({ ...question, blanks });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion) return;
    await client.updateQuestion(quiz._id, editingQuestion._id, editingQuestion);
    const updatedQuestions = quiz.questions.map((q: Question) =>
      q._id === editingQuestion._id ? editingQuestion : q
    );
    const totalPoints = updatedQuestions.reduce((sum: number, q: Question) => sum + q.points, 0);
    setQuiz({ ...quiz, questions: updatedQuestions, points: totalPoints });
    setEditingId(null);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await client.deleteQuestion(quiz._id, questionId);
    const updatedQuestions = quiz.questions.filter((q: Question) => q._id !== questionId);
    const totalPoints = updatedQuestions.reduce((sum: number, q: Question) => sum + q.points, 0);
    setQuiz({ ...quiz, questions: updatedQuestions, points: totalPoints });
  };

  const updateEditingQuestion = (field: string, value: unknown) => {
    if (!editingQuestion) return;
    setEditingQuestion({ ...editingQuestion, [field]: value });
  };

  const addChoice = () => {
    if (!editingQuestion) return;
    const newChoice: Choice = { _id: uuidv4(), text: "", isCorrect: false };
    setEditingQuestion({
      ...editingQuestion,
      choices: [...editingQuestion.choices, newChoice],
    });
  };

  const updateChoice = (choiceId: string, field: string, value: string | boolean) => {
    if (!editingQuestion) return;
    const updatedChoices = editingQuestion.choices.map((c: Choice) =>
      c._id === choiceId ? { ...c, [field]: value } : c
    );
    if (field === "isCorrect" && value === true) {
      updatedChoices.forEach((c: Choice) => {
        if (c._id !== choiceId) c.isCorrect = false;
      });
    }
    setEditingQuestion({ ...editingQuestion, choices: updatedChoices });
  };

  const removeChoice = (choiceId: string) => {
    if (!editingQuestion) return;
    setEditingQuestion({
      ...editingQuestion,
      choices: editingQuestion.choices.filter((c: Choice) => c._id !== choiceId),
    });
  };

  const addBlank = () => {
    if (!editingQuestion) return;
    const newBlank: Blank = { _id: uuidv4(), answers: [""] };
    setEditingQuestion({
      ...editingQuestion,
      blanks: [...(editingQuestion.blanks || []), newBlank],
    });
  };

  const removeBlank = (blankId: string) => {
    if (!editingQuestion) return;
    setEditingQuestion({
      ...editingQuestion,
      blanks: editingQuestion.blanks.filter((b: Blank) => b._id !== blankId),
    });
  };

  const addAnswerToBlank = (blankId: string) => {
    if (!editingQuestion) return;
    const updatedBlanks = editingQuestion.blanks.map((b: Blank) =>
      b._id === blankId ? { ...b, answers: [...b.answers, ""] } : b
    );
    setEditingQuestion({ ...editingQuestion, blanks: updatedBlanks });
  };

  const updateBlankAnswer = (blankId: string, answerIndex: number, value: string) => {
    if (!editingQuestion) return;
    const updatedBlanks = editingQuestion.blanks.map((b: Blank) => {
      if (b._id === blankId) {
        const newAnswers = [...b.answers];
        newAnswers[answerIndex] = value;
        return { ...b, answers: newAnswers };
      }
      return b;
    });
    setEditingQuestion({ ...editingQuestion, blanks: updatedBlanks });
  };

  const removeAnswerFromBlank = (blankId: string, answerIndex: number) => {
    if (!editingQuestion) return;
    const updatedBlanks = editingQuestion.blanks.map((b: Blank) => {
      if (b._id === blankId) {
        return { ...b, answers: b.answers.filter((_, i) => i !== answerIndex) };
      }
      return b;
    });
    setEditingQuestion({ ...editingQuestion, blanks: updatedBlanks });
  };

  const renderQuestionEditor = () => {
    if (!editingQuestion) return null;

    return (
      <Card className="mb-3 border-primary">
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Question Title"
                value={editingQuestion.title}
                onChange={(e) => updateEditingQuestion("title", e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={editingQuestion.type}
                onChange={(e) => updateEditingQuestion("type", e.target.value)}
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True/False</option>
                <option value="FILL_IN_BLANK">Fill in the Blank</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center">
                <span className="me-2">pts:</span>
                <Form.Control
                  type="number"
                  value={editingQuestion.points}
                  onChange={(e) => updateEditingQuestion("points", parseInt(e.target.value) || 0)}
                  style={{ width: "80px" }}
                />
              </div>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editingQuestion.question}
              onChange={(e) => updateEditingQuestion("question", e.target.value)}
              placeholder={editingQuestion.type === "FILL_IN_BLANK" 
                ? "e.g., The capital of France is ____ and Spain is ____." 
                : "Enter your question here..."}
            />
          </Form.Group>

          {editingQuestion.type === "MULTIPLE_CHOICE" && (
            <div className="mb-3">
              <Form.Label>Answers</Form.Label>
              {editingQuestion.choices.map((choice: Choice) => (
                <div key={choice._id} className="d-flex align-items-center mb-2">
                  <Form.Check
                    type="radio"
                    name="correctAnswer"
                    checked={choice.isCorrect}
                    onChange={() => updateChoice(choice._id, "isCorrect", true)}
                    className="me-2"
                  />
                  <Form.Control
                    type="text"
                    value={choice.text}
                    onChange={(e) => updateChoice(choice._id, "text", e.target.value)}
                    placeholder="Answer text"
                    className={choice.isCorrect ? "border-success" : ""}
                  />
                  <Button variant="link" className="text-danger" onClick={() => removeChoice(choice._id)}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="link" onClick={addChoice} className="p-0">
                <FaPlus className="me-1" /> Add Another Answer
              </Button>
            </div>
          )}

          {editingQuestion.type === "TRUE_FALSE" && (
            <div className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="True"
                  name="tfAnswer"
                  checked={editingQuestion.correctAnswer === true}
                  onChange={() => updateEditingQuestion("correctAnswer", true)}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name="tfAnswer"
                  checked={editingQuestion.correctAnswer === false}
                  onChange={() => updateEditingQuestion("correctAnswer", false)}
                />
              </div>
            </div>
          )}

          {editingQuestion.type === "FILL_IN_BLANK" && (
            <div className="mb-3">
              <Form.Label>Blanks (in order they appear in the question)</Form.Label>
              <p className="text-muted small">
                Add blanks in the same order as they appear in your question text. Each blank can have multiple correct answers (case-insensitive).
              </p>
              
              {(editingQuestion.blanks || []).map((blank: Blank, blankIndex: number) => (
                <Card key={blank._id} className="mb-3 bg-light">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong>Blank {blankIndex + 1}</strong>
                      <Button variant="outline-danger" size="sm" onClick={() => removeBlank(blank._id)}>
                        <FaTrash className="me-1" /> Remove Blank
                      </Button>
                    </div>
                    
                    <Form.Label className="small">Correct Answers:</Form.Label>
                    {blank.answers.map((answer: string, answerIndex: number) => (
                      <div key={answerIndex} className="d-flex align-items-center mb-2">
                        <Form.Control
                          type="text"
                          value={answer}
                          onChange={(e) => updateBlankAnswer(blank._id, answerIndex, e.target.value)}
                          placeholder={`Correct answer ${answerIndex + 1}`}
                          style={{ width: "250px" }}
                        />
                        <Button
                          variant="link"
                          className="text-danger"
                          onClick={() => removeAnswerFromBlank(blank._id, answerIndex)}
                          disabled={blank.answers.length <= 1}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ))}
                    <Button variant="link" onClick={() => addAnswerToBlank(blank._id)} className="p-0 small">
                      <FaPlus className="me-1" /> Add Another Answer
                    </Button>
                  </Card.Body>
                </Card>
              ))}
              
              <Button variant="outline-primary" onClick={addBlank}>
                <FaPlus className="me-1" /> Add Blank
              </Button>
            </div>
          )}

          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
            <Button variant="danger" onClick={handleSaveQuestion}>Update Question</Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderQuestionPreview = (question: Question) => (
    <Card key={question._id} className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6>{question.title}</h6>
            <p className="text-muted mb-1">{question.question}</p>
            <small className="text-muted">
              {question.type.replace(/_/g, " ")} | {question.points} pts
              {question.type === "FILL_IN_BLANK" && question.blanks && ` | ${question.blanks.length} blank(s)`}
            </small>
          </div>
          <div>
            <Button variant="link" className="text-secondary" onClick={() => handleEditClick(question)}>
              <FaPencilAlt />
            </Button>
            <Button variant="link" className="text-danger" onClick={() => handleDeleteQuestion(question._id)}>
              <FaTrash />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Questions ({quiz.questions.length})</h5>
        <Button variant="outline-secondary" onClick={handleAddQuestion}>
          <FaPlus className="me-1" /> New Question
        </Button>
      </div>

      {quiz.questions.length === 0 && (
        <p className="text-muted">No questions yet. Click &quot;New Question&quot; to add one.</p>
      )}

      {quiz.questions.map((question: Question) =>
        editingId === question._id
          ? <div key={question._id}>{renderQuestionEditor()}</div>
          : renderQuestionPreview(question)
      )}

      {editingId && !quiz.questions.find((q: Question) => q._id === editingId) && renderQuestionEditor()}
    </div>
  );
}