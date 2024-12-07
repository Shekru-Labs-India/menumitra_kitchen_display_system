import React from 'react'

function Footer() {
  return (
    <>
      <footer className="content-footer footer bg-footer-theme mb-3">
        <div className="container-img-fluid  px-5">
          <div className="text-body d-flex justify-content-between align-items-center flex-column flex-md-row">
            <div className="mb-2 mb-md-0 text-center text-md-start">
              © Copyright. All Rights Reserved.
            </div>
            <div className="text-center d-flex justify-content-center">
              <a
                href="https://www.google.com/search?q=Menu+Mitra"
                className="footer-link mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-google bx-sm text-muted"></i>
              </a>
              <a
                href="https://www.facebook.com/people/Menu-Mitra/61565082412478/"
                className="footer-link mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-facebook bx-sm text-muted"></i>
              </a>
              <a
                href="https://www.instagram.com/menumitra/"
                className="footer-link mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-instagram bx-sm text-muted"></i>
              </a>
              <a
                href="https://www.youtube.com/@menumitra"
                className="footer-link mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-youtube bx-sm text-muted"></i>
              </a>
              <a
                href="https://x.com/MenuMitra"
                className="footer-link mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-twitter bx-sm text-muted"></i>
              </a>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3 mt-md-0">
              <i class="bx bxs-bolt fs-6 me-2"></i>
              Powered by
              <a
                className="ps-2"
                href="https://www.shekruweb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shekru Labs India Pvt. Ltd.
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer