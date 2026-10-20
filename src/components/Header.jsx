import QuizLogo from "../assets/quiz.svg";

function Header() {
  return (
    <div className="header">
      <img src={QuizLogo} alt="Quiz app logo" width={150} />
      <h1 className="title">Quiz App</h1>
    </div>
  );
}

export default Header;
