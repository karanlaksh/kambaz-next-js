export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
  
     <label htmlFor="wd-name"><b>Assignment Name</b></label> <br />
     <br/>
     <input id="wd-name" defaultValue="A1 - ENV + HTML" />
     <br />
  
     <br />
      <label htmlFor="wd-description">Assignment Description</label>
      <br />
      <textarea id="wd-description" rows={6} cols={60}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Link to the Kanbas application Links to all relevant source
        code repositories The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />

      <table>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter Grade</option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option>Online</option>
              <option>On Paper</option>
              <option>No Submission</option>
            </select>
            <br />
            <label>
              <input type="checkbox" id="wd-text-entry" /> Text Entry
            </label>
            <br />
            <label>
              <input type="checkbox" id="wd-website-url" /> Website URL
            </label>
            <br />
            <label>
              <input type="checkbox" id="wd-media-recordings" /> Media Recordings
            </label>
            <br />
            <label>
              <input type="checkbox" id="wd-student-annotation" /> Student
              Annotation
            </label>
            <br />
            <label>
              <input type="checkbox" id="wd-file-upload" /> File Uploads
            </label>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign To</label>
          </td>
        </tr>
        <tr>
          <td></td>
             <td>
            <input id="wd-assign-to" defaultValue="Everyone" />
          </td>
        </tr>
        <br />

        <tr>
          <td></td>
          <td  valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
        </tr>
        <tr>
            <td></td>
            <td>
            <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
          </td>
        </tr>
        <br />

        <tr>
          <td></td>
          <td valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <label htmlFor="wd-available-until"> Until </label>
          </td>
        </tr>
        <tr>
          <td></td>
           <td><input
              id="wd-available-from"
              type="date"
              defaultValue="2024-05-06"
            /></td>
            <td><input
              id="wd-available-until"
              type="date"
              defaultValue="2024-05-20"
            /></td>
        </tr>
        
        <tr>
          <td colSpan={3}>
              <hr></hr>
          </td>
        </tr>
         <tr>
          <td colSpan={3} align="right">
              <button>Cancel</button>
              <button>Save</button>
          </td>
        </tr>
      </table>
 
      
    </div>
  );
}

