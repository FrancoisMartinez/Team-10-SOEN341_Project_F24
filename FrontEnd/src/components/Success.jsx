import React, { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider.jsx";

function Success() {
    const { state, dispatch } = useContext(GlobalContext);


    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    maxWidth: "400px",
                    width: "100%",
                    textAlign: "center",
                    position: "relative"
                }}
            >
                <button
                    onClick={() => dispatch({ type: 'SUCCESS_DISMISS' })}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "transparent",
                        border: "none",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    X
                </button>
                <p>{state.success}</p>
            </div>
        </div>
    );
}

export default Success;
