"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Tab, Tabs, Form, Button, Row, Col } from "react-bootstrap";
import { updateQuiz as updateQuizAction } from "../../reducer";
import * as client from "../../client";
import { Quiz } from "../../client";
import QuestionsEditor from "./QuestionsEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const handleChange = (field: string, value: string | number | boolean) => {
    if (!quiz) return;
    setQuiz({ ...quiz, [field]: value });
  };

  const handleSave = async () => {
    if (!quiz) return;
    await client.updateQuiz(quiz);
    dispatch(updateQuizAction(quiz));
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    if (!quiz) return;
    const updatedQuiz = { ...quiz, published: true };
    await client.updateQuiz(updatedQuiz);
    await client.publishQuiz(quiz._id, true);
    dispatch(updateQuizAction(updatedQuiz));
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found</div>;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-end mb-2">
        <span className="text-muted me-3">Points: {quiz.points}</span>
        <span className={quiz.published ? "text-success" : "text-secondary"}>
          {quiz.published ? "Published" : "Not Published"}
        </span>
      </div>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")} className="mb-3">
        <Tab eventKey="details" title="Details">
          <Form>
            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={quiz.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Quiz Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={quiz.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Form.Group>

            <Row>
              {/* Quiz Type */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quiz Type</Form.Label>
                  <Form.Select
                    value={quiz.quizType}
                    onChange={(e) => handleChange("quizType", e.target.value)}
                  >
                    <option value="GRADED_QUIZ">Graded Quiz</option>
                    <option value="PRACTICE_QUIZ">Practice Quiz</option>
                    <option value="GRADED_SURVEY">Graded Survey</option>
                    <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Assignment Group */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Assignment Group</Form.Label>
                  <Form.Select
                    value={quiz.assignmentGroup}
                    onChange={(e) => handleChange("assignmentGroup", e.target.value)}
                  >
                    <option value="QUIZZES">Quizzes</option>
                    <option value="EXAMS">Exams</option>
                    <option value="ASSIGNMENTS">Assignments</option>
                    <option value="PROJECT">Project</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Options */}
            <h5 className="mt-4">Options</h5>
            
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) => handleChange("shuffleAnswers", e.target.checked)}
              className="mb-2"
            />

            <div className="d-flex align-items-center mb-2">
              <Form.Check
                type="checkbox"
                label="Time Limit"
                checked={quiz.hasTimeLimit}
                onChange={(e) => handleChange("hasTimeLimit", e.target.checked)}
              />
              {quiz.hasTimeLimit && (
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) => handleChange("timeLimit", parseInt(e.target.value))}
                  style={{ width: "80px", marginLeft: "10px" }}
                />
              )}
              {quiz.hasTimeLimit && <span className="ms-2">Minutes</span>}
            </div>

            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) => handleChange("multipleAttempts", e.target.checked)}
              className="mb-2"
            />

            {quiz.multipleAttempts && (
              <Form.Group className="mb-3 ms-4">
                <Form.Label>How Many Attempts</Form.Label>
                <Form.Control
                  type="number"
                  value={quiz.howManyAttempts}
                  onChange={(e) => handleChange("howManyAttempts", parseInt(e.target.value))}
                  style={{ width: "100px" }}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Show Correct Answers</Form.Label>
              <Form.Select
                value={quiz.showCorrectAnswers}
                onChange={(e) => handleChange("showCorrectAnswers", e.target.value)}
              >
                <option value="IMMEDIATELY">Immediately</option>
                <option value="AFTER_DUE">After Due Date</option>
                <option value="NEVER">Never</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Access Code</Form.Label>
              <Form.Control
                type="text"
                value={quiz.accessCode}
                onChange={(e) => handleChange("accessCode", e.target.value)}
                placeholder="Leave blank for no access code"
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) => handleChange("oneQuestionAtATime", e.target.checked)}
              className="mb-2"
            />

            <Form.Check
              type="checkbox"
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={(e) => handleChange("webcamRequired", e.target.checked)}
              className="mb-2"
            />

            <Form.Check
              type="checkbox"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(e) => handleChange("lockQuestionsAfterAnswering", e.target.checked)}
              className="mb-3"
            />

            {/* Dates */}
            <h5 className="mt-4">Assign</h5>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Due</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={quiz.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Available from</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={quiz.availableDate}
                    onChange={(e) => handleChange("availableDate", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={quiz.untilDate}
                    onChange={(e) => handleChange("untilDate", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>

        <Tab eventKey="questions" title="Questions">
          <QuestionsEditor quiz={quiz} setQuiz={setQuiz} />
        </Tab>
      </Tabs>

      {/* Action Buttons */}
      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSaveAndPublish}>
          Save & Publish
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}