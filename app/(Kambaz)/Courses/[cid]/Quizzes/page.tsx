"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, InputGroup, Dropdown, Modal } from "react-bootstrap";
import { FaPlus, FaSearch, FaEllipsisV, FaCheckCircle, FaBan, FaRocket } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { RootState } from "../../../store";
import { setQuizzes, deleteQuiz as deleteQuizAction, togglePublish } from "./reducer";
import * as client from "./client";
import { Quiz } from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const [attemptScores, setAttemptScores] = useState<Record<string, number>>({});

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };

  const fetchStudentScores = async (quizList: Quiz[]) => {
    if (isFaculty) return;
    
    const scores: Record<string, number> = {};
    for (const quiz of quizList) {
      try {
        const attempts = await client.findAttemptsForQuiz(quiz._id);
        if (attempts.length > 0) {
          scores[quiz._id] = attempts[0].score;
        }
      } catch (error) {
        console.error("Error fetching attempts:", error);
      }
    }
    setAttemptScores(scores);
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  useEffect(() => {
    if (quizzes.length > 0 && !isFaculty) {
      fetchStudentScores(quizzes);
    }
  }, [quizzes, isFaculty]);

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid as string, {
      title: "Unnamed Quiz",
      description: "",
      quizType: "GRADED_QUIZ",
      assignmentGroup: "QUIZZES",
    });
    dispatch(setQuizzes([...quizzes, newQuiz]));
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}`);
  };

  const handleDeleteClick = (quizId: string) => {
    setQuizToDelete(quizId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (quizToDelete) {
      await client.deleteQuiz(quizToDelete);
      dispatch(deleteQuizAction(quizToDelete));
    }
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };

  const handlePublishToggle = async (quizId: string, currentStatus: boolean) => {
    await client.publishQuiz(quizId, !currentStatus);
    dispatch(togglePublish(quizId));
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (until && now > until) {
      return "Closed";
    }
    if (available && now >= available && (!until || now <= until)) {
      return "Available";
    }
    if (available && now < available) {
      return `Not available until ${new Date(quiz.availableDate).toLocaleDateString()}`;
    }
    return "Available";
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
    });
  };

  // Filter quizzes for students (only show published)
  const visibleQuizzes = isFaculty 
    ? quizzes 
    : quizzes.filter((q) => q.published);

  return (
    <div id="wd-quizzes" className="p-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text className="bg-white border-end-0">
            <FaSearch className="text-secondary" />
          </InputGroup.Text>
          <Form.Control placeholder="Search for Quiz" className="border-start-0" />
        </InputGroup>

        {isFaculty && (
          <Button variant="danger" onClick={handleAddQuiz}>
            <FaPlus className="me-2" /> Quiz
          </Button>
        )}
      </div>

      {/* Quiz List */}
      <div className="border rounded">
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light fw-bold">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 text-secondary" />
            <FaRocket className="me-2 text-secondary" />
            Assignment Quizzes
          </div>
        </div>

        {visibleQuizzes.length === 0 ? (
          <div className="p-4 text-center text-muted">
            No quizzes yet. {isFaculty && "Click + Quiz to create one."}
          </div>
        ) : (
          <ul className="list-group list-group-flush">
            {visibleQuizzes.map((quiz) => (
              <li
                key={quiz._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 text-secondary" />
                  <FaRocket className="me-2 text-success" />
                  <div>
                    <a
                      href={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="fw-bold text-decoration-none text-dark"
                    >
                      {quiz.title}
                    </a>
                    <div className="text-muted small">
                      <span className="me-2">{getAvailabilityStatus(quiz)}</span>
                      {quiz.dueDate && (
                        <span className="me-2">| Due {formatDate(quiz.dueDate)}</span>
                      )}
                      <span className="me-2">| {quiz.points} pts</span>
                      <span>| {quiz.questions?.length || 0} Questions</span>
                      {!isFaculty && attemptScores[quiz._id] !== undefined && (
                        <span className="ms-2 text-primary fw-bold">
                          | Score: {attemptScores[quiz._id]}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  {/* Publish Status Icon */}
                  {isFaculty && (
                    <span
                      onClick={() => handlePublishToggle(quiz._id, quiz.published)}
                      style={{ cursor: "pointer" }}
                      className="me-2"
                      title={quiz.published ? "Click to unpublish" : "Click to publish"}
                    >
                      {quiz.published ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaBan className="text-secondary" />
                      )}
                    </span>
                  )}

                  {/* Context Menu */}
                  {isFaculty && (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        className="text-secondary p-0"
                        id={`dropdown-${quiz._id}`}
                      >
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDeleteClick(quiz._id)}>
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handlePublishToggle(quiz._id, quiz.published)}
                        >
                          {quiz.published ? "Unpublish" : "Publish"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}