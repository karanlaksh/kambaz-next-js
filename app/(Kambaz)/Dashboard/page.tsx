import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />  
      <div id="wd-dashboard-courses">
       
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactJS.jpg" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      
        <div className="wd-dashboard-course">
  <Link href="/Courses/1235" className="wd-dashboard-course-link">
    <Image src="/images/html.jpg" width={200} height={150} />
    <div>
      <h5>CS1235 HTML</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1236" className="wd-dashboard-course-link">
    <Image src="/images/css.jpg" width={200} height={150} />
    <div>
      <h5>CS1236 CSS</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1237" className="wd-dashboard-course-link">
    <Image src="/images/js.jpg" width={200} height={150} />
    <div>
      <h5>CS1237 JavaScript</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1238" className="wd-dashboard-course-link">
    <Image src="/images/ts.jpg" width={200} height={150} />
    <div>
      <h5>CS1238 TypeScript</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1239" className="wd-dashboard-course-link">
    <Image src="/images/nodejs.jpeg" width={200} height={150} />
    <div>
      <h5>CS1239 Node.js</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1240" className="wd-dashboard-course-link">
    <Image src="/images/nextjs.jpeg" width={200} height={150} />
    <div>
      <h5>CS1240 Next.js</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1241" className="wd-dashboard-course-link">
    <Image src="/images/express.jpg" width={200} height={150} />
    <div>
      <h5>CS1241 Express.js</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1242" className="wd-dashboard-course-link">
    <Image src="/images/mongodb.jpg" width={200} height={150} />
    <div>
      <h5>CS1242 MongoDB</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1243" className="wd-dashboard-course-link">
    <Image src="/images/github.jpg" width={200} height={150} />
    <div>
      <h5>CS1243 Git & GitHub</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1244" className="wd-dashboard-course-link">
    <Image src="/images/restapi.png" width={200} height={150} />
    <div>
      <h5>CS1244 REST APIs</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1245" className="wd-dashboard-course-link">
    <Image src="/images/fullstack.png" width={200} height={150} />
    <div>
      <h5>CS1245 Full Stack Project</h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

      </div>
    </div>
);}
