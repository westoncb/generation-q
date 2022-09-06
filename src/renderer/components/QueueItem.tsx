import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import GenerationTask from "@src/generationTask"
import isEmpty from "lodash.isempty"
import { getState, setState } from "../store"
import { DoneOutline, FmdBad } from "@mui/icons-material"

export default function QueueItem({
    item,
    index,
}: {
    item: GenerationTask
    index: number
}) {
    return (
        <Draggable
            disableInteractiveElementBlocking
            draggableId={`${item.id}`}
            index={index}
            key={item.id}
        >
            {(provided, snapshot) => (
                <div className="queue-item">
                    <div className="queue-item-index">{index + 1}</div>
                    <div
                        onClick={e => {
                            setState({ selectedTaskId: item.id })
                            e.stopPropagation()
                        }}
                        tabIndex={"-1"}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={
                            "queue-item-body " +
                            (snapshot.isDragging
                                ? " dragging-queue-item"
                                : "") +
                            (getState().selectedTaskId === item.id
                                ? " selected"
                                : "") +
                            (item.ready ? "" : " not-ready")
                        }
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {item.ready ? (
                                <DoneOutline
                                    sx={{ fontSize: "1rem", mr: "0.5rem" }}
                                />
                            ) : (
                                <FmdBad
                                    sx={{ fontSize: "1rem", mr: "0.5rem" }}
                                />
                            )}

                            <div className="prompt-text-preview">
                                {getDisplayText(item)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

const MAX_CHARS = 100
function getDisplayText(item) {
    if (!isEmpty(item.prompt)) {
        const charCount = Math.min(MAX_CHARS, item.prompt.length)
        const suffix = charCount < item.prompt.length ? "..." : ""
        return item.prompt.slice(0, charCount) + suffix
    } else {
        return <i style={{ color: "#666" }}>empty prompt</i>
    }
}
