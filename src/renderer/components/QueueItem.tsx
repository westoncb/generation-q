import React from "react"
import { Draggable } from "react-beautiful-dnd"
import GenerationTask, { GTaskStatus } from "@src/generationTask"
import isEmpty from "lodash.isempty"
import { getState, setState } from "../store"
import { statusIconForGtask } from "./Application"

export default function QueueItem({
    item,
    index,
    dragEnabled,
}: {
    item: GenerationTask
    index: number
    dragEnabled: boolean
}) {
    return (
        <Draggable
            draggableId={`${item.id}`}
            isDragDisabled={!dragEnabled}
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
                            (item.status === GTaskStatus.READY
                                ? ""
                                : " not-ready")
                        }
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {statusIconForGtask(item.status, {
                                fontSize: "1rem",
                                marginRight: "0.5rem",
                                color: "#333",
                            })}

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
