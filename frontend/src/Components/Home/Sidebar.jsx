import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="side-bar">
      <h1>
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          width="30"
          height="30"
          className="d-inline-block align-text-top"
        />
        Puzzles and Games
      </h1>
      <a href="/sudoku">
        <button
          id="sideBarButton"
          type="button"
          className="btn btn d-flex align-items-center"
        >
          <img
            src={`${process.env.PUBLIC_URL}/sudoku.png`}
            alt="Sudoku Icon"
            width="25"
            height="25"
            className="me-2"
          />
          <span className="align-middle">Sudoku</span>
        </button>
      </a>
      <a href="/sudoku_killer">
        <button
          id="sideBarButton"
          type="button"
          className="btn btn d-flex align-items-center"
        >
          <img
            src={`${process.env.PUBLIC_URL}/sudoku.png`}
            alt="Sudoku Icon"
            width="25"
            height="25"
            className="me-2"
          />
          <span className="align-middle">Sudoku Killer</span>
        </button>
      </a>
      <a href="/queen_placement_2">
        <button
          id="sideBarButton"
          type="button"
          className="btn btn d-flex align-items-center"
        >
          <img
            src={`${process.env.PUBLIC_URL}/queen.png`}
            alt="Sudoku Icon"
            width="25"
            height="25"
            className="me-2"
          />
          <span className="align-middle">Queen Placement II</span>
        </button>
      </a>
      <a href="/knight_domination">
        <button
          id="sideBarButton"
          type="button"
          className="btn btn d-flex align-items-center"
        >
          <img
            src={`${process.env.PUBLIC_URL}/knight.png`}
            alt="Sudoku Icon"
            width="25"
            height="25"
            className="me-2"
          />
          <span className="align-middle">Knight Domination</span>
        </button>
      </a>
    </div>
  );
};
export default Sidebar;
