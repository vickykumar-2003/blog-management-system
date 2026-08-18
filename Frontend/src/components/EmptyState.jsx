import React from "react";

const EmptyState = ({ message = "No blogs available at the moment." }) => {
    return (
        <div className="empty-state">
            <h2>Opps!</h2>
            <p>{message}</p>
        </div>
    );
};

export default EmptyState;
