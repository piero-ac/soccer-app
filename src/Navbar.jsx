
export default function Navbar(props) {

  return (
    <nav>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className={'nav-link ' + (props.activeTab === 'table' && 'active')}
            aria-current="page"
            onClick={() => props.onTabClick('table')}
            href="#">Table</a>
        </li>
        <li className="nav-item">
          <a className={'nav-link ' + (props.activeTab === 'matches' && 'active')}
            aria-current="page"
            onClick={() => props.onTabClick('matches')}
            href="#">Matches</a>
        </li>
        <li className="nav-item">
          <a className={'nav-link ' + (props.activeTab === 'top-scorers' && 'active')}
            aria-current="page"
            onClick={() => props.onTabClick('top-scorers')}
            href="#">Top Scorers</a>
        </li>
      </ul>
    </nav>
  )
}