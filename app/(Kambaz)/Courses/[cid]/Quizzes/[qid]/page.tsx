"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { RootState } from "../../../../store";
import { setCurrentQuiz, updateQuiz as updateQuizAction } from "../reducer";
import * as client from "../client";
import { Quiz } from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchQuiz = async () => {
    try {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
      dispatch(setCurrentQuiz(data));
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const handlePublish = async () => {
    if (!quiz) return;
    await client.publishQuiz(quiz._id, !quiz.published);
    const updatedQuiz = { ...quiz, published: !quiz.published };
    setQuiz(updatedQuiz);
    dispatch(updateQuizAction(updatedQuiz));
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!quiz) {
    return <div className="p-4">Quiz not found</div>;
  }

  return (
    <div className="p-4">
      {/* Action Buttons */}
      {isFaculty && (
        <div className="d-flex justify-content-center gap-2 mb-4">
          <Button
            variant={quiz.published ? "success" : "secondary"}
            onClick={handlePublish}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)}
          >
            Preview
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
          >
            <FaPencilAlt className="me-1" /> Edit
          </Button>
        </div>
      )}

      {/* Student: Start Quiz Button */}
      {!isFaculty && (
        <div className="d-flex justify-content-center mb-4">
          <Button
            variant="danger"
            size="lg"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}
          >
            Start Quiz
          </Button>
        </div>
      )}

      <hr />

      {/* Quiz Title */}
      <h2 className="mb-4">{quiz.title}</h2>

      {/* Quiz Properties Table */}
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Quiz Type</div>
        <div className="col-8">{quiz.quizType?.replace(/_/g, " ") || "Graded Quiz"}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Points</div>
        <div className="col-8">{quiz.points}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Assignment Group</div>
        <div className="col-8">{quiz.assignmentGroup || "QUIZZES"}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Shuffle Answers</div>
        <div className="col-8">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Time Limit</div>
        <div className="col-8">
          {quiz.hasTimeLimit ? `${quiz.timeLimit} Minutes` : "No Limit"}
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Multiple Attempts</div>
        <div className="col-8">{quiz.multipleAttempts ? "Yes" : "No"}</div>
      </div>
      {quiz.multipleAttempts && (
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">How Many Attempts</div>
          <div className="col-8">{quiz.howManyAttempts}</div>
        </div>
      )}
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Show Correct Answers</div>
        <div className="col-8">{quiz.showCorrectAnswers || "Immediately"}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Access Code</div>
        <div className="col-8">{quiz.accessCode || "None"}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">One Question at a Time</div>
        <div className="col-8">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Webcam Required</div>
        <div className="col-8">{quiz.webcamRequired ? "Yes" : "No"}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-end fw-bold">Lock Questions After Answering</div>
        <div className="col-8">{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</div>
      </div>

      <hr />

      {/* Dates Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>Everyone</td>
            <td>{formatDate(quiz.availableDate)}</td>
            <td>{formatDate(quiz.untilDate)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}