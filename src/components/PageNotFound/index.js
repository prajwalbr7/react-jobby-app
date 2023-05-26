import './index.css'

const PageNotFound = () => (
  <div className="container-page-notfound">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="img-sizing"
    />
    <h1 className="heading-notFound">Page Not Found</h1>
    <p className="Para-notFound">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default PageNotFound
