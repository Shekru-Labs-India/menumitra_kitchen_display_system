import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrdersList() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />

      {/* Main Content */}
      <div className="flex-grow-1 p-3">
        <div className="row g-3">

          {/* Ready Order - Green Card */}
          <div className="col-3">
            <div className="card bg-white rounded-3">
              <div className="card-header bg-success bg-opacity-10 py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <p className="fs-3 fw-bold mb-0">
                      <i class="bx bx-hash"></i>342
                    </p>
                  </div>
                  <div className="text-center">
                    {/* <p className="mb-0 text-muted">Table</p> */}
                    <p className="mb-0 fs-5 fw-semibold">Garden - 1</p>
                  </div>
                </div>
                <div className="mt-1"></div>
              </div>
              <div className="card-body p-3">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2 border-start border-success border-3 ps-2">
                        <div className="fw-semibold fs-6">Cheese Veg Wrap</div>
                        <div>
                          <small className="text-muted ">Regular</small>
                        </div>
                      </div>
                      <span className="fs-6">× 1</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2 border-start border-success border-3 ps-2">
                        <div className="fw-semibold fs-6">Cheese Veg Wrap</div>
                        <div>
                          <small className="text-muted ">Regular</small>
                        </div>
                      </div>
                      <span>× 1</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button className="btn btn-outline-success w-100">
                    <i class="bx bx-check-circle me-2"></i>
                    Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card bg-white rounded-3">
              <div className="card-header bg-success bg-opacity-10 py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <p className="fs-3 fw-bold mb-0">
                      <i class="bx bx-hash"></i>342
                    </p>
                  </div>
                  <div className="text-center">
                    {/* <p className="mb-0 text-muted">Table</p> */}
                    <p className="mb-0 fs-5 fw-semibold">Garden - 1</p>
                  </div>
                </div>
                <div className="mt-1"></div>
              </div>
              <div className="card-body p-3">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2 border-start border-success border-3 ps-2">
                        <div className="fw-semibold fs-6">Cheese Veg Wrap</div>
                        <div>
                          <small className="text-muted ">Regular</small>
                        </div>
                      </div>
                      <span className="fs-6">× 1</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2 border-start border-success border-3 ps-2">
                        <div className="fw-semibold fs-6">Cheese Veg Wrap</div>
                        <div>
                          <small className="text-muted ">Regular</small>
                        </div>
                      </div>
                      <span>× 1</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button className="btn btn-outline-success w-100">
                    <i class="bx bx-check-circle me-2"></i>
                    Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card bg-white rounded-3">
              <div className="card-header bg-success bg-opacity-10 py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <p className="fs-3 fw-bold mb-0">
                      <i class="bx bx-hash"></i>342
                    </p>
                  </div>
                  <div className="text-center">
                    {/* <p className="mb-0 text-muted">Table</p> */}
                    <p className="mb-0 fs-5 fw-semibold">Garden - 1</p>
                  </div>
                </div>
                <div className="mt-1"></div>
              </div>
              <div className="card-body p-3">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2 border-start border-success border-3 ps-2">
                        <div className="fw-semibold fs-6">Cheese Veg Wrap</div>
                        <div>
                          <small className="text-muted ">Regular</small>
                        </div>
                      </div>
                      <span className="fs-6">× 1</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2 border-start border-success border-3 ps-2">
                        <div className="fw-semibold fs-6">Cheese Veg Wrap</div>
                        <div>
                          <small className="text-muted ">Regular</small>
                        </div>
                      </div>
                      <span>× 1</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button className="btn btn-outline-success w-100">
                    <i class="bx bx-check-circle me-2"></i>
                    Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card bg-white rounded-3">
              <div className="card-header bg-success bg-opacity-10 py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <p className="fs-3 fw-bold mb-0">
                      <i class="bx bx-hash"></i>342
                    </p>
                  </div>
                  <div className="text-center">
                    {/* <p className="mb-0 text-muted">Table</p> */}
                    <p className="mb-0 fs-5 fw-semibold">Garden - 1</p>
                  </div>
                </div>
                <div className="mt-1"></div>
              </div>
              <div className="card-body p-3">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2 border-start border-success border-3 ps-2">
                        <div className="fw-semibold fs-6">Cheese Veg Wrap</div>
                        <div>
                          <small className="text-muted ">Regular</small>
                        </div>
                      </div>
                      <span className="fs-6">× 1</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2 border-start border-success border-3 ps-2">
                        <div className="fw-semibold fs-6">Cheese Veg Wrap</div>
                        <div>
                          <small className="text-muted ">Regular</small>
                        </div>
                      </div>
                      <span>× 1</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button className="btn btn-outline-success w-100">
                    <i class="bx bx-check-circle me-2"></i>
                    Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrdersList;
