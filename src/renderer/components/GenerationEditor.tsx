import React, { useEffect, useState } from "react"

export default function GenerationEditor({ gTask }) {
    if (gTask === null) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        backgroundColor: "#f2f5f8",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                    }}
                >
                    <h2 style={{ color: "#aaa" }}>
                        Click "New Generation" to begin.
                    </h2>
                </div>
            </div>
        )
    } else {
        return <div>test</div>
    }
}
