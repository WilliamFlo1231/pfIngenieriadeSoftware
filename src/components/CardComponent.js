import React from 'react';

function CardComponent({ borderClass, title, quantity, iconClass }) {
  return (
    <div className={`card ${borderClass} shadow h-100 py-2 class="col-xl-3 col-md-6 mb-4"`}>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
              {title}
            </div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">{quantity}</div>
          </div>
          <div className="col-auto">
            <i className={`${iconClass} fa-2x text-gray-300`}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
