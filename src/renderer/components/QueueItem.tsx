import React from "react"
import { Draggable } from "react-beautiful-dnd"
import GenerationTask, { GTaskStatus } from "@src/generationTask"
import isEmpty from "lodash.isempty"
import { getState, setState, useStore } from "../store"
import { statusIconForGtask } from "./Application"
import shallow from "zustand/shallow"

export default function QueueItem({
    item,
    index,
    dragEnabled,
}: {
    item: GenerationTask
    index: number
    dragEnabled: boolean
}) {
    const { terminalOutputs } = useStore(
        state => ({ terminalOutputs: state.terminalOutputs }),
        shallow
    )

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
                            setState({ selectedTaskId: item.id, activeTab: 0 })
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
                                : " not-ready ") +
                            (item.status === GTaskStatus.RUNNING
                                ? " do-pulse"
                                : "")
                        }
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                                justifyContent: "space-between",
                                flexGrow: 1,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flexGrow: 1,
                                    padding: "0.5rem",
                                }}
                            >
                                {statusIconForGtask(item.status, {
                                    fontSize: "1.5rem",
                                    width: "1.5rem",
                                    height: "1.5rem",
                                    marginRight: "0.5rem",
                                    color: "#333",
                                })}

                                <div
                                    style={{ transform: "none" }}
                                    className={"prompt-text-preview"}
                                >
                                    {getDisplayText(item)}
                                </div>
                            </div>
                            {item.status === GTaskStatus.RUNNING && (
                                <div className="mini-console">
                                    {terminalOutputs[item.id]}
                                </div>
                            )}
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
