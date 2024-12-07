import React from 'react'
import Header from '../components/Header'

function OrdersList() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      
      {/* Main Content */}
      <div className="flex-grow-1 p-3">
        <div className="row g-3">
          {/* New Order - Red Card */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card bg-white rounded-3">
              <div className="card-header bg-danger bg-opacity-10 py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <h5 className="mb-0">#342</h5>
                   
                  </div>
                  <h6 className="mb-0 text-uppercase fw-bold">TABLE NO. 112</h6>
                </div>
                <div className="mt-1">
         
                </div>
              </div>
              <div className="card-body p-3">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-danger" style={{ width: '3px', height: '20px' }}></div>
                        <div>
                          <div className="fw-semibold">Chocolate Truffle</div>
                          <small className="text-muted fst-italic">Regular</small>
                        </div>
                      </div>
                    </div>
                    <span>× 1</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-danger" style={{ width: '3px', height: '20px' }}></div>
                        <div>
                          <div className="fw-semibold">Choco Brownie</div>
                          <small className="text-muted fst-italic">Regular</small>
                        </div>
                      </div>
                    </div>
                    <span>× 1</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-danger" style={{ width: '3px', height: '20px' }}></div>
                        <div>
                          <div className="fw-semibold">Black Forest</div>
                          <small className="text-muted fst-italic">Regular</small>
                        </div>
                      </div>
                    </div>
                    <span>× 1</span>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-outline-secondary w-100 mb-2">
                    COUPLE ORDER
                  </button>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-success w-100">
                      DONE
                    </button>
                    <button className="btn btn-outline-primary w-100">
                      CALL WAITER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Processed Order - Yellow Card */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card bg-white rounded-3">
              <div className="card-header bg-warning bg-opacity-10 py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <h5 className="mb-0">#343</h5>
                   
                  </div>
                  <h6 className="mb-0 text-uppercase fw-bold">TABLE NO. 112</h6>
                </div>
                <div className="mt-1">

                </div>
              </div>
              <div className="card-body p-3">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-warning" style={{ width: '3px', height: '20px' }}></div>
                        <div>
                          <div className="fw-semibold">Tandoori Chicken</div>
                          <small className="text-muted fst-italic">Regular</small>
                        </div>
                      </div>
                    </div>
                    <span>× 1</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-warning" style={{ width: '3px', height: '20px' }}></div>
                        <div>
                          <div className="fw-semibold">Masala Tea</div>
                          <small className="text-muted fst-italic">Regular</small>
                        </div>
                      </div>
                    </div>
                    <span>× 1</span>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-outline-secondary w-100 mb-2">
                    COUPLE ORDER
                  </button>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-success w-100">
                      DONE
                    </button>
                    <button className="btn btn-outline-primary w-100">
                      CALL WAITER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ready Order - Green Card */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card bg-white rounded-3">
              <div className="card-header bg-success bg-opacity-10 py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <h5 className="mb-0">#342</h5>
                   
                  </div>
                  <h6 className="mb-0 text-uppercase fw-bold">TABLE NO. 112</h6>
                </div>
                <div className="mt-1">

                </div>
              </div>
              <div className="card-body p-3">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-success" style={{ width: '3px', height: '20px' }}></div>
                        <div>
                          <div className="fw-semibold">Cheese Veg Wrap</div>
                          <small className="text-muted fst-italic">Regular</small>
                        </div>
                      </div>
                    </div>
                    <span>× 1</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-success" style={{ width: '3px', height: '20px' }}></div>
                        <div>
                          <div className="fw-semibold">Cafe Mocha</div>
                          <small className="text-muted fst-italic">Large</small>
                        </div>
                      </div>
                    </div>
                    <span>× 1</span>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-outline-secondary w-100 mb-2">
                    COUPLE ORDER
                  </button>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-success w-100">
                      DONE
                    </button>
                    <button className="btn btn-outline-primary w-100">
                      CALL WAITER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersList