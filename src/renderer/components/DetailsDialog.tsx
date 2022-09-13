import React, { useState, useRef } from "react"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"

export default function DetailsDialog({ gTask, show, onClose }) {
    const interleavedKeyVals = Object.entries(gTask).reduce(
        (all, entry) => all.concat(entry),
        []
    )

    return (
        <Dialog onClose={onClose} open={show}>
            <DialogTitle>Generation task details</DialogTitle>
            <div className="details-dialog">
                <div className="details-table">
                    {interleavedKeyVals.map((element, i) => (
                        <div
                            // I'm just using i to avoid React warnings;
                            // this data is not dynamic so shouldn't matter
                            key={i}
                            style={{
                                backgroundColor: "#ddd",
                                padding: "0.5rem",
                                maxHeight: "15rem",
                                overflowY: "scroll",
                            }}
                        >
                            {typeof element === "object"
                                ? JSON.stringify(element)
                                : element}
                        </div>
                    ))}
                </div>
            </div>
        </Dialog>
    )
}
