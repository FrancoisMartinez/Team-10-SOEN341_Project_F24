import React from "react";
import {OrbitProgress} from "react-loading-indicators";

function Loading() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent overlay
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999 // ensures it appears above other content
            }}>
            <OrbitProgress variant="track-disc" color="#8a2cad" size="medium" text="" textColor="" />
        </div>
    )
}

export default Loading;