const Footer = (props) => {
  const { totalPages, pageIndex, setPageIndex } = props;

  const pageList = () => {
    let content = [];

    for (let i = 1; i <= totalPages; i++) {
      content.push(
        <li key={i}>
          <button
            className="pagination-link"
            style={{ color: "black" }}
            aria-label={`Go to page ${i}`}
            onClick={() => setPageIndex(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return content;
  };

  return (
    <nav
      className="navbar pagination is-centered"
      role="navigation"
      aria-label="pagination main navigation"
    >
      <button
        className="pagination-previous"
        style={{ color: "black" }}
        onClick={() => setPageIndex(pageIndex - 1)}
        disabled={pageIndex === 1}
      >
        <i className="fas fa-arrow-left" aria-hidden="true"></i>
      </button>
      <button
        className="pagination-next"
        style={{ color: "black" }}
        onClick={() => setPageIndex(Number(pageIndex) + 1)}
        disabled={pageIndex >= totalPages}
      >
        <i className="fas fa-arrow-right" aria-hidden="true"></i>
      </button>

      <ul className="pagination-list">
        {/* Page selection map */}
        {pageList()}
        {/* End */}
      </ul>
    </nav>
  );
};

export default Footer;
