import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import GenerationTask from "@src/generationTask"
import isEmpty from "lodash.isempty"
import { getState, setState } from "../store"

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
                <div
                    onClick={e => {
                        console.log("got the click", e)
                        setState({ selectedTaskId: item.id })
                        e.stopPropagation()
                    }}
                    tabIndex={"-1"}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={
                        "queue-item " +
                        (snapshot.isDragging ? " dragging-queue-item" : "") +
                        (getState().selectedTaskId === item.id
                            ? " selected"
                            : "") +
                        (item.ready ? "" : " not-ready")
                    }
                >
                    <div className="prompt-text-preview">
                        {getDisplayText(item)}
                    </div>
                </div>
            )}
        </Draggable>
    )
}

function getDisplayText(item) {
    if (!isEmpty(item.prompt)) {
        return item.prompt
    } else {
        return <i style={{ color: "#666" }}>empty prompt</i>
    }
}
